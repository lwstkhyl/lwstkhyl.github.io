---
layout: mypost
title: snRNA-Seq的fastq数据分析
category: other
subcategory: other-other
---

2025.12.03-2025.12.14研究进展

<!-- more -->

### 数据下载和建索引

由telescope的同作者开发的针对单细胞数据的hERV位点级分析工具[Stellarscope](https://github.com/nixonlab/stellarscope)

先跟着[官方教程](https://github.com/nixonlab/stellarscope/blob/main/docs/protocol.md)走一遍
- 发现官方教程有个25G的文件，其下载速度只有200K不到，没法用
- 直接用咱的fastq数据

**构建STAR索引**：
- 人类基因组[GRCh38.p14.genome.fa.gz](https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_49/GRCh38.p14.genome.fa.gz)
- 人类基因组注释[gencode.v49.annotation.gtf.gz](https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_49/gencode.v49.annotation.gtf.gz)
- hERV专用注释[HERV_rmsk.hg38.v2](https://media.githubusercontent.com/media/mlbendall/telescope_annotation_db/refs/heads/master/builds/HERV_rmsk.hg38.v2/transcripts.gtf?download=true)

```sh
cd /public/home/wangtianhao/Desktop/STAR_ref/
module load miniconda3/base
conda activate STAR
STAR \
  --runThreadN 16 \
  --runMode genomeGenerate \
  --genomeDir hg38 \
  --genomeFastaFiles GRCh38.p14.genome.fa \
  --sjdbGTFfile gencode.v49.annotation.gtf
```
注：建索引以及之后比对时都不需要hERV注释，其实连人类基因组注释都可以不用，这个gtf只是为了识别splice junction，STAR比对时不需要知道哪些位置是HERV

**下载数据**：

```sh
cd /public/home/wangtianhao/Desktop/GSE233208/1204test/fastq/
module load miniconda3/base
conda activate fastq-download
nohup parallel-fastq-dump --sra-id SRR24710599 --threads 8 --split-files --tmpdir ./fastq_temp --gzip &
# for file in *.fastq; do gzip "$file"; done
# 或者
nohup axel -n 8 ftp://ftp.sra.ebi.ac.uk/vol1/fastq/SRR247/098/SRR24710598/SRR24710598_2.fastq.gz > /dev/null 2> error.log &
nohup axel -n 8 ftp://ftp.sra.ebi.ac.uk/vol1/fastq/SRR247/098/SRR24710598/SRR24710598_1.fastq.gz > /dev/null 2> error.log &
```

SRA run上显示Bytes为17.56G的gz下载下来得到双端共190G的fastq，Bytes为18.51G的gz下载下来得到双端共23.4G的fastq.gz（下载时间差不多，都在6h左右）

**质控**：以下列举的质控好像只是生成质量报告，并不实际修改读段（而且不是专门给scRNA-seq设置的），了解即可，后续没有用

```sh
cd /public/home/wangtianhao/Desktop/GSE233208/1204test/
mkdir -p qc
module load miniconda3/base
conda activate fastqc
fastqc fastq/*.fastq.gz -o qc
cd qc
multiqc .
```

### STAR比对

由于没找到官方提供的barcode whitelist，只能自己计算一下：统计推测的三段barcode中每种序列出现的频数，根据官方说法，可能有24/48/96个序列作为whitelist，观察生成的bc1_counts.txt，在96的地方有明显梯度，于是认为前96个序列位barcode

```sh
# 统计 BC1（11-18 位）的 8-mer 频数
zcat /public/home/wangtianhao/Desktop/GSE233208/1204test/fastq/SRR24710598_2.fastq.gz \
  | awk 'NR%4==2 {print substr($1,11,8)}' \
  | sort | uniq -c | sort -nr > /public/home/wangtianhao/Desktop/GSE233208/1204test/barcode/bc1_counts.txt
# 统计 BC2（49-56 位）
zcat /public/home/wangtianhao/Desktop/GSE233208/1204test/fastq/SRR24710598_2.fastq.gz \
  | awk 'NR%4==2 {print substr($1,49,8)}' \
  | sort | uniq -c | sort -nr > /public/home/wangtianhao/Desktop/GSE233208/1204test/barcode/bc2_counts.txt
# 统计 BC3（79-86 位）
zcat /public/home/wangtianhao/Desktop/GSE233208/1204test/fastq/SRR24710598_2.fastq.gz \
  | awk 'NR%4==2 {print substr($1,79,8)}' \
  | sort | uniq -c | sort -nr > /public/home/wangtianhao/Desktop/GSE233208/1204test/barcode/bc3_counts.txt
# 观察看出前96位的频数明显大于后面，因此截取前96位作为whitelist
# 过滤掉喊连续≥6碱基的条形码
cd /public/home/wangtianhao/Desktop/GSE233208/1204test/barcode/
grep -v -E 'A{6,}|C{6,}|G{6,}|T{6,}' bc1_counts.txt \
  | sort -k1,1nr \
  | head -96 \
  | awk '{print $2}' > bc1_whitelist.txt
grep -v -E 'A{6,}|C{6,}|G{6,}|T{6,}' bc2_counts.txt \
  | sort -k1,1nr \
  | head -96 \
  | awk '{print $2}' > bc2_whitelist.txt

# 因为第三段BC阶梯不明显，就扩大了一下范围
grep -v -E 'A{6,}|C{6,}|G{6,}|T{6,}' bc3_counts.txt \
  | sort -k1,1nr \
  | head -200 \
  | awk '{print $2}' > bc3_whitelist.txt
```

一定一定注意`--readFilesIn`参数的设置，第一个fastq是cDNA，第二个是UMI和barcode
- 本来不想设置`--soloCBwhitelist`过滤的，但STAR官方好像强制要求这个参数，只能用上面的方法生成一个不太严谨的whitelist——只有barcode出现在这个whitelist里的读段才算有效读段

```sh
cd /public/home/wangtianhao/Desktop/GSE233208/1204test/
module load miniconda3/base
conda activate STAR
mkdir -p starsolo
# 注意以下命令执行时删掉#的行，否则只读到第一个#就不往下读了
STAR \
  --runMode alignReads \
  --runThreadN 16 \
  --genomeDir /public/home/wangtianhao/Desktop/STAR_ref/hg38/ \
  --readFilesIn /public/home/wangtianhao/Desktop/GSE233208/1204test/fastq/SRR24710598_1.fastq.gz /public/home/wangtianhao/Desktop/GSE233208/1204test/fastq/SRR24710598_2.fastq.gz \
  --readFilesCommand zcat \
  --outFileNamePrefix starsolo/SRR24710598_ \
  # 单细胞模式
  --soloType CB_UMI_Complex \
  --soloCBwhitelist /public/home/wangtianhao/Desktop/GSE233208/1204test/barcode/bc1_whitelist.txt /public/home/wangtianhao/Desktop/GSE233208/1204test/barcode/bc2_whitelist.txt /public/home/wangtianhao/Desktop/GSE233208/1204test/barcode/bc3_whitelist.txt \
  --soloCBmatchWLtype 1MM \
  # 条形码
  --soloUMIposition 0_0_0_9 \
  --soloCBposition 0_10_0_17 0_48_0_55 0_78_0_85 \
  # 计数/细胞筛选设置
  --soloFeatures GeneFull \
  --soloCellFilter EmptyDrops_CR \
  --soloMultiMappers EM \
  # BAM输出和Tags（给Stellarscope用）
  --outSAMtype BAM SortedByCoordinate \
  --outSAMattributes NH HI nM AS CR UR CB UB GX GN sS sQ sM \
  # Stellarscope要求保留多重比对
  --outSAMunmapped Within \
  --outFilterMultimapNmax 500 \
  --outFilterMultimapScoreRange 5 
```

### stellarscope计数


```sh
module load miniconda3/base
conda activate stellarscope

```


### 构建Seurat对象

关键的数据对齐：
- 普通基因使用STARsolo计数，hERV使用stellarscope计数，而最终我们是用普通基因先构建Seurat对象，再把stellarscope计数得到的矩阵作为一个assay挂载上去，这两个矩阵的样本要对齐
- 由于这个单细胞数据比较特殊，作者提供了一个单独的GSE233208_AD-DS_Cases.csv文件标明样本id、诊断组别、年龄性别等信息，这些信息需要与我们的Seurat对象组合
- 每个SRR的数据是怎么合并的，列名（样本名）是什么


### pipeline

先建一个`SRR_Acc_List.txt`，里面放上要下载的SRR号

```sh
cd /public/home/wangtianhao/Desktop/GSE233208/fastq
module load miniconda3/base
conda activate fastq-download
for SRR in $(cat SRR_Acc_List.txt); do
    parallel-fastq-dump --sra-id ${SRR} --tmpdir ./fastq_temp --threads 8 --split-files --gzip
done
```


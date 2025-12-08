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

---

自动下载：先建一个`SRR_Acc_List.txt`，里面放上要下载的SRR号（从SRA run界面的Accession List按钮下载）

```sh
cd /public/home/wangtianhao/Desktop/GSE233208/fastq
module load miniconda3/base
conda activate fastq-download
for SRR in $(cat SRR_Acc_List.txt); do
    parallel-fastq-dump --sra-id ${SRR} --tmpdir ./fastq_temp --threads 8 --split-files --gzip
done
```

### GSE233208

[GEO界面](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE233208)，下载[GSE233208_AD-DS_Cases.csv.gz](https://ftp.ncbi.nlm.nih.gov/geo/series/GSE233nnn/GSE233208/suppl/GSE233208%5FAD%2DDS%5FCases.csv.gz)样本信息

点开其中一个样本的页面[GSM7412790](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSM7412790)，可以看到是用什么测序技术测的，关键信息：

```
using Parse biosciences Evercode WT kit (v1)
```

进入[SRA run](https://www.ncbi.nlm.nih.gov/Traces/study/?acc=PRJNA975472)中，左面Assay Type选择RNA-Seq，下载41条数据（**共732.66G，碱基数2.29T，样本数96个**）

相关论文[Spatial and single-nucleus transcriptomic analysis of genetic and sporadic forms of Alzheimer’s disease](https://www.nature.com/articles/s41588-024-01961-x)

#### STAR比对

##### try 1

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

结果虽然从条形码的角度对的上，但没有样本id也没什么用

##### try 2

找了一个野生工具[Analysis tools for split-seq](https://github.com/yjzhang/split-seq-pipeline)，作者使用自己创作的解码（条形码和sample组别）方式，没有依赖splitpipe，但更新时间是5年前，有一些古老

```sh
# 安装
git clone https://github.com/yjzhang/split-seq-pipelinec
# git clone https://ghfast.top/https://github.com/yjzhang/split-seq-pipeline
export PATH=$PATH:$HOME/split-seq-pipeline/

# 配置环境
module load miniconda3/base
conda create -n split-seq \
  python=3.8 \
  samtools=1.9 \
  numpy pysam pandas scipy matplotlib

# 因为他用的旧版本STAR，只能用源码编译的方式安装
cd ~
wget https://github.com/alexdobin/STAR/archive/2.6.1c.tar.gz
tar -xzf 2.6.1c.tar.gz
cd STAR-2.6.1c
cd source
make STAR
```

要求必须使用他的方式重建STAR索引，自己建的会缺一个他统计的pkl文件

```sh
# 建索引
module load miniconda3/base
conda activate split-seq
# 为了避免与其他版本STAR冲突，只在运行他这个pipeline的时候才把2.6.1的STAR加入环境变量
export PATH=$PATH:$HOME/STAR-2.6.1c/bin/Linux_x86_64/
split-seq mkref \
  --genome hg38 \
  --fasta /public/home/wangtianhao/Desktop/STAR_ref/GRCh38.p14.genome.fa \
  --genes /public/home/wangtianhao/Desktop/STAR_ref/gencode.v49.annotation.gtf \
  --output_dir /public/home/wangtianhao/Desktop/STAR_ref/hg38_split-seq/ \
  --nthreads 16
```

之后就可以开始比对，经过实测他示例中的参数`--chemistry v2`应该是适配这套数据的

```sh
module load miniconda3/base
conda activate split-seq
export PATH=$PATH:$HOME/STAR-2.6.1c/bin/Linux_x86_64/
mkdir -p /public/home/wangtianhao/Desktop/GSE233208/1205test/AD_S8_L004/
split-seq all \
  --fq1 /public/home/wangtianhao/Desktop/GSE233208/1205test/fastq/AD_S8_L004_R1.fastq.gz \
  --fq2 /public/home/wangtianhao/Desktop/GSE233208/1205test/fastq/AD_S8_L004_R2.fastq.gz \
  --output_dir /public/home/wangtianhao/Desktop/GSE233208/1205test/AD_S8_L004/ \
  --chemistry v2 \
  --genome_dir /public/home/wangtianhao/Desktop/STAR_ref/hg38_split-seq/ \
  --nthreads 16 \
  --sample '28' A1-A4 \
  --sample '16' A5-A8 \
  --sample '94' A9-A12 \
  --sample '88' B1-B4 \
  --sample '131' B5-B8 \
  --sample '19' B9-B12 \
  --sample '107' C1-C4 \
  --sample '101' C5-C8 \
  --sample '10' C9-C12 \
  --sample '63' D1-D2 \
  --sample '128' D3-D4 \
  --sample '50' D5-D6 \
  --sample '100' D7-D8 \
  --sample 'humAD-87' D9-D10 \
  --sample '20' D11-D12
```

在分析的末尾，作者的`split_seq/analysis.py`文件中的`generate_single_dge_report`报错`KeyError(f"{not_found} not in index")`，仔细一看是一段对`Fraction Reads in Cells`统计的代码出错，感觉这个数据不太重要，于是注释掉了该文件中所有类似统计的行（527-531、540-541、546、574、576-583）

结果：处理一条数据大约需要6-7个小时，确实可以得到看起来很正确的统计结果，包括每个样本id对应的计数矩阵+条形码+基因，作者筛选出来有有效条形码的读段fastq文件极其比对结果bam，理论上可以根据这个结果来构建Seurat对象

![GSE233208_1](/upload/md-image/other/GSE233208_1.png){:width="600px" height="600px"}

问题：
- 虽然有类似的结果，但不能确定这个GitHub项目处理的流程是否正确，毕竟是野生项目，有可能只是作者给自己使用的数据写的，无法推广到这个比较偏门的数据。最主要这个结果的正确性是无法验证的（除非跑完整个流程后再到Seurat里面画图查看）
- 需要与后续stellarscope分析衔接，因为作者使用自己写的流程，不知道是否保留了后面stellarscope需要的文件，而且尚未清楚是怎么筛选的、筛选结果的格式是什么，需要进一步根据stellarscope的输入和这个pipeline的输出进行研究

#### 构建Seurat对象

总体思路：关键普通基因使用STARsolo计数，hERV使用stellarscope计数，而最终我们是用普通基因先构建Seurat对象，再把stellarscope计数得到的矩阵作为一个assay挂载上去





### GSE138852

数据量较小（共78.18G，碱基数153.78G，样本量8个），但作者提供了详细的计数矩阵+条形码+基因（包括每个SRR run的和总的），并且使用10X Genomics，条形码和UMI位置易确定，打算先用这个跑通基本pipeline（STARsolo+stellarscope+构建Seurat对象）

[GEO界面](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE138852)

点开其中一个样本的页面[GSM4120422](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSM4120422)，可以看到是用什么测序技术测的（UMI和BC的位置和长度），关键信息：

```
I1 read: contains the sample index.
R1 read: contains the cell barcode (first 16 nt) and UMI (next 10 nt).
R2 read: contains the RNA sequence.
Using the Grch38 (1.2.0) reference from 10x Genomics
using the Chromium Single Cell 3′ Library & Gel Bead Kit v2 (10X Genomics, #PN-120237)
```

进入[SRA run](https://www.ncbi.nlm.nih.gov/Traces/study/?acc=PRJNA577618)中下载

#### STAR比对

因为下载下来得到的是`SRRxxx_1.fastq.gz`/`SRRxxx_2.fastq.gz`/`SRRxxx_3.fastq.gz`这样的文件，首先检测哪个是cDNA，哪个是UMI+barcode

```sh
zcat SRR10278808_1.fastq.gz | awk 'NR%4==2 {print length($0)}' | head
zcat SRR10278808_2.fastq.gz | awk 'NR%4==2 {print length($0)}' | head
zcat SRR10278808_3.fastq.gz | awk 'NR%4==2 {print length($0)}' | head
```

- `SRRxxx_1.fastq.gz`：8bp——index，对STAR计数不重要，可忽略
- `SRRxxx_2.fastq.gz`：26bp——UMI+barcodes
- `SRRxxx_3.fastq.gz`：116bp——cDNA

whitelist从哪里下载：有时CellRanger的安装目录里就有，不过我没找到，直接到GitHub的开源项目中搜，比如[10X Cell Ranger whitelists](https://github.com/Lab-of-Adaptive-Immunity/cr_whitelists)，把两个txt解压即可。因为是v2版本，所以用`737K-august-2016.txt`

```sh
cd /public/home/wangtianhao/Desktop/GSE138852/
module load miniconda3/base
conda activate STAR
mkdir -p star/res
cd star
# 注意以下命令执行时删掉#的行，否则只读到第一个#就不往下读了
STAR \
  --runMode alignReads \
  --runThreadN 16 \
  --genomeDir /public/home/wangtianhao/Desktop/STAR_ref/hg38/ \
  --readFilesIn /public/home/wangtianhao/Desktop/GSE138852/fastq/SRR10278808_3.fastq.gz /public/home/wangtianhao/Desktop/GSE138852/fastq/SRR10278808_2.fastq.gz \
  --readFilesCommand zcat \
  --outFileNamePrefix res/SRR10278808_ \
  # 条形码 \
  --soloType CB_UMI_Simple \
  --soloCBstart 1 \
  --soloCBlen 16 \
  --soloUMIstart 17 \
  --soloUMIlen 10 \
  --soloBarcodeReadLength 0 \
  --soloCBwhitelist /public/home/wangtianhao/Desktop/STAR_ref/whitelist/737K-august-2016.txt \
  # 计数/细胞筛选设置 \
  --clipAdapterType CellRanger4 \
  --soloCBmatchWLtype 1MM_multi_Nbase_pseudocounts \
  --soloUMIfiltering MultiGeneUMI_CR \
  --soloUMIdedup 1MM_CR \
  # BAM输出和Tags（给Stellarscope用） \
  --outSAMtype BAM SortedByCoordinate \
  --outSAMattributes NH HI nM AS CR UR CB UB GX GN sS sQ sM \
  # Stellarscope要求保留多重比对 \
  --outSAMunmapped Within \
  --outFilterScoreMin 30 \
  --limitOutSJcollapsed 5000000 \
  --outFilterMultimapNmax 500 \
  --outFilterMultimapScoreRange 5
```

#### stellarscope计数

```sh
module load miniconda3/base
conda activate stellarscope
cd /public/home/wangtianhao/Desktop/GSE138852/stellarscope/
mkdir -p res
# 按名称排序
samtools view -@1 -u -F 4 -D CB:<(tail -n+1 /public/home/wangtianhao/Desktop/GSE138852/star/res/SRR10278808_Solo.out/Gene/filtered/barcodes.tsv) /public/home/wangtianhao/Desktop/GSE138852/star/res/SRR10278808_Aligned.sortedByCoord.out.bam | samtools sort -@16 -n -t CB -T ./tmp > ./res/Aligned.sortedByCB.bam
# 计数
stellarscope assign \
  --exp_tag SRR10278808 \
  --outdir /public/home/wangtianhao/Desktop/GSE138852/stellarscope/res \
  --nproc 16 \
  --stranded_mode F \
  --whitelist /public/home/wangtianhao/Desktop/GSE138852/star/res/SRR10278808_Solo.out/Gene/filtered/barcodes.tsv \
  --pooling_mode individual \
  --reassign_mode best_exclude \
  --max_iter 500 \
  --updated_sam \
  /public/home/wangtianhao/Desktop/GSE138852/stellarscope/res/Aligned.sortedByCB.bam \
  /public/home/wangtianhao/Desktop/STAR_ref/transcripts.gtf
```

#### 循环运行并构建Seurat对象

```sh
genomeDir=/public/home/wangtianhao/Desktop/STAR_ref/hg38/
whitelist=/public/home/wangtianhao/Desktop/STAR_ref/whitelist/737K-august-2016.txt
hERV_gtf=/public/home/wangtianhao/Desktop/STAR_ref/transcripts.gtf
cd /public/home/GENE_proc/wth/GSE138852/
module load miniconda3/base
for SRR in $(cat ./fastq/SRR_Acc_List.txt); do
  conda activate STAR
  mkdir -p star
  STAR \
    --runMode alignReads \
    --runThreadN 16 \
    --genomeDir ${genomeDir} \
    --readFilesIn ./fastq/${SRR}_3.fastq.gz ./fastq/${SRR}_2.fastq.gz \
    --readFilesCommand zcat \
    --outFileNamePrefix star/${SRR}_ \
    --soloType CB_UMI_Simple \
    --soloCBstart 1 \
    --soloCBlen 16 \
    --soloUMIstart 17 \
    --soloUMIlen 10 \
    --soloBarcodeReadLength 0 \
    --soloCBwhitelist ${whitelist} \
    --clipAdapterType CellRanger4 \
    --soloCBmatchWLtype 1MM_multi_Nbase_pseudocounts \
    --soloUMIfiltering MultiGeneUMI_CR \
    --soloUMIdedup 1MM_CR \
    --outSAMtype BAM SortedByCoordinate \
    --outSAMattributes NH HI nM AS CR UR CB UB GX GN sS sQ sM \
    --outSAMunmapped Within \
    --outFilterScoreMin 30 \
    --limitOutSJcollapsed 5000000 \
    --outFilterMultimapNmax 500 \
    --outFilterMultimapScoreRange 5
  conda deactivate
  conda activate stellarscope
  mkdir -p stellarscope/${SRR}
  samtools view -@1 -u -F 4 -D CB:<(tail -n+1 ./star/${SRR}_Solo.out/Gene/filtered/barcodes.tsv) ./star/${SRR}_Aligned.sortedByCoord.out.bam | samtools sort -@16 -n -t CB -T ./tmp > ./stellarscope/${SRR}/Aligned.sortedByCB.bam
  stellarscope assign \
    --outdir ./stellarscope/${SRR} \
    --nproc 16 \
    --stranded_mode F \
    --whitelist ./star/${SRR}_Solo.out/Gene/filtered/barcodes.tsv \
    --pooling_mode individual \
    --reassign_mode best_exclude \
    --max_iter 500 \
    --updated_sam \
    ./stellarscope/${SRR}/Aligned.sortedByCB.bam \
    ${hERV_gtf}
  conda deactivate
done
```

### GSE157827

和上面GSE138852相比，同样都有作者提供的详细的计数矩阵+条形码+基因、都使用10X Genomics，但多了每个样本的注释信息（组别、性别、年龄、APOE等），同时数据量较大（共593.81G，碱基数2.02T，样本量21个）

[GEO界面](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE157827)

点开其中一个样本的页面[GSM4775561](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSM4775561)，可以看到是用什么测序技术测的（UMI和BC的位置和长度）

进入[SRA run](https://www.ncbi.nlm.nih.gov/Traces/study/?acc=PRJNA662923)中下载

关键信息：

```
using the Chromium Single Cell 3′ Library Kit v3 (1000078; 10x Genomics) 
```

在相关论文[Single-nucleus transcriptome analysis reveals dysregulation of angiogenic endothelial cells and neuroprotective glia in Alzheimer’s disease](https://www.pnas.org/doi/suppl/10.1073/pnas.2008762117)的补充材料[Dataset_S01 (XLSX)](https://www.pnas.org/doi/suppl/10.1073/pnas.2008762117/suppl_file/pnas.2008762117.sd01.xlsx)中可以下载到每个样本的具体信息（组别、性别、年龄、APOE等）：

![GSE157827_1](/upload/md-image/other/GSE157827_1.png){:width="800px" height="800px"}

同时还有一些国内的教程，例如[复现2：AD与Normal细胞类型水平的差异基因挖掘](https://www.jianshu.com/p/d7e086020fc8)，使用广泛

#### STAR比对

还是先看序列信息

```sh
zcat SRR12623876_1.fastq.gz | awk 'NR%4==2 {print length($0)}' | head
zcat SRR12623876_2.fastq.gz | awk 'NR%4==2 {print length($0)}' | head
```

- `SRRxxx_1.fastq.gz`：26bp——UMI+barcode
- `SRRxxx_2.fastq.gz`：98bp——cDNA

whitelist：因为是v3版本，所以用`3M-february-2018.txt`

```sh
cd /public/home/wangtianhao/Desktop/GSE157827/
module load miniconda3/base
conda activate STAR
mkdir -p star/res
cd star
STAR \
  --runMode alignReads \
  --runThreadN 16 \
  --genomeDir /public/home/wangtianhao/Desktop/STAR_ref/hg38/ \
  --readFilesIn /public/home/wangtianhao/Desktop/GSE157827/fastq/SRR12623876_2.fastq.gz /public/home/wangtianhao/Desktop/GSE157827/fastq/SRR12623876_1.fastq.gz \
  --readFilesCommand zcat \
  --outFileNamePrefix res/SRR12623876_ \
  --soloType CB_UMI_Simple \
  --soloCBstart 1 \
  --soloCBlen 16 \
  --soloUMIstart 17 \
  --soloUMIlen 10 \
  --soloBarcodeReadLength 0 \
  --soloCBwhitelist /public/home/wangtianhao/Desktop/STAR_ref/whitelist/3M-february-2018.txt \
  --clipAdapterType CellRanger4 \
  --soloCBmatchWLtype 1MM_multi_Nbase_pseudocounts \
  --soloUMIfiltering MultiGeneUMI_CR \
  --soloUMIdedup 1MM_CR \
  --outSAMtype BAM SortedByCoordinate \
  --outSAMattributes NH HI nM AS CR UR CB UB GX GN sS sQ sM \
  --outSAMunmapped Within \
  --outFilterScoreMin 30 \
  --limitOutSJcollapsed 5000000 \
  --outFilterMultimapNmax 500 \
  --outFilterMultimapScoreRange 5
```

#### stellarscope计数

```sh
module load miniconda3/base
conda activate stellarscope
cd /public/home/wangtianhao/Desktop/GSE157827/
mkdir -p stellarscope/res
cd stellarscope
samtools view -@1 -u -F 4 -D CB:<(tail -n+1 /public/home/wangtianhao/Desktop/GSE157827/star/res/SRR12623876_Solo.out/Gene/filtered/barcodes.tsv) /public/home/wangtianhao/Desktop/GSE157827/star/res/SRR12623876_Aligned.sortedByCoord.out.bam | samtools sort -@16 -n -t CB -T ./tmp > ./res/Aligned.sortedByCB.bam
stellarscope assign \
  --exp_tag SRR12623876 \
  --outdir ./res \
  --nproc 16 \
  --stranded_mode F \
  --whitelist /public/home/wangtianhao/Desktop/GSE157827/star/res/SRR12623876_Solo.out/Gene/filtered/barcodes.tsv \
  --pooling_mode individual \
  --reassign_mode best_exclude \
  --max_iter 500 \
  --updated_sam \
  ./res/Aligned.sortedByCB.bam \
  /public/home/wangtianhao/Desktop/STAR_ref/transcripts.gtf
```

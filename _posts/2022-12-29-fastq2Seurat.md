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
conda activate STAR_test
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
cd /public/home/wangtianhao/Desktop/GSE233208/fastq_test/
module load miniconda3/base
conda activate fastq-download
nohup parallel-fastq-dump --sra-id SRR24710599 --threads 8 --split-files  --tmpdir ./fastq_temp &
# 或者
nohup axel -n 8 ftp://ftp.sra.ebi.ac.uk/vol1/fastq/SRR247/098/SRR24710598/SRR24710598_2.fastq.gz > /dev/null 2> error.log &
nohup axel -n 8 ftp://ftp.sra.ebi.ac.uk/vol1/fastq/SRR247/098/SRR24710598/SRR24710598_1.fastq.gz > /dev/null 2> error.log &
for file in *.gz; do gunzip "$file"; done
```

conda rename -n download fastq-download

### STAR比对


```sh
module load miniconda3/base
conda activate STAR

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

先建一个`srr.txt`，里面放上要下载的SRR号

```sh


```

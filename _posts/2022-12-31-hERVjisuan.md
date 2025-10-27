---
layout: mypost
title: hERV的计算
category: other
subcategory: other-other
---

2025.10.17-2025.研究进展

<!-- more -->

### 一些基础知识补充

#### hERV的各种分类

**Family-level（家族层级）**：一组**具有序列相似性和共同起源的ERV元件**，根据其聚合酶基因序列（Pol蛋白序列）的相似性，通常用`HERV-X`表示，X是它入侵宿主祖先细胞时，所使用的外源性逆转录病毒包膜蛋白的受体类型
- **Superfamily（超家族/类别）**：按逆转录病毒的进化类群划分。`ClassI`包括γ和ε逆转录病毒(gamma- and epsilonretroviruses)，参与多种生理过程（胚胎发育、免疫通路、各类疾病），包括HERV-W、HERV-H、HERV-FRD、HERV-E、HERV-9等；`ClassII`包括α、β、δ逆转录病毒和慢病毒(alpha-, beta-, deltaretroviruses, and lentiviruses)，最研究深入的家族，与各类疾病密切相关，包括HERV-K等；`ClassIII`包括spumavirus，最古老，序列残片较多，无表达能力，包括HERV-L等
- **Family（家族）**：一类具有相似序列、共同起源的hERV插入序列，最常用，例如`HERV-K`、`HERV-W`、`HERV-H`、`HERV-L`等。家族之间差异很大，有的可能已有表达产物，有的完全失活，包括HERV-L 等
- **Subfamily（亚家族）**：部分比较大的family，进一步分为subfamily。例如HERV-K，可进一步分为`HML-1`~`HML-10`（HML指human MMTV-like，表示它们与小鼠乳腺病毒类似），其中HML-2是其中最年轻、保留编码能力最强的一类，常见于癌症/AD研究中；还有的例如HERV-H按序列相似性分为不同的插入群组（如group 1/group 2），但这类亚分类不太标准化，常用于特定研究

**Species-level（种级）**：某个特定hERV序列在人类基因组中的一个**特定插入位点**，是进行基因型-表型关联分析的最小单位。最开始一个前病毒整合到了基因组的一个特定位置，之后通过逆转录转座等机制，这个前病毒的“副本”被复制并插入到基因组的其他位置，每一个这样的独立插入单元，都被称为一个Species/Locus
- 例如在某个人类基因组中发现的一个HERV-K元件插入在7q11.23的某个位点，就是一个species-level的元素，基因组上还有很多个HERV-K家族插入在不同位点上，每一个位点都是一个独立单位(Species)

#### 插入基因组后如何影响基因表达

**顺式调控**：HERV在基因组中作为顺式作用元件，从而影响邻近基因的转录——HERV的LTR具有启动子/增强子/绝缘子的功能，含有转录起始位点及转录终止(polyA)信号
- 作为基因的替代**启动子**，启动该基因的转录
  
  启动子(promoter)：RNA聚合酶开始转录的结合位点
- 作为**增强子**提高邻近基因转录，依赖LTR序列中存在的转录因子结合位点(TFBS)
  
  增强子(Enhancer)：与特异转录因子结合的DNA短区，在任何方向、上游或下游调控转录
- 作为**绝缘子**或包含**转录终止信号**，影响基因表达边界，LTR序列两端的U5和U3区可携带终止转录的polyA信号，可导致上游转录在此提前终止
  
  绝缘子(Insulators)：位于增强子和启动子之间的调控序列，与绝缘子结合蛋白结合，确保某个增强子只影响特定的启动子，阻隔远端增强子对基因的不恰当作用

  ![启动子+增强子+绝缘子](/upload/md-image/other/启动子+增强子+绝缘子.png){:width="450px" height="450px"}

**反式调控**：通过其转录产物（蛋白或RNA）对远距离的基因进行调控
- HERV**蛋白质**：直接充当新的细胞因子或膜蛋白，影响细胞通讯，或者通过干扰宿主转录因子、受体通路等间接改变基因表达。例如HERV-K(HML-2)家族编码的Rec和Np9蛋白可以物理结合一种转录抑制因子（PLZF，一种肿瘤抑制因子），从而解除PLZF对其靶基因的转录抑制，导致致癌基因过度表达
- HERV**非编码RNA**：HERV产生的长非编码RNA或反转录病毒粒子RNA也能在细胞内迁移，并影响远端基因表达。例如长非编码RNA可结合调节转录因子复合物，从而改变相应基因表达；HERV的RNA可能被包装进外泌体或病毒样颗粒，在细胞间传递影响邻近细胞的基因表达模式（比如肿瘤微环境中引起周围免疫细胞活化）

**表观遗传**：人体通过多种DNA甲基化和组蛋白修饰机制，使大部分HERV元件被高度DNA甲基化覆盖，并缠绕在异染色质中，从而转录沉默
- 当一个HERV插入到某个基因/基因调控区旁边时，可能通过DNA甲基化/组蛋白修饰/异染色质传播影响邻近的基因。例如当插入序列高度甲基化并为异染色质形态时，可能**将沉默效应带到邻近基因**，导致该基因转录受抑；某些情况下，HERV插入的存在会引发局部**去甲基化或异染色质边界改变**，使邻近基因意外激活或表达失调
- **HERV插入序列的转录因子结合位点和结构蛋白结合位点也可能发生表观遗传修饰变化**，影响相应转录因子的结合和染色质构象，进而改变基因表达

**干扰基因转录**：
- 如果HERV以与宿主基因相反的方向插入，那么HERV的LTR（作为启动子）可能驱动产生一条与宿主基因mRNA互补的**反义RNA**，并与宿主mRNA形成双链RNA，从而阻碍mRNA的翻译
- 与宿主基因**竞争转录因子结合位点/启动子和增强子**
- 可能引入新的剪接供体或受体位点，扰乱原有剪接信号，导致**产生异常可变剪接产物**
  - HERV序列中存在潜在的剪接供体/受体位点，插入基因内含子后，其LTR或内部序列可以**充当新的外显子**
  - 破坏原有剪接信号或引入竞争性剪接信号，从而**改变宿主基因的剪接模式**，比如使本来被隐蔽的剪接位点显现，替代原本的剪接位点
  - **与邻近基因拼接成嵌合转录本/截短转录本**：HERV作为新启动子或polyA信号，使转录提前从HERV序列开始或在HERV处终止，或者插入在外显子内，导致部分HERV序列作为插入外显子拼接到正常mRNA中

其它：
- 双链RNA可能会被Dicer酶识别而产生**siRNA**，沉默具有相同序列的转录本
- 部分HERV序列被识别成miRNA基因，产生成熟**miRNA**，降解或抑制特定宿主mRNA实现对细胞通路的调控
- 部分HERV转录本带有**miRNA结合位点**，通过竞争抑制，上调那些miRNA原本抑制的基因
- 通过“**类病毒效应**”在宿主抗感染通路中影响相关基因表达
- 部分HERV序列带有结构蛋白结合位点，重塑更大范围的染色质三维结构：形成新染色质边界，影响基因调控；改变染色质环的拓扑结构，影响异染色质传播

### 计算流程

#### ENCODE数据+bowtie2比对+Telescope计数

[参考论文Telescope: Characterization of the retrotranscriptome by accurate estimation of transposable element expression](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1006453)

[相关数据和代码](https://github.com/lwstkhyl/hERV_calc/tree/main/TelescopeEncode)

##### 序列下载与比对

**配置环境**：
```sh
conda create -n telescope -c conda-forge -c bioconda \
  python=3.10 telescope bowtie2 samtools sra-tools parallel-fastq-dump \
  flexbar bedtools entrez-direct pigz -y
conda activate telescope
```
**下载ENCODE数据**：以SRP014320中的H1-hESC细胞系为例
```sh
# 列出 SRP014320 的全部测序结果，并保存 CSV
esearch -db sra -query SRP014320 | efetch -format runinfo > SRP014320_runinfo.csv
# 以 H1-hESC 为例筛选
grep -i 'H1' SRP014320_runinfo.csv > H1_runinfo.csv
# 提取 SRR 列
awk -F, 'NR>1 {print $1}' H1_runinfo.csv > SRR_H1.txt
```
为了节省磁盘空间，只取`SRR_H1.txt`的前两个数据`SRR521515`和`SRR521514`
```sh
# 并行下载并直接生成FASTQ
parallel-fastq-dump --sra-id $(head -n1 SRR_H1.txt) --threads 8 --split-files --outdir fastq
# 质控/剪接
flexbar -r fastq/$(head -n1 SRR_H1.txt)_1.fastq -p fastq/$(head -n1 SRR_H1.txt)_2.fastq \
        -t fastq/$(head -n1 SRR_H1.txt)_trim --adapter-trim-end RIGHT --min-read-length 30
```
- 生成一个fastq文件夹，主要包含4个文件，格式为`SRR521514_trim_1.fastq`和`SRR521514_trim_2.fastq`

注：这里`$(head -n1 SRR_H1.txt)`是取txt里的第一行样本，没有设置循环，需要手动执行两次（下面类似）

**下载人类参考基因组hg38**：
```sh
mkdir refs && cd refs
wget https://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/latest/hg38.fa.gz
gunzip hg38.fa.gz
bowtie2-build hg38.fa hg38
cd ..
```
- 生成的refs文件夹即为hg38参考基因组

**下载HERV注释**：直接用作者提供的HERV_rmsk.hg38.v2/genes.gtf
```sh
# 需要先下载git lfs
sudo apt-get install git-lfs
git lfs install
git clone https://github.com/mlbendall/telescope_annotation_db
# 根据人类参考基因组版本选择注释文件路径
ANN=./telescope_annotation_db/builds/HERV_rmsk.hg38.v2/genes.gtf
```
注：后来仔细看了下GitHub仓库，好像应该用同路径下的transcripts.gtf作telescope的注释

**比对到基因组**：使用论文参数运行时发现时间非常长，于是调整参数
```sh
SRR="SRR521515"
bowtie2 -x refs/hg38 -1 fastq/${SRR}_trim_1.fastq -2 fastq/${SRR}_trim_2.fastq \
  # --very-sensitive-local -k 100 --score-min L,0,1.6 -p 8 \  # 论文参数
  --sensitive-local -k 20 --score-min L,0,1.6 -p 8 \  # 为节省时间调整后参数
  2> ${SRR}.bowtie2.log | samtools view -bS - | samtools sort -o ${SRR}.sorted.bam
SRR="SRR521514"
bowtie2 -x refs/hg38 -1 fastq/${SRR}_trim_1.fastq -2 fastq/${SRR}_trim_2.fastq \
  # --very-sensitive-local -k 100 --score-min L,0,1.6 -p 8 \  # 论文参数
  --sensitive-local -k 20 --score-min L,0,1.6 -p 8 \  # 为节省时间调整后参数
  2> ${SRR}.bowtie2.log | samtools view -bS - | samtools sort -o ${SRR}.sorted.bam
```
- 生成`SRR521515.sorted.bam`和`SRR521514.sorted.bam`

观察这两个样本是否为同一个H1样本的技术重复：
```sh
# 分别拉取 runinfo（CSV），看关键列是否一致
esearch -db sra -query SRR521514 | efetch -format runinfo > SRR521514.csv
esearch -db sra -query SRR521515 | efetch -format runinfo > SRR521515.csv
```
查询`SRR521514.csv`和`SRR521515.csv`
- 同一Experiment且同一BioSample：同一文库被多次上机，是技术重复，可合并作为一个样本来运行后续步骤
- Experiment不同但BioSample相同：同一生物样本做了不同文库；通常也按技术重复处理，但合并前要确认LibraryStrategy/Layout/读长/建库是否一致；也可以分别运行，最后合并基因表达量
- BioSample不同：不是同一样本（一般是生物学重复），不要合并

这里发现Experiment和BioSample都相同，因此运行下面的合并命令
```sh
samtools merge H1_sample.merged.bam SRR521515.sorted.bam SRR521514.sorted.bam -@ 8
```
- 生成`merge H1_sample.merged.bam`——整合后的bam文件

**telescope**：需要输入的BAM文件不能是坐标排序，必须`samtools sort -n`或`samtools collate`
```sh
samtools sort -o H1_sample.merged.sorted.bam H1_sample.merged.bam -@ 8
samtools index H1_sample.merged.sorted.bam
samtools collate -@ 8 -o H1_sample.collate.bam H1_sample.merged.sorted.bam
```
- 最后生成`H1_sample.collate.bam`——排序后的比对结果

先检查telescope是否能正常运行
```sh
eval $(telescope test)
```
- 正常会生成一个`telescope-telescope_report.tsv`，我这里报错`AttributeError: module 'numpy' has no attribute 'int'.`，查询GitHub issue后发现是作者的源码有问题。把`/home/userName/miniconda3/envs/telescope_env/lib/python3.10/site-packages/telescope/utils/model.py`里面的`np.int`改成`int`即可

```sh
mkdir telescope_out
telescope assign H1_sample.collate.bam ${ANN} \
  --outdir telescope_out --exp_tag H1_sample \
  --theta_prior 200000 --max_iter 200
```

![telescope_res](/upload/md-image/other/telescope_res.png){:width="800px" height="800px"}

##### 步骤详解

**ENCODE数据**：可以在ENCODE官网下载，也常常同步到NCBI SRA数据库
- `SRP`：项目编号（例如"ENCODE Caltech RNA-seq"）
- `SRX`：项目中某次实验的编号（标明建库类型、读长/平台等）
- `SRS`：实验中某个样本的编号（例如"细胞系/细胞类型H1-hESC"）
- `SRR`：对样本测序时某次上机/测序运行的编号，同一个SRX/SRS可能有多个SRR
  - 技术重复：同一文库多次上机，可以合并BAM文件，当作同一个样本
  - 生物学重复：不同个体/细胞培养批次的样本，分析时要作为独立样本，分别定量

**bowtie2比对**：
- 输入：将成对或单端的FASTQ（原始reads），Bowtie2索引（例如这里的人类参考基因组hg38）
- 目的：为每条read找出在基因组中的匹配位置
  - 对于hERV/TE，因为基因组上存在很多重复序列，所以很多reads有多个同样好的位置，因此用`-k 100`保留多重匹配（最多保留100条匹配记录）
  - `--very-sensitive-local`/`--sensitive-local`：更宽松、允许局部匹配，能识别截断或带错配的TE片段
  - `--score-min L,0,1.6`：放宽打分阈值，让低错配但多拷贝的reads不被扔掉
- 输出：SAM文件（纯文本）
  - `samtools view -bS -`：将SAM转换成BAM（二进制文件，省空间、读写快）
  - `samtools sort`：按坐标（染色体/位置）排序，是很多软件常用的格式（能建索引、能快速随机访问、便于可视化）
  - `samtools collate`/`samtools sort -n`：按read名称排序，不能建索引
  - `samtools index`：给按坐标排序的BAM文件建索引，生成`.bai`文件，方便后续查看、统计
  - `samtools merge`：把多次上机的技术重复合并成一个BAM，避免后面重复计算

**Telescope计数**：
- 输入：按read名称聚集的BAM文件、hERV注释GTF
- 目的：把多重比对的读段匹配到具体的hERV位点
  - 把唯一比对的reads直接记入对应位点，多重比对的reads用 EM/贝叶斯模型在候选位点间重分配，直到收敛
  - 因为hERV/TE多拷贝/高相似度的特性，同一条read会有多条比对记录。而Telescope在重分配时需要一次性拿到这条read的所有候选位置，要求BAM里同一read的多条匹配记录挨在一起，而坐标排序会把这几条记录分散到整条染色体，telescope无法正确聚合
  - `--theta_prior`：给“歧义分配”一个惩罚型先验，防止把噪声硬塞进错误位点
  - `--max_iter`：迭代上限
- 输出：每个hERV位点(Species-level)的表达数量
- 优势：如果只计数唯一比对，可能会丢掉大量多重比对的读段。而telescope同时利用唯一与多重信息，用EM模型将读段按全局一致性重分配，更有利于比对species-level——能把同一家族不同基因座的表达区分开

**Telescope结果表格**：
- **`transcript`**：位点/转录单元ID（来自注释GTF文件的locus等属性）
- **`final_count`**：最终分配给该位点的片段数（常用于后续进行差异表达等分析）
- `final_conf`：高置信（后验≥阈值）的分配片段数
- `final_prop`：该位点的最终比例参数π（样本内归一化的相对丰度）
- `unique_count`：唯一比对到该位点的片段数（无需重分配的片段数）
- `init_aligned`：初始化时“对这个位点有命中”的片段数（多重比对被重复计入时的情况）
- `init_best/init_best_random/init_best_avg/init_prop`：不同初始策略下的计数或π，用来对比“EM之前”的起点与“EM之后”(final_*)的差异

#### ERVmap

```sh
mkdir ERVmap
cd ERVmap
mkdir input
parallel-fastq-dump --sra-id SRR521514 --threads 8 --split-files --outdir input
parallel-fastq-dump --sra-id SRR521515 --threads 8 --split-files --outdir input
cat SRR521514_1.fastq SRR521515_1.fastq > H1_R1.fastq
cat SRR521514_2.fastq SRR521515_2.fastq > H1_R2.fastq
gzip H1_R1.fastq
gzip H1_R2.fastq
```

```sh
sudo apt-get update && sudo apt-get install -y docker.io
sudo usermod -aG docker $USER  # 重启终端
cd /etc/docker
sudo nano daemon.json
```
```
{ "registry-mirrors": ["https://docker.registry.cyou", 
"https://docker-cf.registry.cyou", "https://dockercf.jsdelivr.fyi", 
"https://docker.jsdelivr.fyi", "https://dockertest.jsdelivr.fyi", 
"https://mirror.aliyuncs.com", "https://dockerproxy.com", 
"https://mirror.baidubce.com", "https://docker.m.daocloud.io", 
"https://docker.nju.edu.cn", 
"https://docker.mirrors.sjtug.sjtu.edu.cn", 
"https://docker.mirrors.ustc.edu.cn", "https://mirror.iscas.ac.cn", 
"https://docker.rainbond.cc"]
}
```

```sh
docker pull eipm/ervmap
```

https://hub.docker.com/r/eipm/ervmap

```sh
wget https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_49/GRCh38.p14.genome.fa.gz
wget https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_49/gencode.v49.annotation.gtf.gz
for gz in *.gz; do gunzip $gz; done
STAR --runMode genomeGenerate \
     --runThreadN 8 \
     --genomeDir  ~/ervmap/ref/STAR_hg38 \
     --genomeFastaFiles GRCh38.p14.genome.fa \
     --sjdbGTFfile      gencode.v49.annotation.gtf \
     --sjdbOverhang 99 \
     --limitGenomeGenerateRAM 125000000000
```

```sh
docker run --rm -it \
  -v ~/ervmap/input:/work/input \
  -v ~/ervmap/ref:/work/ref \
  -v ~/ervmap/out:/work/output \
  eipm/ervmap \
  bash -lc "cd /opt/ERVmap && bash ERVmap_auto.sh /work/input"
```

#### Repeatmasker

**[Repeatmasker](https://www.repeatmasker.org/)**：重复序列检测，通过与参考数据库的相似性比对来准确识别或屏蔽基因组中的重复序列，属于同源预测注释的方式
- [安装](https://blog.csdn.net/m0_65437087/article/details/148420035)

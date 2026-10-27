---
layout: mypost
title: AD新项目202609
category: other
subcategory: other-other
---

Systematic characterization of disease-relevant transcription, transcript structures and regulatory mechanisms of human endogenous retroviruses in Alzheimer’s cortex

<!-- more -->

| 数据集                                                                                                 | 样本量                                                   | 脑区                                     | 建库方法/详细信息                                                          | 用途                                                                      |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [GSE157827](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE157827)                              | snRNA：12AD+9NC                                          | 前额叶皮层PFC                            | 10x 3′v3                                                                   | 差异表达                                                                  |
| [GSE174367](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE174367)                              | snRNA：11AD+7NC<br>snATAC：12AD+8NC<br>191份bulk RNA     | 主要为前额叶皮层PFC，bulk包含多个脑区    | snRNA：10x 3′v3<br>snATAC：10x ATAC v1<br>bulk：SMARTer Stranded Total RNA | snRNA差异表达<br>snATAC染色质开放+TF调控<br>bulk转录结构验证+差异表达验证 |
| [GSE214979](https://ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE214979)                                  | 同核snRNA-seq和snATAC-seq：7AD+8control                  | DLPFC                                    | 10x Genomics Chromium Next GEM Single Cell Multiome ATAC+Gene Expression   | snRNA差异表达<br>snATAC染色质开放+TF调控                                  |
| [GSE183068](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE183068)                              | snRNA：15AD+8control                                     | 额叶皮层                                 | 10x 3′v3                                                                   | snRNA差异表达                                                             |
| [GSE310554](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE310554)                              | snRNA：9AD+9control                                      | 前额叶皮层                               | 10x 3′v3.1                                                                 | snRNA差异表达                                                             |
| [GSE303823](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE303823)                              | snRNA：4AD+4control                                      | 前额叶、中额回，包含灰质及白质           | 10x 3′v3.1                                                                 | 候补（snRNA差异表达/同脑区独立验证）                                      |
| ~~[GSE222494](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE222494)~~<br>下载时发现无原始fastq | snRNA-seq：8sporadic AD+8control+8PSEN1-E280A            | frontal cortex                           | 10x 3′v3.1                                                                 | 候补（snRNA差异表达/同脑区独立验证）                                      |
| [GSE263468](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE263468)                              | snRNA-seq：BA9共42供体<br>（低病理17、中间10、高病理15） | BA9前额叶、BA7楔前叶、BA17初级视觉皮层等 | Drop-seq/10x 3′v3/v2<br>含All Nuclei与NeuN富集文库                         | 候补（snRNA差异表达/同脑区独立验证）（因为病理不完全等于AD-NC）           |
| [GSE268599](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE268599)                              | snRNA-seq：BA46前额叶有32位供体、146个脑区样本           | EC、ITG、BA46 DLPFC、V2、V1              | 去除神经元和少胶后进行10x 3′snRNA-seq                                      | 星胶富集，后续验证用                                                      |
| [GSE237718](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE237718)                              | snRNA-seq：29AD+27control                                | temporal cortex                          | 10x 3′v3                                                                   | 跨脑区独立验证（颞叶）                                                    |
| [SRP456327](https://trace.ncbi.nlm.nih.gov/Traces/study/?acc=SRP456327)                                | 长读长RNA seq：6AD+6control                              | DLPFC，BA9/46                            | poly(A)富集PCR-cDNA<br>Oxford Nanopore PromethION                          | 转录本结构判定                                                            |
| [GSE282551](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE282551)                              | 长读长RNA seq：16NC+14精神分裂症                         | DLPFC BA8/9 cortex                       | PacBio Sequel II/IIe Iso-Seq                                               | 转录本结构判定                                                            |

- 主分析数据：GSE157827的21位+GSE174367的18位+GSE214979的15位+GSE183068的23位+GSE310554的18位，总计约95位供体（54AD+41对照）

![暑假后_26](/upload/md-image/other/暑假后_26.jpg){:width="800px" height="800px"}

### 数据下载

已经下载了GSE157827的snRNA和GSE174367的snRNA+bulkRNA+snATAC数据，继续下载其它数据：使用[GPT生成的下载脚本](https://lwstkhyl.me/api/download/A_new_start%2Fscript%2FAD_download_bundle.zip?)

```sh
cd /public/home/GENE_proc/wth/ADnew/AD_download_bundle
module load miniconda3/base
conda activate fastq-download
bash 00_setup.sh  # 把清单和metadata放入用于存放fastq的目录
bash 02a_check_read_structure.sh  # 检查snRNA读段拆分是否完整
nohup bash 01_download_longread.sh > ../logs/longread_parallel.log 2>&1 &  # 长读长：依次下载ONT和PacBio
nohup bash 02_download_snRNA.sh > ../logs/snRNA.log 2>&1 &  # snRNA：依次下载三个新增主队列
# nohup bash 03_download_SEA_AD.sh archive > ../logs/SEA_AD.log 2>&1 &  # SEA-AD：当前研究相关处理后数据归档
nohup bash 03_download_SEA_AD.sh core > ../logs/SEA_AD_core.log 2>&1 &  # SEA-AD中最直接用于reference的数据（SEA-AD下载速度比较慢，优先下载最关键数据）
tail -f /public/home/GENE_proc/wth/ADnew/logs/longread_parallel.log
tail -f /public/home/GENE_proc/wth/ADnew/logs/snRNA.log
tail -f /public/home/GENE_proc/wth/ADnew/logs/SEA_AD_core.log
```

### hERV注释构建SRP456327

#### 已有注释搜寻

[Telescope](https://github.com/mlbendall/telescope_annotation_db/tree/master/builds/HERV_rmsk.hg38.v2)：
- `genes.gtf`：每个位点的整体范围，可能包含RepeatMasker未匹配的间隔
- `transcripts.gtf`：	位点及其组成片段，片段以exon行表示
  
  一个hERV位点可能由几段被RepeatMasker识别出的片段组成，片段之间存在间隔，`genes.gtf`会用一个连续区间，把这些片段和中间的间隔一起包含进去，而`transcripts.gtf`就只记录片段
  - 这个间隔中实际存在DNA，只是没有被这些已注释的hERV片段覆盖；它可能包含退化后难以识别的hERV序列，也可能包含插入的其他序列
  - `genes.gtf`用于确定“这个位点整体在哪里”，组成片段用于确定“其中哪些区域有重复序列注释支持”
- `families.tsv`：HERV家族、internal模型及相关LTR模型的对应关系
- Telescope已经收录了一部分与internal归在同一位点的LTR，主要需要扩展的是独立LTR，以及未收录的片段或位点

[ERVmap](https://github.com/mtokuyama/ERVmap)：`ref/ERVmap.bed`
- 3220条记录的`strand`全部写为`+`
- 先用于核对位点坐标和收录关系,方向再结合RepeatMasker等资源确定

[RepeatMasker](https://www.repeatmasker.org/)：
- 两组数据：
  - [rmsk.txt.gz](https://hgdownload.soe.ucsc.edu/goldenPath/hg38/database/rmsk.txt.gz)：完整重复元件表
  - [rmsk.sql](https://hgdownload.soe.ucsc.edu/goldenPath/hg38/database/rmsk.sql)：说明每一列的名称和类型
- 重点关注：
  - `genoName、genoStart、genoEnd、strand`给出基因组位置
  - `repName、repClass、repFamily、repStart、repEnd、repLeft`：帮助判断它属于什么重复模型，以及是否只是模型的一部分
- 先提取repClass=LTR的宽范围集合，再区分HERV及相关LTR、MaLR和分类不确定的记录
  - 不能只按名称是否包含“HERV”筛选，否则会漏掉大量以LTR、MER、MLT命名的元件
- [Dfam](https://www.dfam.org/home)：可以先获取[Dfam4.0的curated EMBL](https://www.dfam.org/releases/Dfam_4.0/families/Dfam-curated_only-1.embl.gz)文件，用于核对家族信息

[SERVE](https://github.com/janky-yz/SERVE)：来自[《The landscape of hervRNAs transcribed from human endogenous retroviruses across human body sites》](https://link.springer.com/article/10.1186/s13059-022-02804-w)
- `Annotation/*_HERV.gtf`：从GTEx RNA-seq中重建的转录本，包含transcript和exon行
  - 有42个组织GTF，包含10个Brain_*文件。先检查`Brain_BA9_HERV.gtf`、`Brain_Cortex_HERV.gtf`和`Brain_Hippocampus_HERV.gtf`
- `Annotation/HERV_noncoding.bed.gz`：流程使用的基因组候选区域
- [论文Additional file 2](https://media.springernature.com/original/springer-static/esm/art%3A10.1186%2Fs13059-022-02804-w/MediaObjects/13059_2022_2804_MOESM2_ESM.xlsx)：统一hervRNA目录及结构分类

[HERVarium](https://github.com/funcgen/herv-regulatory-map)：来自[《Regulatory Features and Functional Specialization of Human Endogenous Retroviral LTRs: A Genome-Wide Annotation and Analysis via HERVarium》](https://www.biorxiv.org/content/10.64898/2026.02.17.706328v1)，可以直接下载[处理好的数据](https://zenodo.org/records/19593457)
- `HERV_ltr.bed`：重建后的LTR坐标
- `HERV_internal_LTR_map.tsv`：internal与两端LTR的对应关系
- `HERV_LTR_U3_R_U5_catalogue.tsv`：LTR角色、关联internal、置信度及推断依据





#### 长读长数据处理

**两种长读长测序数据**：
- **ONT**：通过检测核酸经过纳米孔时引起的电流变化，再通过basecalling将信号转换为碱基序列。下载得到FASTQ，说明电流信号到碱基序列的转换已经完成，本次脚本直接从FASTQ开始处理
- **PacBio**：利用同一个SMRTbell分子的多次读取结果，计算一条一致性序列，提高序列准确性。这里合并的是同一测序分子的多次观测，并不是把某个基因的所有reads合成一条
  - 环形一致性测序(**CCS**, Circular Consensus Sequencing)：测序时，将一个DNA片段的两端连接发夹接头，形成SMRTbell模板，聚合酶沿模板运行，多次读取这个DNA片段，得到多次测序结果；最后软件综合这些结果，减少随机测序错误，最终输出一条更准确的序列，即CCS read
  
    CCS主要提高碱基准确性，不能直接说明这条read已经去除建库引物、覆盖完整RNA，或不存在技术串联，所以后面仍然需要Lima、Cutadapt和转录本结构质控
- 需要考虑两个问题：
  - 序列准确性：read中的碱基是否可靠。CCS主要解决这一问题
  - 分子及转录本结构：read是否仍含引物、方向是否正确、是否包含技术串联、是否覆盖真实RNA端点。这些还需要后续检查

**使用的软件**：
- **ONT**：
  - pychopper：识别建库引物、统一方向，并回收部分串联片段
    - 建库时加到cDNA两端的引物，相当于能够识别的边界标记。找到它们的位置和方向后，软件就能判断哪些序列位于有效引物组合之间，并将相应片段截取、定向
    - 输出分为三类：
      - single：正常识别的有效双引物reads
      - rescued：从复杂引物结构中回收的有效片段
      - unclassified：未能确定有效引物组合的reads

      前两种直接纳入主流程
    - 一条测序read中包含两个具有有效引物边界的片段，pychopper可能将其拆成两条输出
  - Cutadapt：去除识别到的3′poly(A)尾，保留处理后至少50nt的reads
    - poly(A)通常是RNA加工时添加的尾部，不对应基因组中连续编码的一段外显子序列
- **PacBio**：
  - 先恢复CCS名称，为Lima准备输入：原来read名称是`@SRR31437231.1 m64077_210213_204517/0/ccs length=3217`，现在把第二个字段恢复为主read ID，使Lima能够按原始CCS命名识别输入，同时记录新旧ID的对应关系
    - ONT没有这一步，是因为当前pychopper处理不需要恢复这种PacBio专有的CCS名称
  - Lima：与pychopper的目标相同，都是找到符合预期的引物组合，去除引物，确定方向，但它使用的是PacBio Iso-Seq对应的引物和处理规则
  - cutadapt：进一步扫描残留引物，分离暂不适合用于主结构发现的reads；对未检出残留引物的组进行poly(A)处理（与ONT部分相同）
  - 官方常见路线是在Lima后用`isoseq refine`处理poly(A)和人工串联，输出FLNC(Full-Length Non-Concatemer reads)，但因为要求的lima输入是PacBio BAM格式，而我们的原始数据是fastq

---

**为什么短读长和长读长处理流程不同**：
- 长读长分析需要保留并检查整条read的外显子组合和两端信息
- 短读长数据的建库结构不同于长读长，所以去接头、处理poly(A)等步骤不能直接套用另一种文库的引物序列和判断规则
- 短读长和长读长RNA都需要剪接比对，但一条长read可能跨越更多外显子，也可能包含不同特点的错配、插入和缺失
- 后续输出目标：
  - 常规短读长bulk表达分析：基因或转录本×样本的表达矩阵
  - 长读长参考构建：转录本的外显子结构、端点、支持reads和样本来源

##### 数据预处理

- ONT(SRP456327)：pychopper按PCS111识别引物、定向并拆分部分串联reads，将正常输出与回收的有效读段(rescued reads)合并，再去除poly(A)，未分类reads单独保留
- PacBio Iso-Seq(GSE282551)：恢复原始CCS名称并保存对应表，使用Lima去引物、定向，单独保存仍含已知引物的reads，再处理poly(A)。输出称为“处理后的CCS”，后续继续核查转录本结构
- 质控：SeqKit统计全部reads；NanoPlot分别使用处理前后的前10万条reads生成预览图，最终长度下限为50nt

[完整脚本下载](https://lwstkhyl.me/api/download/A_new_start%2Fscript%2FAD_longread_preprocess_20261026.zip?)

```sh
cd /public/home/GENE_proc/wth/ADnew/longread/AD_longread_preprocess_20261026
bash submit.sh all
```

具体步骤：

```sh
# 统计全部原始reads
seqkit stats -j "$threads" -a -T "$input_fastq" \
    > "$run_dir/raw_stats.tsv"
# ONT：识别引物、定向和拆分串联reads
pychopper -k PCS111 -m phmm -Q 7 -z 50 -t "$pychopper_threads" \
    -r "$run_dir/pychopper.pdf" -S "$run_dir/pychopper.tsv" \
    -u "$work_dir/unclassified.pipe" -w "$work_dir/rescued.pipe" \
    "$input_fastq" "$work_dir/single.pipe" \
    > "$run_dir/pychopper.stdout.log" 2> "$run_dir/pychopper.log"
# 合并正常reads和回收片段，去除poly(A)，保留处理后至少50nt的reads
pigz -dc -- "$work_dir/single.fastq.gz" "$work_dir/rescued.fastq.gz" \
    | cutadapt -j "$threads" --poly-a -m 50 \
        --json "$run_dir/cutadapt.json" \
        -o "$work_dir/prepared.tmp.fastq.gz" - \
        > "$run_dir/cutadapt.log" 2>&1
# PacBio：恢复CCS名称，再使用Lima去引物和定向
python "$code_dir/normalize_pacbio_names.py" "$input_fastq" \
    "$work_dir/ccs.native.fastq.gz" "$run_dir/read_id_map.tsv.gz" \
    > "$run_dir/restore_names.log" 2>&1
# Lima
lima "$work_dir/ccs.native.fastq.gz" \
    "$code_dir/pacbio_primers.fasta" "$work_dir/lima.fastq.gz" \
    --isoseq --split-named -j "$threads" \
    > "$run_dir/lima.log" 2>&1
# 分离仍含已知引物的reads
cutadapt -j "$threads" -e 0.1 -O 18 --action=none \
    -b "file:$code_dir/pacbio_residual_primers.fasta" \
    --untrimmed-output "$work_dir/no_residual_primer.fastq.gz" \
    --json "$run_dir/residual_primers.json" \
    -o "$run_dir/reads.residual_primer.fastq.gz" "$lima_fastq" \
    > "$run_dir/residual_primers.log" 2>&1
# 对没有检出残留引物的reads去除poly(A)并筛选长度
cutadapt -j "$threads" --poly-a -m 50 \
    --json "$run_dir/cutadapt.json" \
    -o "$work_dir/prepared.tmp.fastq.gz" "$work_dir/no_residual_primer.fastq.gz" \
    > "$run_dir/cutadapt.log" 2>&1
# ONT/PacBio：确定最终FASTQ，并统计全部处理后reads
mv "$work_dir/prepared.tmp.fastq.gz" "$run_dir/reads.prepared.fastq.gz"
seqkit stats -j "$threads" -a -T "$run_dir/reads.prepared.fastq.gz" \
    > "$run_dir/prepared_stats.tsv"
# 分别取处理前后的前10万条reads生成质控预览
seqkit head -j 2 -n 100000 "$input_fastq" \
    -o "$qc_dir/raw.preview.fastq.gz"
seqkit head -j 2 -n 100000 "$run_dir/reads.prepared.fastq.gz" \
    -o "$qc_dir/prepared.preview.fastq.gz"
for stage in raw prepared; do
    NanoPlot -t 4 --fastq "$qc_dir/$stage.preview.fastq.gz" \
        --loglength --plots dot --no_static --tsv_stats \
        --outdir "$qc_dir/$stage" > "$qc_dir/$stage.log" 2>&1
done
```







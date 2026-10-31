---
layout: mypost
title: AD新项目202609
category: other
subcategory: other-other
---

Systematic characterization of disease-relevant transcription, transcript structures and regulatory mechanisms of human endogenous retroviruses in Alzheimer’s cortex

<!-- more -->

| 数据集                                                                                                                    | 样本量                                                   | 脑区                                     | 建库方法/详细信息                                                          | 用途                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [GSE157827](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE157827)                                                 | snRNA：12AD+9NC                                          | 前额叶皮层PFC                            | 10x 3′v3                                                                   | 差异表达                                                                  |
| [GSE174367](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE174367)                                                 | snRNA：11AD+7NC<br>snATAC：12AD+8NC<br>191份bulk RNA     | 主要为前额叶皮层PFC，bulk包含多个脑区    | snRNA：10x 3′v3<br>snATAC：10x ATAC v1<br>bulk：SMARTer Stranded Total RNA | snRNA差异表达<br>snATAC染色质开放+TF调控<br>bulk转录结构验证+差异表达验证 |
| [GSE214979](https://ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE214979)                                                     | 同核snRNA-seq和snATAC-seq：7AD+8control                  | DLPFC                                    | 10x Genomics Chromium Next GEM Single Cell Multiome ATAC+Gene Expression   | snRNA差异表达<br>snATAC染色质开放+TF调控                                  |
| [GSE183068](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE183068)                                                 | snRNA：15AD+8control                                     | 额叶皮层                                 | 10x 3′v3                                                                   | snRNA差异表达                                                             |
| [GSE310554](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE310554)                                                 | snRNA：9AD+9control                                      | 前额叶皮层                               | 10x 3′v3.1                                                                 | snRNA差异表达                                                             |
| [GSE303823](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE303823)                                                 | snRNA：4AD+4control                                      | 前额叶、中额回，包含灰质及白质           | 10x 3′v3.1                                                                 | 候补（snRNA差异表达/同脑区独立验证）                                      |
| ~~[GSE222494](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE222494)~~<br>下载时发现无原始fastq                    | snRNA-seq：8sporadic AD+8control+8PSEN1-E280A            | frontal cortex                           | 10x 3′v3.1                                                                 | 候补（snRNA差异表达/同脑区独立验证）                                      |
| [GSE263468](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE263468)                                                 | snRNA-seq：BA9共42供体<br>（低病理17、中间10、高病理15） | BA9前额叶、BA7楔前叶、BA17初级视觉皮层等 | Drop-seq/10x 3′v3/v2<br>含All Nuclei与NeuN富集文库                         | 候补（snRNA差异表达/同脑区独立验证）（因为病理不完全等于AD-NC）           |
| ~~[GSE268599](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE268599)~~<br>下载时发现无原始fastq<br>只有比对后的bam | snRNA-seq：BA46前额叶有32位供体、146个脑区样本           | EC、ITG、BA46 DLPFC、V2、V1              | 去除神经元和少胶后进行10x 3′snRNA-seq                                      | 星胶富集，后续验证用                                                      |
| [GSE237718](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE237718)                                                 | snRNA-seq：29AD+27control                                | temporal cortex                          | 10x 3′v3                                                                   | 跨脑区独立验证（颞叶）                                                    |
| [SRP456327](https://trace.ncbi.nlm.nih.gov/Traces/study/?acc=SRP456327)                                                   | 长读长RNA seq：6AD+6control                              | DLPFC，BA9/46                            | poly(A)富集PCR-cDNA<br>Oxford Nanopore PromethION                          | 转录本结构判定                                                            |
| [GSE282551](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE282551)                                                 | 长读长RNA seq：16NC+14精神分裂症                         | DLPFC BA8/9 cortex                       | PacBio Sequel II/IIe Iso-Seq                                               | 转录本结构判定                                                            |

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

### hERV注释构建

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

[HERVd](https://herv.img.cas.cz/)：在论文[《Current status of human endogenous retrovirus annotation》](https://doi.org/10.1093/bib/bbag062)中作者比较了HERVd、Dfam和RepBase，指出不同资源的差异不仅来自识别能力，也来自如何拆分片段、重建元件和定义家族，可以直接下载[处理好的数据](https://zenodo.org/records/15053079)
- `HERVd_06_24.csv`：补充HERVd记录、结构及碎片信息
- `Table_HERV_classes.csv`：补充internal、LTR和家族分类关系
- `RepeatMasker_from_UCSC_2024.tsv`：对照该研究使用的RepeatMasker版本
- `DFAM_3_8.hits`：后续需要时核查Dfam识别结果
- HERVd文件里面有hg38坐标，以及orientation、subtype、schema、repeatNames、fragmentationScore等字段，可以帮助我们识别“这个记录是LTR还是internal、是否经过碎片整合”

[TEscape](https://www.biorxiv.org/content/10.64898/2026.07.08.737305v1)：提供了[处理好的数据](https://www.bioinfo.mochsl.org.br/tescape/downloads)
- gtf文件包含83193个不同的transcript_id，有标准的transcript和exon记录
- 可加入“外部转录本证据库”，但其中包含LINE、SINE等其他TE，所以要根据实际外显子与hERV/LTR的重叠关系，提取我们需要的部分

长读长构建的TE转录本注释：来自[《Identification of cell-type-specific, transcriptionally active transposable elements using long-read RNA-sequencing data-based comprehensive annotation》](https://doi.org/10.1186/s44342-025-00048-1)
- 论文的Additional file 2给出了[gtf](https://media.springernature.com/original/springer-static/esm/art%3A10.1186%2Fs44342-025-00048-1/MediaObjects/44342_2025_48_MOESM2_ESM.gtf)，但标准transcript_id缺失，转录本样ID被写在FPKM属性中。需要先检查全表、确认ID恢复规则，再生成规范GTF
- 采用了较严格的定位和TE重叠筛选规则，这可能影响某些重复性较高或宿主基因相关结构的收录

GTEx中TE起始转录本：来自[《Expression spectrum of TE-driven transcripts in human adult tissues》](https://doi.org/10.1186/s13059-025-03898-8)
- 论文[Additional file 2](https://media.springernature.com/original/springer-static/esm/art%3A10.1186%2Fs13059-025-03898-8/MediaObjects/13059_2025_3898_MOESM2_ESM.xls)提供TE起始转录本及组织表达，可以筛选涉及LTR/ERV及脑组织的记录
- [Additional file 3](https://media.springernature.com/original/springer-static/esm/art%3A10.1186%2Fs13059-025-03898-8/MediaObjects/13059_2025_3898_MOESM3_ESM.xls)进一步分析组织特异转录本，添加了组织背景
- 这项研究关注的是转录起点落在TE中的已注释转录本，使用GENCODE v26和GTEx数据分析其组织表达，能帮助我们补充“某个LTR可能参与宿主基因替代起始”的已有记录
- 这里的表达量主要来自完整转录本，并不等同于直接测量LTR启动子的活性

[HERVdb](https://datadryad.org/dataset/doi:10.5061/dryad.6t1g1jxf6)：
- 整合DIGS、RepBase和RetroTector，并提供位点ID及历史别名、层级分类、不同方法的支持信息、前病毒/solo-LTR等结构标签
- 特别适合帮助我们建立名称对应表
- 涉及hg19来源，因此必须核对genome_version并处理坐标转换

还有一些适合用于局部验证的补充资料：
- 家族精细研究，例如2026年的[HERV-K HML-2直接RNA测序研究](https://doi.org/10.1186/s13100-026-00400-4)，提供了HML-2剪接及读穿结构，部分代表性reads也存入GenBank
- 转录端点资源：
  
  | 资源                                                         | 提供什么                           | 在本项目中的用途                    |
  | ------------------------------------------------------------ | ---------------------------------- | ----------------------------------- |
  | [FANTOM5的hg38重处理数据](https://fantom.gsc.riken.go.jp/5/) | CAGE起始位点及组织信号             | 检查LTR附近是否存在独立的5′起始支持 |
  | [PolyASite v2.0](https://polyasite.unibas.ch/atlas)          | 专门3′端测序汇总的poly(A)位点      | 检查转录终止位置                    |
  | [PolyASite v3.0](https://polyasite.unibas.ch/atlas_sc)       | 从单细胞3′测序推断的位点及组织信息 | 补充组织、细胞背景                  |

- [TE-Seq](https://link.springer.com/article/10.1186/s13100-025-00381-w): 一个TE元件识别的RNA-seq pipeline，它区分solo-LTR、不同LTR–internal组合，并记录宿主基因位置关系，可以借鉴这些检查项，继续使用当前确定的比对和计数体系

---

数据下载：[Windows下载](https://lwstkhyl.me/api/download/A_new_start%2Fscript%2FHERV_Windows_download_20261029.zip?)

```sh
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Download-HERV.ps1 -Root "D:\ADnew\reference\herv_annotation" -IncludeOptional
$annoRoot = (Get-Location).Path
# 删除逐文件校验记录和未完成下载残留
Get-ChildItem -LiteralPath $annoRoot -Recurse -File |
    Where-Object { $_.Name -match '\.(sha256|md5|part)$' } |
    Remove-Item
# 删除下载记录和普通说明
$removeFiles = @(
    "download_report.tsv",
    "manual_resources.tsv",
    "README_zh.md",
    "resources.tsv",
    "SHA256SUMS.txt",
    "Dfam\relnotes.txt",
    "FANTOM5\00_readme_CAGE_peaks.txt",
    "FANTOM5\00_readme_expression.txt",
    "FANTOM5\00_readme_hg38.txt",
    "HERVdb\README.md"
)
foreach ($file in $removeFiles) {
    Remove-Item -LiteralPath (Join-Path $annoRoot $file) -ErrorAction SilentlyContinue
}
```
还需要手动下载：

| 资源                                                                  | 操作                                                                         |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [HERVdb](https://datadryad.org/dataset/doi%3A10.5061/dryad.6t1g1jxf6) | 下载`dryad_HERVdb_08062026.xlsx`和`README.md`，放入`HERVdb`文件夹            |
| [PolyASite v2.0](https://polyasite.unibas.ch/atlas)                   | 选择人类、GRCh38，下载cluster BED并保留说明和样本信息，放入`PolyASite`文件夹 |

最后导入服务器的`/public/home/GENE_proc/wth/ADnew/reference/herv_annotation/`

---

我们研究的三个层次：

| 层次   | 它回答的问题                    | 一个典型例子                          |
| ------ | ------------------------------- | ------------------------------------- |
| 片段   | 哪些碱基属于哪个重复模型？      | 一个LTR12C片段                        |
| 位点   | 哪些片段可以归为同一个元件？    | 两端LTR及中间internal组成的候选前病毒 |
| 转录本 | 实际RNA包含哪些区域、怎样连接？ | 从LTR起始并剪接到宿主基因的RNA        |

- 一个hERV位点可以产生多种RNA
- 一个RNA也可以包含两个hERV位点，或者同时包含hERV与其他TE
- 不能因为两个hERV出现在同一条RNA里，就把它们合并为一个基因组位点
- 这也是为什么我们要保留“位点–转录本关系表”，而不能只做一张不断扩展坐标的GTF

**第一步：固定范围和版本，建立原始资源登记表**

| 范围                    | 处理方式                     |
| ----------------------- | ---------------------------- |
| HERV内部区域及相关LTR   | 主体收录                     |
| MaLR等相关LTR逆转座元件 | 保留并单独标记，便于后续选择 |
| LINE、SINE、DNA转座子   | 可作为背景注释，保持各自类别 |

- 每份文件记录下载地址、版本、基因组版本、坐标规则、原始ID、处理方法和数据来源

**第二步：统一坐标、方向和名称**
- 坐标统一到与你长读长比对一致的GRCh38参考
- 分析用区间统一采用BED规则`0起点，左闭右开：[start, end)`
- 方向需要保存两列：
  - 元件方向：重复序列或前病毒在基因组中的方向
  - RNA方向：观察到的转录方向

**第三步：以RepeatMasker片段为底表，逐一添加Telescope、HERVd、ERVmap和HERVarium的对应关系**
- 首先判断两个记录是不是在描述相同的重复片段。需要同时检查位置、重叠比例、方向、模型名称，以及是否存在嵌套插入
- 然后判断多个片段能否组成一个位点
  - 同一internal被拆成几段时，检查其在参考模型中的位置是否连续
  - LTR与internal是否在方向和家族关系上合理
  - 中间是否插入其他TE，造成注释被切开
  - 不同资源是在描述同一个元件，还是把相邻元件错误连在一起
- 对于LTR，至少区分：
  
  | 标签             | 含义                           |
  | ---------------- | ------------------------------ |
  | 已关联的5′/3′LTR | 有合理的internal对应关系       |
  | solo-LTR候选     | 当前支持其为独立LTR            |
  | 未确定关系的LTR  | 尚不能排除退化前病毒或配对遗漏 |
  | 复杂结构         | 存在嵌套、共享或多个候选关系   |

**第四步：把已有RNA和长读长结果接入**
- 可以先导入SERVE、TEscape及其他公开转录本，我自己的等结果完成后，再接入同一套表
- 核心操作是：用转录本的实际外显子与hERV片段相交
- 需要区分以下情况：

  | 观察结果                   | 我们可以怎样记录                    |
  | -------------------------- | ----------------------------------- |
  | RNA外显子包含hERV/LTR      | 有该区域被转录的证据                |
  | RNA从LTR附近开始           | hERV/LTR起始候选，继续检查5′完整性  |
  | 宿主外显子连接到hERV       | 宿主基因相关转录本                  |
  | hERV只位于被剪掉的内含子中 | 不能据此认定成熟RNA包含hERV         |
  | 未剪接read覆盖内含子hERV   | 单独记录前体RNA或内含子滞留相关证据 |

  相同剪接链的转录本可以建立对应关系，但5′和3′端差异仍需保留。特别是“从上游宿主基因开始”与“从LTR开始”，可能具有相同的下游剪接结构，却对应不同解释
- 如果可以的话，记录证据来自本研究脑组织、外部脑组织还是其他细胞

**第五步：分别评价位点、RNA结构和起始证据**

| 评价维度   | 主要检查内容                                       |
| ---------- | -------------------------------------------------- |
| 位点身份   | 坐标、家族及组成是否明确，有无资源冲突             |
| RNA结构    | 定位是否可靠，外显子和junction是否有支持           |
| 端点完整性 | 是否可能截短、内部引物起始，是否有CAGE/poly(A)支持 |
| 样本重复性 | 是否跨样本、供体或平台出现                         |
| 组织相关性 | 是否在脑组织或本研究样本中得到支持                 |

**第六步：分别生成RNA参考与计数参考**

| 文件              | 保存内容                               | 使用位置                               |
| ----------------- | -------------------------------------- | -------------------------------------- |
| RNA转录本GTF      | 完整外显子、真实剪接关系及宿主基因连接 | 转录本比较、结构展示、提供可信剪接信息 |
| hERV计数GTF       | 归属于各hERV位点的实际计数区间         | Stellarscope等位点计数                 |
| 位点–转录本关系表 | 两类对象如何对应                       | 汇总证据和解释结果                     |

- 例如，一条RNA从LTR起始，随后连接三个宿主外显子。RNA参考应保存整条结构；hERV区域计数则应明确哪些区间归属于hERV，避免将宿主基因其他外显子的信号全部算作hERV区域表达

**第七步：在正式分析前用同一批小规模样本、同一套比对结果比较计数结果**
- 原Telescope注释
- RepeatMasker中属于本研究范围的LTR/ERV片段
- 整合后的位点注释

| 检查项           | 要回答的问题                                      |
| ---------------- | ------------------------------------------------- |
| 新增检出位点     | 补充资源实际增加了什么？                          |
| 原有位点计数变化 | 是否因拆分、归属变化或候选竞争而改变？            |
| LTR重复归属      | 同一LTR是否同时作为前病毒组成部分和独立位点计数？ |
| 宿主基因重叠     | 新信号是否主要来自宿主外显子或前体RNA？           |
| 定位歧义         | 新增位点是否缺少足够的区分信息？                  |
| 人工检查         | 随机和分层抽取的位点是否符合实际覆盖与结构？      |

#### 已有注释初步整合

[代码](https://lwstkhyl.me/api/download/A_new_start%2Fscript%2FHERV_annotation_steps12_20261029.zip?) /| [结果](https://lwstkhyl.me/api/download/A_new_start%2Fres%2Fstep12_res.zip?)

```sh
module load miniconda3/base
conda create -n herv-annotation -c conda-forge python=3.11 openpyxl xlrd -y
cd /public/home/GENE_proc/wth/ADnew/reference/HERV_annotation_steps12_20261029
# 验证文件完整性
sbatch run_step.sbatch 1
# 执行完之后：
python -m json.tool \
  /public/home/GENE_proc/wth/ADnew/reference/herv_annotation/work/01_registry/audit_summary.json  # `failed`应为0
# 统一坐标、方向和记录ID
sbatch run_step.sbatch 2
```

| 输出目录或文件                                    | 内容                                  |
| ------------------------------------------------- | ------------------------------------- |
| `work/02_standardized/genomic/`                   | 各资源独立的标准化区间                |
| `work/02_standardized/transcripts/`               | RNA GTF、外显子BED及转录本目录        |
| `work/02_standardized/tables/`                    | 家族关系、Excel文本表及表达矩阵列信息 |
| `work/02_standardized/pending/`                   | HERVdb的hg19原始坐标                  |
| `work/02_standardized/rejected_records.tsv.gz`    | 无法匹配参考等记录及具体原因          |
| `work/02_standardized/normalization_summary.json` | 转换结果汇总                          |

代码具体说明：
- 1：建立登记表
  
  | 字段                           | 含义                                        |
  | ------------------------------ | ------------------------------------------- |
  | `assembly`                     | 参考基因组版本，例如GRCh38或hg19            |
  | `coordinates`                  | 原文件采用的坐标规则                        |
  | `resource_role`                | 描述的是基因组位点、重复片段，还是RNA转录本 |
  | `source_version`、`source_url` | 来源版本和获取地址                          |
  
  ```py
  result.update(
      relative_path=rel,
      source_version=source.get('version', ''),
      source_url=source.get('url', '')
  )
  result.update({
      key: convention.get(key, '')
      for key in ['assembly', 'coordinates', 'resource_role']
  })
  write_json(
      out / 'audit_status.json',
      {'ready_for_step2': summary['failed'] == 0}
  )
  ```
- 2.1：统一坐标
  
  对于GTF，核心转换等价于：

  ```py
  start0 = int(x[3]) - 1
  end0 = int(x[4])
  ```

  `x[3]`和`x[4]`分别是GTF的第4、5列，即起点和终点

  | 数据类型            | 转换为分析用BED时的处理 |
  | ------------------- | ----------------------- |
  | GTF                 | 起点减1，终点不变       |
  | 已采用BED规则的区间 | 起点、终点均不变        |
  | HERVd、GTEx TE-TSS  | 按已核实的规则，起点减1 |
  | 输出的RNA GTF       | 继续保留1起点、两端包含 |

- 2.2：统一染色体名称、检查区间，并处理方向

  ```py
  name = self.aliases.get(str(chrom))
  if name is None:
      return None, 'sequence_not_in_reference'
  if start < 0 or end <= start:
      return None, 'invalid_interval'
  if end > self.lengths[name]:
      return None, 'out_of_bounds'
  ```

  先通过别名表统一染色体名称，例如将`1`对应到`chr1`，再检查区间是否合法、是否超过染色体长度。不能匹配的记录写入`rejected_records.tsv.gz`，并注明原因

  ```py
  strand = {'C': '-', 'F': '+'}.get(strand, strand)
  if strand not in ('+', '-', '.'):
      strand = '.'
  ```
  
  这里主要处理HERVd的`F/C`方向表示。ERVmap因为全是+所以采用单独规则：标准化方向写成`.`，同时保留原始`+`，等待后续核实
- 2.3：添加来源前缀，并保留原始信息

  ```py
  record_id = source + '::' + str(source_id)
  gene_id = source + '::' + old_gene
  tx_id = source + '::' + old_tx
  ```

  例如，某条TEscape转录本会得到`TEscape::原始ID`这样的标准化ID，便于辨认来源，减少不同资源之间的ID冲突
- 2.4：按记录含义分别保存，并处理特殊格式
  - RepeatMasker：保留LTR及分类不确定的LTR记录，为后续筛选hERV及相关元件准备候选集合，此时仍保留MaLR等标签
  - Telescope的`genes.gtf`用于保存位点整体范围，`transcripts.gtf`中的`exon`用于保存重复片段
  - SERVE、TEscape等RNA注释则另外保存GTF和外显子BED
  
  ```py
  # RepeatMasker
  if x[11] not in ('LTR', 'LTR?'):  # x[11]是重复序列类别
      continue
  # Telescope
  kind = 'locus_span' if feature == 'gene' else 'repeat_block_not_RNA_exon'
  ```
- 两个特殊资源：
  - LongRead_TE_2025：从误写的`FPKM`属性中恢复可唯一识别的转录本ID，标记修复情况；含义不清的`FPKM`属性省略
  - HERVdb：保留hg19原始坐标，放入`pending/`，待核实起点规则后再转换到hg38

---

**初步确定参考基因组**：
- 使用GENCODE v49+GRCh38的组合
- 之前使用`GRCh38.p14.genome.fa`属于包含染色体、scaffold、patch和替代单倍型的全组装版本，而`primary assembly`版本保留主要染色体及未定位、未放置的scaffold，排除patch和替代单倍型。为减少hERV本身重复较多带来的额外比对歧义，选择没有替代序列`_alt`的primary assembly版本

```sh
# 下载数据
mkdir -p /public/home/GENE_proc/wth/ADnew/reference/GRCh38_gencode49_primary
cd /public/home/GENE_proc/wth/ADnew/reference/GRCh38_gencode49_primary
base_url=https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_49
curl -fL --retry 5 -C - -o GRCh38.primary_assembly.genome.fa.gz \
  "$base_url/GRCh38.primary_assembly.genome.fa.gz"
curl -fL --retry 5 -C - -o gencode.v49.primary_assembly.annotation.gtf.gz \
  "$base_url/gencode.v49.primary_assembly.annotation.gtf.gz"
gunzip GRCh38.primary_assembly.genome.fa.gz
gunzip gencode.v49.primary_assembly.annotation.gtf.gz
sha256sum GRCh38.primary_assembly.genome.fa \
  gencode.v49.primary_assembly.annotation.gtf > reference.SHA256SUMS.txt
# 建立FASTA索引
module load miniconda3/base
conda activate ad-longread
samtools faidx GRCh38.primary_assembly.genome.fa
# 补做第二步的参考兼容性检查
cd /public/home/GENE_proc/wth/ADnew/reference/HERV_annotation_steps12_20261029
sbatch run_step.sbatch 2 \
  --fai /public/home/GENE_proc/wth/ADnew/reference/GRCh38_gencode49_primary/GRCh38.primary_assembly.genome.fa.fai \
  --out /public/home/GENE_proc/wth/ADnew/reference/herv_annotation/work/02_standardized_primary
```

[结果](https://lwstkhyl.me/api/download/A_new_start%2Fres%2Fstep12_res_new.zip?)

---

**整合多种注释**：[代码](https://lwstkhyl.me/api/download/A_new_start%2Fscript%2FHERV_annotation_step3_20261030.zip?)
- 保留Telescope骨架：14267个位点及55897个组成重复块全部保留，继续使用原ID
- 归属RepeatMasker片段：根据方向、模型名称和实际重复块覆盖比例建立对应；剩余片段生成新增重复单元候选，分别标记ERV、MaLR、其他LTR和未确定类别
- 关联其他基因组来源：对接ERVmap、HERVarium和HERVd，保留边界、分类、配对及归属冲突
- 关联外部RNA：使用SERVE、TEscape和LongRead_TE_2025的实际外显子建立关系，分别记录同向、反向、方向未知及仅位于内含子中的情况

```sh
cd /public/home/GENE_proc/wth/ADnew/reference/HERV_annotation_step3_20261030
bash submit_step3.sh
```

实现过程：
- 保留Telescope已经定义的位点，同时保存每个位点内部的实际重复块
  - `genomic/Telescope_loci.bed.gz`记录一个位点的整体位置、方向和原始ID，`genomic/Telescope_segments.bed.gz`记录这个位点由哪些重复片段组成
    
    假设某个位点为：

    | 内容           | 区间         |
    | -------------- | ------------ |
    | 位点整体跨度   | `[100,1000)` |
    | 一个LTR块      | `[100,200)`  |
    | 一个internal块 | `[300,700)`  |
    | 另一个LTR块    | `[900,1000)` |

    整体跨度是900bp，实际重复块合计覆盖600bp，中间还有300bp没有被这些块覆盖。代码分别记录`block_union_bp = 600`和`span_gap_bp = 300`
  - 本轮保留了14,267个位点和55,897个重复块，主要写入`genomic/loci.tsv.gz`（位点整体信息）和`genomic/locus_blocks.tsv.gz`（位点内部的实际重复块）
- 判断每条RepeatMasker片段能否归入已有Telescope位点，剩余片段再形成新增候选
  
  ```py
  hits = defaultdict(list)
  for block in baseline_index.query(chrom, start, end):
      if block.strand == strand and block.model == model:
          hits[block.key].append((max(start, block.start), min(end, block.end)))
  strong = {
      key: covered_bp(value)
      for key, value in hits.items()
      if covered_bp(value) / (end - start) >= RULES['telescope_fragment_min_coverage']
  }
  ```
  
  要求同时满足：染色体位置相交、方向相同、规范后的模型名称相同、同一位点的匹配块覆盖该RepeatMasker片段至少80%
  - “模型”：重复序列参考模板，即RepeatMasker用来识别重复片段的参考DNA序列。同一种模板可以对应基因组上许多不同位置的拷贝
    - 在RepeatMasker表中，`repName`例如LTR7是模板名称（其实就是所属家族名），`repStart`、`repEnd`、`repLeft`是模板上的匹配坐标及剩余长度信息
  - 覆盖比例=`片段与该位点同向、同模型重复块的交集并集长度`/`RepeatMasker片段长度`
    
    例如，一个100bp片段有90bp被符合条件的重复块覆盖，就达到90%
  - 代码根据符合条件的位点数标记：
  
    | 情况         | 输出标签                         | 处理方式                   |
    | ------------ | -------------------------------- | -------------------------- |
    | 只有一个位点 | `unique_baseline_match`          | 记录唯一归属               |
    | 多个位点     | `ambiguous_baseline_match`       | 保留全部归属，并进入复核表 |
    | 没有位点     | 后续标记为`additional_candidate` | 进入新增候选构建           |

  - 新增候选构建时，我们尝试连接同一重复模型被拆开的相邻片段，要求同一染色体、同一方向且不能重新从模型起点开始、基因组上相邻片段间隔为0–100bp、模型间隔	−20至100bp且允许最多20bp的模型坐标重叠
  
    最终将672,419条片段组织成656,402个新增候选
  - 按`repeat_family`分配范围标签：
    
    | `scope`            | 当前判断依据             |
    | ------------------ | ------------------------ |
    | `core_ERV`         | 家族为ERV1、ERVK或ERVL   |
    | `related_MaLR`     | 家族名称包含MaLR         |
    | `other_LTR`        | 家族名称包含Gypsy        |
    | `unclassified_LTR` | 其余尚不能确定范围的记录 |
    
  - 已有Telescope位点的边界和重复块保持原样，RepeatMasker片段通过关系表与其关联
- 把其他基因组来源对应到上述目录，并保留来源之间的分歧：ERVmap、HERVarium和HERVd逐条与目录的实际重复块相交，记录关系

  ```py
  bp = covered_bp(overlaps[key])  # 交集并集长度：重叠区域去重后的总长度
  source_fraction = bp / (end - start)  # 交集并集长度/来源记录跨度
  target_fraction = bp / covered_bp(  # 交集并集长度/目录位点的重复块并集长度
      (block.start, block.end) for block in locus.blocks
  )
  ```
  - 对于HERVd和ERVmap：
    - `same_component_candidate`：来源记录与目录位点同向、模型匹配，且两个比例都至少为80%
    - `same_locus_span_candidate`：HERVd记录同向、模型匹配，且双方整体跨度的相互覆盖比例均≥80%
    - `span_match_direction_unverified`：ERVmap记录的双方整体跨度相互覆盖比例均≥80%；方向仍未核实
    - 如果一条来源记录对应多个候选，程序记录歧义
    - 如果完全没有重复块交集，则标记`no_block_overlap`，仍在状态表中保留原始记录。当前代码不会仅凭这条来源记录的整体跨度，新建一个目录位点
  - HERVarium还做了两项专门处理：
    - 核对它的LTR BED和catalogue：相同来源ID必须具有完全一致的坐标和方向，才能建立一一对应
    - 检查来源已经给出的internal–LTR配对，包括染色体、方向、5′/3′相对位置、计算距离、模型关联，以及原始角色标签，写入`relations/HERVarium_pair_links.tsv.gz`
  - 结果保存在`relations/source_locus_links.tsv.gz`和`relations/source_record_status.tsv.gz`
- 检查外部RNA的外显子是否真正覆盖目录中的重复块：使用SERVE、TEscape和LongRead_TE_2025数据集
  - 每个资源读取两类输入：`transcripts/资源名.transcripts.tsv.gz`和`transcripts/资源名_exons.bed.gz`
  - 将外显子归到转录本，检查染色体、方向及外显子行数，然后合并重叠区间

    一个转录本可以关联多个位点，一个位点也可以关联多个转录本
  - 对每个“转录本—位点”组合：
  
    | 字段                   | 含义                                  |
    | ---------------------- | ------------------------------------- |
    | `overlap_union_bp`     | RNA外显子与该位点重复块的交集并集长度 |
    | `RNA_exonic_fraction`  | 交集长度÷RNA外显子总长度              |
    | `locus_block_fraction` | 交集长度÷该位点重复块总长度           |
    | `strand_relation`      | RNA与元件同向、反向或方向未知         |

    例如，RNA外显子总长2,000bp，某个位点的重复块总长500bp，两者交集300bp，则两个比例分别为15%和60%。这些比例可以帮助区分“RNA仅包含一小段重复序列”和“RNA覆盖了该重复单元的大部分区域”
  - 最后，程序给转录本生成两种结构ID
    - `structure_id`：包含染色体、方向和完整外显子区间，因此不同起止端会得到不同ID
    - `splice_chain_id`：只包含内含子链；起止端不同但剪接位点相同的转录本可以共享这个ID。单外显子转录本不生成剪接链ID
  
  结构记录保存在`transcript_structures.tsv.gz`，外显子关联保存在`exonic_links.tsv.gz`


[结果](https://lwstkhyl.me/api/download/A_new_start%2Fres%2Fstep3_res.zip?)
- 共有670669个单元，包括14267个Telescope位点和656402个新增候选
  - 这个总数包含大量重复片段、LTR及MaLR等候选，需要经过结构整理才能形成最终计数参考
- 三个外部RNA资源的结果也符合预期：
  
  | 资源             | 输入转录本 | 有外显子交集的转录本 |
  | ---------------- | ---------: | -------------------: |
  | SERVE            |     206884 |               206714 |
  | TEscape          |      83193 |                13768 |
  | LongRead_TE_2025 |     595755 |               244026 |
- 一些待复核的事项：

  | 待复核事项                                 |    数量 |
  | ------------------------------------------ | ------: |
  | RepeatMasker片段对应多个Telescope位点      |     6条 |
  | 原Telescope位点之间的重复块重叠            |   103对 |
  | 新增候选与Telescope重复块重叠              |   859对 |
  | 新增候选之间的重复块重叠                   | 12567对 |
  | HERVarium原始solo记录与同向Telescope块重叠 |  2402条 |
  | HERVarium配对未获当前家族关系表支持        |  9217条 |







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






### 文献阅读

#### Lifespan single-cell transcriptomic atlas of the human prefrontal cortex

过去的脑单细胞研究经常集中在某个年龄段，例如胎儿发育、成年或老年，也有很多研究直接比较患者和对照。这样容易留下一个问题：疾病中观察到的表达变化，有多少属于疾病本身，有多少属于正常发育或衰老？
- 作者选择背外侧前额叶皮层(DLPFC)，建立跨生命周期的正常参考。这个脑区参与认知控制等高级功能，而且发育持续时间长，也容易受到衰老影响

**研究数据**：主队列来自PsychAD统一处理的数据，公共队列分别用于独立验证和补充早期发育阶段

| 数据             | 样本与规模                                                      | 在本文中的用途                                  |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| 主研究队列       | 284名正常供体，0–97岁；1,307,674个细胞核；DLPFC                 | 建立正常生命周期图谱                            |
| 公共验证队列     | 306名供体，孕22周至101岁；2,039,078个细胞核；来自3项研究        | 验证年龄相关表达变化和连续轨迹                  |
| 拟时序整合队列   | 主队列与Herring等人的发育数据整合；311名供体、1,454,617个细胞核 | 补充胎儿等早期状态，分析细胞谱系                |
| Visium空间转录组 | 10名成年供体，33–62岁；每人3张切片，共30张                      | 检查基因模块的皮层分层和灰白质分布              |
| RNAscope         | 8名不同年龄供体                                                 | 验证SST阳性抑制性神经元和少突胶质细胞的组成变化 |
| GWAS             | 24种精神、神经及其他性状                                        | 为基因模块提供疾病遗传关联信息                  |
| 调控和互作资源   | CollecTRI、STRING及外部SCENIC+结果                              | 推断候选转录调控因子及相关网络                  |

细胞分类：
- 8个大类：兴奋性神经元、抑制性神经元、星形胶质细胞、免疫细胞、血管壁细胞、内皮细胞、少突胶质细胞、OPC
- 27个subclasses
- 65个subtypes

| 分析年龄组       | 年龄范围                       | 主队列供体数 |
| ---------------- | ------------------------------ | -----------: |
| Development      | 0–19岁，合并婴儿、儿童和青少年 |           53 |
| Young adulthood  | 20–39岁                        |           54 |
| Middle adulthood | 40–59岁                        |           95 |
| Late adulthood   | ≥60岁                          |           82 |

先介绍一些缩写：
- aDEGs：表达与真实年龄显著相关的基因
- traDEGs：表达沿细胞拟时序显著变化的基因
- Lifespan trajectory：根据供体年龄拟合出的表达曲线（Fig.2）
- Pseudotime：根据细胞转录状态排列出的相对顺序（Fig.3–5）
- MAGMA：判断一个基因集合是否富集GWAS关联信号
- scDRS：判断一个细胞是否较多表达某种性状相关基因
- TF activity：根据靶基因表达推断的调控活性，不能直接等同于TF自身表达量

**Fig.1：建立图谱，并发现生命周期中的三个转录变化阶段**

![AD_1](/upload/md-image/other/AD_1.webp){:width="800px" height="800px"}

| 子图 | 展示内容                             | 应怎样理解                               |
| ---- | ------------------------------------ | ---------------------------------------- |
| a    | 年龄分组、研究设计、UMAP和细胞分类   | 交代研究对象及规模                       |
| b    | 四个主要分析方向                     | 组成、表达、谱系和昼夜节律               |
| c    | 不同年龄段中，年龄解释的表达变异比例 | 判断哪个阶段的表达更受年龄影响           |
| d    | 各年龄组的细胞组成                   | 展示不同细胞亚类的相对比例               |
| e    | 年龄解释的组成变异比例               | 发育期组成变化最明显                     |
| f    | 各年龄段、各亚类的组成变化效应       | 红色表示随年龄增加，蓝色表示减少         |
| g    | RNAscope代表性图像                   | 对组成变化提供组织原位证据               |
| h    | 各亚类中的年龄相关差异表达数量       | 支撑“三阶段”结论                         |
| i    | 发育期aDEGs的GO富集                  | 解释表达变化涉及的功能                   |
| j    | 发育期aDEGs的GWAS富集                | 将正常发育程序与精神疾病遗传风险联系起来 |




| 研究问题                               | 对应分析                       |
| -------------------------------------- | ------------------------------ |
| 不同细胞的相对数量如何随年龄变化？     | 细胞组成建模及RNAscope验证     |
| 哪些生命阶段的表达变化最多？           | 分年龄段的pseudobulk差异分析   |
| 基因表达在整个生命周期中怎样变化？     | 真实年龄的非线性回归和轨迹聚类 |
| 不同细胞亚类是否出现共同的衰老变化？   | mashr分析年龄效应的共享程度    |
| 各细胞谱系有哪些发育、成熟和衰老程序？ | UMAT、Monocle3拟时序和基因模块 |
| 这些程序对应哪些功能、疾病和解剖位置？ | GO、MAGMA、scDRS及空间转录组   |
| 老年细胞的昼夜节律是否改变？           | 根据死亡时间进行cosinor建模    |

正常人DLPFC的转录组随年龄呈非线性变化，发育期主要改变神经元程序，成年中期变化较少，晚年则出现胶质细胞免疫、应激和昼夜节律程序的变化

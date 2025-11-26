---
layout: mypost
title: 单细胞相关分析
category: other
subcategory: other-other
---

2025.11.18-2025.12.研究进展

<!-- more -->

### synapse网站数据

#### try 1：没用计算节点

直接读取会报错内存不够

```py
import scanpy as sc
adata_b = sc.read_h5ad("synapseData/h5ad/a9/SEAAD_A9_RNAseq_DREAM.2025-07-15_2.h5ad")
print(adata_b)
```

![synapse网站数据1](/upload/md-image/other/synapse网站数据1.png){:width="800px" height="800px"}

看了一下报错信息发现意思是`在读/layers/UMIs这一层的时候，Python申请20多个G的内存失败`，因此根据GPT的建议直接删掉`/layers/UMIs`这个数据，然后用`read_h5ad(..., backed='r')`读取，是不读进内存、只在磁盘上操作的方式（这个模式下很多操作不支持）

为了防止弄坏原文件，先cp一个副本`A9_test.h5ad`

```py
import h5py
with h5py.File("synapseData/h5ad/a9/A9_test.h5ad", "r+") as f:
    print("before:", list(f.keys()))
    del f["layers"]  # delete 'layers', avoid MemoryError
    print("after:", list(f.keys()))
```

```
before: ['X', 'layers', 'obs', 'obsm', 'obsp', 'uns', 'var', 'varm', 'varp']
after: ['X', 'obs', 'obsm', 'obsp', 'uns', 'var', 'varm', 'varp']
```

```py
import scanpy as sc
adata_b = sc.read_h5ad("synapseData/h5ad/a9/A9_test.h5ad", backed="r")
print(adata_b)
```

![synapse网站数据2](/upload/md-image/other/synapse网站数据2.png){:width="800px" height="800px"}

如图删去那层后读取成功，之后又因为Seurat分析时也需要大内存，同时因为这里我只是想验证一下这个h5ad能否正常进行读取和分析，因此按照GPT的方式，随机取一部分（这里是1000，如果更大的话可能运行时间很长）写成一个新的h5ad文件，并将其转换为Seurat可读的格式

```py
# make a small h5ad file
import numpy as np
import anndata as ad
n_cells = adata_b.n_obs
n_keep = 1000  # randomly select some samples
idx = np.random.choice(n_cells, size=min(n_keep, n_cells), replace=False)
adata_small = adata_b[idx].to_memory()
adata_small.write_h5ad("synapseData/h5ad/a9/A9_test_small.h5ad")

# convert to Seurat type
from scipy.io import mmwrite
mmwrite("synapseData/h5ad/a9/counts.mtx", adata_small.X)
adata_small.obs.to_csv("synapseData/h5ad/a9/cell_metadata.csv")
adata_small.var.to_csv("synapseData/h5ad/a9/gene_metadata.csv")
```

![synapse网站数据3](/upload/md-image/other/synapse网站数据3.png){:width="600px" height="600px"}

上面我使用了python来转换格式，GPT还推荐R包SeuratDisk，但我发现官方提供的Rstudio好像不能自己安装新包，因此就没有用R

```r
library(Matrix)
library(Seurat)
counts <- readMM("synapseData/h5ad/a9/counts.mtx")
cells  <- read.csv("synapseData/h5ad/a9/cell_metadata.csv", row.names = 1)
genes  <- read.csv("synapseData/h5ad/a9/gene_metadata.csv", row.names = 1)
counts <- t(counts)
rownames(counts) <- rownames(genes)
colnames(counts) <- rownames(cells)
obj <- CreateSeuratObject(counts = counts, meta.data = cells)
```

![synapse网站数据4](/upload/md-image/other/synapse网站数据4.png){:width="600px" height="600px"}

删掉的这层可能是原始计数矩阵（整数，没log、没归一化），因为是看用`X`那层生成的计数矩阵都是0~10的小数

#### try 2：使用计算节点



### 单细胞分析

#### 基本原理

**单细胞分析**：在单个细胞的尺度上，一次性、高通量地测很多种分子信息，而且涉及到多种组学
- **高通量(high‑throughput)**：一次测几千、几万甚至几十万个细胞
- **分子信息(molecular profiling)**：细胞内有哪些种分子、每种有多少
- across modalities：RNA、染色质、蛋白、受体序列、空间位置
  - **转录组(Transcriptomics)**：每个细胞里mRNA的丰度（每个基因大概多少转录本），比如Seurat分析scRNA‑seq数据
  - **染色质开放程度(Chromatin accessibility)**：使用转座酶染色质可及性测序(ATAC-seq)、ChIP-seq等方法，看哪个DNA区域是开放的/被哪些蛋白占据
  - **细胞表面蛋白(Surface protein expression)**：用带条形码的抗体测细胞表面标志，同时检测细胞表面的蛋白质信息与胞内转录组信息，相对转录组数据额外地加入了细胞表面蛋白的表达信息，可以更加深入地区分细胞异质性、更精确地挖掘特异性的细胞类型
  - **适应性免疫受体组库(Adaptive immune receptor repertoire profiling)**：免疫细胞在识别哪些抗原、哪些克隆被扩增
  - **空间信息(Spatial information)**：比如空间转录组，探究细胞在组织的哪个位置聚在一起、有什么相互影响
- 会有很多种分析方法，然后有人做了一些对比评测(benchmarking)，告诉大家哪些方法在什么场景表现好、有哪些优缺点等等
- 尽量同时分析/整合多种模态(Multimodal)，而不是只分析一种模态(Unimodal)，比如RNA+ATAC，RNA+蛋白，RNA+空间位置…………

**单细胞分析的三个任务**：
- **聚类 & 细胞类型注释**：将细胞按细胞类型聚类
  - 聚类是一种无监督学习，每个细胞几千个基因的表达量，可以想成每个细胞是一个高维向量。具体来说
    - 先做PCA，把几千个基因压缩到比如10–50个主成分
    - 在主成分空间里，计算任意两个细胞之间的距离
    - 对每个细胞，找到它最像的K个邻居（KNN图，k一般5–100）
    - 通过一些划分算法来判断每个细胞属于哪个cluster
  - **标志基因(marker)**：在某一类细胞里明显高表达，而在其他细胞里表达低或没有的基因。具体来说
    - 先看某个cluster，与其他所有cluster比较
    - 进行差异表达分析(t-test/Wilcoxon rank-sum test)
    - 选出在这个cluster表达比例高，在其他表达比例低，且logFC明显为正、p值显著的基因
  - **细胞注释的三个层次/步骤**
    - **自动注释**
      - **Classifier-based**：对于每个聚类，根据标志基因表达模式，训练一个分类器，例如Garnett/CellAssign/CellTypist/Clustifyr等
      - **映射到参考图谱(Reference mapping)**：把数据投到一个已经注释好的大图谱上，例如scArches/Symphony/Azimuth等
    - **手动注释**：直接查看每个聚类的标志基因，再查阅相关文献，或者参考经典marker
    - **验证注释的可靠性**：例如marker是否符合生物学常识、同一细胞类型是否只出现在一个cluster、不同样本之间能不能对应起来等，可能还会用细胞谱系、轨迹等信息辅助判断
- **连续过程 & 轨迹 + RNA velocity + 谱系追踪**
  - **轨迹推断(trajectory inference)**：很多生物过程不是“划分成几类”就够了，比如细胞的分化过程、T细胞激活-记忆T细胞状态改变的过程，是一个连续的轨迹，而不是简单的几个聚类。轨迹推断就是在表达空间里找到一条（或几条）“路线”，把细胞按照生物过程的顺序排成一条线（伪时间pseudo time）
    - **Cluster approach（聚类 → 线连接）**：先聚类，再看cluster之间的拓扑连接关系，用最小生成树MST连接；每个cluster是一个节点，MST把它们连起来，得到一条或分叉的路径
    - **Graph approach（图论方式）**：先在细胞间构图，再用图的方法（比如PAGA）推断cluster之间的连通关系和方向，更适合复杂拓扑（多分支）
    - **Manifold-learning based（流形学习）**：在降维空间里找一条“光滑曲线”，把cluster串起来，或者说，在点云之间画一条最顺最合理的“生长路径”，如Slingshot
    - **Probabilistic frameworks（概率框架）**：基于扩散过程，给每个细胞一个“到起点的距离”的概率度量 → 伪时间，如DPT

    需要注意的是，推出来的轨迹不一定有生物学意义，需要结合实验背景判断；对稳态系统/多种复杂动力学，传统伪时间有时不适用
  - **RNA velocity**：用“未剪接RNA(u)”和“已剪接RNA(s)”的比例，来推断：这个基因在这个细胞里，是在“被进一步打开/即将表达更多”，还是在“关上/即将表达更少”
    - 根据测序时读段在外显子/内含子上的位置，统计每个细胞、每个基因的unspliced和spliced reads数量
    - 假设在某个时间点，基因表达处于稳定状态，可以估计降解速率γ：`ds/dt=βu-γs`，当`ds/dt=0`时用u和s估计γ
    - 用unspliced数量+估计的γ，推断下一时刻的spliced数量，如果u很高，就说明正准备大量剪接成s，s会升高，基因转录更活跃；如果u低但s高，说明转录已停止，只剩下降解，s会降低，基因转录更沉默
    - 对每个细胞，找到“最像它下一步状态”的其他细胞：在UMAP/tSNE图上，就画出一根箭头指向“未来的位置”(velocity vector)

    本质上就是在原来的表达空间上，叠加一个“流场”，说明细胞群整体在往哪里演化
  - **谱系追踪**：从基因组突变/条形码角度推断“谁是谁的后代”
    - **前瞻追踪(Prospective lineage tracing)**：在起始细胞引入一个可遗传的标记（例如条形码/CRISPR 可编辑位点），后代细胞都会带着这个标记；标记不断累积变化，最后后期测序这个标记来还原“家谱树”，例如软件Cassiopeia
    - **回顾追踪(Retrospective lineage tracing)**：不事先刻条形码，直接利用自然发生的体细胞突变，来推断细胞之间的亲缘关系，类似构建“细胞的系统发育树”

    **DNA条形码(DNA barcoding)**：一条某个物种特有的、且在种内稳定遗传的DNA序列，标识DNA序列和生物物种之间对应的关系，可用于物种快速鉴定
- **揭示机制**：在完成分类和注释之后，进一步探究为什么会有区别，是什么因素导致了差异
  - **差异表达**：单细胞计数数据常用负二项分布建模，差异比较有两种思路：
    - **Sample-level(pseudobulk)**：把同一类型的所有细胞在同一样本里加和，得到一个样本级的“pseudo-bulk count”，然后像bulk RNA-seq（对一群细胞的测序分析）那样，用edgeR/DESeq2/limma做差异分析，适合做病例-对照（处理“每个病人/样本”为单位的变异，统计更严谨）
    - **单细胞级(Cell-level)**：直接把每个细胞当一个观测，用广义线性混合模型建模，能更细致建模“零膨胀”等单细胞特性，但计算量大，例如工具MAST
  - **基因集富集**：哪些通路/TF活性在变化。有一些工具
    - PROGENy：不用“通路上的所有基因”，而用“下游footprint基因”推断通路活性，更适合scRNA
    - DoRothEA：给TF一组target基因，算每个TF的活性（而不是只看TF自己表达）
    - Pagoda2：专门为scRNA设计的富集分析框架
  - **细胞比例变化**：不同条件之间，某一种细胞类型的比例有没有变化
    - 比较简单的情况：统计各样本中某细胞类型的数量，做Poisson回归或非参数检验
    - 更复杂时：多个细胞类型沟槽一个组成(composition)，和样本总细胞数相关，需要考虑组成数据(compositional data)的特性——总和固定，增加一个类型的比例必然导致其他类型比例下降，例如scCODA/tascCODA等方法用贝叶斯模型来处理这个问题
    - DA-seq/MILO等方法更进一步，不是只对“人工划的cluster”做丰度比较，而是对局部邻域/连续空间做DA分析
  
    **DE(Differential expression)**：两组样本的同一细胞类型的基因表达差异分析

    **DA(Differential abundance)**：两组样本的同一细胞类型的丰度差异分析
  - **扰动建模(perturbation)**：用CRISPR-Cas9在细胞中敲除或敲低很多基因（每个细胞带一个gRNA条形码）；同时做单细胞RNA测序，从而知道这个细胞的gRNA是哪个，以及全转录组表达情况；最后分析某个基因敲除后对整个转录组的影响，进而对对细胞类型的影响。有一些工具
    - Augur：根据“条件（刺激-对照）能多好地被分类器区分”，找到对扰动最敏感的细胞类型
    - scGen：用生成模型预测“如果对一个细胞做某种扰动，转录组会如何变化”
    - Mixscape：在CRISPR中，区分真正被编辑的细胞和没编辑上的细胞
  - **细胞–细胞通讯**：一个细胞分泌配体(ligand)，另一个细胞表面有受体(receptor)，进而激活下游通路
  
    从表达数据里推断配体和受体的相互作用：先有一个ligand–receptor配对数据库，对每一对细胞类型A（发送者）和细胞类型B（接受者），看A是否表达配体、B是否表达受体，再看B是否出现了该通路的下游目标基因激活
    - LIANA：一个框架，整合多个通讯工具的输出
    - NicheNet：把ligand–receptor与下游基因调控网络结合起来，预测哪个配体可能解释某些目标基因的上调

**单细胞转录组(Transcriptomics)**：
- **实验流程**：样本采集 → 细胞解离 → 单细胞分离 → RNA提取 → 建库测序 → 初级数据分析 → 高级数据分析
  - **两种主要建库方式**：
    - **基于微孔板(Plate-based)**：每个细胞手工分到96/384孔板，每个孔独立扩增测序；深度高、可以测更多基因，但通量较低
    - **液滴法(Droplet-based)**：以10x为代表，细胞和带有条形码的beads在油相中形成一个个液滴。每个bead上标识cell barcode（这个bead/液滴/细胞的id）和UMI（这个转录本分子的id）

      cell barcode用来区分“这个reads来自哪个细胞”，UMI用来区分“这个reads来自哪个原始转录本分子”
  - 完成测序后，cellranger负责读入FASTQ文件（原始读段）并比对到参考基因组，之后按基因+细胞条形码+UMI计数，并做cell calling（区分真实细胞和背景液滴）最后输出结果
    - `matrix.mtx`：一个稀疏矩阵，行是基因，列是细胞，值是UMI计数
    - `genes.tsv`/`features.tsv`：每行对应一个基因/feature，第一列是基因id（如ENSG0000…），第二列是基因symbol（如ACTB），第三列是feature type（如Gene Expression/Antibody Capture/Peak等）
    - `barcodes.tsv`：每行一个细胞条形码，顺序与矩阵列一一对应，例如AAACCTGAGAAACCAT-1这样的字符串
  
    注：Seurat里用`Read10X(...)`就是自动读这三样东西，然后`CreateSeuratObject`就会把它们组合成一个对象
- **质量控制**：理想情况下，每个液滴里只有一个完好细胞
  - **实际操作中存在的问题**
    - **低质量细胞（死亡/破膜）**：细胞破裂，细胞核内mRNA流失，只剩少量线粒体RNA，导致检测到的基因数很少、UMI总数低、线粒体基因（以`MT-`开头的）比例高
    - **背景RNA**：样本制备时，部分细胞破裂，RNA游离进溶液里，被其它液滴吸入，导致一些标志基因在不该出现的细胞里也有一点表达。有一些工具比如SoupX、CellBender，可以估计背景成分，校正计数矩阵
    - **双细胞(Doublets)**：一个液滴里装了两个细胞，导致测得的表达是两个细胞的叠加。scDblFinder通过“模拟双细胞表达，和真实细胞比较”来识别
  - **中位数绝对偏差(median absolute deviation, MAD)**：偏离中位数5个MAD的细胞被定为异常细胞（极端值outlier）。标准差对极端值很敏感，MAD更稳健
- **归一化(normalization)**：想要不同细胞之间可比较
  - **简单log归一化(Shifted log transformation)**：先按每个细胞的测序深度“拉平”总量，再取对数压缩极端值
  - **scran normalization/delta method**：用池化的方式估计size factor，比简单“每个细胞总counts”更稳，特别适合批次校正任务
  - **基于NB模型的残差变换(Analytic Pearson residuals)**：计算每个基因、每个细胞的Pearson残差，残差大则表示该细胞这个基因的表达显著高于“技术噪声”预期，这些残差作为新矩阵，方差更稳定，适合找高变基因和稀有基因型

  注：在Seurat里，`NormalizeData`是简单log，`SCTransform`类似Analytic Pearson residuals
- **数据校正**：
  - **技术偏差**：
    - **批次效应(batch effect)**：不同实验批次/不同平台的系统差异
    - **技术上的抽样波动(count sampling effects)**：同样表达水平，测序深度不同
    - **生物混杂因素(biological confounding)**：细胞周期阶段不同会牵动一大批基因，进而影响聚类
  - **常见方法**：
    - **线性嵌入模型(Linear-embedding models)**：例如Harmony，在PCA等低维空间里做对齐，适合“结构比较简单”的整合任务
    - **深度学习方法**：例如基于变分自编码器的scVI、进一步改进的scANVI，适合复杂的大规模整合任务
    - **细胞周期校正(Cell cycle correction)**：比如Seurat内置的方法、Tricycle
- **特征选择与降维**：不可能拿2万个基因直接聚类，先选出信息量大的500–5000个基因（高变基因），再做 PCA/tSNE/UMAP
  - **特征选择的指标**：
    - **平均表达量(mean)**：非常低的基因大多是噪声，不考虑
    - **变异度/离散度(dispersion/coefficient of variation, CV)**：`CV=标准差/均值`，`Dispersion`对CV做一些标准化处理，减弱均值的影响
    - **偏差(Deviance)**：在负二项分布模型下，某基因在不同细胞之间的表达是否偏离“只有技术噪声”的预期，偏差越大，越可能反映真实生物差异
  - **降维方法**：
    - **PCA**：线性方法，捕捉全局变化，几乎是所有pipeline的第一步
    - **t-SNE**：非常擅长展示局部结构（细小聚类），但对参数敏感
    - **UMAP**：在稳定性、保持局部和全局结构等方面表现好

**单细胞表观组(epigenomics)**：直接探究“哪个增强子/启动子在哪种细胞类型是打开的”，这是转录调控的核心
- **基本原理**：
  - **ChIP-seq/CUT&Tag/CUT&RUN**：用特异抗体拉下带某种修饰或TF的DNA片段，测序，就知道TF/修饰在哪里富集
  - **ATAC-seq**：用Tn5转座酶插入接头，只在开放染色质（没有紧密绕在核小体上）插入，后面测序这些片段，重新比对到基因组上，就知道哪些位置开放了，插入的越多说明越开放/越有富集
    - **切点(cut/cut site)**：Tn5在某个碱基附近插入的事件
    - **peak**：把基因组位置作X轴、每个位置的cut数量作Y轴，画一个曲线，曲线的峰点就是peak。一个peak对应一个短的基因组区间，比如200–1000bp，在这个区间里cuts明显高于周围背景且有统计学意义

    很多peaks对应启动子、增强子、绝缘子（CTCF位点）等各种功能调控元件

    在实际应用中，常统计每个细胞中在每个peak里有多少cuts，得到一个cell×peaks的计数矩阵，对这个矩阵作归一化/PCA等分析
  - **单细胞版的scChIP/scATAC**：把这些流程和微流控/索引技术结合，对每个细胞单独建库。scChIP比较难做，深度低；scATAC相对成熟，单细胞分析多用scATAC
- **常见修饰**：
  - H3K4me1/H3K27ac：增强子
  - H3K4me3：启动子
  - H3K36me3：转录中的基因区域
  - H3K27me3：Polycomb抑制相关标记（被Polycomb复合体PRC1/PRC2调控的区域），往往是发育调控基因、需要被沉默或待命的基因
  - H3K9me3：异染色质(heterochromatin)
- **scATAC/scChIP分析的优势**
  - 能区分调控原因（比如哪个增强子更活跃），而不仅是结果（哪个基因高表达）
  - 能识别新的顺式调控元件(CRE)：很多增强子远离基因，RNA看不到
  - 和scRNA联合，可以构建TF–CRE–Gene的调控网络
- **scChIP-seq和scATAC-seq的流程**：读入数据 → 质量控制 → 定义特征features → 降维聚类 → 细胞注释 → 可视化 → 深入解读（motif、footprinting、整合RNA等）
  - **scATAC的QC指标**
    - Total fragment counts：类似scRNA的总counts，太低就是低质量
    - TSS enrichment：转录起始位点附近读段的富集程度，开放染色质在TSS周围通常有明显峰，比值高则信噪比好
    - Number of features per cell：类似检测到的peak数，相当于scRNA的基因数
    - Nucleosome signal：单核小体长片段与无核小体短片段的比值，比值过高或过低都可能是异常
    - Reads in peaks fraction：落在peak区域的读段在全基因组中的占比，偏低则噪声大
    - Blacklist fraction：落在ENCODE定义的“黑名单区域”的reads比例（这些区域容易产生假阳性信号）
  - **Doublet检测**：可用scDblFinder、AMULET等，通过检测“某个基因组位置>2个reads”的情况判断doublet

**单细胞表观组的三个任务**：
- **scATAC的聚类和注释**：不能直接拿peak-count矩阵做PCA（太稀疏）
  - 常用：
    - **Latent Semantic Indexing, LSI**：类似于文本挖掘，peak相当于词，细胞相当于文档，先做TF-IDF（一种归一化方法），再做SVD，例如Signac、ArchR
    - **Latent Dirichlet Allocation, LDA**：把peak看成“topic”，每个细胞是多个topic的混合，例如cisTopic
    - **Spectral embedding**：使用谱嵌入做降维，例如snapATAC
  - **Normalization + Binarization**：常见做法是把peak counts转成二值（开放/不开放），忽略read深度差异，减少技术噪声，不过会丢掉“开放程度强弱”的信息
  - **差异可及区域(DARs)和注释**：像差异表达一样，对比两个细胞型，找到差异开放的peaks作为DARs，用DESeq2/edgeR等模型，需要考虑混杂因素(confounder)，例如测序深度/批次/线粒体读段比例/细胞类型阶段等
    
    **DARs对应的CRE**：
    - 用GREAT/LOLA/GIGGLE等工具做富集分析（看这些CRE富集在哪些TF motif/哪些基因附近）
    - 和目标基因关联（最近基因/loop等），算gene activity score，做细胞类型注释
- **TF motif & footprinting**
  - **chromVAR**：把“哪些peak含有某个motif”信息加总起来，给每个细胞一个这个TF motif的活性分数
  - **粗略流程**：
    - 对每个motif，找出所有含有它的peaks
    - 对每个细胞，算这些peaks的总reads/counts
    - 根据GC含量和总体可及性，为每个motif找一组背景peaks，算背景期望
    - 比较实际和背景，得到bias-corrected deviation(Z-score)
    - 形成motif×cell矩阵，用于细胞聚类、motif差异可及性分析和推断TF活性/协同作用
  - **Footprinting**：看motif位置周围的cutpattern：真正有TF结合的地方，转座酶/酶切会被挡住，让motif位置出现“凹槽”（cut掉两侧，中间低）。可以更有力地证明“这个TF在这个细胞型中真的在DNA上起作用，而不仅仅是motif存在
- **整合scATAC和scRNA**：取决于是同一个细胞测了多模态，还是不同细胞测的不同模态
  - **Paired integration**：同一细胞有RNA+ATAC，如10xmultiome/sci-CAR等。使用MOFA+（多模态因子分析），同时建模多模态
  - **Unpaired integration**：一批细胞测RNA，另一批测ATAC。使用SCOT/UnionCom/GLUE等，目标是对齐两种模态的manifold，尽量减少信息损失
  - **Mosaic integration**：有的细胞测一部分模态，有的测另一部分，有的测全部如totalVI/MultiVI（对CITE-seq/multiome）建联合模型。使用Stabmap/Multigrate等可以把单模态和多模态数据一起映射到一个共享空间，并补全缺失模态

#### Seurat实操


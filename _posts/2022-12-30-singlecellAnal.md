---
layout: mypost
title: 单细胞相关分析
category: other
subcategory: other-other
---

2025.11.18-2025.12.研究进展

<!-- more -->

### synapse网站数据

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

### 单细胞分析

**单细胞分析**：在单个细胞的尺度上，一次性、高通量地测很多种分子信息，而且涉及到多种组学
- 高通量(high‑throughput)：一次测几千、几万甚至几十万个细胞
- 分子信息(molecular profiling)：细胞内有哪些种分子、每种有多少
- across modalities：RNA、染色质、蛋白、受体序列、空间位置
  - 转录组(Transcriptomics)：每个细胞里mRNA的丰度（每个基因大概多少转录本），比如Seurat分析scRNA‑seq数据
  - 染色质开放程度(Chromatin accessibility)：使用转座酶染色质可及性测序(ATAC-seq)、ChIP-seq等方法，看哪个DNA区域是开放的/被哪些蛋白占据
  - 细胞表面蛋白(Surface protein expression)：用带条形码的抗体测细胞表面标志，同时检测细胞表面的蛋白质信息与胞内转录组信息，相对转录组数据额外地加入了细胞表面蛋白的表达信息，可以更加深入地区分细胞异质性、更精确地挖掘特异性的细胞类型
  - 适应性免疫受体组库(Adaptive immune receptor repertoire profiling)：免疫细胞在识别哪些抗原、哪些克隆被扩增
  - 空间信息(Spatial information)：比如空间转录组，探究细胞在组织的哪个位置聚在一起、有什么相互影响
- 会有很多种分析方法，然后有人做了一些对比评测(benchmarking)，告诉大家哪些方法在什么场景表现好、有哪些优缺点等等
- 尽量同时分析/整合多种模态(Multimodal)，而不是只分析一种模态(Unimodal)，比如RNA+ATAC，RNA+蛋白，RNA+空间位置…………

**单细胞分析的三个任务**：
- 聚类 & 细胞类型注释：将细胞按细胞类型聚类
  - 聚类是一种无监督学习，每个细胞几千个基因的表达量，可以想成每个细胞是一个高维向量。具体来说
    - 先做PCA，把几千个基因压缩到比如10–50个主成分
    - 在主成分空间里，计算任意两个细胞之间的距离
    - 对每个细胞，找到它最像的K个邻居（KNN图，k一般5–100）
    - 通过一些划分算法来判断每个细胞属于哪个cluster
  - 标志基因(marker)：在某一类细胞里明显高表达，而在其他细胞里表达低或没有的基因。具体来说
    - 先看某个cluster，与其他所有cluster比较
    - 进行差异表达分析(t-test/Wilcoxon rank-sum test)
    - 选出在这个cluster表达比例高，在其他表达比例低，且logFC明显为正、p值显著的基因
  - 细胞注释的三个层次/步骤
    - 自动注释
      - Classifier-based：对于每个聚类，根据标志基因表达模式，训练一个分类器，例如Garnett/CellAssign/CellTypist/Clustifyr等
      - 映射到参考图谱(Reference mapping)：把数据投到一个已经注释好的大图谱上，例如scArches/Symphony/Azimuth等
    - 手动注释：直接查看每个聚类的标志基因，再查阅相关文献，或者参考经典marker
    - 验证注释的可靠性：例如marker是否符合生物学常识、同一细胞类型是否只出现在一个cluster、不同样本之间能不能对应起来等，可能还会用细胞谱系、轨迹等信息辅助判断
- 连续过程 & 轨迹 + RNA velocity + 谱系追踪
  - 轨迹推断(trajectory inference)：很多生物过程不是“划分成几类”就够了，比如细胞的分化过程、T细胞激活-记忆T细胞状态改变的过程，是一个连续的轨迹，而不是简单的几个聚类。轨迹推断就是在表达空间里找到一条（或几条）“路线”，把细胞按照生物过程的顺序排成一条线（伪时间pseudo time）
    - Cluster approach（聚类 → 线连接）：先聚类，再看cluster之间的拓扑连接关系，用最小生成树MST连接；每个cluster是一个节点，MST把它们连起来，得到一条或分叉的路径
    - Graph approach（图论方式）：先在细胞间构图，再用图的方法（比如PAGA）推断cluster之间的连通关系和方向，更适合复杂拓扑（多分支）
    - Manifold-learning based（流形学习）：在降维空间里找一条“光滑曲线”，把cluster串起来，或者说，在点云之间画一条最顺最合理的“生长路径”，如Slingshot
    - Probabilistic frameworks（概率框架）：基于扩散过程，给每个细胞一个“到起点的距离”的概率度量 → 伪时间，如DPT

    需要注意的是，推出来的轨迹不一定有生物学意义，需要结合实验背景判断；对稳态系统/多种复杂动力学，传统伪时间有时不适用
  - RNA velocity：用“未剪接RNA(u)”和“已剪接RNA(s)”的比例，来推断：这个基因在这个细胞里，是在“被进一步打开/即将表达更多”，还是在“关上/即将表达更少”
    - 根据测序时读段在外显子/内含子上的位置，统计每个细胞、每个基因的unspliced和spliced reads数量
    - 假设在某个时间点，基因表达处于稳定状态，可以估计降解速率γ：`ds/dt=βu-γs`，当`ds/dt=0`时用u和s估计γ
    - 用unspliced数量+估计的γ，推断下一时刻的spliced数量，如果u很高，就说明正准备大量剪接成s，s会升高，基因转录更活跃；如果u低但s高，说明转录已停止，只剩下降解，s会降低，基因转录更沉默
    - 对每个细胞，找到“最像它下一步状态”的其他细胞：在UMAP/tSNE图上，就画出一根箭头指向“未来的位置”(velocity vector)

    本质上就是在原来的表达空间上，叠加一个“流场”，说明细胞群整体在往哪里演化
  - 谱系追踪：从基因组突变/条形码角度推断“谁是谁的后代”
    - 前瞻追踪(Prospective lineage tracing)：在起始细胞引入一个可遗传的标记（例如条形码/CRISPR 可编辑位点），后代细胞都会带着这个标记；标记不断累积变化，最后后期测序这个标记来还原“家谱树”，例如软件Cassiopeia
    - 回顾追踪(Retrospective lineage tracing)：不事先刻条形码，直接利用自然发生的体细胞突变，来推断细胞之间的亲缘关系，类似构建“细胞的系统发育树”

    DNA条形码(DNA barcoding)：一条某个物种特有的、且在种内稳定遗传的DNA序列，标识DNA序列和生物物种之间对应的关系，可用于物种快速鉴定
- 揭示机制：在完成分类和注释之后，进一步探究为什么会有区别，是什么因素导致了差异
  - 差异表达：单细胞计数数据常用负二项分布建模，差异比较有两种思路：
    - Sample-level(pseudobulk)：把同一类型的所有细胞在同一样本里加和，得到一个样本级的“pseudo-bulk count”，然后像bulk RNA-seq（对一群细胞的测序分析）那样，用edgeR/DESeq2/limma做差异分析，适合做病例-对照（处理“每个病人/样本”为单位的变异，统计更严谨）
    - 单细胞级(Cell-level)：直接把每个细胞当一个观测，用广义线性混合模型建模，能更细致建模“零膨胀”等单细胞特性，但计算量大，例如工具MAST
  - 基因集富集：哪些通路/TF活性在变化。有一些工具
    - PROGENy：不用“通路上的所有基因”，而用“下游footprint基因”推断通路活性，更适合scRNA
    - DoRothEA：给TF一组target基因，算每个TF的活性（而不是只看TF自己表达）
    - Pagoda2：专门为scRNA设计的富集分析框架
  - 细胞比例变化：不同条件之间，某一种细胞类型的比例有没有变化
    - 比较简单的情况：统计各样本中某细胞类型的数量，做Poisson回归或非参数检验
    - 更复杂时：多个细胞类型沟槽一个组成(composition)，和样本总细胞数相关，需要考虑组成数据(compositional data)的特性——总和固定，增加一个类型的比例必然导致其他类型比例下降，例如scCODA/tascCODA等方法用贝叶斯模型来处理这个问题
    - DA-seq/MILO等方法更进一步，不是只对“人工划的cluster”做丰度比较，而是对局部邻域/连续空间做DA分析
  
    DE(Differential expression)：两组样本的同一细胞类型的基因表达差异分析

    DA(Differential abundance)：两组样本的同一细胞类型的丰度差异分析
  - 扰动建模(perturbation)：用CRISPR-Cas9在细胞中敲除或敲低很多基因（每个细胞带一个gRNA条形码）；同时做单细胞RNA测序，从而知道这个细胞的gRNA是哪个，以及全转录组表达情况；最后分析某个基因敲除后对整个转录组的影响，进而对对细胞类型的影响。有一些工具
    - Augur：根据“条件（刺激-对照）能多好地被分类器区分”，找到对扰动最敏感的细胞类型
    - scGen：用生成模型预测“如果对一个细胞做某种扰动，转录组会如何变化”
    - Mixscape：在CRISPR中，区分真正被编辑的细胞和没编辑上的细胞
  - 细胞–细胞通讯：一个细胞分泌配体(ligand)，另一个细胞表面有受体(receptor)，进而激活下游通路
  
    从表达数据里推断配体和受体的相互作用：先有一个ligand–receptor配对数据库，对每一对细胞类型A（发送者）和细胞类型B（接受者），看A是否表达配体、B是否表达受体，再看B是否出现了该通路的下游目标基因激活
    - LIANA：一个框架，整合多个通讯工具的输出
    - NicheNet：把ligand–receptor与下游基因调控网络结合起来，预测哪个配体可能解释某些目标基因的上调


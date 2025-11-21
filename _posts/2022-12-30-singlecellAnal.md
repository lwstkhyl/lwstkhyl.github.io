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


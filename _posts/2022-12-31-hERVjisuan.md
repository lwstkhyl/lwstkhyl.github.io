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
- **Superfamily（超家族/类别）**：按逆转录病毒的进化类群划分。`ClassI`类似于γ/β逆转录病毒(gamma/beta-like)，参与多种生理过程（胚胎发育、免疫通路、各类疾病），包括HERV-W、HERV-H、HERV-FRD、HERV-E、HERV-9等；`ClassII`类似于β/腺病毒逆转录病毒(beta/delta-like)，最研究深入的家族，与各类疾病密切相关，包括HERV-K等；`ClassIII`类似于spumavirus，最古老，序列残片较多，无表达能力，包括HERV-L等
- **Family（家族）**：一类具有相似序列、共同起源的hERV插入序列，最常用，例如`HERV-K`、`HERV-W`、`HERV-H`、`HERV-L`等。家族之间差异很大，有的可能已有表达产物，有的完全失活，包括HERV-L 等
- **Subfamily（亚家族）**：部分比较大的family，进一步分为subfamily。例如HERV-K，可进一步分为`HML-1`~`HML-10`（HML指human MMTV-like，表示它们与小鼠乳腺病毒类似），其中HML-2是其中最年轻、保留编码能力最强的一类，常见于癌症/AD研究中；还有的例如HERV-H按序列相似性分为不同的插入群组（如group 1/group 2），但这类亚分类不太标准化，常用于特定研究

**Species-level（种级）**：某个特定hERV序列在人类基因组中的一个**特定插入位点**，是进行基因型-表型关联分析的最小单位。最开始一个前病毒整合到了基因组的一个特定位置，之后通过逆转录转座等机制，这个前病毒的“副本”被复制并插入到基因组的其他位置，每一个这样的独立插入单元，都被称为一个Species/Locus
- 例如在某个人类基因组中发现的一个HERV-K元件插入在7q11.23的某个位点，就是一个species-level的元素，基因组上还有很多个HERV-K家族插入在不同位点上，每一个位点都是一个独立单位(Species)

#### 插入基因组后影响表达的具体机制


#### 可变剪接


#### 计算软件

##### Repeatmasker
**[Repeatmasker](https://www.repeatmasker.org/)**：重复序列检测，通过与参考数据库的相似性比对来准确识别或屏蔽基因组中的重复序列，属于同源预测注释的方式
- [安装](https://blog.csdn.net/m0_65437087/article/details/148420035)

### 计算流程


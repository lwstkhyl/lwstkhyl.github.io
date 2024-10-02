---
layout: mypost
title: 数据分析03--Pandas数据处理
category: python
subcategory: python-database
---
Pandas数据处理，包括层次化索引、缺失值处理、数据合并与映射、聚合函数与统计学函数等

<!-- more -->

写在前面：本笔记来自b站课程[千锋教育python数据分析教程200集](https://www.bilibili.com/video/BV15V4y1f7Ju)

[资料下载](https://pan.baidu.com/s/1yrr-kvH2PAR7zNI3K81WSA)  提取码：wusa



### 层次化索引

![层次化索引](/upload/md-image/python数据分析/层次化索引.png "层次化索引"){:width="400px" height="400px"}

其中最外层的"期中"、"期末"以及"1班"、"2班"就是层次化索引

#### 创建

##### 隐式构造

最常用的方法是给df构造函数的index/columns参数传递一个二维数组，数组中每个元素为对应行/列的索引，这样每行/列就有多个行名/列名

```py
row = 4
col = 5
df = pd.DataFrame(
    data=np.array(range(col*row)).reshape(row, col),
    index=[['第一组行', '第一组行', '第二组行', '第二组行'], ['行1', '行2', '行3', '行4']],
    columns=[['第一组列', '第一组列', '第二组列', '第二组列', '第二组列'], ['列1', '列2', '列3', '列4', '列5']]
)
print(df)
```


```
             第一组列    第二组列        
             列1  列2   列3  列4  列5
第一组行 行1    0   1    2   3   4
        行2    5   6    7   8   9
第二组行 行3   10   11   12  13  14
        行4   15   16   17  18  19
```


series也可创建多层索引：

```py
s = pd.Series(data=np.array(range(row)), index=df.index)
print(s)
```


```
第一组行  行1    0
         行2    1
第二组行  行3    2
         行4    3
dtype: int32
```


##### 显式构造

`pd.MultiIndex`系列方法

- 使用**数组**

    ```py
  index = pd.MultiIndex.from_arrays([
  ['第一组行', '第一组行', '第二组行', '第二组行'],
  ['行1', '行2', '行3', '行4']])
  columns = pd.MultiIndex.from_arrays([
      ['第一组列', '第一组列', '第二组列', '第二组列', '第二组列'],
      ['列1', '列2', '列3', '列4', '列5']])
  df = pd.DataFrame(
      data=np.array(range(col*row)).reshape(row, col),
      index=index,
      columns=columns
  )
    ```


    这种方式与上面的隐式构造没有差别，`pd.MultiIndex.from_arrays`写不写都可以

- 使用**元组**：`pd.MultiIndex.from_tuples()`需要传入一个元组集合，里面的每个元素是一个元组，表示每行/每列拥有的索引名

    ```py
  index = pd.MultiIndex.from_tuples(
      (
          ('第一组行', '行1'), ('第一组行', '行2'), ('第二组行', '行3'), ('第二组行', '行4')
      )
  )
  columns = pd.MultiIndex.from_tuples(
      (
          ('第一组列', '列1'), ('第一组列', '列2'), ('第二组列', '列3'), ('第二组列', '列4'), ('第二组列', '列5')
      )
  )
  df = pd.DataFrame(
      data=np.array(range(col*row)).reshape(row, col),
      index=index,
      columns=columns
  )
    ```


- **笛卡尔积**：`(a,b)*(c,d)`=>`[(a,c),(a,d),(b,c),(b,d)]`

    `pd.MultiIndex.from_product()`接收一个二维数组，它产生的结果可类比上面的使用元组创建：`pd.MultiIndex.from_product([[a,b],[c,d]])`等同于`pd.MultiIndex.from_tuples(((a,c),(a,d),(b,c),(b,d)))`，即对二维数组中的元素进行笛卡尔积运算

    ```py
  index = pd.MultiIndex.from_product([
      ['第一组行', '第二组行'],
      ['行1', '行2']
  ])
  columns = pd.MultiIndex.from_product([
      ['第一组列'],
      ['列1', '列2', '列3', '列4', '列5']
  ])
  df = pd.DataFrame(
      data=np.array(range(col*row)).reshape(row, col),
      index=index,
      columns=columns
  )
    ```


    ```
               第一组列                
              列1  列2  列3 列4 列5
  第一组行 行1   0   1   2   3   4
          行2   5   6   7   8   9
  第二组行 行1   10  11  12  13  14
          行2   15  16  17  18  19
    ```


    注意这种方式涉及到每层索引的依次组合，比较适用于：

    ![层次化索引](/upload/md-image/python数据分析/层次化索引.png "层次化索引"){:width="400px" height="400px"}这种情况



这几种方式可以混合使用，比如index用`from_product()`，columns用`from_tuples()`

#### 取索引

##### series的索引

```
第一组行  行1    0
         行2    1
第二组行  行3    2
         行4    3
dtype: int32
```


**显式索引：**

根据外层索引取值：

```py
print(s['第一组行'])  # 或
print(s.loc['第一组行'])
```


```
行1    0
行2    1
dtype: int32
```


保留外层索引：

```py
print(s[['第一组行']])  # 也可以
print(s[['第一组行', '第二组行']])  # 同时取多个外层索引
```


```
第一组行  行1    0
         行2    1
第二组行  行3    2
         行4    3
dtype: int32
```


根据外层和内层索引：

```py
print(s['第一组行', '行1'])  # 也可以
print(s['第一组行']['行1'])  # 0
```


注意：根据显式索引取值时，当有外层索引时，不能直接使用之前的方法取内层索引，必须先说明外层索引，再在其中去取

```py
print(s['行1'])  # 报错
print(s.loc['行1'])  # 报错
```


---



**隐式索引：**

直接取的是内层索引的序号

```py
print(s[0])  # 0
print(s.iloc[1])  # 1
print(s.iloc[[1, 2]])
```


```
第一组行  行2    1
第二组行  行3    2
dtype: int32
```


##### DataFrame的索引

```
             第一组列    第二组列        
             列1  列2   列3  列4  列5
第一组行 行1    0   1    2   3   4
        行2    5   6    7   8   9
第二组行 行3   10   11   12  13  14
        行4   15   16   17  18  19
```


只需记住：df是按`df[外层列索引][内层列索引][外层行索引][内层行索引]`的顺序进行取值即可

df的隐式索引与series的隐式索引一样，直接取的是内层索引的序号

```py
print(df['第一组列'])
```


```
            列1  列2
第一组行 行1   0   1
        行2   5   6
第二组行 行3  10  11
        行4  15  16
```


```py
print(df['第一组列']['列1'])
```


```
第一组行  行1     0
         行2     5
第二组行  行3    10
         行4    15
Name: 列1, dtype: int32
```


```py
print(df['第一组列']['列1']['第一组行'])
```


```
行1    0
行2    5
Name: 列1, dtype: int32
```


```py
print(df['第一组列']['列1']['第一组行']['行1'])  # 0
```


当然，这种方法中`[[行/列]]`、`[行/列]`、`[行,列]`、`df.列名`、`loc`、`iloc`都可以混用（`[[]]`就是保留外层索引）

一些例子：

```py
df['第一组列', '列1']  # 等同于
df.第一组列.列1  # 取列1
df.iloc[:, 2]  # 取第三列
df.iloc[:, [2, 1]]  # 取第三、二列
df.loc[:, ('第一组列', '列1')]  # 取第一组列中的列1
df.loc['第一组行'].loc['行1']  # 取第一组行中的行1，也可以
df.loc[('第一组行', '行1')]  # 取行1
df.loc['第一组行', '第一组列']  # 取第一组行的第一组列
df.iloc[0]  # 取第一行
df.iloc[[0, 1]]  # 取第一、二行
```


注意特殊写法：`(外层索引, 内层索引)`表示取指定的内层索引，用来代替单索引时的`内层索引`



---



另一种取元素的方式：

```py
print(df.iloc[0, 1])  # 也可以
print(df.loc[('第一组行', '行1'), ('第一组列', '列2')])  # 1
```




#### 切片

##### series的切片

```
第一组行  行1    0
         行2    1
第二组行  行3    2
         行4    3
dtype: int32
```


**显式索引：**

根据外层索引：

```py
print(s['第一组行': '第二组行'])  # 也可以
print(s.loc['第一组行': '第二组行'])
```


```
第一组行  行1    0
         行2    1
第二组行  行3    2
         行4    3
dtype: int32
```


根据外层和内层索引：

```py
print(s.loc['第一组行'][0:2])
```


```
行1    0
行2    1
dtype: int32
```


**隐式索引：**

直接切片的是内层索引的序号

```py
print(s[1: 3])  # 也可以
print(s.iloc[1: 3])
```


```
第一组行  行2    1
第二组行  行3    2
dtype: int32
```


##### DataFrame的切片

```
             第一组列    第二组列        
             列1  列2   列3  列4  列5
第一组行 行1    0   1    2   3   4
        行2    5   6    7   8   9
第二组行 行3   10   11   12  13  14
        行4   15   16   17  18  19
```


一些例子：

```py
# 行切片
df.iloc[1: 5]  # 取第2-5行
df.loc['第一组行':'第二组行']  # 从外层索引第一组行切到第二组行
df.loc[('第一组行', '行1'), ('第二组行', '行2')]  # 从第一组行的行1切到第二组行的行2
# 列切片
df.iloc[:, 1:3]  # 取第2-3列
df.loc[:, '第一组列':'第二组列']  # 取外层的第一组列到第二组列
df.loc[:, ('第一组列', '列2'):('第二组列', '列2')]  # 报错，虽然按前面的逻辑来讲没问题
```


建议切片时使用隐式索引，更简便稳定

#### 索引的堆叠

```
             第一组列   第二组列    
             列1  列2   列1  列2
第一组行 行1    0   1    2   3
        行2    4   5    6   7
第二组行 行1    8   9   10  11
        行2   12   13   14  15
```


`df.stack(level=-1)`将列索引（默认是最内层列索引）变为最内层行索引

- `level`指定改变的是哪层索引，各层索引**从外至内**依次是0-n，-1就表示最内层索引



```py
print(df.stack())
```


```
                第一组列  第二组列
第一组行 行1 列1     0     2
            列2     1     3
        行2 列1     4     6
            列2     5     7
第二组行 行1 列1     8    10
            列2     9    11
        行2 列1    12    14
            列2    13    15
```


```py
print(df.stack(level=0))
```


```
                     列1  列2
第一组行 行1 第一组列   0   1
            第二组列   2   3
        行2 第一组列   4   5
            第二组列   6   7
第二组行 行1 第一组列   8   9
            第二组列  10  11
        行2 第一组列  12  13
            第二组列  14  15
```




---



`df.unstack(level=-1)`将行索引（默认是最内层列索引）变为最内层列索引

```
                第一组列  第二组列
第一组行 行1 列1     0     2
            列2     1     3
        行2 列1     4     6
            列2     5     7
第二组行 行1 列1     8    10
            列2     9    11
        行2 列1    12    14
            列2    13    15
```


```py
print(df2.unstack())
```


```
             第一组列    第二组列    
             列1  列2   列1  列2
第一组行 行1    0   1    2   3
        行2    4   5    6   7
第二组行 行1    8   9   10  11
        行2   12  13   14  15
```


```py
print(df2.unstack(level=0))
```


```
        第一组列          第二组列     
      第一组行 第二组行 第一组行 第二组行
行1 列1    0     8       2      10
    列2    1     9       3      11
行2 列1    4    12       6      14
    列2    5    13       7      15
```


level等于哪层索引，哪层索引就被切换到行/列中



---



可以在unstack函数中设置参数`fill_value`，指定df重排后缺失的值

```
             第一组列    第二组列    
             列1  列2   列1  列2
第一组行 行1    0   1    2   3
        行2    4   5    6   7
第二组行 行1    8   9   10  11
        行3   12  13   14  15
```


```py
print(df.unstack(fill_value=0))
```


```
          第一组列                      第二组列                  
          列1           列2             列1             列2       
          行1 行2  行3 行1 行2  行3   行1 行2  行3  行1 行2  行3
第一组行    0  4    0   1   5    0     2  6    0    3   7    0
第二组行    8  0   12   9   0   13    10  0   14   11   0   15
```


### 数据合并

为方便说明，使用`make_df`函数生成固定数据格式的df：列索引为ABCDE...，行索引为12345...，每个元素就是列索引+行索引（即A1 B2 C3...）的形式

```py
def make_df(row: int, col: int):
    index = [str(i) for i in range(1, row+1)]
    columns = [chr(ord('A')+i) for i in range(col)]
    data = []
    for i in index:
        row_data = []
        for j in columns:
            row_data.append(j+i)
        data.append(row_data)
    return pd.DataFrame(data=data, index=index, columns=columns)
df = make_df(4, 5)
```


```
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A2  B2  C2  D2  E2
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
```


#### concat

`pd.concat([df1,df2,...],axis=0)`默认上下（垂直）合并，设置axis=1即为左右（水平）合并

```py
df1 = make_df(2, 2)
df2 = make_df(3, 2)
print(pd.concat([df1, df2]))
```


```
    A   B
1  A1  B1
2  A2  B2
1  A1  B1
2  A2  B2
3  A3  B3
```


```py
print(pd.concat([df1, df2], axis=1))
```


```
     A    B   A   B
1   A1   B1  A1  B1
2   A2   B2  A2  B2
3  NaN  NaN  A3  B3
```


其它参数：

- `ignore_index=False`当设置为True时忽略行索引，即对结果df的行索引重新按01234...的顺序赋值

- `keys=[i1,i2,...]`设置多层索引，即将结果df中原来来自df1的数据设置外层索引i1，原来来自df2的数据设置外层索引i2...注意它不能与`ignore_index`一起用

    ```py
  print(pd.concat([df1, df2], keys=['df1', 'df2']))
    ```


    ```
          A   B
  df1 1  A1  B1
      2  A2  B2
  df2 1  A1  B1
      2  A2  B2
      3  A3  B3
    ```


- `join='outer'`**不匹配连接：**级联维度的索引不一致，如垂直级联时列索引不一致、水平级联时行索引不一致

    join就是指定了级联的方式

    - `outer`外连接，保留所有行/列，缺的值用NaN补上

    - `inner`内连接，只保留共有的行/列



    ```py
  df1 = make_df(2, 2)
  df2 = make_df(2, 3)
  print(pd.concat([df1, df2]))
    ```


    ```
      A   B    C
  1  A1  B1  NaN
  2  A2  B2  NaN
  1  A1  B1   C1
  2  A2  B2   C2
    ```


    ```py
  print(pd.concat([df1, df2],join='inner'))
    ```


    ```
      A   B
  1  A1  B1
  2  A2  B2
  1  A1  B1
  2  A2  B2
    ```


#### append

`df1.append(df2, ignore_index=False)`将df2追加到df1的后面，进行垂直合并，保留全部列

相当于`pd.concat([df1,df2],axis=0,join='outer)`

新版本中该函数可能被改成了`_append`

#### merge（重点）

与前面两种方法的区别：需要根据某一共同的行/列进行合并

`pd.merge(df1,df2)`/`df1.merge(df2)`会自动找到它们相同的列，将其作为key合并，默认内连接

##### 正常情况下合并

**一对一合并：**

一对一：就是指第一个表中只有一行id为2的值，第二个表中也只有一行id为2的值

```
  name  id  age
0  abc   1   11
1  bcd   2   12
2  cde   3   13
```


```
  sex  id
0   m   2
1   f   3
2   m   4
```


观察上面两个表，有共同列`id`

```py
print(pd.merge(df1, df2))
```


```
  name  id  age sex
0  bcd   2   12   m
1  cde   3   13   f
```


即将第一个表中id为2的name、age与第二个表中id为2的sex合并成一行，第一个表中id为3的name、age与第二个表中id为3的sex合并成一行

第一个表中没有id为4的行，第二个表中没有id为1的行，所以这两行数据就被丢弃（进行内连接，保留共有值）



---



**多对一合并：**

```
  name  id  age
0  abc   1   11
1  bcd   2   12
2  cde   2   13
```


```
  sex  id
0   m   2
1   f   3
2   m   4
```


可以看到第一个表中有多个id=2，这种情况下会将第一个表中所有id为2的name、age与第二个表中id为2的sex合并成一行

```py
print(pd.merge(df1, df2))
```


```
  name  id  age sex
0  bcd   2   12   m
1  cde   2   13   m
```




---



**多对多合并：**

```
  name  id  age
0  abc   1   11
1  bcd   2   12
2  cde   2   13
```


```
  sex  id
0   m   2
1   f   2
2   m   4
```


可以看到第一个表中有多个id=2，第二个表中也有多个id=2这种情况下会将第一个表中所有id为2的name、age与第二个表中所有id为2的sex全部组合（笛卡尔积）

```py
print(pd.merge(df1, df2))
```


```
  name  id  age sex
0  bcd   2   12   m
1  bcd   2   12   f
2  cde   2   13   m
3  cde   2   13   f
```


##### key的规范化

**当两个df有多个列相同时**：使用`on`参数显式指定哪列为key

```
  name  id  age
0  abc   1   11
1  bcd   2   12
2  cde   3   13
```


```
  name sex  id
0  abc   m   2
1  bcd   f   3
2  cde   m   4
```


```py
print(pd.merge(df1, df2))  # 空df，默认必须name和id全部对应才保留
print(pd.merge(df1, df2, on='id'))  # 只要id相同就连接
```


```
  name_x  id  age name_y sex
0    bcd   2   12    abc   m
1    cde   3   13    bcd   f
```


观察上表，因为合并后结果中有`df1`的name列和`df2`的name列，需要进行区分，于是自动添加了`_x`和`_y`后缀

使用参数`suffixes=['_df1','_df2']`进行更改



---



**当两个df没有相同列时**：使用`left_on`和`right_on`参数指定两个表中不同列作为连接的key

```
  name1  id1  age
0   abc    1   11
1   bcd    2   12
2   cde    3   13
```


```
  name2 sex  id2
0   abc   m    2
1   bcd   f    3
2   cde   m    4
```


```py
print(pd.merge(df1, df2))  # 报错，没有相同的列
print(pd.merge(df1, df2, left_on='id1', right_on='id2'))
```


```
  name1  id1  age name2 sex  id2
0   bcd    2   12   abc   m    2
1   cde    3   13   bcd   f    3
```




---



**使用行索引作key**：使用`left_index=True`和`right_index=True`分别指定是否使用左/右表中的行索引作为连接的key

```
  name1  id1  age
0   abc    1   11
1   bcd    2   12
2   cde    3   13
```


```
  name2 sex  id2
0   abc   m    2
1   bcd   f    3
2   cde   m    4
```


```py
print(pd.merge(df1, df2, left_index=True, right_index=True))  # 相同索引的行拼接
```


```
  name1  id1  age name2 sex  id2
0   abc    1   11   abc   m    2
1   bcd    2   12   bcd   f    3
2   cde    3   13   cde   m    4
```


`left/right_on`和`left/right_index`可以混用，目的都是指定左右两表中作为key的列

```py
print(pd.merge(df1, df2, left_index=True, right_on='id2'))  # [0,1,2]∩[2,3,4]，结果是df1中索引为2的行和df2中id2为2的行
```


```
  name1  id1  age name2 sex  id2
0   cde    3   13   abc   m    2
```


##### 内/外/左/右连接

默认是内连接，只保留key列中相同的值

也可以指定参数`how='outer'/'left'/'right'`设定外/左/右连接

左连接：在保留共有值基础上，加上只在左边出现的值，即保留左边的所有值。同理右连接就是保留右边的所有值

```
  name  id  age
0  abc   1   11
1  bcd   2   12
2  cde   3   13
```


```
  sex  id
0   m   2
1   f   3
2   m   4
```


```py
print(pd.merge(df1, df2, how='outer'))
```


```
  name  id   age  sex
0  abc   1  11.0  NaN
1  bcd   2  12.0    m
2  cde   3  13.0    f
3  NaN   4   NaN    m
```


```py
print(pd.merge(df1, df2, how='left'))
```


```
  name  id  age  sex
0  abc   1   11  NaN
1  bcd   2   12    m
2  cde   3   13    f
```


```py
print(pd.merge(df1, df2, how='right'))
```


```
  name  id   age sex
0  bcd   2  12.0   m
1  cde   3  13.0   f
2  NaN   4   NaN   m
```


### 各种值处理

#### 缺失值

有两种缺失值：

- `None`是python自带的空对象，不能参与到任何计算中，它的运算要比int类型的慢

- `np.nan`是np包提供的浮点类型的空的对象，能参与到计算中，但计算结果都为`np.nan`



pandas中`None`和`np.nan`都视作`np.nan`

##### 判断缺失值

`df.isnull()`/`df.notnull()`结果是一个与df尺寸相等的新df，每个元素是一个bool值，标识df上这个位置上的元素是不是nan

```
    A   B   C    D     E
1  A1  B1  C1   D1    E1
2  A2  B2  C2   D2  None
3  A3  B3  C3  NaN    E3
4  A4  B4  C4   D4    E4
5  A5  B5  C5   D5    E5
```


```py
print(df.isnull())
```


```
       A      B      C      D      E
1  False  False  False  False  False
2  False  False  False  False   True
3  False  False  False   True  False
4  False  False  False  False  False
5  False  False  False  False  False
```


找到全部/部分为空的行/列：使用`all()`和`any()`函数

- `all()`：必须一行/列全为True才为True

- `any()`：一行/列中有一个True就为True



常用形式：

```py
df.isnull().any()  # 找到有空值的列
df.notnull().all()  # 找到没有空值的列
df.isnull().any(axis=1)  # 找到有空值的行
df.notnull().all(axis=1)  # 找到没有空值的行
```


例：

```
    A   B   C    D    E
1  A1  B1  C1   D1   E1
2  A2  B2  C2   D2  NaN
3  A3  B3  C3  NaN   E3
4  A4  B4  C4   D4   E4
5  A5  B5  C5   D5   E5
```


```
# 有空值的列
A    False
B    False
C    False
D     True
E     True
dtype: bool
```


```
# 没有空值的列
A     True
B     True
C     True
D    False
E    False
dtype: bool
```


```
# 有空值的行
1    False
2     True
3     True
4    False
5    False
dtype: bool
```


```
# 没有空值的行
1     True
2    False
3    False
4     True
5     True
dtype: bool
```


##### 过滤数据

- 使用bool值索引：

  ```py
  # 过滤掉有空的行
  df[~df.isnull().any(axis=1)]  # 或者
  df[df.notnull().all(axis=1)]
  # 过滤掉有空的列
  df.loc[:,~df.isnull().any()]  # 或者
  df.loc[:,df.notnull().all()]
  ```


  这种方式用处广泛，将上面的`isnull()`和`notnull()`换成其它的条件就可以进行更多的过滤操作

- 使用`df.dropna()`函数

  ```py
  df.dropna()  # 过滤掉有空的行
  df.dropna(axis=1)  # 过滤掉有空的列
  ```


  可以选择过滤的方式`how='any'`，将'any'默认值改成'all'就表明所有都为空才过滤

  ```py
  df.dropna(how='all')  # 过滤掉所有数据都为空的行
  df.dropna(axis=1, how='all')  # 过滤掉所有数据都为空的列
  ```


  还可以设置参数`inplace=False`控制是否修改原数据，默认不修改



例：

```
    A   B   C    D    E
1  A1  B1  C1   D1   E1
2  A2  B2  C2   D2  NaN
3  A3  B3  C3  NaN   E3
4  A4  B4  C4   D4   E4
5  A5  B5  C5   D5   E5
```


```
# 过滤掉有空的行
    A   B   C   D   E
1  A1  B1  C1  D1  E1
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# 过滤掉有空的列
    A   B   C
1  A1  B1  C1
2  A2  B2  C2
3  A3  B3  C3
4  A4  B4  C4
5  A5  B5  C5
```


##### 填充

`df.fillna(value,limit=无限次,inplace=False,method=None,axis=0)`

- `value`指定将nan填充成的值（必需）

- `limit`指定填充次数

- `inplace=False`控制是否修改原数据

- `method`指定填充方法

  - `pad`/`ffill`向前填充，即使用nan上面的元素填充它

  - `backfill`/`bfill`向后填充，即使用nan下面的元素填充它

- `axis`通常与`method`配合使用，当设置`axis=1`时，向前填充变成向左填充（使用nan左面的元素填充它），向后填充变成向右填充（使用nan右面的元素填充它）

其中必需指定`method`或者`value`参数来说明填充值

```
    A   B   C    D    E
1  A1  B1  C1   D1   E1
2  A2  B2  C2   D2  NaN
3  A3  B3  C3  NaN   E3
4  A4  B4  C4   D4   E4
5  A5  B5  C5   D5   E5
```


```
# df.fillna(method='ffill')
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A2  B2  C2  D2  E1
3  A3  B3  C3  D2  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# df.fillna(method='bfill', axis=1)
    A   B   C   D    E
1  A1  B1  C1  D1   E1
2  A2  B2  C2  D2  NaN
3  A3  B3  C3  E3   E3
4  A4  B4  C4  D4   E4
5  A5  B5  C5  D5   E5
```


#### 重复值

##### 检测重复的行

`df.duplicated(keep='first',subset=[列名1,列名2,..])`判断各行是否与前面的行重复，如果有就标记为True

- `keep`参数指定判断的顺序，当设置为

  - `'first'`时，是从前向后判断，依次比较后面的行是否与前面的行重复

  - `'last'`时，是从后向前判断，依次比较前面的行是否与后面的行重复

  - `False`时，只要某行在整个df中有与它重复的，就标记为True

- `subset`指定判断行中哪些列重复，默认只有行中所有列相同时，才判定为重复



```
# 让第2行与第1行相同
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A1  B1  C1  D1  E1
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# df.duplicated()
1    False
2     True
3    False
4    False
5    False
dtype: bool
```


```
# df.duplicated(keep='last')
1     True
2    False
3    False
4    False
5    False
dtype: bool
```


##### 删除重复的行

`df.drop_duplicates(keep='first',subset=[列名1,列名2,..])`参数与`duplicated`相同，区别是它直接删除掉重复的行

```
# 让第2行的B列与第1行的相同
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A2  B1  C2  D2  E2
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# df.drop_duplicates(keep=False, subset=['B'])
    A   B   C   D   E
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


#### 其它操作

##### 查看基本信息

`df.info()`查看df的基本信息，包括：

- df类名

- 行数

- 列数

- 每列的名称、非空值数量、数据类型

- df各列类型总述

- 内存使用情况



例：

```py
df.iloc[1, 0] = None
df['B'] = df['B'].astype(np.str)
```


```
     A  B  C
a  2.0  4  1
b  NaN  3  2
c  2.0  2  4
d  4.0  2  2
```


```
# df.info()
<class 'pandas.core.frame.DataFrame'>
Index: 4 entries, a to d
Data columns (total 3 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   A       3 non-null      float64
 1   B       4 non-null      object 
 2   C       4 non-null      int32  
dtypes: float64(1), int32(1), object(1)
memory usage: 112.0+ bytes
```


##### 查看统计量

`df.describe()`查看各列的描述性统计量，包括：

- count行数

- mean平均值

- std标准差

- min最小值 max最大值

- 25% 50% 75%百分位数



`df.describe([百分位数1,百分位数2,...])`可以查看更多的百分位数

默认情况下，这些统计量会作为行名，如果数据有很多列，可能不方便查看，可以在`df.describe()`后加上`.T`展示结果的转置

例：

```
    A   B   C
a  32  59  86
b  79  17  45
c  84  74  99
d  93  96  39
```


```
# df.describe()
               A          B          C
count   4.000000   4.000000   4.000000
mean   72.000000  61.500000  67.250000
std    27.288581  33.331667  29.736341
min    32.000000  17.000000  39.000000
25%    67.250000  48.500000  43.500000
50%    81.500000  66.500000  65.500000
75%    86.250000  79.500000  89.250000
max    93.000000  96.000000  99.000000
```


```
# df.describe([0.1, 0.9]).T
   count   mean        std   min   10%   50%   90%   max
A    4.0  72.00  27.288581  32.0  46.1  81.5  90.3  93.0
B    4.0  61.50  33.331667  17.0  29.6  66.5  89.4  96.0
C    4.0  67.25  29.736341  39.0  40.8  65.5  95.1  99.0
```




---



`df.std()`查看每一列的标准差

```
A    29.788141
B    29.284524
C    34.998810
dtype: float64
```


##### 根据索引删除数据

```py
df.drop(行名)  # 删除行
df.drop(列名, axis=1)  # 删除列
df.drop(index=行名)  # 删除行
df.drop(columns=列名)  # 删除列
df.drop(index=[行名1,行名2,...])  # 删除多行
df.drop(columns=[列名1,列名2,...])  # 删除多列
```


还可以指定`inplace=True`参数直接修改原df

例：

```
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A2  B2  C2  D2  E2
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# df.drop(index=['1', '2'])
    A   B   C   D   E
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# df.drop('C', axis=1)
    A   B   D   E
1  A1  B1  D1  E1
2  A2  B2  D2  E2
3  A3  B3  D3  E3
4  A4  B4  D4  E4
5  A5  B5  D5  E5
```


##### 有几种值

`series.unique()`对一个series去重，相当于查看它里面有几种值

```
   A  B  C
a  4  4  3
b  0  3  2
c  3  0  0
d  4  3  2
```


```py
df['A'].unique()  # [4 0 3]
```


##### 按条件查询

`df.query('条件表达式')`

一般情况下用于筛选行，因此条件表达式都是判断列的值

```py
df.query('A == 9')  # 选出A列等于9的行
df.query('B > 9 and C < 6')  # 选出B列大于9且C列小于6的行
df.query('A in [1, 2, 3]')  # 选出A列等于1/2/3的行
```


如果想在条件表达式中使用变量，就在变量名前加上`@`

```py
n = 9
df.query('A == @n')  # 选出A列等于9的行
l = [1, 2, 3]
df.query('A in @l')  # 选出A列等于1/2/3的行
```


例：

```
   A  B  C
a  3  0  2
b  1  2  2
c  3  0  2
d  2  4  0
```


```py
df.query('A > 2')
```


```
   A  B  C
a  3  0  2
c  3  0  2
```


```py
l = range(3)
df.query('A in @l')
```


```
   A  B  C
b  1  2  2
d  2  4  0
```


##### 排序

`df.sort_values(列名, ascending=True)`按指定列的值进行排序，默认升序（从小到大）

`df.sort_values(行名, axis=1, ascending=True)`按指定行的值进行排序，默认升序，不常用

`df.sort_index(ascending=True)`按行名排序，默认升序，不常用

`df.sort_index(ascending=True, axis=1)`按列名排序，默认升序，不常用

例：

```
   A  B  C
a  1  0  0
b  2  3  3
c  4  1  2
d  3  1  1
```


```
# df.sort_values('A', ascending=False)
   A  B  C
c  4  1  2
d  3  1  1
b  2  3  3
a  1  0  0
```


```
# 按a行的值排序，改变列的顺序
# df.sort_values('a', axis=1)
   B  C  A
a  0  0  1
b  3  3  2
c  1  2  4
d  1  1  3
```


```
# 按行名的ASCII码排序
# df.sort_index(ascending=False)
   A  B  C
d  3  1  1
c  4  1  2
b  2  3  3
a  1  0  0
```


#### 异常值处理案例

新建一个形状为10000*3的标准正态分布的df，去掉包含绝对值大于三倍标准差元素的行

- 标准正态分布随机数`np.random.randn(row,col)`

- 标准差`df.std()`

- 绝对值`df.abs()`



```py
df = pd.DataFrame(np.random.randn(10000, 3))
cond = df.abs() > df.std() * 3  # 每个元素是否大于3倍标准差
cond2 = cond.any(axis=1)  # 只要有一个为true，就说明这行要舍弃
df_cond = df.loc[~cond2]  # 根据bool值索引取符合条件的行
print(df_cond.info())  # Int64Index: 9918 entries, 0 to 9999
```


现在只有9918行了

### 数据映射

#### 元素替换

`df.replace({旧值1:新值1,旧值2:新值2,...})`将df中的旧值替换成新值

```
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A2  B2  C2  D2  E2
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# df.replace({'B3': 'b3', 'A1': "a1"})
    A   B   C   D   E
1  a1  B1  C1  D1  E1
2  A2  B2  C2  D2  E2
3  A3  b3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


#### 数据映射

本节中使用数据：

```py
df = pd.DataFrame(data=np.random.randint(0,100,size=(4,5)), index=list('abcd'), columns=list('ABCDE'))
print(df)
```


```
    A   B   C   D   E
a  34  32  96  85  20
b  90  86  48  43  56
c  97  93  88  24   4
d   4  62  49  87  90
```


##### map

map函数一般用于series数据结构，不能用于df

`s.map(func)`其中func指对s中每个元素的处理函数，需要有返回值，可以是lambda匿名函数

例：

```py
df['A'] = df['A'].map(lambda x: x*10)  # 将A2列的每个元素*10并保存
def is_pass(n):
    if n >= 80:
        return '良好'
    elif n >= 60:
        return '及格'
    else:
        return '不及格'
df['B_is_pass'] = df['B'].map(is_pass)  # 新增一列B_is_pass，标明B列值是否>60
print(df)
```


```
     A   B   C   D   E B_is_pass
a  340  32  96  85  20    不及格
b  900  86  48  43  56    良好
c  970  93  88  24   4    良好
d   40  62  49  87  90    及格
```


##### apply

`s/df.apply(func)`

apply既可用于series也可用于df

当用于series时，与[map](#map)相同

当用于df时，传入func函数的参数是每一个行/列，使用参数`axis=0/1`进行控制

例：

```py
print(df.apply(lambda x: x.mean()))  # 求每一列数据平均值
```


```
A    56.00
B    61.00
C    30.00
D    73.50
E    55.25
dtype: float64
```


```py
print(df.apply(lambda x: x.mean(), axis=1))   # 求每一行数据平均值
```


```
a    68.0
b    49.4
c    57.4
d    45.8
dtype: float64
```


如果想同时计算平均值和中值，可以将它们装到一个元组中返回

```py
def func(x):
    mean = np.round(x.mean())
    mid = np.round(x.median())
    return (mean, mid)
print(df.apply(func))  # 求每一列数据平均值和中值
```


```
      A     B     C     D     E
0  60.0  33.0  57.0  57.0  33.0
1  56.0  26.0  50.0  54.0  32.0
```


##### applymap

只可用于df，传入func函数的参数是每一个元素

例：

```py
# 将每个元素都+100
df.applymap(lambda x: x + 100)
```


注：在较新版本中，df的applymap方法与map方法合并，可以使用map处理df

##### transform

transform既可用于series也可用于df

`s/df.transform(func)`或`s/df.transform([func1,func2,...])`可接收多个函数进行多项处理

当用于series时，传入每个func的是每个元素

当用于df时，传入每个func函数的参数是每一个行/列，使用参数`axis=0/1`进行控制（同[apply](#apply)）

例：

```py
print(df['A'].transform([np.sqrt, np.exp]))
```


```
       sqrt           exp
a  6.633250  1.285160e+19
b  7.416198  7.694785e+23
c  6.633250  1.285160e+19
d  5.567764  2.904885e+13
```


#### 修改索引

`df.rename({旧索引1:新索引1,旧索引2:新索引2,...},axis=0)`默认修改行索引，将axis设为1修改列索引，也可以

```py
df.rename(index={旧行索引1:新行索引1,旧行索引2:新行索引2,...},
          colums={旧列索引1:新列索引1,旧列索引2:新列索引2,...})
```


例：

```
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A2  B2  C2  D2  E2
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```py
df = df.rename({'1': '一', '2': '二'})
df = df.rename(columns={'A': 'a'})
```


```
    a   B   C   D   E
一  A1  B1  C1  D1  E1
二  A2  B2  C2  D2  E2
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


#### 重置索引

`df.reset_index()`将原行索引变为df中的一列，列名为'index'，新行索引为1-n

`df.set_index(keys=['列名'])`将指定列变为行索引，原行索引删除

例：

```
    A   B   C   D   E
1  A1  B1  C1  D1  E1
2  A2  B2  C2  D2  E2
3  A3  B3  C3  D3  E3
4  A4  B4  C4  D4  E4
5  A5  B5  C5  D5  E5
```


```
# df.reset_index()
  index   A   B   C   D   E
0     1  A1  B1  C1  D1  E1
1     2  A2  B2  C2  D2  E2
2     3  A3  B3  C3  D3  E3
3     4  A4  B4  C4  D4  E4
4     5  A5  B5  C5  D5  E5
```


```
# df.set_index(keys=['A'])
     B   C   D   E
A                 
A1  B1  C1  D1  E1
A2  B2  C2  D2  E2
A3  B3  C3  D3  E3
A4  B4  C4  D4  E4
A5  B5  C5  D5  E5
```


### 聚合函数和统计学函数

#### 抽样--take函数

先介绍两个函数：

- `df.take([索引1,索引2,...],axis=0)`根据指定索引取行/列（对行/列进行重排）

  ```
      A   B   C
  1  A1  B1  C1
  2  A2  B2  C2
  3  A3  B3  C3
  ```


  ```
  # df.take([1, 0, 2])
      A   B   C
  2  A2  B2  C2
  1  A1  B1  C1
  3  A3  B3  C3
  ```


  ```
  # df.take([1, 0, 2], axis=1)
      B   A   C
  1  B1  A1  C1
  2  B2  A2  C2
  3  B3  A3  C3
  ```


- `np.random.permutation(list)`对list列表随机排列

  ```py
  print(np.random.permutation([0, 1, 2]))
  # [0 2 1]
  # [0 1 2]
  # ...
  ```


##### 无放回

即依次随机取出，没有重复值

```py
df.take(np.random.permutation(range(df.shape[0])))
```


其中`df.shape[0]`是行数，`range(df.shape[0])`就是生成`0,1,2,...,行数-1`的数组，得到一个行重排的数组

每次抽样就是依次取第1,2,3,...行，这样每次取的行都不同

```
    A   B   C
1  A1  B1  C1
2  A2  B2  C2
3  A3  B3  C3
4  A4  B4  C4
5  A5  B5  C5
```


```
# df.take(np.random.permutation(range(df.shape[0])))
    A   B   C
2  A2  B2  C2
1  A1  B1  C1
4  A4  B4  C4
3  A3  B3  C3
5  A5  B5  C5
```


##### 有放回

可能出现重复值

```py
df.take(np.random.randint(0, df.shape[0], size=n))
```


表示取n次，同样的，每次抽样就是依次取第1,2,3,...行

```
# df.take(np.random.randint(0, df.shape[0], size=3))
    A   B   C
3  A3  B3  C3
2  A2  B2  C2
3  A3  B3  C3
```


#### 抽样--sample函数

- `df.sample(n=1)`随机取出n条数据（取数据的某n行）

- `df.sample(frac)`指定随机取出数据的比例，比如设定`frac=0.5`就是取出一半的数据



它们都是不放回抽样

#### 聚合函数

##### 用法--以sum为例

`df.sum(axis=0)`等，默认求每列中所有数据的和，通过设置`axis=1`求每行中所有数据的和

```
            第一组列    第二组列    
            列1  列2   列1  列2
第一组行 行1    0   1    2   3
        行2    4   5    6   7
第二组行 行1    8   9   10  11
        行2   12  13   14  15
```


```py
# 求所有数据的和
print(df.values.sum())  # 120
```


```py
print(df.sum())  # 求每一列多行数据的和
```


```
第一组列  列1    24
         列2    28
第二组列  列1    32
         列2    36
dtype: int64
```


```py
print(df.sum(axis=1))  # 求每一行多列数据的和
```


```
第一组行  行1     6
         行2    22
第二组行  行1    38
         行2    54
dtype: int64
```




---



特殊：根据指定层索引计算

`df.sum(axis=0,level=-1)`其中level控制根据哪层索引计算，如

```py
print(df.sum(axis=0, level=0))
```


就表示计算行数据的和，且计算时按最外层行索引分组，每组计算和

```
         第一组列   第二组列    
         列1  列2   列1  列2
第一组行    4   6    8  10
第二组行   20  22   24  26
```


```py
print(df.sum(axis=1, level=0))
```


```
            第一组列  第二组列
第一组行 行1     1     5
        行2     9    13
第二组行 行1    17    21
        行2    25    29
```


##### 其它常用统计学函数

- `count()`非空值数量，默认是每列的非空值数量

- `max()`最大值、`min()`最小值，默认是求每列中所有元素的最值

- `median()`中位数，默认是求每列中所有元素的中位数

- `mean()`平均值，默认是求每列中所有元素的平均值

- `var()`方差=(`每个元素`-`数据平均值`)^2^的和/`元素数量`，方差越小则数据分布越集中，

- `std()`标准差=对方差开平方根

- `value_counts()`每列中各元素出现次数

  - `df.value_counts()`将每列元素按出现次数排列

  - `s.value_counts()`统计各元素出现次数

  

  ```
    A  B  C
  a  4  4  0
  b  3  4  0
  c  2  4  0
  d  1  1  0
  e  2  0  1
  ```


  ```
  # df.value_counts()
  A  B  C
  4  4  0    1
  3  4  0    1
  2  4  0    1
    0  1    1
  1  1  0    1
  dtype: int64
  ```


  ```
  # df['A'].value_counts()
  2    2  # 即2这个元素出现了两次
  4    1
  3    1
  1    1
  Name: A, dtype: int64
  ```


- `cumsum()`对每列的元素累加，即每列新的第二个数=第一个数+原第二个数、第3个数=新的第二个数+原第3个数、...

  同理还有`cumprod()`累乘

- 协方差：两组数值中每对变量偏差的乘积的平均值

  ![协方差](/upload/md-image/python数据分析/协方差.png "协方差"){:width="350px" height="350px"}

  当协方差>0时，则两组变量正相关；<0时负相关；=0时不相关

  - `df.cov()`结果中第m行第n列的值表示第m和n列的协方差

  - `s1.cov(s2)`两组数据的协方差

- 相关系数=`X与Y的协方差`/(`X的标准差`*`Y的标准差`)，范围在(-1,1)间

  ![相关系数](/upload/md-image/python数据分析/相关系数.png "相关系数"){:width="250px" height="250px"}

  \>0正相关，<0负相关，=0不相关

  绝对值越大则相关程度越高

  - `df.corr()`结果中第m行第n列的值表示第m和n列的相关系数

  - `df.corrwith(s)`df中各列与s的相关系数

  - `s1.corr(s2)`两组数据的相关系数



  ```
    A  B  C
  a  4  1  3
  b  1  4  1
  c  1  0  4
  d  3  4  2
  e  4  1  0
  ```


  ```
  # df.cov()
        A     B     C
  A  2.30 -0.50 -0.75
  B -0.50  3.50 -1.25
  C -0.75 -1.25  2.50
  ```


  ```
  # df.corrwith(df['B'])
  A   -0.176227
  B    1.000000
  C   -0.422577
  dtype: float64
  ```


  ```py
  df['A'].corr(df['B'])  # -0.17622684421256027
  ```


#### 分组

一般数据处理的流程：

- 分组：同类数据为一组

- 函数处理：为不同组的数据使用不同的函数进行转换

- 合并：将不同组得到的结果合并



`df.groupby(by=列名)`按哪列进行分组

`df.groups`查看分组情况

```
    color  price
0   green      1
1  yellow      2
2    blue      4
3   green      1
4   green      5
5  yellow      3
```


```py
df = pd.DataFrame(
    {
        'color': ['green', 'yellow', 'blue', 'green', 'green', 'yellow'],
        'price': [1, 2, 4, 1, 5, 3]
    }
)
print(df.groupby(by='color'))  # <pandas.core.groupby.generic.DataFrameGroupBy object at 0x00000281BFDD5A58>
print(df.groupby(by='color').groups)  # {'blue': [2], 'green': [0, 3, 4], 'yellow': [1, 5]}
```


按颜色进行分组，'blue'组有值`[2]`，'green'组有值`[0, 3, 4]`， 'yellow'组有值`[1, 5]`



分组后聚合：

```py
print(df.groupby(by='color').sum())
```


```
        price
color        
blue        4
green       7
yellow      5
```




---



例：

```py
df = pd.DataFrame(
    data={
    "item":["萝卜","白菜","辣椒","冬瓜","萝卜","白菜","辣椒","冬瓜"],
    'color':["白","青","红","白","青","红","白","青"],
    'weight': [10,20,10,10,30,40,50,60],
    'price': [0.99, 1.99, 2.99, 3.99, 4, 5, 6,7]
    }
)
```


```
  item color  weight  price
0   萝卜     白      10   0.99
1   白菜     青      20   1.99
2   辣椒     红      10   2.99
3   冬瓜     白      10   3.99
4   萝卜     青      30   4.00
5   白菜     红      40   5.00
6   辣椒     白      50   6.00
7   冬瓜     青      60   7.00
```


- 进行聚合操作，求出颜色为白色的价格总和

- 进行聚合操作，分别求出萝卜的所有重量以及平均价格

- 使用merge合并总重量及平均价格



```py
# 1. 按颜色分组，求和，之后取白色、价格
print(df.groupby('color').sum().loc['白', 'price'])  # 10.98
# 2. 按物品分组，取出重量列求和，取出价格列求平均值，之后取萝卜
weight_sum = df.groupby('item')[['weight']].sum()
print(weight_sum.loc['萝卜'])  # weight    40
price_mean = df.groupby('item')[['price']].mean()
print(price_mean.loc['萝卜'])  # price    2.495
# 3. 合并2中的总重量和平均价格
# 先看看我们得到的df
print(weight_sum)
print(price_mean)
```


```
      weight
item        
冬瓜        70
白菜        60
萝卜        40
辣椒        60
```


```
      price
item       
冬瓜    5.495
白菜    3.495
萝卜    2.495
辣椒    4.495
```


```py
# 注意它们的item列与weight/price列不是同级的列名，而是行索引，不能直接merge
print(pd.merge(weight_sum, price_mean, left_index=True, right_index=True))  # 指定merge按照左右表格的行索引合并
```


```
      weight  price
item               
冬瓜        70  5.495
白菜        60  3.495
萝卜        40  2.495
辣椒        60  4.495
```

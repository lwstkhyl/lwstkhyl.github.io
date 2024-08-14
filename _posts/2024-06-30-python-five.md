---
layout: mypost
title: 数据分析02--Pandas基础
category: python
subcategory: python-database
---
Pandas基础，包括Series和DataFrame的基本使用

<!-- more -->

写在前面：本笔记来自b站课程[千锋教育python数据分析教程200集](https://www.bilibili.com/video/BV15V4y1f7Ju)

[资料下载](https://pan.baidu.com/s/1yrr-kvH2PAR7zNI3K81WSA)  提取码：wusa

```py
import pandas as pd
```


pandas中数据结构主要有series和dataframe

- series类似于一维数组，可以看成是一个有序的字典结构

- dataframe是一种有行/列的表格型数据结构，可以看成是由series组成的字典

### series

由values和index组成

- values：一组数据（ndarray类型）

- index：相关的数据索引标签

#### 创建

##### 列表/np数组

`pd.Series(list/nd)`

```py
l = [10, 20, 30, 40, 50]
s = pd.Series(l)
s = pd.Series(np.array(l))
print(s)
```


输出：

```
0    10
1    20
2    30
3    40
4    50
dtype: int32
```


其中第一列01234是索引，第二列是值

##### 字典

字典的键为索引名，值为值

```py
d = {'a': 1, 'b': 2, 'c': 3}
s = pd.Series(d)
print(s)
```


输出：

```
a    1
b    2
c    3
dtype: int64
```




---



注意：series中的值不仅可以是单个数，也可以是数组等多值

```py
d = {'a': [1, 10, 100], 'b': 2, 'c': 3}
s = pd.Series(d)
print(s.a[1])  # 10
```




---



`pd.Series`函数的其它参数

- index：创建时指定索引名

- name：为创建的series起一个名字

- dtype：指定数据类型



```py
s = pd.Series([1, 2, 3], index=list('abc'), name="number", dtype=float)
```


```
a    1.0
b    2.0
c    3.0
Name: number, dtype: float64
```


#### values和index

通过`series.values`和`series.index`获取

```py
s = pd.Series([10, 20, 30, 40, 50])
print(s.values)  # [10 20 30 40 50]
print(s.index)  # RangeIndex(start=0, stop=5, step=1)
print(list(s.index))  # [0, 1, 2, 3, 4]
```




---



索引可被修改：`series.index = 新值`，注意新值的长度要与原索引长度相等

```py
s.index = ['a', 'b', 'c', 'd', 'e']  # 等效于
s.index = list('abcde')  # list函数会将字符串拆开成单个字符作为元素存储
print(s)
```


```
a    10
b    20
c    30
d    40
e    50
dtype: int64
```


#### 取值

既可以用索引名来取值，也可以用索引序号(0,1,2,...)来取值

##### 显式索引

即索引名

- `series.索引名`或`series['索引名']`返回索引名对应的value

    注意：如果索引名是数字，就不能使用`series.索引名`获取，必须通过`series['索引名']`

    ```py
  print(s.a)  # 10
  print(s.A)  # 报错，区分大小写
  s.a = 1
  print(s['a'])  # 1
    ```


    也可同时取多个值`series[['索引名1','索引名2',...]]`，返回一个新的series。这种方法也可只取一个值，也返回series

    ```py
  s = pd.Series([1, 2, 3], index=list('abc'))
  print(s[['b', 'a']])
    ```


    ```
  b    2
  a    1
  dtype: int64
    ```


- `series.loc['索引名']`或`series.loc[['索引名1','索引名2',...]]`

    ```py
  print(s.loc['a'])  # 1
  print(s.loc[['a', 'b']])
    ```


    ```
  a    1
  b    2
  dtype: int64
    ```


    ```py
  print(s.loc[['a']])
    ```


    ```
  a    1
  dtype: int64
    ```


##### 隐式索引

即索引序号（下标）

- `series['整数下标']`或`series[['下标1','下标2',...]]`规则同上

    ```py
  s = pd.Series([1, 2, 3], index=list('abc'))
  print(s[0])  # 1
  print(s[[1, 2]])
    ```


    ```
  b    2
  c    3
  dtype: int64
    ```


    ```py
  print(s[[0]])
    ```


    ```
  a    1
  dtype: int64
    ```


- `series.iloc['整数下标']`或`series.iloc[['下标1','下标2',...]]`规则也同上

    ```py
  print(s.iloc[0])  # 1
  print(s.iloc[[1, 2]])
  print(s.iloc[[0]])
    ```


    输出同上



注意：loc和iloc不能交换使用，必须分别对应索引名和索引下标

##### bool值索引

`s[[bool值1,bool值2,...]]`取bool值为True的元素

```py
s = pd.Series(range(5))
print(s[[True, False, True, False, True]])  
```


```
0    0
2    2
4    4
dtype: int64
```


第1、3、5个bool值为True，就取s中第1、3、5个元素，返回一个新series

#### 切片

同取值，既可以用索引名来切片（**显式切片**），也可以用索引序号(0,1,2,...)来切片（**隐式切片**）

```
a    0
b    1
c    2
d    3
e    4
f    5
g    6
h    7
i    8
k    9
```


##### 隐式切片

与列表类似：

```py
print(s[1:4])  # 等效于
print(s.iloc[1:4])  # 左闭右开
```


```
b    1
c    2
d    3
dtype: int64
```


可以设置步长、取负数

```py
print(s[1:-1:2])
```


```
b    1
d    3
f    5
h    7
dtype: int64
```


##### 显式切片

`series[索引名start:索引名end]`或`series.loc[索引名start:索引名end]`，注意是左闭右闭区间，也可以设置步长

```py
print(s['b':'e'])  # 等效于
print(s.loc['b':'e'])  # 左闭右闭
```


```
b    1
c    2
d    3
e    4
dtype: int64
```


#### 基本属性和方法

- shape：形状

- size：长度

- index：索引

- values：值

- name：名字



```py
s = pd.Series(range(3), index=list('abc'))
print(s.shape)  # (3,) 一维，长度为3
print(s.size)  # 3
print(s.index)  # Index(['a', 'b', 'c'], dtype='object')
print(s.values)  # [0 1 2]
print(s.name)  # None
```




---



- 查看数据：

    - head(n=5)：查看前n条数据

    - tail(n=5)：查看后n条数据

    ```py
  s = pd.Series(range(7), index=list('abcdefg'))
  print(s.head(1))  # (3,) 一维，长度为3
    ```


    ```
  a    0
  dtype: int64
    ```


    ```py
  print(s.tail())  # 3
    ```


    ```
  c    2
  d    3
  e    4
  f    5
  g    6
  dtype: int64
    ```


- 检测缺失数据

  - `pd.isnull(s)`和`pd.notnull(s)`

  - `s.isnull()`和`s.notnull()`



    检测series中的元素是否为空，返回一个series。它们返回的结果相同，只是调用方式有差异

    ```py
  s = pd.Series([1, 2, 3, np.nan])
    ```


    ```
  0    1.0
  1    2.0
  2    3.0
  3    NaN
  dtype: float64
    ```


    ```py
  print(pd.isnull(s))  # 等效于
  print(s.isnull())
    ```


    ```
  0    False
  1    False
  2    False
  3     True
  dtype: bool
    ```


    notnull()就是上面结果的取反

    ```py
  print(s.notnull())  # 等效于
  print(pd.notnull(s))  # 等效于
  print(~s.isnull())  # 取反运算符，对所有values取反
    ```




    ---



    应用：过滤掉数据中的空值

    ```py
  s = pd.Series([1, 2, 3, np.nan, 4, np.nan, 5])
  print(s[~s.isnull()])  # 等效于
  print(s[s.notnull()])
    ```


    ```
  0    1.0
  1    2.0
  2    3.0
  4    4.0
  6    5.0
  dtype: float64
    ```


#### 运算

因为pd基于np实现，所以适用于np的数组运算大多数也适用于series（+-*/等等）

两个series之间的运算：根据索引来计算，如`s1+s2`就是将s1中索引为0的数与s2中索引为0的数相加，保存在结果series中索引为0的位置，而不是简单的将s1的第一个数与s2的第一个数相加

- 在运算中自动对齐索引，如果索引不对应，则补NAN

- 没有广播机制



```py
s1 = pd.Series([1, 2, 3], index=[0, 1, 2])
s2 = pd.Series([2, 1, 3, 4], index=[1, 0, 2, 3])
print(s1+s2)
```


```
0    2.0
1    4.0
2    6.0
3    NaN
dtype: float64
```


虽然s2的第一个数为2，但索引为0的还是1，所以结果中索引为0的值是1+1=2。s2中有索引为3的值，但s1中没有，因此结果中索引为0的值是nan



---



如果想设置自动补值，就使用`s1.add(s2,fill_value=nan)`代替`s1+s2`，其中fill_value是补充的值，如不指定fill_value，结果同`s1+s2`

```py
print(s1.add(s2, fill_value = 0))
```


```
0    2.0
1    4.0
2    6.0
3    4.0
dtype: float64
```


`res[3] = 4 + 0`其中0就是为s1补充的值（用0将s1补充到与s2同行，再相加）

### DataFrame

由按一定顺序排列的多列数据组成，将series从一维拓展到多维，既有行索引也有列索引

- 行索引：index

- 列索引：columns

- 值：values（是np的二维数组）

#### 创建

##### 字典

最常用的方法是传递一个字典，以字典键作为列名，值（一个数组）作为列值，pd会自动加上每行的索引

注意：传入的每个数组（列值）长度必须相等，若不相等则报错

```py
d = {
    'name': ['abc', 'bcd', 'cde'],
    'age': [11, 12, 13]
}
df = pd.DataFrame(d)
print(df)
```


```
  name  age
0  abc   11
1  bcd   12
2  cde   13
```


创建时指定行、列索引：`pd.DataFrame(d, index=行索引, columns=列索引)`

##### 二维数组

即使用np的二维数组

```py
df = pd.DataFrame(
    data=np.random.randint(1, 10, size=(2, 3)),  # 两行三列
)
print(df)
```


```
   0  1  2
0  2  2  4
1  9  4  8
```


```py
df = pd.DataFrame(
    data=np.random.randint(1, 10, size=(2, 3)),  # 两行三列
    index=['行1', '行2'],
    columns=['列1', '列2', '列3']
)
print(df)
```


```
    列1  列2  列3
行1   6   4   9
行2   7   8   3
```


- 列索引会优先使用字典的键，如不指定就是0,1,2,...

- 行索引如不指定也是0,1,2,...

#### 基本属性和方法

- `df.values`：二维np数组（数组中的每个元素是df中的一行数据

- `df.columns`：列索引

- `df.index`：行索引

- `df.shape`：形状

- `df.head(n=5)`：查看前n条数据

- `df.tail(n=5)`：查看后n条数据



```py
print(df.values)  # [['abc' 11],['bcd' 12],['cde' 13]]
print(df.columns)  # Index(['name', 'age'], dtype='object')
df.index = ['第一列', '第二列', '第三列']  # 和np一样，columns和index都可用同种方式修改
print(df.index)  # Index(['第一列', '第二列', '第三列'], dtype='object')
print(df.shape)  # (3, 2) 表示有三行两列
print(df)
```


```
    name  age
第一列  abc   11
第二列  bcd   12
第三列  cde   13
```


```py
print(df.head(2))
```


```
    name  age
第一列  abc   11
第二列  bcd   12
```


#### 索引

**列索引：**

- `df.列名`或`df['列名']`得到一个name为列名的series，其索引为行名

- `df[['列名1','列名2',...]]`取一列或多列，得到一个df



**行索引：**

- `df.loc['行名']`或`df.iloc[行索引(整数)]`得到一个series，其索引为列名，如`df.iloc[0]`就是取第一行。其中行索引也可为负数（表示倒数第几行）

- `df.loc[['行名1','行名2',...]]`或`df.iloc[[行索引1,行索引2,...]]`取一行或多行，得到一个df



**元素索引：** 即根据行和列取到某个数据（元素）

- 先取列再取行：`df['列名']['行名']`/`df.列名.行名`/`df.列名[行索引]`/...（这里有多种写法）即先获得列索引的series，再用series取元素的方法，下同

- 先取行再取列：`df.loc['行名'][列索引]`/`df.iloc[行索引].列名`等等

  一种特殊写法：只调用iloc或loc

  - `df.loc['行名','列名']`

  - `df.iloc[行索引,列索引]`

#### 切片

**行切片：**

- `df[start=0:end=行数:seq=1]`或`df.iloc[start=0:end=行数:seq=1]`取行索引[start,end)的行

- `df['起始行名':'结束行名':seq=1]`或`df.loc['起始行名':'结束行名':seq=1]`注意这种方法是左闭右闭区间



**列切片：**对列作切片，必须先对行切片

- `df.iloc[:,start=0:end=列数:seq=1]`其中逗号前的冒号表示先对行切片，因为这里只写了一个冒号，所以表示取所有行，下同

- `df.loc[:,'起始列名':'结束列名':seq=1]`

    ```py
  df = pd.DataFrame(
  data=np.random.randint(1, 10, size=(4, 5)),  # 两行三列
  index=['行1', '行2', '行3', '行4'],
  columns=['列1', '列2', '列3', '列4', '列5']
  )
  print(df.iloc[0:3, 1:4])
    ```


    ```
      列2  列3  列4
  行1   6   6   1
  行2   1   5   6
  行3   4   2   4
    ```




如果同时通过索引和名称取行列，就先切列再切行：

```py
# print(df.iloc[1:3, '列1':'列2'])  # 报错
print(df.loc[:, '列1':'列2'][1:3])
```


```
    列1  列2
行2   4   9
行3   5   2
```


注意：对于`df[...]`这种写法，取值时表示取列，切片时表示取行，如`df['a']`表示取a列，`df[1:3]`表示切行



---



总结：

- 要么取一行/一列：[行/列索引](#索引)

- 要么取连续的多行/多列：[切片](#切片-1)，里面的`:`表示切片、`,`表示维度分隔

- 要么取不连续的多行/多列：中括号的嵌套



**例1：**取行1、行4的列1、列2、列4

```py
print(df.loc[['行1', '行4'], ['列1', '列2', '列4']])
```


```
    列1  列2  列4
行1   9   9   8
行4   7   5   7
```


**例2：**取第二行的第2、3列

```py
print(df.iloc[1, 1:3])
```


```
列2    4
列3    8
Name: 行2, dtype: int32
```


可以看到这里得到的是一个series，如果想得到df，就需要将iloc中表示第二行的`1`写成`[1]`

```py
print(df.iloc[[1], 1:3])
```


```
    列2  列3
行2   5   4
```


#### 运算

与[series运算](#运算)类似：

- 自动对齐不同索引的数据

- 如果索引不对应则补nan

- 没有广播机制



与普通数值的+-*/同series，这里重点介绍两个df间/df与series的运算

##### df+df

相同(行名,列名)位置的数据相加，如果某个df中存在另一个df没有的行/列，那么结果中这行/列的值为NAN（不会报错，仍然会包含这行/列）

```py
df1 = pd.DataFrame(
data=np.random.randint(1, 10, size=(4, 5)),
index=['行1', '行2', '行3', '行4'],
columns=['列1', '列2', '列3', '列4', '列5']
)
df2 = pd.DataFrame(
    data=np.random.randint(1, 10, size=(3, 4)),
    index=['行1', '行2', '行3'],
    columns=['列1', '列2', '列3', '列4']
)
print(df1+df2)
```


```
    列1    列2    列3    列4  列5
行1   8.0  11.0  12.0  11.0 NaN
行2   6.0  12.0   4.0  17.0 NaN
行3  10.0   4.0   4.0  11.0 NaN
行4   NaN   NaN   NaN   NaN NaN
```


同series，可用`df1.add(df3, fill_value = 0)`的方式补值

##### df+series

若series的索引同df的列名时，相当于给df的每列元素都加上series中对应索引的元素，要求series的长度等于df的列数

```py
df = pd.DataFrame(
data=np.array(range(20)).reshape(4, 5),
index=['行1', '行2', '行3', '行4'],
columns=['列1', '列2', '列3', '列4', '列5']
)
s = pd.Series([1, 10, 100, 1000, 10000], index=df.columns)  # 索引同df的列名
print(df+s)
```


```
列1  列2   列3    列4     列5
行1   1  11  102  1003  10004
行2   6  16  107  1008  10009
行3  11  21  112  1013  10014
行4  16  26  117  1018  10019
```


当series的索引名不完全与df的列名相同时，只在series中出现的列与只在df中出现的列会用nan代替



---



也可以用add补充nan值，与之前不同的是，add函数还可以指定相加的维度：`df.add(s,fill_value=nan,axis='columns')`

- `axis`默认是`'columns'`/`1`表示按列相加（即`+`），也可以设置成`'index'`/`0`，表示按行相加

```py
df = pd.DataFrame(
data=np.array(range(20)).reshape(4, 5),
index=['行1', '行2', '行3', '行4'],
columns=['列1', '列2', '列3', '列4', '列5']
)
s = pd.Series([1, 10, 100, 1000], index=df.index)  # 索引同df的行名
print(df.add(s, axis=0))  # 或df.add(s, axis='index')
```


```
    列1    列2    列3    列4    列5
行1     1     2     3     4     5
行2    15    16    17    18    19
行3   110   111   112   113   114
行4  1015  1016  1017  1018  1019
```

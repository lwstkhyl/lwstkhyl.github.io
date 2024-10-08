---
layout: mypost
title: python基础01
category: python
subcategory: python-pythonbase
---
python基础第一部分，包括基本数据类型、if与循环、列表、字典、元组、集合、字符串等

<!-- more -->

写在前面：本笔记为[我的python TXT版笔记](https://github.com/lwstkhyl/python/tree/main/python)的重新整理

### print

`print('hello\nworld')` `\n`换行

`print('hello\tworld')` `\t`tab

`print('hello\rworld')`  把光标移到开头，吞掉hello只剩world

`print('hello\bworld')`  退一格 输出hellworld

`print('hello\\world')`  转义：`\\`->`\`   `\\\\`->`\\`   `\'`->`'`

r-string:原始字符串--字符串中转义字符无作用

`print(r'hello\'world')`输出`hello\'world`

注意：原始字符串最后不能是反斜线

`print(r'hello\'world\')`报错

`print(r'hello\'world\\')`可以，输出`hello\'world\\`

`print(chr(0b100111001011000))`  chr(输出字)+0b(表示二进制)+汉字二进制编码，可输出汉字

`print(ord('乘'))`  输出汉字的十进制编码，即上面的二进制转为10进制

`print(type(a))`  输出a的类型

### input和运算符

#### input函数

`a=input('111')`  下方先输出111，再自己输入数字字母汉字。

input的返回值a是str类型，因此若要将a转成数值型，需要`a=int(a)`或直接`a=int(input())`

#### 运算符

- `/`和`//`

    `/`相当于double除法  `print(1/2)`-> 0.5

    `//`对`/`的结果进行取整运算（可看作c中的int/int）  `print(11//2)`-> 5

    若`//`的结果为负，则向下取整  `print(9//-4)`-> -3

- `%`：取模运算，满足`a%b = a-b*(a//b)`

- `**`：2**3 = 2^3 即2的三次方

- `=`：赋值运算符：从右向左执行

    `a=b=c=20` 是合法的，a b c的值都为20

    有+= -= *= /= //= %=的自增类运算符

    `a,b,c=20,30,40` 解包赋值：右边依次给左边赋值  要求左边变量数与右边值数相同

    `a,b=b,a`   a,b交换值

- 比较运算符

    `< > <= >= == !=` 与c相同

    `a is b`输出true，说明a,b地址相同

    同理还有`is not`运算符，是`is`的取反

- bool运算符

    and相当于c中的&&

    or--`||`

    not--`!`

    in、not in判断是否有包含关系：

    ``` py
  s='abc'
  print('a' in s) #true
  print('d' in s) #false
  print('a' not in s) #false
    ```

- 位运算符

    `&`按位与：把两个数转为二进制数，比较二进制每位的01值，同为1时结果为1、其它情况结果为0，将最后得到的二进制编码转为十进制输出，如`4&8=0`

    `|`按位或：只要有一个数的位为1，结果就是1，如`4|8=12`

    `<<`左移位：把01编码往左移，高位溢出，低位补0；往左一位相当于*2，`4<<1`表示4向左1位变8

    `>>`右移位：高位补0，低位截断;向右一位相当于/2,`4>>2`表示4向右2位变1   

- 运算符优先级

    算数运算乘除加减--位运算符--比较运算符--bool运算--赋值运算=；有括号先括号里内容



### 数据类型与关键字

#### 注释方式与编码方式

`#单行注释`

`'''多行注释'''`

在整个程序前加上 `#coding：gbk` 把编码方式变成gbk  （可能要用中文冒号）

加上`#coding:utf-8`  编码方式变成utf-8  （可能要用英文冒号）

#### 关键字

输出python中的关键字:

``` py
import keyword
print(keyword.kwlist) 
```

标识符：字母 数字 下划线，不能以数字开头，不能是关键字，区分大小写

``` py
name='111'
print('标识：',id(name)) #标识（地址）：1359494586032
print('类型：',type(name)) #类型：<class 'str'>
print('值：',name) #值：111
```

变量可多次赋值。每次赋值指向新的空间

#### 数据类型

- 整数int：正数负数0，默认是十进制

    二进制+0b：`print(0b10101111) #175`  

    八进制+0o：`print(0o176) #126`

    16进制+0x：`print(0x1EAF) #7855`

- 浮点数float

    `a=1.1  b=2.2  print(a*b)`  输出2.4200000000000004  存在误差，使用以下方法解决：

    ``` py
  from decimal import Decimal
  print(Decimal('1.1')*Decimal('2.2')) #2.42
    ```

- 布尔bool

    True False 首字母要大写

    bool可以转为int算，True是1 False是0

- 字符串str

    可以使用一对单引号、双引号、3\*单引号、3\*双引号，其中3\*单引号、3\*双引号可以换行输出

    ``` py
  str1='111'
  str2="111"
  str3='''111
  111'''
  str4="""111
  111"""
    ```

#### 数据类型转换

- `str(数字串)`  如`print('111'+ 11)`报错，使用`print('111'+ str(11))`解决

- `int(整数数字串)`  如传入带有小数点的数字串则截取整数部分，也可以传入bool值（true->1 flase->0）

- `float(数字串)`  '1.1'->1.1 '1'->1.0 

    也可以转int类型：98->98.0

    转bool类型：true->1.0 flase->0.0

- `bool(a)`  零数值0和0.0、none、空字符串""、空列表`[],list()`、空元组`(),tuple()`、空字典`{},dict()`、空集合`set()`的bool值均为false，其他的均为true

### if与循环

#### if-elif-else

- 单双分支：

    ``` py
  if 条件判断语句:
      执行语句1
  else:
      执行语句2
    ```

    如

    ``` py
  if num%2==0:
      print(num,'是偶数')
  else:
      print(num,'是奇数')
    ```

- 多分支：

    ``` py
  if 条件判断1 :
      执行语句1
  elif 条件判断2 :
      执行语句2
  elif 条件判断n :
      执行语句n 
  [else:]可写可不写
    ```

    如

    ``` py
  a=int(input('成绩：'))
  if a<=100 and a>80:   #也可以写80<=a<=100  
      print('a')
  elif a<=80 and a>60:
      print('b')
  elif a>=0 and a<60:
      print('c')
  else:
      print('输入有误')
    ```

    if语句可以进行嵌套，嵌套时每层的语法与上述相同

#### 三元表达式

`x if 条件语句 else y`  如果条件为true，就为x，否则为y

取两个数ab的最大值：`max = a if a>b else b`

#### pass语句

只是占位符，用到需要写语句的地方，让语法不报错

``` py
if a==1:
  pass
else:
  pass
```

#### range函数

- `range(m)`[0,1,2,...,m-1]

    range(10)--[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

- `range(m,n)`[m,m+1,...,n-1]

    range(2,4)--[2, 3]

- `range(m,n,seq)`在上面的基础上加上步长seq（即每个数相隔seq）

    range(2,10,3)--[2, 5, 8]



不管range对象表示的整数序列有多长，所有range对象占用的内存空间都相同，因为只需存储start、stop和step三个参数，只有用到range对象时才计算

注意：range函数返回值不是列表，而是一个迭代器：

``` py
print(r) #range(0, 10)
print(list(r)) #[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

#### 循环

- while循环

    ``` py
  while 条件表达式:
      循环体
    ```

    如

    ``` py
  a=sum=0
  while a<11: #计算0-10之间的累加和
      sum+=a
      a+=1 
    ```

- for-in循环

    ``` py
  for 自定义变量 in 可迭代对象(字符串、range序列) ：
      循环体
    ```

    如

    ``` py
  for item in '12345':
      print(item) #1 2 3 4 5
  for item in range(10):
      print(item) #1,2,…,9
    ```

    **如果在循环体中不需要用到自定义变量，可将自定义变量写为`_`**，如

    ``` py
  for _ in range(5):
      print("111") #输出5次111
    ```

- 流程控制语句break

    用于跳出循环，用法同c，如

    ``` py
  for item in range(3):
      pwd=input('输入：')
      if pwd=='111':
          print('正确')
          break
      else:
          print('错误')
    ```

- 流程控制语句continue

    跳过这一次循环，直接进入下一次，用法同c，如

    ``` py
  for item in range(1,51):
      if item%5!=0:
          continue
      print(item)
    ```

- 循环中的else

    else语句不仅可以与if联用，还可以与while和for语句联用，当整个循环过程中没有碰到break时执行else语句，如

    ``` py
  for item in range(3):
      pwd=input('密码：')
      if pwd=='111':
          print('正确')
          break
      else:
          print('错误')
  else: #整个循环中if都没执行，也就是没碰到break，就去执行和循环并列的else
      print('三次均错误')
    ```

- 循环也可嵌套，每层格式相同，多重循环中的break和continue用于控制本层循环，不影响外层

### 列表

列表相当于c的数组，可以存储数据，用`[]`定义

``` py
list=['111','11','1111']
print(id(list)) #地址：1731304894528
print(type(list)) #类型：<class 'list'>
print(list) #值：['111', '11', '1111'] 
```

特点：

- 列表元素有序排序

- 列表可以存储重复数据（同一列表可以有多个相同的元素）

- 任意类型都可存储到同一列表（一个列表可以有不同类型元素）

- 根据需要动态分配和回收内存

#### 创建

1.使用中括号:`lst=['111',1,'22']`

2.调用内置函数:`lst=list(['111',1,'22'])`



`'111',1,'22'`三部分有各自的地址、值和类型，它们合称为列表对象，由另一个地址进行存储，类型为list,值分别为为`'111'`,`1`,`'22'`；lst存储的是这个列表对象的地址

#### 查询

根据索引取元素：

1.正向从0开始计算：0,1,2,...   `lst[0]`表示第一个元素，`lst[1]`表示第二个元素，以此类推

2.逆向从-1开始：...,-3,-2,-1   `lst[-1]`表示倒数第一个元素，`lst[-2]`表示倒数第二个元素，以此类推

当索引超出范围时，会报错`IndexError: list index out of range`

---

根据元素值得到它的索引：

列表的index方法：`list.index(元素值[,start,end])` 表示在索引为[start,end)的范围内查找，返回该元素第一次出现的索引。例：

``` py
lst=list(['11',2,'2','11'])
print(lst.index('2',1,3)) #2
#表示从索引为1的位置（即列表元素2）开始查找，一直找到3（不包括3，即列表元素'11'）
```

start与end可省略，表示在整个列表内查找：

``` py
print(lst.index('11')) #0 
```

注意：用此方法查找时，**如果列表中没有要找的元素会报错**`ValueError: xxx is not in list`

#### 切片

切片的结果--原列表片段的拷贝，地址发生改变，是一个新的列表对象

形式：`list[start:end:seq]` 表示获取[start,end)索引的元素，步长为seq

这三个参数都可省略，start默认为0（第一个元素）、end默认为最后一个元素的索引+1、seq默认为1（与range里的相同）

``` py
lst=list([0,1,2,3,4,5,6,7,8])
lst[1:3] #[1,2]
lst[1:6:2] #[1,3,5]
lst[:6:2] #[0,2,4]  不包括6  默认从第一个元素开始
lst[1::2] #[1,3,5,7]  默认到最后结束
```

当seq为负数时，切片表达式含义变为：从索引为start元素向索引为end的元素逆向输出（仍不包括end元素），start默认指向最后1个元素，end默认指向第一个元素

``` py
lst=list([0,1,2,3,4,5,6,7,8])
lst[::-1] #[8, 7, 6, 5, 4, 3, 2, 1] 将列表倒序输出
lst[6:4:-1] #[6, 5]
lst[:2:-1] #[8, 7, 6, 5, 4, 3]
lst[6::-2] #[6, 4, 2, 0]
```

#### 遍历

``` py
for item in lst:
  print(item) #item为列表中的每个元素
```

#### 增加元素

- 向列表末尾添加一个元素:列表的append方法，改变列表值，不改变列表地址

    ``` py
  lst=list([1,2,3,4,5,6,7,8])
  lst.append(100) #[1, 2, 3, 4, 5, 6, 7, 8, 100]
    ```

    注意：**append只能添加1个元素**

- 向列表末尾添加多个元素

    ``` py
  lst=list([1,2,3,4,5,6,7,8])
  lst2=list([9,10,11])
  lst.append(lst2) #[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11]]
  lst.extend(lst2) #[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    ```

    因为extend和append一样，都只接收1个参数，所以把要添加的多个元素封装入另一个列表中进行追加

    注意：**extend把列表元素依次添加入lst中，而append直接将列表放入lst**

- `list1 += list2`等效于`list1.extend(list2)`

- 任意位置上添加:`list.insert(index,value)`表示在索引为index的位置上添加value元素

    ``` py
  lst=list([1,2,3,4,5,6,7,8])
  lst.insert(1,90) #[1, 90, 2, 3, 4, 5, 6, 7, 8]  在索引为1的位置上添加元素
    ```

#### 删除元素

- 根据列表元素值移除:`remove(元素值)`

    ``` py
  lst=list([1,2,3,4,5,6,7,3,8])
  lst.remove(3) #[1, 2, 4, 5, 6, 7, 3, 8]  只删除第一个元素
    ```

    元素不存在程序报错`ValueError`

- 根据索引移除:`pop(索引)`

    ``` py
  lst=list([1,2,3,4,5,6,7,3,8])
  lst.pop(1) #[1, 3, 4, 5, 6, 7, 3, 8]
    ```

    索引不存在报错`IndexError`

- 切片删除:实质上是将列表切片选中的元素替换成空列表

    ``` py
  lst=list([1,2,3,4,5,6,7,8])
  lst[1:3]=[] #[1,4,5,6,7,8]  索引为[1,3)的元素被删除
    ```

- 清除/删除列表

   - `lst.clear()`将列表中的所有元素删除，列表仍保留，再`print(lst)`输出[]

   - `del lst`将列表对象直接删除，再`print(lst)`会报错    

#### 修改元素

- 替换修改:直接用索引操作元素

    ``` py
  lst=list([1,2,3,4,5,6,7,3,8])
  lst[2]=100 #[1, 2, 100, 4, 5, 6, 7, 3, 8]
    ```

- 切片赋新值

    ``` py
  lst=list([1,2,3,4,5,6,7,3,8])
  lst[1:3]=[100,200] #[1, 100, 200, 4, 5, 6, 7, 3, 8]  即索引为[1,3)的元素被替换
    ```

#### 排序
```
lst=list([5,2,1,4,3,9,0,5])
```

- `list.sort(reverse=False)` 改变列表值，不改变地址

    ``` py
  lst.sort() #[0, 1, 2, 3, 4, 5, 5, 9] 默认从小到大排
  lst.sort(reverse=False) #[0, 1, 2, 3, 4, 5, 5, 9]
  lst.sort(reverse=True) #[9, 5, 5, 4, 3, 2, 1, 0]
    ```

- `sorted(list,reverse=False)` **不改变lst**，返回新列表

    ``` py
  lst2=sorted(lst) #[0, 1, 2, 3, 4, 5, 5, 9]
  lst2=sorted(lst,reverse=False) #[0, 1, 2, 3, 4, 5, 5, 9]
  lst2=sorted(lst,reverse=True) #[9, 5, 5, 4, 3, 2, 1, 0]
    ```

#### 列表生成式

`{item_expression for item in iterable if condition}`

其中，`item_expression`是用于生成列表的表达式，`item`是在`iterable`（可迭代对象）中的每个元素，`condition`是一个可选的条件，用于过滤生成字典的元素

``` py
#生成1-10的平方，取其中为偶数的部分
lst=[i*i for i in range(1,10) if (i*i)%2==0] #[4, 16, 36, 64]
```

`for i in range(1,10)`决定i都有哪些值，`if (i*i)%2==0`对i的所有可能取值进行筛选，`i*i`根据得到i的值组装结果列表。相当于：

``` py
lst=[]
for i in range(1,10):
  if (i*i)%2==0:
    lst.append(i*i)
```

### 字典

字典是python内置的数据结构之一，与列表一样是一个可变序列，以键值对的方式存储数据，是一个无序的序列

特点：

- 键不能重复，但值可以重复。创建时若有重复的键，则会以最后1个重复键为结果：`a={'a':100,'a':200,'c':300}`->`{'a': 200, 'c': 300}`

- 字典中元素无序

- 字典中的键必须是不可变的变量类型，如list列表就不能作键

- 字典动态分配内存，且占用内存较大

#### 创建

- 使用`{}` 

    ``` py
  a={'a':100,'b':200}
  print(a,type(a)) #{'a': 100, 'b': 200} <class 'dict'>
  a={} #空字典
    ```

- 内置函数`dict()`

    ``` py
  a=dict(name='a',age=100)
    ```

#### 获取字典中元素

- `dict[键]`

    ``` py
  a={'a':100,'b':200,'c':300}
  print(a['a']) #100
    ```

    若不存在，报错`keyerror`

- `dict.get(键)`

    ``` py
  a={'a':100,'b':200,'c':300}
  print(a.get('a')) #100
    ```

    若不存在，不报错，输出`None`

---

一个特殊用法：

```py
print(a.get('d',99))
```


表示如果a中没有d这个键，就返回99。

注意：不是找不到就向a中添加`'d':99`，只是设定get函数的返回值为99

---

判断元素在不在字典中：使用`in`和`not in`（与列表相同），如

`print('d' in a)`或`print('d' not in a)`

#### 删除元素

- `del list[键]`

    ``` py
  a={'a':100,'b':200,'c':300}
  del a['a'] #删除'a'键值对{'b': 200, 'c': 300}
    ```

- `a.clear()`清空字典元素

    此时`print(a)`将输出`{}`

#### 新增/修改元素

都使用`list[键]=值`方式，若字典中已经有了这个键就是修改它的值，若没有就创建该键值对

``` py
a={'a':100,'b':200,'c':300}
a['d']=400 #{'a': 100, 'b': 200, 'c': 300, 'd': 400}
a['d']=401 #{'a': 100, 'b': 200, 'c': 300, 'd': 401}
```

#### 获取字典视图

- `list.keys()`获取字典的所有键

    ``` py
  a={'a':100,'b':200,'c':300}
  b=a.keys()
  print(b) #dict_keys(['a', 'b', 'c'])
  print(list(b)) #['a', 'b', 'c']
    ```

- `list.values()`获取字典的所有值

    ``` py
  a={'a':100,'b':200,'c':300}
  b=a.values()
  print(b) #dict_values([100, 200, 300])
  print(list(b)) #[100, 200, 300]
    ```

- `list.items()`以元组形式获取所有元素

    ``` py
  a={'a':100,'b':200,'c':300}
  b=a.items()
  print(b) #dict_items([('a', 100), ('b', 200), ('c', 300)])
  print(list(b)) #[('a', 100), ('b', 200), ('c', 300)] 由元组构成的列表
    ```

#### 字典元素的遍历

``` py
a={'a':100,'b':200,'c':300}
for item in a: 
  print(item,a[item]) #a 100  b 200  c 300
```

此种方式得到的item指的是a的键名

#### 字典生成式

`{key_expression: value_expression for item in iterable if condition}`

其中，`key_expression`是用于生成字典键的表达式，`value_expression`是用于生成字典值的表达式，`item`是在`iterable`（可迭代对象）中的每个元素，`condition`是一个可选的条件，用于过滤生成字典的元素

- 一个简单的例子：

    ``` py
  numbers = [1, 2, 3, 4, 5]
  squared_dict = {num: num**2 for num in numbers} #列表中的每个数字作为键，并将其平方作为值
  print(squared_dict) #{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
  even_odd_dict = {num: 'even' if num % 2 == 0 else 'odd' for num in numbers} #根据数字是否为偶数来生成字典的值
  print(even_odd_dict) #{1: 'odd', 2: 'even', 3: 'odd', 4: 'even', 5: 'odd'}
    ```

- 一个较复杂的例子：使用一个列表作为键，另一个列表作为值

    ``` py
  items=['a','b','c'] #键
  values=[100,200,300] #值
  a={item:value for item,value in zip(items,values)}
  #zip函数将对象中对应的元素打包成一个个元组，然后返回由这些元组组成的列表，使用list()处理可将其以列表形式展示
  print(a) #{'a': 100, 'b': 200, 'c': 300}
    ```

    若items和values元素个数不同，则以items和values中元素少的进行生成，确保一个键对一个值（items的第一个对values的第一个，依此类推）

### 元组

元组是内置数据结构之一，是不可变序列，和字符串一样，没有增删改操作

#### 创建

- 用小括号创建元组`a=('100','200','300')`；

    也可以省略括号，直接`a='100','200','300'`；

    如果元组中只有一个元素，用该方法必须在元素后加上逗号`a=('111',)`，

    如果不加，写成`a=('111')`那么a就是`'111'`

- tuple()函数

    ``` py
  a=tuple(('100','200','300'))
  print(a,type(a)) #('100', '200', '300') <class 'tuple'>
    ```

    注意：tuple函数内传入参数也要加一层括号，总共**有两层括号**

- 空元组：`a=()`或`a=tuple()`

#### 遍历

- 使用索引：如`a[0]`

- `for in `方法：

    ``` py
  a=(10,20,30,40)
  for item in a:
      print(item) #10 20 30 40
    ```

#### 元组的不可变性

元组没有增加/删除元素的方法，只能对元素进行修改

``` py
a=(10,[20,30],40)
a[0]=20 #报错，元组的常量型元素不可修改
a[1]=[20,30,40] #报错，元组的可变型元素的地址不可修改
a[1].append(40) #不报错，元组的可变型元素的值可以修改
print(a) #(10, [20, 30, 40], 40)
```

总的来说：

- 如果元组中对象本身不可变，则不能再引用其他对象（如不能改变常量10，40）

- 如果元组中对象本身可变，则可变对象的引用不能改变（如列表的地址），但数据可以改变（可以对元组中的列表进行增删改）



注意：对存放在元组中的列表，增加元素时不要使用`+=`或`l1=l1+l2`，因为`+=`本质上是重新定位列表指针的指向（修改内存地址），即使新的指向与原来的相同，对于元组这种不可变的容器也是不允许的

### 集合

集合是内置数据结构，与列表、字典相同，都属于可变类型的序列。简单来说，集合是没有value的字典。集合内元素必须是不可变类型（除了集合这种不可使用hash排序的类型）

#### 创建

- 使用花括号：`a={'100','200','300'}`

    和字典一样，**集合不能有重复的元素**，程序会自动除去重复的元素

    `a={'100','200','200'}`->`{'100', '200'}`

- `set(可迭代对象)`：可迭代对象包括range()、列表、元组、集合及字符串等

    ``` py
  a=set(range(6))  
  print(a,type(a)) #{0, 1, 2, 3, 4, 5} <class 'set'>
  a=set([1,2,3,4,5,6,6]) #{1, 2, 3, 4, 5, 6}
  a=set((1,2,4,4,5,65)) #{65, 1, 2, 4, 5}  集合和字典一样，元素是无序的
  a=set({12,4,34,55,66,44,4}) #{34, 66, 4, 55, 12, 44}
  a=set('python') #{'o', 'y', 'n', 't', 'p', 'h'}  要是有重复的字母，也会自动去除
    ```

- 空集合：`a=set()` 不能用`a={}`，这样创建的是空字典

#### 遍历

与列表元组字典相同：

``` py
for item in a:
  print(item)
```

但不能通过索引方式获取元素（无序性）

#### 增加元素

- `set.add(元素)` 一次只添加一个元素

    ``` py
  a={'100','200','300'}
  a.add(400) #{'100', '300', 400, '200'}
    ```

- `set.update(可迭代对象)`

    ``` py
  a={'100','200','300'}
  a.update({500,400,600}) #{400, '300', '100', '200', 500, 600}
  a.update([500,400,600]) #{'300', 400, '200', 500, 600, '100'}
  a.update((500,400,600)) #{'200', 400, 500, 600, '100', '300'}
    ```

#### 删除元素

4种方法:

``` py
a={'100','200','300'}
a.remove('100') #{'300', '200'}  如果不存在报错keyerror
a.discard('100') #{'300', '200'}  不存在也不报错
a.pop() #随机删除一个元素，不能指定参数（实际上是删除第一个，但集合无序，第一个元素不确定）
a.clear #清空集合元素  输出set()  
```

#### 修改元素

因为集合的无序性，所以集合不能通过索引获得元素，而是采用删除与增加相结合的方式，且不需要注意插入顺序与位置

如想修改`a={'100','200','300'}`中的'200'为'2000':

``` py
a.remove('200')
a.add('2000')
print(a) #{'2000', '300', '100'}
```

**注意集合的增删改方法都是直接对原集合修改**

#### 集合生成式

只需将[列表生成式](#列表生成式)中的`[]`改成`{}`即可，注意这样生成的集合也是无序的

#### 集合间关系

- 相等不相等 `==`和`!=`

    ``` py
  a={'100','200','300'}
  b={'100','200','300'} 
  print(a==b) #True
    ```

    ``` py
  a={'100','200','300'}
  b={'100','200','300','400'}
  print(a!=b) #True
    ```

- 子集：同数学定义

    `a.issubset(b)`表示"a是b的子集么？"

    ``` py
  a={'100','200','300'}
  b={'100','200','300','400'}
  print(a.issubset(b)) #True
  print(a.issubset(a)) #True
    ```

- 超集：若a是b的子集，则b是a的超集

    `a.issuperset(b)`表示"a是b的超集么？"

    ``` py
  a={'100','200','300'}
  b={'100','200','300','400'}
  print(a.issuperset(a)) #True
  print(b.issuperset(a)) #True
    ```

- 交集：同数学定义

    `a.isdisjoint(b)`表示"a和b没有交集么？"

    ``` py
  a={'100','200','300'}
  b={'100','200','300','400'}
  print(b.isdisjoint(a)) #False
    ```

#### 集合的数据操作

交集：`a.intersection(b)`或`a&b`

并集：`a.union(b)`或`a|b`

差集（a减去a交b的部分）：`a.difference(b)`或`a-b`

对称差集（a+b减去a交b的部分）：`a.symmetric_difference(b)`或`a^b`

``` py
a={'100','200','300','500'} 
b={'100','200','300','400'}
print(a.intersection(b)) #{'100', '300', '200'}
print(a | b) #{'400', '100', '200', '500', '300'}
print(a.difference(b)) #{'500'}
print(a^b) #{'400', '500'}
``` 

### 列表、元组、字典和集合的共有方法

#### 获取长度

`len(obj)`函数可以获取序列（如字符串、字典、元组、列表、range等）或集合的长度

#### 判断是否包含某元素

`元素 in 序列变量`以及`元素 not in 序列变量`

### 字符串

字符串是基本数据类型，是不可变的字符序列（同元组）。

可通过索引获取其中元素，但不可修改

#### 驻留机制

驻留机制：仅保存一份相同且不可变字符串，不同的值被存放在字符串的驻留池中，对相同的值只保留一份，之后再创建相同字符串时，不再使用新内存地址，直接把之前字符串的地址赋给新创建的变量。

条件：

- 字符串长度为0或1 或 字符串符合标识符规范（只含数字字母下划线）

- 只在编译时驻留：`a='abc'` `b='a'+'bc'`会驻留，但`c=''.join(['abc'])`，这种用函数的方式必须在运行时才赋值的字符串不会驻留

- -5至256的数字会驻留

``` py
a='py'
c='''py'''
print(a,id(a))
print(c,id(c))   输出后地址相同
```

强制驻留：

``` py
import sys
a='abc%' #含有%字符，本来不会驻留
b='abc%'
a=sys.intern(b)
print(a is b) #地址相同
```

注:上述方法必须在python下运行，pycharm已经进行了优化处理，有的情况会默认强制驻留

#### 查询

``` py
a='onpython'
print(a.index('on')) #0，'on'第一次出现的位置，不存在则报错ValueError
print(a.find('on')) #0，'on'第一次出现的位置，不存在则输出-1
print(a.rindex('on')) #6，'on'最后一次出现的位置，不存在则报错ValueError
print(a.rfind('on')) #6，'on'最后一次出现的位置，不存在则输出-1
```

`str.index(substr)`类：substr不存在时报错

`str.find(substr)`类：substr不存在时返回-1，因此建议使用这种方式

`rindex`和`rfind`表示从后往前找

#### 大小写转换

`b=a.upper()`把a中所有字母转为大写

`b=a.lower()`把a中所有字母转为小写

`b=a.swapcase()`把a中小写变大写，大写变小写

`b=a.title()`每个单词的首字母变大写，如`a='my way'`->`My Way`

转换后a的地址和值不变，会产生新的字符串对象

#### 对齐

`b=a.center(20,'*')`表示：设置一个20长度的字符串，将a放在中间，左右用*填充，默认是空格，若设置长度小于a的长度则返回原字符串（居中对齐）

同理还有`ljust` `rjust` `zfill`等函数，具体用法如下：

``` py
a='my'
b=a.center(20,'*') #---------my---------
b=a.ljust(10,'*') #my------**   同center，唯一区别是将a放在左面（左对齐）
b=a.rjust(10,'*') #------**my   同center，唯一区别是将a放在右面（右对齐）
b=a.zfill(10) #00000000my  同center，只用0进行填充且右对齐，不能自己设置填充字符
a='-111'  
b=a.zfill(10) #-000000111，'0'会加在减号内
```

#### 切分

`str.split(seq=' ',maxsplit)`按seq将str切分（seq默认为空格），返回一个列表，maxsplit设置最大切分次数（默认没有最大次数），分完后剩下部分不再分；同理还有`rsplit`是从字符串结尾往前切分

``` py
lst='hello world'.split() #['hello', 'world']
lst='he|llo world'.split(sep='|') #['he', 'llo world']
a='hello world py th on'
lst=a.split(maxsplit=1) #['hello', 'world py th on']
lst=a.rsplit(maxsplit=1) #['hello world py th', 'on']
```

#### 判断

`a.isidentifier()`判断a是否是合法的标识符字符串

`a.isspace()`判断a是否全部由空白字符组成（回车、换行、空格、tab）

`a.isalpha()`判断a是否全部由字母（或汉字）组成

`a.isdecimal()`判断a是否全部由十进制数字组成（必须阿拉伯数字）

`a.isnumeric()`判断a是否全部由数字组成（包括汉字简体繁体数字、罗马数字、阿拉伯数字）

`a.isalnum()`判断a是否全部由数字和字母组成，这里的数字定义同isnumeric

#### 替换和合并

`res=str.replace(old_val,new_val,num)`表示用new_val来替换str中的old_val，将替换后的新串返回，num控制替换次数（默认全部替换）

``` py
a='abc,bcd,abc,abc'
b='cde'
c=a.replace('abc',b) #'cde,bcd,cde,cde'
c=a.replace('abc',b,2) #'cde,bcd,cde,abc' 表示替换2次，从左往右
```

---

`res=seq.join(可迭代对象)`将列表或元组中的字符串合并成一个字符串，合并时间隔符为seq

``` py
lst=['12','34','56']
a='|'.join(lst) #12|34|56
a=''.join(lst) #123456
a='|'.join('python') #p|y|t|h|o|n  把每个字母看成单独字符串进行连接
```

---

`+`可以快速将多个字符串连接：`res=str1+str2+...`

要求`+`两侧必须都是字符串，python中`+`不提供其它类型转成字符串操作，如果不转成字符串再相加会报错

#### 比较

字符串的比较运算符同值的比较运算符(< <= > >= == !=)，注意is比较的是地址，而==才是判断值相不相等

规则：首先比较两个字符串中的第一个字符（按ASCII码），如果相等则继续比较下一个字符，依次比较直到某两个字符不相等，其比较结果就是字符串比较结果，后续字符将不再比较

``` py
a='abcde'
b='abced'
print(a>b) #False，因为'd'<'e'，所以a<b
```

`ord('a')`返回a的ASCII码

`chr(97)`返回ASCII码为97的字符

#### 切片

因为字符串不具备增删改操作，切片将产生新的对象

字符串切片规则类似于列表，都是取**左闭右开**区间

`res=str[start:end:len]`取索引为[start,end)范围的字符串，步长为len，start默认最开始，end默认结尾，len默认为1，它们都可以为负数

``` py
a='abcdefg'
b=a[:2] #ab
b=a[3:] #defg
b=a[:-2] #abcde 从头一直取到倒数第三个元素
b=a[1:5:2] #bd 从索引为1截到5（不包括5）步长为2
b=a[::2] #aceg 默认从头到结尾
```

负数步长的规则同列表[切片](#切片)

#### 格式化字符串

##### %占位符

格式：`'%s'%(变量)`

`%s`为string类型占位，`%d`或`%i`为int型占位，`%f`为浮点数占位，输出时会把占位符转为后面的变量进行输出，如

``` py
name='abc'
age=20
print('My name is %s,age is %d'%(name,age)) #My name is abc,age is 20
```

---

控制输出的宽度和小数点位数：`'宽度.小数点位数%f'%数'`，当数的小数点位数<传入的位数时，用0补齐（以下的也遵循该规则）

``` py
print('%10d'%99) #10表示宽度，把99放在最右面（前面加负号%-10d就是放在最左面），前面用8个空格占位，即'        99'
print('%.3f'%3.1415926) #3.142 表示保留3位小数
print('%10.3f'%3.1415926)  #同时要求宽度和保留小数，'     3.142'
```

##### format

`'{index}'.format(变量)`，其中`format`后的括号内可传入多个变量，前面大括号内的`index`表示此处想替换的变量在括号内的位置

``` py
name='abc'
age=20
print('My name is {0},age is {1}'.format(name,age)) #My name is abc,age is 20
```

上面的`{0}`就表示使用format括号中索引为0的变量name，`{1}`就是第二个变量age，注意`{index}`不一定要顺序出现，而且可以重复使用，`'{1}{0}{1}...'`这种也是可以的

---

控制输出的宽度和小数点位数：`'{index:宽度.小数点位数f}.format(数)'`

``` py
print('{0:.3}'.format(3.1415926)) #3.14 表示一共3位数
print('{0:.3f}'.format(3.1415926)) #3.142 表示3位小数
print('{0:10.3f}'.format(3.1415926)) #等价于('%10.3f'%3.1415926)
```

{}里面的0表示要输出字符串的索引，若format内只有1个数可省略

##### f-string与r-string

**f-string**:用于将变量传入字符串中（更推荐使用），在字符串首个`'`前加上字母`f`，想传入的变量在字符串中用`{}`括起来即可

``` py
name='abc'
age=20
print(f'My name is {name},age is {age}') #My name is abc,age is 20
```

这样就可方便的将`{name}`替换成变量name的值，无需在字符串后面再写一次name，更加直观。

---

在f-string的大括号内结尾加上`!r`可以使输出字符串替换部分加上单引号（如果该部分本身就是字符串类型），`!s`是不加单引号（默认情况），如

``` py
val="test"
str1 = f'str1 is {val}'
str2 = f'str2 is {val!s}'
str3 = f'str3 is {val!r}' 
print(str1) #str1 is test
print(str2) #str2 is test
print(str3) #str3 is 'test'
```

**如果val不是字符串类型，就都不会加上引号**

---

**r-string**:禁止字符串中转义字符，在字符串首个`'`前加上字母`r`，常用于文件路径的表示中

``` py
print ('\t \\ \n \\t') #未使用r标识，则特殊字符\t,\n无法打印，必须经过转义符\进行才行
print (r'\t \\ \n \\t') #使用r标识，则不进行转义，打印字符串'\t \\ \n \\t'
```

除此之外也可以使用`repr(str)`禁止转义

``` py
s = '\n是一个转义字符'
print(repr(s)) #'\n是一个转义字符'
```

#### 字符串的编码转换

将字符串编码：`str.encode(encoding=编码格式)`

``` py
s='字符串'
byte_gbk=s.encode(encoding='GBK') #b'\xd7\xd6\xb7\xfb\xb4\xae' GBK格式中一个汉字两个字节 
byte_utf8=s.encode(encoding='UTF-8') #b'\xe5\xad\x97\xe7\xac\xa6\xe4\xb8\xb2' UTF-8格式中一个汉字三个字节
```

---

解码：`byte.decode(encoding=编码格式)`

``` py
#接上述字符串码
s_gbk=byte_gbk.decode(encoding='GBK')
s_utf8=byte_utf8.decode(encoding='UTF-8')
print(s_gbk,s_utf8) #结果都与s相同，为'字符串'
```

注意：解码和编码格式必须相同

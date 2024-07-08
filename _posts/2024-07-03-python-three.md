---
layout: mypost
title: python基础
category: python
---
python基础--一些进阶内容

<!-- more -->

### 正则表达式

#### 基础概念

python中正则表达式的匹配规则字符串：`r'xxx'`使用r-string禁止转义，这样就可以直接使用正则语法了，如`r'\d'` `r'[a-zA-Z]'`等。

python中正则表达式匹配可以定义匹配规则`flags`：

| flags取值 | 描述                                                 |
| --------- | ---------------------------------------------------- |
| `re.I`    | 使匹配对大小写不敏感                                 |
| `re.L`    | 做本地化识别（locale-aware）匹配                     |
| `re.M`    | 多行匹配，影响^和$                                   |
| `re.S`    | 使`.`匹配包括换行在内的所有字符                      |
| `re.U`    | 根据Unicode字符集解析字符（影响`\w`,`\W`,`\b`,`\B`） |
| `re.X`    | 给予正则表达式更灵活的格式以便更易于理解。           |


多个标志可以通过按位或它们来指定，如`re.I|re.M`被设置成I和M标志

#### 匹配方法

python中正则表达式匹配使用`re`模块，基于其中的三个基础方法来做匹配：

1. `re.match(匹配规则,被匹配字符串,flags=0)`：从被匹配字符串**开头**进行匹配，匹配成功返回匹配对象1（包含匹配的信息，不成功则返回`None`）

    其中`res.span()`得到一个元组(a,b)，表示索引为[a,b)的字符串与给定规则匹配；

    `res.group()`得到与规则匹配的字符串

    ```
    import re #先引入re模块
    s="abc abcd abcde" #待匹配字符串
    result=re.match(r"abc",s)
    print(result) #<_sre.SRE_Match object; span=(0, 3), match='abc'>
    print(result.span()) #(0, 3)
    print(result.group()) #abc
    result=re.match(r"abcd",s)
    print(result) #None
    ```

    可以看到，re.match(r"abcd",s)没有找到，因为`"abcd"`没有在字符串开头，而match方法必须从开头比较

2. `re.search(匹配规则,被匹配字符串,flags=0)`：搜索**整个**字符串，从前向后，直到找到了一个，之后停止，整个字符串都找不到就返回`None`

    ```
    s="abc abcd abcde abcd"
    result=re.search(r"abcd",s)
    print(result.span()) #(4, 8)
    print(result.group()) #abcd
    ```

    可以看到，search方法搜索整个字符串，即使`"abcd"`没有在字符串开头也可以找到

3. `re.findall(匹配规则,被匹配字符串,flags=0)`：搜索整个字符串，找出所有的匹配项，返回一个列表，若有n个匹配，列表中就有n个给定字符串

    ```
    s="abc abcd abcde abcd"
    result=re.findall("abc",s)
    print(result) #['abc', 'abc', 'abc', 'abc']
    ```

#### 案例

匹配邮箱地址：`rule=r'^[\w-]+(.[\w-]+)*@(qq|163|gmail)(.[\w-]+)+$'`或`r'^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$'`（不包括汉字的邮箱）

> s='1111111.11@qq.com'

```
print(re.findall(rule,s)) #[('.11', 'qq', '.com')]
```

可以看到结果不是`1111111.11@qq.com`，这是因为findall函数输出的结果是 `s`匹配正则表达式中**组**（小括号中的内容）的部分。

解决办法：

1. 在匹配规则两侧加上`()`，这样整体是一个组，结果中将包含整体组

    ```
    rule=r'(^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$)'
    print(re.findall(rule,s)) #[('1111111.11@qq.com', '')]
    ```

2. 用match方法：

    ```
    rule=r'^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$'
    print(re.match(rule,s).group()) #1111111.11@qq.com
    ```



如果向从一段字符中提取邮箱号，就需去掉两侧的`^$`：

```
s='邮箱：111.111@qq.cm邮箱：222.222@qq.cm邮箱：333.333qq.cm'
rule=r'([a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6})'
print(re.findall(rule,s)) #[('111.111@qq.cm', ''), ('222.222@qq.cm', '')]
```

### 闭包

为什么用闭包？

如计算某函数的调用次数：

```
count=0
def fun():
    global count  #global关键字代表函数中使用了外部定义的a
    count+=1
fun()
fun()
print(count) #2
```

**用全局变量记录某些值，有被篡改的风险**

---

闭包的本质是函数嵌套：内部函数使用了外部函数的变量，并且外部函数返回了内部函数，这个使用外部函数变量的内部函数称为闭包，这样可以让一个函数即依赖外部变量又确保外部变量不能在程序中被改变

```
def outer(logo):#logo是外部变量
    def inner(msg):#msg是内部变量
        print(f"{logo}{msg}")
    return inner
fn1=outer("a") #得到一个logo固定为a的inner函数，对于fn1，logo值不能被改变，改变的只有msg的值
```

fn1可以看成：

```
def fn1(msg):
    print(f"a:{msg}")
```

```
fn1=outer("a")
fn1("1") #a1
fn1("2") #a2
fn2=outer("b") #想改变外部变量只能再赋值一个函数
fn2("1") #b1
fn2("2") #b2
```

#### 修改外部变量的值

使用`nonlocal`关键字

```
def outer(num1):
    def inner(num2):
        #num1+=1会报错，应为
        nonlocal num1 #添加该语句后，inner函数作用域内所有num1都指外部函数的num1
        num1+=num2
        return num1
    return inner
fn=outer(10)
print(fn(20)) #30
print(fn(30)) #60
```

为什么最后一次输出为60：因为num1的值在第一次调用fn函数时已经变为30，第二次调用fn函数使用的仍是原来的num1，因此闭包可以在没有全局变量的情况下实现变量的累加

---

例：写一个atm函数，该函数接收两个参数，第一个参数为存款数额，第二个bool参数决定是取钱(false)还是存钱(true)，函数中要求print账户余额

```
def account_creat(initial_amount=0):#账户余额默认初始值为0
    def atm(num,deposit=True):
        nonlocal initial_amount
        if deposit==True:
            initial_amount+=num
            print(f"存款：{num},账户余额：{initial_amount}")
        else:
            initial_amount-=num
            print(f"取款：{num},账户余额：{initial_amount}")
    return atm
atm=account_creat()
atm(100) #存款：100,账户余额：100
atm(50,deposit=False)  #取款：50,账户余额：50
atm(20)  #存款：20,账户余额：70
```

总结：

1. 先把原来的全局变量放到外函数的传参内（可以赋初始值），或者是放入外层函数中 内层函数前；

2. 要改变的变量放到内函数的传参内，或者在内函数内用`nonlocal`声明该变量；

3. 最后在外函数中返回内函数名（注意不要加括号调用内函数）；

4. 使用时创建一个变量调用外函数，得到一个内函数变量，之后都是对这个变量进行操作。

### 装饰器

装饰器：在不破坏目标函数原有的代码和功能的前提下，为目标函数增加新功能。

如下面的函数：

```
import time
def sleep():
    print("sleeping...")
    time.sleep(1)
```

现在想把该函数改成：

```
def sleep():
    print("start sleep")
    print("sleeping...")
    time.sleep(1)
    print("awake")
```

1. 可以用闭包的方式：

    ```
    def sleep():
        print("sleeping...")
        time.sleep(1)
    def outer(func):
        def inner():
            print("start sleep")
            func() #调用传入的函数
            print("awake")
        return inner
    new_sleep=outer(sleep)
    new_sleep()
    ```

2. 装饰器

    ```
    def outer(func):
        def inner():
            print("start sleep")
            func()
            print("awake")
        return inner

    @outer  #相当于执行了sleep=outer(sleep)
    def sleep():
        print("sleeping...")
        time.sleep(1)
    sleep()  #输出的是改完后的sleep
    ```

#### 装饰器传参

当`def sleep():`需要传入参数时，如`def sleep(name):`，修改`def inner():`为`def inner(*args, **kwargs):`

```
def outer(func):
    def inner(*args, **kwargs):
        print("start sleep")
        func(*args, **kwargs) #函数名传给了外层，参数传给了内层，因此需要在调用外层函数时将参数添加
        print("awake")
    return inner
@outer 
def sleep(name):
    print(f"{name} is sleeping...")
    time.sleep(1)
sleep("abc")  
#start sleep
#abc is sleeping...
#awake
```

#### 接收参数的装饰器

在outer函数外再包一层用于接收参数的函数，接收回来的参数就可以直接在内部的函数里面调用了。

例：计算给定函数的执行时间

```
def count_time_args(msg=None):
    def count_time(func):
        def wrapper(*args, **kwargs):
            t1 = time.time()
            func(*args, **kwargs)
            print(f"{msg}执行时间为：", time.time() - t1)
        return wrapper
    return count_time
@count_time_args(msg="fun1")
def fun_one():
    time.sleep(1)
fun_one() #fun1执行时间为： 1
```

[更多关于装饰器](https://blog.csdn.net/zhh763984017/article/details/120072425)


---
layout: mypost
title: python基础
category: python
---
python基础--函数和类

<!-- more -->

### 函数

#### 定义

格式：

``` py
def 函数名(形参):
    函数体
    return 值(可省略)
```

---

传参时可以**位置传参/关键字传参**：

``` py
def calc(a,b):
    c=a+b
    return c
```

- 位置传参：`result=calc(10,20)` 此时10传给形参a，20传给形参b

- 关键字传参：`result=calc(b=10,a=20)` 此时10传给形参b，20传给形参a

注意：python中不能少传入形参。python不能将缺少的形参给一个空值

---

传参时的值传递/引用传递：

如果是**不可变对象**（字符串，元组、各基本数据类型如int bool等），在函数体内修改（增/删/改/替换操作）不影响实参，即**值传递**；

如果是**可变对象**（列表，字典，集合），在函数体内修改会改变实参，即**引用传递**。

``` py
def fun(arg1,arg2):
    arg1=100
    arg2.append(10)
n1=11   
n2=[22,33,44]
fun(n1,n2)
print(n1) #11
print(n2) #[22, 33, 44, 10]
```

---

函数定义默认值参数：给形参设置默认值，当实参形参不同数量时才用形参默认值。

注意：和C相同，带默认值的形参需放到函数形参列表的结尾，如`fun(a,b=10)`，`fun(a=10,b)`是不对的

``` py
def fun(a,b=10):
    print(a,b)
fun(100) #100 10 --只有100一个实参，才用形参默认值
fun(20,30) #20 30 --与形参数量相同，不用默认值
```

---

函数的返回值：

- 函数可以没有返回值

- 函数返回值为1个，正常返回

- 函数返回多个值时，结果为元组

``` py
def fun(num):
    odd=[]
    even=[]
    for i in num:
        if i%2==1:
            odd.append(i)
        else :
            even.append(i)
    return odd,even #返回值为一个元组，元素是odd和even两个列表
lst=[10,29,34,24,44,53,55]
print(fun(lst)) #([29, 53, 55], [10, 34, 24, 44])
```

#### 函数的参数传入

- 个数可变的位置形参：定义函数时，可能无法事先确定传递的位置实参的个数时，使用可变的位置参数，在参数前加上`*`，结果为元组，最多只能定义一个

    ``` py
  def fun(*args):
      print(args) #args是一个元组
      print(args[0]) #可以根据索引取到元组中元素，即传入的实参
  fun(10) #(10,)  10
  fun(1,2,3) #(1, 2, 3)  1
    ```

- 个数可变的关键字形参：在参数前加上`**`，结果为一个字典，也是最多只能定义一个

    ``` py
  def fun1(**args):
      print(args) #args是一个字典，键为传入的实参变量名，值为实参值
  fun1(a=10) #{'a': 10}
  fun1(a=20,b=30,c=40) #{'a': 20, 'b': 30, 'c': 40}
    ```

    注意：想要把实参传给个数可变的关键字形参，就必须有实参变量名，不能`fun1(10)`，只能`fun1(a=10)`

---

在一个函数的定义过程中，若既有个数可变的关键字形参也有个数可变的位置形参，要求**在定义时先位置形参再关键字形参**。同时**调用函数也必须先传位置实参再传关键字实参**。

``` py
def fun2(*arg1,**arg2):
    print(arg1)
    print(arg2)
#fun2(a=10,10)  报错
fun2(10,20,a=10,b=20) #(10, 20)  {'a': 10, 'b': 20}
```

---

调用函数时：可以使用**列表传入位置实参**，可以使用**字典传入关键字实参**。

``` py
def fun(a,b,c):
    print(a,b,c)

fun(10,20,30) #10 20 30（位置传参）
lst=[10,20,30]
fun(*lst) #10 20 30（位置传参）

fun(a=100,c=200,b=300) #100 300 200（关键字传参）
dic={'a':100,'c':300,'b':200}
fun(**dic) #100 200 300  将字典中的键值对都转换为关键字实参传入
```

---

函数形参列表中使用`*`作为分隔符：`*`之前的参数采用哪种方式传入都行，之后的只能采用关键字实参传递

``` py
def fun1(a,b,*,c,d):
    print(a,b,c,d)
fun1(a=10,b=20,c=30,d=40) #10 20 30 40
fun1(20,10,d=30,c=40) #20 10 40 30
#fun1(10,20,30,40)报错，因为30和40必须以关键字形式传入
```

#### 变量的作用域

``` py
def fun(a,b):
    c=a+b         
    print(c)
```

上面的c就称为局部变量，因为c是在函数体内进行定义的变量；a,b为函数形参，作用范围也在函数内部，也可看作局部变量。它们都只能在函数内部使用，在函数外使用会报错。

---

**函数内无法访问或改变外部声明的全局变量**，除非以实参的形式传入函数：

``` py
a=1
def func():
    #print(a)报错，函数内无法访问外部变量
    a=2 #是函数内创建的局部变量，函数内使用的都是它
    print(a) #2 函数内使用局部变量
func()
print(a) #1 函数内无法修改全局变量
```

---

若真的想在函数内部使用全局变量，可使用`global`关键字：

``` py
a=1
def func():
    global a #在a前加上global，表明函数内使用全局变量a
    print(a) #1
    a=2 #修改全局变量
func()
print(a) #2
```

注意：global变量不能与形参变量同名，否则报错；`global a=20`也会报错，必须分开写

#### 递归函数

递归函数：在一个函数的函数体内调用该函数本身。

必须有递归终止条件，如使用`if else`等进行return；如果有返回值的话，注意返回值要从最内层逐层传递到最外层

例1：求阶乘

``` py
def fac(n):
    if n==1: #一直乘到n为1的时候
        return 1
    else: #n不为1，就乘下一个数 
        return n*fac(n-1)  
print(fac(6)) #720
```

---

例2：斐波那契数列(1 1 2 3 5 8 13 21...)

``` py
def fac(n): #n为数列的第几位
    if n==1:
        return 1
    elif n==2:
        return 1
    else:
        return fac(n-1)+fac(n-2)
for i in range(1,7): #输出数列中前6个数
    print(fac(i))  #1 1 2 3 5 8
```

---

例3：现有一个文件夹test，里面有一个txt文件和2个文件夹a、b，a中有1个txt文件，b中有1个txt文件和文件夹c，c中又有1个txt文件；现要写一个函数找到test下所有的txt文件，就可以用递归实现，返回一个list包含所有.txt文件的路径

``` py
test--a-------2.txt
      b-------3.txt
              c--------4.txt
      1.txt
```

利用os模块下的三个方法：

- `listdir(p)`列出给定文件夹p下的所有文件，返回一个列表，元素为文件名

- `path.isdir(p)`判断给定路径p是否为一个文件夹，返回bool值

- `path.exists(p)`判断给定路径p是否存在

``` py
import os
def get_files_recursion_from_dir(path):
    file_list=[] #定义一个列表用于存储文件路径
    if os.path.exists(path)==True: #如果路径存在
        for f in os.listdir(path): #遍历该路径下的所有文件
            new_path=path+"/"+f #f是文件名，需要组装成完整路径进行下一步的查找
            if os.path.isdir(new_path)==True: #新文件是文件夹
                file_list+=get_files_recursion_from_dir(new_path) #就再调用函数采集内部的.txt文件,并把其结果加到file_list内
            else: #新文件不是文件夹，而是.txt文件
                file_list.append(new_path) 就将其路径放入结果列表中
    else: #如果路径不存在，返回空值
        print(f"指定目录：{path}不存在")
        return []
    return file_list
print(get_files_recursion_from_dir("D:/python/test"))
```

#### 函数作为参数传入/闭包

``` py
def use_computer(computer_method): #将computer这个方法作为computer_method传入
    result=computer_method(1,2) 
    print(result)
def computer(x,y): 
    return x+y
use_computer(computer) #3
```

其中`use_computer`函数需要一个函数`computer_method`作为参数传入，这个函数需要能接收2个数字进行计算，计算逻辑由这个被传入函数决定。

#### lambda表达式（匿名函数）

形式：`lambda 形参列表:函数返回值`，lambda表达式返回一个函数，这个函数没有名字且只能在定义处使用一次，称为匿名函数

``` py
def use_func(func):
    res=func(1,2)
    print(res)
def add(x,y):
    return x+y
use_func(add) #3
```

这是上面函数作为参数传入的例子，我们可以用lambda表达式来重写add函数：`add=lambda x,y:x+y`，之后的使用方式不变`use_func(add)`

更直接的写法：

``` py
def use_func(func):
    res=func(1,2)
    print(res)
use_func(lambda x,y:x+y) #3
```

### 类

#### 基础结构

``` py
class student: #student为类名，由一个或多个单词组成，类名的首字母常大写
    place='abc' #直接写在类里面的变量称为类属性
    def eat(self): #实例方法（是在类内定义的函数）（类外的def才叫函数）
        print('eat')
    @staticmethod
    def method(): #静态方法（用@staticmethod修饰）
        print('staticmethod') 
    @classmethod
    def cmethod(cls): #类方法（用@classmethod修饰）
        print('classmethod')

    def __init__(self,name,age): #构造方法
        self.name=name 
        self.age=age
print(type(student)) #<class 'type'>
print(student) #<class '__main__.student'>
```

#### __init__构造方法

在创建类对象的时候，会自动执行，将调用时传入的参数传递给该方法使用。

``` py
def __init__(self,name_val,age_val):
    self.name=name_val 
    self.age=age_val
```

参数列表中的`self`为必需形参，指向调用该构造方法的实例对象。

`self.name`和`self.age`和称为实例属性，在构造函数中进行赋值操作。它们的属性名为`name`和`age`，属性值为传入的`name_val`和`age_val`

---

创建类的实例对象：

``` py
stu1=student('abc',20)
stu2=student('ABC',18)
```

student/stu1/stu2的地址都不同，因为student是类对象（上面的定义`class student:`），而stu1和stu2为两个不同的实例对象。

注：创建出的实例对象具有同一个数据类型`student`，且可放入容器中进行存储

#### 类属性和实例属性

``` py
stu1=student('abc',20)
stu2=student('ABC',18)
print(student.place) #abc
print(stu1.place) #abc
```

**类对象和实例对象都可以使用类属性**

``` py
#print(student.name)报错，类对象不能使用实例属性
print(stu1.name) #'abc'
print(stu2.name) #'ABC'
```

**只有实例对象才能使用实例属性**，因为实例对象有构造方法

``` py
student.place='ab'
print(student.place) #ab
print(stu1.place) #ab
stu1.place='AB'
print(student.place) #ab
print(stu1.place) #AB
```

**类属性和实例属性都是可修改的**：`类对象.类属性=新值`可以修改类对象和实例对象中的类属性值；但`实例对象1.类属性=新值`只能修改实例对象1自己的类属性值。

#### 实例方法

实例对象self必须出现在传参列表中，通过它来传递实例的属性和方法（也可以传递类的属性和方法），但在实际调用时可以忽略

``` py
class student:
    name=None
    def say(self):
        print(f"hi,I'm {self.name}") #在成员方法内使用类中的变量时必须加上self.
    def say_msg(self,msg):
        print(f"hi,I'm {self.name},{msg}")
stu=student() #构建一个对象
stu.name="abc"
stu.say() #'hi,I'm abc'
stu.say_msg("111") #'hi,I'm abc,111'
```

注意：**实例方法只能由实例对象调用**

#### 动态绑定属性和方法

``` py
stu1=student(name='abc',age=20)     
stu2=student(name='abcd',age=21)
stu1.gender='female'
print(stu1.gender) #female
#print(stu2.gender)报错，stu2中没有gender属性
```

动态绑定方法时不用在类定义里新添加一个构造函数，直接加变量名就行。这里新增方法时类似于新增字典元素，属性名就是键，类有这个属性时赋新值就是修改，没有时就是新增属性

---

``` py
def show(): #在类外定义，是函数
    print('show')
stu1.show=show #在这被绑定到stu1上，变成实例方法
stu1.show() #show
#stu2.show()报错，stu2没有绑定show函数
```

注意：**动态绑定属性方法都只能绑定到实例对象上**，不能绑定到类对象上，即不能新增类属性和类方法。

#### 类方法和静态方法

##### 类方法

传入的第一个参数必须是类对象，一般约定为`cls`，通过它来传递类的属性和方法，但不能传实例的属性和方法。函数定义前加`@classmethod`进行声明

**实例对象和类对象都可以调用**

``` py
class Student:
    school='abc'
    @classmethod
    def say_school(cls):
        #print(self.name)报错，因为name不是类属性
        print(f"My school is {cls.school}") #调用类属性前加cls.
Student.say_school()
stu = Student() #My school is abc
stu.say_school() #My school is abc
```

##### 静态方法

参数随意，但无法传递类和实例的任何属性和方法。函数定义前加`@staticmethod`进行声明。

主要是用来存放逻辑性代码，逻辑上属于类，但是和类本身没有关系，也就是说在静态方法中，不会涉及到类中的属性和方法的操作（独立的：便于使用和运维）

**实例对象和类对象都可以调用**

``` py
class Student:
    school='abc'
    @staticmethod
    def say_time():
        import time
        print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))
        #self.name报错
        #cls.school报错
Student.say_time()
stu = Student() #2024-02-16 10:46:35
stu.say_time() #2024-02-16 10:46:35
```

#### 魔术方法

魔术方法：python中有很多内置的类方法，有着不同的功能，称为，相当于函数/运算符重载。

特点：方法名前后都有两个下划线`_`

#### __str__字符串方法

控制类转换成字符串的行为，默认情况下`print(类)`都是输出它的内存地址

``` py
class student:
    name=None
    age=None
    def __init__(self,name,age):
        self.name=name
        self.age=age
stu=student("abc",11)
print(stu)
print(str(stu)) #两个输出都是stu对象的内存地址
```

在类定义中加上：

``` py
    def __str__(self):  
        return f"name:{self.name},age:{self.age}"
```

再进行输出，就会都输出`name:abc,age:11`

#### __lt__小于/大于符号比较

默认情况下两个类不能用`<`和`>`进行比较，即`类<类`或`类>类`会报错，但通过该方法可以实现

``` py
    def __lt__(self, other):
        return self.age<other.age #设置通过age进行比较
stu1=student("abc",11)
stu2=student("bcd",12)
print(stu1<stu2) #true
print(stu1>stu2) #false  
```

其中`def __lt__(self, other)`self和other分别代表符号两侧的实例对象，返回一个bool值（<和>返回的也是bool值）。

注意：`return self.age<other.age`中必须是`<`，如果是`>`结果会相反。

#### 其它比较符号

<=或>=：`__le__`

``` py
    def __le__(self, other):
        return self.age<=other.age #也是必须是<=
stu1=student("abc",11)
stu2=student("bcd",11)
print(stu1<=stu2) #true  如果不写这个方法会报错
```

==: `__eq__`

``` py
    def __eq__(self, other):
        return self.age==other.age
stu1=student("abc",11)
stu2=student("bcd",12)
print(stu1==stu2) #false  
```

注意：如果不写`__eq__`，`==`比较的是两个对象的内存地址。不会报错，但如果是不同实例对象 结果一定为false

#### __repr__和eval()方法

`__repr__ `方法应该返回一个字符串，该字符串显示如何创建实例对象，以将该字符串传递给`eval()`来重新构造实例对象。

``` py
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    def __repr__(self):
        return f"Product({self.name!r}, {self.price!r})" #因为self.name是str，所以返回值self.name的两侧要加引号
product = Product("Vacuum", 150.0)
repr(product) #"Product('Vacuum', 150.0)"
evaluated = eval(repr(product))
#此时evaluated属性与product完全相同，是它的深拷贝
```

#### __call__方法

`__call__`将对象当作函数调用时触发，使用形式为`对象名称()`，会默认调用`__call__`函数里的内容，如

``` py
p = People('liuming', 20)
p('abc')  # 调用__call__方法
```

#### 其它魔术方法

析构：`__del__`

迭代器：`__iter__`和`__next__` 

实例化：`__new__`

上下文管理器：`__enter__`和`__exit__`

更精细的属性访问控制：`__getattr__`和`__setattr__` 

详见https://blog.csdn.net/weixin_26755331/article/details/108495453

#### 面向对象编程

面向对象编程的简单理解：基于模板（类）去创建实体（对象），使用对象完成功能开发，主要包含三大特性，封装、继承、多态

#### 封装

私有成员变量/方法：以`__`（两个下划线）开头即可完成私有成员的设置。

私有方法无法直接被类对象/实例对象使用（在主函数中调用），私有变量无法在主函数中赋值和获取

``` py
class phone:
    __current=None
    def __single(self):
        print("single")
p1=phone()
#p1.__current报错
#p1.__single()报错
#phone.__current报错
#phone.__single()报错
```

私有成员/方法可以被类中的其他成员使用

``` py
class phone:
    __current=1
    def __single(self):
        print("single")
    def pd_current(self):
        if self.__current>=1: #使用self.调用私有变量
            print("true")
        else:
            self.__single() #使用self.调用私有方法
p1=phone()
p1.pd_current() #true
```

---

一个例子：设计带有私有成员的`phone`类，内部包含:

- 私有成员变量:`is_5g_enable`，类型bool，True表示开启5g，False表示关闭5g

- 私有成员方法:`check_5g()`，会判断私有成员`is_5g_enable`的值：

	- 若为True，打印输出:5g开启

	- 若为False，打印输出:5g关闭，使用4g网络

- 公开成员方法:`call_by_5g()`，调用它会执行：

	- 调用私有成员方法:`check_5g()`，判断5g网络状态

	- 打印输出:正在通话中

``` py
class phone:
    __is_5g_enable=False
    def __check_5g(self):
        if self.__is_5g_enable:
            print("5g开启")
        else:
            print("5g关闭，使用4g网络")
    def call_by_5g(self):
        self.__check_5g()
        print("正在通话中")
phone1=phone()
phone1.call_by_5g() #5g关闭，使用4g网络	正在通话中
```

#### 继承

子类可以继承父类的公有属性和方法，但**不能访问私有属性和方法**。

**单继承**：`class 类名(父类名):`

``` py
class phone:
    producer="abc"
    def call_by_4g(self):
        print("4g通话")
class new_phone(phone):
    face_id="10001"
    def call_by_5g(self):
        print("5g通话")
n_phone=new_phone()
print(n_phone.producer,n_phone.face_id)
n_phone.call_by_5g()
n_phone.call_by_4g() #这些功能都可以使用     
```

---

**多继承**：`class 类名(父类1,父类2,...):`

``` py
class newest_phone(new_phone,phone):
    def call_by_6g(self):
        print("6g通话")
n_phone=newest_phone()
n_phone.call_by_4g()
n_phone.call_by_5g()
n_phone.call_by_6g() #这些功能都可以使用   
```

---

**继承的优先级**：多个父类中，如果有同名的成员，则默认以继承顺序（从左到右）为优先级，即先继承的保留，后继承的被覆盖

``` py
class phone:
    def call(self):
        print("4g通话")
class new_phone():
    def call(self):
        print("5g通话")
class newest_phone(new_phone,phone): #新类的同名函数同最左面的父类
    pass
n_phone=newest_phone()
n_phone.call() #5g通话 
```

---

**复写**：子类在继承父类的成员属性和方法后，可以对其进行修改，只要在子类中重新定义同名的属性/方法即可

``` py
#接上例
class newest_phone(new_phone,phone):
    def call(self):
        print("6g通话")
n_phone=newest_phone()
n_phone.call() #6g通话
```

---

**调用父类的同名成员**：如果想使用被复写的父类的成员，有两种方法:

- `父类名.成员变量/成员方法(self)`，如`phone.producer`和`phone.call(self)`

    ``` py
  class phone:
      def call(self):
          print("4g通话")
  class new_phone(phone):
      def call(self):
          print("5g通话")
      def use_call(self,is_old=False):
          if is_old:
              phone.call(self) #调用父级成员方法，注意需传入self
          else:
              self.call() #调用复写后的新方法
  new_p=new_phone()
  new_p.use_call() #5g通话
  new_p.use_call(True) #4g通话
    ```

- `super().成员变量/成员方法()`，如`super().producer`和`super().call()`

注意这里调用父级方法时不用写`self`

#### 多态

完成某个行为时，使用不同的对象会得到不同的状态；比如同一个函数，当传入的参数（类型）不同时会返回不同的值。

多态常作用在继承关系上，比如函数形参声明接收父类对象，实际传入父类的子类对象进行工作，达到同一行为不同状态的结果。

``` py
class animal:
    def speak(self):
        pass
class dog(animal):
    def speak(self):
        print("wolf")
class cat(animal):
    def speak(self):
        print("meow")
def do_speak(ani:animal):
    ani.speak()
d=dog()
c=cat()
do_speak(d) #'wolf'
do_speak(c) #'meow'
```

抽象类：如前面的父类`animal`中的`speak`方法是空实现`pass`，这样设计的含义是：由父类确定有哪些方法，而具体的实现由子类自行决定。这种写法就叫做抽象类（接口），方法体是空实现`pass`的称为抽象方法

``` py
class ac: #抽象类
    def cool_wind(self):
        pass
    def hot_wind(self):
        pass
    def swing_wind(self):
        pass
class m_ac(ac): #具体实现1
    def cool_wind(self):
        print("m制冷")
    def hot_wind(self):
        print("m制热")
    def swing_wind(self):
        print("m_swing_wind")
class g_ac(ac): #具体实现2
    def cool_wind(self):
        print("g制冷")
    def hot_wind(self):
        print("g制热")
    def swing_wind(self):
        print("g_swing_wind")
def make_cool(a:ac):
    a.cool_wind()
m=m_ac() #实例对象1
g=g_ac() #实例对象2
make_cool(m) #'m制冷'
make_cool(g) #'g制冷'
```

### 类型注解

类型注解：在代码中涉及数据交互的地方，提供数据类型的注解（显式说明），如对变量和函数（方法）形参列表及返回值的类型注解

#### 变量的类型注解

- 第一种方法：创建变量时使用`变量:类型`，如：

   ``` py
   #基本数据类型
   var_1:int=10
   var_2:str="abc"
   var_3:bool=True
   #类
   class student:
       pass
   stu:student=student()
   #容器类数据类型
   my_list:list=[1,2,3]
   my_tuple:tuple=(1,"abc",True)
   my_dict:dict={"abc":111}
   ```

    类型详细注解：标注容器内元素的类型--使用`[元素类型,...]`

    ``` py
  my_list:list[int]=[1,2,3]
  my_tuple:tuple[int,str,bool]=(1,"abc",True)
  my_dict:dict[str,int]={"abc":111}
    ```

    其中，元组类型设置类型详细注解，需要将每一个元素都标记出来；字典类型设置类型详细注解，需要两个类型，第一个是key第二个是value

- 以注释的形式`#type:类型`，各类型的表示方式同上

    ``` py
  var_1=10 #type:int
  my_dict={"abc":111} #type:dict[str,str]
    ```

#### 函数的类型注解

对形参的类型注解：如果不加该注解，函数体中使用形参时无任何提示，同时调用该函数传入参数时也没有参数类型的提示

`def 函数方法名(形参名:类型,形参名:类型,...):`

如`def add(data1:list,data2:list):`

---

对返回值的类型注解：`def 函数方法名(形参)->返回值类型:`

如`def func(a:int)->int:`

#### 联合类型注解

对于`[1,"abc"]`和`{"name":"abc","age":11}`这种混合的类，可以使用联合类型注解`union[类型,类型,...]`

在使用联合类型注解前需导入`typing`模块的`Union`函数：

``` py
from typing import Union
my_list:list[Union[str,int]]=[1,"abc"] #列表中元素为str或int类型
my_dict:dict[str,Union[str,int]]={"name":"abc","age":11} #str表示该字典的键是str类型，Union[str,int]表示值是str或int类型
def func(data:Union[str,int])->Union[str,int]: #返回str或int类型
```

#### 一些补充说明

注意：一般可以直接看出变量类型时不添加类型注解，当无法直接看出类型时（如`json.loads()`、`random.randint()`这种）才会添加。

类型注解主要用于帮助ide对代码进行类型推断、协助做代码提示，以及帮助作者自己备注变量类型，但**不会真正决定变量的类型**，ide仍会根据注解中的实际值给变量赋值，而不是根据作者写的类型

``` py
var1:int="abc"
var2:str=111
print(var1,var2) #'abc' 111
```

### 异常捕获

常见错误：

- input返回字符串，若想得到一个数字，需要int(input())

- 使用while循环若需要计数变量，必须在外部声明并赋初值

- if里面`==`写成`=`

- 结构体内代码缩进错误

- 按索引取元素时越界

- ...



常见的异常类型：

- **ZeroDivisionError**：`print(10/0)`->`ZeroDivisionError: division by zero`除数不能为0

- **IndexError**：`lst=[1,2]  print(lst[2])`->`IndexError: list index out of range`索引越界

- **KeyError**：`dic={'name':'abc','age':20}  print(dic['gender']) `->`KeyError: 'gender'`字典中没有这个键

- **NameError**：`print(num)`->`NameError: name 'num' is not defined`未定义变量

- **SyntaxError**：`int a=20`->`SyntaxError: invalid syntax`语法错误

- **ValueError**：`a=int('abc')`->`ValueError: invalid literal for int() with base 10: 'abc'`字符串不能转为int



为应对这些数据处理过程中出现的问题，引入`try...except...else...finally`异常捕获机制，结构：

``` py
try:
    ...
except 异常种类:  #可以有多个except块
    ...
else:
    ...
finally:
    ...
```

先执行try块中的代码，若执行过程中抛出异常，则找有没有捕获对应异常except块；如果try块中没有抛出异常，则执行else块；无论是否发生异常，finally块都会被执行，常用来释放try块中申请的资源

**注意**：`try`语句必须至少有一个`except`或`finally`子句

一个例子：

``` py
try:
    a = int(input('第一个整数：'))
    b = int(input('第二个整数：'))
    result = a / b
except ZeroDivisionError as e: #e指代ZeroDivisionError
    print('除数不能为0',e)
except ValueError as f: #f指代ValueError
    print('只能输入数字',f)
else: #若没有异常则说明计算正常，输出结果
    print('结果为：', result)
finally: #程序结束
    print('程序结束')
```

输入--输出1：

```
第一个整数：10 
第二个整数：0
除数不能为0 division by zero
程序结束
```

输入--输出2：

```
第一个整数：10
第二个整数：ab
只能输入数字 invalid literal for int() with base 10: 'ab'
程序结束
```

输入--输出3：

```
第一个整数：10
第二个整数：5
结果为： 2.0
程序结束
```

**异常具有传递性**：若在函数1里面try函数2，函数2中出现异常，则也会被捕获。

### 模块与包

#### 模块

一个模块中包含函数、类、语句等，很多个模块组成python程序。

导入模块：

- `import 模块名`，如：

    ``` py
  import math
  print(dir(math)) #可以查看该模块中都有什么功能
  print(math.pow(2,3)) #使用模块中的函数
    ```

- `from 模块名 import 函数`，如：

    ``` py
  from math import pow
  print(pow(2,3)) #只导入了math中的pow函数，调用时不用加math.
  from math import * #导入math中的所有函数，使用math中的函数都不用加math.
    ```

- 导入自己创建的模块：自己创建一个.py文件，写入函数；左侧文件列表中找到它所在文件夹，右键->将目录标记为->源代码根目录；之后在main中可以使用前面两种方法导入模块（模块名就是文件名.py之前的部分）。

    注意这个.py文件和main.py要在一个文件夹下。



以主程序形式运行：

在自己创建模块调试程序时，有时需要运行代码来检测结果。如果直接写在模块中，在main导入该模块后，运行main时也会运行模块中的代码，产生不必要的输出。解决办法：

将模块中的测试代码放入`if __name__=='__main__':`语块内，这样只有在模块文件界面运行时才执行测试代码，在main界面运行不会执行（此时模块不是主程序）

快捷打出`if __name__=='__main__':`的方式：输入`main`，敲回车即可

#### 包

一个包中可能有很多个模块。

新建一个python软件包package1，里面自动包含`__init__.py`文件，在这个文件夹里面再新建一个`model1.py`（包中新建一个模块）,在里面写入`a=10`，回到main中：

``` py
import package1.model1 #导入package1包中的model1模块
print(package1.model1.a) #10
```

也可以：

``` py
import package1.model1 as pm #声明pm为package1.model1的别名
print(pm.a) #更加简洁
```

注：这种`as`声明别名的方式也可用于直接导入模块/包。

---

总结：使用import方式进行导入时只能写包名或模块名；使用from-import时：`from+包名+import+模块名`，`from+模块名+import+函数名` 均可，可以导入包、模块、函数、变量等。

---

第三方包的安装：

- 命令行中输入：`pip install 包名称`，也可设置国内镜像地址提高安装速度：

    `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple 包名称` （https://pypi.tuna.tsinghua.edu.cn/simple 为国内镜像地址）

    安装特定版本：`pip install cchardet==2.1.3`即是安装2.1.3版本的cchardet包

- 用pycharm自带的安装：点击右下角的`python.exe`，选择`解释器设置`，可以看到安装了哪些包；

    点击`+`，可以进入安装界面，搜索想安装的包，点击右下角的选项，输入`-i https://pypi.tuna.tsinghua.edu.cn/simple`设置国内镜像地址

#### 一个创建自定义包的实例

创建一个自定义的包`my_utils`，包内提供两个模块`str_util.py`和`file_util.py`。

`str_util.py`包含函数:`str_reverse(s)`接受传入字符串，将字符串反转返回;`substr(s，x，y)`按照下标x和y，对字符串进行切片。

`file_util.py`包含函数:`print_file_info(file_name)`接收传入文件的路径，打印文件的全部内容，如文件不存在则捕获异常，输出提示信息，通过finally关闭文件对象;`append_to_file(file_name，data)`接收文件路径以及传入数据，将数据追加写入到文件中>

- 创建包：右键左侧`pythonproject`，选择`new`（新建）->`python package`（软件包），名称为`my_utils`，回车，可以找到一个`__init__.py`的文件；

- 右键左侧my_utils，选择`new`（新建）->`python file`（文件），名称为`str_util.py`，同样方法添加一个`file_util.py`

- 说明文档：在.py文件中连续输入3次`"`，再回车，会出现

    ``` py
  """
  #第一行可以写入描述函数功能的文字
  :param s: #函数传入参数
  :return: #函数返回参数
  """
    ```

- 在str_util.py中测试函数功能：记住一定要在`if __name__=='__main__':`下写测试代码，这样在作为包导入的时候就不会执行调用函数进行测试的内容；注意右上角运行按钮左面的那个小框框里面应该是`当前文件`或者是当前`.py文件名`



完整代码：

str_util.py：

``` py
def str_reverse(s):
    """
    功能是将字符串完成反转
    :param s: 要被反转的字符串
    :return: 反转后的字符串
    """
    return s[::-1] #直接使用切片的方式完成
def substr(s,x,y):
    """
    功能是按照给定的下标完成给定字符串的切片
    :param s: 要被切片的字符串
    :param x: 切片的开始下标
    :param y: 切片的结束下标
    :return: 切片完成后的字符串
    """
    return s[x:y:]
if __name__ == '__main__':
    print(substr("12345",1,3)) #"23"
    print(str_reverse("abc")) #"cba"
```

file_util.py：

``` py
def print_file_info(file_name):
    """
    功能是将给定路径的文件内容输出到控制台中
    :param file_name: 要读取的文件路径
    :return: 无返回值
    """
    f=None #声明变量初始值，确保当文件不能打开时f变量存在，以便后续判断
    try:   #要解决路径不存在的异常
        f=open(file_name,"r",encoding="UTF-8") #以只读方式打开文件
        content=f.read()
        print("文件的内容如下")
        print(content)
    except Exception as e: #捕获异常
        print(f"程序出现异常，原因是：{e}")
    finally: #关闭文件
        if f!=None:  #只有f不是none（路径存在）才能进行close操作
            f.close()
def append_to_file(file_name,data):
    """
    功能是将指定的数据追加到指定的文件中
    :param file_name: 指定的文件路径
    :param data: 指定的数据
    :return: 无返回值
    """
    f=None
    try: 
        f=open(file_name,"a",encoding="UTF-8") #以追加方式打开文件
        f.write(data)
        f.write("\n")
    except Exception as e: #捕获异常
        print(f"程序出现异常，原因是：{e}")
    finally: #关闭文件
        if f!=None: 
            f.close()
if __name__ == '__main__':
    append_to_file("D:/test1.txt","222")
    print_file_info("D:/test1.txt")
```

main.py主函数调用：

``` py
import my_utils.str_util #这种方法调用其中函数时要加上my_utils
from my_utils import file_util #这种方法就不用，只需加file_util
print(my_utils.str_util.str_reverse("123"))
print(my_utils.str_util.substr("abcde",1,3))
file_util.append_to_file("D:/test1.txt","main")
file_util.print_file_info("D:/test1.txt")
```

### 文件

#### 打开和关闭

- `open(文件名，打开模式，编码格式)`

    - 文件名：以字符串形式，用`/`不是`\`

    - 打开模式：只读--`r`、只写--`w`（原有内容被删除）、追加--`a`等

    - 编码格式：一般为`utf-8`，open方法默认为`gbk`，如果想要保存中文，就必须指定编码格式为`utf-8`

    如：

    ``` py
  f=open("D:/python/shiyan.txt","r",encoding="UTF-8") #encoding参数不是open构造函数中的第三个参数，中间省略了多个复杂参数，所以要用关键字传参
  print(type(f)) #<class '_io.TextIOWrapper'>
    ```

    最后使用`f.close()`关闭文件，注意用这种方法打开文件后必须手动关闭

- 另一种打开文件的方法：

    ``` py
  with open(文件名，打开模式，编码格式) as f: 
      #对文件的操作
    ```

    **该方法可以自动关闭文件**

#### 读取内容

- `a=f.read(n)`读取文件中的前n个字节，若不给n这个参数，就全读取。读取的内容以str形式保存到a内，包括换行`\n`

- `line_list=f.readlines()`以行为单位，把每行内容都转化为列表中的一个元素，回车换行用`\n`表示

    如`['123456789\n', 'abcd']`

- `line=f.readline()`一次读取一行，不读取换行`\n`，以str形式保存到a内

- 用for循环读取每行数据：也不读取换行`\n`

    ``` py
  for line in f: #用for循环读取每行数据
      print(line) #123456789  abcd
    ```



注意：如果对同一文件连续多次读取操作，第二次读取会从第一次的末尾开始读，比如第一次读了前10个，第二次仍然`read(10)`，就会读取实际中第10-20个字符

#### 写入内容

`f.write("123")`将"123"写入到文件中，

注意：直接调用`write()`函数时，内容并未真正写入文件，而是积攒在程序的内存中，称为缓冲区；使用`f.flush()`刷新内容后，此时内容才真正写入文件。这样做是为了避免频繁操作硬盘，导致效率下降（积攒很多后一次性写入效率更高）

---

使用`w`模式打开文件时，如果向文件中写入内容，会在清空文件的原有内容后，再写入内容。若文件不存在就直接创建

如：

``` py
f=open("D:/python/shiyan.txt","w",encoding="UTF-8") 
f.write("123")  
f.close() #close函数会内置flush的功能，若有close就无需flush
```

或

``` py
with open('D:/python/shiyan.txt','w',encoding='utf-8') as fp:
    fp.write("123")
```

---

使用`a`模式打开文件时：原文件不清空，而是追加写入，文件不存在时也会自动创建。

使用方法同上

#### 打开模式

使用w/a模式打开文件，只能写不能读取；使用r模式打开文件，只能读取不能写。如果同时读写，需使用其它的模式：

| 常用的打开模式 | 可做操作   | 若文件不存在 | 是否覆盖文件原来内容 |
| -------------- | ---------- | ------------ | -------------------- |
| r              | 只读       | 报错         | -                    |
| r+             | 可读、可写 | 报错         | 是                   |
| w              | 只写       | 创建         | 是                   |
| w+             | 可读、可写 | 创建         | 是                   |
| a              | 只写       | 创建         | 否，追加写           |
| a+             | 可读、可写 | 创建         | 否，追加写           |

#### 使用案例

##### 统计给定单词的出现次数

- 第一种方法：把所有内容读取成一个字符串，用字符串的`count(给定单词)`方法直接统计

    ``` py
  f=open("D:/python/shiyan.txt","r",encoding="UTF-8")
  content=f.read()
  count = content.count("word")
  print(f"word出现了{count}次")
  f.close()
    ```

- 第二种方法：按照空格进行切分，把每个单词与给定单词进行比较

    ``` py
  f=open("D:/python/shiyan.txt","r",encoding="UTF-8")
  count=0
  for line in f:
      line=line.strip() #去除每行单词开头和结尾的空格以及换行符，若没有，切分完成后每行的最后一个单词后面就会带一个\n影响判断
      words=line.split(" ") #以空格为分界线进行切分
      for word in words:
          if word=="word":
              count+=1
  print(f"word出现了{count}次")
  f.close()
    ```

##### 文件的备份

有一份文件bill.txt记录了多次实验的数据以及是否为测试实验，是否为测试标记在每行数据的末尾（行内的第5个数据），每项数据间用`,`进行分隔。现在要将文件写出到bill.txt.bak文件作为备份，同时将标记为测试的数据行丢弃。

思路：r模式打开一个文件对象并读取文件，再用w模式打开另一个文件用于写出，用for循环检测是否是测试，如果不是就写出，最后将两个文件关闭。

``` py
fr=open("D:/python/bill.txt","r",encoding="UTF-8")
fw=open("D:/python/bill.txt.bak","w",encoding="UTF-8")
#这里使用w或a模式都可，因为写出的内容在内存中，还没到磁盘中，可以在循环中追加写入（w模式写入内存中是不会覆盖的，只有写入文件中才会覆盖原有文件）
for line in fr :
    line=line.strip()  #去除换行符
    if line.split(",")[4]=="测试": #line.split("，")是一个列表，[4]表示其中的第5个元素
        continue #直接跳出这一次循环
    fw.write(line)  #不是测试就直接写入该行
    fw.write("\n")  #前面对line去除了换行符，这里要加上
fr.close()
fw.close()
```

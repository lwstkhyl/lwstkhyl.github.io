---
layout: mypost
title: Vue--01基础
category: JS
subcategory: JS-Vue
---
来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH)

<!-- more -->

写在前面：此笔记来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH) / [资料下载](https://www.aliyundrive.com/s/B8sDe5u56BU/folder/61138e6e8582eecbe4c84546a1b2d58363d20bc0) / [我的练习文件（教程中的练习）](https://lwstkhyl.me/file?path=githubio%E7%AC%94%E8%AE%B0%E9%99%84%E5%B8%A6%E8%B5%84%E6%96%99%2Fvue)

{% raw %}

### 简介

#### 基本介绍

**Vue**：一套用于**构建用户界面**的**渐进式**JS框架

- **构建用户界面**：即将数据渲染到页面上

- **渐进式**：Vue可以自底向上逐层的应用，比如最简单的应用只需一个轻量核心库，也可以引入各种Vue插件构建复制应用



**特点**：

- **组件化模型**：提高代码复用率和可维护性

  `.vue`格式文件：可以存储一个ui组件的HTML/JS/CSS代码

- **声明式编码**：无需直接操作DOM

  例如：根据已知数据拼接HTML代码

    ![简介1](/upload/md-image/vue/简介1.png){:width="800px" height="800px"}

- **虚拟DOM**+**Diff算法**：尽量复用DOM节点

  比如原来有3个人的数据，就需要3个li来展示，当新增一个人时，原生JS就会重新构造4个li来渲染，即从数据直接构造**真实DOM(Real-DOM/True-DOM)**，而Vue在中间增加了一步**虚拟DOM(Virtual-DOM)**，它存储在内存中

  ![简介2](/upload/md-image/vue/简介2.png){:width="800px" height="800px"}

  最后的结果：不变的节点无需重新构造。Diff算法就是用来比较哪些节点不变的

#### 安装

[Vue官网](https://cn.vuejs.org/)，最重要的是[api](https://cn.vuejs.org/api/)

**两种安装方式**：

- 直接用`<script>`引入CDN链接或本地下载的`vue.js`

- NPM+命令行



这里先介绍用script引入的方式，有两个不同的版本

- 开发版本：包含完整的警告和调试

- 生产版本：删除了警告，体积更小



```html
<script src="./js/vue.js"></script>
```


![简介5](/upload/md-image/vue/简介5.png){:width="800px" height="800px"}

在引入后，全局环境中就多了一个函数（或者说对象）`Vue`，类似于jq中的`$`

![简介3](/upload/md-image/vue/简介3.png){:width="600px" height="600px"}



---



下载Vue开发者工具`Vue devtools`

- edge：直接在扩展里面搜索`Vue.js devtools`，下载

- chrome：用网盘资料里的`05_其它`->`vue_dev_tools.crx`手动添加

    ![简介4](/upload/md-image/vue/简介4.png){:width="800px" height="800px"}

    将crx文件直接拖到扩展程序界面中，就可弹出安装窗口



之后进入该扩展的设置界面，勾选`允许访问文件网址`/`允许访问文件URL`，可以发现引入`Vue.js`时弹出的要求安装devtools的警告没有了



---



如何彻底关闭使用开发版本的警告：

```html
<script>
    Vue.config.productionTip = false;
</script>
```


若无效，直接更改`Vue.js`，将上面那行代码加在js文件的最后

#### 一个简单的例子

- 准备好一个容器`#root>h1`

- 创建Vue实例`new Vue({})`，构造函数中应传入一个配置对象

  - `el`：指定当前Vue实例为哪个容器服务，值通常为CSS选择器字符串

  - `data`：一个对象/函数，存储和这个容器相关的数据，并且这些数据只能由这个容器使用。data的属性值可以是字符串等基本数据类型，也可以是一个对象

- 在容器中使用`data`：使用`{{属性名}}`语法（类似于Jinja这类模板引擎），容器里的代码被称为**Vue模板**



```html
<body>
    <div id="root">
        <h1>Hello, {{name}}</h1>
    </div>
</body>
<script>
    new Vue({
        el: "#root", //指定容器
        // el:document.getElementById("root") //也可以，但使用较少
        data: {
            name: "Vue"
        }
    });
</script>
```


![简介6](/upload/md-image/vue/简介6.png){:width="150px" height="150px"}

**一些问题**：

- vue实例和容器是**一一对应**的关系

  - 如果有两个容器，且都符合`el`中的选择器，但Vue只识别第一个，相当于`querySelector`而不是`querySelectorAll`

  - 如果创建多个Vue对象，它们都指向同一个容器，则第二个Vue对象会报错，且里面的data不能被容器使用

- 容器中`{{ }}`除了能写Vue实例中data的属性，还能写**JS表达式或代码**，例如`1+1`/`Date.now()`/`name.toUpperCase()`/三元表达式/if语段等



**Vue开发者工具的简单使用**：

f12打开控制台

![简介7](/upload/md-image/vue/简介7.png){:width="800px" height="800px"}

点击data里的属性值可以更改它们，之后模板中用到该数据的地方都会随之改变

**`Vue.js`和`Vue.min.js`的区别**：

Vue.js多了一些便于理解的警告，例如在创建Vue实例时没写`new`

- `Vue.js`：

  ![简介8](/upload/md-image/vue/简介8.png){:width="600px" height="600px"}

- `Vue.min.js`：

  ![简介9](/upload/md-image/vue/简介9.png){:width="600px" height="600px"}

### 模板语法

前面介绍的`{{ }}`称为**插值语法**，即在标签体内插入一个值

这里重点介绍**指令语法**：主要用于设置标签的属性

- 语法：`v-bind:属性名="JS表达式/代码"`/`:属性名="JS表达式/代码"`

- Vue中还有很多指令，形式都是`v-xxx`，此处只是拿`v-bind`举例子



```html
<body>
    <div id="root">
        <h1>我是插值语法{{text}}！</h1>
        <a v-bind:href="url.toUpperCase()" :style="css" :data-time="Date.now()">我是指令语法</a>
    </div>
</body>
<script>
    new Vue({
        el: "#root",
        data: {
            text: "abc",
            url: "http://www.baidu.com",
            css: "color:red"
        }
    });
</script>
```


![简介10](/upload/md-image/vue/简介10.png){:width="600px" height="600px"}

```html
<body>
    <div id="root">
        <h1>{{text}}</h1>
        <p :style="p.css">{{p.text}}</p>
    </div>
</body>
<script>
    new Vue({
        el: "#root",
        data: {
            text: "我是h1标签",
            p: {
                text: "我是p标签",
                css: "color:blue;"
            }
        }
    });
</script>
```


![简介11](/upload/md-image/vue/简介11.png){:width="350px" height="350px"}

### 数据绑定

例如一个文本输入框，想设置默认值，按照之前的写法`v-bind`：

```html
<div id="root">
    单向数据绑定：<input type="text" :value="name">
</div>
```


Vue实例中name的值作为默认值，当修改输入框中的值时，name的值不会变，这种称为**单向数据绑定**，即只能根据Vue-data改html页面中的值

现在想实现**双向数据绑定**：当修改输入框中的值时，name的值同步改变

- 语法：`v-model:属性名="JS表达式/代码"`/`v-model="JS表达式/代码"`

- 注意：只能用于表单类元素上（输入类元素），通常设置到它们的`value`属性上，所以可以省略属性名`value`



```html
<body>
    <div id="root">
        单向数据绑定：<input type="text" :value="name1">
        双向数据绑定：<input type="text" v-model:value="name2">
        <!-- 双向数据绑定也可以写成：<input type="text" v-model="name2"> -->
    </div>
</body>
<script>
    new Vue({
        el: "#root",
        data: {
            name1: "单向数据绑定",
            name2: "双向数据绑定"
        }
    });
</script>
```


![简介12](/upload/md-image/vue/简介12.png){:width="800px" height="800px"}

### el和data的两种写法

在之前的案例中，我们直接在Vue构造函数中指定了`el`和`data`

```js
const v = new Vue({});
console.log(v);
```


![简介13](/upload/md-image/vue/简介13.png){:width="800px" height="800px"}

Vue实例对象的属性中，以`$`开头的是给人看的，以`_`开头的都是底层使用的

**el的第二种写法：**使用Vue实例对象的属性`v.$mount('#root')`

**data的第二种写法：**函数式，即传入一个函数，该函数返回数据。该函数必须是function声明的普通函数，不能是箭头函数

```html
<body>
    <div id="root">
        <h1>{{name}}</h1>
    </div>
</body>
<script>
    const v = new Vue({
        data: function () {
            console.log(this); //此处this是Vue实例对象
            return {
                name: 'abc'
            };
        }
    });
    v.$mount('#root');
</script>
```


注：`data: function () {}`还可以简写成`data() {}`

一个重要的原则：由Vue管理的函数，一定不能写箭头函数，否则this就不是Vue实例了

例：1s后再填充`{{name}}`内容

```js
const v = new Vue({
    data() {
        return {
            name: 'abc'
        };
    }
});
setTimeout(() => {
    v.$mount('#root');
}, 1000);
```


### MVVM模型

- M：模型(model)，对应data中的数据

- V：视图(view)，即Vue中的模板，或者说它渲染出的DOM页面

- VM：视图模型(view model)，Vue实例对象，之后我们统一都用`vm`来指代创建出的Vue实例对象

![简介14](/upload/md-image/vue/简介14.png){:width="800px" height="800px"}

映射到实际代码中：

![简介15](/upload/md-image/vue/简介15.png){:width="500px" height="500px"}

在`{{ }}`中，除了data中的属性，还可以是vm上任一属性，例如`$options`/`$emit`等

**总结**：

- data中的所有属性，其实都是绑定到了vm上

- vm上的所有属性，以及Vue原型上的所有属性，在Vue模板中都可以直接使用

### 数据代理

#### object.defineProperty

该方法用于为某个对象增加属性

```js
object.defineProperty(对象, 新增的属性名,{
    value: 新增的属性值,
    enumerable: true, //控制新增的属性是否可枚举（可遍历），默认为false
    writable: true, //控制新增的属性是否可被修改，默认为false
    configurable: true, //控制新增的属性是否可被删除，默认为false
})
```


```js
let p1 = {
    name: 'abc',
    sex: 'male'
};
let p2 = {
    name: 'abc',
    sex: 'male'
};
Object.defineProperty(p1, 'age', {
    value: 18,
});
Object.defineProperty(p2, 'age', {
    value: 18,
    enumerable: true
});
console.log(p1, p2);
for (let i in p1) {
    console.log(i + ":" + p1[i]);
}
for (let i in p2) {
    console.log(i + ":" + p2[i]);
}
```


![简介16](/upload/md-image/vue/简介16.png){:width="700px" height="700px"}

可以看到p1的age属性颜色较淡，说明该属性是不可枚举的，而p2就是正常的颜色



---



除此之外，该方法还可以使用某个变量作为属性值，例如使用`number`作为`age`的值，当`number`改变时`age`的属性值也跟着改变

```js
object.defineProperty(对象, 新增的属性名,{
    get: function(){ //当有人读取该属性时，这个函数就会被调用，返回值即为属性值
        return 属性值
    },
    set: function(value){ //当有人修改该属性时，这个函数就会被调用
        /* value即为修改后的新属性值 */
    }
})
```


一般我们把`get: function(){}`和`set: function(){}`称为`getter`和`setter`，可简写成`get(){}`/`set(){}`

```js
let p = {
    name: 'abc',
    sex: 'male'
};
let number = 18;
Object.defineProperty(p, 'age', {
    get: function () {
        console.log('getter被调用');
        return number;
    }
});
console.log(p);
```


![简介17](/upload/md-image/vue/简介17.png){:width="300px" height="300px"}

点击一下`(...)`，就可以得到age的属性值

![简介18](/upload/md-image/vue/简介18.png){:width="300px" height="300px"}

**例：getter和setter结合实现双向绑定，即修改`number`时`age`改变，修改`age`时`number`也改变**

```js
    let p = {
        name: 'abc',
        sex: 'male'
    };
    let number = 18;
    Object.defineProperty(p, 'age', {
        get() {
            console.log('getter被调用');
            return number;
        },
        set(value) {
            console.log('setter被调用');
            number = value;
        }
    });
    setTimeout(() => {
        number = 19;
        console.log("修改了number，age属性值为" + p.age);
    }, 1000);
    setTimeout(() => {
        p.age = 20;
        console.log("修改了age，number为" + number);
    }, 2000);
```


![简介19](/upload/md-image/vue/简介19.png){:width="300px" height="300px"}

#### 数据代理

数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

例：通过`obj2`代理`obj`的属性操作

```js
let obj = { x: 1 };
let obj2 = { y: 2 };
Object.defineProperty(obj2, 'x', {
    get() {
        return obj.x;
    },
    set(v) {
        obj.x = v;
    }
});
```


Vue中的数据代理：

```js
const vm = new Vue({
    el: "#root",
    data: {
        name: 'abc',
        age: 18
    }
});
console.log(vm);
```


![简介20](/upload/md-image/vue/简介20.png){:width="400px" height="400px"}

观察到vm中的name和age都是`(...)`状态，说明它们应各有一个setter和getter。又根据name和age是在data中声明并赋值，说明`vm中name和age`实际上是`data中name和age`的代理。在vm中，`data中name和age`存储在`vm._data`中

```js
const vue_data = {
    name: 'abc',
    age: 18
}
const vm = new Vue({
    el: "#root",
    data: vue_data
});
console.log(vm._data === vue_data); //true
vm.name = 'bcd';
console.log(vm._data.name); //此时页面中{{name}}也同步改变
```


![简介21](/upload/md-image/vue/简介21.png){:width="600px" height="600px"}

- 在第一步中，只是把`new Vue`中的data赋值到`vm._data`中，没有数据代理，还没有`vm.name`。如果要在标签中使用name，只能写成`{{_data.name}}`

- 在第二步中，通过getter和setter将`vm._data.name`映射到`vm.name`（使用`object.defineProperty`方法），这就是数据代理，简化了标签中name的写法



**总结**：

- Vue通过**vm对象**来代理**vm.data对象**中属性的操作

- **好处**：更方便的操作data中的数据

- **原理**：

  - 使用`object.defineProperty`把data中所有属性添加到vm上

  - 为每个添加的属性指定一个getter/setter

  - 在getter/setter内操作data中对应的属性



补充：如果直接`console.log(vm)`，点开`_data`

![简介22](/upload/md-image/vue/简介22.png){:width="450px" height="450px"}

又可以看到`(...)`，而不是`name:'abc'`，但这不是数据代理，而是数据劫持，目的是实现`_data.name`改变引起`{{name}}`的变化（响应式），后面会详细讲

### 事件与methods属性

#### 基本形式

`v-on:事件名`/`@事件名`，以点击事件`click`为例

```html
<div v-on:click="函数名"></div>
<!-- 或者 -->
<div @click="函数名"></div>
<script>
    const vm = new Vue({
        el: "#root",
        methods:{
            函数名(e){} //e是事件对象
        }
    });
</script>
```


注：写在双引号中的变量均会被识别为Vue实例对象中的属性，如果想要实现`@click="alert(111)"`的效果，就要写成

```html
<div @click="window.alert(111)" id="root"></div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            window
        }
    });
</script>
```


**例**：

```html
<body>
    <div id="root">
        <h1 v-on:click="show_info">{{name}}</h1>
    </div>
</body>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            name: 'abc'
        },
        methods: {
            show_info(e) {
                console.log(this); //this是vm
                console.log(e); //e是事件对象
                console.log(e.target); //点击的DOM对象
                console.log(e.target.innerText); //文本 
            }
        }
    });
</script>
```


![事件1](/upload/md-image/vue/事件1.png){:width="800px" height="800px"}



---



如何向事件函数中传入参数

```html
<div v-on:click="函数名(参数, $event)"></div>
<!-- 或者 -->
<div @click="函数名(参数, $event)"></div>
<script>
    const vm = new Vue({
        el: "#root",
        methods:{
            函数名(参数, e){} //e是事件对象
        }
    });
</script>
```


例：

```html
<body>
    <div id="root">
        <h1 v-on:click="show_info($event, 18, 'abc')">{{name}}</h1>
    </div>
</body>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            name: 'abc'
        },
        methods: {
            show_info(e, age, name) {
                console.log(e, age, name);
            }
        }
    });
</script>   
```


![事件2](/upload/md-image/vue/事件2.png){:width="800px" height="800px"}

注：

- `函数名(参数, $event)`中`$event`和参数的顺序可以自由指定，它与methods里面的`函数名(参数, e){}`顺序对应

- methods里面的函数不做数据代理，因为函数是写死的，而数据是可变的

- 函数其实也可以写到data中，但因为data中的属性要做数据代理，消耗性能较多

#### 事件修饰符

`@事件名.事件修饰符`，事件修饰符包括：

- `prevent`（常用）：阻止默认事件

- `stop`（常用）：阻止事件冒泡

- `once`（常用）：让该事件只触发一次

- `capture`：使用事件的捕获模式（让事件在捕获阶段触发）

- `self`：只有`e.target`是当前操作的元素时才触发

- `passive`：立即执行事件默认行为，不等待事件回调执行

    注：`self`也可以阻止冒泡，只不过`prevent`是加在要触发事件的元素上，`self`是加在其它不想触发事件的元素上



如果想要写多个事件修饰符，就直接`@事件名.事件修饰符1.事件修饰符2...`（修饰符可以连续写）

**例1：阻止冒泡和默认事件**

- 不使用事件修饰符

    ```html
  <body>
      <div id="root" @click="click">
          <a href="xxx" @click="click">我是a标签</a>
      </div>
  </body>
  <script>
      const vm = new Vue({
          el: "#root",
          methods: {
              click(e) {
                  e.stopPropagation(); //阻止冒泡
                  e.preventDefault(); //阻止默认事件
                  alert("点击了a");
              }
          }
      });
  </script>
    ```


- 使用事件修饰符

    ```html
  <body>
      <div id="root" @click="click">
          <a href="xxx" @click.prevent.stop="click">我是a标签</a>
      </div>
  </body>
  <script>
      const vm = new Vue({
          el: "#root",
          methods: {
              click(e) {
                  alert("点击了a");
              }
          }
      });
  </script>
    ```


例2：`passive`

```html
<body>
    <ul id="root" @wheel="wheel">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</body>
<script>
    const vm = new Vue({
        el: "#root",
        methods: {
            wheel(e) {
                for (let i = 1; i < 10000; i++)
                    console.log(1);
            }
        }
    });
</script>
```


此时滚动滚轮，发现会等到计数完成后，滚动条才滚动。如果使用`@wheel.passive`，就不存在这个问题。常常在移动端中使用该修饰符

注意：`wheel`是鼠标滚轮滚动时触发（不管页面元素实际有没有动），`scroll`是页面元素滚动时触发（不管是通过鼠标滚轮还是拖动滚动条）

#### 键盘事件

`keydown`和`keyup`

当事件对象为指定键时触发：`@键盘事件名.按键别名`，常用的按键别名：

- `enter`回车

- `delete`删除/退格

- `esc`ESC

- `space`空格

- `tab`TAB

- `up`上

- `down`下

- `left`左

- `right`右



同时按下多个键：`@键盘事件名.按键别名1.按键别名2...`，例如`@keyup.ctrl.y`就是同时按下CTRL+y

如果指定键没有按键别名：`@键盘事件名.按键的key值`，按键的key值可使用`e.key`获取，但注意：JS中自带的一些key值和Vue中的key值不同，比如大小写切换，`e.key`是`CapsLock`，但Vue中是`capsLock`或`caps-lock`

不是键盘上的所有键都能绑定事件：一些特殊按键（如调音量、亮度）就可能不被识别

例：

```html
<body>
    <div id="root">
        <input type="text" @keyup.tab="keyup" placeholder="请输入：">
    </div>
</body>
<script>
    const vm = new Vue({
        el: "#root",
        methods: {
            keyup(e) {
                console.log(`按下了tab键`);
            }
        }
    });
</script>
```


但按下tab时并没有输出内容，这是因为tab键有一个特性——让输入框失去焦点，由于上面设置的是`keyup`按键抬起时触发，而按下tab键时就已经失焦，所以不会触发

解决方法：使用`@keydown.tab`，tab键必须使用keydown

类似的特殊按键：CTRL、alt、shift、win(meta)

- `keyup`：按下它们的同时，再按下其它按键，随后释放其它键，才被触发

- `keydown`：正常触发



补充：

- 也可以通过`@键盘事件名.按键的keycode值`方法绑定，但不推荐使用（因为keycode可能不被最新浏览器支持，不同键盘的keycode值可能不同）

- `Vue.config.keyCodes.自定义键名 = keycode`：定制按键别名

    ```html
  <body>
      <div id="root">
          <input type="text" @keydown.huiche="keydown" placeholder="请输入：">
      </div>
  </body>
  <script>
      Vue.config.keyCodes.huiche = 13;
      const vm = new Vue({
          el: "#root",
          methods: {
              keydown(e) {
                  console.log(`按下了回车键`);
              }
          }
      });
  </script>
    ```


### 计算属性computed

在Vue中，**属性(Property)**指`data`中的键值对。计算属性就是拿属性进行计算，得到一个新的属性，存储在`computed`中

```js
new Vue({
    data: {
        属性1: "",
        属性2: ""
    },
    computed:{
        计算属性:{
            get(){ //当有人读取该计算属性是，get函数就会被调用，返回值即为计算属性值
                this.属性1; //使用data中的属性
                return 值;
            },
            set(v){ //不必须写，当计算属性被修改时调用
                console.log(v); //v为修改后的新值
            }
        }
    }
});
```


- 计算属性不在`vm._data`中，但可使用`{{计算属性}}`插值语法调用

- **get什么时候调用**：

  - 初次读取计算属性时，如果有多个计算属性插值，也只调用一次get，采用了缓存机制

  - 所依赖的数据发生变化时调用

    注意：

    - 当计算属性被修改时，调用set，但如果其所依赖的数据未被修改，就不调用get，`{{计算属性}}`不会更新

    - 所依赖的数据指的是Vue实例对象中的data，不能是外部作用域中的变量。如果计算属性中用到了外部变量，即使外部变量改变，也不会调用get



**计算属性的简写形式**：只读不改（只有get）

```js
new Vue({
    computed:{
        // 计算属性:function(){ //或者直接写成↓
        计算属性(){
            return 值;
        }
    }
});
```


**例1：两个输入框分别输入姓/名，全名在下面显示，姓截取输入的前3位**

- 插值语法：

    ```html
  <body>
      <div id="root">
          姓：<input type="text" v-model="firstname"><br>
          名：<input type="text" v-model="lastname"><br>
          姓名：<span>{{firstname.slice(0, 3)}}·{{lastname}}</span>
      </div>
  </body>
  <script>
      new Vue({
          el: "#root",
          data: {
              firstname: "",
              lastname: ""
          }
      });
  </script>
    ```


- methods：

    ```html
  <body>
      <div id="root">
          姓：<input type="text" v-model="firstname"><br>
          名：<input type="text" v-model="lastname"><br>
          姓名：<span>{{merge()}}</span>
      </div>
  </body>
  <script>
      new Vue({
          el: "#root",
          data: {
              firstname: "",
              lastname: ""
          },
          methods: {
              merge() {
                  const first = this.firstname.slice(0, 3);
                  const last = this.lastname;
                  return `${first}·${last}`;
              }
          }
      });
  </script>
    ```


    对于这两种方法，只要输入框中的值发生改变，Vue就会重新解析模板，对使用`data`/`merge`的所有地方重新渲染，没有缓存机制

- 计算属性：

    ```html
  <body>
      <div id="root">
          姓：<input type="text" v-model="firstname"><br>
          名：<input type="text" v-model="lastname"><br>
          姓名：<span>{{fullname}}</span>
      </div>
  </body>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              firstname: "",
              lastname: ""
          },
          computed: {
              fullname: {
                  get() {
                      const first = this.firstname.slice(0, 3);
                      const last = this.lastname;
                      return `${first}·${last}`;
                  },
                  set(v) {
                      const name_list = v.split('·');
                      this.firstname = name_list[0].slice(0, 3);
                      this.lastname = name_list[1];
                  }
              }
          }
      });
  </script>
    ```


    ![计算属性1](/upload/md-image/vue/计算属性1.png){:width="300px" height="300px"}

    简写形式：

    ```js
      const vm = new Vue({
      el: "#root",
      data: {
          firstname: "",
          lastname: ""
      },
      computed: {
          fullname: function () {
              const first = this.firstname.slice(0, 3);
              const last = this.lastname;
              return `${first}·${last}`;
          }
      }
  });
    ```


    但这样就无法改变fullname值

**例2：有两种天气（热/冷），点击按钮切换**

- 第一种写法：按钮绑定点击事件，并使用methods

    ```html
  <body>
      <div id="root">
          <h2>今天天气为{{weather}}</h2>
          <button @click="change_weather">切换天气</button>
      </div>
  </body>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              is_hot: true
          },
          computed: {
              weather() {
                  return this.is_hot ? "热" : "冷";
              }
          },
          methods: {
              change_weather() {
                  this.is_hot = !this.is_hot;
              }
          }
      });
  </script>
    ```


- 第二种写法：按钮绑定点击事件，不使用methods（将处理函数直接写到事件里面

    ```html
  <body>
      <div id="root">
          <h2>今天天气为{{weather}}</h2>
          <button @click="is_hot = !is_hot;">切换天气</button>
      </div>
  </body>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              is_hot: true
          },
          computed: {
              weather() {
                  return this.is_hot ? "热" : "冷";
              }
          }
      });
  </script>
    ```


### 监视属性watch

用于监视某个属性的改变

```js
/* 第一种方法 */
const vm = new Vue({
    watch:{
        要监视的属性:{
            handler(newVal, oldVal){ //当要监视的属性发生改变时触发
                console.log(oldVal); //修改前的值
                console.log(newVal); //修改后的值
            },
            immediate:true, //初始化时让handler调用一次，默认为false
        }
    }
});
/* 第二种方法 */
vm.$watch('要监视的属性', {
    handler(newVal, oldVal){},
    immediate:true
});
```


- 计算属性也可以被监视

- 初始化时handler中`oldVal`为undefined

- 要监视的属性必须存在，但如果不存在也不会报错，只是`oldVal`和`newVal`均为undefined



---



**深度监视**：当要监视的属性是一个对象中的某个属性时，watch里要监视的属性就要写成`'对象名.属性名'`的形式，但这样就无法监视很多个属性。直接写`对象名`是不行的，因为默认监测对象的地址，只有把这个对象替换成别的变量才会监测到

```js
const vm = new Vue({
    watch:{
        要监视的属性:{
            deep:true
        }
    }
});
```


总结：

- watch默认不监测对象内部值的改变，需要设置`deep:true`，使用时根据数据的具体结构，决定是否深度监视

- Vue可以监测对象内部值的改变（如`{{obj.a}}`这种写法是可以随a变而发生改变的），但watch默认不行



---



**监视的简写**：只有不需要immediate和deep配置项，只用handler时才能简写，类似于[计算属性](#计算属性computed)

```js
/* 第一种方法 */
const vm = new Vue({
    watch:{
        要监视的属性(newVal, oldVal){}
    }
});
/* 第二种方法 */
vm.$watch('要监视的属性', function(newVal, oldVal){});
// 注意这里也不能用箭头函数
```




---



**姓名案例——监视属性版本**：

```html
<body>
    <div id="root">
        姓：<input type="text" v-model="name.firstname"><br>
        名：<input type="text" v-model="name.lastname"><br>
        姓名：<span>{{fullname}}</span>
    </div>
</body>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            name: {
                firstname: "",
                lastname: ""
            },
            fullname: ""
        },
        watch: {
            name: {
                deep: true,
                immediate: true,
                handler(newVal, oldVal) {
                    const first = newVal.firstname.slice(0, 3);
                    const last = newVal.lastname;
                    this.fullname = `${first}·${last}`;
                }
            }
        }
    });
</script>
```


**监视属性与计算属性的对比**：

- 单从这个例子来看，使用计算属性更简单，因为它不需要我们手动监测变化

- 但如果有更复杂的需求，例如改变姓/名时，延迟1s再更新结果

    ```js
  handler(newVal, oldVal) {
      const first = newVal.firstname.slice(0, 3);
      const last = newVal.lastname;
      setTimeout(() => {
          this.fullname = `${first}·${last}`;
      }, 1000);
  }
    ```


    但是在计算属性中，因为return不能异步调用，所以**计算属性不能用异步任务**。以下的写法是错误的

    ```js
  fullname() {
      const first = this.firstname.slice(0, 3);
      const last = this.lastname;
      setTimeout(() => {
          return `${first}·${last}`;
      }, 1000);
  }
    ```




案例中另一个需要注意的地方：定时器函数中的回调使用的是箭头函数，因为这个函数不是Vue管理的（而是浏览器管理的），而且如果写成普通函数，this就是window（而不是vm），只用箭头函数才向上一层找this（vm对象）

**总结**：

- computed能完成的功能，watch都可以完成；但watch的某些功能（异步操作），computed不行

- 被Vue管理的函数不能写成箭头函数，但不被Vue管理的函数（定时器回调、Ajax回调、Promise回调）最好写成箭头函数，确保this指向vm/组件实例对象

### 绑定样式

#### class

```html
<div id="root">
    <div class="不变的类名" :class="变量名" @click="change_class"></div>
</div>
```


- **字符串写法**：适用于类名不确定，需要动态指定

    ```js
  const vm = new Vue({
      el: "#root",
      data: {
          变量名: 类名
      },
      methods: {
          change_class() { //也可以绑定事件
              this.变量名 = 类名;
          }
      }
  });
    ```


    Vue会自动将两个class中的类名合并

- **数组写法**：适用于类名个数和名称都不确定

    ```js
  const vm = new Vue({
      el: "#root",
      data:{
          变量名: ['类名1', '类名2', ]
      },
      methods: {
          change_class() {
              this.变量名.shift(); //可以更改类名数组
          }
      }
  });
    ```


- **对象写法**：适用于类名个数和名称都确定，但要动态决定用不用

    ```js
  const vm = new Vue({
      el: "#root",
      data:{
          变量名: {
              '类名1': true, //true就是使用该类名
              '类名2':false //false就是不使用该类名
          }
      },
      methods: {
          change_class() {
              this.变量名.类名1 = false;
          }
      }
  });
    ```




例：

```html
<div id="root">
    <div class="basic" :class="mood"></div>
    <div class="basic" :class="class_arr"></div>
    <div class="basic" :class="class_obj"></div>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            mood: 'mood1',
            class_arr: ['mood1', 'mood2'],
            class_obj: {
                mood1: true,
                mood2: false
            }
        }
    });
</script>
```


![绑定样式1](/upload/md-image/vue/绑定样式1.png){:width="300px" height="300px"}

#### style等其它标签属性

```html
<div id="root">
    <!-- style还可以替换成checked等其它标签属性 -->
    <div :style="变量名1"></div>
    <!-- 或者 -->
    <div :style="{样式名: 变量名2}"></div>
    <!-- 如果样式名与变量名2相同，可以简写为： -->
    <div :style="{样式名}"></div>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            变量名1: {
                样式名: 样式值,
            },
            变量名2: 样式值
        }
    });
</script>
```


例：

```html
<div id="root">
    <div :style="style_obj">abc</div>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            style_obj: {
                fontSize: '40px', //用小驼峰
                color: 'red'
            }
        }
    });
</script>
```


注：也可以写成数组的形式，但使用较少，主要用于合并两个`style_obj`

```html
<div id="root">
    <div :style="[style_obj1, style_obj2]">abc</div>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            style_obj1: {
                fontSize: '40px', //用小驼峰
                color: 'red'
            },
            style_obj2: {
                backgroundColor: 'white'
            }
        }
    });
</script>
```


### 渲染

#### 条件渲染与template标签

`v-show="变量/表达式"`或`v-if="变量/表达式"`控制标签的显示和隐藏

- `变量/表达式`值应为布尔值true/false

- 区别：`v-show`是给标签加上属性`display:none`，而`v-if`直接把不展示的DOM移除，移除后就无法获得该节点

- 如果变量的变化很频繁，就用`v-show`，因为vif不断在页面中增删节点浪费性能；反之就用`v-if`



```html
<div id="root">
    <div v-show="false"></div>
    <div v-show="1 === 1"></div>
    <div v-show="is_show"></div>
    <div v-if="true"></div>
    <div v-if="1 !== 1"></div>
    <div v-if="!is_show"></div>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            is_show: true
        }
    });
</script>
```


![渲染1](/upload/md-image/vue/渲染1.png){:width="300px" height="300px"}

除了`v-if`，还有`v-else-if`和`v-else`，逻辑与正常的elseif相同

- 注意：如果使用这种结构，它们中间不能被打断，这几个标签必须紧密连接，否则会报错

```html
<div v-if="n===1"></div>
<div v-else-if="n===2"></div>
<!-- <div>不能被打断</div> -->
<div v-else-if="n===3"></div>
<div v-else></div>
```




---



如果有多个标签需要同时显示隐藏，可以使用div将它们包起来，但这样会破坏标签结构。解决方法：`<template v-if="变量/表达式">标签</template>`，这样不会破坏结构

```html
<div id="root">
    <template v-if="true">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </template>
</div>
```


![渲染2](/upload/md-image/vue/渲染2.png){:width="200px" height="200px"}

注意：`<template>`只能用`v-if`

#### 列表渲染

##### 基本形式

`v-for="数组元素变量 in 数组变量" :key="数组元素标识符"`，意思是遍历该数组中的元素，类似于`for i in items`，其中`:key`作为每个节点的标识，每个标识不能相同

```html
<div id="root">
    <ul>
        <li v-for="p in persons" :key="p.id">
            {{p.name}}-{{p.age}}
        </li>
    </ul>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            persons: [
                { id: 1, name: "abc", age: 18 },
                { id: 2, name: "bcd", age: 19 },
                { id: 3, name: "cde", age: 20 },
            ]
        }
    });
</script>
```


![渲染3](/upload/md-image/vue/渲染3.png){:width="100px" height="100px"}

扩展形式：`v-for="(数组元素变量, 索引号) in 数组变量"`，其中`索引号`从0开始，可作为`:key`的值

```html
<ul>
    <li v-for="(p, index) in persons" :key="index">
        第{{index+1}}个person：{{p.name}}-{{p.age}}
    </li>
</ul>
```


![渲染4](/upload/md-image/vue/渲染4.png){:width="250px" height="250px"}

补充：

- vfor里面的in还可以写成of

- 遍历字符串（使用较少）：形式同数组，每个字符被当成一个元素

- 遍历对象：`v-for="(value, key) in 对象"`

    ```html
  <div id="root">
      <ul>
          <li v-for="(value, key) in person" :key="key">
              {{key}}：{{value}}
          </li>
      </ul>
  </div>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              person: { name: "abc", age: 18 },
          }
      });
  </script>
    ```


    ![渲染5](/upload/md-image/vue/渲染5.png){:width="150px" height="150px"}

- 遍历指定次数（使用较少）：`v-for="(number, index) in 次数"`

    ```html
  <ul>
      <li v-for="(num, index) in 5" :key="index">
          {{num}}--{{index}}
      </li>
  </ul>
    ```


    ![渲染6](/upload/md-image/vue/渲染6.png){:width="150px" height="150px"}

##### key的作用与原理

**作用**：给节点进行标识，相当于主键。当数据发生变化时，Vue会使用key对新旧虚拟DOM进行比较，决定怎么生成真实DOM

![渲染7](/upload/md-image/vue/渲染7.png){:width="800px" height="800px"}

**对比过程（Diff算法）**：依次读取新虚拟DOM元素的key

- 旧虚拟DOM中找到了与新虚拟DOM相同的key：

  - 若虚拟DOM中内容没变，直接使用之前的真实DOM

  - 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM

- 旧虚拟DOM中未找到与新虚拟DOM相同的key：创建新的真实DOM，随后渲染到到页面



以上图新虚拟DOM的第一个元素为例，它的key为0，旧虚拟DOM中也有key=0的元素；先对比HTML文本`老刘-30`，不同，生成新的虚拟DOM；再对比input标签，相同（虚拟DOM中不存储输入框的value），直接复用，因此输入框中有文字残留



**结论：使用index作为key时**，

- 若对数据进行逆序添加、逆序删除等破坏顺序操作：会产生没有必要的真实DOM更新，界面效果没问题，但效率低

- 如果结构中还包含输入类的DOM：会产生错误DOM更新，界面有问题



如果使用数据标识id作为key就不会出现这种问题：

![渲染8](/upload/md-image/vue/渲染8.png){:width="800px" height="800px"}

- 只有`老刘-30`的文本和它的输入框是重新生成的，其它都是复用的



补充：**如果在vfor中不写key，Vue会自动将索引作为key**



**如何选择key**：

- 使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等

- 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于展示数据，就可以使用index作为key

#### 列表过滤

例：读取输入框中输入，在指定数据中筛选并展示包含该输入的内容

```js
const data = [
    { id: 1, name: "abc", age: 18, sex: "male" },
    { id: 2, name: "bcd", age: 19, sex: "male" },
    { id: 3, name: "cde", age: 20, sex: "female" },
];
```


- 监测属性写法：

    ```html
  <div id="root">
      <input type="text" v-model="key_word">
      <ul>
          <li v-for="(p, index) in persons" :key="p.id">
              {{p.name}}--{{p.age}}--{{p.sex}}
          </li>
      </ul>
  </div>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              key_word: "",
              persons: data,
          },
          //也可以把数据写到data中，然后新建另一个变量存储结果
          //但一定不能直接修改源数据
          watch: {
              key_word(nval) {
                  this.persons = data.filter((p) => {
                      return p.name.includes(nval);
                  });
              }
          }
      });
  </script>
    ```


- 计算属性写法：

    ```html
  <div id="root">
      <input type="text" v-model="key_word">
      <ul>
          <li v-for="(p, index) in fil_persons" :key="p.id">
              {{p.name}}--{{p.age}}--{{p.sex}}
          </li>
      </ul>
  </div>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              key_word: "",
          },
          computed: {
              fil_persons() {
                  return data.filter((p) => {
                      return p.name.includes(this.key_word);
                  });
              }
          }
      });
  </script>
    ```


注：当computed和watch都能实现时，优先使用computed

#### 列表排序

两个按钮，一个点击后按年龄升序排列，另一个降序排列

- 设置一个变量存储按哪种方式排序

- 在过滤完后，根据排序方式进行排序



```html
<div id="root">
    <input type="text" v-model="key_word">
    <button @click="sort_type = 2">按年龄升序</button>
    <button @click="sort_type = 1">按年龄降序</button>
    <button @click="sort_type = 0">恢复原顺序</button>
    <ul>
        <li v-for="(p, index) in fil_persons" :key="p.id">
            {{p.name}}--{{p.age}}--{{p.sex}}
        </li>
    </ul>
</div>
<script>
    const data = [
        { id: 1, name: "abc", age: 19, sex: "male" },
        { id: 2, name: "bcd", age: 18, sex: "male" },
        { id: 3, name: "cde", age: 20, sex: "female" },
    ];
    const vm = new Vue({
        el: "#root",
        data: {
            key_word: "",
            sort_type: 0 //0原顺序 1降序 2升序
        },
        computed: {
            fil_persons() {
                const res = data.filter((p) => {
                    return p.name.includes(this.key_word);
                });
                if (this.sort_type) {
                    res.sort((a, b) => {
                        return this.sort_type === 2 ? a.age - b.age : b.age - a.age;
                    });
                }
                return res;
            }
        }
    });
</script>
```


### 监视数据变化的原理

#### 对象

通过vm中的Observe对象，其中包含每个属性的getter和setter，只要更改数据，就会触发setter，进而重新生成虚拟DOM

一个简单的实现：

```js
let new_data = { id: 1, name: "abc", age: 19, sex: "male" };
function Observe(obj) { //监视obj中属性变化的类
    const keys = Object.keys(obj); //将data中所有的属性汇总成一个数组
    keys.forEach((key) => {
        Object.defineProperty(this, key, {
            get() {
                return obj[key];
            },
            set(val) {
                console.log(`${key}属性被改变，新值为${key}，需要重新解析模板生成虚拟DOM`);
                obj[key] = val;
            }
        })
    })
}
const obs = new Observe(new_data); //data上有什么属性，obs上就有什么属性
const my_vm = {};
my_vm._data = new_data = obs;
```


![监视数据变化的原理1](/upload/md-image/vue/监视数据变化的原理1.png){:width="400px" height="400px"}

但这个与Vue中的还有很大差异，比如这个必须要`vm._data.属性`进行修改，而Vue中可以直接`vm.属性`；而且这个只能监测一层（如果属性值是一个对象就监视不到），Vue可以递归监测（深拷贝）

#### 动态添加对象属性--set方法

如果data中存储了一个对象，现在想在创建完vm后给该对象添加属性，不能简单地使用`vm.目标对象.新属性=新值`，因为这样添加时没有数据代理（没有对应的setter和getter）

两种方法：

- `Vue.set(vm.目标对象, 新属性, 新属性值)`

- `vm.$set(vm.目标对象, 新属性, 新属性值)`



之后就可以使用`vm.目标对象.新属性=新值`的方法动态更改了

例：两个按钮，点击后分别添加性别和id

```html
<div id="root">
    <p>姓名：{{person.name}}</p>
    <p>年龄：{{person.age}}</p>
    <p v-if="person.sex">性别：{{person.sex}}</p>
    <p v-if="person.id">id：{{person.id}}</p>
    <button @click="add_sex">添加性别为男</button>
    <button @click="add_id">添加id为1</button>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            person: {
                name: "abc",
                age: 19
            }
        },
        methods: {
            add_sex() {
                Vue.set(this.person, "sex", "男");
            },
            add_id() {
                this.$set(this.person, "id", "1");
            }
        }
    });
</script>
```


局限性：只能给data中某个对象添加属性，不能直接给data添加，例如`Vue.set(vm)`或`Vue.set(vm._data)`都是不行的

#### 数组

直接使用`vm.arr[0]=xxx`对数组进行修改是监测不到的，只有使用这7种数组的方法才能被监测到：`push`/`pop`/`shift`/`unshift`/`splice`/`sort`/`reverse`，它们都直接更改原数组，对于`filter`这种不更改的就监测不到

原因：Vue重写了这些方法（在原型链上），新方法除了调用了普通数组的原方法，还调用了重新解析模板生成虚拟DOM的方法



---



除此之外，还能使用上面提到的set系列方法：

- `Vue.set(vm.目标数组, 索引, 新值)`

- `vm.$set(vm.目标数组, 索引, 新值)`



```html
<div id="root">
    <ul>
        <li v-for="(p, index) in persons" :key="p.id">
            {{p.name}}--{{p.age}}--{{p.sex}}
        </li>
    </ul>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            persons: [
                { id: 1, name: "abc", age: 19, sex: "male" },
                { id: 2, name: "bcd", age: 18, sex: "male" },
                { id: 3, name: "cde", age: 20, sex: "female" },
            ]
        }
    });
    setTimeout(() => {
        vm.persons.push({ id: 4, name: "def", age: 21, sex: "female" });
        Vue.set(vm.persons, 0, { id: 1, name: "ABC", age: 19, sex: "male" });
        vm.$set(vm.persons, 1, { id: 2, name: "BCD", age: 18, sex: "male" })
    }, 1000);
</script>
```


![监视数据变化的原理2](/upload/md-image/vue/监视数据变化的原理2.png){:width="200px" height="200px"}

注：向数组里添加的对象也是响应式的

#### 总结

- vue会监视data中所有层次的数据

- 如何监测对象中的数据：通过setter实现监视，且要在`new Vue`时就传入要监测的数据。对象中后追加的属性，Vue默认不做响应式处理

- 给后添加的对象属性做响应式：

  - `Vue.set(vm.目标对象, 新属性, 新属性值)`

  - `vm.$set(vm.目标对象, 新属性, 新属性值)`

- 如何监测数组中的数据：通过包裹数组更新元素的方法实现，本质就是做了两件事：

  - 调用原生对应的方法对数组进行更新

  - 重新解析模板，进而更新页面

- 修改数组中的某个元素：

  - 数组的7个方法：`push`/`pop`/`shift`/`unshift`/`splice`/`sort`/`reverse`

  - `Vue.set(vm.目标数组, 索引, 新值)`

  - `vm.$set(vm.目标数组, 索引, 新值)`

  - 如果想使用filter这种不修改原数组的方法：`vm.数组 = vm.数组.filter(...)`

  

注意：**set系列方法不能给vm或vm的根数据对象`_data`添加属性**



---



补充：什么是**数据劫持**？

将data中的属性添加getter/setter系列方法，使其实现响应式（修改数据时，就被setter“劫持”，进而重新解析模板）

### 收集表单数据

- 输入框`text`/`password`/`textarea`：v-model收集的是value值（用户输入）

- 单选框`radio`/下拉列表`select-option`：v-model收集的是value值，且要给标签配置value值

- 复选框`checkbox`：

  - 没有配置input的value属性时，收集的就是checked（勾选/未勾选，布尔值）

  - 配置input的value属性

    - 如果v-model的初始值是非数组，收集的就是checked（勾选/未勾选，布尔值）

    - 如果v-model的初始值是数组，那么收集的的就是value组成的数组



**v-model的三个修饰符**：

- lazy：失去焦点再收集数据

- number：输入字符串转为有效的数字

- trim：输入首尾空格过滤



在实际使用时，通常会把一个表单的所有项都归入一个对象中，之后直接用`this.对象`或`vm.对象`获取

**例**：

![收集表单数据1](/upload/md-image/vue/收集表单数据1.png){:width="300px" height="300px"}

```html
<div id="root">
    <form>
        <label for="account">账号：</label><input type="text" id="account" v-model.trim="user_info.account"> <br><br>
        <label for="password">密码：</label><input type="password" id="password" v-model="user_info.password"> <br><br>
        <label for="age">年龄：</label><input type="number" id="age" v-model.number="user_info.age"> <br><br>
        性别：
        <label for="male">男</label><input type="radio" name="sex" value="male" id="male" v-model="user_info.sex">
        <label for="female">女</label><input type="radio" name="sex" value="female" id="female" v-model="user_info.sex">
        <br><br>
        爱好：
        <label for="study">学习</label><input type="checkbox" value="study" id="study" v-model="user_info.hobby">
        <label for="game">打游戏</label><input type="checkbox" value="game" id="game" v-model="user_info.hobby">
        所属校区：
        <select v-model="user_info.city">
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
        </select> <br><br>
        <label for="other_info">其他信息：</label><textarea id="other_info" v-model.lazy="user_info.other_info"></textarea>
        <br><br>
        <input type="checkbox" v-model="user_info.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
        <button @click.prevent="submit">提交</button>
    </form>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            user_info: {
                account: "",
                password: "",
                age: "",
                sex: "male", //设置默认值
                hobby: [],
                city: "beijing",
                other_info: "",
                agree: false
            }
        },
        methods: {
            submit() {
                for (const n in this.user_info) {
                    console.log(`${n}:${this.user_info[n]}`);
                }
                console.log(JSON.stringify(this.user_info)); //也可以转成JSON格式
            }
        }
    });
</script>
```


![收集表单数据2](/upload/md-image/vue/收集表单数据2.png){:width="500px" height="500px"}

### 过滤器

对要显示的数据进行特定格式化后再显示，适用于一些简单的逻辑处理，不改变原数据

- 它的作用类似于computed和methods，在Vue3中已被弃用，因此不是必须掌握的

#### 局部过滤器

即只能在一个vm内使用的过滤器

```html
<div>{{变量名 | 过滤器名}}</div>
<div>{{变量名 | 过滤器名(需要传入的参数)}}</div>

<!-- 除了插值语法，还可以用在： -->
<div :x="变量名 | 过滤器名"></div>

<!-- 但不能在v-model中使用 -->
<script>
    const vm = new Vue({
        filters:{
            过滤器名(val, arg){ //val就是上面{{}}中变量，arg是传入的参数，不传就没有arg
                return res; //返回值即为{{}}的替换值
            }
        }
    });
</script>
```


过滤器还可以**串联**：`{{变量名 | 过滤器1 | 过滤器2 | ...}}`，就像Linux的管道运算，前一个的返回值作为下一个的参数

**例：通过时间戳计算当前时间**，使用`day.js`

- 计算属性：

    ```html
  <div id="root">
      <p>现在时间的时间戳是：{{time}}</p>
      <p>格式化后的时间是：{{fmtTime}}</p>
  </div>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              time: Date.now()
          },
          computed: {
              fmtTime() {
                  return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
              }
          }
      });
  </script>
    ```


- 过滤器：

    ```html
  <div id="root">
      <p>现在时间的时间戳是：{{time}}</p>
      <p>格式化后的时间是：{{time | time_formater1}}</p>
      <p>格式化后的时间是：{{time | time_formater2('YYYY-MM-DD')}}</p>
  </div>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              time: Date.now()
          },
          filters: {
              time_formater1(v) {
                  return dayjs(v).format('YYYY-MM-DD HH:mm:ss');
              },
              time_formater2(v, str = 'YYYY-MM-DD HH:mm:ss') { //设置默认值
                  return dayjs(v).format(str);
              }
          }
      });
  </script>
    ```


    ![过滤器1](/upload/md-image/vue/过滤器1.png){:width="350px" height="350px"}

- 过滤器串联：

    ```html
  <div id="root">
      <p>格式化后的时间是：{{time | time_formater('YYYY-MM-DD') | my_slice}}</p>
  </div>
  <script>
      const vm = new Vue({
          el: "#root",
          data: {
              time: Date.now()
          },
          filters: {
              time_formater(v, str = 'YYYY-MM-DD HH:mm:ss') {
                  return dayjs(v).format(str);
              },
              my_slice(v) { //只截取前4位年份
                  return v.slice(0, 4);
              }
          }
      });
  </script>
    ```


#### 全局过滤器

即在所有vm中都可以使用的过滤器

```js
/* 使用方法同局部过滤器 */
Vue.filter(过滤器名, function (val, arg) {
    return res;
});
```


例：

```html
<div id="root">
    <p>格式化后的时间是：{{time | time_formater('YYYY-MM-DD')}}</p>

</div>
<div id="root2">
    <p>格式化后的时间是：{{time | time_formater('YYYY')}}</p>

</div>
<script>
    const time = Date.now();
    Vue.filter('time_formater', function (v, str = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs(v).format(str);
    });
    const vm = new Vue({
        el: "#root",
        data: {
            time: time
        }
    });
    const vm2 = new Vue({
        el: "#root2",
        data: {
            time: time
        }
    });
</script>
```


![过滤器2](/upload/md-image/vue/过滤器2.png){:width="250px" height="250px"}

### 指令

#### 内置指令

- `v-bind`：单向绑定解析表达式，可简写为 `:xxx`

- `v-model`：双向数据绑定

- `v-for`：遍历数组/对象/字符串

- `v-on`：绑定事件监听，可简写为`@`

- `v-if`：条件渲染（动态控制节点是否存存在）

- `v-else`：条件渲染（动态控制节点是否存存在）

- `v-show`：条件渲染（动态控制节点是否展示）

- `v-text`：向其所在的节点中渲染文本内容

  - 与插值语法的区别：`v-text="变量"`会替换掉节点中的内容，`{{变量}}`则不会；它们都不会解析标签

  - 更常用的还是插值语法，`v-text`只适用于标签内文本都由某变量指定，而不进行字符串拼接的情况

- `v-html`：向其所在的节点中渲染文本内容，同时解析标签

  - 在网站上动态渲染任意HTML是很危险的：如果直接将用户输入解析成标签，可能导致注入类攻击(XSS)。一定要在可信的内容上使用，不能用在用户提交的内容上

- `v-cloak`：一个标签上的特殊属性，Vue示例创建完并接管容器后，会删掉该属性；通常配合css属性选择器`[v-cloak]{}`使用，用于解决网速慢时页面展示`{{xxx}}`的功能

- `v-once`：一个标签上的特殊属性，所在节点只动态渲染一次，在初次动态后就成为静态内容，就算数据

- `v-pre`：一个标签上的特殊属性，跳过其所在节点的编译（节点加上该属性后，插值语法等所有和Vue相关的指令都不会被执行）。可利用它跳过没有使用指令/插值语法的节点，会加快编译



```html
<div id="root" v-cloak>
    <!-- 如果不加v-cloak，页面就会显示“你好，{{name}}” -->
    <p>你好，{{name}}</p>
    <p v-text="name"></p>
    <p v-text="str"></p>
    <p v-html="str"></p>
    <p>当前的n值：{{n}}</p>
    <p v-once>初始的的n值：{{n}}</p>
    <p v-pre>没有Vue语法的可以用v-pre</p>
    <p v-pre>{{n}}不会解析Vue语法</p>
</div>
<script>
    setTimeout(() => { //延迟1s创建vm，展示v-cloak的作用
        const vm = new Vue({
            el: "#root",
            data: {
                name: "abc",
                str: "<h3>abc</h3>",
                n: 1
            }
        });
        setInterval(() => vm.n++, 1000);
    }, 1000);
</script>
```


![指令1](/upload/md-image/vue/指令1.png){:width="200px" height="200px"}

#### 自定义指令

##### 函数式

```html
<p v-自定义指令名="变量"></p>
<script>
    new Vue({
        directives: {
            自定义指令名(element, binding){
                //element是指令所在标签的DOM对象
                //binding是相关属性，常用binding.value表示接收到的变量值
            }
        }
    });
</script>
```


binding对象：

![指令2](/upload/md-image/vue/指令2.png){:width="800px" height="800px"}

**什么时候调用**：

- 指令与元素成功绑定时（就是初次渲染时）

- 指令所在的模板被重新解析时

  注：虽然上面的意思类似于“传入的变量改变时”，但这不是准确的描述，假如`#root`中还有一个标签用了另一个变量`m`，当m改变时，该指令也会被调用



**例：定义一个`v-big`指令，和vtext类似，但会把绑定的数值放大10倍**

```html
<div id="root">
    <p>当前的n值是<span v-text="n"></span></p>
    <p>放大10倍后的n值是<span v-big="n"></span></p>
    <button @click="n++">点击令n+1</button>
    <p>另一个变量{{m}}
    <p>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            n: 1,
            m: 1
        },
        directives: {
            big(element, binding) {
                element.innerText = binding.value * 10;
                console.log("调用了big指令");
            }
        }
    });
    setInterval(() => vm.m++, 1000);
</script>
```


![指令3](/upload/md-image/vue/指令3.png){:width="200px" height="200px"}

##### 对象式

```html
<p v-自定义指令名="变量"></p>
<script>
    new Vue({
        directives: {
            自定义指令名:{
                bind(element, binding){},
                inserted(element, binding){},
                update(element, binding){}
            }
        }
    });
</script>
```


- `bind`函数在指令与元素成功绑定时调用（与函数式相同）

- `inserted`函数在指令所在元素被插入页面时调用

- `update`函数在指令所在模板被重新解析时调用



因为bind和update函数想执行的功能往往相同，所以Vue才提供了函数式的写法，函数式就相当于只写了bind和update。当想要进行获取焦点、获取节点的父子兄弟元素时，就需要对象式的inserted



**例：定义一个`v-fbind`指令，和vbind类似，但可以让其所绑定的input元素默认获取焦点**

- 问题：获取焦点`input.focus()`必须放在把元素放入页面之后，而函数式指令与元素成功绑定时就会被调用，而不是在创建时。虽然我们写的HTML标签是在创建指令之前，但Vue会先把标签变成虚拟DOM（此时发生绑定），之后再渲染到页面上



```html
<div id="root">
    <p>{{n}}</p>
    <button @click="n++">点击令n+1</button>
    <input type="text" v-fbind:value="n">
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            n: 1
        },
        directives: {
            fbind: {
                bind(element, binding) {
                    console.log("bind被调用");
                    element.value = binding.value;
                },
                inserted(element, binding) {
                    console.log("inserted被调用");
                    element.focus();
                },
                update(element, binding) {
                    console.log("update被调用");
                    element.value = binding.value;
                }
            }
        }
    });
</script>
```


![指令4](/upload/md-image/vue/指令4.png){:width="250px" height="250px"}

##### 需要注意的问题

- 如果自定义指令名需要用多个单词，用`-`连接（不要用驼峰），并在js代码中给属性名加上引号

    ```html
  <p v-big-number="变量"></p>
  <script>
      ...
      'big-number'(){}
      ...
  </script>
    ```


- 所有指令相关的函数内的`this`都是`window`，而不是vm

    ```js
  ...
  big(element, binding) {this},
  fbind: {
      bind(element, binding) {this},
      inserted(element, binding) {this},
      update(element, binding) {this}
  }
  ...
    ```


- 也有全局和局部两种，上面讲的都是局部，全局的写法类似[过滤器](#全局过滤器)

    ```js
  /* 函数式 */
  Vue.directive('big',function(element, binding){});
  /* 对象式 */
  Vue.directive('fbind',{
      bind(element, binding) {this},
      inserted(element, binding) {this},
      update(element, binding) {this}
  });
    ```


### 生命周期

**生命周期**：

- 也称为**生命周期回调函数**/**生命周期函数**/**生命周期钩子**

- 是Vue在关键时刻调用的一些特殊函数

- 名称不可更改，内容自定义

- this是vm/组件实例对象



![生命周期1](/upload/md-image/vue/生命周期.png){:width="1000px" height="1000px"}

图中红色框是生命周期（总共8个4对），其它的都是状态

- 创建Vue实例`new Vue()`

- 初始化生命周期、事件，数据代理未开始

- `beforeCreate`：无法通过vm访问到data和methods

  注意：这里的create指的是数据监测和代理创建之前，而不是vm创建之前

- 初始化数据监测和代理

- `created`：可以通过vm访问到data和methods

- Vue开始解析模板，生成虚拟DOM（在内存中）

  - 如果没有`el`配置项，就等待`vm.$mount(el)`调用，如果之后不调用，就不会往下进行

  - 再看有没有`template`配置项，该配置项接收一个HTML标签字符串（只能有一个根节点）。如果有，就用它完全替换`el`配置项中的模板；如果没有，就把`el`指定的DOM整个当作模板

- `beforeMount`：页面呈现未经Vue编译的DOM，对DOM的操作**最终**不生效（会被Vue的虚拟DOM覆盖）

- 将内存中虚拟DOM转为真实DOM插入页面

- `mounted`：页面呈现编译后的DOM，对DOM的操作有效（但尽量不要这样）。初始化过程结束，一般在此进行：开启定时器、发生请求等操作

- 当页面改变时：

  - `beforeUpdate`：数据是新的，但页面是旧的（页面未与数据保持一致）

  - 根据新数据生成新虚拟DOM，与旧虚拟DOM比较，完成页面更新（Model->View的更新）

  - `updated`：数据和页面都是新的（页面与数据保持一致）

- 调用`vm.$destroy()`，销毁vm对象

  通常不会调用这个方法

- `beforeDestroy`：销毁之前，vm上的数据方法仍可用，通常在此阶段关闭定时器、取消订阅、解绑自定义事件等

  注意：该阶段虽然能够访问数据/方法，但不能进行数据修改

- 执行销毁操作，解绑vm的全部指令和事件监听

- `destroyed`：使用很少



```js
new Vue({
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
});
```


总结：

![生命周期2](/upload/md-image/vue/生命周期2.png){:width="450px" height="450px"}

- 初始化在`mounted`

- 销毁在`beforeDestroy`

  销毁后，

  - 在Vue开发者工具中就看不到vm了

  - 自定义事件会失效，但原生DOM事件仍然有效

  - 通常不在这里面操作数据，因为数据修改不触发更新流程



例：使用js实现一个opacity逐渐降低的标签，同时设置一个按钮，点击后销毁vm对象使透明度停止变化

```html
<div id="root">
    <h2 :style="{opacity}">透明度变化的标签</h2>
    <button @click="stop">点击停止变换</button>
</div>
<script>
    const vm = new Vue({
        el: "#root",
        data: {
            opacity: 1,
            interval_id: 0
        },
        methods: {
            stop() {
                this.$destroy();
            }
        },
        mounted() {
            this.interval_id = setInterval(() => {
                this.opacity -= 0.01;
                if (this.opacity <= 0) this.opacity = 1;
            }, 16);
        },
        beforeDestroy() {
            clearInterval(this.interval_id);
        }
    });
</script>
```


为什么要在`beforeDestroy`中停止定时器：为了确保当不知道vm是何时被销毁时（不显式调用`vm.$destroy()`时），定时器也能正常被停止

### 组件

传统方式编写应用：

- 依赖关系混乱，不好维护

- 代码复用率低



**组件**：实现应用中**局部**功能**代码**和**资源**的集合

- 代码：HTML/JS/CSS

- 资源：MP3/MP4/ttf/zip等



**组件的作用**：复用编码、简化项目编码、提高运行效率

**组件的分类**：

- 非单文件组件：一个文件中包含有n个组件

- 单文件组件（常用）：一个文件中只包含有1个组件



**模块**：向外提供特定功能的js程序（一般是一个js文件）

**模块化**：当应用中的js都是以模块来编写的，则该应用就是一个模块化的应用

**组件化**：当应用中的功能都是以多组件的方式来编写的，则该应用就是一个组件化的应用

#### 非单文件组件

```html
<script>
/* 1.创建组件 */
const 组件 = Vue.extend({
    template: `HTML标签`,
    data(){
        return{
            变量名: 变量值
        }
    },
    //其它配置项（与vm相同）
});
/* 2-1.创建vm（局部注册组件，常用） */
const vm = new Vue({
    el: 容器,
    components: {
        组件名: 组件,
        组件, //更推荐这样写，即组件名=之前创建的组件变量名
    }
});
/* 2-2.全局注册组件 */
Vue.component(组件名, 组件);
</script>
<div id="root">
    <!-- 3.使用组件 -->
    <组件名></组件名>
</div>
```


- 一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器

- data配置项必须使用函数式，防止一个组件被多次使用时存在数据的引用关系（对象默认是浅拷贝）



**注意事项**：

- **组件名**：

  - 如果组件名是一个单词，可以首字母大写`School`，也可以小写`school`；如果是多个单词，可以全部小写、中间用`-`连接（`my-school`，此时在注册组件时两边需要加引号），也可以每个单词首字母都大写`MySchool`（但此种方法需要Vue脚手架支持）

  - 组件名需回避HTML中已有的标签

  - 在网页的Vue开发者工具中，组件名默认是`new Vue`配置项中的组件名，也可以在`Vue.extend`的配置项中使用`name:组件名`进行指定，这样无论注册时/使用时用的什么名，在开发者工具中都会以指定的组件名显示（通常用于组件库中）

- **使用组件**：

  - 正常的写法是`<组件名></组件名>`

  - 也可以写成`<组件名/>`，但此种方法需要Vue脚手架支持。如果不在，该写法会导致后续组件不能渲染

- **创建组件**：

  - 正常方式：`const 组件 = Vue.extend({配置项})`

  - 也可以简写成：`const 组件 = {配置项}`，这种方法更常用



  在注册组件时，Vue会检测属性值是不是对象，如果是就会调用extend方法



例：

```html
<div id="root">
    <h2>{{msg}}</h2>
    <school></school>
    <hr>
    <xuesheng></xuesheng>
</div>
<script>
    const school = Vue.extend({
        template: `
            <div>
                <h2>学校名称：{{name}}</h2>
                <h2>学校地址：{{addr}}</h2>
            </div>
        `,
        data() {
            return {
                name: "abcSCHOOL",
                addr: "x-x-x"
            };
        }
    });
    const student = Vue.extend({
        template: `
            <div>
                <h2>学生名称：{{name}}</h2>
                <h2>学生年龄：{{age}}</h2>
            </div>
        `,
        data() {
            return {
                name: "abc",
                age: 18
            };
        }
    });
    const vm = new Vue({
        el: "#root",
        components: {
            school,
            xuesheng: student //注：此处仅是为了演示两种写法
        },
        data: {
            msg: "创建两个组件"
        }
    });
</script>
```


![组件1](/upload/md-image/vue/组件1.png){:width="300px" height="300px"}



---



**组件的嵌套**：即在一个组件中注册另一个组件。如果是局部注册，在哪个组件里注册就只能在哪个组件里用

在开发中，常设置一个大的组件`app`，它里面包括其它所有的组件，这样vm只注册`app`组件即可

**例：实现组件结构**

- app

  - school

    - student

  - Hello



```html
<div id="root">
    <!-- 可以在root里写app标签，也可以在vm中用template -->
    <!-- <app></app> -->
</div>
<script>
    const student = { //注意子组件要在父组件之前定义
        template: `
            <div>
                <h2>学生名称：{{name}}</h2>
                <h2>学生年龄：{{age}}</h2>
            </div>
        `,
        data() {
            return {
                name: "abc",
                age: 18
            };
        }
    };
    const school = {
        template: `
            <div>
                <h2>学校名称：{{name}}</h2>
                <h2>学校地址：{{addr}}</h2>
                <student></student>
            </div>
        `,
        data() {
            return {
                name: "abcSCHOOL",
                addr: "x-x-x"
            };
        },
        components: {
            student
        }
    };
    const hello = {
        template: `
            <h1>{{msg}}</h1>
        `,
        data() {
            return {
                msg: "hello"
            };
        }
    };
    const app = {
        template: `
            <div>
                <hello></hello>
                <school></school>
            </div>
        `,
        components: {
            school,
            hello
        }
    };
    const vm = new Vue({
        template: `
            <app></app>
        `,
        el: "#root",
        components: {
            app
        }
    });
</script>
```


![组件2](/upload/md-image/vue/组件2.png){:width="350px" height="350px"}

#### VueComponent

组件本质是一个名为`VueComponent`的构造函数，由`Vue.extend`生成

- 我们只需要写`<school/>`或`<school></school>`，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行`new VueComponent(options)`

- 注意：每次调用`Vue.extend`，返回的都是一个全新的`VueComponent`（虽然这些`VueComponent`的内容完全相同）

  在Vue的源码中，extend函数是这样的：

    ```js
  Vue.extend = function (...){
      ...
      var Sub = function VueComponent(...){
          ...
      }
      ...
      return Sub;
  }
    ```


    其实就是一个闭包，所以每次extend返回的VueComponent都不同



**关于this指向**：

- 组件配置中（data、methods/watch/computed中的函数）：this均是**VueComponent实例对象**，常称为`vc`组件实例对象

- `new Vue`配置中：this均是`vm`



`vc`和`vm`的功能和使用方法是一样的，都有数据代理、监视、生命周期等，都可以通过`this.属性名`获取属性

**`vm`/`vc`如何管理子组件**：`vm.$children`/`vc.$children`

![组件3](/upload/md-image/vue/组件3.png){:width="800px" height="800px"}

注意：**`vc`和`vm`的不能画等号**，vc是`new VueComponent`，而vm是`new Vue`，最重要的是vc的配置对象没有`el`，而vm能通过`el`指定为哪个容器服务



---



**一个重要的内置关系**：`VueComponent.prototype.__proto__ === Vue.prototype`

- 其中`VueComponent`是`Vue.extend()`创建出的组件



```js
const VueComponent = Vue.extend({}); //这里的VueComponent是构造函数，不是它的实例对象vc
console.log(VueComponent.prototype.__proto__ === Vue.prototype); //true
```


![组件4](/upload/md-image/vue/组件4.png){:width="800px" height="800px"}

**为什么要有这个关系**：让vc可以访问到Vue原型上的属性方法

```html
<div id="root">
    <button @click="show">vm</button>
    <school></school>
</div>
<script>
    Vue.prototype.x = 1;
    const school = Vue.extend({ //school不是组件实例对象vc，而是VueComponent构造函数
        template: `
            <button @click="show">vc</button>
        `,
        methods: {
            show() {
                console.log(this === school); //false
                console.log(this.x); //1
            }
        }
    });
    const vm = new Vue({
        el: '#root',
        components: {
            school
        },
        methods: {
            show() {
                console.log(this === vm); //true
                console.log(this.x); //1
            }
        }
    });
</script>
```


#### 单文件组件

文件后缀为vue：`组件名.vue`

- 组件命名规则同前：

  - 如果一个单词：首字母大写/小写均可`school.vue`/`School.vue`

  - 如果多个单词：小写+横线连接`my-school.vue`，或大驼峰`MySchool.vue`



  实际开发中，常使用`School.vue`和`MySchool.vue`（为了与开发者工具中显示的名称相符）



**vue文件的三个标签**：

- template：组件的结构

- script：组件交互相关代码（数据方法等）

- style：组件的样式（避免非单文件组件中，css样式无法跟随组件的问题）



script标签中需要ES6的模块化写法，[参考文章](https://blog.csdn.net/Coder_xiaoxu/article/details/116789392)

```html
<!-- 安装扩展vetur，输入<后按tab即可自动补全 -->
<template>
    <!-- html -->
    <!-- 写的是非单文件组件中template配置项中的内容 -->
</template>
<script>
    //js
    import xxx from './xxx.vue'; //引入其它组件（可以没有），文件路径可以不写.vue
    export default {
        //组件配置项（即非单文件组件中Vue.extend({})里面除了template的内容）
    }
</script>
<style>
    /* css样式 */
    /* 此部分可以没有 */
</style>
```


除了各种组件vue文件，通常还要有：

- 一个`App.vue`，用于汇总所有组件

- 一个`main.js`，用于创建vm对象，并注册和使用App组件

  - 所有vue文件里都不能出现`new Vue`这种，必须要写在js中

- 一个`index.html`：用于创建容器（也可以在这里使用App组件）



例：

- `Test.vue`

    ```html
  <template>
      <div class="test">
          <h2>学生名称：{{name}}</h2>
          <h2>学生年龄：{{age}}</h2>
          <button @click="show"></button>
      </div>
  </template>
  <script>
      export default {
          name:"Test", //name属性值尽量与文件名保持一致
          data() {
              return {
                  name: "abc",
                  age: 18
              };
          },
          methods:{
              show(){
                  alert(`
                      学生名称：${this.name}
                      学生年龄：${this.age}
                  `);
              }
          }
      }
  </script>
  <style>
      .test{
          background-color: pink;
      }
  </style>
    ```


- `App.vue`

    ```html
  <template>
  <div>
      <Test/>
  </div>
  </template>
  <script>
      import Test from './Test.vue';
      export default {
          name:"App",
          components:{
              Test
          }
      }
  </script>
    ```


- `main.js`

    ```js
  import App from './App.vue';
  new Vue({
      el: "#root",
      template: `<App></App>`,
      components: {
          App
      }
  });
    ```


- `index.html`

    ```html
  <body>
      <div id="root">
          <!-- 如果不在main.js中用template，就要在这里显式写App标签 -->
          <!-- <App></App> -->
      </div>
  </body>
    ```




注意：此时直接用浏览器打开index.html是会报错的，因为浏览器默认不支持import写法，必须在脚手架环境下运行

{% endraw %}

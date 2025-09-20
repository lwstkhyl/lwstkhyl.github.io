---
layout: mypost
title: Vue--02脚手架
category: JS
subcategory: JS-Vue
---
来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH)

<!-- more -->

写在前面：此笔记来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH) / [资料下载](https://www.aliyundrive.com/s/B8sDe5u56BU/folder/61138e6e8582eecbe4c84546a1b2d58363d20bc0) / [我的练习文件（教程中的练习）](https://lwstkhyl.me/file?path=githubio%E7%AC%94%E8%AE%B0%E9%99%84%E5%B8%A6%E8%B5%84%E6%96%99%2Fvue)

### VueCLI简介

**Vue脚手架(Vue command line interface, Vue CLI)**：Vue官方提供的标准化开发工具（开发平台）

[Vue CLI官网](https://cli.vuejs.org/zh)

**安装**：

- 全局安装：`npm install -g @vue/cli`

- 在想要创建项目的目录下：`vue create 项目名`，会出现一个选项框选择用哪个Vue版本，选择`[Vue 2] babel, eslint`

- 进入项目目录中：`cd 项目名`

- 启动项目：`npm run serve`

- 最后进入`App running at`的网址就可以了



![VueCLI简介1](/upload/md-image/vue/VueCLI简介1.png){:width="500px" height="500px"}

#### 结构

![VueCLI简介2](/upload/md-image/vue/VueCLI简介2.png){:width="500px" height="500px"}

- `babel.config.js`：Babel控制文件，将ES6转为ES5，通常不需要手动写

- `package.json`/`package-lock.json`：包版本说明文件，提供三个命令

  - `serve`：开发时使用

  - `build`：完成所有代码，将整个工程变成浏览器可识别的HTML/css/js文件

  - `lint`：对所有js和vue文件进行语法检查（很少使用）

- `src`

  - `main.js`：整个项目的入口文件

    执行`npm run serve`后，首先执行的就是它

    ```js
  import Vue from 'vue' //引入Vue包
  import App from './App.vue' //引入App组件（所有组件的父组件）
  Vue.config.productionTip = false //关闭生产提示
  new Vue({ //创建Vue实例对象vm
       render: h => h(App), //将App组件放入容器中
  }).$mount('#app') //指定容器，也可以直接写到vm配置项el中
    ```


  - `App.vue`：App组件

  - `assets`：静态资源（logo图、视频等）

  - `components`：自己写出来的子组件

- `public`：包括网页图标`favicon.ico`和`index.html`

  ```html
  <head>
    <meta charset="utf-8">
    <!-- 针对IE浏览器的一个特殊配置，让IE以最高的渲染级别渲染页面 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 开启移动端的理想视口 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <!-- 网页图标（BASE_URL指public文件夹） -->
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <!-- 网页标题（就是项目名） -->
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!-- 如果浏览器不支持js，该段内容就会展示在页面上 -->
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <!-- 容器 -->
    <div id="app"></div>
  </body>
  ```




补充：

- CLI要求所有子组件都必须是多个单词，且使用大驼峰`MyStudent`命名

- 组件名不能与H5中的标签重名

#### render函数

```js
/* 这是VueCLI自带的main.js */
new Vue({
    render: h => h(App),
}).$mount('#app');
/* 如果改成下面这样，会报错 */
new Vue({
  el:'#app',
  template:`<App></App>`,
  components:{App}
});
```


两个解决方法：

- 引入完整版的Vue包（默认引入的Vue包没有模板解析器的功能，不能使用template配置项）

  将`import Vue from 'vue'`改为`import Vue from 'vue/dist/vue'`

- 使用render函数（VueCLI默认使用的方法）：`render: h => h(App)`



render的完整写法：

```js
render(createElement){ //createElement是一个用于创建标签的函数
  return createElement(标签名, 标签文本内容); //createElement('h1', "我是h1标签")
  //或者直接传入组件：createElement(组件名)
}
```


为什么默认使用精简版Vue包`vue.runtime.xxx.js`，而不是完整版`vue.js`：

- 模板解析器占了整个vue体积的1/3

- 项目写完后用webpack打包，此时模板解析器就没有用了，如果用的是完整版，打包后的文件仍包含模板解析器

  因此精简版的Vue可以节省体积

#### 默认配置

Vue脚手架隐藏了所有webpack相关的配置，如果想查看具体配置，需执行命令`vue inspect > output.js`，这会将配置对象写入`output.js`中，但这个文件是只读的，无法修改（或者说即使修改这个文件也不会对配置产生影响）

如果不修改配置文件，脚手架中哪些文件不能改：`public`中的图标和`index.html`、`src`文件夹、`main.js`

方法：在`package.json`同层文件夹中（即项目的最外层）创建一个新的文件`vue.config.js`，把想修改的配置写在里面，在webpack执行时，会把这个文件中的配置与默认配置进行合并

[具体的配置项](https://cli.vuejs.org/zh/config)



例：

```js
module.exports = {
  //修改入口文件
  pages: {
    index: {
      entry: 'src/index/main.js',
    }
  },
  //关闭语法检查（例如出现没有使用的变量会报错）
  lintOnSave: false
}
```


注意：

- 修改配置后，必须重启`npm run serve`

- `vue.config.js`中不要传入空对象，例如`pages:{index: {}}`，这样会把默认配置覆盖掉，使配置缺失

#### ref属性

用来给元素或子组件注册引用信息（替代原生js中document.queryselector）

- 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象vc



```html
<h1 ref="xxx"></h1>
<School ref="xxx"></School>
<script>
    export default {
      methods:{
        func(){
          this.$refs.xxx;
        }
      }
    }
</script>
```


例：

```html
<!-- App.vue -->
<template>
<div>
    <h1 ref="my_h1">{{msg}}</h1>
    <MyStudent ref="my_student"/>
    <button @click="showDOM">showDOM</button>
</div>
</template>
<script>
    import MyStudent from './components/MyStudent.vue';
    export default {
        name:"App",
        components:{
            MyStudent
        },
        data() {
            return {
                msg:"hello Vue",
            }
        },
        methods: {
            showDOM(){
                console.log(this.$refs);    
                console.log(this.$refs.my_h1); 
                console.log(this.$refs.my_student); 
            }
        },
    }
</script>
```


![VueCLI简介3](/upload/md-image/vue/VueCLI简介3.png){:width="300px" height="300px"}

#### props配置

用于向组件中传入参数

```html
<!-- App.vue（使用组件的地方） -->
<School 参数名n="参数值n" ></School>
<!-- School.vue（声明组件的地方） -->
{{参数名n}} <!-- 参数就相当于data中的变量，使用方法相同 -->
<script>
    export default {
      data(){return{}}, //data中不能出现传入的参数
      /* 第一种接收方法：简单接收（最常用） */
      props:['参数名1', '参数名2', ...], //顺序不非得相同
      /* 第二种接收方法：限制参数类型 */
      props:{
        参数名1: 类型(String/Number等),
        参数名2: 类型,
        ... //如果传来的数据不符合，控制台会输出警告（但不报错，且仍按传来数据原本的类型进行处理）
      },
      /* 第三种接收方法：对参数进行更多的限制 */
      props:{
        参数名1(){
          type: 类型(String/Number等), //限制参数类型
          required: true, //该参数是否必要（是否必须传入该参数），默认为false
          default: 默认值 //设置参数默认值
        },
        ... //一般情况下，required和default不同时出现
      },
    }
</script>
```


例：

```html
<!-- App.vue -->
 <template>
<div>
    <h1>{{msg}}</h1>
    <hr>
    <MyStudent name="abc" age="18" sex="male"/>
    <hr>
    <MyStudent name="bcd" age="19" sex="female"/>
</div>
</template>
<script>
    import MyStudent from './components/MyStudent.vue';
    export default {
        name:"App",
        components:{
            MyStudent
        },
        data() {
            return {
                msg:"hello Vue",
            }
        },
    }
</script>
<!-- MySchool.vue -->
<template>
    <div class="student">
        <h1>{{msg}}</h1>
        <h2>学生名称：{{name}}</h2>
        <h2>学生年龄：{{age}}</h2>
        <h2>学生年龄：{{sex}}</h2>
    </div>
</template>
<script>
    export default {
        name:"MyStudent",
        data() {
            return {
                msg:"I'm a student"
            };
        },
        props:['name', 'age', 'sex']
    }
</script>
```


![VueCLI简介4](/upload/md-image/vue/VueCLI简介4.png){:width="500px" height="500px"}

一个问题：如果想让传入的age+1后展示，不能直接`{{age+1}}`（因为传入的age一定是字符串类型）

- 方法1：student组件中`{{age*1+1}}`

- 方法2：传入参数时使用动态绑定`<Student :age="18"/>`，因为`v-bind`会把引号里面的内容当成表达式（`18`这个表达式表示一个数字）

  如果想要传入的参数是对象这种复杂数据类型，也使用该方法



例：

```html
<!-- App.vue -->
<MyStudent name="abc" :age="19"/>
<MyStudent name="bcd" sex="female"/>
<!-- MySchool.vue -->
<template>
    <div class="student">
        <h2>学生名称：{{name}}</h2>
        <h2>学生年龄：{{age+1}}</h2>
        <h2>学生年龄：{{sex}}</h2>
    </div>
</template>
<script>
    export default {
        name:"MyStudent",
        props:{
            name:{
                type:String,
                required:true
            },
            age:{
                type:Number,
                default:18
            },
            sex:{
                type:String,
                default:'male'
            }
        }
    }
</script>
```


**补充**：

- 如果props中声明了没传入的变量，这个声明变量的值为undefined

- 传入变量名不能是Vue中的关键字（如`key`等）

- props的优先级比data高：如果子组件中在data里声明了一个和传入变量同名的变量，最后实际展示的是传入的那个变量值

- props接收的变量不能改（可以改，但可能出现未知错误）

  可以在data里声明另一个同值变量，最后修改这个变量即可

  例如想改传入的age变量：

  ```html
  <template>
    <h2>学生年龄：{{my_age}}</h2>
  </template>
  <script>
      export default {
          name:"MyStudent",
          data() {
              return {
                  my_age: this.age //将age复制给my_age
              };
          },
          props:['age'],
          methods:{
            change_age(){
              this.my_age++; //改新变量
            }
          }
      }
  </script>
  ```


#### mixin混入

即多个组件共享一个vc配置项

将配置项写入一个js中：

```js
/* xxx.js */
export const 变量名 = {
  配置项 //可以是多个任意配置项（包括生命周期等）
}
/* 组件.vue的<script>标签中 */
import {变量名} from xxx.js
export default {
    mixins:[变量名]
}
```


例：给组件添加方法`show_name`

```js
/* mixin.js */
export const show_name = {
    methods: {
        show_name() {
            alert(this.name);
        },
        mounted() {
            console.log("mounted");
        }
    }
}
export const create_data = {
    data() {
        return { x: 1 };
    }
}
```


```html
<!-- MySchool.vue -->
<template>
    <div class="school">
        <h2 @click="show_name">学校名称：{{name}}</h2>
        <h2>学校地址：{{addr}}</h2>
    </div>
</template>
<script>
    import {show_name, create_data} from '../mixin'; //可以有选择地引入
    export default {
        name:"MyStudent",
        data() {
            return {
                name:"ABC",
                addr:'x-x-x'
            };
        },
        mixins:[show_name, create_data]
    }
</script>
```


引入后，原有的data/方法等不会被覆盖，而是在此基础上新增

- 对于data/方法等，如果组件中原有的和引入的同名，以组件中原有的为准

- 对于生命周期钩子，两个叠加，都执行，且先执行引入的



---



全局配置mixin：给每个组件（包括vm和所有的vc）都进行配置

```js
/* main.js */
import {变量名} from xxx.js
Vue.mixin(变量名) //可以多次调用以引入多个mixin配置
```


#### plugins插件

作用是增强Vue的功能，通常定义在与`main.js`同级的`plugins.js`中

```js
/* plugins.js */
export default {
    install(Vue){ //接收Vue作为参数
        //可以给Vue绑定各种方法（例如全局过滤器、全局指令、全局混入）
        //也可以给Vue原型上添加方法（vm和vc就都能用了）
    }
}
/* main.js */
import plugins from './plugins';
Vue.use(plugins); //可以多次调用以引入多个插件
```


例：

```js
/* plugins.js */
export default {
    install(Vue) {
        Vue.filter('my_slice', function (v) { //全局过滤器
            return v.slice(0, 4);
        });
        Vue.prototype.hello = () => { //添加方法
            alert('hello Vue');
        };
    }
}
/* main.js */
import plugins from './plugins';
Vue.use(plugins);
```


```html
<!-- MySchool.vue -->
<template>
    <div class="school">
        <h2>学校名称：{{name | my_slice}}</h2>

        <h2 @click="say_hello">学校地址：{{addr}}</h2>
    </div>
</template>
<script>
    export default {
        name:"MyStudent",
        data() {
            return {
                name:"ABCafdaadf",
                addr:'x-x-x'
            };
        },
        methods: {
            say_hello(){
                this.hello();
            }
        },
    }
</script>
```




---



在use时，还可以给插件传入参数

```js
/* plugins.js */
export default {
    install(Vue, x, y, z) {
        console.log(x, y, z); //1, 2, 3
    }
}
/* main.js */
import plugins from './plugins';
Vue.use(plugins, 1, 2, 3);
```


#### scoped样式

如果两个组件中都用了同一个CSS选择器指定同个样式，就会出现覆盖（根据import的顺序，后面的覆盖前面的）

方法：在组件中给style标签添加`scoped`属性，这可以让样式在局部生效，防止冲突

```html
<style scoped>
    /* CSS选择器 */
</style>
```


Vue在解析时会给组件最外层的div加上一个特殊的类名，并通过该类名进行选择

注意：通常不在App.vue的style中加scoped，因为在这写的CSS往往要给所有组件使用



---



补充：组件中style标签的lang属性——指定css语言（比如less或scss）

```html
<style lang="less" scoped>
    /* less选择器 */
    .demo{
        background-color: pink;
        .font{
            font-size: 40px;
        }
    }
</style>
```


但这需要安装`less-loader`包：`npm i less-loader`

### 组件自定义事件

#### 绑定

```html
<!-- 父组件.vue -->
<!-- 第一种方式：使用v-on -->
<子组件 v-on:自定义事件名="处理函数"/>
<!-- 或者 -->
<子组件 @自定义事件名="处理函数"/>
<script>
    methods:{
        处理函数(参数1, 参数2, ...){}
    }
</script>
<!-- 第二种方式：使用ref+mounted -->
<子组件 ref="组件标识"/>
<script>
    methods:{
        处理函数(参数1, 参数2, ...){}
    },
    mounted(){
        this.$refs.组件标识.$on('自定义事件名', this.处理函数)
    } //注：如果把处理函数直接写到这里面，就用箭头函数，否则this为子组件vc
</script>

<!-- 子组件.vue -->
<script>
    this.$emit('自定义事件名', 参数1, 参数2, ...)
</script>
```


- v-on在组件标签上，就是给这个组件的实例对象vc身上绑定了一个事件，如果以后有人触发的这个事件，那么传入的函数就会被调用

- 给谁绑定的事件，就找谁触发



注：第二种方式更灵活，因为绑定事件是在mounted中进行，可以控制绑定事件的时刻（比如晚一段时间再绑定），而第一种不行



---



如果要给组件添加原生事件，例如点击组件时执行函数，需要使用`.native`事件修饰符，否则默认会将事件作为自定义事件名

```html
<子组件 @click.native="处理函数"/>
<!-- 点击子组件时执行处理函数 -->
```


**子组件向父组件传数据的两种方式**：

- todolist案例中使用的通过props

    ```html
  <!-- App.vue -->
  <MyStudent :getStudentName="getStudentName"/>
  <script>
      methods: {
          getStudentName(name){
              console.log(name); 
          },
      },
  </script>
  <!-- MyStudent.vue -->
  <button @click="emitData">点击发送数据</button>
  <script>
      props:['getStudentName'],
      methods: {
          emitData(){
              this.getStudentName(this.name);
          }
      }
  </script>
    ```


- 自定义事件+v-on

    ```html
  <!-- App.vue -->
  <MySchool v-on:getData="getSchoolName"/>
  <script>
      methods: {
          getSchoolName(name){
              console.log(name); 
          },
      },
  </script>
  <!-- MySchool.vue -->
  <button @click="emitData">点击发送数据</button>
  <script>
      methods: {
          emitData(){
              this.$emit('getData', this.name);
          }
      },
  </script>
    ```


- 自定义事件+ref属性

    ```html
  <!-- App.vue -->
  <MySchool ref="school"/>
  <script>
      methods: {
          getSchoolName(name){
              console.log(name); 
          },
      },
      mounted() {
          setTimeout(()=>{ //延时2s再绑定
              this.$refs.school.$on('getData', this.getSchoolName);
          }, 2000);
      },
  </script>
  <!-- MySchool.vue -->
  <button @click="emitData">点击发送数据</button>
  <script>
      methods: {
          emitData(){
              this.$emit('getData', this.name);
          }
      },
  </script>
    ```


补充：如果想让该事件只触发一次，

- 自定义事件+ref属性：使用`$once()`

- 自定义事件+v-on：`@自定义事件名.once`

#### 解绑

```html
<!-- 子组件.vue -->
<script>
    this.$off('自定义事件名') //解绑一个事件
    this.$off(['事件1', '事件2', ...]) //解绑多个事件
    this.$off() //解绑该组件上的全部自定义事件
</script>
```


### 全局事件总线

**全局事件总线(GlobalEventBus)**用于实现任意组件间通信（最常用）

**思路**：设置一个X作为中转站，处理所有事件绑定和函数回调

- X应被所有组件访问到（放到Vue的原型对象上，因为每个vc都不同，是Vue.extend重新生成的，所以不能放到vc上）

- X上应有`$on`/`$off`/`$emit`方法（X应为vm或vc，为了使X在vm完成渲染前就获得这些方法，X应写在beforeCreate中创建，值为vm）



```js
/* main.js*/
new Vue({
    beforeCreate(){
        Vue.prototype.$bus = this; //安装全局事件总线
    }
})
/* 接收数据的组件 */
methods(){
    处理函数(数据){ /* 处理程序 */ }
},
mounted() {
    this.$bus.$on('自定义事件名称', this.处理函数)
}, //注：处理函数也可以直接写到这里面，也是必须用箭头函数
beforeDestroy(){ //最好在销毁前解绑该自定义事件
    this.$bus.$off('自定义事件名称')
}
/* 发送数据的组件 */
this.$bus.$emit('自定义事件名称', 数据)
```


- 注：`$bus`名称任意，只是通常写成这样



**什么时候用全局事件总线**：

- 父组件->子组件：props即可

- 子组件->父组件：props/自定义函数

- 兄弟组件/跨越多级的父子组件：全局事件总线

### 消息订阅与发布

可以简单理解成是全局事件总线的另一个版本

使用`pubsub`包：`npm i pubsub-js`

该包在任何框架中都适用，但在Vue中还是推荐使用[全局事件总线](#全局事件总线)

```js
/* 接收数据的组件 */
import pubsub from 'pubsub-js'
methods(){
    处理函数(消息名, 数据){ //注意这里接收到两个参数
        /* 处理程序 */ 
    }
},
mounted() {
    this.pub_id = pubsub.subscribe('消息名称', this.处理函数)
}, //注：处理函数也可以直接写到这里面，也是必须用箭头函数
beforeDestroy(){ //最好在销毁前取消订阅
    pubsub.unsubscribe(this.pub_id)
}
/* 发送数据的组件 */
import pubsub from 'pubsub-js'
pubsub.publish('消息名称', 数据)
```


- 注意：如果想要传递多个数据，必须放入对象/数组中包装成一个参数进行传递。这点与事件总线不同，事件总线按顺序获取参数

### nextTick

```js
this.$nextTick(回调函数);
```


其中的回调在DOM节点更新后执行，也可算作声明周期钩子的一种（虽然调用方法不同）

- 常用在：当改变数据后，要基于更新后的新DOM进行某些操作时，这些操作要写在nextTick所指定的回调函数中



在todoList案例中，想实现改变`isEdit`后显示input框，同时自动获取焦点，比较容易想到的思路是

```js
isEdit = true;
input.focus();
```


我们想的是在改变变量后，Vue重新解析模板，再让input获取焦点。但实际上Vue执行的顺序是先把上面这段代码执行完，再重新解析模板，因为未在页面上的input不能获取焦点，所以这样写不行

- 如果遇到变量修改就重新渲染，可能会耗费更多性能



解决方法：

- 将`input.focus()`写在延时为0的定时器中

- 使用nextTick



```js
setTimeout(()=>input.focus(), 0);
this.$nextTick(()=>input.focus()); //更推荐
```


### 过渡与动画

#### 动画

```html
<transition appear> <!-- appear属性可以使动画在页面加载时就执行一次 -->
    想添加动画的标签
</transition>
<style scoped>
    .v-enter-active{
        animation: 显示元素的动画名 其它配置项;
    }
    .v-leave-active{
        animation: 隐藏元素的动画名 其它配置项;
    }
    @keyframes 动画名 {
        /* 动画具体效果 */
    }
</style>
```


**如果有多个标签都需要动画，就需要对每个动画命名进行区分**

```html
<transition name="动画名">
    想添加动画的标签
</transition>
<style scoped>
    .动画名-enter-active{
        animation: 显示元素的动画名 其它配置项;
    }
    .动画名-leave-active{
        animation: 隐藏元素的动画名 其它配置项;
    }
    @keyframes 动画名 {
        /* 动画具体效果 */
    }
</style>
```


**如果想让多个标签都使用同一个动画，就需要使用`transition-group`标签**

- 其中每个标签必须有`key`属性

- 通常配合vfor列表使用



```html
<transition-group> <!-- appear/name等属性同上 -->
    <h2 v-show="is_show" key="1">Hello Vue</h2>
    <h2 v-show="is_show" key="2">Hello Vue1</h2>
</transition-group>
```


- 也可以把多个标签写到一个div中，但这样破坏了页面结构，且如果是两个标签进入/退出相反的情况，就不行了

  ```html
  <h2 v-show="is_show" key="1">Hello Vue</h2>
  <h2 v-show="!is_show" key="2">Hello Vue1</h2>
  ```


  

**例：点击按钮显示/隐藏元素，进入/退出使用向左/右滑动**

```html
<transition appear>
    <h2 v-show="is_show">Hello Vue</h2>
</transition>
<button @click="is_show=!is_show">显示/隐藏</button>
<script>
    data() { return {is_show: true}; }
</script>
<style scoped>
    .student h2{
        background-color: pink;
    }
    .v-enter-active{
        animation: show 1s;
    }
    .v-leave-active{
        animation: show 1s reverse;
    }
    @keyframes show {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0);
        }
    }
</style>
```


#### 过渡

```html
<transition appear> <!-- appear/name属性、命名、group同上 -->
    想添加过渡的标签
</transition>
<style scoped>
    .v-enter-active{ /*进入过渡的过渡时间等属性 */
        transition: xxx;
    }
    .v-enter{ /* 进入的起点（还没有出现在页面上时） */
        /* 起始时刻CSS */
    }
    .v-enter-to{ /* 进入的终点（完成显示在页面上时） */
        /* 结束时刻CSS */
    }
    .v-leave-active{ /*离开过渡的过渡时间等属性 */
        transition: xxx;
    }
    .v-leave{ /* 离开的起点 */
        /* 起始时刻CSS */
    }
    .v-leave-to{ /* 离开的终点 */
        /* 结束时刻CSS */
    }
</style>
```


- 过渡时间等属性也可以直接写在`想添加过渡标签`的CSS中



例：实现上面的显示/隐藏效果

```html
<!-- 前面部分同上 -->
<style scoped>
    .student h2{
        background-color: pink;
    }
    .v-enter-active, .v-leave-active{
        transition: 1s;
    }
    .v-enter, .v-leave-to{ /* 进入的起点、离开的终点 */
        transform: translateX(-100%);
    }
    .v-enter-to, .v-leave{ /* 离开的起点、进入的终点 */
        transform: translateX(0);
    }
</style>
```




---



**总结**：

- **元素进入的样式**：

  - `v-enter`：进入的起点

  - `v-enter-active`：进入过程中

  - `v-enter-to`：进入的终点

- **元素离开的样式**：

  - `v-leave`：离开的起点

  - `v-leave-active`：离开过程中

  - `v-leave-to`：离开的终点

- `v-enter`和`v-leave`这个样式都是瞬间加上后就清除，仅是为了标识起点位置



![过渡与动画1](/upload/md-image/vue/过渡与动画1.png){:width="450px" height="450px"}

#### 第三方动画库

例如[animate.css](https://animate.style)

安装：`npm i animate.css`

引入：因为这是一个CSS库，直接写`import 'animate.css`即可

```html
<transition 
    name="animate__animated animate__bounce"
    enter-active-class="进入动画名称"
    leave-active-class="离开动画名称"
>
    标签
</transition>
```


例：

```html
<transition 
    name="animate__animated animate__bounce"
    enter-active-class="animate__swing"
    leave-active-class="animate__backOutUp"
>
    <h2 v-show="is_show" key="1">Hello Vue</h2>
</transition>
<script>
    import 'animate.css'
</script>
<!-- 不用写CSS -->
```


### 发送请求

在Vue中，常常使用axios发送请求（因为jq是直接操纵dom的，所以不用）

安装：`npm i axios`

#### 配置代理

用于解决**跨域问题**：在页面端和服务器端中间再设一个代理服务器，它与页面端同源。在页面发送请求时，先给这个代理服务器发，然后代理服务器再给服务器发

- 为什么代理服务器与服务器间没有跨域问题：服务器与服务器间通信用的是最基本的HTTP请求，而只有浏览器使用的Ajax才有跨域问题



**第一种方式**：

```js
/* vue.config.js */
module.exports = {
  devServer: {
    proxy: '服务器端IP'
  }
}
```


例：

```js
/* 服务器端 */
server.listen(5000, () => { //服务端开在5000端口上
    console.log("服务已经启动");
});
/* vue.config.js */
module.exports = {
  devServer: {
    proxy: 'http://127.0.0.1:5000' //要代理的服务器
  }
}
```


```html
<button @click="getData">获取信息</button>
<script>
    import axios from 'axios';
    export default {
        name:"App",
        methods: {
            getData(){
                axios.get('http://localhost:8080/student') //向代理服务器发请求
                    .then(value=>{
                        console.log(value.data); 
                    });
            }
        },
    }
</script>
```


注意：

- 不是所有的请求都会被转发：如果请求的资源是网页端已有的（例如public文件夹中的index.html/网页图标等），就不转发。因此在上例中，如果在public中新建一个名为`student`的文件，请求就不转发，而是直接返回该文件的内容

- 缺点：只能代理一个服务器，且不能控制请求是否走代理



---



**第二种方式**：

```js
/* vue.config.js */
module.exports = {
  devServer: {
    proxy: {
        '/请求前缀':{
            target: '服务器端IP',
            pathRewrite: {'^/请求前缀': ''},
            ws: true,
            changeOrigin: true
        },
        ... //可设置多个请求前缀和对应的服务器
    }
  }
}
// 之后在发送请求时，把请求前缀加到路径中
// 协议://域名:端口号/请求前缀/真实路径
```


- `pathRewrite`：上面说过发送请求时必须带请求前缀，但这个请求前缀只是前端加的，后端服务器中匹配的路径不带这个请求前缀，此时就需要让转发服务器在转发时把这个请求前缀去掉

- `ws`：用于支持websocket，默认是true

- `changeOrigin`：用于控制请求头中的host值，默认是true



例：

```js
/* 服务器端，分别在5000和5001端口 */
/* vue.config.js */
module.exports = {
  devServer: {
    proxy: {
      '/server1': {
        target: 'http://127.0.0.1:5000',
        pathRewrite: { '^/server1': '' },
      },
      '/server2': {
        target: 'http://127.0.0.1:5001',
        pathRewrite: { '^/server2': '' },
      },
    }
  }
}
```


```html
<button @click="getData">获取信息</button>
<script>
    import axios from 'axios';
    export default {
        name:"App",
        methods: {
            getData(){
                axios.get('http://localhost:8080/server1/student')
                    .then(value=>{
                        console.log(value.data); 
                    });
                axios.get('http://localhost:8080/server2/cars')
                    .then(value=>{
                        console.log(value.data); 
                    });
            }
        },
    }
</script>
```


- 解决了第一种方式中的问题：如果在请求路径中加上请求前缀，就是向服务器发送请求，反之就是获取本地资源

#### vue-resource

是一个Vue的插件，现在很少使用，了解即可

安装：`npm i vue-resource`

```js
/* main.js */
import vueResource from 'vue-resource'; //引入插件
Vue.use(vueResource); //使用插件
/* 要发送请求的地方 */
this.$http.get('url').then(v, r); //使用方法与axios相同，就是把`axios`替换成`this.$http`
```


### 插槽

让父组件能把一组标签传入子组件的指定位置（在子组件中预留一个位置，等待父组件提供标签），也是组件间传递信息的一种方法

#### 默认插槽

```html
<!-- 子组件 -->
<slot>如果父组件不传标签，这里面的标签会显示</slot>
<!-- 父组件 -->
<子组件>想要传给子组件的标签</子组件>
```


- 插槽中的标签的css写到子/父组件中都可

- `想要传给子组件的标签`中如果想使用数据，数据应存在父组件中，即使最后这些标签被传给子组件



**例：同样组件中含有不同标签**

```html
<!-- MyCategory.vue -->
<div class="category">
    <h3>{{title}}</h3>
    <slot><h3>我是默认值</h3></slot>
</div>
<!-- App.vue -->
<MyCategory title="students">
    <ul>
        <li v-for="(item, index) in students" :key="index">{{item}}</li>
    </ul>
</MyCategory>
<MyCategory title="cars">
    <p>我是p标签</p>
</MyCategory>
<MyCategory title="schools"/>
<!-- 声明students变量部分略 -->
```


#### 具名插槽

解决子组件中出现多个插槽的问题

```html
<!-- 子组件 -->
<slot name="插槽名">如果父组件不传标签，这里面的标签会显示</slot>
<!-- 父组件 -->
<子组件>
    <标签 slot="插槽名"> <!-- 任意标签都可用的写法 -->
    <template v-slot:插槽名> <!-- 只能用在template标签上 -->
</子组件>
```


- 注：这种方法指定标签属于哪个插槽时，识别的只是标签，标签与标签之间的文本不识别

  如果想实现两个行内标签中间有距离，就不能用中间添加`&nbsp;`，可以把它们包在一个div中，然后指定div的插槽名即可

  除此之外，如果不想破坏页面结构，还可以将它们包在template标签中指定插槽名



**例**：

```html
<!-- MyCategory.vue -->
<div class="category">
    <h3>{{title}}</h3>
    <slot name="ul"></slot>
    <slot name="a"></slot>
</div>
<!-- App.vue -->
<MyCategory title="students">
    <ul slot="ul">
        <li v-for="(item, index) in students" :key="index">{{item}}</li>
    </ul>
    <p slot="a">链接：</p>
    <a href="xxx" slot="a">我是链接</a>
</MyCategory>
```


#### 作用域插槽

前面提过在插槽中，数据使用和声明也必须在同一个组件中，作用域插槽提供了一种方式，让数据保存在子组件自身，但数据的使用方式可以由组件的使用者（父组件）来决定

```html
<!-- 子组件 -->
<slot :传递数据名="变量名"></slot>
<!-- 父组件 -->
<子组件>
    <template scope="接收数据名">
    <!-- 也可以写成： -->
    <template slot-scope="接收数据名">
        使用`接收数据名.传递数据名`获取传入的变量
    </template>
</子组件>
```


- 注：作用域插槽也可以起名，方式同[具名插槽](#具名插槽)



**例：将上例中的studentsa/cars放在`MyCategory.vue`中**

```html
<!-- MyCategory.vue -->
<div class="category">
    <h3>{{title}}</h3>
    <slot :students="students" :cars="cars" msg="show"></slot>
    <!-- 可以传递多个参数 -->
</div>
<!-- App.vue -->
<MyCategory title="students">
    <template scope="data">
        <h4>{{data.msg}}</h4>
        <ul>
            <li v-for="(item, index) in data.students" :key="index">{{item}}</li>
        </ul>
    </template>
</MyCategory>
<MyCategory title="students">
    <template scope="data">
        <h4>{{data.msg}}</h4>
        <ol>
            <li v-for="(item, index) in data.cars" :key="index">{{item}}</li>
        </ol>
    </template>
</MyCategory>
```


还可以使用解构赋值：

```html
<template scope="{msg, students}">
    <h4>{{msg}}</h4>
    <ul>
        <li v-for="(item, index) in students" :key="index">{{item}}</li>
    </ul>
</template>
```

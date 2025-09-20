---
layout: mypost
title: Vue--04Vue3
category: JS
subcategory: JS-Vue
---
来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH)

<!-- more -->

写在前面：此笔记来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH) / [资料下载](https://www.aliyundrive.com/s/B8sDe5u56BU/folder/61138e6e8582eecbe4c84546a1b2d58363d20bc0) / [我的练习文件（教程中的练习）](https://lwstkhyl.me/file?path=githubio%E7%AC%94%E8%AE%B0%E9%99%84%E5%B8%A6%E8%B5%84%E6%96%99%2Fvue)

### 简介

**比Vue2的优势**：

- **性能提升**：打包大小更小、渲染更快、内存占用更少

- **源码升级**：使用Proxy代替defineProperty实现响应式，重写虚拟DOM的实现和Tree-Shaking

- **更好地支持TS**

- **一些新的特性**



---



两种创建方式：vue-cli和vite

**vue-cli**：同Vue2的创建方式，选择Vue3即可

**vite**：新一代前端构建工具

- 优势：传统方法都是先把各个模块打包完成后再启动，vite是先启动服务器，再根据HTTP请求申请模块

  - 开发环境中，无需打包操作，可快速的冷启动

  - 轻量快速的热重载(HMR)

  - 真正的按需编译，不再等待整个应用编译完成

- 方法：

  - 创建工程：`npm init vite-app <project-name>`

  - 进入工程目录：`cd <project-name>`

  - 安装依赖：`npm install`

  - 运行：`npm run dev`



---



**工程结构**：

- `src/main.js`：

    ```js
  import { createApp } from 'vue' //引入createApp工厂函数，而不是Vue构造函数
  import App from './App.vue'
  const app = createApp(App) //创建应用实例对象app，类似于vm，但更“轻”
  app.mount('#app') //挂载
    ```


    `app.unmount('#app')`卸载，调用后页面上不显示内容

- `src/App.vue`：唯一区别是组件模板结构可以没有根标签

    ```html
  <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  </template>
    ```


- 其它地方没有变化



---



**安装开发者工具**：搜索`Vue.js devtools`，edge上的同时支持Vue2/3，chrome上的找到logo右下角有`beta`标志的

### 常用Composition api

Composition api：组合式API

#### setup

是Vue3中一个新的配置项，值为一个函数

- 组件中所有的数据、方法等均要配置在setup中，是所有组合式API“表演的舞台”

- 两种返回值：

  - （常用）若返回一个对象，则对象中的属性、方法，在模板中均可以直接使用

  - （了解）若返回一个渲染函数，则可以自定义渲染内容

- 注意：

  - 尽量不要与Vue2配置混用

    - Vue2配置(data/methos/computed...)中可以使用`this.属性`访问到setup中的属性、方法，但setup不能访问到Vue2配置

    - 如果有重名，setup优先

  - setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性（如果需要返回一个Promise，需要[suspense和异步组件](#suspense)的配合）



**返回一个对象**（常用）：

```html
<template>
  <p>name:{{name}}</p>
  <p>age:{{age}}</p>
  <button @click="sayhello">sayhello</button>
</template>
<script>
export default {
  name: 'App',
  setup() { //此处仅作演示，未考虑响应式
    let name = 'abc';
    let age = 18;
    function sayhello(){
      alert(`name:${name}, age:${age}`);
    }
    return {name, age, sayhello};
  }
}
</script>
```


![组合式API1](/upload/md-image/vue/组合式API1.png){:width="500px" height="500px"}

**返回一个渲染函数**：就是Vue2中的render函数

```html
<script>
import {h} from 'vue'
export default {
  name: 'App',
  setup() {
    return ()=>h('h1', '返回一个渲染函数');
  }
}
</script>
```


此时页面上只有`<h1>返回一个渲染函数</h1>`

##### ref函数

不是写在标签中的ref属性，ref属性仍然可用

在setup函数中，如果只是用`let a=1`的方式声明，则不会响应式，需要用ref函数处理

```js
import {ref} from 'vue'
export default {
  setup() {
    let 属性名 = ref(属性值); //声明
    function 方法名(){
      属性名.value = 新属性值 //修改属性
    }
    return {属性名};
  }
}
```


- 在标签中仍使用`{{属性名}}`读取属性值，不用加`.value`

- 属性值也可以是一个对象，在setup中仍使用`对象.value.属性名`



```html
<template>
  <p>name:{{name}}</p>
  <p>age:{{age}}</p>
  <p>job:{{job.name}} {{job.salary}}</p>
  <button @click="change">change</button>
</template>
<script>
import {ref} from 'vue'
export default {
  name: 'App',
  setup() {
    let name = ref('abc');
    let age = ref(18);
    let job = ref({
      name:'ABC',
      salary: 10000
    });
    function change(){
      age.value ++;
      job.value.salary = job.value.salary * 2 ;
    }
    return {name, age, job, change};
  }
}
</script>
```


如果ref函数中传入的是一个基本类型的数据，则返回一个`RefImpl`(reference implement)实例对象（引用实现的实例对象，简称为“引用对象”/“ref对象”）

![组合式API2](/upload/md-image/vue/组合式API2.png){:width="300px" height="300px"}

ref也是用Object.defineProperty的getter/setter实现的响应式，所以`value`也是`(...)`的形式

![组合式API3](/upload/md-image/vue/组合式API3.png){:width="450px" height="450px"}

引用对象的原型对象就类似于`vm._data`，为了更方便的取出value，把value在引用对象中又放了一份



---



如果ref函数中传入的是一个对象类型的数据，则不会遍历各属性，让各属性也变成引用对象，而是把对象数据变成`Proxy`的实例对象（ES6的新语法，称为“代理对象”）

##### reactive函数

定义一个**对象**类型的响应式数据，使用方法类似[ref函数](#ref函数)，都是先引入再`const 代理对象 = reactive(源对象)`。内部基于Proxy实现，通过代理对象操作源对象内部数据进行操作。ref函数能处理对象类型数据，将其转为代理对象，也是调用了reactive函数

**注意**：

- 在setup调用数据时，可以直接`对象.属性名`，而不用`对象.value.属性名`

- 如果想要把一个数组也变成响应式，想监测到数组中某个元素的改变，也可以用reactive函数，而Vue2中不行

- reactive定义的响应式数据是“深层次的”



```html
<template>
  <p>name:{{person.name}}</p>
  <p>age:{{person.age}}</p>
  <p>job:{{person.job.name}} {{person.job.salary}}</p>
  <p>hobby:{{person.hobby}}</p>
  <button @click="change">change</button>
</template>
<script>
import {reactive} from 'vue'
export default {
  name: 'App',
  setup() {
    let person = reactive({
      name: 'abc',
      age: 18,
      job: {
        name:'ABC',
        salary: 10000
      },
      hobby: ['学习', '吃饭', '打游戏']
    });
    function change(){
      person.age ++;
      person.job.salary = person.job.salary * 2 ;
      person.hobby[2] = '听歌'
    }
    return {person, change};
  }
}
</script>
```




---



**总结：reactive和ref的对比**

- **定义数据**：

  - ref：基本类型数据

  - reactive：对象（或数组）类型数据

  

  注：ref也可以用来定义对象（或数组）类型数据，它内部会自动调用`reactive`转为代理对象

- **原理**：

  - ref：通过`Object.defineProperty()`的`get`与`set`实现响应式（数据劫持）

  - reactive：通过使用`Proxy`来实现响应式（数据劫持），并通过Reflect操作源对象内部的数据。

- **使用**：

  - ref：操作数据需要`.value`，读取数据时模板中直接读取不需要`.value`

  - reactive：操作数据与读取数据均不需要`.value`

  

  通常都用reactive对数据进行处理，如果有多个基本数据类型的数据，则封装到一个对象中

##### setup的两个注意点

- setup执行的时机：在`beforeCreate`之前执行一次，此时`this`是undefined

- setup的参数

  - props：值为对象，包含**组件外部传递过来，且组件内部声明接收了**的属性

  - context：上下文对象

    - attrs：值为对象，包含**组件外部传递过来，但没有在props配置中声明**的属性，相当于`this.$attrs`

    - slots：收到的插槽内容，相当于`this.$slots`

    - emit：分发自定义事件的函数，相当于`this.$emit`



```html
<!-- App.vue -->
<template>
  <hello-world msg="HelloWorld" school="ABC" @hello="showMsg">
    <template v-slot:test1> <!-- Vue3中尽量使用v-slot -->
      <span>我是要插入的标签1</span>
    </template>
    <template v-slot:test2>
      <span>我是要插入的标签2</span>
    </template>
  </hello-world>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {HelloWorld},
  setup() {
    function showMsg(value){
      alert('HelloWorld');
      console.log(value); 
    }
    return {showMsg};
  }
}
</script>
<!-- HelloWorld.vue -->
<template>
  <p>name: {{person.name}}</p>
  <p>age: {{person.age}}</p>
  <p>msg: {{msg}}</p>
  <button @click="emitHello">触发helloworld组件的hello事件</button>
</template>
<script>
import {reactive} from 'vue'
export default {
  name: 'HelloWorld',
  props: ['msg', ], //只接收msg
  emits: ['hello', ], //声明接收自定义事件（Vue3新增配置项），新版本中已不需要该写法，旧版本中不写会有警告
  setup(props, context) {
    let person = reactive({
      name: 'abc',
      age: 18
    });
    console.log("props:", props); 
    console.log("attrs:", context.attrs);
    function emitHello(){
      context.emit('hello', '要携带的数据');
    }
    console.log("slots:", context.slots);
    return {person, emitHello};
  }
}
</script>
```


![组合式API4](/upload/md-image/vue/组合式API4.png){:width="450px" height="450px"}

##### Vue3的响应式原理

**Vue2的响应式**：

- 实现原理：

  - 对象类型：通过`Object.defineProperty`对属性的读取、修改进行拦截（数据劫持）

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）



  ```js
  Object.defineProperty(data, 'count', {
      get () {}, 
      set () {}
  })
  ```


- 存在问题：

  - 直接新增/删除对象数据中的属性，界面不会更新（新增属性必须调用`this.$set`/`Vue.set`方法，删除属性必须调用`this.$delete`/`Vue.delete`方法）

  - 直接通过下标修改数组，界面不会自动更新（必须调用`this.$set`/`Vue.set`方法，或者用splice这种数组身上的变更方法）



---



**Vue3的响应式**：

- 实现原理: 

  - 通过`Proxy`（代理）：拦截对象中任意属性的变化，包括**属性值的读写**、**属性的添加**、**属性的删除**等

  - 通过`Reflect`（反射）：对源对象的属性进行操作

  相比于直接用`Object.defineProperty`这些基本方法，`Reflect`系列方法执行时返回bool值，标明语句是否成功执行，而不是直接报错，这样能让框架的健壮性更强（不容易因报错而中断）

  - MDN文档中描述的[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)与[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)



  ```js
  new Proxy(data, { //当person上的任一属性改变时就触发
    //读取属性值时调用
    get (target, prop) { //target是原对象data，prop是改变的属性名
      return Reflect.get(target, prop)
    },
    //修改属性值或添加新属性时调用
    set (target, prop, value) { //value是新属性值
      return Reflect.set(target, prop, value)
    },
    //删除属性时调用
    deleteProperty (target, prop) {
      return Reflect.deleteProperty(target, prop)
    }
  })
  ```




---



**Vue2响应式**：

```js
let p2 = {};
Object.defineProperty(p, 'name', {
    configurable: true, //使p中的属性能被删除
    get(){
        return person.name;
    },
    set(value){
        person.name = value;
    }
});
```


**Vue3响应式**：

```js
const p3 = new Proxy(person, {
    get(target, prop){
        // return target[prop]; //注意不能是target.prop，因为prop是字符串
        return Reflect.get(target, prop);
    },
    set(target, prop, value){
        // target[prop] = value;
        return Reflect.set(target, prop, value);
    },
    deleteProperty (target, prop) {
        // return delete target[prop]
        return Reflect.deleteProperty(target, prop);
    }
});
```


注：直接写`const p3 = new Proxy(person, {})`也能实现p3和person同步增删改，但因为要实现响应式，必须在增删改时做其它处理，所以要重写以上三种操作

#### computed属性

与Vue2中computed配置方法、功能类似

```js
import {computed} from 'vue'
setup(){
  //简写
  let 计算属性名 = computed(()=>{
    return 值
  })
  //完整
  let 计算属性名 = computed({
      get(){
          return 值
      },
      set(value){
          const nameArr = value.split('-')
          person.firstName = nameArr[0]
          person.lastName = nameArr[1]
      }
  })
}
```


**例**：

```html
<template>
  姓：<input type="text" v-model="person.firstName">
  名：<input type="text" v-model="person.lastName">
  <p>全名：{{person.fullName}}</p>
  全名：<input type="text" v-model="person.fullNameChange">
</template>
<script>
import { reactive, computed } from 'vue';
export default {
  name: 'App',
  setup() {
    let person = reactive({
      firstName: '',
      lastName: '',
    });
    //简写
    person.fullName = computed(()=>{
      return person.firstName + '·' + person.lastName
    });
    //完整
    person.fullNameChange = computed({
      get(){
        return person.firstName + '·' + person.lastName
      },
      set(value){ //修改计算属性
        const nameArr = value.split('·');
        person.firstName = nameArr[0];
        person.lastName = nameArr[1];
      }
    });
    return {person};
  }
}
</script>
```


#### watch属性和watchEffect函数

与Vue2中watch配置方法、功能类似

```js
import {watch} from 'vue'
setup(){
  //1. 监视ref定义的一个响应式数据
  watch(要监视的属性变量, (newVal, oldVal)=>{
    //newVal/oldVal是新值/旧值
  }, {
    immediate: true //页面初始化时执行一次，下同
  })
  //2. 监视ref定义的多个响应式数据
  watch([变量1, 变量2, ...], (newVal, oldVal)=>{
    //newVal/oldVal是数组形式，对应[变量1, 变量2, ...]
  })
  //3. 监视reactive定义的响应式数据
  watch(要监视的属性变量, (newVal, oldVal)=>{
    //注意：此处的oldVal与newVal值相同，不能正确获取oldVal
  }, {
    immediate: true,
    deep: false //此处无法配置deep为false，深度监视会被强制开启
  })
  //4. 监视reactive定义的响应式数据中的一个属性
  watch(()=>obj.属性名, (newVal, oldVal)=>{})
  //5. 监视reactive定义的响应式数据中的多个属性
  watch([()=>obj.属性名1, ()=>obj.属性名2, ...], (newVal, oldVal)=>{})
  //特殊情况，当要监视的属性值为一个对象时，不会强制深度监视，若要开启深度监视，需手动配置deep:true
}
```


**总结：reactive的watch**

- 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）

- 监视reactive定义的响应式数据中某个属性（属性值为对象）时：deep配置有效，且默认为false



**补充：ref定义的数据的value**

- 如果ref定义的是基本数据类型，watch时就不写`.value`

- 如果是对象，直接写`watch(obj, (n, o)=>{})`，会监视不到obj属性的改变。解决办法：

  - 加上`.value`：`watch(obj.value, (n, o)=>{})`

  - 加上deep配置项：`watch(obj, (n, o)=>{}, {deep: true})`



---



Vue3新增了`watchEffect`函数

- watch：既要指明监视的属性，也要指明监视的回调

- watchEffect：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性



```js
import {watchEffect} from 'vue'
setup(){
  watchEffect(()=>{
    //回调中用到的数据只要发生变化，则直接重新执行回调
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
  })
}
```


有点类似computed，都是用到的数据改变时执行

- 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值

- 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值

#### 生命周期

![生命周期1](/upload/md-image/vue/生命周期1.png){:width="800px" height="800px"}

- Vue3中可以继续使用Vue2中的生命周期钩子，但有有两个被更名：

  - `beforeDestroy`改名为 `beforeUnmount`

  - `destroyed`改名为 `unmounted`

- Vue3的生命周期钩子写法可以与2相同（配置项写法），但也提供了Composition API形式的生命周期钩子，即把函数写到setup中：

  - `beforeCreate`和`created`没有组合式API形式，因为只要把它们的函数体直接写到setup的最前面就行了

  - `beforeMount`->`onBeforeMount`

  - `mounted`->`onMounted`

  - `beforeUpdate`->`onBeforeUpdate`

  - `updated`->`onUpdated`

  - `beforeUnmount`->`onBeforeUnmount`

  - `unmounted`->`onUnmounted`



  ```js
  import { onBeforeMount, } from 'vue'; //其它钩子写法相同
  export default {
    setup() {
      onBeforeMount(()=>{
        //要执行的语句
      })
    }
  }
  ```




注意：如果某个钩子既有组合式API写法，又有配置项写法，则写执行组合式API写法中的语句

#### 自定义hook函数

本质是一个函数，把setup函数中使用的组合式API进行了封装

- 类似于vue2中的mixin

- 优势: 复用代码，让setup中的逻辑更清楚易懂



通常在src文件夹下新建一个hooks文件夹，里面新建一些以`use`开头的js文件

```js
/* src/hooks/usexxx.js */
import {reactive, ...} from 'vue'
export default function(){
  //里面可以定义数据、函数、生命周期钩子
  return 数据;
}
/* 组件.vue */
import usexxx from '../hooks/usexxx'
setup(){
  let 数据 = usexxx();
  return 数据
}
```


例：当鼠标点击页面时，在页面上显示鼠标坐标

```js
/* src/hooks/usePoint.js */
import { reactive, onMounted, onBeforeUnmount } from 'vue';
export default function () {
    let point = reactive({
        x: 0,
        y: 0
    });
    function savePoint(e) {
        point.x = e.pageX;
        point.y = e.pageY;
    }
    onMounted(() => {
        window.addEventListener('click', savePoint);
    });
    onBeforeUnmount(() => {
        window.removeEventListener('click', savePoint);
    })
    return point;
}
```


```html
<!-- App.vue -->
<template>
  <p>当前鼠标坐标为({{point.x}}, {{point.y}})</p>
</template>
<script>
import usePoint from './hoooks/usePoint'
export default {
  name: 'App',
  setup() {
    let point = usePoint();
    return {point};
  },
}
</script>
```


#### toRef函数

创建一个ref对象，其value值指向另一个对象中的某个属性

- 应用：要将响应式对象中的某个属性单独提供给外部使用时，同时不丢失响应式



```js
import {reactive, toRef} from 'vue'
setup(){
  let data = reactive({...});
  const 数据名1 = toRef(data, 属性名);
  //此时`数据名1`就是Ref对象，指向`data.属性名`
  const 数据名2 = toRef(data.子对象, 属性名);
}
```


注：`toRef(data, 属性名)`不能写成`ref(data.属性名)`，如果这样写，相当于复制了另一个`data.属性名`（即创建出一个新ref对象，值为`data.属性名`），此时修改它，data不会发生改变

**例**：

```html
<template>
  <p>name:{{name}}</p>
  <p>age:{{age}}</p>
  <p>salary:{{salary}}</p>
  <button @click="age++">changeAge</button>
  <button @click="salary*=2">changeSalary</button>
</template>
<script>
import {reactive, toRef} from 'vue'
export default {
  name: 'App',
  setup() {
    let person = reactive({
      name: 'abc',
      age: 18,
      job: {
        salary: 10000
      },
    });
    return {
      name: toRef(person, 'name'),
      age: toRef(person, 'age'),
      salary: toRef(person.job, 'salary'),
    };
  }
}
</script>
```




---



补充：`toRefs`与`toRef`功能一致，但可以批量创建多个ref对象

```js
import {reactive, toRefs} from 'vue'
setup(){
  let data = reactive({...});
  return {
    ...toRefs(data)
  }
}
```


**例**：

```html
<template>
  <p>name:{{name}}</p>
  <p>age:{{age}}</p>
  <p>salary:{{job.salary}}</p>
  <button @click="age++">changeAge</button>
  <button @click="job.salary*=2">changeSalary</button>
</template>
<script>
import {reactive, toRefs} from 'vue'
export default {
  name: 'App',
  setup() {
    let person = reactive({
      name: 'abc',
      age: 18,
      job: {
        salary: 10000
      },
    });
    return {...toRefs(person),};
  }
}
</script>
```


### 其它Composition api

#### shallowReactive和shallowRef

使用方法同[ref函数](#ref函数)和[reactive函数](#reactive函数)

- `shallowRef`：只处理基本数据类型的响应式，不进行对象的响应式处理

- `shallowReactive`：只处理对象最外层属性的响应式（浅响应式）



什么时候使用：

- `shallowRef`：如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换原数据

- `shallowReactive`：如果有一个对象数据，结构比较深，但变化时只是外层属性变化

#### readonly和shallowReadonly

当我们不希望某个数据被修改时使用，使用方法同[ref函数](#ref函数)，可以用在使用ref或reactive修饰的数据/普通数据上

- `readonly`：让一个响应式数据变为只读的（深只读）

- `shallowReadonly`：让一个响应式数据变为只读的（浅只读）



为什么不用“直接不将数据用ref/reactive修饰”的方法实现只读数据：这样数据仍可被修改，只是因为没有响应式，在页面上不改变，但readonly函数可以让数据从根本上不能被修改

还有一种情况：数据不是定义在自己的组件中，而是定义在别的组件中，只有在自己的组件中才想让其只读

#### toRaw和markRaw

使用方法同[readonly和shallowReadonly](#readonly和shallowreadonly)

- `toRaw`：将一个**由`reactive`生成的响应式对象**转为普通对象

  - 用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新

- `markRaw`（更常用）：标记一个**普通对象**，使其永远不会再成为响应式对象

  - 有些值不应被设置为响应式的，例如复杂的第三方类库等

  - 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能



  比如要给一个reactive对象上再追加一个很复杂的对象，这个追加的对象不需要更改，但因为Proxy，新追加的对象默认是响应式的，就需要使用：`data.新属性名=markRaw(追加的对象)`

#### customRef

创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制

```js
import {customRef} from 'vue'
setup(){
  function 自定义ref函数名(value){
    return customRef((track, trigger)=>{
      return { //类似于计算属性
        get(){ //当data被读取时触发
          track(); //通知Vue追踪该数据的变化
          return value;
        },
        set(newVal){ //当data被修改时触发
          value = newVal;
          trigger(); //通知Vue重新解析模板（再次调用get()函数）
        }
      }
    });
  }
  let data = 自定义ref函数名(值);
  return {data};
}
```


**例：实现防抖效果**，即在输入框中输入文字，下面的标签中延时展示

```html
<template>
  <input type="text" v-model="keyword">
  <h3>{{keyword}}</h3>
</template>
<script>
import {customRef} from 'vue'
export default {
  name: 'App',
  setup() {
    function myRef(value, delay){
      let timer = null;
      return customRef((track, trigger)=>{
        return {
          get(){
            track();
            return value;
          },
          set(newVal){
            if(timer) clearTimeout(timer);
            timer = setTimeout(()=>{
              value = newVal;
              trigger();
            }, delay);
          }
        }
      });
    }
    let keyword = myRef('', 500);
    return {keyword};
  }
}
</script>
```


#### provide与inject

实现祖与后代组件间通信（特别是**祖孙组件**间）：父组件有一个`provide`选项来提供数据，后代组件有一个`inject`选项来开始使用这些数据

```js
/* 祖组件 */
import {provide} from 'vue'
setup(){
    provide(数据名, obj)
}
/* 后代组件 */
import {inject} from 'vue'
setup(props, context){
    const obj = inject(数据名)
    return {obj}
}
```


**例**：

```js
/* 祖组件 */
import {reactive, provide} from 'vue'
setup(){
  let car = reactive({name:'奔驰',price:'40万'})
  provide('car',car)
}
/* 后代组件 */
import {inject} from 'vue'
setup(props, context){
  const car = inject('car')
  return {car}
}
```


#### 响应式数据的判断

- `isRef`：检查一个值是否为一个ref对象

- `isReactive`：检查一个对象是否是由`reactive`创建的响应式代理

- `isReadonly`：检查一个对象是否是由`readonly`创建的只读代理

- `isProxy`：检查一个对象是否是由`reactive`或者`readonly`方法创建的代理



**例**：

```js
import {isProxy, isReactive, isReadonly, isRef, reactive, readonly, ref} from 'vue'
export default {
  name: 'App',
  setup() {
    let obj = reactive({name: 'abc'})
    let a = ref(0)
    let a_readonly = readonly(a)
    console.log(isRef(a));  //true
    console.log(isReactive(obj));  //true
    console.log(isReadonly(a_readonly));  //true
    console.log(isProxy(a_readonly));  //true
  }
}
```


#### Composition API的优势

<div style="width:430px;height:340px;">

    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>

</div>



使用传统Options API中，新增或者修改一个需求，就需要分别在data/methods/computed里修改。而Composition API可以把同一功能/变量涉及到的所有函数都写到一起

### 新的组件

#### fragment

不需要手动写，是Vue3框架自动生成的，目的是减少标签层级，减小内存占用

- 在Vue2中：组件必须有一个根标签

- 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中

#### teleport

将组件html结构移动到指定位置。比如一个组件中写了一个弹窗，控制弹窗的按钮和弹窗都写在该组件中，此时弹窗的DOM结构会在组件中，而我们想让弹窗在body下显示

```html
<teleport to="移动位置">
  <!-- HTML结构 -->
</teleport>
```


- 移动位置处为CSS选择器，例如`body`/`#app`等

#### suspense

等待异步组件时渲染一些额外内容，让应用有更好的用户体验

```js
import {defineAsyncComponent} from 'vue'
const 异步组件名 = defineAsyncComponent(()=>import('./components/Child.vue'))
export default{
  components: {异步组件名}
}
```


- 这种方法称为**异步引入/动态引入**，而之前直接`import 子组件`的方法称为**静态引入**

- 静态引入时，如果引入不成功/速度慢，整个页面都会卡住；而动态引入就不需要等子组件引入成功，常用于子组件中数据量很大/异步return时

  ```js
  // 例如return一个Promise对象
  async setup(){
    let p = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(0)
      }, 1000)
    })
    return await p
  }
  ```




动态引入存在的问题：因为子组件可能不会与父组件同时显示，需要一些过渡动画来防止突兀的显示

```html
<Suspense>
  <template v-slot:default> <!-- 真正想展示的内容/子组件 -->
    <Child/>
  </template>
  <template v-slot:fallback> <!-- 加载时展示的内容 -->
    <h3>加载中.....</h3>
  </template>
</Suspense>
```


### 其他改变

**全局API的转移**：

Vue2有许多全局API和配置，例如注册全局组件`Vue.component`、注册全局指令`Vue.directive`等

Vue3将全局的API`Vue.xxx`调整到应用实`app`上

| Vue2全局API`Vue`         | Vue3实例API`app`            |
| ------------------------ | --------------------------- |
| Vue.config.xxxx          | app.config.xxxx             |
| Vue.config.productionTip | 移除<br>Vue3中没有生产提示  |
| Vue.component            | app.component               |
| Vue.directive            | app.directive               |
| Vue.mixin                | app.mixin                   |
| Vue.use                  | app.use                     |
| Vue.prototype            | app.config.globalProperties |



**data选项应始终被声明为一个函数**

**过度类名的更改**：

- Vue2写法

  ```css
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-leave,
  .v-enter-to {
    opacity: 1;
  }
  ```


- Vue3写法

  ```css
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .v-leave-from,
  .v-enter-to {
    opacity: 1;
  }
  ```




**移除`keyCode`作为`v-on`的修饰符，同时也不再支持`Vue.config.keyCodes.按键别名`**

**移除`v-on.native`修饰符**：

- 父组件中绑定事件

  ```html
  <my-component
    v-on:自定义事件名="handleComponentEvent"
  />
  ```


- 子组件中声明自定义事件

  ```js
  export default {
    emits: ['自定义事件名']
  }
  ```




**移除过滤器filter**

- 需要一个自定义语法，打破大括号内表达式是JavaScript的假设

- 建议用方法调用或计算属性去替换过滤器

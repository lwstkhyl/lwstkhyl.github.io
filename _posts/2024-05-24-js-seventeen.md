---
layout: mypost
title: Vue--03vuex与路由
category: JS
subcategory: JS-Vue
---
来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH)

<!-- more -->

写在前面：此笔记来自b站课程[尚硅谷Vue2.0+Vue3.0全套教程](https://www.bilibili.com/video/BV1Zy4y1K7SH) / [资料下载](https://www.aliyundrive.com/s/B8sDe5u56BU/folder/61138e6e8582eecbe4c84546a1b2d58363d20bc0) / [我的练习文件（教程中的练习）](https://lwstkhyl.me/file?path=githubio%E7%AC%94%E8%AE%B0%E9%99%84%E5%B8%A6%E8%B5%84%E6%96%99%2Fvue)

{% raw %}

### Vuex

#### 简介

专门在Vue中实现集中式状态（数据）管理的**Vue插件**，对Vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信

**多个组件需要共享数据：通过全局事件总线和vuex**

![Vuex简介1](/upload/md-image/vue/Vuex简介1.png){:width="600px" height="600px"}

![Vuex简介2](/upload/md-image/vue/Vuex简介2.png){:width="600px" height="600px"}

**什么时候用Vuex**：共享状态

- 多个组件依赖于同一状态（数据）

- 来自不同组件的行为需要变更同一状态（简单来说就是多个组件都想修改同个数据）



---



**工作原理**：

![Vuex简介4](/upload/md-image/vue/Vuex简介4.png){:width="600px" height="600px"}

- Vuex由3个部分组成，是绿框里面的`actions`/`mutations`/`state`

  - state对象中存储着数据

  - actions对象中存储一些操作数据的函数方法，格式：`{方法名:function(){}}`

  - mutations对象的格式与actions相同，不同的是，mutations里面的函数可以获得state中存储的数据和传来的新数据

- **具体过程**：

  - `Vue components`指组件，组件可以调用`dispatch(方法, 数据)`这个API来调用actions中的方法改变数据

  - actions中的方法内部调用`commit(方法, 数据)`

  - 数据传给mutations进行最终的修改，保存在state中

  - 重新渲染组件

- **actions的作用（为什么要有dispatch和commit，而不是直接传到mutations中）**：因为有时传给mutations的数据是由后端指定的，在修改前，需要先向后端发送请求获得数据，actions正是发送Ajax请求的地方。除此之外，如果想进行数据的判断/预加工，也是写在这里

  - vuex也提供了在`Vue components`中直接调用commit的功能，适用于不用发送请求、不用额外判断的情况

- 一个比喻：`Vue components`-来吃饭的客人，`store`-饭店、`actions`-服务员，`mutations`-后厨，`state`-做出来的菜

- 图中没有体现的是，Vuex这几个部分都由一个`store`统一管理

#### 基本使用

- 安装：vuex的3.x.x版本适用于Vue2，4.x.x版本适用于Vue3

  - 这里因为是Vue2，所以`npm i vuex@3`

- 在`src`文件夹下创建一个`store`文件夹，里面创建一个`index.js`，用于创建vuex中的store

    ```js
  import vuex from 'vuex'; //引入vuex
  import Vue from 'vue'; //引入vue
  Vue.use(vuex); //使用插件
  const actions = { //actions--用于响应组件中的动作
      方法名(context, value){ //context是上下文对象，value是组件调用时传来的数据
          context.state.数据名 //处理函数
          context.commit(mutations方法名, value); //调用commit
      },
  };
  const mutations = { //mutations--用于操作数据
      方法名(state, value){ //state是存储数据的那个state对象，value就是commit传来的值
          state.数据名 //处理函数
  };
  const state = {
      要存储的数据名: 值,
  }; //state--用于存储数据
  export default new vuex.Store({ //创建并暴露store
      actions,
      mutations,
      state
  });
    ```


    在开发中，actions中的方法名常小写，mutations中大写

- 在`main.js`中引入

    ```js
  import store from './store'; //引入store
  new Vue({
      render: h => h(App),
      store //使用store创建vm
  }).$mount('#app')
    ```


    注意：es6中会无视书写顺序，优先执行import，之后再执行其它语句。而`store/index.js`中`new vuex.Store`需要先执行`Vue.use(vuex)`，如果把它写到`main.js`中就会先执行`import store/index.js`，报错所以要在`store/index.js`中先使用vuex插件

- 在组件中使用

    ```js
  vc.$store.state.数据名 //读取vuex中的数据
  vc.$store.dispatch('action中的方法名', 数据); //调用dispatch修改vuex中的数据
  vc.$store.commit('mutations中的方法名', 数据); //调用commit修改vuex中的数据
    ```




例：下拉框选择每次加减的数量，点击`+`加，点击`-`减，`当前和为奇数再加`先判断当前求和是否为奇数，`等一等再加`延时0.5s再加

![Vuex简介3](/upload/md-image/vue/Vuex简介3.png){:width="300px" height="300px"}

- 普通Vue：

    ```html
  <div>
      <h1>当前求和为：{{count}}</h1>
      <select v-model.number="num">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
      </select>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementOdd">当前和为奇数再加</button>
      <button @click="incrementWait">等一等再加</button>
  </div>
  <script>
  export default {
      name: "MyCount",
      data() {
          return {
              count: 0,
              num: 1
          }
      },
      methods: {
          increment(){
              this.count += this.num;
          },
          decrement(){
              this.count -= this.num;
          },
          incrementOdd(){
              if(this.count%2){
                  this.count += this.num;
              }
          },
          incrementWait(){
              setTimeout(()=>{
                  this.count += this.num;
              }, 500);
          }
      },
  }
  </script>
    ```


    需要注意的是，下拉框要确保里面的是数字型，可以在每个option标签内的value前加冒号`:value="1"`，也可以在select标签内`v-model.number="num"`

- vuex：把`count`存到state中，`increment`系列的处理需要在actions中判断奇数和写延时器，`decrement`直接调commit（因为没有Ajax和判断）

    ```html
  <!-- MyCount.vue -->
  <div>
      <h1>当前求和为：{{$store.state.count}}</h1>
      <select v-model.number="num">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
      </select>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementOdd">当前和为奇数再加</button>
      <button @click="incrementWait">等一等再加</button>
  </div>
  <script>
  export default {
      name: "MyCount",
      data() {
          return {
              num: 1
          }
      },
      methods: {
          increment(){
              this.$store.commit('ADD', this.num);
          },
          decrement(){
              this.$store.commit('MINUS', this.num);
          },
          incrementOdd(){
              this.$store.dispatch('addOdd', this.num);
          },
          incrementWait(){
              this.$store.dispatch('addWait', this.num);
          }
      },
  }
  </script>
    ```


    ```js
  /* index.js */
  import vuex from 'vuex';
  import Vue from 'vue';
  Vue.use(vuex);
  const actions = {
      addOdd(context, value) {
          if (context.state.count % 2) {
              context.commit('ADD', value);
          }
      },
      addWait(context, value) {
          setTimeout(() => {
              context.commit('ADD', value);
          }, 500);
      },
  };
  const mutations = {
      ADD(state, value) {
          state.count += value;
      },
      MINUS(state, value) {
          state.count -= value;
      }
  };
  const state = {
      count: 0
  };
  export default new vuex.Store({ actions, mutations, state });
    ```




---



**vuex开发者工具**：集成在Vue devtools中，无需额外安装

![Vuex简介5](/upload/md-image/vue/Vuex简介5.png){:width="800px" height="800px"}

- 展示的状态改变都是mutations中的，而不是actions



![Vuex简介6](/upload/md-image/vue/Vuex简介6.png){:width="600px" height="600px"}

**三个按钮**：

- 第一个：将该次方法调用及其之前的方法调用合并，合并到BaseState中（将BaseState变成执行完该次方法调用后的样子），同时隐藏这些合并完的方法

- 第二个：取消该次方法执行（撤销），如果撤销的不是最后一次方法，则它之后的方法也会被撤销

- 第三个：回到该次方法被调用时的数据和页面



![Vuex简介7](/upload/md-image/vue/Vuex简介7.png){:width="600px" height="600px"}

**右上角的三个按钮**：

- 第一个：合并所有方法调用

- 第二个：清空所有方法调用

- 第三个：停止监视活动（通常不用）



![Vuex简介8](/upload/md-image/vue/Vuex简介8.png){:width="700px" height="700px"}

**导入和导出按钮**：点击导出后会复制到剪贴版上，点击导入后粘贴即可



---



**补充说明**：

- **为什么要有上下文对象`context`**：除了便于调用commit和state，还可以调用actions中的其它方法`context.dispatch()`，适用于处理逻辑复杂时进行拆分和复用

- **为什么不在actions中直接修改数据**：虽然可以实现逻辑，但因为开发者工具只检测mutations，还是写到mutations中更标准

- **为什么要在actions中写判断逻辑**：当判断逻辑复杂时，可能需要拆分复用

#### getters

类似于Vue中的计算属性，写法类似于mutations和actions，也是写在`index.js`中，不是必需的，当处理逻辑复杂时使用

```js
/* index.js */
const getters = {
    计算属性名(state){ 
        return state.属性 //处理函数
    }
}
export default new vuex.Store({ actions, mutations, state, getters });
/* 组件.vue */
vc.$store.getters.计算属性名
```


例：在上面的案例中，创建一个标签，内容为`count*10`

```js
/* index.js */
const getters = {
    bigSum(state) {
        return state.count * 10;
    }
}
export default new vuex.Store({ actions, mutations, state, getters });
```


```html
<!-- MyCount.vue -->
<h2>当前求和*10为：{{$store.getters.bigSum}}</h2>
```


#### map系列函数

解决每次在组件中调用state/actions/mutations时都要写`this.$store`的问题

需要先在组件中引入这些函数

```js
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
```


- `mapState`：映射state中的数据为计算属性

    ```js
  computed: {
      ...mapState({组件中的变量名:'state中的变量名',}),
      //如果组件中的变量名与state中的变量名相同，还可以写成，下面类似
      ...mapState(['变量名',]),
  },
    ```


- `mapGetters`：映射getters中的数据为计算属性

    ```js
  computed: {
      ...mapGetters({组件中的变量名:'state中的变量名'}),
      ...mapGetters(['变量名'])
  },
    ```


- `mapActions`：映射actions中的函数(dispatch)为methods

    ```js
  /* 原写法 */
  methods方法名(){
      this.$store.dispatch('actions方法名', 数据)
  }
  /* 新写法（还是写在methods中） */
  ...mapActions({methods方法名:'actions方法名',})
  ...mapActions(['方法名'])
  // 标签中写成：@click="methods方法名(数据)"
    ```


- `mapMutations`：映射mutations中的函数(commit)为methods

    ```js
  /* 与上面类似 */
  ...mapMutations({methods方法名:'mutations方法名',}),
  ...mapMutations(['方法名',]),
    ```




注意：

- 简写形式不是`{变量名}`，因为这样会转成`{'变量名': 变量名}`，而不是想要的`{'变量名': '变量名'}`

- mapActions与mapMutations使用时，若需要传递参数，需要在模板中绑定事件时传递，否则默认参数是事件对象



**例：用map系列函数改写上面的案例**

```html
<!-- MyCount.vue -->
<div>
    <h1>当前求和为：{{sum}}</h1>
    <h2>当前求和*10为：{{bigSum}}</h2>
    <select v-model.number="num">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    <button @click="increment(num)">+</button>
    <button @click="decrement(num)">-</button>
    <button @click="incrementOdd(num)">当前和为奇数再加</button>
    <button @click="incrementWait(num)">等一等再加</button>
</div>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
export default {
    name: "MyCount",
    data() { return {num: 1} },
    computed:{
        ...mapState({sum:'count'}),
        ...mapGetters(['bigSum']),
    },
    methods: {
        ...mapMutations({increment:'ADD', decrement:'MINUS'}),
        ...mapActions({incrementOdd:'addOdd', incrementWait:'addWait'})
    },
}
</script>
```


#### 模块化

把`index.js`中的各种state/getters/actions/mutations分类，让代码更好维护，让多种数据分类更加明确

```js
const 模块配置名 = {
    namespaced: true, //开启命名空间
    state: { /* 里面的内容同非模块化时的写法 */ },
    mutations: { },
    actions: { },
    getters: { }
}
const store = new Vuex.Store({
    modules: {模块名: 模块配置名, } //通常这两个名称相同，可以使用简写
})
```


**组件中读取数据**：

```js
//方式一：自己直接读取
this.$store.state.模块名.变量名
this.$store.getters['模块名/方法名']
this.$store.commit('模块名/方法名', 数据) //dispatch相同
//方式二：借助map系列函数读取
...mapState('模块名', [ /* 写法同非模块化时的写法 */ ]), //也可以写成对象形式
```




---



在实际开发中，常把`index.js`中各模块的处理逻辑拆成单独的js文件，暴露模块配置对象，然后在`index.js`中引入并汇总

```js
/* 模块.js */
export default {
    namespaced: true,
    actions: {},
    mutations: {},
    getters: {},
    state: {},
}
/* index.js */
import 模块名 from './模块名'
export default new Vuex.Store({
    modules: {模块名, }
})
```




**例：新增一个组件MyPerson**

```js
/* index.js */
const countOption = {
    namespaced: true,
    mutations: {
        ADD(state, value) {
            state.count += value;
        },
        MINUS(state, value) {
            state.count -= value;
        },
    },
    getters: {
        bigSum(state) {
            return state.count * 10;
        }
    },
    state: {
        count: 0,
    }
};
const personOption = {
    namespaced: true,
    state: {
        persons: ['abc', 'bcd']
    }
};
export default new vuex.Store({ modules: { countOption, personOption } });
```


```html
<!-- MyCount.vue -->
<div>
    <h1>当前求和为：{{count}}</h1>
    <button @click="increment(num)">+</button>
    <button @click="decrement(num)">-</button>
    <h3>下面总人数为{{persons.length}}</h3>
</div>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: "MyCount",
    data() { return {num: 1} },
    computed:{
        ...mapState('countOption', ['count']),
        ...mapState('personOption', ['persons']),
    },
    methods: {
        ...mapMutations('countOption', {increment:'ADD', decrement:'MINUS'}),
    },
}
</script>
<!-- MyPerson.vue -->
<div>
    <h1>人员列表</h1>
    <ul>
        <li v-for="(person, index) in persons" :key="index">{{person}}</li>
    </ul>
    <h3>上面求和*10为{{bigSum}}</h3>
</div>
<script>
import {mapState, mapGetters} from 'vuex';
export default {
    name: "MyPerson",
    data() {return {input: ''} },
    computed:{
        ...mapState('personOption', ['persons']),
        ...mapGetters('countOption', ['bigSum'])
    }
}
</script>
```


### 路由

#### 简介

**路由(route)**是一组key-value的对应关系，多个路由需要经过**路由器(router)**的管理

**目的**：实现**SPA(single page web application)应用**——单页面网站

- 整个应用只有一个完整的页面`index.html`

- 点击页面的导航连接不刷新页面，页面只局部刷新

- 数据需要通过Ajax请求获取



![路由1](/upload/md-image/vue/路由1.png){:width="800px" height="800px"}

- 左侧红框是导航区，选择某个标签时，右侧显示对应的内容（局部刷新），页面url改变，但导航区一直不变且页面不刷新



**实现原理**：点击左侧标签，引起url改变，Vue中的router检测到这一变化，根据配置的路由规则改变展示区的组件（路由的key就是url路径，value就是组件）

**分类**：

- **后端路由**：value是函数，用于处理客户端提交的请求，当服务器接收到请求时，根据请求路径找相应的函数来处理请求响应数据

- **前端路由**：value是组件，用于展示页面内容，当url改变时显示对应组件

#### 基本使用

在Vue中，使用`vue-router`库实现，这是一个插件库，专门用于实现SPA应用

- 安装：`vue-router`的4.x.x版本适用于Vue3，3.x.x版本适用于Vue2

  - 这里因为是Vue2，所以`npm i vue-router@3`

- 在`src`文件夹下创建一个`router`文件夹，里面创建一个`index.js`，用于创建整个应用的路由器

    ```js
  import VueRouter from 'vue-router'
  import Vue from 'vue'
  Vue.use(VueRouter);
  import 组件 from '../components/组件.vue'
  export default new VueRouter({ //创建并暴露一个路由器
      routes:[
          { //指定路径对应的组件
              path:'/路径',
              component:组件
          },
      ]
  })
    ```


- 在`main.js`中引入并使用：

    ```js
  import router from './router'; //引入
  new Vue({
      render: h => h(App),
      router: router //创建router
  }).$mount('#app');
    ```


- 导航区跳转--展示区展示

    ```html
  <router-link active-class="处于该路径时的类名" to="/路径">路径标签（自定义）</router-link>
  <router-view></router-view> <!-- 指定组件的呈现位置 -->
    ```


    `router-link`实际上是一个a标签，在页面中呈现就是a标签，CSS选择器也可使用a标签选中



**补充说明**：

- 组件可分为路由组件和一般组件

  - 路由组件：写在路由规则中，由路由器渲染的组件，一般放在`src/pages`文件夹下

  - 一般组件：需要自己写`<组件/>`调用的，一般放在`src/components`文件夹下

- 在点击导航区跳转时，默认情况下，未展示的路由组件在页面中被销毁（可通过`beforeDestroy()`查看），正在展示的路由组件被挂载（可通过`mounted()`查看）

- 每个组件都有自己的`$route`属性，存储着自己的路由信息

- 整个应用只有一个router，可通过组件的`$router`属性获取



**例：左侧为导航区，右侧为展示区**

![路由2](/upload/md-image/vue/路由2.png){:width="500px" height="500px"}

```js
/* router/index.js */
import VueRouter from 'vue-router'
import MyAbout from '../pages/MyAbout.vue'
import MyHome from '../pages/MyHome.vue'
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: MyAbout
        },
        {
            path: '/home',
            component: MyHome
        },
    ]
})
/* main.js */
import VueRouter from 'vue-router'
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
```


```html
<!-- App.vue -->
<template>
    <div id="app">
        <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
        <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
    </div>
    <router-view></router-view>
</template>
<!-- <script>中不用引入两个组件 -->
<!-- MyHome.vue -->
<template>
    <h2>我是Home的内容</h2>
</template>
<!-- MyAbout.vue -->
<template>
    <h2>我是About的内容</h2>
</template>
```


#### 嵌套路由

**嵌套/多级路由**：即有多层路径，在展示区中再额外设立一套“导航--展示”组件

```js
/* index.js */
export default new VueRouter({
    routes:[
        {
            path:'/父组件路径',
            component:父组件,
            children:[
                {
                    path:'子组件路径', //注意没有斜杠
                    component:子组件,
                },
            ]
        },
    ]
})
```


```html
<!-- 父组件.vue -->
<router-link to="/父组件路径/子组件路径">xxx</router-link>
<router-view></router-view>
```


例：在上面例子的基础上，在`MyHome`中再添加`MyNews`和`MyMessage`

![路由3](/upload/md-image/vue/路由3.png){:width="400px" height="400px"}

```js
/* router/index.js */
import MyNews from '../pages/MyNews.vue'
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: MyAbout
        },
        {
            path: '/home',
            component: MyHome,
            children: [
                {
                    path: 'message',
                    component: MyMessage,
                },
                {
                    path: 'news',
                    component: MyNews,
                },
            ]
        },
    ]
})
```


```html
<!-- MyHome.vue -->
<template>
    <div>
        <h2>Home组件内容</h2>
        <div>
            <ul class="nav nav-tabs">
                <li><router-link class="list-group-item" to="/home/news">News</router-link></li>
                <li><router-link active-class="active" class="list-group-item" to="/home/message">Message</router-link></li>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>
<!-- MyNews.vue -->
<template>
    <ul>
        <li>news001</li>
        <li>news002</li>
        <li>news003</li>
    </ul>
</template>
<!-- MyMessage.vue -->
<template>
    <ul>
        <li><a href="/message1">message001</a>&nbsp;&nbsp;</li>
        <li><a href="/message2">message002</a>&nbsp;&nbsp;</li>
        <li><a href="/message/3">message003</a>&nbsp;&nbsp;</li>
    </ul>
</template>
```


#### 路由命名

目的是简化对象写法中的path参数

```js
/* index.js */
export default new VueRouter({
    routes:[
        {
            name:'路由名称', //还可写在children中
            path:'/组件路径',
            component:组件,
        },
    ]
})
```


```html
<router-link :to="{name:'路由名称'}">xxx</router-link>
```


#### 路由传参

##### params

把参数作为路径的一部分传递(RESTFUL规范)，类似于nodejs中的占位符

```js
/* index.js */
export default new VueRouter({
    routes:[
        {
            name:'路由名称', 
            path:'/组件路径/:key1/:key2', //可以写多个，key前加冒号
            component:组件,
        },
    ]
})
```


```html
<!-- 父组件.vue -->
<!-- 第一种：字符串写法（推荐） -->
<router-link to="/组件路径/value1/value2">xxx</router-link>
<!-- 第二种：对象写法 -->
<router-link :to="{name:'路由名称', params:{key1:value1, }}">xxx</router-link>
```


注：对象写法的`to`中只能写name，不能写path

```js
/* 子组件.vue */
$route.params.key //获取key对应的value值
```


##### query

把参数作为查询字符串传递

路由器`index.js`无需设置

```html
<!-- 父组件.vue -->
<!-- 第一种：字符串写法 -->
<router-link to="/组件路径?key1=value1&key2=value2">xxx</router-link>
<!-- 第二种：对象写法（推荐） -->
<router-link :to="{path:'/组件路径', query:{key1:value1, }}">xxx</router-link>
```


```js
/* 子组件.vue */
$route.query.key //获取key对应的value值
```


例：在`MyMessage`中创建一个展示区`MyDetail`，内容由`MyMessage`中定义的data决定

![路由4](/upload/md-image/vue/路由4.png){:width="500px" height="500px"}

```js
/* router/index.js */
import MyDetail from '../pages/MyDetail.vue'
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: MyAbout
        },
        {
            path: '/home',
            component: MyHome,
            children: [
                {
                    path: 'message',
                    component: MyMessage,
                    children: [
                        {
                            path: 'detail',
                            component: MyDetail,
                        }
                    ]
                },
                {
                    path: 'news',
                    component: MyNews,
                },
            ]
        },
    ]
})
```


```html
<!-- MyMessage.vue -->
<template>
    <div>
        <ul>
            <li v-for="message in messageList" :key="message.id">
                <!-- 字符串写法 -->
                <router-link :to="`/home/message/detail?id=${message.id}&msg=${message.msg}`">{{message.msg}}</router-link>
                <!-- 对象写法 -->
                <router-link :to="{
                    path:'/home/message/detail',
                    query:{
                        id:message.id,
                        msg:message.msg
                    }
                }">
                    {{message.msg}}
                </router-link>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'MyMessage',
    data() {
        return {
            messageList:[
                {id:'001', msg:'message001'},
                {id:'002', msg:'message002'},
                {id:'003', msg:'message003'},
            ]
        }
    },
}
</script>
<!-- MyDetail.vue -->
<template>
    <div>
        <ul>
            <li>消息编号：{{$route.query.id}}</li>
            <li>消息标题：{{$route.query.msg}}</li>
        </ul>
    </div>
</template>
```


#### props配置

写在路由规则中

- **第一种写法**：值为对象，该对象中所有key-value都会以props形式传给组件。使用较少，因为只能传递写死的数据

    ```js
  /* index.js */
  export default new VueRouter({
      routes:[
          {
              path:'/组件路径',
              component:组件,
              props:{key1:value1, }
          },
      ]
  })
  /* 组件.vue */
  export default {
      props: ['key1', ],
  }
    ```


- **第二种写法**：值为bool值，若为true，则把该组件收到的所有params参数，以props形式传给组件

- **第三种写法**：值为回调函数，接收参数`$route`，返回一个对象，以props形式传给组件（使可以把query参数也以props形式传给组件）。最强大，可以同时传递参数或固定数据

    ```js
  props($route){
      return {id:$route.query.id}
  },
  /* 或者使用解构赋值 */
  props({query}){
      return {id:query.id}
  },
  /* 连续解构赋值 */
  props({query:{id, msg}}){
      return {id, msg}
  },
    ```


#### routerlink标签的replace属性

控制路由跳转时操作浏览器历史记录的模式。浏览器的历史记录有两种写入方式：

- push（默认）：追加历史记录，把每次访问的网站依次压入栈中，后退/前进就是操作栈中的指针来寻址

- replace：替换当前记录，即把每次访问的网站替换栈顶元素。假设当前正处于a网址，下一次点击的b网址设置了replace属性，则此时点击后退，应返回a的上一级网址

  如图，依次点击About/Home/News/Message链接，其中News/Message设置了replace属性，则此时后退，应返回About

  ![路由5](/upload/md-image/vue/路由5.png){:width="800px" height="800px"}



```html
<router-link :replace='true'>xxx</router-link>
<!-- 简写： -->
<router-link replace>xxx</router-link>
```


#### 编程式路由导航

不借助`<router-link>`实现路由跳转，用于使用按钮或其它标签而不是a标签进行跳转的情况，或者需要页面自动跳转时

```js
vc.$router.push(/* 里面的参数同routerlink的to属性 */) //push方式跳转
vc.$router.replace(/* 里面的参数同routerlink的to属性 */) //replace方式跳转
vc.$router.forward() //前进
vc.$router.back() //后退
vc.$router.go(n) //可前进也可后退
```


- 若n为正数，就是前进n步；若为负数，就是后退n步（与原生js相同）；若为9则刷新当前路由页面



例：为message的三个链接分别添加添加两个按钮（push和replace跳转），并在banner区域添加前进/后退按钮

```html
<!-- MyMessage.vue -->
<button @click="push(message)">push</button>
<button @click="replace(message)">replace</button>
<script>
    methods: {
        push(message){
            this.$router.push({
                name:'detail',
                params:{
                    id:message.id,
                    msg:message.msg
                }
            })
            //也可以写成：
            // this.$router.push(`/home/message/detail/${message.id}/${message.msg}`)
        },
        replace(message){
            this.$router.replace({
                name:'detail',
                params:{
                    id:message.id,
                    msg:message.msg
                }
            })
        },
    },
</script>
<!-- MyBanner.vue -->
<button @click="forward">前进</button>
<button @click="back">后退</button>
<script>
    methods: {
        forward(){
            this.$router.forward();
        },
        back(){
            this.$router.back();
        },
    },
</script>
```


#### 缓存路由组件

前面说过切换组件时，组件中的元素都被销毁，展示时再重新挂载，如果想让组件不销毁，就可以使用`<keep-alive>`包裹在`<router-view>`外面，例如如果组件中有输入框，想让切换组件时保存输入框中的内容

```html
<keep-alive include="想缓存的路由组件名">
    <router-view></router-view>
</keep-alive>
<!-- 如果有多个想缓存的组件 -->
<keep-alive :include="['组件名1', '组件名2', ]">
<keep-alive include="组件名1,组件名2,"> <!-- 中间不要有空格 -->
```


- 如果不写include配置项，则使用到的组件全部被缓存

#### 路由组件独有的两个生命周期钩子

- `activated`激活：切换到该组件时

- `deactivated`失活：切换到别的组件时



与是否缓存无关，只取决于是否正在展示该组件

例：在一个需要缓存的组件`MyNews`中添加一个随时间变化而改变opacity的标签

- 如果使用mounted和beforeDestroy，则因为缓存，beforeDestroy不会被执行，定时器也就不会被关闭



```html
<!-- MyHome.vue -->
<keep-alive include="MyNews">
    <router-view></router-view>
</keep-alive>
<!-- MyNews.vue -->
<template>
    <ul>
        <p :style="{opacity}">opacity不断变化</p>
        <li>news001</li> <input type="text">
        <li>news002</li> <input type="text">
        <li>news003</li> <input type="text">
    </ul>
</template>
<script>
export default {
    name: 'MyNews',
    data() {return {opacity: 1}},
    activated() {
        this.timer = setInterval(()=>{
            this.opacity -= 0.01;
            if(this.opacity <= 0) this.opacity = 1;
        }, 16);
    },
    deactivated() {
        clearInterval(this.timer);
    },
}
</script>
```


#### 路由守卫

给路由设置权限，具有某些权限时才能点击路由

##### 全局前置和后置

给`router/index.js`中创建的`VueRouter`实例对象上添加：

- `beforeEach`方法（全局前置）：接收一个回调函数，在**初始化时**和**每次切换路由前**被调用

- `afterEach`方法（全局后置）：接收一个回调函数，在**初始化时**和**每次切换路由后**被调用，是已经进入该路由之后执行的



```js
const router = new VueRouter({...})
router.beforeEach((to, from, next)=>{
    //to：要跳转到哪个路由
    //from：现在正处于哪个路由
    next(); //继续执行跳转操作（类似于nodejs中的next）
})
router.afterEach((to, from)=>{ //没有next
    //to：要跳转到哪个路由
    //from：现在正处于哪个路由
})
export default router;
```


to和from的属性值：（这里以从About跳转到Home为例）

![路由6](/upload/md-image/vue/路由6.png){:width="600px" height="600px"}

例：在本地存储中存一个`name`属性，只有其值为`"abc"`时才允许访问`News`页面

```js
router.beforeEach((to, from, next) => {
    if (to.fullPath === "/home/news") {
        if (localStorage.getItem('name') === 'abc') {
            next();
        } else alert('禁止访问');
    } else next();
})
```




---



简化`to.xxx === "xxx"`的判断：给需要设置权限的路由增加配置项`meta`，值为一个对象，可以存放需要判断的权限类型，或者其它信息（如标题等等）

```js
const router = new VueRouter({
    routes: [
        {
            path: 'xxx',
            component: xxx,
            meta:{isAuth: true} //isAuth也可以写成别的
        },
    ]
}
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) { //如果需要鉴权
        if ( /* 判断是否有权限的语条件 */ ) {
            next();
        }
    } else next();
})
```


例：给`News`页面加标题（页面标签）

```js
const router = new VueRouter({
    routes: [
                {
                    path: 'news',
                    component: MyNews,
                    meta: { title: '新闻', isAuth: true },
                },
            ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (localStorage.getItem('name') === 'abc') {
            next();
        } else alert('禁止访问');
    } else next();
})
router.afterEach((to, _) => {
    document.title = to.meta.title || 'default';
})
```


##### 独享

即给某个组件单独设置路由守卫，写在路由配置项里面，与全局前置类似，但没有后置

```js
const router = new VueRouter({
    routes: [{
        path: 'xxx',
        component: xxx,
        beforeEnter: (to, from, next) => {
            //参数含义和使用方法同全局前置
        },
    },]
})
```


##### 组件内

也是给某个组件单独设置路由守卫，但写在组件配置项中，

- `beforeRouteEnter`方法：通过路由规则，进入该组件时被调用

- `beforeRouteLeave`方法：通过路由规则，离开该组件时被调用



“通过路由规则”：指通过路由跳转，而不是直接使用`<组件/>`引入

```js
export default {
    name: 'MyNews',
    beforeRouteEnter (to, from, next) {
        //参数含义和使用方法同全局前置
    },
    beforeRouteLeave (to, from, next) {
        //to是要去往的组件，from是当前组件
    }
}
```


两个函数的调用时刻类似于`activated`和`deactivated`，只是这两个函数有`to/from/next`三个参数，可以进行放行/阻止操作

#### hash和history模式

**hash模式**：前面的例子中，网址都是`http://localhost:8080/#/xxx`的形式，中间有一个井号，我们把`#`及其后面的部分称为hash值，这部分路径不会包含在HTTP请求中，即不会传给服务器（以该路径作为url，发送请求时，服务器不会把#后的部分作为请求url）

**history模式**：没有#，直接是路径，全部url都会传给服务器

```js
/* router/index.js */
const router = new VueRouter({
    mode: 'history', //设置为history模式
    routes: [...]
})
```


除了路径不同的其它区别：

- hash模式中，若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法

- hash模式对浏览器的兼容性较好，history模式略差

- 应用上线时，history模式在后端需要额外处理

### 项目上线

工作目录中输入`npm run build`，生成一个`dist`文件夹

![项目上线1](/upload/md-image/vue/项目上线1.png){:width="200px" height="200px"}

生成的`index.html`不能直接用浏览器打开，必须在服务器上部署，这里使用express框架

- 在一个空目录中安装express：`npm i express`

- 新建一个文件夹`static`（或`public`），把上面`dist`文件夹中的内容复制进去

- 新建一个`server.js`用于启动服务器

    ![项目上线2](/upload/md-image/vue/项目上线2.png){:width="200px" height="200px"}

  - **hash模式**：

    ```js
  /* server.js */
  const express = require('express');
  const app = express();
  app.use(express.static(__dirname + '/static'));
  app.listen(5000, err => { //在5000端口上
      if (!err) console.log('服务器启动成功');
  });
    ```


  - **history模式**：如果仍使用上面的代码，当未处于首页时，刷新页面时会404，因为把全部路径都当成了请求url，而静态资源中只有一个index.html

    首先安装`connect-history`包：`npm i connect-history-api-fallback`

    ```js
  /* server.js */
  const express = require('express');
  const history = require('connect-history-api-fallback');
  const app = express();
  app.use(history());
  app.use(express.static(__dirname + '/static'));
  app.listen(5000, err => {
      if (!err) console.log('服务器启动成功');
  });
    ```


- 此时访问`http://127.0.0.1:5000/`即可

### UI组件库

组件库都是基于前端框架的(Vue/React/Angular)，通常分为移动端和PC端

**移动端**：

- [Vant](https://youzan.github.io/vant)

- [Cube UI](https://didi.github.io/cube-ui)

- [Mint](https://mint-ui.github.io)



**PC端**：

- [Element UI](https://element.eleme.cn)

- [Ant Design](https://www.antdv.com/docs/vue/introduce-cn)

- [IView UI](https://www.iviewui.com)



---



以element-ui为例：

- 安装：`npm i element-ui`

- 在`main.js`中引入

  - 完整引入：引入提供的全部CSS样式，会造成引入的js文件过大

    ```js
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  Vue.use(ElementUI);
    ```


  - 按需引入：先安装一个包`npm i babel-plugin-component -D`（开发依赖）

    ```js
  /* babel.config.js */
  module.exports = {
  presets: [
      '@vue/cli-plugin-babel/preset',
      ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
      [
      "component",
      {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
      }
      ]
  ]
  }
  /* main.js */
  import {组件对象名, } from 'element-ui';
  Vue.use(组件对象名); //也可以↓
  Vue.component('给组件重命名', 组件对象名); //之后组件名就是重命名后的
    ```


    一般情况下，引入的对象名就是组件名去掉`el`后转成大驼峰命名

- 在任意组件中使用：

    ```js
  /* main.js */
  import { Button, DatePicker, Row } from 'element-ui';
  Vue.use(Button);
  Vue.use(DatePicker);
  Vue.component('MyRow', Row); //仅是为了演示component的用法
    ```


    ```html
  <template>
      <div>
          <MyRow>
              <el-button>默认按钮</el-button>
              <el-button type="primary">主要按钮</el-button>
              <el-button type="success">成功按钮</el-button>
          </MyRow>
          <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
      </div>
  </template>
    ```

{% endraw %}

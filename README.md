使用[Jekyll](https://jekyllrb.com/)的[Alembic](https://github.com/daviddarnes/alembic)模板

创建于2024-06-29，主要存档各类学习笔记以及个人网站文字内容

lwstkhyl的新网站：[lwstkhyl.me](https://lwstkhyl.me/)

---

**项目结构**：

```
.
├── _includes 网页模板各组成部分
│   ├── nav-header.html 导航栏
│   ├── nav-footer.html 底部栏右侧
│   ├── site-footer.html 底部栏
│   └── ...
├── _layouts 网页模板，由_includes中的各组分拼接而来
│   ├── default.html 基础模板，是其它各模板的基础框架
│   ├── mypost.html 各笔记使用的模板
│   ├── talk_at_night.html 个人空间使用的模板
│   ├── page.html 网站其它页面使用的模板
│   └── ...
├── _posts 笔记的md形式，用于生成网页版笔记
├── _sass 框架自带的CSS/SASS样式
├── _site 框架根据各模板/笔记等自己生成的网页代码，是实际呈现的网页，无需自己更改
├── .github github配置项，通常无需更改
├── .jekyll-cache 保留jekyll serve时生成的页面和标记的副本，以便更快推送服务，通常无需更改
├── assets 存储网页其它的配置文件
│   ├── css 各种CSS文件
│   │   ├── base.css 各页面的基础CSS，包括头部/尾部样式、去除a标签点击后边框等
│   │   ├── code_copy.css 代码复制按钮
│   │   ├── code_number.css 代码行数
│   │   ├── content.css 笔记页(mypost.html)CSS
│   │   ├── down_li.css 导航栏下拉子菜单
│   │   ├── iconfont系列 字体图标
│   │   ├── img_click.css 点击图片放大
│   │   ├── lazyload.css 图片懒加载--未加载出来时的样式
│   │   ├── page.css page.html页CSS
│   │   ├── scrollspy.css 笔记页目录和回到顶部按钮
│   │   └── spinner.css 页面加载动画
│   ├── logos 网页图标
│   ├── scripts 各种JS文件
│   │   ├── change_a.js 改变a标签跳转方式：如果是链接就在新页面中打开，如果是锚点就跳转到对应标题
│   │   ├── code_copy.js 代码复制按钮
│   │   ├── code_number.js 代码行数
│   │   ├── confirm_href.js 调整导航栏中a标签的跳转链接
│   │   ├── down_li.js 导航栏下拉子菜单
│   │   ├── fetch.js 框架自带
│   │   ├── img_click.js 点击图片放大
│   │   ├── jquery.min.js jquery源码
│   │   ├── lazyload.js 图片懒加载
│   │   ├── load_img.js 页面加载动画显示图片已加载数量
│   │   ├── scrollspy.js 笔记页目录和回到顶部按钮
│   │   ├── site.js 所在页导航栏标签变灰，用于标识现在正处于哪页中
│   │   ├── spinner.js 页面加载动画
│   │   ├── sw.js 框架自带
│   │   └── toc.js 用于生成笔记页目录
│   └── ... 其它框架自带配置文件，无需更改
├── not_use_file 暂时不用的文件，包括框架自带的一些展示网页、测试功能时使用过的文件等
├── upload 需要经常新增的文件，一般是笔记中的图片、案例等
│   ├── html-example 笔记中的HTML案例
│   ├── md-image 笔记中的图片
│   └── other 其它文件
├── _config.yml 项目配置文件
├── .gitignore git忽略的文件，通常无需更改
├── 404.md 网址无法加载/网址不存在时显示的页面
├── elements.md Alembic样式展示
├── Gemfile系列 框架运行的配置文件，只需在第一次运行错误时更改
├── HTML-CSSbase.html CSS基础教程笔记总展示页面
├── HTML-HTML.html HTML笔记
├── HTML-other.html HTML与CSS的其它内容
├── HTML.html 所有HTML与CSS笔记
├── index.md 网站首页
├── JS-jQuery.html jQuery与ECharts笔记
├── JS-JSbase.html JS基础教程笔记
├── JS-NodeJS.html Node.js、AJAX、Promise、Axios笔记
├── JS-other.html JS的其它内容
├── JS-Vue.html Vue教程笔记
├── JS.html 所有JS笔记
├── linux-shell-base.html linux和shell笔记
├── my_echarts.html 个人创作的echarts图表应用（还未完成）
├── other-other.html 其它内容的其它内容（一般为临时创建的笔记等）
├── other.html 其它内容
├── python-database.html 数据分析基础教程笔记
├── python-other.html python的其它内容
├── python-pythonbase.html python基础教程笔记
├── python.html 所有python笔记
├── r-biobase.html 生信基础课程笔记
├── r-bioinfolesson.html b站生信课程笔记
├── r-other.html R与生信的其它内容
├── r-rbase.html R基础教程笔记
├── r.html 所有R与生信笔记
├── README.md GitHub的readme
├── talk_at_night.html 个人空间
└── 其它都是框架自带文件，无需更改
```

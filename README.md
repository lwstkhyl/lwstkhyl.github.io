使用[Jekyll](https://jekyllrb.com/)的[Alembic](https://github.com/daviddarnes/alembic)模板
创建于2024-06-29，正在持续制作中

---

**项目结构**：
`.`
├── `_includes` 网页模板各组成部分
│   ├── `nav-header.html` 导航栏
│   ├── `nav-footer.html` 底部栏右侧
│   ├── `site-footer.html` 底部栏
│   └── ...
├── `_layouts` 网页模板，由_includes中的各组分拼接而来
│   ├── `default.html` 基础模板，是其它各模板的基础框架
│   ├── `mypost.html` 各笔记使用的模板
│   ├── `page.html` 网站其它页面使用的模板
│   └── ...
├── `_posts` 笔记的md形式，用于生成网页版笔记
├── `_sass` 框架自带的CSS/SASS样式
├── `_site` 框架根据各模板/笔记等自己生成的网页代码，是实际呈现的网页，无需自己更改
├── `.github` github配置项，通常无需更改
├── `.jekyll-cache` 保留jekyll serve时生成的页面和标记的副本，以便更快推送服务，通常无需更改
├── `assets` 存储网页其它的配置文件
│   ├── `css` 各种CSS文件
│   │   ├── `base.css` 各页面的基础CSS，包括头部/尾部样式、去除a标签点击后边框等
│   │   ├── `code_copy.css` 代码复制按钮
│   │   ├── `code_number.css` 代码行数
│   │   ├── `content.css` 笔记页(mypost.html)CSS
│   │   ├── `down_li.css` 导航栏下拉子菜单
│   │   ├── `iconfont系列` 字体图标
│   │   ├── `page.css` page.html页CSS
│   │   └── `scrollspy.css` 笔记页目录和回到顶部按钮
│   ├── `logos` 网页图标
│   ├── `scripts` 各种JS文件
│   │   ├── `click_header.js` 控制笔记页双击标题跳转
│   │   ├── `code_copy.js` 代码复制按钮
│   │   ├── `code_number.js` 代码行数
│   │   ├── `down_li.js` 导航栏下拉子菜单
│   │   ├── `fetch.js` 框架自带
│   │   ├── `jquery.min.js` jquery源码
│   │   ├── `scrollspy.js` 笔记页目录和回到顶部按钮
│   │   ├── `site.js` 所在页导航栏标签变灰，用于标识现在正处于哪页中
│   │   ├── `sw.js` 框架自带
│   │   └── `toc.js` 用于生成笔记页目录
│   └── ... 其它框架自带配置文件，无需更改
├── `not_use_file` 暂时不用的文件，包括框架自带的一些展示网页、测试功能时使用过的文件等
├── `upload` 需要经常新增的文件，一般是笔记中的图片、案例等
│   ├── `html-example` 笔记中的HTML案例
│   ├── `md-image` 笔记中的图片
│   └── `other` 其它文件
├── `_config.yml` 项目配置文件
├── `.gitignore` git忽略的文件，通常无需更改
├── `404.md` 网址无法加载/网址不存在时显示的页面
├── `elements.md` Alembic样式展示，之后会移除
├── `Gemfile系列` 框架运行的配置文件，只需在第一次运行错误时更改
├── `HTML.html` HTML与CSS笔记总展示页面
├── `index.md` 网站首页
├── `JS.html` JS笔记总展示页面
├── `python.html` python笔记总展示页面
├── `r.html` R与生信笔记总展示页面
├── `README.md` GitHub的readme
├── `test.html` 新增功能（还未完成）
└── 其它都是框架自带文件，无需更改

[更多关于Jekyll的结构介绍](https://blog.csdn.net/qq_33919450/article/details/127886006)

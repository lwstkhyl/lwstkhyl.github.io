const debounce = (fn, delay) => {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    }
};
function is_mobile() { //是不是移动设备
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        return true;
    }
}
$(document).ready(function () {
    const down_ul = $("nav ul.sub_nav"); //全部的下拉菜单ul
    if (!down_ul) return; //如果没有下拉菜单就退出
    down_ul.each(function (index, dom) {
        $(dom).css("display", "flex"); //给ul设置默认display样式为flex
        $(dom).hide(); //ul默认隐藏
        const parent = $(dom).parent()[0];  //下拉子菜单的父级li
        const parent_a = $(parent).children("a.no-hover");  //父级li中的a
        const down_point = $(parent).children("a.no-hover").children("span.icon-down-line-free"); //向下箭头
        const down_li = $(dom).children("li.sub_nav"); //子级li
        const down_a = $(dom).children("li.sub_nav").children("a.sub_nav"); //子级li中的a
        const other_parent = $(parent).siblings("li.item--nav"); //其它父级li
        const other_parent_a = $(parent).siblings("li.item--nav").children("a.no-hover"); //其它父级li中的a
        const other_ul = $(parent).siblings("li.item--nav").children("ul.sub_nav"); //其它下拉子菜单
        const other_ul_li = $(parent).siblings("li.item--nav").children("li.sub_nav"); //其它下拉子菜单中的li
        const other_ul_a = $(parent).siblings("li.item--nav").children("a.sub_nav"); //其它下拉子菜单中的a
        //计算ul应该在的位置↓
        function update_position(ul, parent) { //更新ul位置
            // const { top, left } = parent.offset();
            const { top, left } = parent[0].getBoundingClientRect();
            const parent_height = parent.height();
            ul.css("top", top + parent_height * 2 / 3);
            ul.css("left", left);
        }
        const update_position_resize_func = () => update_position($(dom), $(parent)); //更新ul位置
        function update_resize_func() { //更新ul位置及宽度
            down_ul.css("height", " fit-content");
            update_position($(dom), $(parent));
        }
        //窄屏展开/关闭时调整zindex↓
        function mouse_on_mobile() {
            $(parent).css("z-index", "1002");
            parent_a.css("z-index", "1002"); //当前展开的父级li和其中的a，它们优先级最高
            $(dom).css("z-index", "1001");
            down_li.css("z-index", "1001");
            down_a.css("z-index", "1001"); //当前展开的下拉子菜单和其中的a，它们优先级第二
            other_parent.css("z-index", "1000");
            other_parent_a.css("z-index", "1000"); //其它父级li和其中的a，它们优先级第三
            other_ul.css("z-index", "999");
            other_ul_li.css("z-index", "999");
            other_ul_a.css("z-index", "999"); //其它下拉子菜单和其中的a，它们优先级最低
        }
        //宽屏展开/关闭时调整zindex↓
        function mouse_on_pc() {
            other_ul.css("z-index", "999");
            other_ul_li.css("z-index", "999");
            other_ul_a.css("z-index", "999");
            $(dom).css("z-index", "1000");
            down_li.css("z-index", "1000");
            down_a.css("z-index", "1000");
            $(parent).css("z-index", "1002");
            parent_a.css("z-index", "1002");
            other_parent.css("z-index", "1001");
            other_parent_a.css("z-index", "1001");
        }
        //重置zindex↓
        function reset_zindex() {
            $(dom).css("z-index", "999");
            down_li.css("z-index", "999");
            down_a.css("z-index", "999");
            $(parent).css("z-index", "1000");
            parent_a.css("z-index", "1000");
        }
        //为下拉菜单初始化位置，并添加hover事件
        const add_event = () => {
            update_position_resize_func();
            if (!is_mobile()) { //pc端
                parent_a.mouseenter(() => { //鼠标移入就显示
                    if ($("button.button--nav").css("display") === "none") { //宽屏
                        mouse_on_pc();
                        down_point.css("transform", "rotate(0)");
                        $(dom).stop().slideDown("normal", "swing");
                    }
                    else { //窄屏
                        mouse_on_mobile();
                        down_point.css("transform", "rotate(0)");
                        $(dom).stop().slideDown("normal", "swing");
                    }
                });
                $(parent).mouseleave(() => { //鼠标移出时隐藏
                    down_point.css("transform", "rotate(-90deg)");
                    $(dom).stop().slideUp("fast", "swing", reset_zindex);
                });
            }
            else { //移动端
                parent_a[0].addEventListener('touchstart', () => {
                    if ($(dom).css('display') !== 'none') { //如果显示就隐藏
                        down_point.css("transform", "rotate(-90deg)");
                        $(dom).stop().slideUp("fast", "swing", reset_zindex);
                    }
                    else { //如果隐藏就显示
                        mouse_on_mobile();
                        down_point.css("transform", "rotate(0)");
                        $(dom).stop().slideDown("normal", "swing");
                    }
                });
                parent.addEventListener('mouseleave', () => { //移开时隐藏
                    down_point.css("transform", "rotate(-90deg)");
                    $(dom).stop().slideUp(0, "swing", reset_zindex);
                });
            }
        }
        if ($("a.logo img")[0]) { //如果有头像框就等待它加载完成后添加hover事件
            let timer = setInterval(function () {
                if ($("a.logo img")[0].complete) {
                    clearInterval(timer);
                    setTimeout(add_event, 0);
                }
            }, 100);
        }
        else { //没有就直接添加
            setTimeout(add_event, 200);
        }
        // $(document).ready(() => setTimeout(add_event, 200)); //待元素加载完毕后添加hover事件
        //页面尺寸变化时更新top/left
        window.addEventListener('resize', debounce(update_resize_func, 100));
        //点击后更改样式
        down_a.on("click", function () {
            $(this).addClass("current").siblings().removeClass("current");
        });
    });
    //获取网站标题
    const url_list = location.href.split('/');
    const title = url_list[url_list.length - 2];
    //根据网站标题更改对应a的样式
    $("nav ul.sub_nav li.sub_nav a.sub_nav").each(function (index, dom) {
        const href_list = $(dom).prop("href").split('/');
        const a_title = href_list[href_list.length - 2];
        if (a_title == title) {
            $(dom).addClass("current").siblings().removeClass("current");
            $(dom).parent("li.sub_nav").parent("ul.sub_nav").parent("li.item--nav").children("a.no-hover").addClass("current").siblings().removeClass("current");
            return;
        }
    });
});
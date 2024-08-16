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
$(document).ready(function () {
    const down_ul = $("nav ul.sub_nav"); //获取全部的下拉菜单ul
    if (!down_ul) return; //如果没有就退出
    down_ul.each(function (index, dom) {
        $(dom).css("display", "flex"); //给ul设置默认display样式为flex
        $(dom).hide(); //ul默认隐藏
        const parent = $(dom).parent()[0];  //父级li
        const parent_a = $(parent).children("a.no-hover");  //父级li中的a
        const down_point = $(parent).children("a.no-hover").children("span.icon-down-line-free"); //向下箭头
        const down_a = $(dom).children("li.sub_nav").children("a.sub_nav"); //子级li
        const update_position_resize_func = () => update_position($(dom), $(parent)); //更新ul位置
        const update_resize_func = () => { //更新ul位置及宽度
            down_ul.css("height", " fit-content");
            update_position($(dom), $(parent));
        }
        const change_zindex_mouseon_func = () => change_zindex_mouseon($(dom), down_a, $(parent), parent_a); //鼠标进入父级li时改变z-index
        const change_zindex_mouseout_func = () => change_zindex_mouseout($(dom), down_a, $(parent), parent_a); //鼠标退出父级li时改变z-index
        const change_zindex_mouseon1_func = () => change_zindex_mouseon1($(dom), down_a, $(parent), parent_a); //鼠标进入父级li时改变z-index
        const change_zindex_mouseon2_func = () => change_zindex_mouseon2($(dom), down_a, $(parent), parent_a); //鼠标进入父级li时改变z-index
        const add_event = () => { //为下拉菜单初始化位置，并添加hover事件
            update_position_resize_func();
            $(parent).hover(() => { //鼠标移入就显示
                if ($("button.button--nav").css("display") === "none") {
                    change_zindex_mouseon1_func();
                    down_point.css("transform", "rotate(0)");
                    $(dom).stop().slideDown("normal", "swing", change_zindex_mouseon2_func);
                }
                else {
                    change_zindex_mouseon_func();
                    down_point.css("transform", "rotate(0)");
                    $(dom).stop().slideDown("normal", "swing");
                }
            }, () => { //鼠标移出时隐藏
                if ($("button.button--nav").css("display") === "none") {
                    down_point.css("transform", "rotate(-90deg)");
                    change_zindex_mouseout_func();
                    $(dom).stop().slideUp("normal", "swing");
                }
                else {
                    down_point.css("transform", "rotate(-90deg)");
                    $(dom).stop().slideUp("normal", "swing", change_zindex_mouseout_func);
                }
            });
        }
        if ($("a.logo img")[0])
            $("a.logo img").on("onload", () => setTimeout(add_event, 0)); //待元素加载完毕后添加hover事件
        else {
            $(window).on("load", () => setTimeout(add_event, 0));
        }
        // $(document).ready(() => setTimeout(add_event, 200)); //待元素加载完毕后添加hover事件
        //页面尺寸变化时更新top/left
        window.addEventListener('resize', debounce(update_resize_func, 100));
        //点击后更改样式
        down_a.on("click", function () {
            $(this).addClass("current").siblings().removeClass("current");
        });
    });
    //解决z-index冲突：让展示出来的ul优先级比它对应的主菜单li小，比其它的li大
    function change_zindex_mouseon(ul, down_a, parent, parent_a) { //鼠标进入父级li时改变z-index
        ul.css("z-index", "1001");
        down_a.css("z-index", "1001");
        parent.css("z-index", "1002");
        parent_a.css("z-index", "1002");
    }
    function change_zindex_mouseon2(ul, down_a, parent, parent_a) { //鼠标进入父级li时改变z-index
        ul.css("z-index", "1001");
        down_a.css("z-index", "1001");
    }
    function change_zindex_mouseon1(ul, down_a, parent, parent_a) { //鼠标进入父级li时改变z-index
        parent.css("z-index", "1002");
        parent_a.css("z-index", "1002");
    }
    function change_zindex_mouseout(ul, down_a, parent, parent_a) { //鼠标退出父级li时改变z-index
        ul.css("z-index", "999");
        down_a.css("z-index", "999");
        parent.css("z-index", "1000");
        parent_a.css("z-index", "1000");
    }
    function update_position(ul, parent) { //更新top/left
        // const { top, left } = parent.offset();
        const { top, left } = parent[0].getBoundingClientRect();
        const parent_height = parent.height();
        ul.css("top", top + parent_height * 2 / 3);
        ul.css("left", left);
    }
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
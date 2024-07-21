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
    const down_ul = $("nav ul.sub_nav"); //获取全部的下拉菜单
    if (!down_ul) return; //如果没有就退出
    down_ul.each(function (index, dom) {
        $(dom).css("display", "flex"); //给ul设置默认display样式为flex
        $(dom).hide(); //ul默认隐藏
        const parent = $(dom).parent()[0];  //父级li
        const down_point = $(parent).children("a.no-hover").children("span.icon-down-line-free"); //向下箭头
        const down_a = $(dom).children("li.sub_nav").children("a.sub_nav"); //子级li
        const update_position_resize_func = () => update_position($(dom), $(parent)); //页面尺寸变化时更新
        const add_event = () => { //为下拉菜单设置位置、添加hover事件
            update_position_resize_func();
            $(parent).hover(() => { //鼠标移入就显示
                down_point.css("transform", "rotate(0)");
                $(dom).stop().slideDown();
            }, () => { //鼠标移出时隐藏
                down_point.css("transform", "rotate(-90deg)");
                $(dom).stop().slideUp();
            });
        }
        setTimeout(add_event, 100); //待元素加载完毕后添加hover事件
        //页面尺寸变化时更新top/left
        window.addEventListener('resize', debounce(update_position_resize_func, 100));
        //点击后更改样式
        down_a.on("click", function () {
            $(this).addClass("current").siblings().removeClass("current");
        });
    });
    function update_position(ul, parent) { //更新top/left
        const { top, left } = parent.offset();
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
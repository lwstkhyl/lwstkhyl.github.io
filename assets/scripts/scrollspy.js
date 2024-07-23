const throttle = (func, wait = 0) => { //节流，wait毫秒执行一次
    let timer; //定时器变量
    return () => {
        if (!timer) { //没有定时器
            timer = setTimeout(() => {
                func();  //执行函数
                timer = null; //清除定时器
            }, wait);
        }
    };
};
function isElementOverlapped(elementA, elementB) { //元素AB是否重叠
    let offsetA = (elementA).offset();
    let offsetB = (elementB).offset();
    let topA = offsetA.top;
    let leftA = offsetA.left;
    let bottomA = topA + (elementA).outerHeight();
    let rightA = leftA + (elementA).outerWidth();
    let topB = offsetB.top;
    let leftB = offsetB.left;
    let bottomB = topB + (elementB).outerHeight();
    let rightB = leftB + (elementB).outerWidth();
    return !(
        bottomA < topB ||
        rightA < leftB ||
        topA > bottomB ||
        leftA > rightB
    );
}
$(document).ready(function () {
    //元素获取
    const h_list = $('h3,h4,h5'); //所有的标题
    const a_list = $('.toc a'); //所有的目录a标签
    if (a_list.length == 0) return; //如果没有目录就退出
    a_list.prop('href', '#'); //禁用a标签锚点跳转
    const toc = $('.toc'); //目录标签
    setTimeout(() => toc.css("opacity", 0.2), 110);
    let nav_height = $("header.header").height(); //顶部导航栏高度，用于调节滚动距离
    //目录是否随内容滚动按钮
    const is_scroll = $(`
            <div class="scrollspy-is-scroll">
                <div><input id="scrollspy-is-scroll1" type="checkbox" checked /><label for="scrollspy-is-scroll1">目录随内容滚动</label></div>
                <div><input id="scrollspy-is-scroll2" type="checkbox" /><label for="scrollspy-is-scroll2">内容随目录滚动</label></div>
            </div>`); //制作是否跟随按钮
    toc.after(is_scroll); //添加
    setTimeout(() => is_scroll.css("opacity", 0.2), 110);
    const is_scroll1 = $('#scrollspy-is-scroll1'); //目录是否随内容滚动
    const is_scroll2 = $('#scrollspy-is-scroll2'); //内容是否随目录滚动
    //判断是否有滚动条，如果没有滚动条就不显示两个单选框
    function have_scroll(div) {
        div.scrollTop(10);
        let flag;
        if (div.scrollTop() > 0) flag = true; //有滚动条
        else flag = false;
        div.scrollTop(0);
        return flag;
    }
    if (!have_scroll(toc)) { //如果没有滚动条，不显示两个单选框
        is_scroll1.prop('checked', false);
        is_scroll2.prop('checked', false);
        is_scroll.css('display', 'none');
    }
    //回到顶部按钮
    let backtotop = $('<div class="scrollspy-backtotop">回到顶部</div>'); //制作回到顶部按钮
    if ($(document).scrollTop() >= h_list.eq(0).offset().top - nav_height && $(".scrollspy-backtotop").length == 0 && !isElementOverlapped(toc, $("article.article")))
        toc.after(backtotop); //添加
    function update_backtotop() { //更新回到顶部按钮
        if ($(".scrollspy-backtotop").length == 0)
            toc.after(backtotop); //添加
        if ($(document).scrollTop() >= h_list.eq(0).offset().top - nav_height) //当滑到第一个标题后出现
            backtotop.show();
        else
            backtotop.hide();
    }
    backtotop.on('click', function () { //点击后滚动回顶部
        is_click = true; //点击了按钮，进行上锁的操作
        a_list.removeClass("current");
        $("body,html").stop().animate({ //进行滚动
            scrollTop: 0
        }, function () { //animate回调函数，当动画播放完执行
            is_click = false; //滚动完了就把锁打开
        });
        if (!is_scroll1.prop('checked')) return;
        toc.stop().animate({
            scrollTop: 0
        });
    });
    //窗口尺寸变化事件：回到顶部按钮和目录是否有重叠，使用顶部导航栏高度调节滚动距离
    const resize_func = () => {
        nav_height = $("header.header").height(); //更新顶部导航栏高度
        if (isElementOverlapped(toc, $("article.article"))) { //如果有重叠就隐藏
            toc.css("display", "none");
            backtotop.css("display", "none");
            is_scroll.css("display", "none");
        } else {
            toc.css("display", "block");
            backtotop.css("display", "block");
            is_scroll.css("display", "block");
        }
    };
    setTimeout(resize_func, 100);
    window.addEventListener('resize', debounce(resize_func, 100));
    //点击目录a标签跳转到对应标题
    let is_click = false; //添加判断条件--是否是因为点击了按钮而滚动
    a_list.on("click", function () {
        is_click = true; //点击了按钮，进行上锁的操作
        const a_index = a_list.index(this); //点击的是第几个li
        const scroll_distance = h_list.eq(a_index).offset().top; //它对应的h标签距页面顶端距离
        $("body,html").stop().animate({ //进行滚动
            scrollTop: scroll_distance - nav_height
        }, function () { //animate回调函数，当动画播放完执行
            is_click = false; //滚动完了就把锁打开
        });
        a_list.removeClass("current");
        $(this).addClass("current");
        update_div_scroll_distance(a_index, is_scroll1.prop('checked'));
    });
    //根据页面滚动距离更改目录div标签滚动距离
    function update_div_scroll_distance(i, is_update = true) {
        if (!is_update) return;
        const top_distance = a_list.eq(i).position().top - a_list.eq(0).position().top; //指定a标签距顶端距离
        const improve_distance = parseInt(a_list.eq(0).css('height')) + parseInt(a_list.eq(i).css('height')); //修正值，让标签更加居中
        let scroll_height = top_distance - parseInt(toc.css('height')) / 2 + improve_distance; //应滚动的距离（让指定a标签居中）
        if (scroll_height <= 0) scroll_height = 0;
        toc.stop().animate({
            scrollTop: scroll_height
        });
    }
    //根据目录div标签滚动距离更改页面滚动距离
    let is_in_toc = false; //鼠标是否在目录div中
    $(document).mousemove(function (e) {
        if (toc.css('opacity') == 1) {
            is_in_toc = true;
        } //鼠标在目录div中
        else { is_in_toc = false; } //鼠标不在目录div中
    });
    function get_h() { //得到当前处于目录div中间的是第几个标题
        if (!is_scroll2.prop('checked')) return -1;
        const improve_distance = parseInt(a_list.eq(0).css('height')); //修正值，让标签更加居中
        const scroll_height = toc.scrollTop();
        const top_distance = scroll_height + parseInt(toc.css('height')) / 2 - improve_distance;
        const a_position = a_list.eq(0).position().top + top_distance;
        for (let i = a_list.length - 1; i >= 0; i--) {
            if (a_position + 1 >= a_list.eq(i).position().top) {
                return i;
            }
        }
    }
    let pre_scroll_pos = 0;
    function update_window_scroll_distance(a_index = get_h()) { //进行滚动
        let now_scroll_pos = toc.scrollTop();
        if (pre_scroll_pos == now_scroll_pos) { //到了顶部/底部
            pre_scroll_pos = now_scroll_pos;
            return;
        }
        pre_scroll_pos = now_scroll_pos;
        if (a_index == -1) return;
        if (!is_in_toc) return; //如果鼠标不在目录中，就不用根据目录div标签滚动距离更改页面滚动距离
        a_list.removeClass("current");
        a_list.eq(a_index).addClass('current'); //让对应的a标签改变
        const scroll_distance = h_list.eq(a_index).offset().top; //它对应的h标签距页面顶端距离
        $("body,html").stop().animate({ //进行滚动
            scrollTop: scroll_distance - nav_height
        });
    }
    toc.on('mousewheel DOMMouseScroll', throttle(update_window_scroll_distance, 200)); //只有鼠标滚动才触发，滚动动画不能触发
    //根据页面滚动距离更改目录a标签
    function update_classname() { //根据页面滚动距离更改目录a标签
        if (is_in_toc && is_scroll2.prop('checked')) return; //如果鼠标在目录中，就不用根据页面滚动距离更改目录a标签
        const scroll_distance = $(document).scrollTop(); //当前页面滚动的距离
        for (let i = h_list.length - 1; i >= 0; i--) {
            if (scroll_distance + nav_height + 1 >= h_list.eq(i).offset().top) { //找到滚动到了哪个h标签
                a_list.removeClass("current");
                a_list.eq(i).addClass('current'); //让对应的a标签改变
                update_div_scroll_distance(i, is_scroll1.prop('checked'));
                break;
            }
        }
    }
    //滚动事件
    $(window).scroll(function () {
        if (!isElementOverlapped(toc, $("article.article")))
            update_backtotop();
        if (!is_click) { //只有不是点击了按钮滚动时才触发
            update_classname();
        }
    });
    update_classname();
});
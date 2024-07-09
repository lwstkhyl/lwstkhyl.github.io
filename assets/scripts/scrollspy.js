$(document).ready(function () {
    //点击目录a标签跳转到对应标题
    const h_list = $('h3,h4,h5'); //所有的标题
    const a_list = $('.toc a'); //所有的目录a标签
    a_list.prop('href', '#'); //禁用a标签锚点跳转
    let is_click = false; //添加判断条件--是否是因为点击了按钮而滚动
    a_list.on("click", function () {
        is_click = true; //点击了按钮，进行上锁的操作
        const a_index = a_list.index(this); //点击的是第几个li
        const scroll_distance = h_list.eq(a_index).offset().top; //它对应的h标签距页面顶端距离
        $("body,html").stop().animate({ //进行滚动
            scrollTop: scroll_distance
        }, function () { //animate回调函数，当动画播放完执行
            is_click = false; //滚动完了就把锁打开
        });
        a_list.removeClass("current");
        $(this).addClass("current");
        update_div_scroll_distance(a_index, is_scroll.prop('checked'));
    });
    //回到顶部按钮
    const toc = $('.toc'); //目录标签
    let backtotop = $('<div class="scrollspy-backtotop">回到顶部</div>'); //制作回到顶部按钮
    toc.after(backtotop); //添加
    const backtotop_show_distance = h_list.eq(0).offset().top; //当滑到第一个标题后出现
    backtotop = $('.scrollspy-backtotop');
    function update_backtotop() { //更新回到顶部按钮
        if ($(document).scrollTop() >= backtotop_show_distance)
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
        if (!is_scroll.prop('checked')) return;
        toc.stop().animate({
            scrollTop: 0
        });
    });
    //目录是否随内容滚动按钮
    let is_scroll = $('<div class="scrollspy-is-scroll"><input id="scrollspy-is-scroll" type="checkbox" checked /><label for="scrollspy-is-scroll">目录随内容滚动</label></div>'); //制作是否跟随按钮
    toc.after(is_scroll); //添加
    is_scroll = $('#scrollspy-is-scroll');
    //根据页面滚动距离更改目录div标签滚动距离
    function update_div_scroll_distance(i, is_update = true) {
        if (!is_update) return;
        const top_distance = a_list.eq(i).position().top - a_list.eq(0).position().top; //指定a标签距顶端距离
        const improve_distance = parseInt(a_list.eq(0).css('height')) + parseInt(a_list.eq(i).css('height')) * 0; //修正值，让标签更加居中
        let scroll_height = top_distance - parseInt(toc.css('height')) / 2 + improve_distance; //应滚动的距离（让指定a标签居中）
        if (scroll_height <= 0) scroll_height = 0;
        toc.stop().animate({
            scrollTop: scroll_height
        });
    }
    //根据页面滚动距离更改目录a标签
    function update_classname() { //根据页面滚动距离更改目录a标签
        const scroll_distance = $(document).scrollTop(); //当前页面滚动的距离
        for (let i = h_list.length - 1; i >= 0; i--) {
            if (scroll_distance + 1 >= h_list.eq(i).offset().top) { //找到滚动到了哪个h标签
                a_list.removeClass("current");
                a_list.eq(i).addClass('current'); //让对应的a标签改变
                update_div_scroll_distance(i, is_scroll.prop('checked'));
                break;
            }
        }
    }
    //滚动事件
    $(window).scroll(function () {
        update_backtotop();
        if (!is_click) { //只有不是点击了按钮滚动时才触发
            update_classname();
        }
    });
    update_backtotop();
    update_classname();
});
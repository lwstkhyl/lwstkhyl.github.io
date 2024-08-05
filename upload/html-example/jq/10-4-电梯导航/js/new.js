//添加节流阀/互斥锁，使点击后的页面滚动不触发页面滚动的事件，避免current类被反复更改影响效果
let is_click = false; //添加判断条件--是否是因为点击了按钮而滚动
const li_list = $(".fixedtool li");
const div_list = $(".floor .w");
li_list.click(function () {
    is_click = true; //点击了按钮，进行上锁的操作
    const li_index = $(this).index();
    const target = div_list.eq(li_index);
    const scroll_distance = target.offset().top;
    $("body,html").stop().animate({
        scrollTop: scroll_distance
    }, function () { //animate回调函数，当动画播放完执行
        is_click = false; //滚动完了就把锁打开
    });
    $(this).addClass("current").siblings().removeClass("current");
});

const fixed_tool = $(".fixedtool");
const recommend = $(".recommend");
const recommend_top = recommend.offset().top;
function update_fixedtool() {
    if ($(document).scrollTop() >= recommend_top)
        fixed_tool.stop().fadeIn();
    else
        fixed_tool.stop().fadeOut();
}

function update_classname() {
    div_list.each(function (index, ele) {
        const scroll_distance = $(document).scrollTop();
        const ele_distance = $(ele).offset().top;
        if (scroll_distance + 1 >= ele_distance) {
            li_list.eq(index).addClass("current").siblings().removeClass("current");
        }
    });
}
$(window).scroll(function () {
    update_fixedtool();
    if (!is_click) { //只有不是点击了按钮滚动时才触发
        update_classname();
    }
});
update_fixedtool();
update_classname(); 
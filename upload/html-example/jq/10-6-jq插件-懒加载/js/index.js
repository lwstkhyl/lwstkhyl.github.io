//点击电梯导航对应按钮，滚动到对应模块
//因为按钮和模块是一一对应的，可以通过点击按钮的索引号得到应该跳转到哪个模块
const li_list = $(".fixedtool li"); //电梯导航按钮
const div_list = $(".floor .w"); //模块的div
li_list.click(function () {
    const li_index = $(this).index(); //点击小li的索引
    const target = div_list.eq(li_index); //目标盒子
    const scroll_distance = target.offset().top; //要滚动的距离
    $("body,html").stop().animate({
        scrollTop: scroll_distance
    }); //使用animate进行滚动
    $(this).addClass("target").siblings().removeClass("target"); //设置target类标识点击了哪个按钮
    setTimeout(function () { //标识时间长0.2s，之后取消标识
        li_list.eq(li_index).removeClass("target");
    }, 200);
});
//当页面滚动到今日推荐模块.recommend就让电梯导航显示出来--封装成函数
const fixed_tool = $(".fixedtool"); //电梯导航
const recommend = $(".recommend"); //今日推荐盒子
const recommend_top = recommend.offset().top; //得到今日推荐模块距顶部的距离
function update_fixedtool() {
    if ($(document).scrollTop() >= recommend_top) //页面被卷去距离大于盒子距顶部的距离
        fixed_tool.stop().fadeIn();
    else
        fixed_tool.stop().fadeOut();
}
//页面滚动时更新电梯导航按钮状态（滚动到哪个模块，对应按钮添加current类，其它按钮移除该类）
//使用each遍历div_list，通过页面被卷去的距离与每个模块offset().top的值进行比较，判断滚动到了哪个模块
function update_classname() {
    div_list.each(function (index, ele) {
        const scroll_distance = $(document).scrollTop(); //页面被卷去的距离
        const ele_distance = $(ele).offset().top; //元素的top值
        //每滚动一次，就遍历4个模块，如果页面被卷去距离大于某个模块的top值，就说明滚动到了这个模块，通过索引取到对应的按钮
        if (scroll_distance + 1 >= ele_distance) { //+1是为了消除误差
            li_list.eq(index).addClass("current").siblings().removeClass("current");
        }
    });
}
$(window).scroll(function () {
    update_fixedtool();
    update_classname();
});
update_fixedtool();
update_classname(); //刚进入页面时要初始化
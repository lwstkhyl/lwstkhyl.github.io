$(document).ready(function () {
    const header = $(".clickable-header");
    header.off("click"); //清除默认点击事件
    header.on("dblclick", function () { //双击标题，滑到它的位置
        $("html,body").animate({ scrollTop: $(this).offset().top });
    });
});
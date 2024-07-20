$(document).ready(function () {
    const down_ul = $("nav ul.sub_nav");
    down_ul.each(function (index, dom) {
        const parent = $(this).parent()[0];  //父级li
        $(this).css("position", "absolute");
        $(this).appendTo($("div.page"));
        const li_list = $(this).children("li"); //子级li
        console.log(parent);
    });
});
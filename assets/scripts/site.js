$(document).ready(function () {
    const li = $("header.header nav.nav--header ul.list--nav li.item--nav");
    const title = $("main.main small.post-meta span.label--category a").text();
    li.each(function (index, dom) {
        const href_list = $(dom).children("a").prop("href").split('/');
        const a_title1 = href_list[href_list.length - 2];
        const a_title2 = $(dom).children("a").text();
        if (a_title1 == title || a_title2 == title) {
            $(dom).addClass("current").siblings().removeClass("current");
            return;
        }
    });
    $("nav ul.sub_nav li.sub_nav a.sub_nav").each(function (index, dom) {
        const href_list = $(dom).prop("href").split('/');
        const a_title1 = href_list[href_list.length - 2];
        const a_title2 = $(dom).text();
        if (a_title1 == title || a_title2 == title) {
            $(dom).addClass("current").siblings().removeClass("current");
            $(dom).parent("li.sub_nav").parent("ul.sub_nav").parent("li.item--nav").children("a.no-hover").addClass("current").siblings().removeClass("current");
            return;
        }
    });
    li.each(function (index, dom) {
        const href_list = $(dom).children("a").prop("href").split('/');
        const a_title = href_list[href_list.length - 2];
        const url_list = location.href.split('/');
        const title = url_list[url_list.length - 2];
        if (a_title == title) {
            $(dom).addClass("current").siblings().removeClass("current");
            $(dom).find("a.sub_nav").css("color", "#05bf85");
            return;
        }
    });
}); 
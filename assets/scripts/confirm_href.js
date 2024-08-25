$(document).ready(function () {
    $("header.header nav.nav li.item").each(function (index, dom) {
        const a = $(dom).children("a");
        let href = a.prop("href");
        if (href.startsWith('/')) {
            href = href.slice(1);
            a.prop("href", href);
        }
        a.attr('data-href', a.prop("href")); //a标签原有链接
        //如果是手机版且有子标题，点击主标题不跳转，而是打开子标题ul
        if (is_mobile() && a.children("span.icon-down-line-free").length != 0) {
            a.prop("href", "javascript:;");
        }
        //每次更改页面尺寸时检测
        // window.addEventListener('resize', () => {
        //     if ($("button.button--nav").css("display") !== 'none'
        //         && a.children("span.icon-down-line-free").length != 0) {
        //         a.prop("href", "javascript:;");
        //     }
        //     else if ($("button.button--nav").css("display") === 'none'
        //         && a.children("span.icon-down-line-free").length != 0) {
        //         a.prop("href", a.attr('data-href'));
        //     }
        //     else;
        // });
    });
});
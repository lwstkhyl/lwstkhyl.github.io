$(document).ready(function () {
    $("header.header nav.nav li.item").each(function (index, dom) {
        const a = $(dom).children("a");
        let href = a.prop("href");
        if (href.startsWith('/')) {
            href = href.slice(1);
            a.prop("href", href);
        }
    });
});
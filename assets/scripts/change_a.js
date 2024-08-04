$(document).ready(function () {
    const h_list = $('main.main h3,h4,h5'); //所有的标题
    $("main.main a").each(function (index, dom) {
        if ($(dom).prop("class") === "title") return;
        const href = $(dom).prop("href");
        if ((href.includes("https://") || href.includes("http://")) && !href.includes("#")) { //如果不是锚点链接，就在新页面中打开
            $(dom).prop("target", "_blank");
        }
        else if (href.includes("#")) { //如果是锚点链接，修改其点击事件为双击了对应标题进行跳转
            const href_list = $(dom).prop("href").split('/');
            const a_title = href_list[href_list.length - 1].slice(1); //链接指向的目录标签
            $(dom).prop("href", "javascript:;");
            h_list.each(function (index, dom_h) {
                if ($(dom_h).prop("id") === decodeURIComponent(a_title)) {
                    $(dom).on("click", () => $(dom_h).dblclick());
                }
            });
        }
    });
}); 
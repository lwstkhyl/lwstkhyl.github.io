$(document).ready(function () {
    const h_list = $('main.main h3,h4,h5'); //所有的标题
    $("main.main a").each(function (index, dom) {
        if ($(dom).prop("class") === "title") return;  //如果是title类a标签（笔记入口）直接返回
        const href = $(dom).prop("href");
        if (href === "javascript:;" || href === "#") return;  //如果是无href标签直接返回
        if ((!href.includes("lwstkhyl.cn") && !href.includes("lwstkhyl.github.io") && !href.includes("127.0.0.1:4000"))  //如果是站外链接，就在新页面中打开
            || ((href.includes("lwstkhyl.cn") || href.includes("lwstkhyl.github.io") || href.includes("127.0.0.1:4000")) && href.includes("upload"))) { //如果是站内的upload链接，也在新页面中打开
            $(dom).prop("target", "_blank");
        }
        else if (href.includes("#")) { //如果是站内锚点链接，修改其点击事件为双击了对应标题进行跳转
            const href_list = $(dom).prop("href").split('/');
            const a_title = href_list[href_list.length - 1].slice(1); //链接指向的目录标签
            $(dom).prop("href", "javascript:;");
            h_list.each(function (index, dom_h) {
                if ($(dom_h).prop("id") === decodeURIComponent(a_title)) { //找id与链接指向标签相同的标题
                    $(dom).on("click", () => $(dom_h).dblclick());
                }
            });
        }
        else;
    });
}); 
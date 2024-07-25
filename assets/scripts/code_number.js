$(document).ready(function () {
    function get_count(code_text) { //计算代码行数
        const regex = /\n/g;
        const match = code_text.match(regex);
        const count = match ? match.length : 0;
        return count;
    }
    function create_ul(code_text) { //根据行数生成ul标签
        const code_count = get_count(code_text);
        const res_ul = $('<ul class="code-number"></ul>');
        for (let i = 1; i <= code_count; i++) {
            const li = $(`<li>${i}</li>`);
            res_ul.append(li);
        }
        return res_ul;
    }
    const code_pre = $(".highlighter-rouge pre.highlight"); //代码框
    code_pre.each(function (index, dom) {
        if ($(dom).parents(".language-plaintext")[0]) { //如果是普通文本框
            $(dom).css("cssText", "padding-left: 16px !important;");
            return; //不显示行数
        }
        const code_text = $(dom).children('code').text(); //文本内容
        $(dom).append(create_ul(code_text)); //循环添加
        if (get_count(code_text) == 1) {
            $(dom).children(".code-copy").css("top", "2.3px");
        }
    });
});
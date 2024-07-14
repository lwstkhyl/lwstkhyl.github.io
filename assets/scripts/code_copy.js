$(document).ready(function () {
    function copy_code(text) { //将text复制到剪切板
        let $tempTextarea = $("<textarea>");
        $tempTextarea.val(text);
        $("body").append($tempTextarea);
        $tempTextarea.select();
        document.execCommand("copy");
        $tempTextarea.remove();
    }
    const code_pre = $(".highlighter-rouge pre.highlight"); //代码框
    let copy_btn = $('<div class="code-copy">复制</div>'); //复制按钮
    code_pre.append(copy_btn); //添加按钮
    copy_btn = $('.highlighter-rouge pre.highlight .code-copy'); //选中添加的按钮
    copy_btn.on('click', function () { //添加点击事件
        const code = $(this).siblings('code'); //选中代码标签
        copy_code(code.text()); //将其内容复制到剪切板
        $(this).text("已复制"); //点击后更改文本内容为已复制
        setTimeout(() => {
            $(this).text("复制");
        }, 2000); //2s后变回"复制"
    });
});
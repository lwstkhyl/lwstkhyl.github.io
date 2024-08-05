//点击发布按钮，动态创建一个小li，将输入框中的内容和删除按钮放入其中，并添加到ul中
const submit = $(".btn"); //发布按钮
function create_comment(content) { //创建小li
    let li = $("<li></li>"); //li标签
    li.html(`${content}<a href='javascript:;'>删除</a>`); //更改li内的内容，包含评论的文字和一个删除按钮
    return li;
}
submit.on("click", function () {
    const content = $(".txt").val();
    if (content.trim() === '') return; //输入内容不能为空
    const new_li = create_comment(content);
    $("ul").prepend(new_li); //插入到列表最上方
    new_li.slideDown(); //让它滑动显示出来
    $(".txt").val(""); //清空输入框
});
//点击删除按钮，删除当前小li
$("ul").on("click", "li a", function () { //此处不能用旧方法，因为a是动态创建出来的
    const del_li = $(this).parent(); //要删除的小li
    del_li.slideUp(function () { //让它上拉消失
        del_li.remove();
    }); //回调函数：当它上拉动画结束后再删除它
});
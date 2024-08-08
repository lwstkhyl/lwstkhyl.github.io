//需求：点击全选，则复选框全部选择；取消全选则全部取消；若三个复选框全部选中，则全选按钮自动切换为选中状态
const check_list = document.querySelectorAll('.ck'); //复选框列表
const check_all = document.querySelector('#checkAll'); //全选
check_all.addEventListener('click', function () {
    const is_checked = this.checked; //获得全选按钮的选择状态（一个bool值）
    for (let check_index = 0; check_index < check_list.length; check_index++) {
        check_list[check_index].checked = is_checked; //直接让小复选框的选中状态与全选框的状态相同即可
    }
});
//每次点击小复选框，都判断是否三个小复选框都被选中，从而决定全选框状态
for (let check_index = 0; check_index < check_list.length; check_index++) {
    check_list[check_index].addEventListener('click', function () {
        const is_checked = document.querySelectorAll('.ck:checked'); //被选中的小复选框 input:checked是伪类选择器，选择checked为true的input
        if (is_checked.length == check_list.length) //如果选中个数=总个数
        {
            check_all.checked = true; //全选按钮切换为选中状态
        }
        else check_all.checked = false; //如果不等还要切换回未选中状态
        //以上4行可以简写为：
        //check_all.checked = (is_checked.length == check_list.length);
    });
}
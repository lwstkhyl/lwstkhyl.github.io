//当文本框获得焦点，就让总字数显示出来；失去焦点时消失
const text = document.querySelector('#tx'); //文本框对象
const total = document.querySelector('.total'); //总字数栏
text.addEventListener('focus', function () {
    total.style.opacity = 1;
});
text.addEventListener('blur', function () {
    total.style.opacity = 0;
});

//总字数计算
let content; //输入内容
let content_length; //输入内容的长度
text.addEventListener('input', function () {
    if (text.value.length >= 21 && text.value[20] != '\n') { //当输入为21字的时候，就不能再输入；
        //同时为保证输入20字后能按回车发布内容，需判断最后一个字是不是回车，是回车就正常发布
        text.value = text.value.slice(0, 20); //将输入的内容重置为前20个字符
        total.innerHTML = `20/20字`;
        setTimeout("alert('最多输入20字')", 0); //降低alert优先级，使先完成重置再弹窗
    }
    content = text.value;
    content_length = content.length;
    if (content[content_length - 1] == '\n') { //如果输入的最后一个字符是回车
        content_length--; //总字数不加1
        text.value = content.slice(0, content_length); //不把回车显示到输入栏里
    }
    if (content_length > 20) content_length = 20;
    total.innerHTML = `${content_length}/20字`; //设置总字数栏内容
});

//获取当前时间--以"2022-10-10 01:02:03"形式
function get_time() {
    const date = new Date();
    const year_month_day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const hour_minute_second = `${hour}:${minute}:${second}`;
    return year_month_day + " " + hour_minute_second;
}

//按下回车键发布评论，并在底下展示评论
const comment = document.querySelector('.item');
const comment_text = document.querySelector('.text');
const comment_time = document.querySelector('.time');
text.addEventListener('keyup', function (event) { //按下回车与弹起回车之间的时间差，用于input部分对数据的处理
    if (event.key == 'Enter') {
        if (content.trim() !== '') { //trim()用于去掉字符串两端的空格，只有当输入的字符串不是空格串或空串时才发布评论
            comment.style.display = 'block'; //显示评论框
            comment_text.innerHTML = content; //设置评论内容
            comment_time.innerHTML = get_time(); //设置评论时间
        }
        else alert("输入内容不能为空");
        text.value = ""; //清空评论栏
        total.innerHTML = '0/20字'; //复原总字数栏
    }
});

//点击发布按钮发布评论
const submit_btn = document.querySelector('button');
submit_btn.addEventListener('click', function () {
    if (content.trim() !== '') {
        comment.style.display = 'block';
        comment_text.innerHTML = content;
        comment_time.innerHTML = get_time();
    }
    else alert("输入内容不能为空");
    text.value = "";
    total.innerHTML = '0/20字';
});
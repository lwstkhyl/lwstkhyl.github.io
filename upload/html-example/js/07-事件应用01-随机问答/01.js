const arr = ['马超', '黄忠', '赵云', '关羽', '张飞'];
const start_btn = document.querySelector('.start');
const end_btn = document.querySelector('.end');
const name_div = document.querySelector('.qs');
end_btn.disabled = true; //开始禁用结束按钮
let random_index = 0; //在外声明random_index，使它在全局都可使用
function set_name_div(arr, last_index) {
    if (arr.length == 1) { //如果只剩一个数就不抽了
        return 0;
    }
    random_index = parseInt(Math.random() * arr.length);
    while (random_index == last_index) { //抽取一个与上一次不同的索引
        random_index = parseInt(Math.random() * arr.length);
    }
    name_div.innerHTML = arr[random_index]; //设置name_div
    return random_index; //将已抽取的数作为返回值记录
}
let last_index = -1; //记录前一次抽取的数，初始值为-1（第一次抽取抽哪个数都行）
let timer = 0; //在外面声明timer_id，让它在两个块内都可调用
start_btn.addEventListener('click', function () {
    start_btn.disabled = true; //点击开始按钮后禁用它
    end_btn.disabled = false; //开启结束按钮
    timer = setInterval(function () {
        last_index = set_name_div(arr, last_index);//将上一次的抽取值传入，抽完后last_index重新赋值，又可以传入下一次的set_name_div
    }, 100);
    if (arr.length == 1) //只剩最后一个名字的情况
    {
        start_btn.disabled = true;
        end_btn.disabled = true; //禁用两个按钮
        name_div.innerHTML = arr[0]; //更新name_div
        alert("只有1个名字可抽取");
        clearInterval(timer); //关闭计时器
    }
});
end_btn.addEventListener('click', function () {
    end_btn.disabled = true; //点击结束按钮后禁用它
    start_btn.disabled = false; //开启开启按钮
    arr.splice(random_index, 1); //将已抽到的值从数组中删去
    clearInterval(timer); //停止计时器
})
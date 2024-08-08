//本地存储结构的初始化
if (!localStorage.getItem('data')) {
    const init_data = []; //存储结构：一个大的数组，每个元素是一个对象，该对象包含一个人的所有信息
    localStorage.setItem('data', JSON.stringify(init_data)); //将数组转为json字符串形式并存储
}
if (!localStorage.getItem('id')) //如果本地存储里面没有id就创建
    localStorage.setItem('id', 0);
//渲染模块：1、从本地存储中取出数组
const data = JSON.parse(localStorage.getItem('data')) || []; //取出数据，如果没有数据就用空数组代替
const tbody = document.querySelector('tbody');
const title_span = document.querySelector('.title span');
//2、用map方法遍历数组，生成另一个表示数据对应的HTML内容的数组，该数组的每个元素就是data中每个对象在网页中的展现代码
function render() {
    //正常来讲，应该在每次渲染时都从本地存储中取数据。但实际上，只有刷新页面时我们获取到的data才会消失，所以只需在刷新页面时获取1次即可。之后的增删都是对data进行操作了
    const tr_arr = data.map(function (ele, index) { //数组的元素就是代表一个人的对象
        return `
        <tr>
            <td>${ele.stuId}</td>
            <td>${ele.uname}</td>
            <td>${ele.age}</td>
            <td>${ele.gender}</td>
            <td>${ele.salary}</td>
            <td>${ele.city}</td>
            <td>${ele.time}</td>
            <td>
            <a href="javascript:" data-id=${index}>
                <i class="iconfont icon-shanchu"></i>
                删除
            </a>
            </td>
        </tr>
        `
    });
    tbody.innerHTML = tr_arr.join(""); //将每个元素的tr合成总的tr，并展现在tbody内
    title_span.innerHTML = tr_arr.length; //显示总条数
}
render(); //每次刷新页面先执行一次
//新增信息
const info = document.querySelector('.info');
const uname = document.querySelector('.uname');
const age = document.querySelector('.age');
const gender = document.querySelector('.gender');
const salary = document.querySelector('.salary');
const city = document.querySelector('.city');
info.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!uname.value || !age.value || !salary.value) //非空判断
    {
        return alert('输入内容不能为空');
    }
    const new_id = +localStorage.getItem('id') + 1; //因为本地存储都是字符串，要先转成数值型再+1
    const new_person = { //根据输入值创建新对象
        stuId: new_id,
        uname: uname.value,
        age: age.value,
        gender: gender.value,
        salary: salary.value,
        city: city.value,
        time: new Date().toLocaleString()
    };
    localStorage.setItem('id', new_id); //将本地存储的id更新
    data.push(new_person); //向数组中新增数据
    localStorage.setItem('data', JSON.stringify(data)); //将本地存储的data更新
    render(); //渲染页面
    info.reset(); //重置表单
});
//点击删除按钮删掉对应的数据，与上个案例相同，都使用事件委托+data-id
tbody.addEventListener('click', function (e) {
    if (e.target.tagName == 'A') {
        if (!confirm('确定要删除？')) //删除时弹出确认框
            return;
        const data_id = e.target.dataset.id; //得到点击的删除按钮的data-id
        data.splice(data_id, 1); //删除对应的数据
        //可以使用dataid作索引：每次删除或更新，都会重新渲染，生成与新数据索引相对应的dataid
        localStorage.setItem('data', JSON.stringify(data)); //将本地存储的data更新
        render(); //重新渲染
    }
});
//录入数据：先声明空数组，点击录入后将对象追加到数组中；根据数组内容渲染页面中表格；删除也是从数组中删数据
const data = []; //存储数据的数组
//录入模块--检测表单输入是否为空
const input_list = document.querySelectorAll('[name]'); //获取所有有name的元素
function test() {
    for (let i = 0; i < input_list.length; i++) {
        if (input_list[i].value == "") {
            alert("输入数据不能为空");
            return true;
        }
    }
    return false;
}
//录入模块--表单提交事件
const info = document.querySelector('.info');
const uname = document.querySelector('.uname');
const age = document.querySelector('.age');
const gender = document.querySelector('.gender');
const salary = document.querySelector('.salary');
const city = document.querySelector('.city');
let stu_id = 1; //学号初始值，代表是第几个学生注册
info.addEventListener('submit', function (e) {
    e.preventDefault(); //正常情况下，表单提交后会跳转网页；在该例中不需要，所以阻止默认行为
    if (test() == true) //如果表单输入为空就退出函数
    { //注意非空判断的位置，要在阻止默认行为之后，要不然会跳转
        return;
    }
    const new_data = {
        stuId: stu_id, //第几条数据，直接用当前数组长度获取
        uname: uname.value,
        age: age.value,
        gender: gender.value,
        salary: salary.value,
        city: city.value
    };
    stu_id++;
    data.push(new_data); //将新数据追加到数组中
    this.reset(); //点击后重置表单
    render(); //调用渲染函数
});
//根据数据渲染页面
const tbody = document.querySelector('tbody'); //获取表格体DOM对象
function render() {
    tbody.innerHTML = ""; //先清空表格内容，再用新数据渲染
    for (let i = 0; i < data.length; i++) { //遍历数组
        const person = data[i];
        const tr = document.createElement('tr'); //用表格中的一行表示数组中的一项
        tr.innerHTML = `
        <td>${person.stuId}</td>
        <td>${person.uname}</td>
        <td>${person.age}</td>
        <td>${person.gender}</td>
        <td>${person.salary}</td>
        <td>${person.city}</td>
        <td>
            <a href="javascript:" data-id=${i}>删除</a>  
        </td>
        `; //给a添加自定义属性，方便后续删除按钮制作
        tbody.appendChild(tr);
    }
}
//点击删除按钮删掉对应的数据
tbody.addEventListener('click', function (e) { //使用事件委托，用所有删除按钮的父元素tbody
    if (e.target.tagName == 'A') {
        const data_id = e.target.dataset.id; //得到点击的删除按钮的data-id
        data.splice(data_id, 1); //删除对应的数据
        render(); //重新渲染
    }
});
//tab栏切换登录方式--使用事件委托
const tab_nav = document.querySelector('.tab-nav');
const tab_panel = document.querySelectorAll('.tab-pane'); //登录的div，一个对应手机号，另一个对应二维码，初始时二维码div隐藏。当点击登录方式的a时就让对应的div显示出来
tab_nav.addEventListener('click', function (e) {
    if (e.target.tagName == 'A') { //点击的是哪个就让哪个变为active，同时取消另一个active。因为已默认active，可以直接使用排他思想
        tab_nav.querySelector('.active').classList.remove('active'); //取消旧active
        e.target.classList.add('active'); //新增active
        for (let i = 0; i < tab_panel.length; i++) tab_panel[i].style.display = 'none'; //先让两个div都隐藏
        const active_index = e.target.dataset.id; //获取点击a的dataid
        tab_panel[active_index].style.display = 'block'; //让对应的div显示出来
    }
});

//点击登录跳转页面
const form = document.querySelector('form');
const username = document.querySelector('[name=username');
const agree = document.querySelector('[name=agree]'); //是否同意协议的多选框
form.addEventListener('submit', function (e) {
    e.preventDefault(); //阻止跳转
    if (!agree.checked) { //如果没有勾选（直接利用多选框的属性）
        return alert('请勾选“我已同意”按钮');
    }
    localStorage.setItem('xtx-uname', username.value);//登录成功后，把用户名存入本地存储
    location.href = './index.html'; //跳转到首页
});
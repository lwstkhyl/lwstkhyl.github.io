//发送验证码按钮：点击后，显示"05秒后重新获取"的倒计时，时间到后自动改为重新获取
const code = document.querySelector('.code');
code.addEventListener('click', function () {
    code.style.pointerEvents = "none"; //禁止点击（是a超链接标签的属性）
    let time = 5; //初始值
    code.innerHTML = `0${time}秒后重新获取`;
    let timer = setInterval(function () {
        time--;
        code.innerHTML = `0${time}秒后重新获取`;
        if (time == 0) //倒计时结束
        {
            clearInterval(timer);
            code.innerHTML = "重新获取";
            code.style.pointerEvents = "auto"; //恢复正常点击状态
        }
    }, 1000);
});

//用户名表单输入格式验证
const username = document.querySelector('[name=username]'); //输入用户名的表单
const username_span = username.nextElementSibling; //用户名表单的提示栏
const username_reg = /^[a-zA-Z0-9-_]{6,10}$/;
function verify_username() { //验证用户名是否符合规则函数
    const username_input = username.value; //输入的内容
    if (!username_reg.test(username_input)) //如果输入内容不符合正则
    {
        username_span.innerHTML = '输入不合法，应输入6-10位字母/数字/下划线/-';
        return false;
    }
    username_span.innerHTML = ''; //合法时清空提示框
    return true;
}
username.addEventListener('input', verify_username); //输入内容改变时触发
//如果想在鼠标离开表单（表单失焦时）进行验证，就用blur/change事件

//手机号表单输入格式验证（除了正则表达式不同，其它均与上面相同）
const phone = document.querySelector('[name=phone]');
const phone_span = phone.nextElementSibling;
const phone_reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
function verify_phone() {
    const phone_input = phone.value;
    if (!phone_reg.test(phone_input)) {
        phone_span.innerHTML = '手机号输入格式错误';
        return false;
    }
    phone_span.innerHTML = '';
    return true;
}
phone.addEventListener('input', verify_phone);

//验证码表单输入格式验证（除了正则表达式不同，其它均与上面相同）
const Code = document.querySelector('[name=code]');
const Code_span = Code.nextElementSibling;
const Code_reg = /^\d{6}$/;
function verify_Code() {
    const Code_input = Code.value;
    if (!Code_reg.test(Code_input)) {
        Code_span.innerHTML = '输入不合法，应为6位数字';
        return false;
    }
    Code_span.innerHTML = '';
    return true;
}
Code.addEventListener('input', verify_Code);

//密码表单输入格式验证（除了正则表达式不同，其它均与上面相同）
const password = document.querySelector('[name=password]');
const password_span = password.nextElementSibling;
const password_reg = /^[a-zA-Z0-9-_]{6,20}$/;
function verify_password() {
    const password_input = password.value;
    if (!password_reg.test(password_input)) {
        password_span.innerHTML = '输入不合法，应为6至20位字母、数字和符号组合';
        return false;
    }
    password_span.innerHTML = '';
    return true;
}
password.addEventListener('input', verify_password);

//再次输入密码表单输入格式验证（除了判断条件不同，其它均与上面相同）
const confirm = document.querySelector('[name=confirm]');
const confirm_span = confirm.nextElementSibling;
function verify_confirm() {
    const confirm_input = confirm.value;
    if (confirm_input != password.value) {
        confirm_span.innerHTML = '两次密码输入不一致';
        return false;
    }
    confirm_span.innerHTML = '';
    return true;
}
confirm.addEventListener('input', verify_confirm);

//已阅读并同意用户协议  按钮的切换--点击后切换到同意的icon，再次点击又切会不同意的icon
const agree = document.querySelector('.icon-queren');
agree.addEventListener('click', function () {
    this.classList.toggle('icon-queren2'); //如果原来没有就加上，有就删去
});

//表单提交模块：
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    //1、如果没勾选同意用户协议就提示需要勾选
    if (!agree.classList.contains('icon-queren2')) { //如果没有icon-queren2类就是没勾选
        e.preventDefault(); //阻止提交
        return alert('请勾选“已阅读并同意用户协议”按钮'); //弹出提示框并退出函数
    };
    //2、判断上面输入的表单是不是都合法
    if (!verify_username()) {
        e.preventDefault(); //阻止提交
    }
    if (!verify_phone()) {
        e.preventDefault();
    }
    if (!verify_Code()) {
        e.preventDefault();
    }
    if (!verify_password()) {
        e.preventDefault();
    }
    if (!verify_password()) {
        e.preventDefault();
    }
    if (!verify_confirm()) {
        e.preventDefault();
    }
    //如果将上面条件都写到一个if里用||连接，就会只执行第一个返回错误的检测函数，导致其它错误的信息不会更新
})
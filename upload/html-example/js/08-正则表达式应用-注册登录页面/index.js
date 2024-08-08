//从登录页面跳转过来后，自动显示用户名；点击"退出"后，不显示用户名
const uname = document.querySelector('.xtx_navs li:first-child');
const register = uname.nextElementSibling;
//渲染函数，登录/退出登录时都要重新渲染
function render() {
    const username = localStorage.getItem('xtx-uname'); //获取本地存储中的用户名
    if (username) { //如果取到了数据，就说明是从登录页面跳转来的，要把用户名展示 并把免费注册改成退出登录
        uname.innerHTML = `<a href="javascript:;"><i class="iconfont icon-user">${username}</i></a>`;
        register.innerHTML = '<a href="javascript:;">退出登录</a>';
    }
    else { //如果没取到，就说明点了退出登录，要恢复原来的状态
        uname.innerHTML = '<a href="./login.html">请先登录</a>';
        register.innerHTML = '<a href="./register.html">免费注册</a>';
    }
}
render(); //进入页面时先渲染一次
register.addEventListener('click', function () { //点击退出登录，把用户名从本地存储中删除，并重新渲染
    localStorage.removeItem('xtx-uname');
    render();
});
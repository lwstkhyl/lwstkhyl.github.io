//把模态框封装成一个构造函数，每次new（点击不同的按钮）都会产出一个模态框，
//每个模态框都包含2个功能--显示标签open和关闭标签close，公共属性--标题title和提示信息内容message
function Modal(title = "温馨提示", message = "您没有删除权限操作") {
    this.modalBox = document.createElement('div'); //创建div标签，createElement返回该标签的DOM对象
    this.modalBox.className = 'modal'; //给标签添加类名
    this.modalBox.innerHTML = `
    <div class="header">${title}<i>x</i></div>
    <div class="body">${message}</div>`;
    //构造函数的结果是获得了一个新创建的标签，存储在this里（创建节点后需要把节点追加到父元素才能显示出来）
    //其实可以使用普通函数来实现
}
//给构造函数挂载open方法，用于将新创建的节点显示在页面中
Modal.prototype.open = function () { //不用箭头函数，因为要使用this指向实例对象
    //先判断页面中有没有模态框，如果有就删除后再添加
    const modalBox = document.querySelector('.modal');
    if (modalBox) document.body.removeChild(modalBox); //这行代码等效于 modalBox&&document.body.removeChild(modalBox)
    document.body.appendChild(this.modalBox); //添加模态框
    //因为只有当模态框显示后（执行过open方法后）才能关闭，所以事件监听要在open里写，close只负责关闭模态框
    const i = this.modalBox.querySelector('i');
    i.addEventListener('click', () => {
        //close必须由实例对象调用。如果用普通函数，监听函数作用域的this指的是i这个DOM对象，无法获得外面作用域的this实例对象
        //而箭头函数解决了这个问题，this就是外作用域的实例对象
        this.close();
    });
}
Modal.prototype.close = function () {
    document.body.removeChild(this.modalBox);
}

//测试代码
document.querySelector('#delete').addEventListener('click', () => {
    const del = new Modal();
    del.open();
});
document.querySelector('#login').addEventListener('click', () => {
    const log = new Modal('友情提示', '请先注册');
    log.open();
});
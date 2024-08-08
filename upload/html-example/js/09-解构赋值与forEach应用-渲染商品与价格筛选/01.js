//渲染函数
function render(arr) {
    let str = ''; //声明结果字符串
    arr.forEach(item => { //data数组的每个元素是1个对象
        const { name, price, picture } = item; //使用对象解构接收属性值
        str += `
        <div class="item">
            <img src="${picture}" alt="${name}">
            <p class="name">${name}</p>
            <p class="price">${price}</p>
        </div>
        `
    });
    document.querySelector('.list').innerHTML = str;
}
//筛选函数
function filter_data(min, max = -1) {
    if (max == -1) return goodsList.filter(item => item.price >= min); //没有最大值时
    return goodsList.filter(item => item.price >= min && item.price <= max); //有最大值时
}
//事件委托方式添加点击事件
const filter = document.querySelector('.filter');
filter.addEventListener('click', e => {
    const { tagName, dataset } = e.target; //获取点击标签DOM对象的tagName和dataset属性
    if (tagName == 'A') {
        const index = dataset.index; //获取所点a标签的data-index属性值
        let res = []; //筛选后的数组--最后用它来渲染
        switch (index) { //根据不同的a标签有不同的筛选条件
            case '1': //0-100的标签
                res = filter_data(0, 100);
                break;
            case '2': //100-300的标签
                res = filter_data(100, 300);
                break;
            case '3': //300以上的标签
                res = filter_data(300);
                break;
            default: //所有商品的标签
                res = goodsList;
                break;
        }
        render(res); //根据结果数组渲染
    }
});
//先利用map来遍历数据，渲染页面（将数据数组->网页标签）
const html_arr = goodsList.map(item => {
    const { picture, name, count, price, spec, gift } = item; //对象解构直接拿到对象属性值
    //将spec: { color: '青色', sum: '一大四小' }转成"青色/一大四小"
    const spec_content = Object.values(spec).join('/'); //获取属性值，之后用'/'连接
    //赠品模块：将gift: '50g茶叶,清洗球'先变成数组，再map成多个span标签
    let gift_content = ''; //在外部声明，要不在if内写的话下面return用不到
    if (gift) { //如果有gift的话
        const gift_arr = gift.split(','); //拆分成数组
        const gift_content_arr = gift_arr.map(item => { //item是'50g茶叶'和'清洗球'
            return `<span class="tag">【赠品】${item}</span>`
        }); //标签数组
        gift_content = gift_content_arr.join(''); //最终的标签内容
    }
    //sub-total=单价*数量
    const sub_total = (count * (price * 100) / 100).toFixed(2); //为避免小数计算的误差，将有小数的price*100成整数后计算
    return `
    <div class="item">
        <img src=${picture} alt="">
        <p class="name">${name}${gift_content}</p>
        <p class="spec">${spec_content}</p>
        <p class="price">${price.toFixed(2)}</p>
        <p class="count">x${count}</p>
        <p class="sub-total">${sub_total}</p>
    </div>
    `;
}); //各数据对应网页标签的数组
const html_content = html_arr.join(''); //合并数组，形成完整的网页标签
document.querySelector('.list').innerHTML = html_content; //放入对应div中
//合计总价模块：将goodsList里面的数量*单价累加
const total = goodsList.reduce((prev, item) => {
    const { count, price } = item;
    return prev + (count * (price * 100));
}, 0); //注意因为item是对象，需要有初始值
document.querySelector('.amount').innerHTML = (total / 100).toFixed(2); //放入对应span中
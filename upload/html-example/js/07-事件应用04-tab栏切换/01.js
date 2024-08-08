//需求:鼠标经过时对应标签变色，同时图像改变
const a = true;
if (a == false)//不使用事件委托的版本
{
    const a_list = document.querySelectorAll('.tab-nav a'); //标签列表
    for (let a_index = 0; a_index < a_list.length; a_index++) //循环将5个标签都事件监听
    {
        a_list[a_index].addEventListener('mouseenter', function () { //鼠标经过时，要先移除其它a的活跃状态，之后将自己变活跃
            //更改a标签
            const a_active = document.querySelector('.tab-nav .active'); //获取当前正在活跃状态的a
            a_active.classList.remove('active'); //移除旧活跃状态
            this.classList.add('active'); //增加新活跃状态
            //更改img
            const img_active = document.querySelector('.tab-content .active'); //获取当前正在活跃状态的img
            img_active.classList.remove('active'); //移除旧活跃状态
            const img = document.querySelector(`.tab-content .item:nth-child(${a_index + 1})`); //获取应该变活跃的那个img（子代选择器，注意a_index从0开始要加1）
            img.classList.add('active'); //增加新活跃状态
        });
    }
}
if (a == true)//使用事件委托的版本
{
    const ul = document.querySelector('.tab-nav ul');
    ul.addEventListener('mouseover', function (e) { //mouseenter没有冒泡属性,所以用mouseover
        const target = e.target; //指点击的那个a标签,相当于上面遍历中的this
        if (target.tagName == 'A') //如果点击的是a标签(注意要大写)
        {
            //更改a标签
            const a_active = document.querySelector('.tab-nav .active'); //获取当前正在活跃状态的a
            a_active.classList.remove('active'); //移除旧活跃状态
            target.classList.add('active'); //增加新活跃状态
            //更改img
            //为了能够获取点击的是第几个a标签,需要给a标签添加自定义属性data-id=0-5
            const a_index = +target.dataset.id; //获取点击的是哪个a标签,并将字符串型id转为数字型id    
            const img_active = document.querySelector('.tab-content .active'); //获取当前正在活跃状态的img
            img_active.classList.remove('active'); //移除旧活跃状态
            const img = document.querySelector(`.tab-content .item:nth-child(${a_index + 1})`); //获取应该变活跃的那个img（子代选择器，注意a_index从0开始要加1）
            img.classList.add('active'); //增加新活跃状态
        }
    });
}
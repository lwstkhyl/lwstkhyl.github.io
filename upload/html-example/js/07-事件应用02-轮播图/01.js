const sliderData = [
    { url: 'resource/slider01.jpg', title: '对人类来说会不会太超前了？', color: 'rgb(100, 67, 68)' },
    { url: 'resource/slider02.jpg', title: '开启剑与雪的黑暗传说！', color: 'rgb(43, 35, 26)' },
    { url: 'resource/slider03.jpg', title: '真正的jo厨出现了！', color: 'rgb(36, 31, 33)' },
    { url: 'resource/slider04.jpg', title: '李玉刚：让世界通过B站看到东方大国文化', color: 'rgb(139, 98, 66)' },
    { url: 'resource/slider05.jpg', title: '快来分享你的寒假日常吧~', color: 'rgb(67, 90, 92)' },
    { url: 'resource/slider06.jpg', title: '哔哩哔哩小年YEAH', color: 'rgb(166, 131, 143)' },
    { url: 'resource/slider07.jpg', title: '一站式解决你的电脑配置问题！！！', color: 'rgb(53, 29, 25)' },
    { url: 'resource/slider08.jpg', title: '谁不想和小猫咪贴贴呢！', color: 'rgb(99, 72, 114)' },
]//初始数据

//获取对象
const img = document.querySelector(".slider-wrapper img"); //图片对象
const name_p = document.querySelector(".slider-footer p"); //图片对应的文字对象
const background = document.querySelector('.slider-footer'); //文字背景
const point_list = document.querySelectorAll('.slider-indicator li'); //一排小圆点对象
const next_btn = document.querySelector('.next'); //"下一张图片"按钮 
const prev_btn = document.querySelector('.prev'); //"上一张图片"按钮
const slider = document.querySelector('.slider'); //整个轮播图对象

//更改图片函数
let pic_index = 0; //正在展示的图片索引，初始是第1张图片
let point_index = 0; //活跃状态点的索引，初始第一个点是活跃状态
function set_img(picture_index) //根据pic_index展示图片
{
    pic_index = picture_index; //更新正在展示的图片索引
    img.src = sliderData[picture_index].url; //更改图片
    name_p.innerHTML = sliderData[picture_index].title; //更改图片对应文字
    background.style.backgroundColor = sliderData[picture_index].color; //更改背景颜色
    point_list[point_index].classList.remove('active'); //将之前的点移除活跃状态，这也是创建point_index变量的原因：需要记录上一次活跃点的位置
    point_index = picture_index; //更新活跃状态点的索引
    point_list[point_index].classList.add('active'); //将新点变成活跃状态
}

//"下一张图片"和"上一张图片"按钮 
next_btn.addEventListener('click', function () {
    pic_index++;
    if (pic_index == 8) { //如果原来是最后一张就切到第一张
        pic_index = 0;
    }
    set_img(pic_index);
});
prev_btn.addEventListener('click', function () {
    pic_index--;
    if (pic_index == -1) { //如果原来是第一张就切到最后一张
        pic_index = 7;
    }
    set_img(pic_index);
});

//定时切换图片（自动播放）
let timer = setInterval(function () { //实际就是每隔1s换1张图，即每隔1s自动点一下"下一张图片"按钮
    next_btn.click(); //调用按钮的点击事件
}, 1000);

//当鼠标经过轮播图时停止自动播放，移走时再次开始播放
slider.addEventListener('mouseenter', function () {
    clearInterval(timer);
});
slider.addEventListener('mouseleave', function () {
    clearInterval(timer); //先关再开
    timer = setInterval(function () {
        next_btn.click();
    }, 1000);
});

//当鼠标点击小圆点按钮时切到对应的图片
for (let index = 0; index < point_list.length; index++) { //通过循环依次给每个小圆点赋值
    point_list[index].addEventListener('click', function () {
        if (!(point_list[index].className == 'active')) { //如果点击的小圆点不是活跃状态
            set_img(index);
        }
    });
}
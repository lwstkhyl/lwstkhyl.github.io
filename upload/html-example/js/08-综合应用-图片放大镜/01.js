/*放大镜效果实现：
1、鼠标经过图片时，鼠标附近出现一小阴影区域，该区域应随鼠标移动
2、同时图片右侧显示该阴影区域的放大（使用设置背景图片size的方式实现）
3、鼠标移出图片时，阴影区域消失，同时右侧放大图片等待200ms后消失
4、鼠标移到放大图片时，放大图片不消失
现将中间切换图片的tab栏称为小盒子，左侧图片为中盒子，它右侧的放大图片称为大盒子
*/
//获取三个盒子
const small = document.querySelector('.small');
const middle = document.querySelector('.middle');
const large = document.querySelector('.large');
//鼠标经过小盒子的图片时，中盒子显示对应的图片。因为它们都是同一张图片，只要让小、中盒子的src相同即可完成切换
//事件委托--使用mouseover获取src
small.addEventListener('mouseover', function (e) {
    if (e.target.tagName == 'IMG') { //开始时有active类，使用排他思想，先移除，后添加
        this.querySelector('.active').classList.remove('active'); //注意是让li移除/添加active，直接用this来选就可以
        e.target.parentNode.classList.add('active'); //给图片对应的父元素li添加active
        const src = e.target.src; //得到对应图片src
        middle.querySelector('img').src = src; //让中盒子图片变为对应src
        large.style.backgroundImage = `url(${src})`;  //更改大盒子的背景图片（因为只有从小盒子才能更改中盒子、大盒子，所以可以在这里改。大盒子背景图片已默认为第一张，在鼠标不经过小盒子情况下是无法改图片的）
    }
});
//鼠标经过/离开中盒子，大盒子显示/隐藏
middle.addEventListener('mouseenter', show_large);
middle.addEventListener('mouseleave', hide_large);
let timer = 0; //解决快速经过/离开时定时器冲突，使大盒子无法显示：让整个页面中只有timer1个定时器工作
function show_large() { //显示大盒子函数
    clearTimeout(timer); //经过时先清除定时器
    large.style.display = 'block';
}
function hide_large() { //隐藏大盒子函数
    timer = setTimeout(function () {
        large.style.display = 'none';
    }, 200);
}
//鼠标经过/离开大盒子，大盒子显示/隐藏
large.addEventListener('mouseenter', show_large);
large.addEventListener('mouseleave', hide_large);
//鼠标经过/离开中盒子，显示/隐藏阴影框
const layer = document.querySelector('.layer'); //阴影框
middle.addEventListener('mouseenter', function () {
    layer.style.display = 'block';
});
middle.addEventListener('mouseleave', function () {
    layer.style.display = 'none';
});

//让黑色盒子移动的核心思想：把鼠标在中盒子内的坐标给阴影框的left和top
//鼠标在中盒子内的坐标(x,y) = 鼠标在页面中坐标 - 中盒子在页面中坐标 = 鼠标在页面中坐标 - (中盒子在视口中坐标 + 页面xy方向上被卷去的距离)
//中盒子：400*400  阴影框：200*200
middle.addEventListener('mousemove', function (e) {
    const x = e.pageX - middle.getBoundingClientRect().left - document.documentElement.scrollLeft;
    const y = e.pageY - middle.getBoundingClientRect().top - document.documentElement.scrollTop;
    //offset是获取元素距离自己定位的父级元素的距离，受父级影响，因此不用
    if (x >= 0 && x <= 400 && y >= 0 && y <= 400) { //阴影框在中盒子内，要限定移动的距离
        let layer_x = 0, layer_y = 0; //标识阴影框距中盒子左右边框的距离
        if (x <= 100) layer_x = 0; //如果x在0-100范围内，阴影框紧贴左边框
        else if (x > 100 && x < 300) layer_x = x - 100; //x在100-300，阴影框跟随鼠标移动（为确保鼠标在阴影框中心，要减去阴影框一半的宽高）
        else layer_x = 200; //如果x在300-400范围内，阴影框紧贴右边框
        if (y <= 100) layer_y = 0; //y方向同理
        else if (y > 100 && y < 300) layer_y = y - 100;
        else layer_y = 200;
        layer.style.left = layer_x + 'px';
        layer.style.top = layer_y + 'px'; //这两个属性都是layer距其父元素middle的距离

        //大盒子的背景图片是800*800的（为了达到放大的效果），相当于把中盒子长宽都放大2倍。因此，大盒子背景图片位置（距左/上边框距离）就是2倍的layer_x/y
        large.style.backgroundPositionX = -2 * layer_x + 'px';
        large.style.backgroundPositionY = -2 * layer_y + 'px';
        //为什么要加负号：这两个属性是背景图距边框距离，当鼠标右移时，背景图边界应左移，才能使显示的背景图（背景图在large内的部分）与鼠标对应
    }
});
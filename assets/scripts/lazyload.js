const max_reload_count = 1; //最大加载次数
const reload_time = 1000; //每次重新加载间隔时间
$(document).ready(function () {
    const images = document.querySelectorAll('article.article img'); //内容部分所有的图片
    $(images).each(function (index, dom) {
        const src = $(dom).prop("src");
        $(dom).attr("data-src", src);
        $(dom).attr("retry", "0"); //重新加载次数
        $(dom).removeAttr("src");
    }); //把所有图片的src取消，换成data-src
    //图片懒加载，来源：https://blog.csdn.net/qq_42136832/article/details/124251410
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { //监听到出现
                const image = entry.target; //获取目标
                image.className = "loading"; //标识为正在加载类
                image.setAttribute('src', image.getAttribute('data-src')); //改变data-src为src
                observer.unobserve(image);
                image.onload = function () { //加载完成
                    image.className = "loaded"; //标识为加载完成类
                }
                image.onerror = function () { //加载失败
                    //图片重新加载函数，来源：https://blog.csdn.net/she6600/article/details/106117780
                    var _this = $(this);
                    var retry = _this.attr("retry");
                    setTimeout(function () {
                        if (retry >= max_reload_count) {
                            image.className = "error"; //标识为加载失败类
                        } else {
                            retry++;
                            _this.attr("retry", retry);//重试次数+1
                            _this.attr('src', _this.attr("src"));//继续刷新图片
                        }
                    }, reload_time);
                }
            }
        });
    }
    const observer = new IntersectionObserver(callback);
    images.forEach(image => {
        observer.observe(image)
    });
});
$(document).ready(function () {
    const img_list = $("img"); //所有的图片
    const img_list_length = img_list.length; //总图片数量
    let min_loaded_img_num = parseInt(img_list_length / 3); //使遮罩消失的最小已加载图片数量
    if (min_loaded_img_num < 2) min_loaded_img_num = img_list_length;
    else if (min_loaded_img_num > 10) min_loaded_img_num = 10; //min_loaded_img_num最小为2，最大为10
    const cover = document.querySelector(".loader-bg"); //遮罩层
    const loader = document.querySelector(".banter-loader"); //动画
    const toc = $('.toc'); //目录标签
    const load_img = $(".loader-bg .img_load"); //显示有多少图片已加载的盒子
    function get_loaded_img_num(img_list) { //有多少图片图片已加载完成
        let count = 0;
        img_list.each(function () {
            if (this.complete)
                count++;
        });
        return count;
    }
    function change_position(div) { //设置div的margin-left为-50%宽度，使其水平方向居中
        const width = div.width();
        div.css("margin-left", `-${width / 2}px`);
    }
    function add_cover_in_toc(loaded_img_num) { //向目录中加遮罩层
        if (loaded_img_num === img_list_length) return; //如果已加载完毕，就直接退出
        toc.append($(`<div class="loader-bg"><div class="img_load">目录导航暂不可用，请等待图片加载完成(${loaded_img_num}/${img_list_length})...</div></div>`)); //将遮罩层添加在目录中
        const cover = document.querySelector(".toc .loader-bg"); //遮罩层
        $(cover).css("height", toc.outerHeight(true));
        const load_img = $(".toc .loader-bg .img_load"); //显示有多少图片已加载的盒子
        change_position(load_img); //更新位置
        let timer = setInterval(function () { //每0.5s更新盒子内容
            const loaded_img_num = get_loaded_img_num(img_list);
            const text = `目录导航暂不可用，请等待图片加载完成(${loaded_img_num}/${img_list_length})...`;
            load_img.text(text); //更新内容
            change_position(load_img); //更新位置
            $(cover).css("height", toc.outerHeight(true));
            if (loaded_img_num === img_list_length) { //加载完毕就停止定时器
                $(cover).fadeOut("normal", "swing", () => cover.style.display = "none"); //淡出方式隐藏遮罩层
                clearInterval(timer); //停止定时器
            }
        }, 500);
    }
    let timer = setInterval(function () { //每0.5s更新盒子内容
        const loaded_img_num = get_loaded_img_num(img_list);
        const text = `加载图片中(${loaded_img_num}/${img_list_length})...`;
        load_img.text(text); //更新内容
        change_position(load_img); //更新位置
        if (loaded_img_num >= min_loaded_img_num) { //已加载图片数量达到要求
            add_cover_in_toc(loaded_img_num); //向目录中加遮罩层
            if (cover) $(cover).fadeOut("normal", "swing", () => cover.style.display = "none"); //淡出方式隐藏遮罩层
            if (loader) loader.style.display = "none"; //隐藏动画
            clearInterval(timer); //停止定时器
        }
    }, 500);
}); 
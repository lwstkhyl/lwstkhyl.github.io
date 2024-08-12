$(document).ready(function () {
    const img_list = $("img"); //所有的图片
    const img_list_length = img_list.length; //图片数量
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
    let timer = setInterval(function () { //每0.5s更新盒子内容
        const loaded_img_num = get_loaded_img_num(img_list);
        const text = `加载图片中(${loaded_img_num}/${img_list_length})...`;
        load_img.text(text); //更新内容
        change_position(load_img); //更新位置
        if (loaded_img_num === img_list_length) //加载完毕就停止定时器
            clearInterval(timer);
    }, 500);
}); 
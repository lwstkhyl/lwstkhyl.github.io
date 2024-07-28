(function () {
    const cover = document.querySelector(".loader-bg"); //遮罩层
    const loader = document.querySelector(".banter-loader"); //动画
    window.onload = function () { //加载完成事件
        if (typeof jQuery === 'undefined') { //如果jQuery未加载，
            cover.style.display = "none"; //就使用原生js方式隐藏遮罩层
        }
        else {
            $(cover).fadeOut("normal", "swing", () => cover.style.display = "none"); //淡出方式隐藏遮罩层
        }
        loader.style.display = "none"; //隐藏动画
    };
})();
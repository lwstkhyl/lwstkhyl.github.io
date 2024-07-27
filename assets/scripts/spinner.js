(function () {
    const cover = document.querySelector(".loader-bg"); //遮罩层
    const loader = document.querySelector(".banter-loader"); //动画
    window.onload = function () { //加载完成事件
        $(cover).fadeOut("normal", "swing", () => cover.style.display = "none");
        // cover.style.display = "none";
        loader.style.display = "none"; //加载完成，隐藏动画，显示内容
    };
})();
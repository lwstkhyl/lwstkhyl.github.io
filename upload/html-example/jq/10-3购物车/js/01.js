//全选按钮模块
$(".checkall").change(function () {
    $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
    if ($(this).prop("checked")) { //选中后更改背景颜色（通过设置类）
        $(".cart-item").addClass("check-cart-item");
    } else {
        $(".cart-item").removeClass("check-cart-item");
    }
    update_sum(); //更新总件数和总价
});
$(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
        $(".checkall").prop("checked", true);
    } else {
        $(".checkall").prop("checked", false);
    }
    if ($(this).prop("checked")) {
        $(this).parents(".cart-item").addClass("check-cart-item");
    } else {
        $(this).parents(".cart-item").removeClass("check-cart-item");
    }
    update_sum(); //更新总件数和总价
});

//计算总件数和总价
//思路：将所有文本框中的值相加就是总件数，总价同理
//因为点击改变数量按钮/修改文本框中值时都需要更新总件数和总价，所以将它们封装成一个update函数
function update_sum() {
    let count = 0, money = 0; //总件数和总价
    $(".j-checkbox:checked").each(function (i, ele) { //将选中的商品的件数和价格相加，ele是选中的按钮的DOM对象
        const p_num = $(ele).parent().siblings(".p-num");
        const p_sum = $(ele).parent().siblings(".p-sum");
        count += parseInt(p_num.find(".itxt").val()); //调用val()方法获取值，注意转成数值型再相加
        money += parseFloat(p_sum.text().substr(1)); //调用text()方法获取内容，注意去掉最前面的￥符号后再相加
    });
    $(".amount-sum em").text(count); //更新总件数
    $(".price-sum em").text(`￥${money.toFixed(2)}`); //更新总价（保留2位小数是因为浮点数运算会有误差
}
update_sum(); //界面初始化的时候执行一次

//改变数量按钮+小计模块
//思路：点击"-""+"让它的兄弟文本框值改变，因为只改变点击的那个按钮对应的文本框的值
let old_val_increment, old_val_decrement, single_price, total_price;
$(".increment").click(function () { //加号
    old_val_increment = parseInt($(this).siblings(".itxt").val()); //获取点击之前的值，注意类型转换
    $(this).siblings(".itxt").val(old_val_increment + 1); //改变值
    single_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1); //获取单价，substr(1)把价格前面的￥删掉
    total_price = single_price * (old_val_increment + 1); //总价=单价*数量
    $(this).parents(".p-num").siblings(".p-sum").html(`￥${total_price.toFixed(2)}`); //保留2位小数
    update_sum(); //更新总件数和总价
});
$(".decrement").click(function () { //减号--注意如果当前值是1就不能再减了
    old_val_decrement = parseInt($(this).siblings(".itxt").val());
    if (old_val_decrement <= 1) return false;
    $(this).siblings(".itxt").val(old_val_decrement - 1);
    single_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    total_price = single_price * (old_val_decrement - 1);
    $(this).parents(".p-num").siblings(".p-sum").html(`￥${total_price.toFixed(2)}`);
    update_sum(); //更新总件数和总价
});
//数量输入框+小计模块
$(".itxt").change(function () {
    single_price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    total_price = single_price * $(this).val();
    $(this).parents(".p-num").siblings(".p-sum").html(`￥${total_price.toFixed(2)}`);
    update_sum(); //更新总件数和总价
});

//删除商品模块
//1、商品的删除按钮--一定要从this出发
$(".p-action a").click(function () {
    $(this).parents(".cart-item").remove();
    update_sum(); //更新总件数和总价
});
//2、删除选中的商品--将复选框为选中状态的商品删除
$(".remove-batch").click(function () {
    $(".j-checkbox:checked").parents(".cart-item").remove(); //自带隐式迭代，无需each
    update_sum(); //更新总件数和总价
});
//3、清空购物车--删除全部商品
$(".clear-all").click(function () {
    $(".cart-item").remove();
    update_sum(); //更新总件数和总价
});
$(function () {
    $("#now_local").text("账户充值");
    $(".rightbox div").eq(0).html("账户充值<span class='gray_w'>&nbsp;&nbsp;&nbsp;你可以通过支付宝、财付通或网上银行为您的账户进行充值，输入充值金额后点击确定进入支付流程。</span>");
});

function Rechange() {
    var fee = $("#feeTxt").val();
    if (fee == "" || fee == null || fee == undefined) {
        alert("请输入充值金额");
        return;
    }

    var reg = /^[0-9]{1,}\.{0,1}[0-9]{0,2}$/;
    if (!reg.test(fee)) {
        alert("请输入正确的金额");
        $("#feeTxt").textFocus();
        return;
    }

    $.get("BackGroundWork.aspx", { "type": "Recharge", "fee": fee, "temp": Math.random() }, CzResult);
}

function CzResult(res) {
    if (res.substr(0, 1) == "1") {
        var orderno = res.substr(2);
        $("#orderno").val(orderno);
        $("#r_Form").submit();
    }
    else {
        alert(res.substr(2));
    }
}
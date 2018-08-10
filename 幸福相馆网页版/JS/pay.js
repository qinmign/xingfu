var pay_html = '<div id="layout_w"><div class="inner_w"><div class="head_t"><h2>付款确认</h2><a class="closebtn" href="javascript:hidePayBox();"></a></div></div></div>';

//网上支付
var curType = 0;
function payorder(n) {//支付入口
    curType = n;
    if (curType == "1" || curType == "4") {//采集冲印订单支付页面
        OrderPay_Coll(false);
    }
    else if (curType == "2" || curType == "3") { //充值,订单列表支付
        switch (curType) {
            case "2": $("#pay_name").val("账户充值");
        }
        $("#payform").attr("target", "_self");
        OrderPay_Coll(true);
    }
}

function OrderPay_Coll(isRePay) {
    if ($("#radioval").val() == "ewallet") {//电子钱包
        if ($("#u_fee").text() == "" || $("#u_fee").text() == undefined || Number($("#u_fee").text()) <= 0) {
            alert("您的钱包余额不足");
            return;
        }
        $("#payform").attr("action", "onlinepay/pay_result_ewallet.aspx");
    }
    else if ($("#radioval").val() == "alipay" || $("#radioval").val() == "tenpay" || $("#radioval").val() == "ylpay") {//支付宝、财付通

        //$("#payform").attr("action", "onlinepay/pay_mode.aspx");
        $("#payform").attr("action", "http://www.xfxg.cn/xfxgweb/onlinepay/pay_mode.aspx");
    }
    else
    { return; }

    if (!isRePay && (curType == "1" || curType == "4")) { showPayBox(); } //第一次显示确认框
    $("#payform").submit();
}

//付款确认
function fkqr() {
    if (curType == "4") {
        order_no = pay_no;
    }
    $.get("BackGroundWork.aspx", { "type": "FKQR", "orderno": order_no, "optype": curType, "temp": Math.random() }, fkqrres);
}

function fkqrres(res) {
    if (res.substr(0, 1) == "0") {//出错
        alert(res.substr(2));
    }
    else if (res.substr(0, 1) == "1") {//支付成功
        payok(res.substr(2));
    }
    else {
        alert("付款未完成！如有疑问，请联系客服！\r\n客服电话：020-38059396");
    }
}

//重新付款
function cxfk() {
    if (curType == "4") {
        order_no = pay_no;
    }
    $.get("BackGroundWork.aspx", { "type": "FKQR", "orderno": order_no, "optype": curType, "temp": Math.random() }, cxfkres);
}

function cxfkres(res) {
    if (res.substr(0, 1) == "0") {//出错
        alert(res.substr(2));
    }
    else if (res.substr(0, 1) == "1") {//支付成功
        alert("当前交易已完成，无需再次付款！");
    }
    else {
        if (curType == "3") {//订单列表支付
            PayOrder(order_no, false);
        }
        else {
            OrderPay_Coll(true);
        }
    }
}

function payok(str) {
    if (curType == "1") {
        var hiddenHTML = "<form id='postform' method='post' action='payok.aspx'><input type='hidden' name='orderstr' value='" + str + "' /></form>";
        $(".content").append(hiddenHTML);
        if (typeof (shoppingcarSign) != "undefined")
            $("#postform").attr("action", "payok.aspx" + shoppingcarSign);

        $("#postform").submit();
    }
    else if (curType == "3") {
        var orderno = str.split("#")[0];
        $("#tablebox #" + orderno + "tr input").each(function () {
            $(this).attr("disabled", false);
        });

        var thisPid;
        $("#tablebox #" + orderno + "tr .pitd:nth-child(3)").each(function () {
            thisPid = $(this).find(".pidhidden").text();
            $(this).find("p").eq(1).text("图像号：" + thisPid);
        });

        //        $("#tableInnerBox table #" + order_no + "tr td:nth-child(3)").each(function () {
        //            thisPid = $(this).find(".pidhidden").text();
        //            $(this).find("p").eq(1).text("图像号：" + thisPid);
        //        });

        $("#tablebox #" + orderno + "tr .statustd").each(function () {
            $(this).text("已支付");
        });
        $("#tablebox #" + orderno + "tr .optd").each(function () {
            $(this).text("-");
        });
        hidePayBox();
    }
    else if (curType == "4") {
        history.go(-1);
    }
}

function showPayBox() {
    $(".content").append(pay_html);
    $(".inner_w").append(inner_html);

    $("#layout_w").css("width", "465px");
    $("#layout_w").css("top", $(window).scrollTop() + 120);
    $("#layout_w").css("left", ($(window).width() - $("#layout_w").width()) / 2);

    if (curType == "3") {
        $("#layout_w").addClass("pay_box");
    }

    $("body").append(fadeDivStr);
    $("#fade").css("top", "0");
    $("#fade").css("left", "0");
    $("#fade").css("width", $("body").width());
    $("#fade").css("height", $("body").height());

    $("#fade").show();
    $("#layout_w").show();
}

function hidePayBox() {
    if (curType == "1") {
        $.get("BackGroundWork.aspx", { "type": "FKQR", "orderno": order_no, "optype": curType, "temp": Math.random() }, PayCheck);
    }
    else {
        $("#layout_w").remove();
        $("#fade").remove();
    }
}

function PayCheck(res) {
    if (res.substr(0, 1) == "1") {//支付成功
        var hiddenHTML = "<form id='postform' method='post' action='payok.aspx'><input type='hidden' name='orderstr' value='" + res.substr(2) + "' /></form>";
        $(".content").append(hiddenHTML);
        if (typeof (shoppingcarSign) != "undefined")
            $("#postform").attr("action", "payok.aspx" + shoppingcarSign);
        $("#postform").submit();
    }
    else {
        $("#layout_w").remove();
        $("#fade").remove();
    }
}
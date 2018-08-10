var inner_html = '<div class="word_box"><p>请您在新打开的页面中完成支付</p><p>如果您已完成支付，请点击"支付成功"去查看我的订单</p>'
+ '<p>如果您中断了支付，请点击"重新支付"</p></div><div class="btn_box"><a href="javascript:fkqr();" class="payok_btn colorbtn">支付成功</a>'
+ '<a href="javascript:cxfk();" class="repay_btn colorbtn">重新支付</a></div>';
var CONSTORDERNAME = "o_list";
var OrderList = new Array();

$(function () {
    $(".navlink").hide();
    $(".service").hide();

    if (pay_type == "2") {
        $(".nav").hide();
        $(".colorline").hide();
    }

    if (ewallet_v == "none") {
        clickradio("alipay");
    }
    $("#orderpayBtn").attr("href", "javascript:payorder('" + pay_type + "');");

    if (uid == "" || uid == undefined || uid == null) {
        SetOrderCookies();
    }

    pageName = pageName.toLocaleLowerCase();
    if (pageName.indexOf("submitorder.aspx") != -1 || pageName.indexOf("confirmorder.aspx") != -1) {
        $.get("BackGroundWork.aspx", { "type": "SUBMITORDEROK", "orderno": order_no, "temp": Math.random() }, SendEmailResult);
    }
});

function SendEmailResult(res) {
    if (res.substr(0, 1) == "1") {

    }
    else {

    }
}

function clickradio(name) {
    $(".radiogroup").each(function () {
        if ($(this).attr("id") == name) {
            $(this).removeClass("radiodefault").addClass("radiodeact");
            $("#radioval").val(name);
        }
        else {
            $(this).removeClass("radiodeact").addClass("radiodefault");
        }
    });
}

function SetOrderCookies() {
    var cookies_name = CONSTORDERNAME;
    OrderList = cookiesOP.read(cookies_name).split(",");
    if (OrderList.indexOf(order_no) == -1) {
        OrderList.push(order_no);
    }
    cookiesOP.set(cookies_name, OrderList, 365);
}
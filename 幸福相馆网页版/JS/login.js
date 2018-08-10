
var accountTips = "#account";
var passwordTips = "#password";
var verifyCodeTips = "#verifyCode";
$(function () {
    var account = getCookie("simply_xfxg_username");
    if (account != null || account != "") {
        $("#account").val(account);
    }
    $(verifyCodeTips).keypress(function (e) {
        if (e.which == 13) {
            login();
        }
    })
});

function getRandom(n) { return Math.floor(Math.random() * n + 1) }

function updateVerifyCode() {
    $("#loginVerifyCode").attr("src", "Code.aspx?random=" + getRandom(99999));
};

function trim(str) {
    return str.replace(/\s+/g, "");
}

function alarm(obj, msg) {
    var objTips = obj + "Tips";
    $(objTips).css("color", "#ff0000");
    $(objTips).text(msg);
    $(obj).focus(function () {
        $(objTips).text("");
    })
}

function forgetPwd() {
    window.location.href = "resetpassword.aspx";
}

function login() {
    var account = trim($(accountTips).val());
    var password = trim($(passwordTips).val());
    var verifyCode = trim($(verifyCodeTips).val());

    if (account == "") {
        alarm(accountTips, "帐号不能为空");
        return;
    }

    if (password == "") {
        alarm(passwordTips, "密码不能为空");
        return;
    }

    if (verifyCode == "") {
        alarm(verifyCodeTips, "验证码不能为空");
        return;
    };
    $.get("RespondRequest.aspx", { "type": "YHDL", "account": account, "pwd": $.md5(password), "verifyCode": verifyCode, "tmp": Math.random() }, loginCallback);
}

function loginCallback(result) {
    updateVerifyCode();
    if (result.substr(0, 1) == "1") {
        window.location.href = "qt.aspx";
    } else {
        showerror(result.substr(2));
    }
}

function showerror(msg) {
    $("#error").css("display", "block");
    $("#error").text(msg);
    var timeid = setInterval(function () {
        clearInterval(timeid);
        $("#error").text("");
        $("#error").css("display", "none");
    }, 3000);
}

function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + 8 * 60 * 60 * 1000 + strsec * 1);  //时区有问题加了8小时
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
//这是有设定过期时间的使用示例：  
//s20是代表20秒  
//h是指小时，如12小时则是：h12  
//d是天数，30天则：d30  
//暂时只写了这三种，不知道谁有更好的方法，呵呵
//setCookie("name","hayden","s20");
//获取cookise值
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}
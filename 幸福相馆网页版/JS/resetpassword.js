var byEmail = "#byEmail";
var byPhone = "#byPhone";
var selectEmail = "#selectEmail";
var selectPhone = "#selectPhone";
var checkedStyle = "hRadio_Checked";
var uncheckedStyle = "hRadio";
var account = "#account";
var verifyCode = "#verifyCode";
var defcolor = "rgb(174,174,174)";
var inputcolor = "rgb(0,0,0)";
var inputMsgCode = "#inputMsgCode";
var hash = {
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.com': 'http://www.foxmail.com'
};

$(function () {

    $(byEmail).addClass(uncheckedStyle);
    $(byEmail).addClass(checkedStyle);
    $(byEmail).click(emailclick);

    $(byPhone).addClass(uncheckedStyle);
    $(byPhone).click(phoneclick);

    $(account).focus(accountfocus);
    $(account).blur(accountblur);

    $(verifyCode).focus(verifycodefocus);
    $(verifyCode).blur(verifycodeblur);

    $(inputMsgCode).focus(inputmsgcodefocus);
    $(inputMsgCode).blur(inputmsgcodeblur);

    $("#gobackselect").click(gobackselect);

    initemail();

    changePwdByEamil();

    sendedemail();

    $("#gotoLogin").click(gotoLogin);
});

var count = 60;
function setRestSendMessage() {
    if (count > 0) {
        $(".get-verfity_code").text(count + "秒后可重新获取");
        $(".get-verfity_code").attr("href", "javascript:void(0);");
        count--;
        setTimeout(setRestSendMessage, 1000);
    }
    else {
        $(".get-verfity_code").text("重新获取短信验证码");
        $(".get-verfity_code").attr("href", "javascript:reSendMessage();");
    }
}

function reSendMessage() {
    var mPhone = $(account).val();
    $.get("RespondRequest.aspx", { "type": "RESENDMESSAGE", "account": mPhone, "temp": Math.random() }, reSendMsgCallBack);
}

function reSendMsgCallBack(res) {
    if (res.substr(0, 1) == "1") {

    }
    else {
        alert(res.substr(2));
    }
    count = 60;
    setRestSendMessage();
}

function gotoLogin() {
    window.location.href = "login.aspx";
}

function changePwdByEamil() {
    var uid = getParam("uid");
    var verify = getParam("verify");
    if (uid == "" || verify == "") {
        return;
    };
    $("#inputDiv").css("display", "none");
    $("#phoneSetPwd").css("display", "block");
}

function sendedemail() {
    var email = getParam("email");
    var ekey = getParam("ekey");
    if (email == "" || ekey == "") {
        return;
    }
    $("#sendedTips").text("验证邮件已发送至" + email + "");
    $("#inputDiv").css("display", "none");
    $("#sendEmailSuccess").css("display", "block");
}

function getParam(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function validMsgCode() {
    var msgcode = trim($(inputMsgCode).val());
    if (msgcode == "" || msgcode == "验证码") {
        return true;
    } else {
        return false;
    }
}

function inputmsgcodefocus() {
    $(inputMsgCode).val("");
    $(inputMsgCode).css("color", inputcolor);
}

function inputmsgcodeblur() {
    if (validMsgCode()) {
        $(inputMsgCode).val("验证码");
        $(inputMsgCode).css("color", defcolor);
    }
}

function gobackselect() {
    window.location.href = "resetpassword.aspx";
}

function refreshVerifyCode() {
    $("#passwordVerifyCode").attr("src", "Code.aspx?tmp=" + Math.random());
}

function trim(str) {
    return str.replace(/\s+/g, "");
}

function emailclick() {
    if ($(selectEmail).attr("checked") != "checked") {
        $(selectEmail).attr("checked", "checked");
        $(selectPhone).removeAttr("checked");
        $(byPhone).removeClass(checkedStyle);
        $(byEmail).addClass(checkedStyle);
    }
    initemail(true);
}

function accountfocus() {
    if (validemail()) {
        $(account).val("");
        $(account).css("color", inputcolor);
    }
}

function accountblur() {
    if ($(selectEmail).attr("checked") == "checked") {
        initemail(false);
    } else {
        initphone(false);
    }
}

function initemail(bln) {
    init("请输入电子邮箱", bln);
}

function phoneclick() {
    if ($(selectPhone).attr("checked") != "checked") {
        $(selectPhone).attr("checked", "checked");
        $(selectEmail).removeAttr("checked");
        $(byEmail).removeClass(checkedStyle);
        $(byPhone).addClass(checkedStyle);
    }
    initphone(true);
}

function verifycodefocus() {
    if (validphone()) {
        $(verifyCode).val("");
        $(verifyCode).css("color", inputcolor);
    }
}

function verifycodeblur() {
    if ($(selectEmail).attr("checked") == "checked") {
        initemail(false);
    } else {
        initphone(false);
    }
}

function initphone(bln) {
    init("请输入手机号码", bln);
}

function validemail() {
    var accountValue = trim($(account).val());
    if (accountValue == "" ||
        accountValue == "请输入手机号码" ||
        accountValue == "请输入电子邮箱") {
        return true;
    } else {
        return false;
    }
}

function validphone() {
    var verify = trim($(verifyCode).val());
    if (verify == "" || verify == "验证码") {
        return true
    } else {
        return false;
    }
}

function init(msg, bln) {
    if (validemail() || bln) {
        $(account).val(msg);
        $(account).css("color", defcolor);
    }
    if (validphone() || bln) {
        $(verifyCode).val("验证码");
        $(verifyCode).css("color", defcolor);
    }
}

function submit() {
    var avalue = $(account).val();
    var vvalue = $(verifyCode).val();
    if (avalue == "请输入电子邮箱" || avalue == "请输入手机号码") {
        alert(avalue);
        return;
    }
    if (vvalue == "验证码") {
        alert("请输入验证码");
        return;
    }
    if ($(selectEmail).attr("checked") == "checked") {
        findByEmail();
    } else {
        findByPhone();
    }
}
var mEmail = "";
var mVerify = "";
function findByEmail() {
    mEmail = $(account).val();
    mVerify = $(verifyCode).val();
    forgetPasswordRequest(mEmail, mVerify, "1");
}

var mPhone = "";
function findByPhone() {
    mPhone = $(account).val();
    mVerify = $(verifyCode).val();
    forgetPasswordRequest($(account).val(), $(verifyCode).val(), "2");
}

function forgetPasswordRequest(account, code, type) {
    $.get("RespondRequest.aspx", { "type": "CSMM", "account": account, "verifyCode": code, "accountType": type, "temp": Math.random() }, forgetPasswordCallBack);
}

function forgetPasswordCallBack(result) {
    refreshVerifyCode();
    if (result.substr(0, 1) == "1") {
        var info = getvalue(result, "url:"); //发送邮件成功
        if (info != "") {
            window.location.href = result.substr(6);
        }
        if (getvalue(result, "phone:")) {
            $(inputMsgCode).val("验证码");
            $(inputMsgCode).css("color", defcolor);
            $("#sendedMsg").text("验证码短信已经发送至" + mPhone);
            $("#inputMsg").css("display", "block");
            $("#inputDiv").css("display", "none");
            count = 60;
            setRestSendMessage();
        }
    } else {
        var reason = result.substr(2, result.length - 2);
        alert(reason);
    }
}

function resendzhmmemail() {
    var email = getParam("email");
    var ekey = getParam("ekey");
    if (email == "" || ekey == "") {
        return;
    }
    $.get("RespondRequest.aspx", { "type": "CFFJMMYJ", "email": email, "ekey": ekey, "temp": Math.random() }, resendzhmmemailcallback);
}

function resendzhmmemailcallback(result) {
    alert(result.substr(2));
}

var messageCode = "";
function checkYZM() {
    var account = mPhone;
    messageCode = $("#inputMsgCode").val(); ;
    $.get("RespondRequest.aspx", { "type": "JYYZM", "phone": account, "yzm": messageCode, "temp": Math.random() }, checkYZMCallback);
}

function checkYZMCallback(result) {
    if (result.substr(0, 1) == "1") {
        $("#inputMsg").css("display", "none");
        $("#phoneSetPwd").css("display", "block");
    } else {
        var reason = result.substr(2, result.length - 2);
        alert(reason);
    }
}

function getvalue(result, flg) {
    var charat = result.lastIndexOf(flg);
    if (charat >= 0) {
        return result.substr(charat + flg.length, result.length - charat - flg.length);
    } else {
        return "";
    }
}

function verifyEmail() {
    var account = getParam("email");
    var url = account.split('@')[1];
    for (var j in hash) {
        var emailUrl = hash[url];
        if (emailUrl != undefined) {
            window.location.href = emailUrl;
            return;
        }
    };
    window.location.href = "qt.aspx"; 
}

function changePwd() {
    var pwd = trim($("#newPassword").val());
    var pwd2 = trim($("#newVerifyPassword").val());
    if (pwd == "" || pwd2 == "") {
        $("#tips").text("密码不能为空");
        return;
    }
    if (pwd.length < 6 || pwd2.length < 6) {
        $("#tips").text("密码位数不能少于6位");
        return;
    }

    if (pwd != pwd2) {
        $("#tips").text("两次输入密码不一致");
        return;
    }
    $("#tips").text("");
    var uid = getParam("uid");
    var verify = getParam("verify");
    if (uid == "" && verify == "") {
        $.get("RespondRequest.aspx", { "type": "SZMM", "accountType": "2", "phone": mPhone, "token": messageCode, "pwd": $.md5(pwd), "tmp": Math.random() }, phoneForgetPwdCallback);
        return;
    }
    if (uid == "" || verify == "") {
        return;
    };
    $.get("RespondRequest.aspx", { "type": "SZMM", "accountType": "1", "uid": uid, "token": verify, "pwd": $.md5(pwd), "tmp": Math.random() }, emailForgetPwdCallback);
}

function emailForgetPwdCallback(result) {
    if (result.substr(0, 1) == "1") {
        $("#resetSuccess").css("display", "block");
        $("#phoneSetPwd").css("display", "none");
    } else {
        alert(result.substr(2));
    }
}

function phoneForgetPwdCallback(result) {
    alert(result.substr(2));
    if (result.substr(0, 1) == "1") {
        window.location.href = "login.aspx";
    }
}
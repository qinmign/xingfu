var accountTips = "#account";
var passwordTips = "#password";
var verifyPasswordTips = "#verifyPassword";
var verifyCodeTips = "#verifyCode";
var agreeProvisionTips = "#agreeProvision"
var orlAccountTips = "";
var orlPasswordTips = "";
var orlVerifyPasswordTips = "";
var orlVerifyCodeTips = "";
var orlColorTips = "";
var orlAgreeProvisionTips = "";

var emailRegister = "#regiterByEmail";
var phoneRegister = "#regiterByPhone";

var phoneNumber = "#phone-number";
var messageCode = "#message-verify-code";
var phonePwd = "#phone-number-password";
var phonePwd2 = "#phone-number-verify-password";
var phoneVerifyCode = "#photo-verify-code";
var tips = "-tips"
$(function () {
    orlAccountTips = getTipsText(accountTips);
    orlPasswordTips = getTipsText(passwordTips);
    orlVerifyPasswordTips = getTipsText(verifyPasswordTips);
    orlVerifyCodeTips = getTipsText(verifyCodeTips);
    orlColorTips = $(accountTips + "Tips").css("color");
    $(accountTips).keyup(function () {
        var account = trim($(accountTips).val());
        $(accountTips).val(account);
    });

    $(accountTips).blur(onaccountblur);
    $(passwordTips).blur(onpasswordblur);
    $(verifyPasswordTips).blur(onverifypasswordblur);
    $(verifyCodeTips).blur(onverifycodeblur);
    $(agreeProvisionTips).blur(onagreeprovision);

    $(emailRegister).click(registerByEmail);
    $(phoneRegister).click(registerByPhone);

    $(phoneNumber).blur(phoneNumberBlur);
    $(phoneNumber).focus(phoneNumberFocus);

    $(messageCode).blur(messageCodeBlur);

    $(phonePwd).focus(phonePwdFocus);
    $(phonePwd).blur(phonePwdBlur);

    $(phonePwd2).focus(phonePwd2Focus);
    $(phonePwd2).blur(phonePwd2Blur);

    $(phoneVerifyCode).focus(phoneVerifyCodeFocus);
    $(phoneVerifyCode).blur(phoneVerifyCodeBlur);

    $("#verifyCode").keydown(function (event) {
        if (event.keyCode == 13) {
            submitEmailRegister();
        }
    });
    $("#photo-verify-code").keydown(function (event) {
        if (event.keyCode == 13) {
            submitPhoneRegister();
        }
    });
});

function getVal(key){
    return trim($(key).val());
}

function setText(key, msg, color) {
    $(key).text(msg);
    $(key).css("color", color);
}

function phoneNumberBlur() {
    if (!getVal(phoneNumber).match(/^1[3|4|5|8][0-9]\d{4,8}$/) ||
        getVal(phoneNumber) == "" || getVal(phoneNumber).length < 11) {
        setText(phoneNumber + tips, "无效的手机号码", "red");
    } else {
        setText(phoneNumber + tips, "", "red");
    }
}

function phoneNumberFocus() {
    if (getVal(phoneNumber) == "") {        
        setText(phoneNumber + tips, "请输入有效的手机号码，当密码遗失时凭此领取",orlColorTips);
    } else {
        setText(phoneNumber + tips, "", orlColorTips);
    }
}

function messageCodeBlur() {
    if (getVal(messageCode) == "") {        
        setText(messageCode + tips, "短信验证码不能为空", "red");
    } else {
        setText(messageCode + tips, "", "red");
    }
}

function phonePwdFocus() {
    if (getVal(phonePwd) == "") {
        setText(phonePwd+tips, "密码由6~20位英文字母，数字或特殊字符组成", orlColorTips);
    } else {
        setText(phonePwd + tips, "", orlColorTips);
    }
}

function phonePwdBlur() {
    if (getVal(phonePwd) == "") {
        setText(phonePwd + tips, "密码不能为空", "red");
    } else {
        setText(phonePwd + tips, "", "red");
    }
    if (getVal(phonePwd).length < 6) {
        setText(phonePwd + tips, "密码不能少于6位", "red");
    } else {
        setText(phonePwd + tips, "", "red");
    }
}

function phonePwd2Focus() {
    if (getVal(phonePwd2) == "") {
        setText(phonePwd2 + tips, "密码由6~20位英文字母，数字或特殊字符组成", orlColorTips);
    } else {
        setText(phonePwd2 + tips, "", orlColorTips);
    }
}

function phonePwd2Blur() {
    if (getVal(phonePwd2) == "") {
        setText(phonePwd2 + tips, "请输入确认密码", "red");
    } else {
        setText(phonePwd2 + tips, "", "red");
    }
    if (getVal(phonePwd2).length < 6) {
        setText(phonePwd2 + tips, "密码不能少于6位", "red");
        return;
    } else {
        setText(phonePwd2 + tips, "", "red");
    }
    if (getVal(phonePwd2) != getVal(phonePwd)) {
        setText(phonePwd + tips, "两次输入的密码不一致", "red");
    }else{
        setText(phonePwd + tips, "", "red");
    }
}

function phoneVerifyCodeFocus() {
    
}

function phoneVerifyCodeBlur() {
    if (getVal(phoneVerifyCode) == "") {
        setText(phoneVerifyCode + tips,"请输入验证码","red");
    } else {
        setText(phoneVerifyCode + tips, "", "red");
    }
}

function registerByEmail() {
    $("#emailTable").css("display", "block");
    $("#phoneTable").css("display", "none");

    $(phoneRegister).removeClass("switch-selected");
    $(phoneRegister).addClass("switch-unselected");

    $(emailRegister).removeClass("switch-unselected");
    $(emailRegister).addClass("switch-selected");

    $("#labelPhone").removeClass("phone-selected");
    $("#labelPhone").addClass("phone-unselected");

    $("#labelEmail").removeClass("email-unselected");
    $("#labelEmail").addClass("email-selected");

    $("#switch-cursor").css("margin-left", 150);

    updateVerifyCode();
}

function registerByPhone() {
    $("#emailTable").css("display", "none");
    $("#phoneTable").css("display", "block");

    $(phoneRegister).removeClass("switch-unselected");
    $(phoneRegister).addClass("switch-selected");

    $(emailRegister).removeClass("switch-selected");
    $(emailRegister).addClass("switch-unselected");

    $("#labelPhone").removeClass("phone-unselected");
    $("#labelPhone").addClass("phone-selected");

    $("#labelEmail").removeClass("email-selected");
    $("#labelEmail").addClass("email-unselected");

    $("#switch-cursor").css("margin-left", 304);

    //$("#phone-number").focus();

    updatePhoneVerifyCode();
}

function onaccountblur() {
    var account = trim($(accountTips).val());
    if (account == "") {
        alarm(accountTips, "邮箱不能为空", orlAccountTips);
        return;
    }
    if (!account.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){
        alarm(accountTips, "邮箱格式不正确", orlAccountTips);
        return;
    }
    alarm(accountTips, "", orlAccountTips);
}

function onpasswordblur() {
    var password = trim($(passwordTips).val());
    if (password == "") {
        alarm(passwordTips, "密码不能为空", orlPasswordTips);
        return;
    }
    if (password.length < 6) {
        alarm(passwordTips, "密码位数不能少于6位", orlPasswordTips);
        return;
    }
    alarm(passwordTips, "", orlPasswordTips);
}

function onverifypasswordblur() {
    var verifyPassword = trim($(verifyPasswordTips).val());
    if (verifyPassword == "") {
        alarm(verifyPasswordTips, "请再次输入密码", orlVerifyPasswordTips);
        return;
    }
    if (verifyPassword.length < 6) {
        alarm(verifyPasswordTips, "密码位数不能少于6位", orlVerifyPasswordTips);
        return;
    }
    alarm(verifyPasswordTips, "", orlVerifyPasswordTips);
}

function onverifycodeblur() {
    var password = trim($(passwordTips).val());
    var verifyPassword = trim($(verifyPasswordTips).val());
    var verifyCode = trim($(verifyCodeTips).val());
    if (password != verifyPassword) {
        alarm(passwordTips, "密码不一致", orlPasswordTips);
        return;
    }
    if (verifyCode == "") {
        alarm(verifyCodeTips, "验证码不能为空", orlVerifyCodeTips);
        return;
    }
}

function onagreeprovision() {
    var check = $(agreeProvisionTips).attr("checked");
    if (check != "checked") {
        alarm(agreeProvisionTips, "请勾选服务协议", orlAgreeProvisionTips);
        return false;
    }
}

function submitEmailRegister() {
    var account = trim($(accountTips).val());
    var password = trim($(passwordTips).val());
    var verifyPassword = trim($(verifyPasswordTips).val());
    var verifyCode = trim($(verifyCodeTips).val());
    var check = $(agreeProvisionTips).attr("checked");

    if (account == "" || !account.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) || password == ""
    || password.length < 6 || verifyPassword == ""
    || verifyPassword.length < 6 || password != verifyPassword
    || verifyCode == "" || check != "checked") {
        return;
    }
    else {
        $.get("RespondRequest.aspx", { "type": "YXZC", "account": account, "pwd": $.md5(password), "verifyCode": verifyCode, "temp": Math.random() }, registerByEmailCallback);
    }
}

function registerByEmailCallback(result) {    
    if (result.substr(0, 1) == "1") {
        var url = result.substr(result.lastIndexOf("url:") + 4);
        window.parent.location.href = url;        
    } else {
        alert(result.substr(2));
    }    
}

function getRandom(n) {
    return Math.floor(Math.random() * n + 1)
}

function trim(str) {
    return str.replace(/\s+/g, "");
}

function getTipsText(obj) {    
    return $(obj + "Tips").text();
}

function getTipsColor(obj) {
    return $(obj + "Tips").css("color");
}

function updateVerifyCode() {
    $("#registerVerifyCode").attr("src", "Code.aspx?random=" + getRandom(99999));
};

function updatePhoneVerifyCode() {
    $("#image-verify-code").attr("src", "Code.aspx?random=" + getRandom(99999));
}

function alarm(obj, msg, tips) {
    var objTips = obj + "Tips";
    $(objTips).text(msg);
    $(objTips).css("color", "#ff0000");
    $(obj).focus(onfocus(objTips, tips, orlColorTips));
}
function onfocus(objTips, tips, color) {
    function restore() {
        $(objTips).text(tips);
        $(objTips).css("color", color);
    }
    return restore
}

function submitPhoneRegister() {
    var phone = getVal(phoneNumber);
    var code = getVal(messageCode);
    var pwd1 = getVal(phonePwd);
    var pwd2 = getVal(phonePwd2);
    var verify = getVal(phoneVerifyCode);
  if(!phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/) || phone == "") {
      return;
  }
  if (code == "") {
      return;
  }
  if (pwd1 == "" || pwd1.length < 6) {
      return;
  }
  if (pwd2 == "" || pwd2.length < 6) {
      return;
  }
  if (verify == "") {
      return;
  }
  //提交信息
  $.get("RespondRequest.aspx", { "type": "SJZC", "token": code, "yzm": verify, "phone": phone, "pwd": $.md5(pwd1), "tmp": Math.random }, submitPhoneRegisterCallback);
}

function submitPhoneRegisterCallback(respond) {
    alert(respond.substr(2));
    if (respond.substr(0, 1) == "1") {
        window.location.href = "login.aspx";
    }
}

var timeid;
var totalSecond = 0;
function sendMsg() {
    if (totalSecond == 0) {
        var phone_num = trim($("#phone-number").val());
        if (phone_num == "" || !phone_num.match(/^1[3|4|5|8][0-9]\d{4,8}$/) || phone_num.length < 11) {
            return;
        }
        totalSecond = 60;
        timeid = setInterval(timerFunction, 1000);
        $.get("RespondRequest.aspx", { "type": "FSDX", "phone": phone_num, "requestType": "1" }, sendMsgCallback);
    }
}

function timerFunction() {
    if (totalSecond > 0) {
        totalSecond = totalSecond - 1;
        updateMessageTips(totalSecond+"秒后重新获取验证码");
    } else {
        clearInterval(timeid);
        updateMessageTips("免费获取短信验证码");
    }
}

function updateMessageTips(str) {
    $("#sendMessage").text(str);
}

function sendMsgCallback(respond) {
    alert(respond.substr(2));
    if (respond.substr(0, 1) == "0") {
        totalSecond = 0;
    }
}


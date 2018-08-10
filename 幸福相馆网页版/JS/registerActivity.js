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

var tips_title = "#tips-title";
var tips_desc = "#tips-desc";
var icon = "#icon";
var success_icon = "activity-success";
var fail_icon = "activity-fail";
var resend_url = "#resend-activity-email";
var error_color = "#ff7124";
$(function () {
    var error = getParam("error");
    if (error != "") {
        if (error == "C07E01B478A817FA5911D759C08E0D62") {
            activitySuccess();            
            //verifyFail();
        } else if (error == "E7F4216299DBE3169C996EEE1BFAB75F") {
            verifyFail();
        } else {
            activityFail();
        };
    }
})

function verifyFail() {
    showResult(fail_icon, "该连接已经失效", error_color, "激活失败");
    resendActivityEmail(true);
}

function activitySuccess() {
    showResult(success_icon, "您的帐号已成功激活", "#3c9a06", "现在就去“我的幸福相馆”体验便捷服务吧！");
    resendActivityEmail(false);
    autoJump();
}

function activityFail() {
    showResult(fail_icon, "激活失败", error_color, "请点击“重新发送验证邮件”按钮再次发送激活邮件");
    resendActivityEmail(true);
}

function showResult(tips_icon, title, title_color, desc) {
    $(icon).addClass(tips_icon);
    $(tips_title).text(title);
    $(tips_title).css("color", title_color);
    $(tips_desc).text(desc);
}

var timeID;
var totalSecond = 5;
function autoJump() {
    updateJumpTips(totalSecond);   
    timeID = setInterval(timeInterval,1000);
}

function timeInterval() {
    if (totalSecond > 0) {
        totalSecond = totalSecond - 1;
        updateJumpTips(totalSecond);
    } else {
        window.location.href = "qt.aspx";
        clearInterval(timeID);        
    }
}

function updateJumpTips(second) {
    $("#auto-jump").text(second+"秒后将自动跳转到首页");
}

function resendActivityEmail(bln) {
    if (bln == true) {
        $(resend_url).css("display", "block");
    } else {
        $(resend_url).css("display", "none");
    }
}

function resendEmail() {
    $.get("RespondRequest.aspx", { "type": "CFJHYJ", "uid": getParam("uid"), "verify": getParam("verify"), "tmp": Math.random()}, resendEmailCallback);
}

function resendEmailCallback(result) {
    alert(result.substr(2));
}

function jumpToHome() {
    window.location.href = "qt.aspx";
}


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

$(function () {
    var account = getParam("account");
    $("#tips2").text("我们发送了一封验证邮件到" + account);
});

function resendEmail() {
    var uid = getParam("uid");
    var account = getParam("account");
    var token = getParam("token");
    $.get("RespondRequest.aspx", {"type":"CFYJ","token":token,"uid":uid,"account":account,"tmp":Math.random()},resendEmailCallback);
}

function verifyEmail() {
    var account = getParam("account");
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

function resendEmailCallback(result) {
    $("#resendTips").text(result.substr(2));
}
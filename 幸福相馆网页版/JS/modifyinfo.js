var newValue = '#new-value';
var mType = "";
var mPhone = "";
var mEmail = "";
var verifyCode = "#mod-code";
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
    if (activity()) {
        return;
    }
    var type = rType.substr(0, 2);
    if (type == "undefined" || type == "") {
        type = getParam("m_type") 
    }
    var tipStr = '';
    var stateStr = "";
    var btnStr = "";
    if (type == '01') {//手机号码
        tipStr = '请您输入手机号码';
        stateStr = "验证手机是完全免费的，被验证的手机号码可以作为您的登录账号登录“我的幸福相馆”，并且方便您日后轻松找回密码。";
        btnStr = "获取短信验证码";
    } else if (type == '02') {//邮箱
        tipStr = '请您输入邮箱';
        stateStr = "被验证的邮箱可以作为您的登录账号登录“我的幸福相馆”，并且方便您日后轻松找回密码。";
        btnStr = "立即验证";
    } else {
        return;
    };
    mType = type;    
    $("#state_tips").text(stateStr);
    $("#tips-div").css("visibility", "visible");
    $("#ok").text(btnStr);

    $(newValue).val(tipStr);
    $(newValue).css('color', '#a0a0a0');    
    $(newValue).focus(function () {
        if (trim($(newValue).val()) == tipStr) {
            $(newValue).val('');
            $(newValue).css('color', '#000000');
        }
    })
    $(newValue).blur(function () {
        if (trim($(newValue).val()) == '') {
            $(newValue).val(tipStr);
            $(newValue).css('color', '#a0a0a0');
        }
    })
    $("#ok").click(function () {
        var value = $(newValue).val();
        if (type == '01') {
            if (!value.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
                alert('手机号码错误');
                return;
            };
            mPhone = value;
        }
        else if (type == '02') {
            if (!value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
                alert('邮箱格式错误');
                return;
            }
            mEmail = value;
        } else {
            return;
        }
        $.get("RespondRequest.aspx", { "type": "XGXX", "mType": type, "value": value, "temp": Math.random() }, modifyCallback);
    })
})

function resendMsg() {
    $.get("RespondRequest.aspx", { "type": "XGXX", "mType": "01", "value": getParam("modifyphone"), "temp": Math.random() }, modifyCallback);
}

function resendEmail() {
    $.get("RespondRequest.aspx", { "type": "XGXX", "mType": "01", "value": getParam("modifyEmail"), "temp": Math.random() }, modifyCallback);
}

function verifyEmail() {
    var account = getParam("modifyEmail");
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

function activity() {
    var verify = getParam("verify");
    var uid = getParam("uid");
    var email = getParam("email");
    if (verify != "" && uid != "" && email != "") {
        $("#activity-email").css("display", "block");
        $("#content-div").css("display", "none");
        $.get("RespondRequest.aspx", { "type": "XGYX", "uid": uid, "email": email, "verify": verify, "temp": Math.random() }, modifyEmailCallback);
        return true
    }
    var modifyphone = getParam("modifyphone");
    if (modifyphone != "") {
        $("#input-mod-code").css("display", "block");
        $("#content-div").css("display", "none");

        var tmrID;
        var count = 60;
        tmrID = setInterval(function () {
            if (count >= 0) {
                $("#msg-tips").text("校验码已发出，请注意查收短信，如果没有收到，您可以在 " + count + "秒后");
                $("#msg-tips").append("<span><a class='resend-msg' href='javascript:resendMsg();'>重新发送</a></span>");
                count--;
            }else{
                clearInterval(tmrID);
            }            
        }, 1000);

        var tipStr = "请输入短信验证码";
        $(verifyCode).val(tipStr);
        $(verifyCode).css("color", '#a0a0a0');
        $(verifyCode).focus(function () {
            if (trim($(verifyCode).val()) == tipStr) {
                $(verifyCode).val("");
                $(verifyCode).css('color', '#000000');
            }            
        })
        $(verifyCode).blur(function () {
            if (trim($(verifyCode).val()) == "") {
                $(verifyCode).val(tipStr);
                $(verifyCode).css('color', '#a0a0a0');  
            }
        })
        $("#submitcode").click(function () {
            var code = trim($(verifyCode).val());
            var verify = trim(getParam("verify"));
            var phone = trim(getParam("modifyPhone"));
            $.get("RespondRequest.aspx", { "type": "YZXGSJ", "phone": phone, "verifyCode": code, "verify": verify, "temp": Math.random() }, function (result) {
                alert(result.substr(2));
                if (result.substr(0, 1) == "1") {
                    window.location.href = "personalinfo.aspx";
                }
            });
        })
        return true;
    }
    if (getParam("modifyEmail") != "") {
        $("#content-div").css("display", "none");
        $("#sended-email").css("display", "block");
        $("#tips-div").css("visibility", "hidden");
    }
    return false;
}

function modifyEmailCallback(result) {
    if (result.substr(0, 1) == "1") {       
        var tmrID;
        var count = 3;
        $("#result-tips").text(result.substr(2) + ", " + count + "秒后自动跳转到个人信息页面");
        tmrID = setInterval(function () {
            if (count <= 0) {
                clearInterval(tmrID);
                window.location.href = "personalinfo.aspx";
                return;
            }
            count--;
            $("#result-tips").text(result.substr(2) + "," + count + "秒后自动跳转到个人信息页面");
        }, 1000);
        $("#result-tips").click(function () {
            window.location.href = "personalinfo.aspx"; 
        })        
    } else {
        var timId;
        $("#result-tips").text("激活失败，原因：" + result.substr(2));
        $("#reset_email").css("display", "block");
        $("#reset_email").click(function () {
            window.location.href = "modifyinfo.aspx?m_type=02"; 
        });
    }
}

function modifyCallback(result) {
    if (result.substr(0, 1) == "1") {
        if (mType == "01") {
            window.location.href = "modifyinfo.aspx"+result.substr(2);
        }
        if (mType == "02") {
            window.location.href = "modifyinfo.aspx?modifyEmail="+mEmail;
        }
    }
    else {
        alert(result.substr(2));
    }
}

function trim(str) {
    return str.replace(/\s+/g, "");
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
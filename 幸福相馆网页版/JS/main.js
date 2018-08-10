var fadeDivStr = "<div id='fade' class='black_overlay'></div>";
var NotLoginHTML = '<div class="login_head"><a href="javascript:Login();">登录</a>&nbsp;&nbsp;&nbsp;<a href="register.aspx">注册</a><span> | </span><a href="javascript:ShoppingCar();"><img class="headimg" src="CSS/images/pub/top_icn_01.png" />购物车<span id="goodsnumber" style="color:red;"></span></a><span> | </span><a href="javascript:CertificateGallery();"><img class="headimg" src="CSS/images/pub/top_icn_02.png" />证照库</a><span> | </span><a href="myorder.aspx" target="_blank">我的订单</a><span> | </span><a href="helpcenter.aspx" target="_blank">帮助中心</a></div>';
var LoginHTML = '<div class="login_head"><div class="right_txt"><a href="personalinfo.aspx" target="_blank">&loName&！</a>欢迎来到我的幸福相馆！&nbsp;&nbsp;&nbsp;<a href="javascript:LoginOut();">退出登录</a></div><div class="op_txt"><a href="javascript:ShoppingCar();"><img class="headimg" src="CSS/images/pub/top_icn_01.png" />购物车<span id="goodsnumber" style="color:red;"></span></a><span> | </span><a href="javascript:CertificateGallery();"><img class="headimg" src="CSS/images/pub/top_icn_02.png" />证照库</a><span> | </span><a href="myorder.aspx" target="_blank">我的订单</a><span> | </span><a href="helpcenter.aspx" target="_blank">帮助中心</a><div></div>';
var loginBoxHTML = '<div id="loginbox_out"><div class="loginbox_in"><div class="loginbox_head"><span id="login_title" style="float:left;"><strong>登录</strong>&nbsp;&nbsp;能更好的管理你的证照哦！</span><a class="loginclose" href="javascript:hideLoginBox();"></a></div><div class="clearboxfloat" style="margin-bottom:3px;width:672px"><div class="login_float_l login_left_div"><span id="error" class="login_error-div"></span><input id="account" type="text" class="text" /><input id="password" type="password" class="text" /><label id="pwdhint" class="hintcolor">密码</label><div class="clearboxfloat"><input id="verifyCode" class="verify-code login_float_l text" type="text" /><img id="verifyImg" class="login_float_l" src="Code.aspx" alt="" /><span id="update_verify_code" class="login_float_l link">看不清，换一张</span></div><label class="labelCheckbox" for="record_username"><input id="record_username" type="checkbox" />记住用户名</label><div class="clearboxfloat" style="padding-top: 10px;"><a id="login" class="login_float_l button loginbtn">登 录</a> <span id="forgetpwd" class="login_float_l link"style="line-height: 38px; margin-left: 15px;">忘记密码？</span></div></div><div class="login_float_l right-div"><span class="logintips">还没有我的幸福相馆帐号？</span> <a id="register" class="login_float_l button registerbtn">马上注册</a></div></div></div></div>';
var CONSTUPLOADPICNAME = "piduploadlist";
var CONSTPICNAME = "pidlist";
var CONSTNUMNAME = "numlist";
var UploadPidList = new Array();
var PayPidList = new Array();

function getFrameWindow(frame) {
    return frame && typeof (frame) == 'object' && frame.tagName == 'IFRAME' && frame.contentWindow;
}

(function ($) {
    if ($(".main", window.parent.document).text())//判断是否打开orderdetails的iframe
    {
        if (window.location.pathname.substr(window.location.pathname.length - 17, 17) != "orderdetails.aspx")//当在iframe中打开非orderdetails.aspx页面时，用父窗体打开iframe请求的URL
        {
            window.parent.location.href = window.location.href;
        }
    }

    $.fn.center = function () {
        var top = ($(window).height() - this.height()) / 2;
        var left = ($(window).width() - this.width()) / 2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        return this.css({ position: 'absolute', 'top': top + scrollTop, left: left + scrollLeft }).show();
    },

    $.fn.textFocus = function (v) {
        var range, len, v = v === undefined ? 0 : parseInt(v);
        this.each(function () {
            if ($.browser.msie) {
                range = this.createTextRange(); //文本框创建范围
                v === 0 ? range.collapse(false) : range.move("character", v); //范围折叠
                range.select();  //选中
            } else {
                len = this.value.length;
                v === 0 ? this.setSelectionRange(len, len) : this.setSelectionRange(v, v); //dom直接设置选区，然后focus
            }
            this.focus();
        });
        return this;
    }
})(jQuery);

$(function () {
    if (uid != "" && uid != undefined && uid != null) {
        var tempHTML = LoginHTML;
        tempHTML = tempHTML.replace("&loName&", username);
        $(".header").html(tempHTML);

        if ($("#goodsnumber").size() > 0)
            GetShoppingCarGoodsNumber();
    }
    else {
        $(".header").html(NotLoginHTML);
    }

    LoadAdvertisement();
});

function GetShoppingCarGoodsNumber() {
    $.get("BackGroundWork.aspx", { "type": "GetShoppingCarGoodsNumber", "user_id": uid, "temp": Math.random() }, GetShoppingCarNumberResult);
}

function GetShoppingCarNumberResult(res) {
    if (res.substr(0, 1) == "1")
        $("#goodsnumber").text("(" + res.substr(2) + ")");
}

function getRequest(name) {
    var parstr = window.location.search.substr(1);
    var arpar = parstr.split("&");
    var i;

    for (i = 0; i < arpar.length; i++) {
        if (arpar[i].length > name.length && arpar[i].toLowerCase().substr(0, name.length + 1) == name.toLowerCase() + "=")
            return arpar[i].substr(name.length + 1);
    }
    return "";
}

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

function Login() {
    if (uid == undefined || uid == "")
        ShowLoginBox();
}

function ShowLoginBox() {
    $("body").append(fadeDivStr);
    $("#fade").css("top", "0");
    $("#fade").css("left", "0");
    $("#fade").css("width", $("body").width());
    $("#fade").css("height", $("body").height());
    $("#fade").show();

    $("body").append("<div id='login_box' style='width:686px;height:380px;'></div>");
    $("#login_box").css("top", $(window).scrollTop() + 120);
    $("#login_box").css("left", ($(window).width() - $("#login_box").width()) / 2);
    $("#login_box").html(loginBoxHTML);

    //初始化登录框
    initinput();
    var account = getCookie("simply_xfxg_username");
    if (account != "") {
        $("#account").addClass("inputcolor");
        $("#account").val(account);
        $("#record_username").attr("checked", "checked");
    }

    $("#login_box").show();
}

function hideLoginBox() {
    $("#login_box").remove();
    $("#fade").remove();
}

function LoginOut() {
    try {
        cookiesOP.del("registCode");
    }
    catch (err)
    { }
    $.get("BackGroundWork.aspx", { "type": "LOGOUT", "temp": Math.random() }, LoginOutResult);
}

function LoginOutResult(res) {
    if (res.substr(0, 1) == "1") {
        window.location = "qt.aspx";
    }
}


//-----------登录框JS方法
var hash = { "#account": "用户名/手机/注册邮箱", "#password": "", "#verifyCode": "" }
var warring = { "#account": "请输入正确的用户名/手机/注册邮箱", "#password": "请输入密码", "#verifyCode": "请输入验证码" }
$(function () {

    $(document).delegate('#forgetpwd', 'click', function () {
        window.location.href = "resetpassword.aspx";
    });

    $(document).delegate('#register', 'click', function () {
        window.location.href = "register.aspx";
    });

    $(document).delegate('#update_verify_code', 'click', updateVerifyCode);

    $(document).delegate('#verifyCode', 'keydown', function (event) {
        if (event.keyCode == 13) {
            userLogin();
        }
    });

    $(document).delegate('#login', 'click', userLogin);

    $(document).delegate('#account', 'blur', function () {
        onblur("#account");
    });

    $(document).delegate('#account', 'focus', function () {
        onfocus("#account");
    });

    $(document).delegate('#password', 'blur', function () {
        onblur("#password");
    });

    $(document).delegate('#password', 'focus', function () {
        onfocus("#password");
    });

    $(document).delegate('#pwdhint', 'click', function () {
        onfocus("#password");
    });
})

function userLogin() {
    var account = trim($("#account").val());
    var password = trim($("#password").val());
    var verifyCode = trim($("#verifyCode").val());
    if (checkupvalue() == true && account != "" && password != "" && verifyCode != "") {
        if ($("#record_username").attr("checked") == "checked") {
            setCookie("simply_xfxg_username", account, "d14");
        }
        $.get("RespondRequest.aspx", { "type": "YHDL", "account": account, "pwd": hex_md5(password), "verifyCode": verifyCode, "tmp": Math.random() }, loginCallback);
    };
}

function updateVerifyCode() {
    $("#verifyImg").attr("src", "code.aspx?tmp=" + Math.random());
}

function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    //value = encodeURI(value);
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
        if (arr[0] == name) return unescape(arr[1]);
    }
    return "";
}

function checkupvalue() {
    for (var key in hash) {
        var value = trim($(key).val());
        if (value == "" || value == hash[key]) {
            showerror(warring[key]);
            return false;
        }
    }
    return true;
}

function add_css(str_css) { //Copyright @ rainic.com
    try { //IE下可行
        var style = document.createStyleSheet();
        style.cssText = str_css;
    }
    catch (e) { //Firefox,Opera,Safari,Chrome下可行
        var style = document.createElement("style");
        style.type = "text/css";
        style.textContent = str_css;
        document.getElementsByTagName("HEAD").item(0).appendChild(style);
    }
}

function loginCallback(result) {
    updateVerifyCode();
    if (result.substr(0, 1) == "1") {
        var pageName = result.substr(2).split("#")[0];
        var un = result.substr(2).split("#")[1];

        if (typeof (uid) != "undefined") {
            uid = result.substr(2).split("#")[2];
        }


        if (goPageName != "") {
            TurnPage(goPageName);
        }

        if (pageName == "resultveiwing" || pageName == "choosecertificate") {//判断是否从相片递交或结果查看页面登录
            var tempHTML = LoginHTML;
            tempHTML = tempHTML.replace("&loName&", un);
            $(".header").html(tempHTML);
            hideLoginBox();
            GetShoppingCarGoodsNumber();

            if (pageName == "choosecertificate") {
                var email = result.substr(2).split("#")[3];
                $("#emailTxt").val(email);
                cookiesOP.set("emailfill", email, 30);
            }
        }
        else if (pageName == "submitorder" || pageName == "confirmorder") {//判断是否从订单提交页面登录
            $("body").append("<form id='loginsubmitform' method='post' action='" + pageName + ".aspx'><input type='hidden' name='paysign' value='" + paysign + "'/><input type='hidden' name='dealtype' value='" + dealtype + "'/></form>");
            $("#loginsubmitform").submit();
        }
        else {
            if (document.URL.indexOf("?") != -1 && pageName == "myorder") {
                window.location.href = document.URL.substr(0, document.URL.indexOf("?"));
            }
            else {
                window.location.href = document.URL;
            }
        }

    }
    else {
        showerror(result.substr(2));
    }
}

function initinput() {
    for (var key in hash) {
        $(key).addClass("hintcolor");
        $(key).val(hash[key]);
    }
}

function onfocus(obj) {
    if (trim($(obj).val()) == hash[obj]) {
        if (obj == "#password") {
            $("#pwdhint").text("");
            $(obj).removeClass("hintcolor");
            return;
        }
        $(obj).removeClass("hintcolor");
        $(obj).addClass("inputcolor");
        $(obj).val("");
    }
}

function onblur(obj) {
    if (trim($(obj).val()) == "") {
        if (obj == "#password") {
            $("#pwdhint").text('密码');
            return;
        }
        $(obj).removeClass("inputcolor");
        $(obj).addClass("hintcolor");
        $(obj).val(hash[obj]);
    }
}

function showerror(msg) {
    $("#error").text(msg);
    var timeid = setInterval(function () {
        clearInterval(timeid);
        $("#error").text("");
    }, 3000);
}

function trim(str) {
    return str.replace(/\s+/g, "");
}

var goPageName = "";
function ShoppingCar() {
    goPageName = "shoppingcar.aspx";
    if (uid == undefined || uid == "") {
        ShowLoginBox();
    }
    else {
        TurnPage("shoppingcar.aspx");
    }
}

function CertificateGallery() {
    goPageName = "myphoto.aspx";
    if (uid == undefined || uid == "") {
        ShowLoginBox();
    }
    else {
        TurnPage("myphoto.aspx");
    }
}

function TurnPage(pName) {
    if (typeof (currentPage) != "undefined" && currentPage != "")
        $.messageBox("您确定要离开当前页面吗？", " 信息提示", LeavePage);
    else
        window.location.href = pName;
}

function LeavePage() {
    window.location.href = goPageName;
}

var hrefArray = new Array("index.aspx", "qt.aspx", "personalinfo.aspx");
var smallAd = "<img id='samll-ad' src='CSS/images/notice/gg_01.jpg' style='width:1000px;cursor:pointer' />";
var bigAd = "<img id='big-ad' src='CSS/images/notice/gg_02.jpg' style='display:none;width:1000px;cursor:pointer;' />";
function LoadAdvertisement() {
    return;
    if ($(".ad-div").size() > 0)
        return;

    var href = window.location.href.toLowerCase();
    var returnSign = false;

    $(hrefArray).each(function () {
        if (href.indexOf($(this)[0]) > 0) {
            returnSign = true;
            return;
        }
    });

    if (returnSign)
        return;

    $("body").prepend("<div class='ad-div' style='width:1000px;margin:0 auto;'>" + smallAd + "</div><div class='ad-div' style='width:1000px;margin:0 auto;'>" + bigAd + "</div>");

    $(document).delegate("#samll-ad", "click", function () {
        $(this).fadeOut(600, function () {
            $("#big-ad").fadeIn(300);
        });
    });

    $(document).delegate("#big-ad", "click", function () {
        $(this).fadeOut(600, function () {
            $("#samll-ad").fadeIn(300);
        });
    });
}
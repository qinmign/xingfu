$(function () {
    $("#now_local").text("个人信息");
    $(".rightbox div").eq(0).html("个人信息<a href='javascript:Modify();'>[修改]</a>");

    $(".sex_radio").click(function () {
        var clickObj = this;
        $(".sex_radio").each(function () {
            if (this == clickObj) {
                $(this).removeClass("def").addClass("act");
                $("#sex").val($(this).attr("value"));
                return;
            }
            $(this).removeClass("act").addClass("def");
        });
    });

    $(".sex_radio").each(function () {
        if ($(this).attr("value") == $("#sex").val()) {
            $(this).trigger("click");
        }
    });

    //遮罩层
    $("#shade").width($("#content_r").width() + 40);
    $("#shade").height($("#content_r").height() + 40);
    $("#shade").css("top", $("#content_r").offset().top);
    $("#shade").css("left", $("#content_r").offset().left);

    SetComboBox("provinceDiv", "province", 66, 88);
    SetComboBox("cityDiv", "city", 86, 108);
    if (cur_pro == "" || cur_pro == null || cur_pro == undefined) {
        iniAreaData("广东省", "广州市", "province", "city");
    }
    else {
        iniAreaData(cur_pro, cur_city, "province", "city");
    }

    $("#username").focus(function () { showTips("unTip", "用户名由英文字母，数字或汉字组成"); });

    $("#username").blur(UserNameCheck);
    $("#realname").blur(RealNameCheck);
    $("#address").blur(AddressCheck);
    //    $("#phone").blur(PhoneCheck);
    //    $("#email").blur(EmailCheck);

    if ($("#phone").val() == "" || $("#phone").val() == null || $("#phone").val() == undefined) {
        $("#phoneTip").html('<a style="display:none;" href="javascript:Modify_Info(\'01\');">[添加]</a>');
    }
    else {
        $("#phoneTip").html('<a style="display:none;" href="javascript:Modify_Info(\'01\');">[更改]</a>');
    }

    if ($("#email").val() == "" || $("#email").val() == null || $("#email").val() == undefined) {
        $("#emailTip").html('<a style="display:none;" href="javascript:Modify_Info(\'02\');">[添加]</a>');
    }
    else {
        $("#emailTip").html('<a style="display:none;" href="javascript:Modify_Info(\'02\');">[更改]</a>');
    }

    //充值按钮
    $(".rechargebtn").css("top", $("#feespan").position().top - 4);
    $(".rechargebtn").css("left", $("#feespan").position().left + $("#feespan").width());
    $(".rechargebtn").css("display", "inline-block");

});

window.onresize = function () {
    $(".rechargebtn").css("top", $("#feespan").position().top - 4);
    $(".rechargebtn").css("left", $("#feespan").position().left + $("#feespan").width());
    $(".rechargebtn").css("display", "inline-block");
}

function iniAreaData(proname, cityname, proObjName, cityObjName) {
    var proOptionStr = "";
    var cityOptionStr = "";
    for (var pro in areaJsonStr) {
        proOptionStr += "<li>" + pro + "</li>";

        if (pro == proname) {
            for (var i = 0; i < areaJsonStr[pro].length; i++) {
                cityOptionStr += "<li>" + areaJsonStr[pro][i] + "</li>";
            }
        }
    }

    var proObj = document.getElementById(proObjName + "OP");
    var cityObj = document.getElementById(cityObjName + "OP");

    $("#" + proObjName + "OP").children().eq(0).html(proOptionStr);
    $("#" + cityObjName + "OP").children().eq(0).html(cityOptionStr);

    if (cityname == "" || cityname == null || cityname == undefined) {
        cityname = areaJsonStr[proname][0];
    }
    document.getElementById(proObjName + "Txt").setAttribute("value", proname);
    document.getElementById(cityObjName + "Txt").setAttribute("value", cityname);

    var arv = new Array();
    arv[0] = "fillform2";
    arv[1] = cityObjName;
    bindLiEvent(proObj, arv);
    bindLiEvent(cityObj, null);
}

function LoadAreaData(proname, cityObjName) {
    var cityOptionStr = "";
    for (var i = 0; i < areaJsonStr[proname].length; i++) {
        cityOptionStr += "<li>" + areaJsonStr[proname][i] + "</li>";
    }

    $("#" + cityObjName + "OP").children().eq(0).html(cityOptionStr);
    $("#" + cityObjName + "Txt").val($("#" + cityObjName + "OP").children().eq(0).children().eq(0).text());
    bindLiEvent(document.getElementById(cityObjName + "OP"), null);
}

function Modify_Info(type) {
    switch (type) {
        case "01": $("#m_type").val(type + "#" + $("#phone").val()); break;
        case "02": $("#m_type").val(type + "#" + $("#email").val()); break;
        default: return;
    }
    $("#m_info").submit();
}

//设置错误信息
function setErrorMsg(name, msg) {
    $("#" + name).text(msg);
    $("#" + name).css("color", "red");
}

//设置检测正确信息
function setRightMsg(name) {
    $("#" + name).text("√");
    $("#" + name).css("color", "green");
}

//提示信息
function showTips(name, msg) {
    $("#" + name).text("" + msg + "");
    $("#" + name).css("color", "#484848");
}

function UserNameCheck(isBackUp) {
    if ($("#username").val() != $("#username").attr("ovalue")) {

        var reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
        var reg2 = /^1[0-9]{10}$/;
        var reg3 = /^[0-9]*$/;
        var userName = $("#username").val();
        var result = "";

        if (userName == "") {
            result = "请填写用户名";
        }
        else if (userName.length < 2) {
            result = "用户名至少为2个字符或汉字";
        }
        else if (userName.length > 10) {
            result = "用户名不能超过10个字符或汉字";
        }
        else if (reg3.test(userName)) {
            result = "用户名不能为纯数字";
        }
        else if (!reg.test(userName)) {
            result = "用户名中含有特殊字符";
        }
        else if (reg2.test(userName)) {
            result = "用户名不能为手机号";
        }

        if (result != "") {
            setErrorMsg("unTip", result);
            return false;
        }

        showTips("unTip", "正在验证...");
        $.get("BackGroundWork.aspx", { "type": "PERINFOCHECK", "cType": "un", "pVal": userName, "temp": Math.random() }, UNCheckResult);
    }
    else if ($.trim($("#username").val()) != "") {
        setRightMsg("unTip");
        return true;
    }
}

function UNCheckResult(res) {
    if (res.substring(0, 1) == "1") {
        setRightMsg("unTip")
    }
    else {
        setErrorMsg("unTip", res.substring(2));
    }
}

function RealNameCheck() {
    if ($("#realname").val() == "") {
        showTips("rnTip", "");
        return true;
    }

    var reg = /^[\u4e00-\u9fa5]{2,20}$/;
    if (!reg.test($("#realname").val())) {
        setErrorMsg("rnTip", "姓名必须由两个以上的汉字组成");
        return false;
    }
    else {
        setRightMsg("rnTip");
        return true;
    }
}

function AddressCheck() {
    if ($("#address").val() == "") {
        showTips("adTip", "");
        return true;
    }

    if ($("#address").val().length > 100) {
        setErrorMsg("adTip", "地址过长");
        return false;
    }

    //    var reg = /^[\u4e00-\u9fa5()（）0-9A-Za-z,，-]{2,}$/;
    //    if (!reg.test($("#address").val())) {
    //        setErrorMsg("adTip", "地址不正确");
    //        return false;
    //    }
    //    else {
    setRightMsg("adTip");
    return true;
    //    }
}

//function PhoneCheck() {
//    if ($("#phone").val() == "") {
//        showTips("phoneTip", "");
//        return true;
//    }

//    var reg = /^(13|15|18)[0-9]{9}$/;
//    if (!reg.test($("#phone").val())) {
//        setErrorMsg("phoneTip", "手机号不正确");
//        return false;
//    }

//    if ($("#phone").val() != $("#phone").attr("ovalue")) {
//        var phone = $("#phone").val();
//        showTips("phoneTip", "正在验证...");
//        $.get("BackGroundWork.aspx", { "type": "PERINFOCHECK", "cType": "ph", "pVal": phone, "temp": Math.random() }, PhoneCheckResult);
//    }
//    else {
//        setRightMsg("phoneTip");
//        return true;
//    }
//}

//function PhoneCheckResult(res) {
//    if (res.substring(0, 1) == "1") {
//        setRightMsg("phoneTip")
//    }
//    else {
//        setErrorMsg("phoneTip", res.substring(2));
//    }
//}

//function EmailCheck() {
//    if ($("#email").val() == "") {
//        showTips("emailTip", "");
//        return true;
//    }

//    var reg = /^[0-9\-._a-zA-Z]{1,}@[0-9\-._a-zA-Z]{1,}\.[0-9\-._a-zA-Z]{1,}$/;
//    if (!reg.test($("#email").val())) {
//        setErrorMsg("emailTip", "邮箱号不正确");
//        return false;
//    }

//    if ($("#email").val() != $("#email").attr("ovalue")) {
//        var email = $("#email").val();
//        showTips("emailTip", "正在验证...");
//        $.get("BackGroundWork.aspx", { "type": "PERINFOCHECK", "cType": "email", "pVal": email, "temp": Math.random() }, EmailCheckResult);
//    }
//    else {
//        setRightMsg("emailTip");
//        return true;
//    }
//}

//function EmailCheckResult(res) {
//    if (res.substring(0, 1) == "1") {
//        setRightMsg("emailTip")
//    }
//    else {
//        setErrorMsg("emailTip", res.substring(2));
//    }
//}

function InfoCheck() {
    var checkResult = true;

    if ($("#username").val().length < 2) {
        setErrorMsg("unTip", "用户名至少为2个字符或汉字");
        checkResult = false;
    }
    else if ($("#username").val().length > 10) {
        setErrorMsg("unTip", "用户名不能超过10个字符或汉字");
        checkResult = false;
    }

    var reg = /^[0-9]*$/;
    if (reg.test($("#username").val())) {
        setErrorMsg("unTip", "用户名不能为纯数字");
        checkResult = false;
    }

    reg = /^1[0-9]{10}$/;
    if (reg.test($("#username").val())) {
        setErrorMsg("unTip", "用户名不能为手机号");
        checkResult = false;
    }

    if ($("#username").val() == "") {
        setErrorMsg("unTip", "用户名不能为空");
        checkResult = false;
    }

    if ($("#unTip").text() != "√" && $("#unTip").text() != "用户名由英文字母，数字或汉字组成") {
        checkResult = false;
    }

    reg = /^[\u4e00-\u9fa5]{2,20}$/;
    if ($("#realname").val() != "" && !reg.test($("#realname").val())) {
        setErrorMsg("rnTip", "姓名必须由两个以上的汉字组成");
        checkResult = false;
    }

    //    reg = /^[\u4e00-\u9fa5()（）0-9A-Za-z,，-]{2,}$/;
    //    if ($("#address").val() != "" && !reg.test($("#address").val())) {
    //        setErrorMsg("adTip", "地址不正确");
    //        checkResult = false;
    //    }

    if ($("#address").val().length > 100) {
        setErrorMsg("adTip", "地址过长");
        checkResult = false;
    }

    //    reg = /^(13|15|18)[0-9]{9}$/;
    //    if ($("#phone").val() != "" && !reg.test($("#phone").val())) {
    //        setErrorMsg("phoneTip", "手机号不正确");
    //        checkResult = false;
    //    }

    //    var reg = /^[0-9\-._a-zA-Z]{1,}@[0-9\-._a-zA-Z]{1,}\.[0-9\-._a-zA-Z]{1,}$/;
    //    if ($("#email").val() != "" && !reg.test($("#email").val())) {
    //        setErrorMsg("emailTip", "邮箱号不正确");
    //        checkResult = false;
    //    }

    return checkResult;
}

function Modify() {
    $("#shade").css("z-index", "-100");
    $("#unTip").show();
    $("#phoneTip a").show();
    $("#emailTip a").show();
    $(".savebtn").css("display", "block");
}

function SaveInfo() {
    if (InfoCheck()) {
        var info = "";
        info = $("#username").val() + "#" + $("#realname").val() + "#" + $("#sex").val() + "#"
        + $("#birthday").val() + "#" + $("#provinceTxt").val() + "#" + $("#cityTxt").val() + "#"
        + $("#address").val();

        $.get("BackGroundWork.aspx", { "type": "SAVEPERINFO", "info": info, "temp": Math.random() }, SaveResult);
    }
}

function SaveResult(res) {
    if (res.substring(0, 1) == "1") {
        $("#username").attr("ovalue", $("#username").val());
        $("#unTip").hide();
        showTips("unTip", "用户名由英文字母，数字或汉字组成");
        showTips("rnTip", "");
        showTips("adTip", "");
        //        showTips("phoneTip", "");
        //        showTips("emailTip", "");
        $("#shade").css("z-index", "1005");
        alert("保存成功");
        window.location.reload();
    }
    else {
        alert(res.substr(2));
    }
}
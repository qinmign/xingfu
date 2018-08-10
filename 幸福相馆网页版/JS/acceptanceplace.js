var adHTML = '<div class="addressbox" id="ad&id&"><div class="seqbox"><div class="triangle"><span class="num">&num&</span></div></div>'
+ '<div class="adinfobox"><p><span class="receiver">&username&</span>，<span class="province">&province&</span>，'
+ '<span class="city">&city&</span>，<span class="address">&address&</span>，<span class="postcode">&postcode&</span></p>'
+ '<p><span class="phone">&phone&</span>,&nbsp;&nbsp;&nbsp;<span class="email">&email&</span></p><p id="opbtn&id&"></p></div></div>';

$(function () {
    $("#now_local").text("收件地址");
    $(".rightbox div").eq(0).text("收件地址");

    SetComboBox("provinceDiv", "province", 66, 88);
    SetComboBox("cityDiv", "city", 86, 108);
    iniAreaData("广东省", "广州市", "province", "city");

    $("#receiver").blur(function () { ReceiverCheck(true); });
    $("#address").blur(function () { AddressCheck(true); });
    $("#postcode").blur(function () { PostCodeCheck(true); });
    $("#phone").blur(function () { PhoneCheck(true); });
    $("#email").blur(function () { EmailCheck(true); });

    $.get("BackGroundWork.aspx", { "type": "GETADINFO", "temp": Math.random() }, GetResult);
});

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

    var proVal = proname;
    var cityVal = cityname;

    document.getElementById(proObjName + "Txt").setAttribute("value", proVal);
    document.getElementById(cityObjName + "Txt").setAttribute("value", cityVal);

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

function GetResult(res) {
    if (res.substring(0, 1) == "1") {//数据加载完毕

        var adList = res.substr(2).split("##");
        var tempHTML = "";
        var reg;

        for (var i = 0; i < adList.length; i++) {
            var infoList = adList[i].split("&");
            tempHTML = adHTML;
            tempHTML = tempHTML.replace("&num&", i + 1);
            tempHTML = tempHTML.replace("&username&", infoList[0]);
            tempHTML = tempHTML.replace("&province&", infoList[1]);
            tempHTML = tempHTML.replace("&city&", infoList[2]);
            tempHTML = tempHTML.replace("&address&", infoList[3]);
            tempHTML = tempHTML.replace("&postcode&", infoList[4]);
            tempHTML = tempHTML.replace("&phone&", infoList[5]);
            tempHTML = tempHTML.replace("&email&", infoList[6]);
            var reg = new RegExp("&id&", "g");
            tempHTML = tempHTML.replace(reg, infoList[8]);
            $(".fillbox").before(tempHTML);
            var opBtnStr = '<a href="javascript:ModifyAd(\'' + infoList[8] + '\');">[修改]</a><a href="javascript:DelAd(\'' + infoList[8] + '\');">[删除]</a>';
            if (infoList[7] != "1") {
                opBtnStr += '<a class="setDefbtn" href="javascript:SetDefAd(\'' + infoList[8] + '\');">[设为默认地址]</a>';
            }
            else {
                opBtnStr += '<a class="setDefbtn defaultad">默认地址</a>';
            }
            $("#ad" + infoList[8] + " #opbtn" + infoList[8]).html(opBtnStr);
        }

        $("#content_r script").remove();
        $("#content_r style").remove();
        $("#loadtable").remove();
        $(".addressbox").show();
        $(".fillbox").show();
    }
    else if (res.substr(0, 1) == "2") {//无数据
        $("#content_r script").remove();
        $("#content_r style").remove();
        $("#loadtable").remove();
        $(".fillbox").show();
    }
    else {//出错
        $("#content_r script").remove();
        $("#content_r style").remove();
        $("#loadtable").remove();
        $("#content_r").prepend("<div style='text-align:center;margin-top:40px;'>" + res.substr(2) + "</div>");
    }
}

function ModifyAd(num) {
    $("#content_r").children().hide("slow", function () {
        $(".caption").html("修改地址<span style='width:550px;display:inline-block;'></span><a class='m_a_leave' href='javascript:LeaveModify(\"" + num + "\");'>[退出修改]</a>");
        $("#receiver").val($("#ad" + num + " .receiver").text());
        $("#provinceTxt").val($("#ad" + num + " .province").text());
        $("#cityTxt").val($("#ad" + num + " .city").text());
        $("#address").val($("#ad" + num + " .address").text());
        $("#postcode").val($("#ad" + num + " .postcode").text());
        $("#phone").val($("#ad" + num + " .phone").text());
        $("#email").val($("#ad" + num + " .email").text());
        $("#savetype").val("02");
        $("#modify_id").val(num);
        $(".fillbox").show();
    });
}

function LeaveModify(id) {
    $("#savetype").val("01");
    ReSetData();
    $(".fillbox").hide();
    $(".caption").html("新增地址");
    $("#content_r").children().show();
    document.getElementById("ad" + id).focus();
}

function DelAd(num) {
    $.get("BackGroundWork.aspx", { "type": "DELAD", "seq_id": num, "temp": Math.random() }, DelAdResult);
}

function DelAdResult(res) {
    if (res.substr(0, 1) == "1") {
        $("#ad" + res.substr(2)).slideUp("slow", function () {
            $("#ad" + res.substr(2)).remove();
            var num = 1;
            $(".addressbox .num").each(function () {
                $(this).text(num++);
            });
        });
    }
    else {
        alert(res.substr(2));
    }
}

function SetDefAd(num) {
    $.get("BackGroundWork.aspx", { "type": "SETDEFAD", "seq_id": num, "temp": Math.random() }, SetDefAdResult);
}

function SetDefAdResult(res) {
    if (res.substr(0, 1) == "1") {
        ChangeDefAdDisplay(res.substr(2));
        alert("设置成功");
    }
    else {
        alert(res.substr(2));
    }
}

function ChangeDefAdDisplay(num) {
    if ($(".defaultad").parent().attr("id")) {
        var id = $(".defaultad").parent().attr("id").replace("opbtn", "");
        $(".defaultad").attr("href", "javascript:SetDefAd('" + id + "');");
        $(".defaultad").removeClass("defaultad").text("[设为默认地址]");
    }

    $("#ad" + num + " .setDefbtn").attr("href", "javascript:void(0);");
    $("#ad" + num + " .setDefbtn").text("默认地址");
    $("#ad" + num + " .setDefbtn").addClass("defaultad");
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

function ReceiverCheck(allowNull) {

    if (allowNull && $("#receiver").val() == "") {
        showTips("receiverTip", "");
        return true;
    }

    if (!allowNull && $("#receiver").val() == "") {
        setErrorMsg("receiverTip", "请填写收件人");
        return false;
    }

    var reg = /^[\u4e00-\u9fa5]{2,20}$/;
    if (!reg.test($("#receiver").val())) {
        setErrorMsg("receiverTip", "收件人必须由两个以上的汉字组成");
        return false;
    }
    setRightMsg("receiverTip");
    return true;
}

function AddressCheck(allowNull) {
    if (allowNull && $("#address").val() == "") {
        showTips("addressTip", "");
        return true;
    }

    if (!allowNull && $("#address").val() == "") {
        setErrorMsg("addressTip", "请填写地区街道");
        return false;
    }

    if ($("#address").val().length > 100) {
        setErrorMsg("addressTip", "地址过长");
        return false;
    }

//    var reg = /^[\u4e00-\u9fa5()（）0-9A-Za-z,，-]{2,}$/;
//    if (!reg.test($("#address").val())) {
//        setErrorMsg("addressTip", "地址不正确");
//        return false;
//    }
    setRightMsg("addressTip");
    return true;
}

function PostCodeCheck(allowNull) {
    if (allowNull && $("#postcode").val() == "") {
        showTips("postcodeTip", "");
        return true;
    }

    if (!allowNull && $("#postcode").val() == "") {
        setErrorMsg("postcodeTip", "请填写邮编");
        return false;
    }

    var reg = /^[1-9]\d{5}$/;
    if (!reg.test($("#postcode").val())) {
        setErrorMsg("postcodeTip", "邮编不正确");
        return false;
    }
    setRightMsg("postcodeTip");
    return true;
}

function PhoneCheck(allowNull) {
    if (allowNull && $("#phone").val() == "") {
        showTips("phoneTip", "");
        return true;
    }

    if (!allowNull && $("#phone").val() == "") {
        setErrorMsg("phoneTip", "请填写手机号码");
        return false;
    }

    var reg = /^1[0-9]{10}$/;
    if (!reg.test($("#phone").val())) {
        setErrorMsg("phoneTip", "手机号不正确");
        return false;
    }
    setRightMsg("phoneTip");
    return true;
}

function EmailCheck(allowNull) {
    if (allowNull && $("#email").val() == "") {
        showTips("emailTip", "");
        return true;
    }

    if (!allowNull && $("#email").val() == "") {
        setErrorMsg("emailTip", "请填写电子邮箱");
        return false;
    }

    var reg = /^[0-9\-._a-zA-Z]{1,}@[0-9\-._a-zA-Z]{1,}\.[0-9\-._a-zA-Z]{1,}$/;
    if (!reg.test($("#email").val())) {
        setErrorMsg("emailTip", "邮箱不正确");
        return false;
    }
    setRightMsg("emailTip");
    return true;
}

function InfoCheck() {
    var isOK = true;

    if (!ReceiverCheck(false)) {
        isOK = false;
    }
    if (!AddressCheck(false)) {
        isOK = false;
    }

    if (!PostCodeCheck(false)) {
        isOK = false;
    }

    if (!PhoneCheck(false)) {
        isOK = false;
    }

    if (!EmailCheck(false)) {
        isOK = false;
    }

    return isOK;
}

function SaveInfo() {
    if (InfoCheck()) {
        var info = "";
        var checkCode = $("#defcheck").attr("checked") == "checked" ? "1" : "0";
        if ($("#savetype").val() == "01") {
            info = $("#receiver").val() + "#" + $("#provinceTxt").val() + "#" + $("#cityTxt").val() + "#" + $("#address").val()
            + "#" + $("#postcode").val() + "#" + $("#phone").val() + "#" + $("#email").val() + "#" + checkCode;
            $.get("BackGroundWork.aspx", { "type": "SAVEADDRESS", "info": info, "temp": Math.random() }, SaveResult);
        }
        else if ($("#savetype").val() == "02") {
            info = $("#receiver").val() + "#" + $("#provinceTxt").val() + "#" + $("#cityTxt").val() + "#" + $("#address").val()
            + "#" + $("#postcode").val() + "#" + $("#phone").val() + "#" + $("#email").val() + "#" + checkCode + "#" + $("#modify_id").val();
            $.get("BackGroundWork.aspx", { "type": "MODIFYADDRESS", "info": info, "temp": Math.random() }, ModifyResult);
        }
    }
}

function SaveResult(res) {
    if (res.substring(0, 1) == "1") {
        var infoList = res.substr(2).split("#");
        var tempHTML = adHTML;

        //添加HTML
        var num = $(".addressbox .num:last").text() * 1 + 1;
        tempHTML = tempHTML.replace("&num&", num);
        tempHTML = tempHTML.replace("&username&", infoList[0]);
        tempHTML = tempHTML.replace("&province&", infoList[1]);
        tempHTML = tempHTML.replace("&city&", infoList[2]);
        tempHTML = tempHTML.replace("&address&", infoList[3]);
        tempHTML = tempHTML.replace("&postcode&", infoList[4]);
        tempHTML = tempHTML.replace("&phone&", infoList[5]);
        tempHTML = tempHTML.replace("&email&", infoList[6]);
        var reg = new RegExp("&id&", "g");
        tempHTML = tempHTML.replace(reg, infoList[8]);
        $(".fillbox").before(tempHTML);

        //添加按钮
        var opBtnStr = '<a href="javascript:ModifyAd(\'' + infoList[8] + '\');">[修改]</a><a href="javascript:DelAd(\'' + infoList[8] + '\');">[删除]</a>';
        if (infoList[7] != "1") {
            opBtnStr += '<a href="javascript:SetDefAd(\'' + infoList[8] + '\');">[设为默认地址]</a>';
        }
        else {
            opBtnStr += '<a class="setDefbtn defaultad">默认地址</a>';
        }
        $("#ad" + infoList[8] + " #opbtn" + infoList[8]).html(opBtnStr);
        $("#ad" + infoList[8]).slideDown("slow", function () {
            if (infoList[7] == "1") {//是否默认地址
                ChangeDefAdDisplay(infoList[8]);
            }
            ReSetData(); //重置输入框
        });
    }
    else {
        alert(res.substring(2));
    }
}

function ModifyResult(res) {
    if (res.substr(0, 1) == "1") {
        var infoList = res.substr(2).split("#");
        $("#ad" + infoList[8] + " .receiver").text(infoList[0]);
        $("#ad" + infoList[8] + " .province").text(infoList[1]);
        $("#ad" + infoList[8] + " .city").text(infoList[2]);
        $("#ad" + infoList[8] + " .address").text(infoList[3]);
        $("#ad" + infoList[8] + " .postcode").text(infoList[4]);
        $("#ad" + infoList[8] + " .phone").text(infoList[5]);
        $("#ad" + infoList[8] + " .email").text(infoList[6]);
        LeaveModify(infoList[8]);
        if (infoList[7] == "1") {//是否默认地址
            ChangeDefAdDisplay(infoList[8]);
        }
    }
    else {
        alert(res.substr(2));
    }
}

function ReSetData() {
    $("#receiver").val("");
    $("#address").val("");
    $("#postcode").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#provinceTxt").val("广东省");
    $("#cityTxt").val("广州市");
    showTips("receiverTip", "");
    showTips("addressTip", "");
    showTips("postcodeTip", "");
    showTips("phoneTip", "");
    showTips("emailTip", "");
}
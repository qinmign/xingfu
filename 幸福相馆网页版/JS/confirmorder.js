var DEALINGFEE = 5;
var PRINTFEE = 5;
var CONSTPICNAME = "pidlist";
var CONSTNUMNAME = "numlist";
var PidList = new Array();
var loadStr = "<style>#loadtable{height:150px;}</style><table id='loadtable'><tr><td><img src='css/images/pub/loading.gif' /><p>加载中...</p></td></tr></table>";
var isGoToPay = "1";

$(function () {
    window.history.forward(1);

    if (uid == "" || uid == null || uid == undefined) {
        $("#fillform2").remove();
    }
    else {
        $("#fillform1").remove();
        var reg = new RegExp("，", "g");
        var txt = $("#defAdInfo").text().replace(reg, "");
        if (txt == "" || txt == undefined || txt == null) {
            $(".defadBox").hide();
            AdRadioChecked("newAd");
        }
    }

    LoadPidCookes();
    $(".fillform .txtform").focus(function () {
        $(this).css("border-color", "gray");
    });

    $(".fillform .txtform").blur(function () {

        $(this).css("border-color", "rgb(221,221,221)");

        var id = $(this).attr("id").replace("Txt", "");
        var result = "";

        if (id == "email") {
            result = emailcheck(id, true);
        }
        else if (id == "receiver") {
            result = receivercheck(id, true);
        }
        else if (id == "address") {
            result = addresscheck(id, true);
        }
        else if (id == "post") {
            result = postcheck(id, true);
        }
        else if (id == "phone") {
            result = phonecheck(id, true);
        }
        else if (id == "email2") {
            result = emailcheck(id, true);
        }

        if (result == undefined || result == "") {
            return;
        }
        tipDisplay(id, result);
    });

    SetComboBox("provinceDiv", "province", 96, 118);
    SetComboBox("cityDiv", "city", 96, 118);
    iniAreaData("广东省", "广州市", "province", "city");

    $("#page1 img").each(function () {
        $(this).attr("src", $(this).attr("url"));
    })

    $("#texta").focus(function () {
        if ($("#texta").val() == "补充说明...")
            $("#texta").val("");
    });

    $("#texta").blur(function () {
        if ($("#texta").val() == "") {
            $("#texta").val("补充说明...");
        }

        if ($("#texta").val() == "补充说明...")
            $("#lnum").text("140");
    });

    $(".lbox textarea").keyup(function () { CheckTextArea(true); });
});

function AdRadioChecked(name) {
    $(".radiogroup").each(function () {
        if ($(this).attr("id") == name) {
            $(this).removeClass("radiodefault").addClass("radiodeact");
            switch (name) {
                case "defAd": $(".loginform").slideUp("slow", function () { $(".newadBox").height(30); }); break;
                case "newAd": $(".newadBox").css("height", "auto"); $(".loginform").slideDown("slow"); break;
            }
            return;
        }
        $(this).removeClass("radiodeact").addClass("radiodefault");
    });
}

function OtherGroupCheck(name) {
    $(".othergroup").each(function () {
        if ($(this).attr("id") == name) {
            $(this).removeClass("radiodefault").addClass("radiodeact");
            switch (name) {

            }
            return;
        }
        $(this).removeClass("radiodeact").addClass("radiodefault");
    });
}

function ModifyAd() {
    isGoToPay = "0";
    ClearReceiverForm();
    $("#saveType").val("02");
    $("#receiverTxt").val($("#receiverSpan").text());
    $("#provinceTxt").val($("#provinceSpan").text());
    $("#cityTxt").val($("#citySpan").text());
    $("#addressTxt").val($("#addressSpan").text());
    $("#postTxt").val($("#postcodeSpan").text());
    $("#phoneTxt").val($("#phoneSpan").text());
    $("#email2Txt").val($("#emailSpan").text());
    $(".newadBox").css("height", "auto");
    $(".defadBox").hide();
    $(".newAdRadio").hide();
    $(".defcb").hide();
    $("#m_title1").show();
    $(".loginform").hide();
    $(".loginform").slideDown("slow");
}

function R_back() {
    isGoToPay = "1";
    $("#saveType").val("01");
    ClearReceiverForm();
    $(".defadBox").show();
    $(".newAdRadio").show();
    $(".defcb").show();
    $("#m_title1").hide();
    AdRadioChecked("defAd");
}

function R_back2() {
    isGoToPay = "1";
    $(".otherAd").hide("slow", function () {
        $("#m_title2").hide();
        $(".defadBox").slideDown("slow");
        $(".newadBox").slideDown("slow");
        AdRadioChecked("defAd");
    });
}

function ChooseOther() {
    isGoToPay = "0";
    $("#m_title2").show();
    $(".defadBox").hide();
    $(".newadBox").hide();
    $(".otherAd").html(loadStr);
    $(".otherAd").slideDown("slow");
    $.get("BackGroundWork.aspx", { "type": "CHOOSEOTHERAD", "temp": Math.random() }, ChooseResult);
}

function ChooseResult(res) {
    if (res.substr(0, 1) == "1") {
        $(".otherAd").html(res.substr(2));
        $(".otherAd").hide();
        $(".otherAd").slideDown("slow");
    }
    else {
        alert(res.substr(2));
    }
}

function SaveNewAd() {
    if (ReceiverFormCheck(false)) {
        var checkCode = $("#defcb").attr("checked") == "checked" ? "1" : "0";
        var info = $("#receiverTxt").val() + "#" + $("#provinceTxt").val() + "#" + $("#cityTxt").val() + "#" + $("#addressTxt").val() + "#" + $("#postTxt").val() + "#" + $("#phoneTxt").val() + "#" + $("#email2Txt").val() + "#" + checkCode;
        if ($("#saveType").val() == "01") {
            $.get("BackGroundWork.aspx", { "type": "SAVEADDRESS", "info": info, "temp": Math.random() }, SaveResult);
        }
        else if ($("#saveType").val() == "02") {
            info = info + "#" + $("#seq").attr("value");
            $.get("BackGroundWork.aspx", { "type": "MODIFYADDRESS", "info": info, "temp": Math.random() }, ModifyResult);
        }
    }
}

function SaveResult(res) {
    if (res.substr(0, 1) == "1") {
        var infoList = res.substr(2).split("#");
        $("#receiverSpan").text(infoList[0]);
        $("#provinceSpan").text(infoList[1]);
        $("#citySpan").text(infoList[2]);
        $("#addressSpan").text(infoList[3]);
        $("#postcodeSpan").text(infoList[4]);
        $("#phoneSpan").text(infoList[5]);
        $("#emailSpan").text(infoList[6]);
        defemail = infoList[6];
        ClearReceiverForm();
        $("#defcb").attr("checked", true);
        $(".defadBox").show();
        AdRadioChecked("defAd");
        CalMailFee($("#provinceSpan").text());
    }
    else {
        alert(res.substr(2));
    }
}

function ModifyResult(res) {
    if (res.substr(0, 1) == "1") {
        var infoList = res.substr(2).split("#");
        $("#receiverSpan").text(infoList[0]);
        $("#provinceSpan").text(infoList[1]);
        $("#citySpan").text(infoList[2]);
        $("#addressSpan").text(infoList[3]);
        $("#postcodeSpan").text(infoList[4]);
        $("#phoneSpan").text(infoList[5]);
        $("#emailSpan").text(infoList[6]);
        defemail = infoList[6];
        ClearReceiverForm();
        $("#defcb").attr("checked", true);
        R_back();
        CalMailFee($("#provinceSpan").text());
    }
    else {
        alert(res.substr(2));
    }
}

function Comfirm() {
    $(".othergroup").each(function () {
        if ($(this).hasClass("radiodeact")) {
            var id = $(this).attr("id");
            $("#receiverSpan").text($("#receiverSpan" + id).text());
            $("#provinceSpan").text($("#provinceSpan" + id).text());
            $("#citySpan").text($("#citySpan" + id).text());
            $("#addressSpan").text($("#addressSpan" + id).text());
            $("#postcodeSpan").text($("#postcodeSpan" + id).text());
            $("#phoneSpan").text($("#phoneSpan" + id).text());
            $("#emailSpan").text($("#emailSpan" + id).text());
            defemail = $("#emailSpan" + id).text();
            $("#seq").attr("value", id);
            CalMailFee($("#provinceSpan").text());
            R_back2();
            $(window).scrollTop(0);            
            return false;
        }
    });
}

function tipDisplay(id, result) {
    if (result.split(":")[0] == "1") {
        $("#" + id + "tip .error_w").hide();
        $("#" + id + "tip .correct_w").show();
    }
    else if (result.split(":")[0] == "2") {
        $("#" + id + "tip .correct_w").hide();
        $("#" + id + "tip .error_w").hide();
    }
    else {
        $("#" + id + "tip .error_w").html("&nbsp;&nbsp;&times;" + result.split(":")[1]);
        $("#" + id + "tip .correct_w").hide();
        $("#" + id + "tip .error_w").show();
    }
}

function CheckTextArea(checkType) {
    if ($(".lbox textarea").val().length > 140) {
        $("#left_word").html("<span class='red_w'>您输入的文字已超过140字</span>");
        return false;
    }
    else if (checkType) {
        var left_word = 140 - $(".lbox textarea").val().length;
        $("#left_word").html("您还可以输入<span id='lnum'>" + left_word + "</span>字");
        return true;
    }
    else {
        return true;
    }
}

function emailcheck(id, allowNull) {

    if (!allowNull && ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined)) {
        return "0:请填写邮箱号";
    }
    else if ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined) {
        return "2:邮箱号为空";
    }

    var reg = /^[0-9\-._a-zA-Z]{1,}@[0-9\-._a-zA-Z]{1,}\.[0-9\-._a-zA-Z]{1,}$/;
    if (!reg.test($("#" + id + "Txt").val())) {
        return "0:请填写正确的邮箱号";
    }
    else {
        return "1:成功";
    }
}

function receivercheck(id, allowNull) {

    if (!allowNull && ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined)) {
        return "0:请填写收件人";
    }
    else if ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined) {
        return "2:收件人为空";
    }

    var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    if (!reg.test($("#" + id + "Txt").val())) {
        return "0:请填写正确的收件人姓名";
    }
    else {
        return "1:成功";
    }
}

function provincecheck(id, allowNull) {
    if (!allowNull && ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined)) {
        return "0:请选择省份和城市";
    }
    else if ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined) {
        return "2:省份为空";
    }
}

function citycheck(id, allowNull) {
    if (!allowNull && ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined)) {
        return "0:请选择省份和城市";
    }
    else if ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined) {
        return "2:城市为空";
    }
}

function addresscheck(id, allowNull) {

    if (!allowNull && ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined)) {
        return "0:请填写收件地址";
    }
    else if ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined) {
        return "2:收件地址为空";
    }

    //    var reg = /^[\u4e00-\u9fa5()（）0-9A-Za-z,，-]{2,}$/;
    //    if (!reg.test($("#" + id + "Txt").val())) {
    //        return "0:请填写正确的收件地址";
    //    }
    //    else {
    return "1:成功";
    //    }
}

function postcheck(id, allowNull) {

    if (!allowNull && ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined)) {
        return "0:请填写邮政编码";
    }
    else if ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined) {
        return "2:邮政编码为空";
    }

    var reg = /^[1-9]\d{5}$/;
    if (!reg.test($("#" + id + "Txt").val())) {
        return "0:请填写正确的邮政编码";
    }
    else {
        return "1:成功";
    }
}

function phonecheck(id, allowNull) {
    if (!allowNull && ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined)) {
        return "0:请填写联系电话";
    }
    else if ($("#" + id + "Txt").val() == "" || $("#" + id + "Txt").val() == undefined) {
        return "2:联系电话为空";
    }

    var reg = /^1[0-9]{10}$/;
    //var reg = /^([1-9]\d*\.?\d*)|(0\.\d*[1-9])/;
    if (!reg.test($("#" + id + "Txt").val())) {
        return "0:请填写正确的联系电话";
    }
    else {
        return "1:成功";
    }
}

function EmailFormCheck() {
    var result = emailcheck("email", false);
    if (result.split(":")[0] != "1") {
        tipDisplay("email", result);
        ScrollTop();
        return false;
    }
    return true;
}

function ReceiverFormCheck(needScroll) {
    var result1 = receivercheck("receiver", false);
    var result2 = addresscheck("address", false);
    var result3 = postcheck("post", false);
    var result4 = phonecheck("phone", false);
    var result5 = emailcheck("email2", false);

    if ((result1.split(":")[0] * 1 & result2.split(":")[0] * 1 & result3.split(":")[0] * 1 & result4.split(":")[0] * 1 & result5.split(":")[0] * 1) != 1) {
        tipDisplay("receiver", result1);
        tipDisplay("address", result2);
        tipDisplay("post", result3);
        tipDisplay("phone", result4);
        tipDisplay("email2", result5);
        if (needScroll) {
            ScrollTop();
        }
        return false;
    }
    return true;
}

function ScrollTop() {
    if ($(window).scrollTop() > 0) {
        $(window).scrollTop($(window).scrollTop() - 60);
        setTimeout(ScrollTop, 50);
    }
}

function ClearEmailForm() {
    $("#emailTxt").val("");
    $(".emailbox .correct_w").hide();
    $(".emailbox .error_w").hide();
}

function ClearReceiverForm() {
    if (defemail != "" && defemail != undefined && defemail != null) {
        $("#emailTxt").val(defemail);
        $("#email2Txt").val(defemail);
    }
    $("#receiverTxt").val("");
    $("#addressTxt").val("");
    $("#postTxt").val("");
    $("#phoneTxt").val("");
    $("#email2Txt").val("");
    iniAreaData("广东省", "广州市", "province", "city");
    $(".receiverbox .correct_w").each(function () {
        $(this).hide();
    });

    $(".receiverbox .error_w").each(function () {
        $(this).hide();
    });
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

    var proVal = proname;
    var cityVal = cityname;

    document.getElementById(proObjName + "Txt").setAttribute("value", proVal);
    document.getElementById(cityObjName + "Txt").setAttribute("value", cityVal);

    var arv = new Array();
    arv[0] = "fillform";
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

function PrintChecked(obj, picID) {
    if (obj.checked == true) {
        var printHTML = "<a class='reducebtn' href='javascript:ReduceNum(\"" + picID + "\");'></a>"
        + "<input autocomplete='off' type='text' class='txtform printtxt' id='" + picID
        + "Txt' disabled='disabled' value='1'/>"
        + "<a class='addbtn' href='javascript:AddNum(\"" + picID + "\");'></a>";

        $("#cytd" + picID).html(printHTML + "<span class='hidespan' id='on" + picID + "'>1</span>");

        SetPrintNumCookies(picID, 1);
        AddToSubFee(picID, PRINTFEE);
        AddToPrintFee(PRINTFEE);
        AddToTotalFee(PRINTFEE);
    }
    else {
        var p_amount = TurnNumber($("#" + picID + "Txt").val()) * PRINTFEE;
        AddToSubFee(picID, -p_amount);
        AddToPrintFee(-p_amount);
        AddToTotalFee(-p_amount);

        $("#cytd" + picID).html("-");
        DelPrintNumCookies(picID);
    }

    FillFormDisplay();
}

//检测是否有冲印，显示信息表单
function FillFormDisplay() {
    var neeFill = false;
    $(".page table tr td:nth-child(4) input").each(function () {
        if ($(this).attr("checked") == "checked") {
            neeFill = true;
            return false;
        }
    });

    if (neeFill) {
        $(".emailbox").hide();
        //ClearEmailForm();
        $(".receiverbox").slideDown("slow");
        formtype = "receiver";
        ExpressDisplay(true);
    }
    else {
        $(".receiverbox").hide();
        //ClearReceiverForm();
        $(".emailbox").slideDown("slow");
        formtype = "email";
        ExpressDisplay(false);
    }
}

//点击li事件执行的方法，计算邮寄费
function ExpressDisplay(isShow) {
    var provinceTxt = $("#provinceTxt").val();
    if (isShow) {//显示邮费

        if (!$("#newAd").hasClass("radiodeact") && isGoToPay == "1") {//当不是修改地址时才改变邮寄费
            if ($("#defAd").hasClass("radiodeact")) {
                provinceTxt = $("#provinceSpan").text();
            }

            CalMailFee(provinceTxt);
        }

        $("#expressbox").show();
    }

    if (!isShow) {//隐藏邮费
        if (!$("#newAd").hasClass("radiodeact") && isGoToPay == "1") {//当不是修改地址时才改变邮寄费
            AddToTotalFee(-MAILFEE);
            $("#expressfee").text("0");
        }

        $("#expressbox").hide();
    }
}

function CalMailFee(proName) {
    if ($("#expressfee").text() * 1 != 0) {
        AddToTotalFee(-MAILFEE);
    }
    MAILFEE = Number(expFee[proName]);
    $("#expressfee").text(MAILFEE);
    AddToTotalFee(MAILFEE);
}

function AddNum(picID) {
    $("#" + picID + "Txt").val(Number($("#" + picID + "Txt").val()) + 1);

    AddToSubFee(picID, PRINTFEE);
    AddToPrintFee(PRINTFEE);
    AddToTotalFee(PRINTFEE);

    SetPrintNumCookies(picID, Number($("#" + picID + "Txt").val()));
}

function ReduceNum(picID) {
    if ($("#" + picID + "Txt").val() * 1 == 1) {
        $.messageBox("冲印数量已为最小值", " 信息提示");
        return;
    }

    $("#" + picID + "Txt").val(Number($("#" + picID + "Txt").val()) - 1);
    AddToSubFee(picID, -PRINTFEE);
    AddToPrintFee(-PRINTFEE);
    AddToTotalFee(-PRINTFEE);

    SetPrintNumCookies(picID, Number($("#" + picID + "Txt").val()));
}

function DelOrderInfo(picID) {
    var res = window.confirm("确定要删除？");
    if (res) {

        var p_amount = TurnNumber($("#" + picID + "Txt").val()) * PRINTFEE;
        AddToCollectionFee(-DEALINGFEE);
        AddToPrintFee(-p_amount);
        AddToTotalFee(-(p_amount + DEALINGFEE));

        for (var i = 0; i < 5; i++) {//删除table信息
            $("#" + picID + "tr td").eq(2 + i).html("-");
        }

        var isLast = true;
        $("#tablebox table tr td:nth-child(6)").each(function () {
            if ($(this).text() == "删除") {
                isLast = false;
            }
        });
        if (isLast) {
            AddToTotalFee(-$("#expressfee").text() * 1);
        }

        DelPidCookies(picID); //删除cookies信息
    }
}

function LoadPidCookes() {
    var copidname = CONSTPICNAME;
    PidList = IsPicCookiesEmpty(cookiesOP.read(copidname)) == "" ? PidList : cookiesOP.read(copidname).split(",");
}

function DelPidCookies(picID) {
    var copidname = CONSTPICNAME;
    PidList.remove(picID);
    cookiesOP.set(copidname, PidList, null);
    DelPrintNumCookies(picID);
}

function SetPrintNumCookies(picID, num) {
    var conumname = CONSTNUMNAME + picID;
    cookiesOP.set(conumname, num, null);
}

function DelPrintNumCookies(picID) {
    var conumname = CONSTNUMNAME + picID;
    cookiesOP.del(conumname);
}

function TurnNumber(num) {
    if (num == "" || num == undefined || num == NaN || num == null) {
        return 0;
    }
    return Number(num);
}

function AddToSubFee(picID, amount) {
    var total = Number($("#sub" + picID).text());
    $("#sub" + picID).text(total + amount);
}

function AddToCollectionFee(amount) {
    var total = Number($("#collectionfee").text());
    $("#collectionfee").text(total + amount);
}

function AddToPrintFee(amount) {
    var total = Number($("#printfee").text());
    $("#printfee").text(total + amount);
}

function AddToTotalFee(amount) {
    var total = Number($("#totalfee").text());
    $("#totalfee").text(total + amount);
}

function IsPicCookiesEmpty(obj) {
    if (obj == "" || obj == undefined || obj == null) {
        return "";
    }
}

function SubmitOrder() {

    if ($("#totalfee").text() * 1 == 0 || $("#totalfee").text() == "" || $("#totalfee").text() == NaN || $("#totalfee").text() == undefined) {
        $.messageBox("该订单无需支付", " 信息提示");
        return;
    }

    if ($("#totalfee").text() * 1 < 0) {
        $.messageBox("订单金额异常,请重新下单进行付款", " 信息提示");
        return;
    }

    if (formtype == "email") {
        if (EmailFormCheck() && CheckTextArea(false)) {
            GenerateOrderNo("1");
        }
    }
    else {
        if (uid != "" && uid != undefined && uid != null) {
            if ($("#defAd").hasClass("radiodeact") && isGoToPay == "1") {
                GenerateOrderNo("2");
            }
            else {
                $.messageBox("请先确认收件地址", " 信息提示");
                //ScrollTop();
            }
            return;
        }

        if (ReceiverFormCheck(true) && CheckTextArea(false)) {
            GenerateOrderNo("2");
        }
    }
}

//生成订单
function GenerateOrderNo(filltype) {
    var payInfo = "";
    var total_m = $("#totalfee").text();
    var remarks = "";

    if ($("#texta").val() != "补充说明...") {
        var reg = new RegExp("#", "g");
        remarks = $("#texta").val().replace(reg, "");
    }

    if (filltype == "1") {//无需邮寄
        var email = $("#emailTxt").val();
        payInfo = filltype + "#" + email + "#" + total_m + "#" + remarks;
    }
    else {//需要邮寄
        var receiver = "";
        var phone = "";
        var area = "";
        var address = "";
        var postcode = "";
        var email = ""
        var mailfee = "";
        if (uid != "" && uid != undefined && uid != null) {//登录后
            receiver = $("#receiverSpan").text();
            phone = $("#phoneSpan").text();
            area = $("#provinceSpan").text() + $("#citySpan").text();
            address = $("#addressSpan").text();
            email = $("#emailSpan").text();
            postcode = $("#postcodeSpan").text();
            mailfee = $("#expressfee").text();
        }
        else {//未登录
            receiver = $("#receiverTxt").val();
            phone = $("#phoneTxt").val();
            area = $("#provinceTxt").val() + $("#cityTxt").val();
            address = $("#addressTxt").val();
            email = $("#email2Txt").val();
            postcode = $("#postTxt").val();
            mailfee = $("#expressfee").text();
        }
        payInfo = filltype + "#" + receiver + "#" + phone + "#" + area + "#" + address + "#" + email + "#" + total_m + "#" + remarks + "#" + postcode + "#" + mailfee;
    }

    if (dealtype == "1") {//如果是冲印+服务
        paysign = "s_print_deal";
    }

    $.get("BackGroundWork.aspx", { "type": "GNO", "info": payInfo, "paysign": paysign, "temp": Math.random() }, GenerateOrderResult);
}

function GenerateOrderResult(res) {
    if (res.substr(0, 1) == "1") {
        var ddh_code = res.substr(2);
        $("#h_order_no").val(ddh_code);
        $("#subform").attr("action", "payorder.aspx" + shoppingcarSign);
        $("#subform").submit();
    }
    else {
        alert(res.substr(2));
        window.location = "choosecertificate.aspx";
    }
}

function DelAllCookies() {
    //删除采集信息cookies
    var copidname = CONSTPICNAME;
    cookiesOP.del(copidname);
}

function showPicTip(pid, obj) {
    var tipHtml = "<div id='tipPhotoBlock' style='border:2px solid #FF6000;position:absolute;background-color:white;'><p id='picload' style='margin:0;padding:0'>正在加载...</p><img src='' id='tipPic' alt='' class='tipPic' style='display:none;' onload='ShowImg();' /></div>";
    $("body").append(tipHtml);
    var picUrl = $(obj).attr("url");
    picUrl = picUrl + "&width=130&height=130";
    $("#tipPic").attr("src", picUrl);

    $("#tipPhotoBlock").css("top", $(obj).position().top - 50);
    $("#tipPhotoBlock").css("left", $(obj).position().left + $(obj).width());
    $("#tipPhotoBlock").show();
}

function ShowImg() {
    $("#picload").hide();
    $("#tipPic").show();
}

function hidePicTip() {
    $("#tipPhotoBlock").remove();
}
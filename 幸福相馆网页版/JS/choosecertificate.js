var loadingStr = "<div id='load' style='color:white;text-align:center;position:relative;top:50%;'><img alt='' src='css/images/cermanage/ajax_loader.gif' style='width:208;margin:0 auto;'/><p>上传中，请稍候...</p></div>";
var idTypeStr = "<li>居民身份证</li><li>军官证</li><li>士兵证</li><li>军官离退休证</li><li>境外人员身份证明</li><li>外交人员身份证明</li>";
var bgColorStr = "<li>红</li><li>白</li><li>蓝</li>";
var yunnancer = "接云南省公安局通知，云南省出入境证件相片采集必须如实登记申请人身份证明号码信息，如因填写虚假信息导致不能办证，责任自负！";
var driverCar = "接省交管部门通知，驾驶证相片采集必须如实登记驾驶人身份证明号码信息，如因填写虚假信息导致不能办证，责任自负！";
var random = Math.random();

$(function () {
    var flashStr = "<object classid='clsid:D27CDB6E-AE6D-11CF-96B8-444553540000' onload='javascript:flashloaded();' "
    + "id='webXFXG' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0' "
    + "border='0' width='340' height='230'><param name='movie' value='Flash/Upload.swf?" + flashQueryString + "temp=" + random + "'><param name='quality' value='high'>"
    + "<param name='wmode' value='transparent'><param name='menu' value='false'><embed src='Flash/Upload.swf?" + flashQueryString + "temp=" + random + "' "
    + "pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' name='webXFXG' "
    + "width='340' height='230' quality='High' wmode='transparent'></embed></object>";

    if (flashQueryString != "" && typeof (flashQueryString) != "undefined") {
        ChangeUploadPath("2");
    }

    SetComboBox("categoryDiv", "cerCategory", 190, 212);
    SetComboBox("typeDiv", "cerType", 190, 212);
    SetComboBox("provinceDiv", "province", 81, 103);
    SetComboBox("cityDiv", "city", 81, 103);

    var cerType = getRequest("certype");
    if (cerType == "" || cerType == undefined) {
        cerType = "出入境证件";
    }
    LoadJsonData("cerCategory", "cerType", "province", "city", cerType);
    LocationTRDisplay();

    SetComboBox("idTypeDiv", "idType", 190, 212);
    SetComboBox("bgColorDiv", "bgColor", 190, 212);

    LoadData("idType", idTypeStr);
    LoadData("bgColor", bgColorStr);

    $("#idNumTxt").focus(function () {
        if ($("#cerCategoryTxt").val() == "出入境证件")
        { $(".idTip").html(yunnancer); }
        else if ($("#cerCategoryTxt").val() == "机动车驾驶证")
        { $(".idTip").html(driverCar); }
        $(".idTip").css("top", $("#idNumTxt").position().top - $(".idTip").height() - $("#idNumTxt").height() / 2);
        $(".idTip").css("left", $("#idNumTxt").position().left);
        $(".idTip").show();
    });

    $("#idNumTxt").blur(function () {
        $(".idTip").hide();
    });

    $(".uploadflash").append(flashStr);

    $(".uploadflash").mouseover(function () {
        try {
            getFlashMovieObject("webXFXG").display(true);
        }
        catch (err) {
        }
    });

    $(".uploadflash").mouseout(function () {
        try {
            getFlashMovieObject("webXFXG").display(false);
        }
        catch (err) {
        }
    });

    if (conSign == "" || conSign == "0" || conSign == null || conSign == undefined) {
        DelAllCookies();
    }

    if ($.trim($("#emailTxt").val()) == "") {
        var cookieEmail = cookiesOP.read("emailfill");
        var reg = /^[0-9\-._a-zA-Z]{1,}@[0-9\-._a-zA-Z]{1,}\.[0-9\-._a-zA-Z]{1,}$/;
        if (reg.test(cookieEmail)) {
            $("#emailTxt").val(cookieEmail);
        }
    }

    DisplaySampleBox(1);
});

var timer;
var page = 1;
function DisplaySampleBox(cur_num) {
    window.clearTimeout(timer);
    if (typeof (cur_num) != "undefined")
        page = cur_num;

    var next_num = (page % 2) + 1;

    $("#page" + next_num).hide();
    $("#page" + page).fadeIn(800);
    if (page == 1)
        $(".leftpicbox .headtitle h3").html("拍摄指引");
    else
        $(".leftpicbox .headtitle h3").html("相片范例");

    $("#step" + page).addClass("step" + page + "_act");
    page = next_num;
    $("#step" + page).removeClass("step" + page + "_act");
    timer = window.setTimeout(DisplaySampleBox, 10000);
}

function ComboBoxChange(key, comName, arv) {
    var opObj;
    var categoryTxt = document.getElementById(arv[0] + "Txt").value;
    if (comName == arv[0]) {//证件类别Combobox
        var typeKey = key;
        var proKey = certificateJson[typeKey][0];
        if (categoryTxt != "出国签证" && categoryTxt != "标准寸照" && categoryTxt != "毕业证" && categoryTxt != "中小学生学籍相片") {
            var cityKey = cerToProJson[proKey][0]; //第一个省份，城市的key

            //赋值给省份Combobox
            opObj = document.getElementById(arv[2] + "OP");
            opObj.childNodes[0].innerHTML = GetHTMLStr("02", proKey, arv[2] + "Txt");
            bindLiEvent(opObj, arv);

            //赋值给城市Combobox
            opObj = document.getElementById(arv[3] + "OP");
            opObj.childNodes[0].innerHTML = GetHTMLStr("03", cityKey, arv[3] + "Txt");
            bindLiEvent(opObj, arv);
        }

        //赋值给证件类型Combobox
        opObj = document.getElementById(arv[1] + "OP");
        opObj.childNodes[0].innerHTML = GetHTMLStr("01", typeKey, arv[1] + "Txt");
        bindLiEvent(opObj, arv);
    }
    else if (comName == arv[1]) {//证件类型Combobox
        var proKey = key;
        if (categoryTxt != "出国签证" && categoryTxt != "标准寸照" && categoryTxt != "出入境证件" && categoryTxt != "毕业证" && categoryTxt != "中小学生学籍相片") {
            var cityKey = cerToProJson[proKey][0]; //第一个省份，城市的key
            //赋值给省份Combobox
            opObj = document.getElementById(arv[2] + "OP");
            opObj.childNodes[0].innerHTML = GetHTMLStr("02", proKey, arv[2] + "Txt");
            bindLiEvent(opObj, arv);

            //赋值给城市Combobox
            opObj = document.getElementById(arv[3] + "OP");
            opObj.childNodes[0].innerHTML = GetHTMLStr("03", cityKey, arv[3] + "Txt");
            bindLiEvent(opObj, arv);
        }
    }
    else if (comName == arv[2]) {//省份Combobox
        if (categoryTxt != "出国签证" && categoryTxt != "标准寸照" && categoryTxt != "毕业证" && categoryTxt != "中小学生学籍相片") {
            var typeVal = document.getElementById(arv[1] + "Txt").value;
            var provinceVal = document.getElementById(arv[2] + "Txt").value;
            var cityKey = key;  //第一个省份，城市的key

            //赋值给城市Combobox
            opObj = document.getElementById(arv[3] + "OP");
            opObj.childNodes[0].innerHTML = GetHTMLStr("03", cityKey, arv[3] + "Txt");
            bindLiEvent(opObj, arv);
        }
    }

    if ($("#cerCategoryTxt").val() == "出入境证件" && $("#provinceTxt").val() == "云南省")
        ComboboxShow("云南省");
    else
        ComboboxShow($("#cerCategoryTxt").val());
    LocationTRDisplay();
}

function LoadJsonData() {
    var htmlStr = "";

    //初始化证件类别Combobox下拉列表
    for (var cer in certificateJson) {
        htmlStr += "<li>" + cer + "</li>";
    }
    var opObj = document.getElementById(arguments[0] + "OP");
    opObj.childNodes[0].innerHTML = htmlStr;
    bindLiEvent(opObj, arguments);

    var cerName = GetCerName(arguments[4]);
    if (cerName == "未知") {
        cerName = "出入境证件";
    }
    var typeKey = cerName; //第一个证件类别，证件类型的key
    var proKey = certificateJson[typeKey][0]; //第一个证件类型，省份的key

    //初始化证件类别Combobox文本框
    document.getElementById(arguments[0] + "Txt").value = typeKey;
    //document.getElementById(arguments[0] + "Txt").value = "---请选择---";

    //初始化证件类型Combobox
    opObj = document.getElementById(arguments[1] + "OP");
    opObj.childNodes[0].innerHTML = GetHTMLStr("01", typeKey, arguments[1] + "Txt");
    bindLiEvent(opObj, arguments);

    if (arguments[4] != "7" && arguments[4] != "8") {//不是出国签证和标准寸照时加载省份城市
        var cityKey = cerToProJson[proKey][0]; //第一个省份，城市的key

        //初始化省份Combobox
        opObj = document.getElementById(arguments[2] + "OP");
        opObj.childNodes[0].innerHTML = GetHTMLStr("02", proKey, arguments[2] + "Txt");
        bindLiEvent(opObj, arguments);

        //初始化城市Combobox
        opObj = document.getElementById(arguments[3] + "OP");
        opObj.childNodes[0].innerHTML = GetHTMLStr("03", cityKey, arguments[3] + "Txt");
        bindLiEvent(opObj, arguments);
    }
}

function LoadData(name, str) {
    var opObj = document.getElementById(name + "OP");
    opObj.childNodes[0].innerHTML = str;
    $("#" + name + "Txt").val($("#" + name + "OP").children().children().eq(0).text());
    bindLiEvent(opObj, null);
}

function GetHTMLStr(type, key, objTxt) {
    var htmlStr = "";
    var objList;
    if (type == "01") {
        objList = certificateJson[key];
    }
    else if (type == "02") {
        objList = cerToProJson[key];
    }
    else if (type == "03") {
        objList = proTocity[key];
    }
    else {
        return "Error";
    }

    for (var i = 0; i < objList.length; i++) {
        var reg = new RegExp("#", "g");
        if (i == 0) { document.getElementById(objTxt).value = objList[i].replace(reg, ""); }

        htmlStr += "<li>" + objList[i].replace(reg, "") + "</li>";
    }
    return htmlStr;
}

function LocationTRDisplay() {
    $("#locatinoTR :radio").attr("checked", false);
    if ($("#cerCategoryTxt").val() == "出入境证件" && $("#cerTypeTxt").val() == "中国护照或往来港澳台通行证") {
        $("#locatinoTR").show();
        var city = $("#cityTxt").val();
        //if (city == "广州市" || city == "深圳市" || city == "重庆市" || city == "南宁市" || city == "成都市" || city == "贵阳市" || city == "昆明市" || city == "珠海市" || city == "东莞市" || city == "佛山市") {
        if (city == "广州市" || city == "深圳市" || city == "佛山市" || city == "东莞市" || city == "珠海市") {
            $("#lbl1").text(city.replace("市", "") + "户籍");
            $("#lbl2").text("非" + city.replace("市", "") + "户籍");
        }
        else {
            $("#locatinoTR").hide();
        }
    }
    else {
        $("#locatinoTR").hide();
    }
}

function GetCerName(type) {
    var cername = "";
    switch (type) {
        case "1": cername = "出入境证件"; break;
        case "2": cername = "居民身份证"; break;
        case "3": cername = "居住证"; break;
        case "4": cername = "社会保障卡"; break;
        case "5": cername = "机动车驾驶证"; break;
        case "6": cername = "保安员证"; break;
        case "7": cername = "出国签证"; break;
        case "8": cername = "标准寸照"; break;
        default: cername = "未知"; break;
    }
    ComboboxShow(cername);
    return cername;
}

function ComboboxShow(cername) {
    $("#bgColorTxt").val("红");
    $("#idTypeTxt").val("居民身份证");
    var cerfificateName = $("#cerCategoryTxt").val();
    var provinceName = $("#provinceTxt").val();
    var cityName = $("#cityTxt").val();
    if (cername == "出国签证") {
        $("#provinceTR").hide();
        $("#idTypeTR").hide();
        $("#idNumTR").hide();
        $("#bgColorTR").hide();
    }
    else if (cername == "标准寸照") {
        $("#provinceTR").hide();
        $("#idTypeTR").hide();
        $("#idNumTR").hide();
        $("#bgColorTR").show();
    }
    else if (cername == "毕业证") {
        $("#provinceTR").hide();
        $("#idNumTR").hide();
        $("#idTypeTR").hide();
        $("#bgColorTR").show();
    }
    else if (cername == "中小学生学籍相片") {
        $("#provinceTR").hide();
        $("#idNumTR").hide();
        $("#idTypeTR").hide();
        $("#bgColorTR").hide();
    }
    //else if ((cerfificateName == "出入境证件" && provinceName == "云南省") || (cerfificateName == "机动车驾驶证" && provinceName == "广东省" && cityName != "深圳市") || (cername == "机动车驾驶证" && provinceName == "" && cityName == "")) {
    else if ((cerfificateName == "出入境证件" && provinceName == "云南省") || (cerfificateName == "机动车驾驶证" && provinceName == "广东省") || (cername == "机动车驾驶证" && provinceName == "" && cityName == "")) {
        $("#idNumTxt").val("");
        $("#provinceTR").show();
        $("#idTypeTR").show();
        $("#idNumTR").show();
        $("#bgColorTR").hide();
    }
    else {
        $("#provinceTR").show();
        $("#idTypeTR").hide();
        $("#idNumTR").hide();
        $("#bgColorTR").hide();
    }
}

var verifycode = "";
var uploadPath = "PicUpload";
var uploadCheckXML = "<?xml version='1.0' encoding='gb2312'?><response><head><type>UploadCheck</type>"
+ "<soft>web</soft><info>@info@</info></head><body><user_id>@user_id@</user_id><checkcode>@checkcode@</checkcode></body></response>";

var uploadPicXML = "<?xml version='1.0' encoding='gb2312'?><response><head><type>@upload_method@</type><soft>web</soft><info>@info@</info>"
+ "</head><body><user_id>@user_id@</user_id><checkcode>@checkcode@</checkcode><xp>@xp@</xp><filename>@filename@</filename><zjlx>@zjlx@</zjlx>"
+ "<province>@province@</province><city>@city@</city><sfzh>@sfzh@</sfzh><bgcolor>@bgcolor@</bgcolor><yjyy></yjyy>"
+ "<uniquesign>@uniquesign@</uniquesign><islocal>@islocal@</islocal><hb_id_num>@hb_id_num@</hb_id_num><hb_xm>@hb_xm@</hb_xm>"
+ "<hb_hk_city>@hb_hk_city@</hb_hk_city><hb_hk_county>@hb_hk_county@</hb_hk_county><hb_hk_phone>@hb_hk_phone@</hb_hk_phone>"
+ "<hb_hk_address>@hb_hk_address@</hb_hk_address><hb_hk_department>@hb_hk_department@</hb_hk_department><saveshoppingsign>1</saveshoppingsign><picture_id>@picture_id@</picture_id></body></response>";

var ucxml = "";
var upxml = "";
var ee = "";
function SendDataToFlash() {//获取证件相关参数，传递到flash
    if (getFlashMovieObject("webXFXG").checkChoose() == false) {
        $.messageBox("请选择相片", " 信息提示");
        return;
    }

    ucxml = uploadCheckXML;
    upxml = uploadPicXML;

    var zj_name = $("#cerTypeTxt").val();
    var pro_name = $("#provinceTxt").val();
    var city_name = $("#cityTxt").val();
    var id_num = $("#idNumTxt").val();
    var zj_type_name = $("#cerCategoryTxt").val();

    if (((zj_type_name == "出入境证件" && pro_name == "云南省") || (zj_type_name == "机动车驾驶证" && pro_name == "广东省" && city_name != "深圳市")) && $("#idNumTxt").val() == "") {
        $.messageBox("请输入证件号码", " 信息提示");
        return;
    }

    //if (((zj_type_name == "机动车驾驶证" && pro_name == "广东省" && city_name != "深圳市") || (zj_type_name == "出入境证件" && pro_name == "云南省"))) {
    if (((zj_type_name == "机动车驾驶证" && pro_name == "广东省") || (zj_type_name == "出入境证件" && pro_name == "云南省"))) {
        if ($("#idNumTxt").val().length > 18) {
            $.messageBox("请输入正确的身份证明号码", " 信息提示");
            return;
        }

        if ($("#idTypeTxt").val() == "居民身份证" && checkID($("#idNumTxt").val()) != true) {
            $.messageBox("身份证格式不正确", " 信息提示");
            return;
        }
    }

    var email = $.trim($("#emailTxt").val())
    if (email == "") {
        $.messageBox("请输入邮箱地址", " 信息提示");
        $("#emailTxt").textFocus();
        return;
    }

    var reg = /^[0-9\-._a-zA-Z]{1,}@[0-9\-._a-zA-Z]{1,}\.[0-9\-._a-zA-Z]{1,}$/;
    if (!reg.test(email)) {
        $.messageBox("请输入格式正确的邮箱地址", " 信息提示");
        $("#emailTxt").textFocus();
        return;
    }

    if ((zj_type_name == "出入境证件" && zj_name == "中国护照或往来港澳台通行证") && (city_name == "广州市" || city_name == "深圳市" || city_name == "佛山市" || city_name == "东莞市" || city_name == "珠海市")) {
        if (typeof ($('input[name="location"]:checked').val()) == "undefined") {
            $.messageBox("请选择申请人户籍", " 信息提示");
            return;
        }
        var code = $('input[name="location"]:checked').val();
        upxml = upxml.replace("@islocal@", code);
    }
    else {
        upxml = upxml.replace("@islocal@", "");
    }

    if (zj_type_name == "出入境证件" && (pro_name != "广东省" && pro_name != "广西区" && pro_name != "重庆市" && pro_name != "云南省" && pro_name != "贵州省" && pro_name != "四川省")) {
        zj_name = "全国" + zj_name;
    }
    else if (zj_type_name == "居民身份证") {
        if (city_name == "深圳市" || (pro_name != "广东省" && city_name != "九江市"))
            zj_name = "全国" + zj_name;
        else if (pro_name == "广东省")
            zj_name = "广东居民身份证";
        else if (pro_name == "江西省" && city_name == "九江市")
            zj_name = "江西居民身份证";
    }
    else if (zj_name == "居住证") {
        //if (city_name == "深圳市" || pro_name != "广东省")
        if (pro_name != "广东省")
            zj_name = "全国" + zj_name;
        else
            zj_name = "广东" + zj_name;
    }
    else if (zj_type_name == "社会保障卡" && !(city_name == "珠海市" || city_name == "汕头市")) {
        zj_name = "全国" + zj_name;
    }
    else if (zj_type_name == "机动车驾驶证") {
        //if (city_name == "深圳市" || pro_name != "广东省")
        if (pro_name != "广东省")
            zj_name = "全国" + zj_name;
        else
            zj_name = "广东" + zj_name;
    }
    else if (zj_type_name == "保安员证") {
        if (pro_name == "广东省")
            zj_name = "广东" + zj_name;
        else
            zj_name = "全国" + zj_name;
    }
    else if (zj_type_name == "毕业证" || zj_type_name == "中小学生学籍相片") {
        zj_name = zj_type_name;
    }

    var zj_code = cercode[zj_name];

    if (zj_type_name == "机动车驾驶证" || (zj_type_name == "出入境证件" && pro_name == "云南省")) {
        var idtype_code = idnumcode[$("#idTypeTxt").val()];
        upxml = upxml.replace("@sfzh@", idtype_code + id_num);
    }
    else {
        upxml = upxml.replace("@sfzh@", "");
    }

    if (zj_type_name == "标准寸照" || zj_type_name == "毕业证") {
        var bg_code = colorcode[$("#bgColorTxt").val()];
        pro_name = "";
        city_name = "";

        upxml = upxml.replace("@bgcolor@", bg_code);
    }
    else if (zj_type_name == "中小学生学籍相片") {
        upxml = upxml.replace("@bgcolor@", "3");
    }
    else {
        upxml = upxml.replace("@bgcolor@", "0");
    }

    if (zj_type_name == "出国签证" || zj_type_name == "中小学生学籍相片") {
        pro_name = "";
        city_name = "";
    }

    if (uid !== "" && typeof (uid) != "undefined") {
        ucxml = ucxml.replace("@user_id@", uid);
        upxml = upxml.replace("@user_id@", uid);
    }

    ucxml = ucxml.replace("@info@", verify1).replace("@checkcode@", uniquecode);
    upxml = upxml.replace("@zjlx@", zj_code).replace("@province@", pro_name).replace("@city@", city_name).replace("@hb_id_num@", "").replace("@hb_xm@", "").replace("@hb_hk_city@", "").replace("@hb_hk_county@", "").replace("@hb_hk_phone@", "").replace("@hb_hk_address@", "").replace("@hb_hk_department@", "").replace("@info@", verifycode).replace("@checkcode@", uniquecode).replace("@picture_id@", picture_id).replace("@upload_method@", uploadPath);

    CreateCerRecord(zj_type_name);
    cookiesOP.set("emailfill", email, 30);

    //ShowFaceDiv();
    //EmailRegist(email);

    ee = email;
    ShowNotice();
}

function GoToUpload() {
    ShowFaceDiv();
    EmailRegist(ee);
}

function EmailRegist(email) {
    $.get("backgroundwork.aspx", { "type": "emailregist", "email": email, "uid": uid, "temp": Math.random() }, EmailRegistCallBack);
}

function EmailRegistCallBack(res) {
    if (res.substr(0, 1) == "1") {
        ucxml = ucxml.replace("@user_id@", "");
        upxml = upxml.replace("@user_id@", "");
        SubmitPhotoData();
    }
    else if (res.substr(0, 1) == "2") {//后台注册
        var id = res.substr(2).split("#")[0];
        var registCode = res.substr(2).split("#")[1];
        cookiesOP.set("registCode", registCode, null);

        ucxml = ucxml.replace("@user_id@", id);
        upxml = upxml.replace("@user_id@", id);
        SubmitPhotoData();
    }
    else if (res.substr(0, 1) == "3") {//自动登录
        HideFaceDiv();
        Login();
        if ($("#account").size() > 0 && $("#emailTR #emailTxt").size() > 0)
            $("#account").val($("#emailTR #emailTxt").val());
    }
    else {
        alert(res.substr(2));
        HideFaceDiv();
    }
}

function SubmitPhotoData() {
    getFlashMovieObject("webXFXG").submit(wsurl, ucxml, upxml);
}

function getFlashMovieObject(movieName) {//通用获取Flash对象。IE下是object，而FF下是document
    if (window.document[movieName]) {
        return window.document[movieName];
    }
    if (navigator.appName.indexOf("Microsoft Internet") == -1) {
        if (document.embeds && document.embeds[movieName])
            return document.embeds[movieName];
    }
    else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
    {
        return document.getElementById(movieName);
    }
}

function FlashInterface(type, result) {
    if (type == "1") {
        ShowFaceDiv();
    }
    else if (type == "2") {
        HideFaceDiv(result);
    }
    else if (type == "3") {
        GoToResultVeiwing(result);
    }
}

function ShowFaceDiv() {
    if ($("#fade").length > 0)
        return;

    $(".rightpicbox").append(fadeDivStr);
    $("#fade").width($(".rightpicbox").width());
    $("#fade").height($(".rightpicbox").height());
    $("#fade").css("top", $(".rightpicbox").position().top);
    $("#fade").css("left", $(".rightpicbox").position().left);
    $("#fade").append(loadingStr);
    $("#fade").show();
}

function HideFaceDiv() {
    $("#fade").remove();
    if (arguments[0] != undefined && arguments[0] != NaN && arguments != null)
        alert(arguments[0]);
}

window.onresize = function () {
    $("#fade").css("top", $(".rightpicbox").position().top);
    $("#fade").css("left", $(".rightpicbox").position().left);
    $(".idTip").css("top", $("#idNumTxt").position().top - $(".idTip").height() - $("#idNumTxt").height() / 2);
    $(".idTip").css("left", $("#idNumTxt").position().left);

    if ($("#messageBox").size() > 1)
        NoticePosition();
}

function GoToResultVeiwing() {
    if (arguments[0] != undefined && arguments[0] != NaN && arguments != null) {
        $("#ccerform").remove();
        var data = arguments[0];
        var postHTML = '<form id="ccerform" method="post" action="resultveiwing.aspx"><input type="hidden" name="pid" value="' + data + '" /><input type="hidden" name="emailfill" value="' + $.trim($("#emailTxt").val()) + '" /></form>';
        $("body").append(postHTML);
        $("#ccerform").submit();
    }
    else {
        $.messageBox("图像号获取失败", " 信息提示");
    }
}

//删除采集信息cookies
function DelAllCookies() {
    cookiesOP.del(CONSTPICNAME);
    cookiesOP.del(CONSTUPLOADPICNAME);
}

function CreateCerRecord(cerType) {
    switch (cerType) {
        case "出入境证件": cookiesOP.set("certype", "1", null); break;
        case "居民身份证": cookiesOP.set("certype", "2", null); break;
        case "居住证": cookiesOP.set("certype", "3", null); break;
        case "社会保障卡": cookiesOP.set("certype", "4", null); break;
        case "机动车驾驶证": cookiesOP.set("certype", "5", null); break;
        case "保安员证": cookiesOP.set("certype", "6", null); break;
        case "出国签证": cookiesOP.set("certype", "7", null); break;
        case "标准寸照": cookiesOP.set("certype", "8", null); break;
        case "毕业证": cookiesOP.set("certype", "9", null); break;
        case "中小学生学籍相片": cookiesOP.set("certype", "10", null); break;
        ///////////////////////////////                                                                  
    }
}

function PhotoTestCheck(uniqueSign) {
    if (uniqueSign == "" || uniqueSign == undefined) {
        getFlashMovieObject("webXFXG").checkResult();
        return;
    }

    var failList = cookiesOP.read("uniquesign").split("#");
    if (failList.indexOf(uniqueSign) == -1) {
        getFlashMovieObject("webXFXG").checkResult();
    }
    else {
        HideFaceDiv();
        $.messageBox("您的相片不符合该证件照的技术要求，请重新拍摄或使用其它相片进行递交", " 信息提示");
    }
}

function ChangeUploadPath(pathSign) {
    switch (pathSign) {
        case "1": uploadPath = "PicUpload"; verifycode = verify2; break;
        case "2": uploadPath = "UploadOriginalPhoto"; verifycode = verify3; break;
        default: uploadPath = "PicUpload"; verifycode = verify2; break;
    }
}

function ShowNotice() {
    $.messageBox("<strong>法定证件照是识别个人生物特征的重要凭证，公安部门对此有严格的要求。任何用户不得对证件照的面部特征、轮廓和五官进行PS或其他技术处理。</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户在获得贴表相片和回执后，还需携带相关办证材料到公安办证部门办证。工作人员除了现场要采集申请人的指纹外，还会严格审核申请人和回执上的相片以及历史办证相片是否一致。如果发现有不相符的就会拒绝受理！因此郑重提示各位爱美的用户注意证件照的拍摄要求，否则因此而导致办证申请被拒绝，责任自负。", "证件照拍摄重要提示", GoToUpload);
    NoticePosition();
}

function NoticePosition() {
    $("#messageBox").css("top", $(".rightpicbox").position().top+83);
    $("#messageBox").css("left", $(".rightpicbox").position().left+110);
}

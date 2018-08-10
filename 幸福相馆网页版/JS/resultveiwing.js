$(function () {
    $("#cerphoto").attr("src", interfacePath + "showphoto.aspx?pid=" + pid + "&vcode=" + vcode + "&ptype=getstrokephoto&width=280&height=240");
    LoadPidCookes();

    GetCerStatus();
    uploadTimer = window.setInterval(UploadPercent, timeSpan);

    $("#dyTableBox table .dyTh1").html("<input type='checkbox' id='checkall' onclick='javascript:ChooseAll();' />");
    SetPayPidCheck();
    history.go(1);
    //document.onselectstart = function (event) { return false; };
    //document.oncontextmenu = function (event) { return false; };
});

function showPhotoCut() {
    $("#loadingimg").remove();
    $("#cerphoto").show();
}

var ischecking = false;
function GetCerStatus() {
    if (ischecking == false) {
        ischecking = true;
        $.get("BackGroundWork.aspx", { "type": "JCJG", "pid": pid, "temp": Math.random() }, GetResult);
    }
}

var checkSpan = 3 * 1000;
var firstTime = true;
function GetResult(res) {
    ischecking = false;
    var status = res.substr(0, 1) * 1;

    var reason = "";
    var solution = "";

    if (status == 0) {//后台系统出错
        reason = res.substr(2);
        solution = "请重新递交";
        CollectionFailed(reason, solution);
    }

    if (status == 3) {//系统运行中
        window.setTimeout(GetCerStatus, checkSpan);
    }

    if (status == 2) {
        var cres = res.substr(2);

        if (cres.substr(cres.length - 1) == ";")
            cres = cres.substr(0, cres.length - 1);

        var cress = cres.split(";");
        var rnum = cress.length;
        for (i = 0; i < rnum; i++) {
            if (rnum > 1) {//多个问题
                reason += cress[i];
                if (i + 1 < rnum) {
                    reason += ";";
                }
                if (json_check_result[cress[i]] != null) {
                    solution += json_check_result[cress[i]];
                    if (i + 1 < rnum) {
                        solution += ";";
                    }
                }
            }
            else {//一个问题
                reason = cress[0];
                if (json_check_result[cress[0]] != null) {
                    solution = json_check_result[cress[0]];
                }
            }
        }
        if (reason == "" || solution == "") {
            reason = "图像采集失败";
            solution = "请重新递交";
        }
        CollectionFailed(reason, solution);
    }
    if (status == 5) {//预处理完成，可先预付款,处理中：将递交的相片处理成标准的证件相片
        if (!firstTime) {
            finalPercent = 100;
            timeSpan = 0.04 * 1000;
            window.clearInterval(uploadTimer);
            uploadTimer = window.setInterval(UploadPercent, timeSpan);
        }
        else {
            window.clearInterval(uploadTimer);
            CollectionOK();
        }
    }
    if (status == 1) {//处理完成
        window.clearInterval(uploadTimer);
        CollectionOK();
    }
    if (status == 4) {//已付款，流程结束
        window.clearInterval(uploadTimer);
        CollectionOK();
    }

    firstTime = false;
}

var uploadTimer;
var percentNum = 1;
var finalPercent = 85;
var timeSpan = 0.3 * 1000;
function UploadPercent() {
    if (percentNum <= finalPercent) {
        SetPorgressBar(percentNum);
        percentNum++;
    }
    else {
        window.clearInterval(uploadTimer);
    }

    if (percentNum > 50)
        $("#progressbox p:eq(0)").text("正在处理相片...");

    if (percentNum > 100) {
        window.clearInterval(uploadTimer);
        CollectionOK();
    }
}

function SetPorgressBar(pos) {
    document.getElementById("progresstext").innerHTML = pos + "%";
    document.getElementById("progressline").style.left = -(362 - (362 / 100) * pos) + "px";
}

function CollectionFailed(reason, solution) {
    $("#reasontxt").text(reason);
    $("#solutiontxt").text(solution);
    $("#progressbox").remove();
    $(".picbox").hide();
    $(".failbox").show();
}

function CollectionOK() {
    $("#cerphoto").attr("src", interfacePath + "showphoto.aspx?pid=" + pid + "&vcode=" + vcode + "&ptype=getphoto&width=280&height=240&temp=" + Math.random());
    $("#progressbox").remove();
    $(".photobox").remove();
    $(".sucess_w").show();
    $("#collectoktip").show();
    ShowHzMB();
    AddOrderInfo();
    $(".arrowtd").eq(1).find("span").removeClass("waitarrow").addClass("actarrow");
}

function ShowHzMB() {
    $("#smallmb").attr("src", interfacePath + "showtemplate.aspx?pid=" + pid + "&vcode=" + vcode + "&width=60&height=45&temp=" + Math.random());
    $("#smallhz").attr("src", interfacePath + "huizhithumbnail.aspx?pid=" + pid + "&vcode=" + vcode + "&width=60&height=40&nopid=yes&temp=" + Math.random());
    $("#bigmb").attr("src", interfacePath + "showtemplate.aspx?pid=" + pid + "&vcode=" + vcode + "&width=282&height=242&temp=" + Math.random());
    $("#bighz").attr("src", interfacePath + "huizhithumbnail.aspx?pid=" + pid + "&vcode=" + vcode + "&width=282&height=242&nopid=yes&temp=" + Math.random());

    $(".continuebtn").css("display", "inline-block");
    $("#picbox").show();
}

//模版回执切换
function Chimg(str, shw, hid) {
    $(".bgbox p").text(str);
    $("#" + shw).show();
    $("#" + hid).hide();
}

function AddOrderInfo() {
    if (UploadPidList.indexOf(pid) == -1) {//cookies中不含有该pid时才进入添加cookies和添加table字符串
        AddPidCookies(); //增加图像号Cookies
        AddPayPidCookies(pid); //增加支付图像号Cookies

        var imgHMTLStr = "<img alt='' src='" + interfacePath + "showtemplate.aspx?pid=" + pid + "&vcode=" + vcode + "&width=55&height=40&temp=" + Math.random() + "' onclick='showPictureView(\"" + pid + "\",\"" + vcode + "\",\"mb\")'/>";
        if (pid.substr(0, 2).toUpperCase() != "ZH") {
            imgHMTLStr = "<img alt='' src='" + interfacePath + "huizhithumbnail.aspx?pid=" + pid + "&vcode=" + vcode + "&width=55&height=35&nopid=yes&temp=" + Math.random() + "' onclick='showPictureView(\"" + pid + "\",\"" + vcode + "\",\"hz\")'/>" + imgHMTLStr;
            $(".resultbox .bgbox").css("display", "inline-block");
            $(".resultbox .bg").css("display", "inline-block");
        }

        imgHMTLStr += "<span>" + certype + "</span>";

        var addHTMLStr = "<tr id='" + pid + "tr'><td><input checked='checked' type='checkbox' id='" + pid + "s_com'  class='goodscheckbox' "
        + "onclick='javascript:SelectGoods(\"" + pid + "\",true);'></td><td style='text-align:left;padding-left:10px;'><div style='display:inline-block;' onmouseover='javascript:showPicTip(\"" + pid + "\",this);' onmouseout='javascript:hidePicTip();' url='" + interfacePath + "showphoto.aspx?pid=" + pid + "&vcode=" + vcode + "&ptype=getphoto'>" + imgHMTLStr + "</div></td><td id='hprice_td" + pid + "'>&yen;";

        if (Number(handlingFee).toFixed(2) == 8)
            addHTMLStr += handlingFee + ".00<p style='font-size:12px;font-weight:normal;'></p></td><td id='pnumTD" + pid + "'><input id='cb" + pid;
        else
            addHTMLStr += handlingFee + ".00</td><td id='pnumTD" + pid + "'><input id='cb" + pid;

        addHTMLStr = addHTMLStr + handlingFee + ".00</td><td id='pnumTD" + pid + "'><input id='cb" + pid
        addHTMLStr = addHTMLStr + "' type='checkbox' onclick='javascript:PrintChecked(\"" + pid + "\");' /></td>"
        addHTMLStr = addHTMLStr + "<td id='" + pid + "pprice_td'>-</td><td id='subprice" + pid + "' class='red_w'>&yen;" + Number(handlingFee).toFixed(2) + "</td><td><a href='javascript:DelOrderInfo(\"" + pid + "\");'>删除</a></td></tr>";

        $(".orderinfo table").append(addHTMLStr);
        $(".orderinfo").css("display", "inline-block");
        $(".paydiv").css("display", "inline-block");
        AddToTotalFee(handlingFee); //增加采集服务费

        //增加一张原图
        if ($("#goodsnumber").size() > 0) {
            var num = $("#goodsnumber").text().replace("(", "").replace(")", "") * 1 + 1;
            $("#goodsnumber").text("(" + num + ")");
        }
    }
    if (pid.substr(0, 2).toUpperCase() != "ZH") {
        $("body").delegate("#hz", "click", function () {
            showPictureView(pid, vcode, "hz");
        });

        $("#collectoktip span").css("display", "inline-block");
    }
    $("body").delegate("#mb", "click", function () {
        showPictureView(pid, vcode, "mb");
    });
}

function DelOrderInfo(picID) {
    var res = window.confirm("确定要删除？");
    if (res) {
        //如果取消了商品勾选
        if (!$("#" + picID + "s_com").attr("checked")) {
            $(".orderinfo table #" + picID + "tr").remove();
            DelPidCookies(picID);
            DelPayPidCookies(picID);
            return;
        }

        //减去采集服务费和冲印服务费
        var amount = Number(handlingFee);
        if ($("#" + picID + "txt").val() && $("#" + picID + "txt").val() * 1 - Number(printFreeCount) > 0) {
            amount += ($("#" + picID + "txt").val() * 1 - Number(printFreeCount)) * printFee
        }
        AddToTotalFee(-amount);

        $(".orderinfo table #" + picID + "tr").remove();
        DelPidCookies(picID);
        DelPayPidCookies(picID);
    }
}

function AddNum(picID) {
    $("#" + picID + "txt").val(Number($("#" + picID + "txt").val()) + 1);
    SetPrintNumCookies(picID, Number($("#" + picID + "txt").val()));

    CalUnitPrintFee(picID, $("#" + picID + "txt").val() * 1, printFee);
}

function ReduceNum(picID) {
    $("#" + picID + "txt").val(Number($("#" + picID + "txt").val()) - 1);
    SetPrintNumCookies(picID, Number($("#" + picID + "txt").val()));

    if ($("#" + picID + "txt").val() * 1 < Number(printFreeCount)) {
        var htmlStr = "<input id='cb" + picID + "' type='checkbox' onclick='javascript:PrintChecked(\"" + picID + "\");' />";
        $("#pnumTD" + picID).html(htmlStr);
    }

    CalUnitPrintFee(picID, $("#" + picID + "txt").val() * 1, -printFee);
}

function PrintChecked(id) {
    if (!$("#" + id + "s_com").is(":checked")) {
        $("#" + id + "s_com").attr("checked", true);
        SelectGoods(id, true);
    }

    var htmlStr = "<a href='javascript:ReduceNum(\"" + id + "\");' class='reducebtn'></a><input autocomplete='off' type='text' readonly='readonly' id='" + id + "txt' class='txtform printtxt' value='1'/><a href='javascript:AddNum(\"" + id + "\");' class='addbtn'></a>";
    $("#pnumTD" + id).html(htmlStr);
    if (printFreeCount > 0)
        $("#" + id + "pprice_td").html("&yen;0.00");
    else
        $("#" + id + "pprice_td").html("&yen;" + Number(printFee).toFixed(2));
    SetPrintNumCookies(id, 1);
    AddToTotalFee(printFee);
    $("#subprice" + id).html("&yen;" + (($("#" + id + "txt").val() * 1) * Number(printFee) + handlingFee * 1).toFixed(2));
}

function CalUnitPrintFee(picID, printNum, calPrintFee) {
    if (printNum > 0 && printNum <= 0) {
        $("#" + picID + "pprice_td").html("&yen;0.00");
        $("#subprice" + picID).html("&yen;" + Number(handlingFee).toFixed(2));
        AddToTotalFee(calPrintFee);
    }
    else if (printNum > 0 && printNum> 0) {
        $("#" + picID + "pprice_td").html("&yen;" + Number(printFee).toFixed(2) + "</span>");
        $("#subprice" + picID).html("&yen;" + (($("#" + picID + "txt").val() * 1) * Number(printFee) + handlingFee * 1).toFixed(2));
        AddToTotalFee(calPrintFee);
    }
    else {
        $("#" + picID + "pprice_td").html("-");
    }
}

function AddToTotalFee(amount) {
    var total = Number($("#totalfee").text());
    $("#totalfee").text((total + Number(amount)).toFixed(2));
}

///////////////////////////////商品选择方法
function SetPayPidCheck() {
    var thisPID = "";
    $(".goodscheckbox").each(function () {
        thisPID = $(this).attr("id").replace("s_com", "");
        if (PayPidList.indexOf(thisPID) == -1) {
            $("#" + thisPID + "s_com").attr("checked", false);
            $("#hprice_td" + thisPID).html("-");
            $("#subprice" + thisPID).html("-");
            AddToTotalFee(-handlingFee);
        }
    });

    SetAllGoodsCheckBox();
}

//选择全部商品
function ChooseAll() {
    var id = "";
    $(".goodscheckbox").each(function () {
        id = $(this).attr("id").replace("s_com", "");

        if ($("#checkall").attr("checked")) {//选择全部
            if (!$(this).attr("checked")) {
                $(this).attr("checked", true);
                SelectGoods(id, false);
            }
        }
        else {//取消全部
            if ($(this).attr("checked")) {
                $(this).attr("checked", false);
                SelectGoods(id, false);
            }
        }
    });
}

//商品单项选择
function SelectGoods(id, isNeedSetAllChecked) {
    if ($("#" + id + "s_com").attr("checked")) {//勾选商品选项
        //增加处理服务费
        AddToTotalFee(handlingFee);
        //设置付款要付款相片的Cookies
        AddPayPidCookies(id);

        $("#hprice_td" + id).html("&yen;" + Number(handlingFee).toFixed(2));
        $("#subprice" + id).html("&yen;" + Number(handlingFee).toFixed(2));
       
    }
    else {//取消商品选项
        //减去处理服务费和冲印费
        AddToTotalFee(-handlingFee);

        var printNum = $("#" + id + "txt").val() * 1;
        if (printNum > 0 && printNum - printFreeCount > 0) {
            AddToTotalFee(-(printNum - printFreeCount) * Number(printFee));
        }

        var htmlStr = "<input id='cb" + id + "' type='checkbox' onclick='javascript:PrintChecked(\"" + id + "\");' />";
        $("#pnumTD" + id).html(htmlStr);
        $("#hprice_td" + id).html("-");
        $("#" + id + "pprice_td").html("-");
        $("#subprice" + id).html("-");

        //设置付款要付款相片的Cookies
        DelPayPidCookies(id);
    }

    if (isNeedSetAllChecked)
        SetAllGoodsCheckBox();
}

//设置全选按钮
function SetAllGoodsCheckBox() {
    var isAllChecked = true;
    $(".goodscheckbox").each(function () {
        if (!$(this).attr("checked")) {
            isAllChecked = false;
            return false;
        }
    });

    if (!isAllChecked)
        $("#checkall").attr("checked", false);
    else
        $("#checkall").attr("checked", true);
}

///////////////////////相关Cookies方法
function LoadPidCookes() {
    UploadPidList = IsPicCookiesEmpty(cookiesOP.read(CONSTUPLOADPICNAME)) == "" ? UploadPidList : cookiesOP.read(CONSTUPLOADPICNAME).split(",");

    PayPidList = IsPicCookiesEmpty(cookiesOP.read(CONSTPICNAME)) == "" ? PayPidList : cookiesOP.read(CONSTPICNAME).split(",");
}

function AddPidCookies() {
    var copidname = CONSTUPLOADPICNAME;
    UploadPidList.push(pid);
    cookiesOP.set(copidname, UploadPidList, null);
}

function DelPidCookies(picID) {
    var copidname = CONSTUPLOADPICNAME;
    UploadPidList.remove(picID);
    cookiesOP.set(copidname, UploadPidList, null);
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

function AddPayPidCookies(picID) {
    var copidname = CONSTPICNAME;
    if (PayPidList.indexOf(picID) == -1) {
        PayPidList.push(picID);
        cookiesOP.set(copidname, PayPidList, null);
    }
}

function DelPayPidCookies(picID) {
    var copidname = CONSTPICNAME;
    PayPidList.remove(picID);
    cookiesOP.set(copidname, PayPidList, null);
    DelPrintNumCookies(picID);
}

function IsPicCookiesEmpty(obj) {
    if (obj == "" || obj == undefined || obj == null) {
        return "";
    }
}

function ContinueCommit() {
    $("#conSign").val("1");
    $("#continueForm").submit();
}

function ReceiptTipCheck() {
    $(".gotopaybtn").attr("href", "javascript:void(0);");

    var tipSign = false;
    var thisPid = "";
    var tipList = "";

    PayPidList = IsPicCookiesEmpty(cookiesOP.read(CONSTPICNAME)) == "" ? PayPidList : cookiesOP.read(CONSTPICNAME).split(",");
    for (var i = 0; i < PayPidList.length; i++) {
        var pid = PayPidList[i];
        if (pid.indexOf("ZH9") != -1 && pid.length > 10) {
            tipSign = true;
            if (tipList != "")
                tipList = tipList + "#" + pid;
            else
                tipList = pid;
        }
    }

    if (tipSign) {
        $.get("BackGroundWork.aspx", { "type": "ReceiptCheck", "pidlist": tipList, "temp": Math.random() }, function (res) {
            if (res.substr(0, 1) == "1") {
                $.messageBox("您递交的<span style='color:rgb(255,103,0);'>" + res.substr(2) + "</span>，本平台暂无接口获取相片采集回执。具体办证所需材料请咨询当地办证部门，给您带来的不便，敬请谅解。", " 信息提示", GoToPay);
            }
            else {
                $.messageBox(res.substr(2), " 信息提示");
            }
            $(".gotopaybtn").attr("href", "javascript:ReceiptTipCheck();");
        });
    }
    else {
        GoToPay();
    }
}

function GoToPay() {
    $(".gotopaybtn").attr("href", "javascript:ReceiptTipCheck();");
    var isGo = false;
    $(".goodscheckbox").each(function () {
        var id = $(this).attr("id").replace("s_com", "");
        if ($(this).attr("checked")) {
            AddPayPidCookies(id);
            isGo = true;
        }
        else {
            DelPayPidCookies(id);
        }
    });

    if ($("#totalfee").text() && Number($("#totalfee").text()) <= 0)
        isGo = false;

    if (isGo) {
        var goToPayForm = "<form id='gotoPayForm' action='confirmorder.aspx' method='post'><input autocomplete='off'  type='hidden' name='paysign' value='collection' /><input autocomplete='off' type='hidden' name='upload_email' value='" + emailfill + "' /></form>";
        $("body").append(goToPayForm);
        $("#gotoPayForm").submit();
    }
    else {
        $.messageBox("请选择要付款的相片", " 信息提示");
    }
}

function showPicTip(pid, obj) {
    var tipHtml = "<div id='tipPhotoBlock' style='border:2px solid #FF6000;position:absolute;background-color:white;'><p id='picload' style='margin:0;padding:0'>正在加载...</p><img src='' id='tipPic' alt='' class='tipPic' style='display:none;' onload='ShowImg();' /></div>";
    $("body").append(tipHtml);
    var picUrl = $(obj).attr("url");
    picUrl = picUrl + "&width=130&height=130";
    $("#tipPic").attr("src", picUrl);

    $("#tipPhotoBlock").css("top", $(obj).position().top - 50);
    $("#tipPhotoBlock").css("left", $(obj).position().left + $(obj).width() + 30);
    $("#tipPhotoBlock").show();
}

function ShowImg() {
    $("#picload").hide();
    $("#tipPic").show();
}

function hidePicTip() {
    $("#tipPhotoBlock").remove();
}
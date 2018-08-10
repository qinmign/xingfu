
/// <reference path="jquery-1.8.2.min.js" />
/// <reference path="messageBox.js" />



function showPicTip(pid, obj) {
    var tipHtml = "<div id='tipPhotoBlock' style='border:2px solid #FF6000;position:absolute;background-color:white;'><p id='picload' style='margin:0;padding:0'>正在加载...</p><img src='' id='tipPic' alt='' class='tipPic' style='display:none;' onload='ShowImg();' /></div>";
    $("body").append(tipHtml);
    var picUrl = $(obj).attr("url");
    picUrl = picUrl + "&width=130&height=130";
    $("#tipPic").attr("src", picUrl);

    $("#tipPhotoBlock").css("top", $(obj).position().top - 50);
    $("#tipPhotoBlock").css("left", $(obj).position().left + $(obj).width() - 130);
    $("#tipPhotoBlock").show();
}

function ShowImg() {
    $("#picload").hide();
    $("#tipPic").show();
}

function hidePicTip() {
    $("#tipPhotoBlock").remove();
}

$(function () {
    $("#infobox tr td:nth-child(1)").css("text-align", "left");
    $("#infobox tr td:nth-child(2)").css("text-align", "left");
    $("#infobox tr td:nth-child(1)").css("padding-left", "30px");
});

function PrintChecked(id) {
    var htmlStr = "<a href='javascript:ReduceNum(\"" + id + "\");' class='reducebtn'></a><input autocomplete='off' type='text' readonly='readonly' id='" + id + "txt' class='txtform printtxt' value='1'/><a href='javascript:AddNum(\"" + id + "\");' class='addbtn'></a>";
    $("#pnumTD" + id).html(htmlStr);
    setTDStatus(id, 1);
    countFee();
}

function AddNum(picID) {
    setTDStatus(picID, Number($("#" + picID + "txt").val()) + 1);
}

var printFreeCount = 1;
function ReduceNum(picID) {
    setTDStatus(picID, Number($("#" + picID + "txt").val()) - 1);
}

function setTDStatus(picID, num) {
    $("#" + picID + "txt").val(num);

    if (num <= 0) {
        var htmlStr = "<input id='cb" + picID + "' type='checkbox' onclick='javascript:PrintChecked(\"" + picID + "\");' />";
        $("#pnumTD" + picID).html(htmlStr);
        $("#" + picID + "pprice_td").html("-");
    }
    else {

       
            $("#" + picID + "pprice_td").html("&yen;" + Number(printFee).toFixed(2));
    }
    countFee();

    $.get("AjaxRes.aspx", { "type": "GWC", "pid": picID, "op": "ALT", "num": num, "temp": Math.random() });
}

function DelOrderInfo(pid) {
    $.messageBox("确定要删除该相片吗？", "信息提醒", function () {

        $.get("AjaxRes.aspx", { "type": "GWC", "pid": pid, "op": "DEL", "num": 0, "temp": Math.random() });
        $("#" + pid + "tr").remove();
        countFee();

        if ($("#infobox table tr:has(td)").size() <= 0) {
            $("#emptybox").show();
            $("#infobox").hide();
        }

    });
}


function DelSomePic() {

    var pidList = new Array();
    var numList = new Array();
    var trs = $("#infobox table tr:has(td)");

    for (var i = 0; i < trs.size(); i++) {
        var printNum = 0;
        var pid = "";
        var tr = trs.eq(i);
        if (tr.children("td:nth-child(1)").children(":input").attr("checked") == "checked") {
            pid = tr.children("td:nth-child(1)").children(":input").attr("pid");

            if (tr.children("td:nth-child(4)").children(":text").size() > 0) {
                printNum = tr.children("td:nth-child(4)").children(":text").val() * 1;

            }
            pidList.push(pid);
            numList.push(printNum);
        }
    }

    if (pidList.length <= 0) {
        $.messageBox("请选择您要删除的相片", "信息提醒");
    }
    else {
        $.messageBox("确定要删除这" + pidList.length + "张相片吗？", "信息提醒", function () {

            $.get("AjaxRes.aspx", { "type": "GWC", "pid": pidList.join(','), "op": "DEL", "num": 0, "temp": Math.random() });
            for (var i = 0; i < pidList.length; i++) {
                $("#" + pidList[i] + "tr").remove();
            }
            countFee();

            if ($("#infobox table tr:has(td)").size() <= 0) {
                $("#emptybox").show();
                $("#infobox").hide();
            }

        });
    }
}

function GoToPay() {
    $("#nnn a").attr("href", "javascript:void(0);");

    var pidList = new Array();
    var numList = new Array();

    var trs = $("#infobox table tr:has(td)");

    for (var i = 0; i < trs.size(); i++) {
        var printNum = 0;
        var pid = "";

        var tr = trs.eq(i);
        if (tr.children("td:nth-child(1)").children(":input").attr("checked") == "checked") {
            pid = tr.children("td:nth-child(1)").children(":input").attr("pid");

            if (tr.children("td:nth-child(4)").children(":text").size() > 0) {
                printNum = tr.children("td:nth-child(4)").children(":text").val() * 1;

            }
            pidList.push(pid);
            numList.push(printNum);

        }
    }
    if (pidList.length <= 0) {
        $.messageBox("请选择要结算的相片", "信息提醒");
    }
    else {
        pp = pidList;
        nn = numList;

        var tipSign = false;
        var thisPid = "";
        var tipList = "";
        for (var i = 0; i < pidList.length; i++) {
            thisPid = pidList[i];
            if (thisPid.indexOf("ZH9") != -1) {
                tipSign = true;
                if (tipList != "")
                    tipList = tipList + "#" + thisPid;
                else
                    tipList = thisPid;
            }
        }

        if (tipSign) {
            $.get("BackGroundWork.aspx", { "type": "ReceiptCheck", "pidlist": tipList, "temp": Math.random() }, function (res) {
                if (res.substr(0, 1) == "1") {
                    $.messageBox("您递交的<span style='color:rgb(255,103,0);'>" + res.substr(2) + "</span>，本平台暂无接口获取相片采集回执。具体办证所需材料请咨询当地办证部门，给您带来的不便，敬请谅解。", " 信息提示", GoToPay2);
                }
                else {
                    $.messageBox(res.substr(2), " 信息提示");
                }
                $("#nnn a").attr("href", "javascript:GoToPay();");
            });
        }
        else {
            GoToPay2();
        }
    }
}

var pp;
var nn;
function GoToPay2() {
    $("#nnn a").attr("href", "javascript:GoToPay();");
    var cookiesName = "pidlist";
    var numCookiesName = "numlist";
    cookiesOP.del(cookiesName);
    cookiesOP.set(cookiesName, pp, null);
    for (var i = 0; i < pp.length; i++) {
        cookiesOP.set(numCookiesName + pp[i], nn[i], null);
    }

    var printForm = "<form id='printForm' method='post' action='confirmorder.aspx?shoppingcarSign=1'><input type='hidden' name='paysign' value='collection' /></form>";
    $("body").append(printForm);
    $("#printForm").submit();
}

function countFee() {
    var trs = $("#infobox table tr:has(td)");
    var checkFee = 0;
    var printFee = 0;
    var totalFee = 0;

    for (var i = 0; i < trs.size(); i++) {
        var ckd = false;
        var isPrint = false;
        var tr = trs.eq(i);
        if (tr.children("td:nth-child(1)").children(":input").attr("checked") == "checked") {
            ckd = true;
        }

        var jsf = tr.children("td:nth-child(3)").text().substr(1).replace("（老用户优惠价）","") * 1;
        var cydj = 0;
        var cyf = 0;
        if (tr.children("td:nth-child(4)").children(":text").size() > 0) {
            isPrint = true;
            cydj = tr.children("td:nth-child(5)").text().substr(1) * 1;
            cyf = cydj * (tr.children("td:nth-child(4)").children(":text").val() * 1 );
        }
        tr.children("td:nth-child(6)").html("&yen;" + (cyf + jsf * 1).toFixed(2));

        if (ckd) {
            checkFee += jsf;
            printFee += cyf;
        }
    }
    $("#mmm em:eq(0)").html("&yen;" + checkFee.toFixed(2));
    $("#mmm em:eq(1)").html("&yen;" + printFee.toFixed(2));
    $("#nnn em").html("&yen;" + (checkFee + printFee).toFixed(2));
}

//商品单项选择
function SelectGoods(obj) {
    countFee();
    SetAllGoodsCheckBox();
}

//设置全选按钮
function SetAllGoodsCheckBox() {
    var isAllChecked = true;

    var trs = $("#infobox table tr:has(td)");

    for (var i = 0; i < trs.size(); i++) {
        var tr = trs.eq(i);
        if (tr.children("td:nth-child(1)").children(":input").attr("checked") == "checked"
        || tr.children("td:nth-child(1)").children(":input").attr("checked") == true) {
        }
        else {
            isAllChecked = false;
            break;
        }
    }

    if (!isAllChecked) {
        $("#checkall").removeAttr("checked");
    }
    else {
        $("#checkall").attr("checked", "checked");
    }
}

//选择全部商品
function ChooseAll() {
    var id = "";

    var checked = false;
    if ($("#checkall").attr("checked") == "checked" || $("#checkall").attr("checked") == true) {
        checked = true;
    }
    var trs = $("#infobox table tr:has(td)");

    for (var i = 0; i < trs.size(); i++) {
        var tr = trs.eq(i);
        if (checked) {
            tr.children("td:nth-child(1)").children(":input").attr("checked", "checked");
        }
        else {
            tr.children("td:nth-child(1)").children(":input").removeAttr("checked");
        }
    }
    countFee();
}


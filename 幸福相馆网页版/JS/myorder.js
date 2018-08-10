var tabelHtml = '<div id="tablebox"><table><tr><th class="相片信息" colspan="3" style="border-bottom: 1px solid #DFE3E6;">相片信息</th><th class="订单号" style="border-bottom: 1px solid #DFE3E6;">订单号</th><th class="总额" style="border-bottom: 1px solid #DFE3E6;">总额</th><th class="下单时间" style="border-bottom: 1px solid #DFE3E6;">下单时间</th><th class="支付状态" style="border-bottom: 1px solid #DFE3E6;">支付状态</th><th class="操作" style="border-bottom: 1px solid #DFE3E6;">操作</th></tr></table></div>';
var inner_html = '<div class="word_box"><p>请您在新打开的页面中完成支付</p><p>如果您已完成支付，请点击"支付成功"去查看我的订单</p>'
+ '<p>如果您中断了支付，请点击"重新支付"</p></div><div class="btn_box"><a href="javascript:fkqr();" class="payok_btn colorbtn">支付成功</a>'
+ '<a href="javascript:cxfk();" class="repay_btn colorbtn">重新支付</a></div>';
var bottom_html = '<div id="pagelist"><div id="bottomOP"><div class="leftDiv"><input type="checkbox" onclick="CheckAll();" id="c_all">&nbsp;全选</div><div class="rightDiv"><a class="colorbtn batchbtn" href="javascript:BatchPrint();">批量冲印</a></div></div><div id="pageLinkOP"></div></div>';
var order_no = "";

$(function () {
    $("#now_local").text("我的订单");
    $(".rightbox div").eq(0).text("我的订单");

    $(document).delegate('.page .pitd input', 'click', function () {//checkbox
        var num = $(this).parents(".page table").attr("id").replace("page", "");
        var isNotAllCheck = false;
        var isAllDisabled = true;
        $("#page" + num + " .pitd input").each(function () {
            if ($(this).attr("disabled") != "disabled") {
                isAllDisabled = false;
                if (!$(this).attr("checked")) {
                    isNotAllCheck = true;
                }
            }
        });

        if (isNotAllCheck || isAllDisabled) {
            $("#c_all").attr("checked", false);
        }
        else {
            $("#c_all").attr("checked", true);
        }
    });

    $(".rightbox").delegate("a", "click", function () {//页码
        if ($(this).parent().parent().attr("id") != "pageLinkOP")
        { return; }

        var num = $(this).text().replace("[", "").replace("]", "");
        var isNotAllCheck = false;
        var isAllDisabled = true;

        $("#page" + num + " .pitd input").each(function () {
            if ($(this).attr("disabled") != "disabled") {
                isAllDisabled = false;
                if (!$(this).attr("checked")) {
                    isNotAllCheck = true;
                }
            }
        });

        if (isNotAllCheck || isAllDisabled) {
            $("#c_all").attr("checked", false);
        }
        else {
            $("#c_all").attr("checked", true);
        }
    });

    //var loginSign = getRequest("loginsign");
    //if (loginSign != undefined && loginSign == "maillogin") {
    Login();
    $(".loginclose").remove();
    //}

    if (uid != "" && uid != null && uid != undefined) {//登录加载用户订单信息
        $.get("BackGroundWork.aspx", { "type": "LoadOrderList", "loadsign": "01", "temp": Math.random() }, LoadResult);
    }
    else {//未登录
        Login();
        $(".loginclose").remove();
        //$.get("BackGroundWork.aspx", { "type": "LoadOrderList", "loadsign": "02", "temp": Math.random() }, LCookiesResult);
    }
});

function LoadResult(res) {
    if (res.substr(0, 1) == "1") {//正确
        $("#content_r script").remove();
        $("#content_r style").remove();
        $("#loadtable").remove();
        $("#content_r").prepend(res.substr(2));

        if (typeof (searchPid) != "undefined" && searchPid != "") {//查询id
            var thisPID;
            $(".page .pitd .pidp").each(function () {
                thisPID = $(this).text().substr(4);
                if (thisPID == searchPid) {
                    var num = $(this).parents(".page table").attr("id").replace("page", "");
                    eval($("#pageLinkOP #a" + num + " a").attr("href"));
                    $(this).css("background-color", "rgb(56,216,120)");
                    $(document).scrollTop($(this).position().top);
                }
            });
        }
        else {
            $("#page1 img").each(function () {
                $(this).attr("src", $(this).attr("url"));
            })
        }

        //读取是否有跳转Cookies
        var currentPageNum = cookiesOP.read("turnPageNum");
        cookiesOP.del("turnPageNum");
        if (currentPageNum != undefined && currentPageNum != "" && currentPageNum != NaN) {
            var tableNum = $("#tablebox table").size();
            if (Number(tableNum) <= 1)//如果页码等于1不跳转
                return;

            //alert($("#pageLinkOP span").children().eq(0).attr("href"));
            if (Number(tableNum) < Number(currentPageNum))//跳转页大于表格页码
            //eval($("#pageLinkOP span:eq(1)").children().eq(0).attr("href").replace("1", tableNum));
                gettitle($("#bottomOP").attr("pagenum"), tableNum, $("#bottomOP").attr("maxpage"));
            else
            //eval($("#pageLinkOP span:eq(1)").children().eq(0).attr("href").replace("1", currentPageNum));
                gettitle($("#bottomOP").attr("pagenum"), currentPageNum, $("#bottomOP").attr("maxpage"));
        }

    }
    else if (res.substr(0, 1) == "2") {//没有订单信息
        $("#content_r").html(tabelHtml);
        $("#tablebox table:eq(0) tr:eq(0)").after("<tr id='noOrder' style='border:none;font-size:16px;'><td colspan='8' style='border:none;'>您还没有任何订单哦，马上去<a href='choosecertificate.aspx'>递交相片</a></td></tr>");
        $("#tablebox").after(bottom_html);
    }
    else {//错误
        $("#content_r script").remove();
        $("#content_r style").remove();
        $("#loadtable").remove();
        $("#content_r").prepend("<br/><br/><div style='text-align:center;'>" + res.substr(2) + "</div>");
    }
}

function LCookiesResult(res) {
    if (res.substr(0, 1) == "1") {
        $("#content_r").html(res.substr(2));

        if (typeof (searchPid) != "undefined" && searchPid != "") {//查询id
            var thisPID;
            $(".page .pitd .pidp").each(function () {
                thisPID = $(this).text().substr(4);
                if (thisPID == searchPid) {
                    var num = $(this).parents(".page table").attr("id").replace("page", "");
                    eval($("#pageLinkOP #a" + num + " a").attr("href"));
                    $(this).css("background-color", "rgb(56,216,120)");
                    $(document).scrollTop($(this).position().top);
                }
            });
        }
        else {
            $("#page1 img").each(function () {
                $(this).attr("src", $(this).attr("url"));
            })
        }
    }
    else if (res.substr(0, 1) == "2") {
        $("#content_r").html(tabelHtml);
        $("#tablebox table:eq(0) tr:eq(0)").after("<tr id='noOrder' style='border:none;font-size:16px;'><td colspan='8' style='border:none;'>您还没有任何订单哦，马上去<a href='choosecertificate.aspx'>递交相片</a></td></tr>");
        $("#tablebox").after(bottom_html);
    }
    else {
        $("#content_r script").remove();
        $("#content_r style").remove();
        $("#loadtable").remove();
        $("#content_r").prepend("<br/><br/><div style='text-align:center;'>" + res.substr(2) + "</div>");
    }
}

function GoOrderDetail(orderno) {
    $("#iframeForm").attr("action", "orderdetails.aspx");
    $("#iframeForm").attr("target", "orderframe");
    $(".main").hide();
    var iframeHTML = '<iframe src="" frameborder="0" scrolling="no" id="orderframe" name="orderframe" onload="javascript:SetHeight();"/>';
    $("body").append(iframeHTML);
    $("#orderno").val(orderno);
    $("#iframeForm").submit();
}

function SetHeight() {
    var height = $("#orderframe").contents().find("body").height();
    $("#orderframe").height(height);
}

function CancelOrder(orderno) {
    if (confirm("确定要取消该订单吗？") == false)
        return;
    $.get("BackGroundWork.aspx", { "type": "QXDD", "orderno": orderno, "temp": Math.random() }, CancelResult);
}

function CancelResult(res) {
    if (res.substr(0, 1) == "1") {
        $("#tablebox table #" + res.substr(2) + "tr").each(function () {
            $(this).find("td:eq(0) input").attr("disabled", "disabled");
        });

        $("#tablebox table #" + res.substr(2) + "tr").each(function () {
            $(this).find("td:eq(3)").html(res.substr(2));
        });

        $("#tablebox table #" + res.substr(2) + "tr").each(function () {
            $(this).find("td:eq(6)").text("已取消");
        });

        $("#tablebox table #" + res.substr(2) + "tr").each(function () {
            $(this).find("td:eq(7)").html("<a href='javascript:DelOrder(\"" + res.substr(2) + "\");' class='dellinkbtn'>删除</a>");
        });
    }
    else {
        alert(res.substr(2));
    }
}

function DelOrder(orderno) {
    if (confirm("确定要删除该订单吗？") == false)
        return;
    $.get("backgroundwork.aspx", { "type": "deleteorder", "orderno": orderno, "temp": Math.random() }, DeleteOrderCallBack);
}

function DeleteOrderCallBack(res) {
    if (res.substr(0, 1) == "1") {
        //记下当前页码
        var currentPageNum = 1;
        $("#tablebox table").each(function () {
            if ($(this).is(":visible")) {
                currentPageNum = $(this).attr("id").replace("page", "");
                cookiesOP.set("turnPageNum", currentPageNum, null);
                return false;
            }
        });
        window.location.href = document.URL;
    }
    else {
        alert(res.substr(2));
    }
}

function PayOrderQuestion(orderno, isShow) {
    if (confirm("该订单含有回执过期的相片\n仍要支付吗？")) {
        PayOrder(orderno, isShow);
    }
}

function PayOrder(orderno, isShow) {
    order_no = orderno;
    curType = "3";
    $.get("BackGroundWork.aspx", { "type": "ORDERLISTPAY", "orderno": orderno, "temp": Math.random() }, P_Result);
    if (isShow) {
        showPayBox();
    }
}

function P_Result(res) {
    if (res.substr(0, 1) == "1") {
        $("#iframeForm").attr("action", "payorder.aspx");
        $("#iframeForm").attr("target", "_blank");
        $("#orderno").val(res.substr(2) + "#" + "orderlist");
        $("#iframeForm").submit();
    }
    else {
        alert(res.substr(2));
    }
}

function CheckAll(obj) {
    if ($("#c_all").attr("checked") == "checked") {
        $(".page table").each(function () {
            if ($(this).css("display") == "block") {
                var num = $(this).attr("id").replace("page", "");
                $("#page" + num + " .pitd input").each(function () {
                    if ($(this).attr("disabled") != "disabled") {
                        $(this).attr("checked", true);
                    }
                });
            }
        });
    }
    else {
        $(".page table").each(function () {
            if ($(this).css("display") == "block") {
                var num = $(this).attr("id").replace("page", "");
                $("#page" + num + " .pitd input").each(function () {
                    if ($(this).attr("disabled") != "disabled") {
                        $(this).attr("checked", false);
                    }
                });
            }
        });
    }
}


var bpList = new Array();
function BatchPrint() {
    var pid;
    var isChecked = false;
    bpList.splice(0, bpList.length);

    var copidname = "pidlist";
    cookiesOP.del(copidname);

    $(".pitd input").each(function () {
        if ($(this).attr("checked") == "checked") {
            isChecked = true;
            pid = $(this).attr("id").substr(0, $(this).attr("id").length - 2);

            if (bpList.indexOf(pid) == -1) {
                bpList.push(pid);
            }
            DelPrintNumCookies(pid); //清除该图像号的打印数量
            cookiesOP.set(copidname, bpList, null);
        }
    });
    if (!isChecked) {
        alert("请选择需要冲印的订单");
        return;
    }
    $("#bp_form").submit();
}

function DelPrintNumCookies(picID) {
    var conumname = "numlist" + picID;
    cookiesOP.del(conumname);
}

function showPicTip(pid, obj) {
    var tipHtml = "<div id='tipPhotoBlock' style='border:2px solid #FF6000;position:absolute;background-color:white;'><p id='picload' style='margin:0;padding:0'>正在加载...</p><img src='' id='tipPic' alt='' class='tipPic' style='display:none;' onload='ShowImg();' /></div>";
    $("body").append(tipHtml);
    var picUrl = $(obj).attr("url");
    picUrl = picUrl + "&width=130&height=130";
    $("#tipPic").attr("src", picUrl);

    $("#tipPhotoBlock").css("top", $(obj).position().top - 30);
    $("#tipPhotoBlock").css("left", $(obj).position().left + $(obj).width() + 10);
    $("#tipPhotoBlock").show();
}

function ShowImg() {
    $("#picload").hide();
    $("#tipPic").show();
}

function hidePicTip() {
    $("#tipPhotoBlock").remove();
}
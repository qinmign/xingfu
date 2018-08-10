var CONSTPICNAME = "pidlist";
var CONSTNUMNAME = "numlist";
var CONSTORDERNAME = "o_list";
var PidList = new Array();
var OrderList = new Array();
var s_box_html = '<div id="layout_w" class="search_box"><div id="innerBox" class="inner_w" style="width:480px;height:370px;">'
+ '<div class="head_t"><h2>查询结果</h2>'
+ '<a class="closebtn" href="javascript:HideSearchBox();"></a></div>'
+ '<div class="picbox"><div><img src="&picurl&" /></div><div class="picinfobox"><p><span class="i_name">图像号：'
+ '</span><span class="i_result" id="pidSpan">&pid&</span></p><p><span class="i_name">采集时间：</span>'
+ '<span class="i_result">&c_time&</span></p><p><span class="i_name">证件类型：</span><span class="i_result">'
+ '&certype&</span></p><p><span class="i_name">回执有效期：</span><span class="i_result">&lastdate&</span></p></div></div>'
+ '<div class="servicebox"><p>请选择您需要的服务：</p><p><input type="checkbox" id="two_s" />下载相片、下载冲印模版、补打回执(2元/张)</p>'
+ '<p><input type="checkbox" id="three_s" />冲印相片(5元/张)&nbsp;&nbsp;&nbsp;数量：<a class="reducebtn" href="javascript:ReduceNum();"></a>'
+ '<input type="text" class="printtxt" disabled="disabled" /><a class="addbtn" href="javascript:AddNum();"></a></p></div>'
+ '<div class="calbox"><span class="calspan">小计：<span id="t_money"></span>元</span>'
+ '<a class="searchcolorBtn topaybtn" href="javascript:GoToPay();">去付款&nbsp;&nbsp;&gt;</a>'
+ '<a class="searchcolorBtn addtoorderbtn" href="javascript:AddToOrder();">添加到订单</a></div>'
+ '</div></div>';

$(function () {
    if (uid == "" || uid == null || uid == undefined) {//未登录
        $("#local_path").text("本站查询");
        $("#local_tipw").html("<p>您可通过<span class='blue_w'>订单号</span>和<span class='blue_w'>手机号</span>或<span class='blue_w'>电子邮箱</span>查询我的幸福相馆订单。</p>");

        $(".orderOPbox").hide();
        $(".perInfo").hide();
        $("#other_tipw").show();
        $("#warm_tipw").show();
    }
    else {//登录
        $("#local_path").text("旧版证照查询");
        $("#local_tipw").html("<p>您可通过相片采集回执上的<span class='blue_w'>图像号</span>和<span class='blue_w'>采集时间</span>查询<span class='blue_w'>旧版</span>我的幸福相馆证照。</p>");

        $(".l_title:eq(0)").hide();
        $(".click_title").show();
        //$(".select_path").css("cursor", "default");
        $(".click_title").click(function () {//抬头处的点击事件
            if ($(".click_title").find(".arrowspan").hasClass("defarrow")) {
                $(".click_title").find(".arrowspan").removeClass("defarrow").addClass("actarrow");
                if ($("#select_w").text() == "旧版证照查询")
                { $("#local_tipw").slideDown("slow"); }
                else
                { $("#other_tipw").slideDown("slow"); }
                $("#warm_tipw").slideDown("slow");
                return;
            }
            $(".click_title").find(".arrowspan").removeClass("actarrow").addClass("defarrow");
            $("#other_tipw").slideUp("slow");
            $("#local_tipw").slideUp("slow");
            $("#warm_tipw").slideUp("slow");

        });

        $(".click_title").trigger("click");
    }

    $(document).click(function (oEvent) {//点击通道或页面时控制下拉框的显示
        var oEvent = oEvent ? oEvent : window.event;
        var oElem = oEvent.srcElement || oEvent.target; // 兼容Chrome,FF等浏览器
        if (oElem.className == "select_path" || oElem.id == "select_w" || oElem.id == "select_arrow") {//点击选择通道下拉框
            SelectToggle();
        }
        else {
            if (oElem.id == "other_path") {
                SetSearchFormTxt("other_path");
                if (uid == "" || uid == null || uid == undefined) {//未登录时才显示提示
                    $("#local_tipw").hide();
                    $("#other_tipw").slideDown("slow");
                }
                else if ($("#warm_tipw").is(":visible") == true) {
                    $("#local_tipw").hide();
                    $("#other_tipw").slideDown("slow");
                }
            }

            if (oElem.id == "local_path") {
                SetSearchFormTxt("local_path");
                if (uid == "" || uid == null || uid == undefined) {//未登录时才显示提示
                    $("#other_tipw").hide();
                    $("#local_tipw").slideDown("slow");
                }
                else if ($("#warm_tipw").is(":visible") == true) {
                    $("#other_tipw").hide();
                    $("#local_tipw").slideDown("slow");
                }
            }
            $(".select_option").hide();
        }
    });

    $(".serachTxt").focus(function () {
        //采集时间提示
        if (($(this).attr("id") == "colTimeTxt" && $("#select_w").text() == "其它通道(照相馆、快照亭)") || ($(this).attr("id") == "colTimeTxt" && uid != "" && uid != null && uid != undefined)) {
            $(".colformtip").css("top", $("#colTimeTxt").position().top - 85);
            $(".colformtip").css("left", $("#colTimeTxt").position().left - 7);
            $(".colformtip").show();
        }

        if ($(this).val() == "图像号" || $(this).val() == "订单号" || $(this).val() == "采集时间" || $(this).val() == "手机号或邮箱号")
            $(this).val("");
    });

    $(".serachTxt").blur(function () {
        if ($(this).val() == "" || $(this).val() == undefined || $(this).val() == null) {
            if ($(this).attr("id") == "searchNoTxt") {
                if ($("#select_w").text() == "本站查询" && (uid == "" || uid == null || uid == undefined)) {//本站查询未登录
                    $("#searchNoTxt").val("订单号");
                    return;
                }
                $("#searchNoTxt").val("图像号");
            }
            else if ($(this).attr("id") == "colTimeTxt") {
                if ($("#select_w").text() == "本站查询" && (uid == "" || uid == null || uid == undefined)) {//本站查询未登录
                    $("#colTimeTxt").val("手机号或邮箱号");
                    return;
                }
                $("#colTimeTxt").val("采集时间");
            }
        }
        $(".colformtip").hide(); //隐藏时间提示
    });

    $("#searchNoTxt").keydown(function (e) {
        if (e.which == 13) {
            SearchPic();
        }
    });

    $("#colTimeTxt").keydown(function (e) {
        if (e.which == 13) {
            SearchPic();
        }
    });

    $(".menu li").hover(
        function () {
            $(this).css("background-color", "#E8E8E8");
        },
        function () {
            $(this).css("background-color", "white");
        }
    );

    $(".menu li").click(function () {
        window.location = $(this).attr("url");
    });

    $("body").delegate("#two_s", "click", function () {
        if ($("#two_s").attr("checked") != "checked") {
            AddToTotal(-2);
            if ($("#three_s").attr("checked") != "checked") {
                $(".calspan").hide();
            }
        }
        else {
            AddToTotal(2);
            $(".calspan").show();
        }
    });

    $("body").delegate("#three_s", "click", function () {
        if ($("#three_s").attr("checked") != "checked") {
            $(".printtxt").val("");
            AddToTotal(-5);
            if ($("#two_s").attr("checked") != "checked") {
                $(".calspan").hide();
            }
        }
        else {
            $(".printtxt").val(1);
            AddToTotal(5);
            $(".calspan").show();
        }
    });

});

//如果窗体缩放，改变tip的位置
window.onresize = function () {
    $(".colformtip").css("top", $("#colTimeTxt").position().top - 85);
    $(".colformtip").css("left", $("#colTimeTxt").position().left - 7);

    $(".select_option").css("top", $(".select_path").offset().top + $(".select_path").height() + 2);
    $(".select_option").css("left", $(".select_path").offset().left);
}

function SetSearchFormTxt(n) {
    if (n == "other_path") {
        if ($("#select_w").text() == "其它通道(照相馆、快照亭)") {
            return;
        }
        $("#select_w").text("其它通道(照相馆、快照亭)");
        $("#searchNoTxt").val("图像号");
        $("#colTimeTxt").val("采集时间");
    }
    else {
        if ($("#select_w").text() == "本站查询") {
            return;
        }

        //$("#select_w").text("本站查询");
        if (uid == "" || uid == undefined || uid == null) {//未登录才显示
            $("#select_w").text("本站查询");
            $("#searchNoTxt").val("订单号");
            $("#colTimeTxt").val("手机号或邮箱号");
        }
        else {
            $("#select_w").text("旧版证照查询");
        }
    }
}

function SelectToggle() {
    $(".select_option").css("top", $(".select_path").offset().top + $(".select_path").height() + 2);
    $(".select_option").css("left", $(".select_path").offset().left);
    $(".select_option").toggle();
}

function SearchPic() {

    var info = "";
    if ($("#select_w").text() == "其它通道(照相馆、快照亭)") {//其它通道查询
        if (!OtherPathCheck()) { return; }
        info = "other#" + $("#searchNoTxt").val() + "#" + $("#colTimeTxt").val();
    }
    else if ($("#select_w").text() == "旧版证照查询" && (uid != "" && uid != null && uid != undefined)) {//登录本站查询
        if (!OtherPathCheck()) { return; }
        info = "local#" + $("#searchNoTxt").val() + "#" + $("#colTimeTxt").val();
    }
    else {//未登录本站查询        
        if (!LocalPathCheck()) { return; }
        OrderExistCheck("order", $("#searchNoTxt").val());
        if (isExist) {
            alert("该订单已在列表中");
            return;
        }
        info = "order#" + $("#searchNoTxt").val() + "#" + $("#colTimeTxt").val();
    }
    $.get("BackGroundWork.aspx", { "type": "TXCX", "info": info, "temp": Math.random() }, SearchResult);
}

function SearchResult(res) {

    if (res.substr(0, 1) == "1") {
        var temp_s_html = s_box_html;
        temp_s_html = temp_s_html.replace("&pid&", res.substr(2).split("#")[0]);
        temp_s_html = temp_s_html.replace("&certype&", res.substr(2).split("#")[1]);
        temp_s_html = temp_s_html.replace("&c_time&", res.substr(2).split("#")[2]);
        temp_s_html = temp_s_html.replace("&lastdate&", "至" + res.substr(2).split("#")[3]);
        temp_s_html = temp_s_html.replace("&picurl&", "ShowPhoto.aspx?rtype=search&pid=" + res.substr(2).split("#")[0] + "&temp=" + Math.random());

        $(".main").after(temp_s_html);

        if (res.substr(2).split("#")[4] == "local") {//显示添加订单按钮
            $(".topaybtn").css("display", "none");
            $(".addtoorderbtn").css("display", "inline-block");
            $("#two_s").attr("disabled", "disabled");
            $("#three_s").attr("disabled", "disabled");
        }
        else {
            $(".topaybtn").css("display", "inline-block"); //显示支付按钮
            $(".addtoorderbtn").css("display", "none");
        }

        $("#layout_w").css("width", "480px");
        $("#layout_w").css("top", $(window).scrollTop() + 120);
        $("#layout_w").css("left", ($(window).width() - $("#layout_w").width()) / 2);

        $("body").append(fadeDivStr);
        $("#fade").css("top", "0");
        $("#fade").css("left", "0");
        $("#fade").css("width", $("body").width());
        $("#fade").css("height", $("body").height());
        $("#fade").show();
        $("#layout_w").show();
    }
    else if (res.substr(0, 1) == "v") {
        var table_html = res.substr(2).split("@@")[1];
        var orderno = res.substr(2).split("@@")[0];

        var cookies_name = "o_list";
        OrderList = cookiesOP.read(cookies_name).split(",");
        if (OrderList.indexOf(orderno) == -1) {
            OrderList.push(orderno);
        }
        cookiesOP.set(cookies_name, OrderList, 365);
        window.location.href = "myorder.aspx";
    }
    else {
        if (res.substr(2).split("#")[0] == "该相片已在订单列表中") {
            var pid = res.substr(2).split("#")[1];
            alert("该相片已在订单列表中");

            $("body", window.parent.document).append("<form method='post' action='myorder.aspx' id='searchpidForm'><input type='hidden' name='searchpid' value='" + pid + "' /></form>");
            $("#searchpidForm", window.parent.document).submit();
        }
        else {
            alert(res.substr(2));
        }
    }
}

//查询订单列表是否存在订单
var isExist = false;
function OrderExistCheck(type, id) {
    isExist = false;
    if (type == "pid") {
        $("#tablebox table td:nth-child(3) p:nth-child(2)").each(function () {
            if ($(this).text().replace("图像号：", "") == id) {
                isExist = true;
                return false;
            }
        });
    }
    else if (type == "order") {
        $("#tablebox table td:nth-child(4)", window.parent.document).each(function () {
            //$("#tablebox table td:nth-child(4)").each(function () {
            if ($(this).text() == id) {//在列表中找到该订单号

                var num = $(this).parents(".page table").attr("id").replace("page", "");
                $(this).css("background-color", "rgb(56,216,120)");
                $(document).scrollTop($(this).position().top);

                if ($("#pageLinkOP #a" + num + " a", window.parent.document).attr("href") != undefined) {
                    eval("window.parent." + $("#pageLinkOP #a" + num + " a", window.parent.document).attr("href").replace("javascript:", ""));
                }

                $(".main", window.parent.document).show();
                $("#orderframe", window.parent.document).remove();

                isExist = true;
                return false;
            }
        });
    }
}

function HideSearchBox() {
    $("#layout_w").remove();
    $("#fade").remove();
}

function OtherPathCheck() {
    if ($("#searchNoTxt").val() == "图像号" || $("#searchNoTxt").val() == "") {
        alert("请输入图像号");
        document.getElementById("searchNoTxt").focus();
        return false;
    }

    if ($("#colTimeTxt").val() == "采集时间" || $("#colTimeTxt").val() == "") {
        alert("请输入采集时间");
        document.getElementById("colTimeTxt").focus();
        return false;
    }

    var regex = /^[a-zA-Z0-9]{15,18}$/;
    if (!regex.test($("#searchNoTxt").val())) {
        alert("请输入正确的图像号");
        document.getElementById("searchNoTxt").focus();
        return false;
    }

//    regex = /^([01][0-9]|2[0-3])([0-5][0-9]){2}$/;
//    if (!regex.test($("#colTimeTxt").val())) {
//        alert("请输入正确的采集时间"); //请按照标准格式（时+分+秒，如090513）输入采集时间");
//        document.getElementById("colTimeTxt").focus();
//        return false;
//    }
    return true;
}

function LocalPathCheck() {
    if ($("#searchNoTxt").val() == "订单号" || $("#searchNoTxt").val() == "") {
        alert("请输入订单号");
        document.getElementById("searchNoTxt").focus();
        return false;
    }

    if ($("#colTimeTxt").val() == "手机号或邮箱号" || $("#colTimeTxt").val() == "") {
        alert("请输入手机号或邮箱号");
        document.getElementById("colTimeTxt").focus();
        return false;
    }

    var regex = /^(DG|dg|Dg|dG)[0-9]{16}$/;
    if (!regex.test($("#searchNoTxt").val())) {
        alert("请输入正确的订单号");
        document.getElementById("searchNoTxt").focus();
        return false;
    }

    regex = /^1[0-9]{10}$/;
    var regex2 = /^[0-9\-._a-zA-Z]{1,}@[0-9\-._a-zA-Z]{1,}\.[0-9\-._a-zA-Z]{1,}$/;
    if (!regex.test($("#colTimeTxt").val()) && !regex2.test($("#colTimeTxt").val())) {
        alert("请输入正确的手机号或邮箱号");
        document.getElementById("colTimeTxt").focus();
        return false;
    }
    return true;
}

function AddNum() {
    if ($("#three_s").attr("checked") == "checked") {
        $(".printtxt").val($(".printtxt").val() * 1 + 1)
        AddToTotal(5);
    }
}

function ReduceNum() {
    if ($("#three_s").attr("checked") == "checked") {
        if ($(".printtxt").val() * 1 == 1) {
            return;
        }
        $(".printtxt").val($(".printtxt").val() * 1 - 1)
        AddToTotal(-5);
    }
}

function AddToTotal(num) {
    var curM = TurnNumber($("#t_money").text());
    $("#t_money").text(curM + num);
}

function TurnNumber(num) {
    if (num == "" || num == undefined || num == NaN || num == null) {
        return 0;
    }
    return Number(num);
}

function GoToPay() {
    if (TurnNumber($("#t_money").text()) == 0 || ($("#two_s").attr("checked") != "checked" && $("#three_s").attr("checked") != "checked")) {
        alert("请选择服务");
        return;
    }

    var pid = $("#pidSpan").text();

    $("#dealtype").val("0");
    if ($("#two_s").attr("checked")) {
        $("#dealtype").val("1");
    }

    var printNum = 0;
    if ($("#three_s").attr("checked")) {
        printNum = $(".printtxt").val();
    }

    var copidname = CONSTPICNAME;
    //copidname = GetCookiesName(copidname);
    if (PidList.indexOf(pid) == -1) {
        PidList.push(pid);
    }
    cookiesOP.set(copidname, PidList, null);

    var conumname = CONSTNUMNAME + pid;
    //conumname = GetCookiesName(conumname);
    cookiesOP.set(conumname, printNum, null);

    $("#searchform").submit();
}

//function GetCookiesName(n) {
//    if (uid != "" && uid != undefined && uid != null) {
//        n = uid + n;
//    }
//    return n;
//}

function AddToOrder() {
    var pid = $("#pidSpan").text();
    $.get("BackGroundWork.aspx", { "type": "ADDTOORDERLIST", "pid": pid, "temp": Math.random() }, AddResult);
}

function AddResult(res) {
    if (res.substr(0, 1) == "1") {
        window.location.href = "myorder.aspx";
    }
    else {
        alert(res.substr(2));
    }
}
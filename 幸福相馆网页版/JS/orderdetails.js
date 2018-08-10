$(function () {
    $("#now_local").text("订单详情");
    $(".rightbox div").eq(0).html("订单详情<span style='width:610px;display:inline-block'></span><a href='javascript:Back();'>[返回]</a>");
    $.get("BackGroundWork.aspx", { "type": "LOADORDERDETAIL", "orderno": orderno, "temp": Math.random() }, LoadResult);
});

function LoadResult(res) {
    if (res.substr(0, 1) == "1") {
        $("#content_r script").remove();
        $("#content_r style").remove();
        $("#loadtable").remove();
        $("#infoBox").show();

        var t_Fee = res.substr(2).split("@@")[0];
        var m_Fee = res.substr(2).split("@@")[1];
        var table_html = res.substr(2).split("@@")[2];
        $(".oinfobox").append(table_html);

        if (Number(t_Fee) <= 0) {

            //把相关费用设置为"-"
            $(".oinfobox table tr").not(".oinfobox table tr:eq(0)").each(function () {
                $(this).children().eq(1).text("-");
                $(this).children().eq(2).text("-");
                $(this).children().eq(3).text("-");
                $(this).children().eq(4).text("-");
            });

            $("#expSpan").parent().hide();
        }
        else {

            $("#totolFee").text(t_Fee);
            if (Number(m_Fee) < 0)
            { m_Fee = 0; }
            $("#expFee").text(m_Fee);
            if (Number(m_Fee) == 0) {
                $("#expSpan").hide();
            }
        }

        $("#orderframe", window.parent.document).height($("body").height());
        $(".pitd img").each(function () {
            $(this).attr("src", $(this).attr("url"));
        });
    }
    else {
        $("#content_r").html("<br/><br/><div style='text-align:center;'>" + res.substr(2) + "</div>");
    }
}

function Back() {
    $(".main", window.parent.document).show();
    $("#orderframe", window.parent.document).remove();
}

function iframeOrderSearch(orderno, table_html) {
}

function showhuizhi(src) {
    //window.open(src, "_blank", "huizhi", "height=570, width=770, top=" + (screen.height - 570) / 2 + ",left=" + (screen.width - 770) / 2 + ",toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no,z-look=yes");    
    var ran = Math.random();
    ran = ran.toString().substr(ran.toString().length - 3, 3);
    window.open(src, "huizhi" + ran, "height=590, width=770, top=" + (screen.height - 590) / 2 + ",left=" + (screen.width - 770) / 2 + ",toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no,z-look=yes,z-look=yes");
}

var CONSTPICNAME = "pidlist";
var PidList = new Array();

function GoToPrint(pid) {
    DelAllCookies(pid);

    var copidname = CONSTPICNAME;
    //copidname = GetCookiesName(copidname);
    if (PidList.indexOf(pid) == -1) {
        PidList.push(pid);
    }
    cookiesOP.set(copidname, PidList, null);

    $("#printform", window.parent.document).submit();
    //$("#printform").submit();
}

function DelAllCookies(pid) {
    //删除采集信息cookies
    var copidname = CONSTPICNAME;
    //copidname = GetCookiesName(copidname);
    cookiesOP.del(copidname);

    //删除该图像号冲印数量
    var conumname = "numlist" + pid;
    //conumname = GetCookiesName(conumname);
    cookiesOP.del(conumname);
}

function PayDealingFee(orderno, pid) {
    if (window.confirm("该相片需要支付2元处理费，\n才能进行打印回执、下载相片、下载模版等操作\n去支付？")) {
        $("#h_order_no", window.parent.document).val(orderno + "@" + pid);
        $("#topayform", window.parent.document).submit();
    }
}

function showPicTip(pid, obj) {
    var tipHtml = "<div id='tipPhotoBlock' style='border:2px solid #FF6000;position:absolute;background-color:white;'><p id='picload' style='margin:0;padding:0'>正在加载...</p><img src='' id='tipPic' alt='' class='tipPic' style='display:none;' onload='ShowImg();' /></div>";
    $("body").append(tipHtml);
    var picUrl = $(obj).attr("url");
    picUrl = picUrl + "&width=130&height=130";
    $("#tipPic").attr("src", picUrl);

    $("#tipPhotoBlock").css("top", $(obj).position().top - 20);
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
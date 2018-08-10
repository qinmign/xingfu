var CONSTPICNAME = "pidlist";
var CONSTNUMNAME = "numlist";
var PidList = new Array();
var pay_html = '<div id="layout_w"><div class="inner_w"><div class="head_t"><h2>温馨提示</h2><a class="closebtn" href="javascript:Close();"></a></div></div></div>';
var inner_html = '<div class="word_box" style="padding: 20px 0 20px 20px;"><p>尊敬的用户，感谢使用幸福相馆,您可以通过</p><p>邮箱:@email@，</p><p>密码:@pwd@</p><p>登录幸福相馆，下载电子相片，管理自己的证件照</p></div><div class="btn_box"><a href="javascript:Close();" class="payok_btn colorbtn">确定</a></div>';

$(function () {
    var copidname = CONSTPICNAME;
    cookiesOP.del(copidname);

    $("#page1 img").each(function () {
        $(this).attr("src", $(this).attr("url"));
    });
    //$.get("BackGroundWork.aspx", { "type": "ELECPHOTO", "orderno": orderno, "temp": Math.random() }, SendResult);

    if (registCode != "")
        ShowRegistTip();

    cookiesOP.del("registCode");
});

function ShowRegistTip() {
    inner_html = inner_html.replace("@email@", email);
    inner_html = inner_html.replace("@pwd@", registCode);

    $(".content").append(pay_html);
    $(".inner_w").append(inner_html);
    $("#layout_w").css("width", "465px");
    $("#layout_w").css("top", $(window).scrollTop() + 120);
    $("#layout_w").css("left", ($(window).width() - $("#layout_w").width()) / 2);
    $("#layout_w").addClass("pay_box");
    $("body").append(fadeDivStr);
    $("#fade").css("top", "0");
    $("#fade").css("left", "0");
    $("#fade").css("width", $("body").width());
    $("#fade").css("height", $("body").height());
    $("#fade").show();
    $("#layout_w").show();
}

function SendResult(res) {

}

function showhuizhi(src) {
    //window.open(src, "_blank", "huizhi", "height=570, width=770, top=" + (screen.height - 570) / 2 + ",left=" + (screen.width - 770) / 2 + ",toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no");
    var ran = Math.random();
    ran = ran.toString().substr(ran.toString().length - 3, 3);
    window.open(src, ran, "height=570, width=770, top=" + (screen.height - 570) / 2 + ",left=" + (screen.width - 770) / 2 + ",toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no,z-look=yes");
}

function GoToPrint(picID) {
    DelAllCookies(picID);
    var copidname = CONSTPICNAME;
    if (PidList.indexOf(picID) == -1) {
        PidList.push(picID);
    }
    cookiesOP.set(copidname, PidList, null);

    $("#printform").submit();
}

function DelAllCookies(pid) {
    //删除采集信息cookies
    var copidname = CONSTPICNAME;
    cookiesOP.del(copidname);

    //删除该图像号冲印数量
    var conumname = "numlist" + pid;
    cookiesOP.del(conumname);
}

function Close() {
    $("#layout_w").remove();
    $("#fade").remove();
}
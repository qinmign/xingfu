
/// <reference path="jquery-1.8.2.min.js" />


$(function () {
    var boxHtml = ""; // "<div id='pictureViewBG'></div>";
    boxHtml += "<div id='pictureView'><h3><em>预览</em></a><a class='closePictureView' href='javascript:void(0)' ></a></h3>";
    boxHtml += "<div id='pictureViewContent'><div id='pvcBox'><img id='pvcLoader' src='css/images/myphoto/loader.gif' /><div id='pvcPictureBox'><img src='' alt='图片' /></div></div></div>";

    $("body").append(boxHtml);

    $("#pictureView .closePictureView").click(function () {
        $("#pictureView").hide();
        //$(".main").css("height", "auto");
        $(".main").show();
    });

    $("#pvcPictureBox img").load(function () {
        if ($(this).width() > 900) {
            $(this).css("width", "900");
        }
        $("#pvcPictureBox").css("width", $(this).width());
        $("#pvcPictureBox").css("height", $(this).height());
        $("#pvcPictureBox").css("left", Math.floor((1000 - $("#pvcPictureBox").outerWidth()) / 2));
        $("#pvcLoader").hide();
    });
});

//显示照片
function showPicture(pid, code, tp) {

    $("#pvcPictureBox").css("width", "0");
    $("#pvcPictureBox").css("height", "0");
    $("#pvcLoader").show();

    if (tp == null || tp == "mb") {

        $("#pvcPictureBox img").attr("src", interfacePath + "showtemplate.aspx?vcode=" + code + "&pid=" + pid + "&width=900&height=564&sy=yes");
    }
    else {
        $("#pvcPictureBox img").attr("src", interfacePath + "huizhithumbnail.aspx?vcode=" + code + "&pid=" + pid + "&nopid=yes");
    }
}

//打开照片浏览界面
function showPictureView(pid, code, tp) {
    $("#pictureView").hide();

    $("#pictureView").css("height", Math.max(720, $(window).height()));
    $("#pictureView").css("width", "100%"); // Math.max($(window).width(),1000));

    $(".main").hide();
    $("#pictureView").css("top", 0);
    $("#pictureView").css("left", 0);
    $("#pictureView").show();
    //$(".main").css("height", "0");
    //$(".main").css("overflow", "hidden");

    showPicture(pid, code, tp);
}
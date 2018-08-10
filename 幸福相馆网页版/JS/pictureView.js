
/// <reference path="jquery-1.8.2.min.js" />


$(function () {
    var boxHtml = ""; // "<div id='pictureViewBG'></div>";
    boxHtml += "<div id='pictureView'><h3><em><a href='myphoto.aspx' target='_self'>证照库</a>&gt;&gt;原图备份</em><a class='uploadPicture' href='javascript:uploadPicture()' ></a><a class='closePictureView' href='javascript:void(0)' ></a></h3>";
    boxHtml += "<div id='pictureViewContent'><h4>1/10</h4><div id='pvcBox'><a class='prevPicture' href='javascript:prevPicture()'></a><img id='pvcLoader' src='css/images/myphoto/loader.gif' /><div id='pvcPictureBox'><img src='' alt='原图' /><a href='javascript:delPicture()'></a></div><a class='nextPicture' href='javascript:nextPicture()'></a></div></div>";

    $("body").append(boxHtml);

    $("#pictureView .closePictureView").click(function () {
        $("#pictureView").hide();
        $(".main").css("height", "auto");
    });

    $("#pvcPictureBox img").load(function () {

        if ($(this).width() > 900) {
            $(this).css("width", "900");
        }
        $("#pvcPictureBox").css("width", $(this).width());
        $("#pvcPictureBox").css("height", $(this).height());

        $("#pvcPictureBox").css("left", Math.floor((1000 - $("#pvcPictureBox").outerWidth()) / 2));

        //$("#pvcPictureBox").show();
        $("#pvcLoader").hide();


    });

    $("#pvcPictureBox").hover(function () {

        //top:0;
        //left:41px;

        //        if ($(this).children("img").width() > 100) {
        //            $(this).children("a").css("left", Math.floor((900 - $(this).children("img").width()) / 2) + 41);
        // $(this).children("a").css("top", Math.floor(($(this).innerHeight() - $(this).children("img").height()) / 2));
        $(this).children("a").show();
        // }
    },
    function () {
        $(this).children("a").hide();
    });
});

function uploadPicture() {
    //alert(showPictureCurrentPid);

    $.get("AjaxRes.aspx", { "type": "GENERATEPICTURECODE", "pid": showPictureCurrentPid, "temp": Math.random() }, GenerateCallBack);

    //    var uploadHTML = "<form id='uploadForm' method='post' action='choosecertificate.aspx'><input type='hidden' name='picture_id' value='" + showPictureCurrentPid + "' /></form>";
    //    $("body").append(uploadHTML);
    //    $("#uploadForm").submit();
}

function GenerateCallBack(res) {
    if (res.substr(0, 1) == "1") {
        window.location.href = "choosecertificate.aspx?picture_id=" + res.substr(2);
    }
}


//上一张照片
function prevPicture() {
    if (showPictureCurrentIndex > 0) {
        showPicture(showPicturePidList[showPictureCurrentIndex - 1]);
    }
}
//下一张照片
function nextPicture() {
    if (showPictureCurrentIndex < showPicturePidList.length - 1) {
        showPicture(showPicturePidList[showPictureCurrentIndex + 1]);
    }
}

var showPicturePidList;
var showPictureCurrentPid;
var showPictureCurrentIndex;
var delOnPictureShow = false;

//删除当前照片
function delPicture() {
    delOnPictureShow = true;
    delpic(showPictureCurrentPid)
}

//刷新当前是显示的照片
function refreshPictureShow() {

    if (showPicturePidList.length > 0) {

        if (showPictureCurrentIndex >= showPicturePidList.length) {
            showPictureCurrentIndex--;
        }

        showPicture(showPicturePidList[showPictureCurrentIndex]);
    }
}

//显示照片
function showPicture(pid) {

    showPictureCurrentPid = pid;
    var i = $.inArray(pid, showPicturePidList);
    showPictureCurrentIndex = i;
    var c = showPicturePidList.length;

    $("#pvcPictureBox").css("width", "0");
    $("#pvcPictureBox").css("height", "0");
    $("#pvcLoader").show();

    $("#pictureViewContent h4").text("" + (i + 1) + "/" + c + "");
    $("#pvcPictureBox img").attr("src", "photo.aspx?pid=" + pid + "&rtype=YTLL&temp=" + Math.random());
    //$("#pvcPictureBox a").hide();
}

//打开照片浏览界面
function showPictureView(pid) {
    $("#pictureView").hide();
    //    $("#pictureView").css("height", Math.max(800, Math.max($(window).height(), $("body").height())));
    //    $("#pictureView").css("width", Math.max($(window).width(), $("body").width()));


    $("#pictureView").css("height", Math.max(720, $(window).height()));
    $("#pictureView").css("width", "100%"); // Math.max($(window).width(),1000));

    $("#pictureView").css("top", 0);
    $("#pictureView").css("left", 0);
    $("#pictureView").show();
    $(".main").css("height", "0");
    $(".main").css("overflow", "hidden");
    showPicture(pid);
}
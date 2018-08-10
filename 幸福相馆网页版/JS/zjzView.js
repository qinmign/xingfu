
/// <reference path="jquery-1.8.2.min.js" />


$(function () {
    var boxHtml = ""; // "<div id='pictureViewBG'></div>";
    boxHtml += "<div id='pictureView'><h3><em><a href='myphoto.aspx' target='_self'>证照库</a>&gt;&gt;证件照</em><a class='printPicture' href='javascript:printPicture()' ></a><a class='closePictureView' href='javascript:void(0)' ></a></h3>";
    boxHtml += "<div id='pictureViewContent'><h4>1/10</h4><div id='pvcBox'><a class='prevPicture' href='javascript:prevPicture()'></a><img id='pvcLoader' src='css/images/myphoto/loader.gif' /><div id='pvcPictureBox'><img src='' alt='相片' /></div><a class='nextPicture' href='javascript:nextPicture()'></a></div><p></p></div>";

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

        if ($(this).children("img").width() > 100) {
            $(this).children("a").css("right", Math.floor(($(this).innerWidth() - $(this).children("img").width()) / 2));
            // $(this).children("a").css("top", Math.floor(($(this).innerHeight() - $(this).children("img").height()) / 2));
            $(this).children("a").show();
        }
    },
    function () {
        $(this).children("a").hide();
    });
});

//冲印相片
var cookiesName = "pidlist";
var numCookiesName = "numlist";
function printPicture() {
    //alert(showZjzPidOnlyList[showPictureCurrentIndex]);
    var pidList = new Array();
    var pid = showZjzPidOnlyList[showPictureCurrentIndex];

    cookiesOP.del(cookiesName);
    pidList.push(pid);
    DelPrintNumCookies(pid); //清除该图像号的打印数量
    cookiesOP.set(cookiesName, pidList, null);

    var printForm = "<form id='printForm' method='post' action='submitorder.aspx'><input type='hidden' name='paysign' value='only_print' /></form>";
    $("body").append(printForm);
    $("#printForm").submit();
}

function DelPrintNumCookies(pid) {
    var conumname = numCookiesName + pid;
    cookiesOP.del(conumname);
}


//上一张照片
function prevPicture() {
    if (showPictureCurrentIndex > 0) {
        showPicture(showPictureCurrentIndex - 1);
    }
}
//下一张照片
function nextPicture() {
    if (showPictureCurrentIndex < showZjzPidList.length - 1) {
        showPicture(showPictureCurrentIndex + 1);
    }
}

var showZjzZjlxList;
var showZjzPidList;
var showZjzPidOnlyList;
var showPictureCurrentPid;
var showPictureCurrentIndex;
var delOnPictureShow = false;


//显示照片
function showPicture(idx) {

    showPictureCurrentIndex = idx;
    var c = showZjzPidList.length;


    $("#pvcPictureBox").css("width", "0");
    $("#pvcPictureBox").css("height", "0");
    $("#pvcLoader").show();

    $("#pictureViewContent h4").text("" + (idx + 1) + "/" + c + "");
    $("#pvcPictureBox img").attr("src", showZjzPidList[idx]);
    $("#pictureViewContent p").text(showZjzZjlxList[idx]);
}

//打开照片浏览界面
function showZjzView(idx) {
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
    showPicture(idx);
}
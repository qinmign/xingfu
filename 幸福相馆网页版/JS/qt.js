$(function () {

    $("#img1").mousemove(function () {
        $("#img1").addClass("hover");
        $("#img2").addClass("hover");
    });

    $("#img2").mousemove(function () {
        $("#img1").addClass("hover");
        $("#img2").addClass("hover");
    });

    $("#img1").mouseout(function () {
        $("#img1").removeClass("hover");
        $("#img2").removeClass("hover");
    });

    $("#img2").mouseout(function () {
        $("#img1").removeClass("hover");
        $("#img2").removeClass("hover");
    });

    $("#img3").hover(
        function () {
            $("#img4").css("top", $("#img3").position().top - 150);
            $("#img4").css("left", $("#img3").position().left - 10);
            $("#img4").fadeIn(200);
        },
        function () {
            $("#img4").fadeOut(200);
        }
    );

    //ShowNotice();

});

window.onresize = function () {
    $("#img4").css("top", $("#img3").position().top - 150);
    $("#img4").css("left", $("#img3").position().left - 10);

    if ( $("#fade").length > 0 ) {
        $("#fade").width($("body").width());
        $("#fade").height($("body").height());
        $("#fade").css("top", $("body").position().top);
        $("#fade").css("left", $("body").position().left);
        $("#ad-div").center();
    }
}

//document.write("<script src='JS/cookies.js'><\/script>");
//function ShowNotice() {
//    var notice = cookiesOP.read("no-notice");

//    if (notice != "yes") {
//        ShowFaceDiv();
//        LoadAd();
//    }
//}

//var adHtml = "<style>#ad-btn{background:url(about:blank);}#ad-btn:hover{background:url(CSS/images/notice/pc_gg_pressed_01.png);}</style><div id='ad-div' style='display:block;width:753px;height:398px;z-index:99000;'><img src='CSS/images/notice/pc_gg.jpg' /><div id='no-notice' style='display:block;position:absolute;left:190px;top:355px;z-index:99001;'><input id='no-checkbox' type='checkbox' />&nbsp;不再提示</div><a id='ad-btn' style='width:158px;height:43px;display:block;position:absolute;left:286px;top:335px;z-index:99001;text-decoration:none;' href='javascript:void(0);'></a></div>";
//function LoadAd() {
//    $("body").prepend(adHtml);
//    $("#ad-div").center();

//    $(document).delegate("#ad-btn", "click", function () {
//        if ($("#no-checkbox").is(":checked")) {
//            cookiesOP.set("no-notice", "yes", 365);
//        }

//        HideFaceDiv();
//        $("#ad-div").remove();
//    });
//}

//function ShowFaceDiv() {
//    if ($("#fade").length > 0)
//        return;

//    $("body").append(fadeDivStr);
//    $("#fade").width($("body").width());
//    $("#fade").height($("body").height());
//    $("#fade").css("top", $("body").position().top);
//    $("#fade").css("left", $("body").position().left);
//    $("#fade").show();
//}

//function HideFaceDiv() {
//    $("#fade").remove();
//}
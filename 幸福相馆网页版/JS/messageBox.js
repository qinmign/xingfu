
/// <reference path="jquery-1.8.2.min.js" />





(function ($) {

    $.messageBox = function (innerHtml, title, callback, option) {

        var boxHtml = "<div id='messageBoxBG'></div>";
        boxHtml += "<div id='messageBox'><h3><em>提示框</em><a class='closeMsgBox' href='javascript:void(0)' >×</a></h3>";
        boxHtml += "<div id='messageBoxContent'></div>";
        boxHtml += "<div id='messageBoxBottom'> <a id='doSth' href='javascript:void(0)'>确定</a><a class='closeMsgBox' href='javascript:void(0)'>取消</a></div>";

        $("body").append(boxHtml);

        $("#messageBoxBG").css("width", Math.max($(window).width(), $("body").width()));
        $("#messageBoxBG").css("height", Math.max($(window).height(), $("body").height()));

        $("#messageBox").css("top", $(window).scrollTop() + ($(window).height() - $("#messageBox").height()) / 2);
        $("#messageBox").css("left", ($(window).width() - $("#messageBox").width()) / 2);

        $("#messageBox h3 em").text(title);

        if (innerHtml != null) {
            $("#messageBoxContent").html(innerHtml);
        }

        if (callback != null) {
            $("#doSth").click(function () {
                $("#messageBoxBG").remove();
                $("#messageBox").remove();
                callback(option);
            });
        }
        else {
            $("#doSth").hide();
            $("#messageBoxBottom .closeMsgBox").text("确定");
        }

        $("#messageBox .closeMsgBox").click(function () {
            $("#messageBoxBG").remove();
            $("#messageBox").remove();
        });
    }
})(jQuery);
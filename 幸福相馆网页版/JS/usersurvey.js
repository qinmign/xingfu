$(function () {

    $(".txtform").each(function () {
        if ($(this).attr("id") != "serviceTxt") {
            $(this).attr("disabled", "disabled");
        }
    });

    $(".channel").click(function () {
        if ($(this).attr("id") == "channelH") {
            $("#channelTxt").attr("disabled", false);
        }
        else {
            $("#channelTxt").val("");
            $("#channelTxt").attr("disabled", "disabled");
        }
    });

    $(".choosereason").click(function () {
        if ($(this).attr("id") == "crF" && $(this).attr("checked") == "checked") {
            $("#crTxt").attr("disabled", false);
        }
        else {
            $("#crTxt").val("");
            $("#crTxt").attr("disabled", "disabled");
        }
    });

    $(".satisfaction").click(function () {
        if ($(this).attr("id") == "satisfactionB") {
            $("#satisfactionTxt").attr("disabled", false);
        }
        else {
            $("#satisfactionTxt").val("");
            $("#satisfactionTxt").attr("disabled", "disabled");
        }
    });

    $(".serviceTime").click(function () {
        if ($(this).attr("id") == "serviceTimeB") {
            $("#serviceTimeTxt").attr("disabled", false);
        }
        else {
            $("#serviceTimeTxt").val("");
            $("#serviceTimeTxt").attr("disabled", "disabled");
        }
    });

    $(".improve").click(function () {
        if ($(this).attr("checked") == "checked") {
            $(this).next().next().attr("disabled", false);
            $(this).next().next().next().attr("disabled", false);
        }
        else {
            $(this).next().next().val("");
            $(this).next().next().attr("disabled", "disabled");
            $(this).next().next().next().val("");
            $(this).next().next().next().attr("disabled", "disabled");
        }
    });

});

function SubmitAnswer() {
    var answer = "";
    var channelTxt = "";
    var crTxt = "";
    var satisfactionTxt = "";
    var serviceTxt = "";
    var serviceTime = "";
    var problemList = new Array();
    var improveList = new Array();

    $(".channel").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer = $(this).attr("value");
            if ($(this).attr("id") == "channelH") {
                channelTxt = $("#channelTxt").val();
                if (channelTxt.length > 80) {
                    alert("第1道建议文字不能超过80个字符");
                    return;
                }
            }
        }

        if ($(this).attr("id") == "channelH") {
            answer += "#";
        }
    });

    $(".choosereason").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer += $(this).attr("value") + "$";
            if ($(this).attr("id") == "crF") {
                crTxt = $("#channelTxt").val();
                if (crTxt.length > 80) {
                    alert("第2道建议文字不能超过80个字符");
                    return;
                }
            }
        }

        if ($(this).attr("id") == "crF") {
            answer += "#";
        }
    });

    $(".satisfaction").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer += $(this).attr("value");
            satisfactionTxt = $("#satisfactionTxt").val();
            if (satisfactionTxt.length > 80) {
                alert("第3道建议文字不能超过80个字符");
                return;
            }
        }

        if ($(this).attr("id") == "satisfactionB") {
            answer += "#";
        }
    });

    $(".usertend").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer += $(this).attr("value");
        }

        if ($(this).attr("id") == "usertendB") {
            answer += "#";
        }
    });

    $(".phoneclient").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer += $(this).attr("value");
        }

        if ($(this).attr("id") == "phoneclientB") {
            answer += "#";
        }
    });

    $(".convenient").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer += $(this).attr("value");
        }

        if ($(this).attr("id") == "convenientB") {
            answer += "#";
        }
    });

    $(".serviceTime").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer += $(this).attr("value");
            serviceTime = $("#serviceTimeTxt").val();
            if (satisfactionTxt.length > 50) {
                alert("第7道建议文字不能超过50个字符");
                return;
            }
        }

        if ($(this).attr("id") == "serviceTimeB") {
            answer += "#";
        }
    });

    serviceTxt = $("#serviceTxt").val();
    if (serviceTxt.length > 80) {
        alert("第7道建议文字不能超过80个字符");
        return;
    }

    $(".improve").each(function () {
        if ($(this).attr("checked") == "checked") {
            answer += $(this).attr("value") + "$";
            if ($(this).attr("id") == "improveK") {
                if ($(this).next().next().val().length > 80) {
                    alert("第8道建议文字不能超过80个字符");
                    return;
                }
                improveList.push($(this).attr("value") + $(this).next().next().val());
            }
            else {
                if ($(this).next().next().val().length > 80 || $(this).attr("value") + $(this).next().next().next().val().length > 80) {
                    alert("第8道建议文字不能超过80个字符");
                    return;
                }
                improveList.push($(this).attr("value") + $(this).next().next().val() + "@@");
                problemList.push($(this).attr("value") + $(this).next().next().next().val() + "@@");
            }
        }
    });

    if ($("#SampleTxtK").text() != "") {
        improveList.push("K" + $("#SampleTxtK").text());
    }

    if (answer == "######" || answer == "" || answer == null || answer == undefined) {
        return;
    }

    $.get("BackGroundWork.aspx", { "type": "SUGGESTION", "answer": answer, "channelTxt": channelTxt, "crTxt": crTxt, "satisfactionTxt": satisfactionTxt, "serviceTime": serviceTime, "serviceTxt": serviceTxt, "problemList[]": problemList, "improveList[]": improveList, "temp": Math.random() }, InsertResult);

}

function InsertResult(res) {
    if (res.substr(0, 1) == "1") {
        alert("感谢您的宝贵建议");
        window.location.href = document.URL;
    }
    else {

    }
}
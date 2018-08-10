
var tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'];
$(function () {
    $("#tag1").mouseover(function () {
        onmouseover("tag1");
    });
    $("#tag2").mouseover(function () {
        onmouseover("tag2");
    });
    $("#tag3").mouseover(function () {
        onmouseover("tag3");
    });
    $("#tag4").mouseover(function () {
        onmouseover("tag4");
    });
    $("#tag5").mouseover(function () {
        onmouseover("tag5");
    });
    $("#tag6").mouseover(function () {
        onmouseover("tag6");
    });

    var tag = getParam("tag");
    if (tag != "" && istag(tag)) {
        onmouseover(tag);
    } else {
        onmouseover("tag1");
    }
    $("#submit").click(function () {
        var text = $("#suggestion").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        $.get("RespondRequest.aspx", { "type": "YJFK", "email": email, "phone": phone, "text": text, "tmp": Math.random() }, facebackCallback)
    })
});

function facebackCallback(result) {
    alert(result.substr(2));
}

function getParam(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function istag(tag) {
    var result = false;
    $.each(tags, function (key, value) {
        if (value == tag) {
            result = true;
            return false;
        }
    });
    return result;
}

function onmouseover(tag) {
    $.each(tags, function (key, value) {
        if (value == tag) {
            $("#" + value).css("background", "#0FA6ED");
            $("#" + value).css("color", "white");
            $("#" + value).css("width", "210px");
            $("#" + value + "content").css("display", "block");
            $("#arrow").css("margin-top", (10 + key * 40) + "px");
        } else {
            $("#" + value).css("background", "white");
            $("#" + value).css("color", "#555555");
            $("#" + value).css("width", "209px");            
            $("#" + value + "content").css("display", "none");
        }
    })
}
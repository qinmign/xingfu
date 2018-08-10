$(function () {
    $("#now_local").text("资金详情");
    $(".rightbox div").eq(0).text("资金详情");

    $.get("BackGroundWork.aspx", { "type": "GETFUNDETAIL", "temp": Math.random() }, GetResult);
});

function GetResult(res) {
    if (res.substring(0, 1) == "1") {
        $("#content_r").html(res.substr(2));
    }
    else {
        $("#content_r").html("<div style='text-align:center;margin-top:40px;'>" + res.substr(2) + "</div>");
    }
}
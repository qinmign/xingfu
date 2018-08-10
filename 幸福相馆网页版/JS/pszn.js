
var indexs = ["1", "2", "3", "4"];
$(function () {
    $("#detail1").click(function () {
        detail_click("1");
    });
    
    $("#detail2").click(function () {
        detail_click("2");
    });
    
    $("#detail3").click(function () {
        detail_click("3");
    });
    
    $("#detail4").click(function () {
        detail_click("4");
    });

    $("#lbl1").click(function () {
        detail_click("1");
    });

    $("#lbl2").click(function () {
        detail_click("2");
    });

    $("#lbl3").click(function () {
        detail_click("3");
    });

    $("#lbl4").click(function () {
        detail_click("4");
    });

    detail_click("1");
})

function detail_click(index) {
    $.each(indexs, function (key, values) {
        var icon = "#icon" + values;
        var content = "#content" + values;
        var lbl = "#lbl" + values;
        var b = "#b" + values;
        if (index == values) {
            if ($(content).css("display") != "block") {
                $(icon).text("▼");
                $(content).css("display", "block");
                $(lbl).css("color", "#164f6b");                
            } else {
                $(icon).text("▲");
                $(content).css("display", "none");
                $(lbl).css("color", "#ffffff");
            }
        } else {
            $(icon).text("▲");
            $(content).css("display", "none");
            $(lbl).css("color", "#ffffff");
        }
    })
}
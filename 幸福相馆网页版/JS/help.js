var items = ["1", "2", "3", "4"];
var links = {
    "10": "10.html",
    "11": "11.html",
    "12": "12.html",
    "13": "13.html",
    "14": "14.html",

    "20": "20.html",
    "21": "21.html",
    "22": "22.html",
    "23": "23.html",
    "24": "24.html",
    "25": "25.html",
    "26": "26.html",

    "30": "30.html",
    "31": "31.html",

    "40": "40.html"
};

var labels = ["label1", "label2", "label3", "label4"];

$(function () {
    $("#item1").click(function (e) {
        itemonclick(1);
    });
    $("#item2").click(function () {
        itemonclick(2);
    });
    $("#item3").click(function () {
        itemonclick(3);
    });
    $("#item4").click(function () {
        itemonclick(4);
    });

    $("#item_name").click(expanditem);

    $("#expand_all").click(expandall);

    itemonclick(1);
    loaddetail(10, 1);

    var cysm = getRequest("cysm");
    if (cysm == "yes") {
        loaddetail(14, 1);
    }

})

function expanditem(){
    var name = $("#item_name").text();    
    $.each(labels, function (key, values) {        
        if ($("#"+values).text() == name) {
            itemonclick(key + 1);
        }
    })
}

var hasexpandall = false;
function expandall() {
    $.each(labels, function (key, values) {
        var index = key + 1;
        var listkey = "#list" + index;
        var itemkey = "#item" + index;
        var labelkey = "#label" + index;
        if (hasexpandall == true) {
            $(listkey).css("display", "none");
            $(labelkey).removeClass("unexpand-icon");            
        } else {
            $(listkey).css("display", "block");
            $(labelkey).addClass("unexpand-icon");
        }
    })
    hasexpandall = !hasexpandall;    
}



function itemonclick(index) {
    $.each(items, function (key, value) {
        var listkey = "#list" + value;
        var itemkey = "#item" + value;
        var labelkey = "#label" + value;
        if (index == value) {
            if ($(listkey).css("display") != "block") {
                $(listkey).css("display", "block");
                $(labelkey).addClass("unexpand-icon");
            } 
            else {
                $(listkey).css("display", "none");
                $(labelkey).removeClass("unexpand-icon");
            }
        }
    })
}

function loaddetail(id,index) {
    for (var i in links) {
        var aid = "#a" + i;        
        if (id == i) {
            var url = links[id];            
            loaddetailbyurl(url,aid,index)
        } else {
            $(aid).removeAttr("style");
            $(aid).addClass("detail-link");
        }
    }
}

function loaddetailbyurl(url, aid, index) {
    $(aid).css("color", "#0ea7eb");
    $("#item_name").text($("#label" + index).text());
    $("#detail_name2").text($(aid).text());
    $("#detail_name").text(" > " + $(aid).text());
    var url = "bzzx/" + url;
    $("#detail").load(url);
}


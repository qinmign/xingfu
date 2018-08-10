$(document).ready(function () {
    $("#printfield").height(50);
    $("#printfield").html($("#printfield").html() + "<p>如果您的回执无法正常显示条形码，请下载<a style='background:none;width:inherit;color:blue;text-decoration:underline;' href='http://bzztc.gdbnet.cn/download/V100001_.ttf'>条码字体</a>到系统的字体文件夹Font中。</p>");
    //<!--<a style='background:none;width:inherit;color:blue;text-decoration:underline;position:relative;left:100px;' href='javascript:void(0);' id='warmtip'>回执打印有问题？</a>-->

    $("body").append("<div id='tipbox' style='background:url(../css/images/cermanage/Message.gif) repeat scroll 0 0 transparent;color:White;display:none;font-size:12px;height:81px;line-height:18px;padding:2px 5px;position:absolute;width:224px;'>温馨提示:如回执打印不完整，请尝试在浏览器的打印页面设置中,调整页边距参数为：左(5毫米),右(5毫米),上(5毫米),下(7.24毫米),再进行操作。</div>");

    $("#printfield a:eq(0)").mouseover(function () {
        $("#tipbox").css("top", $("#printfield a:eq(0)").position().top - $("#tipbox").height() - 10);
        $("#tipbox").css("left", $("#printfield a:eq(0)").position().left - 33);
        $("#tipbox").show();
    });

    $("#printfield a:eq(0)").mouseout(function () {
        $("#tipbox").hide();
    });

    addObject();
    getSystemFonts();
});

window.onresize = function () {
    $("#tipbox").css("top", $("#printfield a:eq(0)").position().top - $("#tipbox").height() - 10);
    $("#tipbox").css("left", $("#printfield a:eq(0)").position().left - 33);
}

function printhz() {
    document.getElementById('tipbox').style.display = 'none';
    document.getElementById('printfield').style.display = 'none';
    window.print();
    document.getElementById('printfield').style.display = 'block';
}

function addObject() {
    $("#main").html('<OBJECT id="dlgHelper" CLASSID="clsid:3050f819-98b5-11cf-bb82-00aa00bdce0b" WIDTH="0px" HEIGHT="0px"></OBJECT>' + $("#main").html());
    $("#dlgHelper").css("display", "none");
}


function getSystemFonts() {
    var postparam = getRequest("phoneprint");
    if (postparam != undefined && postparam != "") {//判断是否手机打印
        $("#printfield").hide();
        return;
    }
    var fonts = document.getElementById("dlgHelper").fonts;
    for (i = 1; i <= fonts.count; i++) {
        if (fonts(i).toString() == "C39HrP24DhTt")
            return;
    }

    //    if (window.confirm("您的电脑还未安装条码字体,\n请点击确定按钮下载条码字体到系统Font字体文件夹中")) {
    //        window.location = "http://bzztc.gdbnet.cn/download/V100001_.ttf";
    //    }
}

function getRequest(name) {
    var parstr = window.location.search.substr(1);
    var arpar = parstr.split("&");
    var i;

    for (i = 0; i < arpar.length; i++) {
        if (arpar[i].length > name.length && arpar[i].toLowerCase().substr(0, name.length + 1) == name.toLowerCase() + "=")
            return arpar[i].substr(name.length + 1);
    }
    return "";
}
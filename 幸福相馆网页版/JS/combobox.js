var comboStr = "<div class='combodiv' onclick=''><input autocomplete='off' type='text' readonly='readonly' value='' /></div>"
+ "<div class='options'><ul></ul></div>";

var xmlFilePath = "";
var jsonFilePath = "";
var comboList = new Array();

window.document.onclick = removeAllClass;

//divName:要创建Combobox的节点；comBoName:Combobox名称；comWidth:Combobox宽；opWidth:Option宽
function SetComboBox(divName, comBoName, comWidth, opWidth) {
    var comObject = document.getElementById(divName);
    comObject.innerHTML = comboStr;
    comObject.childNodes[0].setAttribute("id", comBoName + "Combo");
    comObject.childNodes[0].onclick = function () { changeComboStyle(comBoName + "Combo", comBoName + "OP"); };
    comObject.childNodes[0].onmouseover = function () { mouseMouseAction(comBoName + "Combo"); };
    comObject.childNodes[0].onmouseout = function () { mouseMouseAction(comBoName + "Combo"); };
    comObject.childNodes[0].style.width = comWidth + "px";
    comObject.childNodes[0].childNodes[0].setAttribute("id", comBoName + "Txt");
    comObject.childNodes[0].childNodes[0].style.width = comWidth + "px";
    comObject.childNodes[1].setAttribute("id", comBoName + "OP");
    comObject.childNodes[1].style.width = opWidth + "px";
    comboList.push(comBoName);
}

function changeComboStyle(comboname, optionname) {
    var cObj = document.getElementById(comboname);
    var oObj = document.getElementById(optionname);
    if (hasClass(cObj, "comboAct")) {
        removeClass(cObj, "comboAct");
        oObj.style.display = "none";
    }
    else {
        addClass(cObj, "comboAct");
        oObj.style.display = "block";
    }
}

function mouseMouseAction(comboname) {
    var cObj = document.getElementById(comboname);
    if (hasClass(cObj, "comboHover")) {
        removeClass(cObj, "comboHover");
    }
    else {
        addClass(cObj, "comboHover");
    }
}

function removeAllClass(oEvent) {

    var oEvent = oEvent ? oEvent : window.event;
    var oElem = oEvent.srcElement || oEvent.target; // 兼容Chrome,FF等浏览器

    for (var i = 0; i < comboList.length; i++) {
        var comboObj = document.getElementById(comboList[i] + "Combo");
        var TxtObj = document.getElementById(comboList[i] + "Txt");
        var optionObj = document.getElementById(comboList[i] + "OP");
        if (oElem != comboObj && oElem != TxtObj) {
            if (hasClass(comboObj, "comboAct")) {
                removeClass(comboObj, "comboAct");
                optionObj.style.display = "none";
            }
        }
    }
}

// 说明：添加、移除、检测 className
function hasClass(element, className) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    return element.className.match(reg);
}

function addClass(element, className) {
    if (!this.hasClass(element, className)) {
        element.className += " " + className;
    }
}

function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}

//绑定鼠标划过、划出、点击事件
function bindLiEvent(opObj, arv) {
    var li_list = opObj.childNodes[0].getElementsByTagName("li");
    for (var i = 0; i < li_list.length; i++) {
        li_list[i].onmousemove = function () { liMouseOver(this); };
        li_list[i].onmouseout = function () { liMouseOut(this) };
        li_list[i].onclick = function () { liOnClick(this, arv); };
    }
}

function liMouseOver(obj) {
    addClass(obj, "liover");
}

function liMouseOut(obj) {
    removeClass(obj, "liover");
}

function liOnClick(obj, arv) {
    //    var comBoName = obj.parentNode.parentNode.id.replace("OP", "");
    //    document.getElementById(comBoName + "Txt").value = obj.innerHTML;
    //    var provinceTxt = document.getElementById("provinceTxt").value;
    //    if (arv != null) {//arv不为空时执行联动事件
    //        if (arv[0] == "fillform" || arv[0] == "fillform2") {//提交订单页面事件方法,个人信息页面
    //            LoadAreaData(obj.innerHTML, arv[1]);
    //            if (arv[0] == "fillform") { ExpressDisplay(true); }
    //            return;
    //        }
    //        ComboBoxChange(obj.innerHTML, comBoName, arv); //联动(值，名称，combobox参数)
    //    }

    var comBoName = obj.parentNode.parentNode.id.replace("OP", "");
    document.getElementById(comBoName + "Txt").value = obj.innerHTML;

    if (arv != null) {//arv不为空时执行联动事件
        if (arv[0] == "fillform" || arv[0] == "fillform2") {//去付款页面,收件地址页面事件方法
            LoadAreaData(obj.innerHTML, arv[1]);
            return;
        }

        $("#cerinfotd").hide(); //隐藏办证人信息
        ComboBoxChange(obj.innerHTML, comBoName, arv); //联动(值，名称，combobox参数)
        var provinceTxt = document.getElementById("provinceTxt").value;

        if (comBoName == "cerCategory" || provinceTxt == "云南省") {//证件选择页面点击证件类型选择事件
            ComboboxShow(obj.innerHTML);
        }
        else if (document.getElementById("cerCategoryTxt").value == "出入境证件") {//当证件类型为出入境时，从云南省到其它省份的Combobox变动
            ComboboxShow(null);
        }
    }
}
function checkID(sfzh) {
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " }

    function cidInfo(sId) {
        var iSum = 0
        var info = ""
        if (!/^\d{17}(\d|x|X)$/i.test(sId)) return "身份证格式不正确";
        sId = sId.replace(/(x|X)$/i, "a");
        if (aCity[parseInt(sId.substr(0, 2))] == null) return "非法的地区代码";
        sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "生日格式错误";
        for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
        if (iSum % 11 != 1) return "校验码错误";
        return true;
    }

    function changeIdLength(num15) {
        //将15位身份证转成18位
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0, i;
        num18 = num15.substr(0, 6) + '19' + num15.substr(6, num15.length - 6);
        for (i = 0; i < 17; i++) {
            nTemp += num18.substr(i, 1) * arrInt[i];
        }
        num18 += arrCh[nTemp % 11];
        return num18;
    }
    if (sfzh.length != 15 && sfzh.length != 18) {
        return "身份证号应为15或18位长";
    }

    var result = cidInfo(sfzh);
    return result;
}

function checkHKID(HKsfzh) {
    function getNum(c) {
        return c.toUpperCase().charCodeAt(0) - 55;
    }

    var regex = /^[a-zA-Z]{1,2}\d{6}\([0-9a-zAZ-Z]\)$/;

    if (regex.test(HKsfzh)) {
        var firstValue;
        if (HKsfzh.length == 10) {
            firstValue = 58;
            HKsfzh = " " + HKsfzh;
        }
        else {
            firstValue = getNum(HKsfzh.substr(0, 1));
        }

        var sum = 9 * firstValue + 8 * getNum(HKsfzh.substr(1, 1)) + 7 * parseInt(HKsfzh.substr(2, 1)) + 6 * parseInt(HKsfzh.substr(3, 1)) + 5 * parseInt(HKsfzh.substr(4, 1)) + 4 * parseInt(HKsfzh.substr(5, 1)) + 3 * parseInt(HKsfzh.substr(6, 1)) + 2 * parseInt(HKsfzh.substr(7, 1));

        var checkdigit = 11 - sum % 11;
        if (checkdigit == 10)
            checkdigit = "A";
        if (checkdigit == 11)
            checkdigit = "0";

        if (checkdigit != HKsfzh.substr(9, 1)) {
            return "校验码错误";
        }
        return true;
    }
    return "身份证格式错误";
}
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="printhuizhi.aspx.cs" Inherits="XF_Web_Concise.printhuizhi" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>我的幸福相馆 - 回执打印</title>
    <script src="JS/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var pcodeStr = "<%=pcodeStr %>";

//            var postparam = getRequest("phoneprint");
//            if (postparam != undefined && postparam != "") {//判断是否手机打印
//                pcodeStr += "&phoneprint=" + postparam;
//            }

            window.location.href = "huizhi.aspx?" + pcodeStr;
        });

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
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    </div>
    </form>
</body>
</html>

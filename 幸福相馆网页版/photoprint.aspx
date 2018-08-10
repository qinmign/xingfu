<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="photoprint.aspx.cs" Inherits="XF_Web_Concise.photoprint" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="JS/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script src="JS/main.js" type="text/javascript"></script>
    <script type="text/javascript">

        var pid = "<%=pid %>";
        var orderno = "<%=orderno %>";
        var uid = "<%=uid %>";        

        $(function () {
            var PidList = new Array();
            DelAllCookies(pid);

            var copidname = "pidlist";
            //copidname = GetCookiesName(copidname);
            if (PidList.indexOf(pid) == -1) {
                PidList.push(pid);
            }
            cookiesOP.set(copidname, PidList, null);

            $("#printform").submit();

        });

        function DelAllCookies(pid) {
            //删除采集信息cookies
            var copidname = "pidlist";
            //copidname = GetCookiesName(copidname);
            cookiesOP.del(copidname);

            //删除该图像号冲印数量
            var conumname = "numlist" + pid;
            //conumname = GetCookiesName(conumname);
            cookiesOP.del(conumname);
        }

//        function GetCookiesName(n) {
//            if (uid != "" && uid != undefined && uid != null) {
//                n = uid + n;
//            }
//            return n;
//        }

    </script>
</head>
<body>
    <form id="printform" method="post" action="submitorder.aspx">
    <input type="hidden" name="paysign" value="only_print" />
    </form>
</body>
</html>

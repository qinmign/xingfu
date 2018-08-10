<%@ Page Title="" Language="C#" MasterPageFile="~/XF.master" AutoEventWireup="true"
    CodeBehind="myzjz.aspx.cs" Inherits="XF_Web_Concise.myzjz" %>

<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
    我的幸福相馆 - 证照库
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/myzjz.css" rel="stylesheet" type="text/css" />
    <link href="CSS/messageBox.css" rel="stylesheet" type="text/css" />
    <link href="CSS/zjzView.css" rel="stylesheet" type="text/css" />
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script src="JS/zjzView.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var comPath = "<%=comPath %>";

            showZjzPidList = new Array();
            showZjzPidOnlyList = new Array();
            showZjzZjlxList = new Array();

            if ($("#pic_box div").size() <= 0) {
                $("#nophoto").css("display", "block");
            }

            if ($("body").height() < $(window).height()) {
                $("#pic_box").css("margin-bottom", $(window).height() - $("body").height());
            }


            $("#pic_box div").each(function () {

                var pid = $(this).attr("pid");
                var time = $(this).attr("time");
                var idx = 0;
                var zjlx = $(this).attr("zjlx");
                var code = $(this).attr("code");
                idx = showZjzPidList.length;


                // $(this).parent("span").append("<a href=\"javascript:delpic('" + pid + "')\"/>");
                $(this).append("<img  src='photo.aspx?rtype=ZJZXP&pid=" + pid + "' />");
                showZjzPidList.push("photo.aspx?rtype=ZJZXPDT&pid=" + pid);
                showZjzPidOnlyList.push(pid);
                showZjzZjlxList.push(zjlx + "　" + pid);

                $(this).append("<img  src='" + comPath + "showtemplate.aspx?vcode=" + code + "&pid=" + pid + "&width=160&height=100' />");
                showZjzPidList.push("" + comPath + "showtemplate.aspx?vcode=" + code + "&pid=" + pid + "&width=900&height=564");
                showZjzPidOnlyList.push(pid);
                showZjzZjlxList.push(zjlx + "　" + pid);

                if (pid.substr(0, 2) != "ZH") {
                    $(this).append("<img  src='" + comPath + "huizhithumbnail.aspx?vcode=" + code + "&pid=" + pid + "&width=160&height=100' />");
                    showZjzPidList.push("" + comPath + "huizhithumbnail.aspx?vcode=" + code + "&pid=" + pid + "");
                    showZjzPidOnlyList.push(pid);
                    showZjzZjlxList.push(zjlx + "　" + pid);

                }
                $(this).append("<p>" + pid + "　" + time + " </p>");

                $(this).click(function () {
                    showZjzView(idx);
                });


            });


        });

    </script>
    <script src="JS/messageBox.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <h1>
        <em><a href="myphoto.aspx" target="_self"></a></em>证照库 <span><a href="myphoto.aspx"
            target="_self">[ 返回 ]</a></span></h1>
    <div id="pic_box">
        <span id="nophoto">相册内还没有相片，赶快去<a href="choosecertificate.aspx" target="_self">上传相片</a>吧！</span>
        <% =pic_list %>
        <em style="clear: both; display: block;"></em>
    </div>
</asp:Content>

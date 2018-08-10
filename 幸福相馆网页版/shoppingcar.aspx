<%@ Page Title="购物车" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="shoppingcar.aspx.cs" Inherits="XF_Web_Concise.shoppingcar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 购物车
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/shoppingcar.css" rel="stylesheet" type="text/css" />
    <link href="CSS/messageBox.css" rel="stylesheet" type="text/css" />
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script src="JS/shoppingcar.js" type="text/javascript"></script>
    <script src="JS/messageBox.js" type="text/javascript"></script>
    <script src="JS/gwcView.js" type="text/javascript"></script>
    <link href="CSS/gwcView.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript">
        var printFee=<% =print_unint_price.ToString("0.00") %>;
        var interfacePath="<%=interfacePath %>";

        $(function () {
            $(".nav1").remove();
            $("#shoppingstep").attr("src", "CSS/images/shoppingcar/shop_steps_01.png");
            $(".nav2").show();
        });
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">

    <div class="content">

<%--        <div id="headbox">
            <div style="width:260px;margin-left:40px;"><img src="CSS/images/shoppingcar/shop_01.png" /><span style="font-size:26px;">我的购物车</span></div>
            <div style="width:660px;"><img style="margin-top:10px;" src="CSS/images/shoppingcar/shop_steps_01.png" /></div>
        </div>--%>
        <br />
        <br />
        <div id="emptybox" style="display:<%=emptyBoxVisible%>">
            <table><tr><td><img src="CSS/images/shoppingcar/shop_02.png" /></td><td><p>您的购物车还是空的，</p><p>快去<a href="choosecertificate.aspx">上传相片</a>吧！</p></td></tr></table>
        </div>

        <div id="infobox" style="display:<%=infoBoxVisible%>">
            <%=tableHTML %>
            <div id="tableFooter">
            
            <label for="checkall"><input type="checkbox" onclick="ChooseAll()" id="checkall" /> 全选</label>　　<a href="javascript:DelSomePic();">批量删除</a>
            </div>
            <p id="mmm">
            技术服务费：<em>&yen;0.00</em><br />
            冲印服务费：<em>&yen;0.00</em>
            </p>

            <div id="nnn">
            合计（不含运费）：<em>&yen;0.00</em><br />
            <a href="javascript:GoToPay()">去结算&gt;</a>
            </div>
        </div>

    </div>

</asp:Content>

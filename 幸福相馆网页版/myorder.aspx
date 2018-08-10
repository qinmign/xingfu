<%@ Page Title="" Language="C#" MasterPageFile="~/Order.master" AutoEventWireup="true" CodeBehind="myorder.aspx.cs" Inherits="XF_Web_Concise.myorder" %>
<asp:Content ID="Content1" ContentPlaceHolderID="oTitle" runat="server">
我的幸福相馆 - 我的订单
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="oHead" runat="server">
    <link href="CSS/myorder.css" rel="stylesheet" type="text/css" />
    <link href="CSS/tablepage.css" rel="stylesheet" type="text/css" />
    <script src="JS/myorder.js" type="text/javascript"></script>
    <script src="JS/tablepage.js" type="text/javascript"></script>
    <script src="JS/pay.js?v=0.2" type="text/javascript"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
        var urlbase = "<%=urlbase %>";
        var searchPid = "<%=searchPid %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="oBody" runat="server">
    <div id="content_r">
        <%=loadingStr + "432px;}</style>');</script>"%>
    </div>
</asp:Content>

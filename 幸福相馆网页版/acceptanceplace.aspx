<%@ Page Title="" Language="C#" MasterPageFile="~/Order.master" AutoEventWireup="true" CodeBehind="acceptanceplace.aspx.cs" Inherits="XF_Web_Concise.acceptanceplace" %>
<asp:Content ID="Content1" ContentPlaceHolderID="oTitle" runat="server">
我的幸福相馆 - 收件地址
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="oHead" runat="server">
    <link href="CSS/acceptanceplace.css" rel="stylesheet" type="text/css" />
    <link href="CSS/combobox.css" rel="stylesheet" type="text/css" />
    <script src="JS/acceptanceplace.js" type="text/javascript"></script>
    <script src="JS/combobox.js" type="text/javascript"></script>
    <script src="JS/exparea.js" type="text/javascript"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="oBody" runat="server">
    <div id="content_r">       

        <%=loadingStr + "320px;}</style>');</script>"%>

        <div class="fillbox">
            <div class="caption">新增地址</div>
            <table>
                <tr><td>收&nbsp;件&nbsp;人:&nbsp;&nbsp;</td><td colspan="2"><input type="text" class="fillform" id="receiver"/>&nbsp;&nbsp;<span class="tipSpan" id="receiverTip"></span></td></tr>
                <tr><td>省&nbsp;&nbsp;&nbsp;&nbsp;市:&nbsp;&nbsp;</td><td><div id="provinceDiv" style="margin-right:8px;"></div><div id="cityDiv"></div></td></tr>
                <tr><td>地区街道:&nbsp;&nbsp;</td><td colspan="2"><input type="text" class="fillform" style="width:450px;" id="address" />&nbsp;&nbsp;<span class="tipSpan" id="addressTip"></span></td></tr>
                <tr><td>邮&nbsp;&nbsp;&nbsp;&nbsp;编:&nbsp;&nbsp;</td><td colspan="2"><input type="text" class="fillform" id="postcode"/>&nbsp;&nbsp;<span class="tipSpan" id="postcodeTip"></span></td></tr>
                <tr><td>手机号码:&nbsp;&nbsp;</td><td colspan="2"><input type="text" class="fillform" id="phone"/>&nbsp;&nbsp;<span class="tipSpan" id="phoneTip"></span></td></tr>
                <tr><td>电子邮件:&nbsp;&nbsp;</td><td colspan="2"><input type="text" class="fillform" id="email"/>&nbsp;&nbsp;<span class="gray_w tipSpan">用于查询订单及付款成功后，接收电子相片和回执</span>&nbsp;&nbsp;<span class="tipSpan" id="emailTip"></span></td></tr>
                <tr id="lasttr"><td></td><td colspan="2"><a href="javascript:SaveInfo();" class="colorbtn savebtn">保存</a><div><input type="checkbox" id="defcheck" checked="checked" /><label for="defcheck">设为默认地址</label></div></td></tr>
            </table>
        </div>
        <input type="hidden" id="savetype" value="01" />
        <input type="hidden" id="modify_id" value="" />
    </div>
</asp:Content>
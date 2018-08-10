<%@ Page Title="" Language="C#" MasterPageFile="~/Order.master" AutoEventWireup="true" CodeBehind="personalinfo.aspx.cs" Inherits="XF_Web_Concise.personalinfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="oTitle" runat="server">
    我的幸福相馆 - 个人信息
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="oHead" runat="server">
    <link href="CSS/personalinfo.css" rel="stylesheet" type="text/css" />
    <link href="CSS/combobox.css" rel="stylesheet" type="text/css" />
    <script src="JS/personalinfo.js" type="text/javascript"></script>
    <script src="JS/combobox.js" type="text/javascript"></script>
    <script src="JS/area.js" type="text/javascript"></script>
    <script src="JS/date/WdatePicker.js" type="text/javascript"></script>

    <script type="text/javascript">
        var cur_pro = "<%=province %>";
        var cur_city = "<%=city %>";
        var uid = "<%=uid %>";
        var username = "<%=un %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="oBody" runat="server">
    <div id="content_r">
        <table>
            <tr><td>用&nbsp;户&nbsp;名:&nbsp;&nbsp;</td><td colspan="3"><input type="text" class="fillform" id="username" value="<%=un %>" ovalue="<%=un %>"/>&nbsp;&nbsp;<span class="msgtip" id="unTip" style="display:none;">用户名由英文字母，数字或汉字组成</span></td></tr>
            <tr><td>真实姓名:&nbsp;&nbsp;</td><td colspan="3"><input type="text" class="fillform" id="realname" value="<%=realname %>" />&nbsp;&nbsp;<span class="msgtip" id="rnTip"></span></td></tr>
            <tr><td>性&nbsp;&nbsp;&nbsp;&nbsp;别:&nbsp;&nbsp;</td><td colspan="3"><a href="javascript:void(0);" class="sex_radio" value="1"></a>男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="sex_radio" value="2"></a>女</td></tr>
            <tr><td>出生年月:&nbsp;&nbsp;</td><td colspan="3"><input type="text" class="fillform" id="birthday" onclick="WdatePicker();" value="<%=birthday %>" /></td></tr>
            <tr><td>所&nbsp;在&nbsp;地:&nbsp;&nbsp;</td><td style="width:100px;"><div id="provinceDiv"></div></td><td style="width:120px;"><div id="cityDiv"></div></td><td><input type="text" class="fillform" style="width:320px;" id="address" value="<%=address %>"/>&nbsp;&nbsp;<span class="msgtip" id="adTip"></span></td></tr>
            <tr><td>手&nbsp;&nbsp;&nbsp;&nbsp;机:&nbsp;&nbsp;</td><td colspan="3"><input type="text" class="fillform" id="phone" value="<%=phone %>" disabled="disabled"/>&nbsp;&nbsp;<span class="msgtip" id="phoneTip"></span></td></tr>
            <tr><td>邮&nbsp;&nbsp;&nbsp;&nbsp;箱:&nbsp;&nbsp;</td><td colspan="3"><input type="text" class="fillform" id="email" value="<%=email %>" disabled="disabled" />&nbsp;&nbsp;<span class="msgtip" id="emailTip"></span></td></tr>
            <tr><td>账户余额:&nbsp;&nbsp;</td><td colspan="3"><span class="red_w" id="feespan"><%=fee%></span><a href="recharge.aspx" class="colorbtn rechargebtn">充值</a></td></tr>
        </table>
        <a href="javascript:SaveInfo();" class="colorbtn savebtn">保存</a>
        <input type="hidden" id="sex" value="<%=sex %>"/>
        <div id="shade"></div>
    </div>

    <form method="post" action="modifyinfo.aspx" id="m_info" target="_self">
        <input type="hidden" name="m_type" id="m_type" />
    </form>
</asp:Content>

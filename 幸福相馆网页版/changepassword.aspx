<%@ Page Title="" Language="C#" MasterPageFile="~/Order.master" AutoEventWireup="true" CodeBehind="changepassword.aspx.cs" Inherits="XF_Web_Concise.changepassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="oTitle" runat="server">
我的幸福相馆 - 修改密码
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="oHead" runat="server">
<style type="text/css">
        #content_r
        {
            padding:30px 40px;
            height:289px;
            font-size:15px;
            color:rgb(72,72,72);
        } 
        #content_r table
        {
            border-collapse:collapse;
        } 
        #content_r table td
        {
            height:35px;           
        }     
        #content_r table td:first-child
        {
            text-align:right;       
        }       
        .fillform
        {
            border: 1px solid #D1D1D1;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            outline:0;
            padding: 3px 5px 1px;
            width: 200px;
        }
        .fillform:focus
        {
            border:1px solid gray;
        }
        .confirmbtn
        {
            width:70px;
            height:35px;
            font-size:17px;
            background-color:rgb(0,161,239);
            line-height:35px;
        }
        .confirmbtn:hover
        {   
            background-color:#3366FF;
        }
    </style>
    <script src="JS/changepassword.js" type="text/javascript"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="oBody" runat="server">
    <div id="content_r">
        <table>
            <tr><td>原密码:&nbsp;&nbsp;&nbsp;</td><td><input type="password" class="fillform" id="originPwd"/></td><td></td></tr>
            <tr><td>新密码:&nbsp;&nbsp;&nbsp;</td><td><input type="password" class="fillform" id="newPwd" /></td><td style="color:rgb(138,138,138);font-size:13px;">&nbsp;&nbsp;密码由6-20位英文字母，数字或特殊字符组成</td></tr>
            <tr><td>确认新密码:&nbsp;&nbsp;&nbsp;</td><td><input type="password" class="fillform" id="rePwd" /></td><td></td></tr>
            <tr style="height:45px;"><td></td><td><a href="javascript:SavePwd();" class="colorbtn confirmbtn">保存</a></td><td></td></tr>
        </table>        
    </div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Order.master" AutoEventWireup="true" CodeBehind="recharge.aspx.cs" Inherits="XF_Web_Concise.recharge" %>
<asp:Content ID="Content1" ContentPlaceHolderID="oTitle" runat="server">
我的幸福相馆 - 账户充值
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
        .fillform
        {
            border: 1px solid #D1D1D1;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            outline:0;
            padding: 3px 5px 1px;
            width: 150px;
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
        .gray_w
        {
            color:rgb(138,138,138);
            font-size:14px;   
        }
    </style>
    <script src="JS/recharge.js" type="text/javascript"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="oBody" runat="server">
    <div id="content_r">
        <table>
            <tr><td>用户帐号:&nbsp;&nbsp;&nbsp;</td><td><%=account%></td></tr>
            <tr><td>账户余额:&nbsp;&nbsp;&nbsp;</td><td><span class="red_w"><%=balance%></span>&nbsp;&nbsp;元</td></tr>
            <tr><td>充值金额:&nbsp;&nbsp;&nbsp;</td><td><input type="text" class="fillform" id="feeTxt" />&nbsp;&nbsp;元</td></tr>
            <tr style="height:45px;"><td></td><td><a href="javascript:Rechange();" class="colorbtn confirmbtn">确定</a></td></tr>
        </table>
    </div>
    <form id="r_Form" method="post" action="payorder.aspx" target="_blank">
        <input type="hidden" id="orderno" name="orderno" />
    </form>
</asp:Content>

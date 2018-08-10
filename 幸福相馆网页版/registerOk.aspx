<%@ Page Title="" Language="C#" MasterPageFile="~/XF_ACCOUNT.Master" AutoEventWireup="true" CodeBehind="registerOk.aspx.cs" Inherits="XF_Web_Concise.RegisterOk" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link rel="stylesheet" href="CSS/registerOk.css" type="text/css"/>
    <script src="JS/registerOk.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div class="body-div">
        <p class="tips1">还差一步，请激活您的账户</p>
        <span class="tips2" id="tips2"></span>
        <span class="tips2">请24小时内登录验证，并点击邮件中的链接验证您的邮箱。</span>
        <a class="button" href="javascript:verifyEmail();">立即登录邮箱验证</a>
        <span class="tips3">还没有收到验证邮件？</span>
        <span class="tips4">请检查您的垃圾箱，邮件有可能被误认为是垃圾邮件而放到垃圾箱中<br/>
        或者，请您可以<a class="resend" href="javascript:resendEmail();">点此重新发送激活邮件</a>
        <span id="resendTips"></span></span>
    </div>
</asp:Content>

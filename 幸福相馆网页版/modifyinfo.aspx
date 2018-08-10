<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="modifyinfo.aspx.cs" Inherits="XF_Web_Concise.modifyinfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
    我的幸福相馆 - 信息修改
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
<script type="text/javascript">
    var rType = "<%=rType %>";
</script>
<link href="CSS/modifyinfo.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="js/modifyinfo.js"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div id="body-div">
        <div id="content-div">
            <p id="tips"></p>  
            <input id="new-value" type="text"/>
            <a id="ok" class='button'>确定</a>            
        </div>
        <div id="activity-email" style="display:none;">
            <p id="result-tips">正在重新设置邮箱...</p>
            <a id="reset_email" class="button" style="display:none;" >重新设置邮箱</a>
        </div>
        <div id="input-mod-code" style="display:none;">
            <input id="mod-code" type="text"/>
            <a id="submitcode" class="button">确定</a>
            <p id="msg-tips"></p>            
        </div>
        <div id="sended-email" style="display:none;">
            <span class="tips2" id="tips2"></span>
            <span class="tips2">请24小时内登录验证，并点击邮件中的链接验证您的邮箱。</span>
            <a class="button2" href="javascript:verifyEmail();">立即登录邮箱验证</a>
            <span class="tips3">还没有收到验证邮件？</span>
            <span class="tips4">请检查您的垃圾箱，邮件有可能被误认为是垃圾邮件而放到垃圾箱中<br/>
            或者，请您可以<a target="_parent" class="resend"href="javascript:resendEmail();">点此重新发送激活邮件</a>
            <span id="resendTips"></span></span>
        </div>
        <div id="tips-div" style="visibility:hidden">
            <p id="state_tips"></p>
        </div>        
    </div>
</asp:Content>

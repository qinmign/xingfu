<%@ Page Title="" Language="C#" MasterPageFile="~/XF_ACCOUNT.Master" AutoEventWireup="true" CodeBehind="registerActivity.aspx.cs" Inherits="XF_Web_Concise.registerActivity" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 账户激活
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link rel="stylesheet" href="CSS/registerActivity.css" type="text/css"/>    
    <script type="text/javascript" src="JS/registerActivity.js"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div class="body-div">
        <div id="activity-div">
            <div class="tips1 clearfloat">
                <div id="icon" class="float_l">
                </div>
                <div class="float_l">
                    <label id="tips-title" class="tips2">帐号激活中</label>                
                    <label id="tips-desc">请稍候...</label>
                    <label style="display:inline-block";><a id="resend-activity-email" href="javascript:resendEmail();" class="resend-mail">点此重新发送激活邮件</a></label>             
                     <a id="auto-jump" href="javascript:jumpToHome();"></a>   
                </div>                                            
            </div>   
                      
        </div>
    </div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/XF_RESET_PASSWORD.Master" AutoEventWireup="true" CodeBehind="resetpassword.aspx.cs" Inherits="XF_Web_Concise.resetpassword1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mResetPasswordTitle" runat="server">
我的幸福相馆 - 找回密码
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mResetPasswordHead" runat="server">
    <link href="CSS/resetpassword.css" type="text/css" rel="Stylesheet"  />
    <script type="text/javascript" src="JS/resetpassword.js"></script>
    <script type="text/javascript" src="JS/jquery.md5.js"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mResetPasswordBody" runat="server">
<div class="content">
    <div class="title">
        找回密码
    </div>
    <div id="bodydiv">
            <div id="inputDiv">
                <input id="selectEmail" style="display:none" type="radio" name="way" checked="checked"/>
                <label id="byEmail" class="hRadio">电子邮箱找回</label>
                <br/>
                <input id="selectPhone" style="display:none;" type="radio" name="way"/>
                <label id="byPhone" class="hRadio" style="margin-top:6px;">手机短信找回</label>
                <div>
                    <input id="account" type="text" class="nform interval" style="width:228px;"/>
                    <br />
                     <div class="clearfloat">
                        <input id="verifyCode" type="text" class="nform interval float_l" style="width:86px;"/>
                        <img id="passwordVerifyCode" class="float_l"  src="Code.aspx" alt=""/>
                        <a id="updateVerifyCode" class="float_l" href="javascript:refreshVerifyCode();">看不清，换一张</a>
                    </div>
                    <a class="button button-short" href="javascript:submit();">下一步</a>
                </div>
            </div>
            <div id="sendEmailSuccess" style="display:none;">
                    <div style="margin-left:40px;" class="clearfloat">
                        <img id="sendedIcon" src="CSS/images/account/check.png"; class="float_l" alt=""/>
                        <div class="float_l">
                            <label style="display:block;" id="sendedTips"></label>                            
                            <label style="display:block;margin-left:8px;">请登录邮箱，点击确认连接，完成密码修改</label>
                        </div>
                    </div>
                    <br />
                    <a class="button button-long" style="margin:0 0 0 120px;" href="javascript:verifyEmail();">去邮箱查看</a>
                    <span class="linecolor">-------------------------------------------------------------</span>
                    <span class="resend">如果您在十分钟内还没有收到验证邮件，请<a id="gobackselect" >返回重新选择</a>,或</span>
                    <br />
                    <a class="button-resend" href="javascript:resendzhmmemail();">重新发送邮件</a>
            </div>  
            <div id="inputMsg" style="display:none;">
                <p id="sendedMsg">验证码短信已经发送至</p>
                <table><tr><td><input id="inputMsgCode" type="text" class="nform"/></td><td><a id="sendMessage" class="get-verfity_code" href="javascript:void(0);">免费获取短信验证码</a></td></tr></table>
                <a class="button button-short" href="javascript:checkYZM();">下一步</a>
            </div>
            <div id="phoneSetPwd">
                
                <table id="inputPwd" border="0" cellspacing="0" cellpadding="0" width="100%">
                     <tr>
                		<td class="table-left"></td>
                        <td><span style="color:rgb(212,212,212);">密码由6~20位英文字母，数字或特殊字符组成</span></td>
                	</tr>
                	<tr>
                		<td class="table-left"><span>输入新密码：</span></td>
                        <td><input id="newPassword" type="password" maxlength="20" class="nform float_l"/>
                            <span id="tips" class="float_l"></span></td>
                	</tr>
                    <tr>
                		<td class="table-left"><span>确认密码：</span></td>
                        <td><input id="newVerifyPassword" type="password" maxlength="20" class="nform float_l"/></td>
                	</tr> 
                    <tr>
                		<td class="table-left"></td>
                        <td><a class="button button-short" href="javascript:changePwd();">确定</a></td>
                	</tr> 
                </table>
            </div>
            <div id="resetSuccess">
                <div>
                    <label class="resetSuccessTips">密码设置成功</label>
                </div>
                <a id="gotoLogin" class="button button-long">马上登录</a>
            </div>
    </div>
</div>
</asp:Content>
 
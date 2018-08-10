<%@ Page Title="" Language="C#" MasterPageFile="~/XF_ACCOUNT.Master" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="XF_Web_Concise.register" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 用户注册
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="css/register.css" type="text/css" rel="Stylesheet" />
    <script src="JS/register.js" type="text/javascript"></script>    
    <script src="JS/jquery.md5.js" type="text/javascript"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div class="content">    
        <div class="title title_desc">新用户注册</div>
        <div class="border clearfloat">   
            <div class="float_l" style="width:72%">
            <div class="switch-register-way clearfloat">
                <div id="regiterByEmail" class="switch-email switch-selected float_l">
                     <label id="labelEmail" class="switch-email-label email-selected">邮箱注册</label>
                </div>
                <div id="regiterByPhone" class="switch-phone switch-unselected float_l">
                    <!--<div id="labelPhone" class="switch-phone-label phone-unselected"></div>  -->
                    <div class="clearfloat">
                        <img id="labelPhone" src="#this" class="float_l switch-phone-label phone-unselected" alt=""/>
                        <div class="float_l">手机注册</div>
                    </div>
                </div>
            </div>            
            <label id="switch-cursor">▼</label>
            <table id="emailTable" border="0" cellspacing="0" cellpadding="0" width="100%" style="display:block;">
            	<tr>
            		<td class="table_left"><p>邮箱：</p></td>
                    <td class="table_right">
                        <input id="account" class="float_l nform" type="text"/>
                        <span id="accountTips">请输入有效的邮箱地址，当密码遗失时凭此领取</span>                        
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"><p>登录密码：</p></td>
                    <td class="table_right">  
                        <input id="password" class="float_l nform" maxlength="20"  type="password"/>                        
                        <span id="passwordTips">密码由6~20位英文字母，数字或特殊字符组成</span>
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"><p>确认密码：</p></td>
                    <td class="table_right">
                        <input id="verifyPassword" class="float_l nform" maxlength="20" type="password"/>
                        <span id="verifyPasswordTips"></span>               
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"><p>验证码：</p></td>
                    <td class="table_right" valign="middle">                   
                       <input id="verifyCode" class="float_l nform" type="text" style="width:90px" />
                        <img id="registerVerifyCode" class="float_l" src="Code.aspx" style="margin:0 0 0 12px" alt=""/>
                        <span  class="float_l change-verify-code"><a id="changeVerifycode" style="text-decoration:none;" href="javascript:updateVerifyCode();">换一张</a></span>                      
                        <span id="verifyCodeTips"></span>
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"></td>
                    <td class="table_right" valign="middle">                   
                        <input id="agreeProvision" checked="checked" class="float_l" type="checkbox"/>
                        <span style="font-size:16px;margin-top:3px;color:rgb(84,84,84)">已阅读并接受“<a id='serviceProvision' class="link"  target="_blank" href="fwxy.aspx">服务协议</a>”所有条款</span>
                        <span id="agreeProvisionTips"></span>
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"></td>
                    <td class="table_right" valign="middle">   
                        <a href="javascript:submitEmailRegister();" class="register-button">注  册</a>                   
                    </td>
            	</tr>
            </table>
            <table id="phoneTable" style="display:none;" border="0" cellspacing="0" cellpadding="0" width="100%">
            	<tr>
            		<td class="table_left"><p>手机号码:</p></td>
                    <td class="table_right">
                        <input id="phone-number" class="nform float_l"/>
                        <span id="phone-number-tips"></span>
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"></td>
                    <td class="table_right"><a id="sendMessage" class="get-verfity_code" href="javascript:sendMsg();">免费获取短信验证码</a></td>
            	</tr>
                <tr>
            		<td class="table_left"><p>短信验证码:</p></td>
                    <td class="table_right">
                        <input id="message-verify-code" class="nform  float_l"/>
                        <span id="message-verify-code-tips"></span>
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"><p>登录密码:</p></td>
                    <td class="table_right">
                        <input id="phone-number-password" type="password" class="nform  float_l"/>
                        <span id="phone-number-password-tips"></span>
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"><p>确认密码:</p></td>
                    <td class="table_right"><input id="phone-number-verify-password" type="password" class="nform  float_l"/><span id="phone-number-verify-password-tips" ></span></td>
            	</tr>
                <tr>
            		<td class="table_left"><p>验证码:</p></td>
                    <td class="table_right" valign="middle">                   
                        <input id="photo-verify-code" type="text" class="float_l nform" style="width:90px"/>
                        <img id="image-verify-code" class="float_l" src="Code.aspx" style="margin:0 0 0 12px"/>
                        <span  class="float_l change-verify-code"><a id="phone-verify-code" style="text-decoration:none;" href="javascript:updatePhoneVerifyCode();">换一张</a></span>                      
                        <span id="photo-verify-code-tips"></span>
                    </td>
            	</tr>
                <tr>
            		<td class="table_left"></td>
                    <td class="table_right">
                        <input id="agreeProvision2" checked="checked" class="float_l" type="checkbox"></input>                          
                        <span style="font-size:16px;margin-top:3px;color:rgb(84,84,84);">已阅读并接受“<a id='serviceProvision2' class="link" target="_blank" href="fwxy.aspx">服务协议</a>”所有条款</span>
                        <span id="agreeProvision2-tips"></span>
                     </td>
            	</tr>
                <tr>
            		<td class="table_left"></td>
                    <td class="table_right" valign="middle"><a class="register-button" href="javascript:submitPhoneRegister();">注  册</a></td>
            	</tr>
            </table>
            </div>                    
            <div class="float_l login-div">
                <p>已经有帐号？请直接登录</p>
                <a class="login-button" href="login.aspx">登  录</a>
            </div>
        </div>
     </div>
</asp:Content>

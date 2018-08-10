<%@ Page Title="" Language="C#" MasterPageFile="~/XF_ACCOUNT.Master" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="XF_Web_Concise.login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
    登录
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link rel="stylesheet" href="css/login.css" />
    <script type="text/javascript" src="js/jquery.md5.js"></script>
    <script type="text/javascript" src="JS/login.js"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div class="content">
        <div class="title title_desc">登录</div>
        <div class="clearfloat">
            <form id="form1" runat="Server">
            <div class="div_left float_l">
                <span id="error">错误信息</span>
                <table border="0" cellspacing="0" cellpadding="0" width="100%">                    
                	<tr>
                		<td class="table_left"><p>帐号：</p></td>
                        <td class="table_right">
                            <input id="account" type="text" Class="float_l nform"/>
                            <span id="accountTips" class="float_l"></span>
                        </td>
                	</tr>
                    <tr>
                		<td class="table_left"><p>密码：</p></td>
                        <td class="table_right">                            
                            <input id="password" type="password" Class="float_l nform"/>
                            <span id="passwordTips" class="float_l"></span>
                        </td>
                	</tr>
                    <tr>
                		<td class="table_left"><p>验证码：</p></td>
                        <td class="table_right">
                            <input id="verifyCode" type="text" class="float_l nform" style="width:90px;"/>
                             <img id="loginVerifyCode" class="float_l" src="Code.aspx" style="margin:0 0 0 12px"/>
                             <span  class="float_l change-verify-code"><a id="changeVerifycode" style="text-decoration:none;" href="javascript:updateVerifyCode();">换一张</a></span>                      
                             <span id="verifyCodeTips" class="float_l"></span>
                        </td>
                	</tr>
                    <tr>
                		<td class="table_left"></td>
                        <td class="table_right">
                            <a id="register" class="login-button float_l" href="javascript:login();">登  录</a>
                            <a id="forgetPwd" class="float_l" style="text-decoration:none;margin:10px 0 0 10px;" href="javascript:forgetPwd();">忘记密码</a>
                        </td>
                	</tr>
                </table>
            </div>
            </form>
            <div class="float_l div-right">
                 <p>还没有帐号？马上注册一个</p>
                 <a class="register-button" href="register.aspx">注 册</a>
            </div>
        </div>
    </div>    
</asp:Content>

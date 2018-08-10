<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="pszn.aspx.cs" Inherits="XF_Web_Concise.pszn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 拍摄指南
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/pszn.css" rel="stylesheet" type="text/css" />
    <script src="JS/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="JS/pszn.js" type="text/javascript"></script>    
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
   <div id="content">
        <img src="css/images/bz/pszn_banner_01.jpg" style="margin-top:20px;"/>
        <div id="gxxg" style="background:url(css/images/bz/pszn_02.jpg);width:931px;height:50px;padding:330px 0 0 20px;margin:6px 0 30px 0;">
            <ul>
                <li style="margin-right:85px;">●&nbsp;在光线充足的环境下找一面白墙，避免背光或者强光直射脸部。</li>
                <li style="margin-right:90px;">●&nbsp;镜头擦干净，双手不抖动。眼睛要平视镜头，表情自然哦。</li>
                <li>●&nbsp;头发梳理整齐，不要遮住脸部、眼睛、眉毛和耳朵哟！</li>
            </ul>
        </div>
        <img src="css/images/bz/pszn_03.jpg" />
        <img src="css/images/bz/pszn_04.jpg" />
        <img src="css/images/bz/pszn_05.jpg" style="margin:10px 0 10px;"/>
        <img src="css/images/bz/pszn_06.jpg" style="margin:10px 0 10px;"/>
        <img src="css/images/bz/pszn_07.jpg" style="margin:10px 0 10px;"/>
        <div style="background:url(css/images/bz/pxzn_08.png);width:970px;height:520px;margin:30px auto 100px;overflow:hidden;">
            <div id="download-btn-box">
                <a id="android-btn" href="http://bzztc.gdbnet.cn/xfxg/AppDownLoad.aspx?d_type=2" target="_blank"></a>
                <a id="iphone-btn" href="http://bzztc.gdbnet.cn/xfxg/AppDownLoad.aspx?d_type=3" target="_blank"></a>
                <a id="ipad-btn" href="http://bzztc.gdbnet.cn/xfxg/AppDownLoad.aspx?d_type=4" target="_blank"></a>
            </div>
            <div id="web-btn-box">
                <a id="web-btn" href="choosecertificate.aspx"></a>
            </div>
        </div>        
   </div>
</asp:Content>

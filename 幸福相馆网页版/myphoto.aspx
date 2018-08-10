<%@ Page Title="" Language="C#" MasterPageFile="~/XF.master" AutoEventWireup="true" CodeBehind="myphoto.aspx.cs" Inherits="XF_Web_Concise.myphoto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 证照库
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/myphoto.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
<h1>证照库</h1>
  <div id="folder_box">
  <div class="folder">
  <a href="myyt.aspx" target="_self"><img src="PreViewYT.aspx" alt="原图备份" /></a>
  <p><a href="myyt.aspx" target="_self">原图备份</a>（<% =ytCount %>）</p>
  </div>
  <div class="folder">
    <a href="myzjz.aspx" target="_self"><img src="preViewMB.aspx" alt="证照备份" /></a>
    <p><a href="myzjz.aspx" target="_self">证照备份</a>（<% =zjzCount %>）</p>
  </div>  
  </div>
    <ul id="question_box">
    <li>
  <strong>原图备份：</strong>自动云备份处理成功的原图，可留存做其他用途，安全又方便。


    </li>
    <li>
  <strong>证照备份：</strong>保存付款成功的相片记录，可继续冲印。
    </li>
    
    </ul>
</asp:Content>

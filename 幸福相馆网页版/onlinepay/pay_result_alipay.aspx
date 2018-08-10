<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pay_result_alipay.aspx.cs" Inherits="XF_Web_Concise.pay_result_alipay" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>付款完成</title>
     <link type="text/css" rel="Stylesheet" href="../css/pay_result.css" />
    <script src="../JS/jquery-1.8.2.min.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="main" >
    <div id="content_top"></div>
    <div id="content">
        <div class="<% =jg %>" id="result">

        <p>订单号：<% =orderno %><br />
        
        金额：<% =fee %><br /><% =msg %></p>
    
        </div>
        <a class="gban" href="javascript:window.opener = null; window.open('', '_self'); window.close();"></a>
    </div>
    <div id="content_bottom"></div>
    </div>
    </form>
</body>
</html>

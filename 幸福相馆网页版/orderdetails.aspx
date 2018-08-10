<%@ Page Title="" Language="C#" MasterPageFile="~/Order.master" AutoEventWireup="true" CodeBehind="orderdetails.aspx.cs" Inherits="XF_Web_Concise.orderdetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="oTitle" runat="server">
我的幸福相馆 - 订单详情
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="oHead" runat="server">
    <link href="CSS/orderdetails.css" rel="stylesheet" type="text/css" />
    <script src="JS/orderdetails.js" type="text/javascript"></script>
    <script src="JS/tablepage.js" type="text/javascript"></script>
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script type="text/javascript">
        var orderno = "<%=order_no %>";
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="oBody" runat="server">
    <div id="content_r">
        <%=loading_str + "432px;}</style>');</script>"%>
        
        <div id="infoBox">
        <div class="orderhead"><h4>订单号：<%=order_no %></h4></div>

        <table class="propic">
            <tr><td class="pointtd" style="width:60px;">
                    <span class="actpoint"></span>
            </td><td class="arrowtd">
                    <span class="actarrow"></span>
            </td><td class="pointtd" style="width:60px;">
                    <span class="<%=pointStyle %>"></span>
            </td><td class="arrowtd">
                    <span class="<%=arrowStyle %>"></span>
            </td><td class="pointtd" style="width:60px;">
                    <span class="<%=pointStyle %>"></span>
            </td></tr>
        </table>
        <table class="wordtable">
            <tr><td class="sw1">
                    <%=submitStr %>
            </td><td class="sw2">
                    <%=payStr %>       
            </td><td class="sw3">
                    <%=downStr %>
            </td></tr>
        </table>
        <p class="pre" id="exp_cID" style="margin-left:20px;margin-top:20px" runat="server">快递公司：<%=exp_company%></p>
        <p class="pre" id="exp_nID" style="margin-left:20px;" runat="server">快递单号：<%=exp_num%></p>


        <div class="receiverbox">
            <h4>收件人信息</h4>
            <p style="display:<%=re_box_visible %>;" class="pre"><%=receiveHTML %></p>
            <p style="display:<%=e_box_visible %>;" class="pre">电子邮箱：<%=email %></p>
            <p class="pre">补充说明：<%=remarks %></p>
            <div style="border-bottom:1px solid #DFE3E6;margin-top:10px;"></div>
        </div>

        <div class="oinfobox">
            <h4>订单信息</h4>
        </div>
        <p style="width:723px;margin:0 auto;text-align:right;">总额:&nbsp;<span class="red_w">&yen;<span id="totolFee"></span></span><span id="expSpan">&nbsp;&nbsp;(含快递费:&yen;<span id="expFee"></span>)</span></p>
        <br />
        </div>

    </div>
</asp:Content>

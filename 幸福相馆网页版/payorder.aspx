<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="payorder.aspx.cs" Inherits="XF_Web_Concise.payorder" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 证照处理
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/payorder.css" rel="stylesheet" type="text/css" />
    <link href="CSS/progress.css" rel="stylesheet" type="text/css" />
    <link href="CSS/cermanage.css" rel="stylesheet" type="text/css" />
    <link href="CSS/pay.css" rel="stylesheet" type="text/css" />
    <link href="CSS/messageBox.css" rel="stylesheet" type="text/css" />
    <script src="JS/payorder.js?v=0.1" type="text/javascript"></script>
    <script src="JS/pay.js?v=0.1" type="text/javascript"></script>
    <script src="JS/main.js" type="text/javascript"></script>
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script src="JS/messageBox.js" type="text/javascript"></script>
    <script type="text/javascript">
        var ewallet_v = "<%=ewallet_v %>";
        var order_no = "<%=order_no %>";
        var pay_no = "<%=pay_no %>";
        var uid = "<%=uid %>";
        var username = "<%=username %>";
        var pay_type = "<%=pay_type %>";
        var pageName = "<%=pageName %>";
        var shoppingcarSign = "";
        var currentPage = "payorder.aspx";

        $(function () {
            shoppingcarSign = getRequest("shoppingcarSign");
            if (shoppingcarSign == "1") {
                $(".progress").remove();
                shoppingcarSign = "?shoppingcarSign=1";
                $(".content").before("<br/>");
                $("#shoppingstep").attr("src", "CSS/images/shoppingcar/shop_steps_02.png");
                $(".nav1").hide();
                $(".nav2").show();
            }
        });
    </script>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div class="content">
        <div class="progress" runat="server" id="progressID">
            <table class="propic">
                <tr><td class="pointtd">
                        <span class="actpoint"></span>
                </td><td class="arrowtd">
                        <span class="actarrow"></span>
                </td><td class="pointtd">
                        <span class="actpoint"></span>
                </td><td class="arrowtd">
                        <span class="actarrow"></span>
                </td><td class="pointtd">
                        <span class="actpoint"></span>
                </td><td class="arrowtd">
                        <span class="waitarrow"></span>
                </td><td class="pointtd">
                        <span class="waitpoint"></span>
                </td></tr>
            </table>
            <table class="wordtable">
                <tr><td class="green_w w1">
                        1、递交相片
                </td><td class="green_w w2">
                        2、查看结果
                </td><td class="green_w w3">
                        3、付款
                </td><td class="gray_w w4">
                        4、获取相片/回执
                </td></tr>
            </table>
        </div>

        <div class="orderinfo" runat="server" id="pay_o_info">
            <h3>您的订单已提交成功！</h3>
            <p>订单号：<%=order_no%>&nbsp;&nbsp;&nbsp;&nbsp;应支付：<span class="orange_w">&yen;<%=total_fee%></span></p>
        </div>

        <div class="orderinfo c_orderinfo" runat="server" id="pay_c_info">
            <p>您的充值单号为：<%=order_no%></p>
            <p>充值金额：<span class="orange_w">&yen;<%=total_fee%></span></p>
        </div>

        <div class="paybox fillform">
            <div class="headdiv">
                <h4>请选择支付方式</h4>
            </div>
            <div class="contentbox" style="padding:20px 0 0 60px;">
                <div class="ewalletdiv" style="display: <%=ewallet_v%>">
                    <table>
                        <tr><td>
                                <a href="javascript:clickradio('ewallet');" id="ewallet" class="radiogroup radiodeact"></a>
                        </td><td>
                                <a href="javascript:clickradio('ewallet');" style="font-size: 18px; color: rgb(77,77,77);">电子钱包支付</a>
                        </td><td>
                                &nbsp;&nbsp;(您的余额为：<span class="red_w" id="u_fee"><%=user_fee %></span>元)
                        </td></tr>
                    </table>
                </div>
                <div class="payplatform">
                    <h4>支付平台</h4>
                    <table>
                        <tr><td>
                                <a href="javascript:clickradio('alipay');" id="alipay" class="radiogroup radiodefault"></a>
                        </td><td>
                                <img src="css/images/cermanage/alipay.png" alt="" onclick="clickradio('alipay');" />
                        </td><td>
                                <span style="width: 120px; display: inline-block;"></span>
                        </td><td>
                                <a href="javascript:clickradio('tenpay');" id="tenpay" class="radiogroup radiodefault"></a>
                        </td><td>
                                <img src="css/images/cermanage/tenpay.png" alt="" onclick="clickradio('tenpay');" />
                        </td><td>
                                <span style="width: 120px; display: inline-block;"></span>
                        </td><%--<td>
                                <a href="javascript:clickradio('ylpay');" id="ylpay" class="radiogroup radiodefault"></a>
                        </td><td>
                                <img src="css/images/cermanage/yl_online.jpg" alt="" onclick="clickradio('ylpay');" />
                        </td><td style="color:#707070;">
                            (无需开通网银)
                        </td>--%></tr>
                    </table>
                </div>
                <p class="tip_w">
                    请确保您的银行卡已经开通网上支付功能，否则无法完成支付。（如尚未开通，请前往银行办理开通网上支付功能业务）</p>
                <p class="tip_w">
                    不管您是否拥有支付宝或财付通帐号都没关系，都能通过招商银行、中国工商银行、中国建设银行、中国银行、中国农业银行等国内具有银联标志</p>
                <p class="tip_w">
                    的网银进行支付。</p>
                <br />
                <img src="css/images/cermanage/bank.gif" alt="" />
                <br />
                <br />
            </div>
        </div>

        <br />
        <a class="paybtn colorbtn" href="" id="orderpayBtn">立即支付</a>        
        <br />

        <form method="post" action="" id="payform" target="_blank">
            <input type="hidden" name="ddh" value="<%=pay_no %>#<%=order_no%>#<%=total_fee %>"/>
            <input type="hidden" name="pay_type" value="ewallet" id="radioval" />
            <input type="hidden" name="pay_name" value="订单支付" id="pay_name" />
        </form>

    </div>
</asp:Content>

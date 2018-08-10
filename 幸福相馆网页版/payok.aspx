<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="payok.aspx.cs" Inherits="XF_Web_Concise.payok" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 证照处理
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/progress.css" rel="stylesheet" type="text/css" />
    <link href="CSS/cermanage.css" rel="stylesheet" type="text/css" />
    <link href="CSS/messageBox.css" rel="stylesheet" type="text/css" />
    <link href="CSS/pay.css" rel="stylesheet" type="text/css" />
    <link href="CSS/payok.css" rel="stylesheet" type="text/css" />
    <script src="JS/payok.js" type="text/javascript"></script>
    <script src="JS/tablepage.js" type="text/javascript"></script>
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script src="JS/messageBox.js" type="text/javascript"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
        var orderno = "<%=order_no %>";
        var email = "<%=email %>";
        var registCode = "<%=registCode %>";
        var shoppingcarSign = "";
        var currentPage = "payok.aspx";

        $(function () {
            shoppingcarSign = getRequest("shoppingcarSign");
            if (shoppingcarSign == "1") {
                $(".progress").remove();
                shoppingcarSign = "?shoppingcarSign=1";
                $(".content").before("<br/>");
                $("#shoppingstep").attr("src", "CSS/images/shoppingcar/shop_steps_03.png");
                $(".nav1").hide();
                $(".nav2").show();
            }
        });
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">

    <div class="content">

        <div class="progress">
            <table class="propic">
                <tr>
                    <td class="pointtd"><span class="actpoint"></span></td>
                    <td class="arrowtd"><span class="actarrow"></span></td>
                    <td class="pointtd"><span class="actpoint"></span></td>
                    <td class="arrowtd"><span class="actarrow"></span></td>
                    <td class="pointtd"><span class="actpoint"></span></td>
                    <td class="arrowtd"><span class="actarrow"></span></td>
                    <td class="pointtd"><span class="actpoint"></span></td>
                </tr>
            </table>
            <table class="wordtable">
                <tr>
                    <td class="green_w w1">1、递交相片</td>
                    <td class="green_w w2">2、查看结果</td>
                    <td class="green_w w3">3、付款</td>
                    <td class="green_w w4">4、获取相片/回执</td>
                </tr>
            </table>
        </div>

        <div class="successtitle">
            <img src="css/images/cermanage/pay_success.png" /><p><span class="big_w">恭喜您支付成功！</span><span class="small_w" style="display:<%=visible%>">您还可以继续以下操作</span></p>
        </div>

        <div class="fillform">
            <div class="headdiv"><h4>订单号：<%=order_no%></h4><h4 style="text-align:right;margin-right:10px;">下单时间：<%=order_time%></h4></div>
            <div class="contentbox">
                <%=table_html%>
            </div>
        </div>

        <div class="wormtip">
            <h4>温馨提示：</h4>
            <div class="hashz">
                <p>您可以去<a href="myorder.aspx" target="_blank" class="blue_w">“我的订单”</a>查看订单详情、下载相片、下载回执（标准寸照和各国签证无需回执）</p>
                <p>1、标准寸照和各国签证无需相片采集回执，您打印出下载的相片即可用于办理相应证件。</p>
                <p>2、申办证件需带齐相片采集回执和贴表相、申请人户口薄及身份证，以及相关办证材料前往办证大厅。</p>
            </div>
        </div>

        <form method="post" action="" id="gotopayForm">
            <input type="hidden" name="paysign" value="payok" />
        </form>

        <form id="printform" method="post" action="submitorder.aspx">
            <input type="hidden" name="paysign" value="only_print" />
        </form>

    </div>

</asp:Content>

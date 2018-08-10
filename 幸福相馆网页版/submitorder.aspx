<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="submitorder.aspx.cs" Inherits="XF_Web_Concise.submitorder" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 证照处理
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/progress.css" rel="stylesheet" type="text/css" />
    <link href="CSS/combobox.css" rel="stylesheet" type="text/css" />
    <link href="CSS/cermanage.css" rel="stylesheet" type="text/css" />
    <link href="CSS/submitorder.css" rel="stylesheet" type="text/css" />   
    <link href="CSS/tablepage.css" rel="stylesheet" type="text/css" />
    <link href="CSS/messageBox.css" rel="stylesheet" type="text/css" />
    <script src="JS/exparea.js" type="text/javascript"></script>
    <script src="JS/expfee.js" type="text/javascript"></script>
    <script src="JS/combobox.js" type="text/javascript"></script>
    <script src="JS/submitorder.js" type="text/javascript"></script>
    <script src="JS/tablepage.js" type="text/javascript"></script>
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script src="JS/messageBox.js" type="text/javascript"></script>

    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
        var formtype = "<%=formtype %>";
        var MAILFEE = Number("<%=EXPFEE %>");
        var paysign = "<%=paysign %>";
        var dealtype = "<%=dealtype %>";
        var defemail = "<%=defemail %>";
        var DEALINGFEE = <%=DEALINGFEE%>;
        var PRINTFEE = 5;
        var currentPage = "submitorder.aspx";
    </script>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
<div class="content">

        <div class="progress" style="height:65px;margin-bottom:10px;">
            <table class="propic">
                <tr>
                    <td class="pointtd"><span class="actpoint"></span></td>
                    <td class="arrowtd"><span class="actarrow"></span></td>
                    <td class="pointtd"><span class="actpoint"></span></td>
                    <td class="arrowtd"><span class="actarrow"></span></td>
                    <td class="pointtd"><span class="actpoint"></span></td>
                    <td class="arrowtd"><span class="waitarrow"></span></td>
                    <td class="pointtd"><span class="waitpoint"></span></td>
                </tr>
            </table>
            <table class="wordtable">
                <tr>
                    <td class="green_w w1">1、递交相片</td>
                    <td class="green_w w2">2、查看结果</td>
                    <td class="green_w w3">3、付款</td>
                    <td class="gray_w w4">4、获取相片/回执</td>
                </tr>
            </table>
        </div>

        <div class="emailbox fillform" style="display:<%=email_visible%>;">
            <div class="headdiv"><h4>填写电子邮箱</h4></div>
            <div class="contentbox" style="height:40px;width:980px;">
                <table><tr><td class="right_w">电子邮箱：</td><td><input autocomplete="off" id="emailTxt" class="txtform midform" type="text" value="<%=defemail %>"/></td><td>&nbsp;&nbsp;用于查询订单及付款成功后，接收电子相片和回执</td><td id="emailtip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr></table>
            </div>
        </div>

        <div class="receiverbox fillform" style="display:<%=receiver_visible%>;height:265px;" id="fillform1">
            <div class="headdiv"><h4>收件人信息</h4></div>
            <div class="contentbox" style="width:980px;height:210px;">
                <table>
                    <tr><td class="right_w">收件人：</td><td colspan="2"><input autocomplete="off" id="receiverTxt" class="txtform midform" type="text" /></td><td colspan="2" id="receivertip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                    <tr><td class="right_w">省市：</td><td><div id="provinceDiv"></div></td><td><div id="cityDiv"></div></td><td id="provincetip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td><td id="citytip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                    <tr><td class="right_w">收件地址：</td><td colspan="3"><input autocomplete="off" id="addressTxt" class="txtform longform" type="text" /></td><td id="addresstip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                    <tr><td class="right_w">邮编：</td><td><input autocomplete="off" id="postTxt" class="txtform shortform" type="text" /></td><td colspan="3" id="posttip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                    <tr><td class="right_w">联系电话：</td><td colspan="2"><input autocomplete="off" id="phoneTxt" class="txtform midform" type="text" /></td><td colspan="2" id="phonetip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                    <tr><td class="right_w">电子邮件：</td><td colspan="2"><input autocomplete="off" id="email2Txt" class="txtform midform" type="text" value="<%=defemail %>" /></td><td>用于查询订单及付款成功后，接收电子相片和回执</td><td id="email2tip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                </table>
            </div>
        </div>

        <div class="receiverbox fillform" style="display:<%=receiver_visible%>;height:auto;" id="fillform2">
            <div class="headdiv"><h4>收件人信息</h4></div>

            <div class="defadBox">
                <div><a href="javascript:AdRadioChecked('defAd');" id="defAd" class="radiogroup radiodeact"></a>&nbsp;&nbsp;</div>
                <div style="width:812px;" id="defAdInfo"><%=receiveHTML%></div>
                <div style="line-height:25px;"><a href="javascript:ModifyAd();" id="modifybtn">[修改]</a>&nbsp;&nbsp;<a href="javascript:ChooseOther();" id="chooseother">[选择其它]</a></div>
            </div>

            <div class="m_title" id="m_title1"><h4>修改信息</h4><a href="javascript:R_back();" style="display:inline-block;width:45px;">[返回]</a></div>
            <div class="m_title" id="m_title2"><h4>选择地址</h4><a href="javascript:R_back2();" style="display:inline-block;width:45px;">[返回]</a></div>

            <div class="otherAd">
                <!--其它地址信息层-->
            </div>

            <div class="newadBox" style="height:30px;">
                <div class="newAdRadio">
                    <div><a href="javascript:AdRadioChecked('newAd');" id="newAd" class="radiogroup radiodefault"></a>&nbsp;&nbsp;</div>
                    <div>使用新地址</div>
                </div>
                <div class="contentbox loginform" style="clear:both;display:none;">
                    <table>
                        <tr><td class="right_w">收件人：</td><td colspan="2"><input autocomplete="off" id="receiverTxt" class="txtform midform" type="text" /></td><td colspan="2" id="receivertip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                        <tr><td class="right_w">省市：</td><td><div id="provinceDiv"></div></td><td><div id="cityDiv"></div></td><td id="provincetip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td><td id="citytip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                        <tr><td class="right_w">收件地址：</td><td colspan="3"><input autocomplete="off" id="addressTxt" class="txtform longform" type="text" /></td><td id="addresstip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                        <tr><td class="right_w">邮编：</td><td><input autocomplete="off" id="postTxt" class="txtform shortform" type="text" /></td><td colspan="3" id="posttip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                        <tr><td class="right_w">联系电话：</td><td colspan="2"><input autocomplete="off" id="phoneTxt" class="txtform midform" type="text" /></td><td colspan="2" id="phonetip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                        <tr><td class="right_w">电子邮件：</td><td colspan="2"><input autocomplete="off" id="email2Txt" class="txtform midform" type="text" value="<%=defemail %>" /></td><td>用于查询订单及付款成功后，接收电子相片和回执</td><td id="email2tip"><span class="green_w correct_w">&nbsp;&nbsp;&radic;</span><span class="red_w error_w"></span></td></tr>
                        <tr><td></td><td colspan="4"><a href="javascript:SaveNewAd();" class="colorbtn saveAdBtn">保存</a>&nbsp;&nbsp;&nbsp;<input autocomplete="off" type="checkbox" name="defcb" id="defcb" checked="checked" /><label for="defcb">设为默认地址</label></td></tr>
                    </table>
                </div>
            </div>
        </div>

        <div style="width:100%;height:10px;"></div>

        <div class="confirmbox fillform">
            <div class="headdiv"><h4>确认订单信息</h4></div>
            <div class="contentbox">
                <%=tableHtml%>
            </div>
        </div>

        <div class="calinfo">
            <div class="lbox"><div id="left_word">您还可以输入<span id="lnum">140</span>字</div><textarea id="texta" class="pre">补充说明...</textarea></div>
            <div class="rbox">
                <p>技术服务费：<span class="orange_w">&yen;<span id="collectionfee"><%=colFee %></span></span></p>
                <p>冲印服务费：<span class="orange_w">&yen;<span id="printfee"><%=prFee %></span></span></p>
                <p id="expressbox" style="display:<%=expbox_visible %>">快递费：<span class="orange_w">&yen;<span id="expressfee"><%=expFee %></span></span></p>
            </div>
        </div>
        <div class="right_w total">应支付：<span class="orange_w">&yen;<span id="totalfee"><%=totalFee %></span></span></div>
        <div class="paydiv"><a class="gotopaybtn colorbtn" href="javascript:SubmitOrder();">去付款 &gt;</a></div>
        
        <div class="wormtip" style="height:55px;width:1000px;">
            <p style="color:rgb(238,53,22);font-weight:bold;text-indent:2em;">相片使用4R相纸进行冲印，其中出入境相片6张/版，居民身份证、居住证、社保卡、机动车驾驶证、保安员证相片12张/版。其他类型</p>
            <p style="color:rgb(238,53,22);font-weight:bold;">相片每版冲印张数明细请查看帮助中心新手指南中的“<a href="helpcenter.aspx?cysm=yes" class="blue_w" target="_blank">冲印说明</a>”。</p>
        </div>
        <br />

        <form id="subform" method="post" action="payorder.aspx">
            <input autocomplete="off" type="hidden" name="orderno" id="h_order_no"/>
        </form>

        <input autocomplete="off" type="hidden" id="saveType" value="01" />
    </div>
</asp:Content>

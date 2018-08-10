<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="resultveiwing.aspx.cs" Inherits="XF_Web_Concise.resultveiwing" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
    我的幸福相馆 - 证照处理
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/progress.css" rel="stylesheet" type="text/css" />
    <link href="CSS/resultveiwing.css" rel="stylesheet" type="text/css" />
    <link href="CSS/cermanage.css" rel="stylesheet" type="text/css" />
    <link href="CSS/collectioninfo.css" rel="stylesheet" type="text/css" />
    <link href="CSS/messageBox.css" rel="stylesheet" type="text/css" />
    <link href="CSS/gwcView.css" rel="stylesheet" type="text/css" />
    <script src="JS/cookies.js" type="text/javascript"></script>
    <script src="JS/resultveiwing.js" type="text/javascript"></script>
    <script src="<%=interfacePath %>JS/checkresult.js" type="text/javascript"></script>
    <script src="JS/messageBox.js" type="text/javascript"></script>
    <script src="JS/gwcView.js" type="text/javascript"></script>

    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
        var pid = "<%=pid %>";
        var emailfill = "<%=emailfill %>";
        var vcode = "<%=vcode %>";
        var certype = "<%=certype %>";
        var handlingFee = "<%=handlingFee %>";
        var printFee = "<%=printFee %>";
        var addFee = "<%=addFee %>";
        var printFreeCount = "<%=printFreeCount %>";
        var interfacePath = "<%=interfacePath %>";
        var currentPage = "resultveiwing.aspx";
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
                <td class="arrowtd"><span class="waitarrow"></span></td>
                <td class="pointtd"><span class="waitpoint"></span></td>
                <td class="arrowtd"><span class="waitarrow"></span></td>
                <td class="pointtd"><span class="waitpoint"></span></td>
            </tr>
        </table>
        <table class="wordtable">
            <tr>
                <td class="green_w w1">1、递交相片</td>
                <td class="green_w w2">2、查看结果</td>
                <td class="gray_w w3">3、付款</td>
                <td class="gray_w w4">4、获取相片/回执</td>
            </tr>
        </table>
        </div>

    <div class="resultbox">
        <div class="leftbox">
            <div class="photobox">
                <table>
                <tr><td>
                    <img src="css/images/pub/loading.gif" alt="" id="loadingimg"/>
                    <img src="" alt="" id="cerphoto" style="display:none;" onload="javascript:showPhotoCut();"/>
                </td></tr>
                </table>
            </div>
            
            <div id="picbox">
                <div id="hzandmb">
                    <div class="imgbox" id="hz" style="display:none">
                        <img src="" alt="" id="bighz" style="width:280px;height:240px;" />
                    </div>
                    <div class="imgbox" id="mb">
                        <img src="" alt="" id="bigmb" style="width:280px;height:189px;" />
                    </div>

                    <div class="bgbox" style="<%=hzdisplay %>">
                        <p>数字相片模板</p>
                        <img src="" onclick="Chimg('数字相片采集回执','hz','mb')" alt="" id="smallhz" style="width:60px;height:40px;" />
                        <img src="" onclick="Chimg('数字相片模板','mb','hz')" alt="" id="smallmb" style="width:60px;height:40px;" />
                    </div>
                    <div class="bg" style="display:<%=hzdisplay %>"></div>
                </div>
            </div>        

            <div class="infobox">
                <table>
                    <%if(certype!=""){ %><tr><td>申办证件类型：<%=certype %></td></tr><%} %>
                    <%if(province!=""){ %><tr><td>办证机关所在地：<%=province %>&nbsp;&nbsp;<%=city %></td></tr><%} %>
                    <%if(idnum!=""){ %><tr><td>证&nbsp;&nbsp;件&nbsp;&nbsp;号&nbsp;&nbsp;码：<%=idnum %></td></tr><%} %>
                </table>
            </div>

            <p class="sucess_w">恭喜您！采集成功！</p>
        </div>

        <div class="rightbox">
            
            <div id="progressbox" style="color:rgb(120,120,120);text-align:center;top:30%;position:relative;">
                <p style="font-size:22px;margin-bottom:7px;">正在上传相片...</p>
                <p style="font-size:18px;margin-bottom:10px;">请保持网络连接稳定且不要退出该页面</p>
                <ul style="list-style:none;width:421px;height:14px;line-height:14px;border:none;padding:0;margin:0;overflow:hidden;display:block;margin:0 auto;">
                    <li style="height:14px;margin-right:10px;float:left;">
                        <div id="progressbar" style="background:url(CSS/images/progressbar/loading_02.png);width:372px;height:14px;">
                            <div id="progresslinebox" style="width:362px;height:6px;position:relative;top:4px;left:5px;overflow:hidden;">
                                <div id="progressline" style="background:url(CSS/images/progressbar/loading_01.png);width:362px;height:6px;position:relative;left:-362px;"></div>
                            </div>         
                        </div>
                    </li>
                    <li id="progresstext" style="color:rgb(153,197,0);font-weight:bold;float:left;height:14px;">0%</li>
                </ul>
            </div>

            <div class="failbox">
                <div class="failword">
                    <p>对不起！采集失败！</p>
                    <p class="rea_sou">原因：<span id="reasontxt"></span></p>
                    <p class="rea_sou">解决方法：<span id="solutiontxt"></span></p>
                </div>
                <a class="reuploadbtn colorbtn" href="javascript:ContinueCommit();">重新递交</a>
            </div>

            <div id="collectoktip">
                <table><tr><td style="width:140px;text-align:right;"><img style="display:inline-block;" src="CSS/images/cermanage/check_01.png" alt="" /></td><td style="width:224px;padding-left:20px;color:rgb(69,173,0);font-size:25px;text-align:left;">相片处理完成</td></tr><tr><td colspan="2" style="font-size:20px;color:rgb(67,67,67);">付款后，我们会将处理好的电子相片<span style="<%=hzworddisplay%>">和采集回执</span>发送至您的邮箱，请注意查收。</td></tr></table>
            </div>

        </div>

    </div>

    <div class="orderinfo" style="<%=orderdisplay %>">
        <div class="titleP">您的订单信息如下:<img style="margin-left:305px;" src="CSS/images/cermanage/tips.png" /></div>
            <%=tableHtml %>
        <p class="r_w">小计：<span class="red_w" id="totalfee"><%=totalCalFee.ToString("0.00")%></span>元</p>
    </div>

    <div class="paydiv" style="<%=orderdisplay %>">
        <div style="width:400px;"><a class="continuebtn colorbtn" href="javascript:ContinueCommit();"><span class="big_w">继续递交</span></a></div>
        <div style="width:570px;text-align:right;"><a class="gotopaybtn colorbtn" href="javascript:ReceiptTipCheck();">去付款 &gt;</a></div>
    </div>

    <div class="wormtip" style="height:130px;clear:both;">
        <h4 style="color:rgb(238,53,22);">温馨提示：</h4>
        <p>1、冲印一版贴表相3元（需勾选冲印服务），快递费另计。</p>
        <p>2、出入境相片6张/版，居民身份证、居住证、驾驶证相片12张/版，其他证件类型详见<a href="helpcenter.aspx?cysm=yes" class="blue_w" target="_blank">帮助中心</a></p>
        <p>3、16点前下单可当天发货，16点后次日发货，如遇特殊情况，客服会与您联系。</p>
    </div>

    <form method="post" action="choosecertificate.aspx" id="continueForm">
        <input type="hidden" id="conSign" name="conSign" value="0" />
    </form>

    </div>
</asp:Content>

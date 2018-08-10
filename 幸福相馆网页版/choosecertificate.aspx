<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="choosecertificate.aspx.cs" Inherits="XF_Web_Concise.choosecertificate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 证照处理
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/choosecertificate.css" rel="stylesheet" type="text/css" />
    <link href="CSS/combobox.css" rel="stylesheet" type="text/css" />
    <script src="JS/combobox.js" type="text/javascript"></script>
    <script src="JS/cerjson.js" type="text/javascript"></script>
    <script src="JS/choosecertificate.js" type="text/javascript"></script>
    <script src="JS/checkidcard.js" type="text/javascript"></script>
    <script src="JS/cookies.js" type="text/javascript"></script>
    
    <script type="text/javascript">
        var wsurl = "<% =urlbase %>xfxg_ws.asmx";
        var verify1 = "<%=verify1 %>";
        var verify2 = "<%=verify2 %>";
        var verify3 = "<%=verify3 %>";
        var verifycode = "<%=verify2 %>";
        var uid = "<%=uid %>";
        var username = "<%=username %>";
        var conSign = "<%=conSign %>";
        var uniquecode = "<%=uniquecode%>";
        var flashQueryString = "<%=flashQueryString %>";
        var picture_id = "<%=picture_id%>";
//$(function(){
//$.messageBox("<p style='text-indent:0;color:red;'>尊敬的各位用户：</p>"+
//"<p style='color:red;'>因电话系统故障，导致暂时无法进行正常通话，现正在修复中。如有急事请发邮件到xfxg4008309916@163.com，客服专员会快速跟进处理，给您带来的不便，敬请谅解！感谢您的支持与配合！</p>"+
//"<p style='text-align:right;color:red;'>幸福360综合信息服务平台</p>"+
//"<p style='text-align:right;margin-right:40px;color:red;'>2016年2月21日</p>", "公告");
//});  

    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">

<div class="content">

    <img src="CSS/images/cermanage/banner.png" style="margin-top:10px;" alt="" />

    <div class="photobox">
        <div class="leftpicbox">
            <div class="headtitle"><h3>拍摄指引</h3></div>
            <div id="page1" class="sample">
                <img src="CSS/images/cermanage/tu_01.jpg" alt="" />
                <p>1、使用像素在800万以上的数码相机或智能手机拍摄；</p>
                <p>2、背景无杂物，被拍摄者脸部受光均匀无阴影；</p>
                <p>3、头发梳理整齐，不能遮住脸部、眼睛、眉毛、耳朵和肩膀；</p>
                <p>4、拍摄前，请确保拍摄镜头干净，被拍摄者眼睛平视镜头，表情自然。</p>
            </div>

            <div id="page2" class="sample" style="display:none;">
                <p style="font-size:16px;">请确认您递交的相片不存在以下不可接受情况。</p>                
                <table class="sampletable">
                    <tr><td>
                        <img class="samplepic" src="css/images/cermanage/zzcl_example.jpg" alt=""/>
                        <p>合格相片</p>
                    </td><td>
                        <img class="samplepic" src="css/images/cermanage/zzcl_example-02.jpg" alt=""/>
                        <p>背景不纯</p>
                    </td></tr>
                    <tr><td>
                        <img class="samplepic" src="css/images/cermanage/zzcl_example-03.jpg" alt=""/>
                        <p>取景过大，人像过小</p>
                    </td><td>
                        <img class="samplepic" src="css/images/cermanage/zzcl_example-04.jpg" alt=""/>
                        <p>取景过小，人像过大</p>
                    </td></tr>
                    <tr><td>
                        <img class="samplepic" src="css/images/cermanage/zzcl_example-05.jpg" alt=""/>
                        <p>人像倾斜</p>
                    </td><td>
                        <img class="samplepic" src="css/images/cermanage/zzcl_example-06.jpg" alt=""/>
                        <p>佩戴帽子或饰物</p>
                    </td></tr>
                </table>
            </div>
            <div id="stepbox"><a id="step1" class="step1_act" href="javascript:DisplaySampleBox(1);"></a><a id="step2" class="step2_act" href="javascript:DisplaySampleBox(2);"></a></div>
        </div>
        
        <div class="rightpicbox">
            <div class="headtitle"><h3>递交相片</h3></div>
            <div class="picchoose">
                <p style="text-indent:2em;font-size:16px;margin:0;padding:0;line-height:21px;"><%--技术服务费 16元/张，免费冲印一版贴表相，快递费另计。--%></p>
                
                <div class="uploadflash">

                </div>

                <div class="comboDiv">
                    <table class="comboTable">
                        <tr id="categoryTR"><td>选择证件类别:</td><td colspan="2"><div id="categoryDiv"></div></td></tr>
                        <tr id="typeTR"><td>申办证件类型:</td><td colspan="2"><div id="typeDiv"></div></td></tr>
                        <tr id="provinceTR"><td>办证机关所在地:</td><td><div id="provinceDiv"></div></td><td><div id="cityDiv"></div></td></tr>
                        <tr id="locatinoTR"><td>申请人户籍:</td><td colspan="2"><input type="radio" autocomplete="off" name="location" id="location1" value="1" /><label id="lbl1" for="location1">广州户籍</label><span style="display:inline-block;width:30px;"></span><input autocomplete="off" type="radio" name="location" id="location2" value="0" /><label id="lbl2" for="location2">非广州户籍</label></td></tr>
                        <tr id="idTypeTR"><td>身份证明类型:</td><td colspan="2"><div id="idTypeDiv"></div></td></tr>
                        <tr id="idNumTR"><td>证件号码:</td><td colspan="2"><input type="text" id="idNumTxt" /></td></tr>
                        <tr id="bgColorTR"><td>背景颜色:</td><td colspan="2"><div id="bgColorDiv"></div></td></tr>
                        <tr id="emailTR"><td>电子邮箱:</td><td colspan="2"><input type="text" id="emailTxt" value="<%=email %>" /></td></tr>
                    </table>
                </div>

                <a class="uploadbtn colorbtn" href="javascript:SendDataToFlash();">递交相片</a>
            </div>
        </div>
    </div>

    <div class="idTip"></div>

</div>

<br /><br />

</asp:Content>

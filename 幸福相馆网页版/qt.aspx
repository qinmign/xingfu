<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="qt.aspx.cs" Inherits="XF_Web_Concise.qt" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 首页
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/qt.css" rel="stylesheet" type="text/css" />
    <script src="JS/qt.js" type="text/javascript"></script>
    <script type="text/javascript">
        var uid = "<%=uid %>";
        var username = "<%=username %>";
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">

    <div class="content">
        <div class="leftbg"></div>
        <div class="midbg">
            <div class="lightbox"></div>
            <div class="leftbox">
                <ul class="typechoose">
                    <li><a href="choosecertificate.aspx?certype=1">出入境证件</a></li>
                    <li><a href="choosecertificate.aspx?certype=2">居民身份证</a></li>
                    <li><a href="choosecertificate.aspx?certype=3">居住证</a></li>
                    <li><a href="choosecertificate.aspx?certype=4">社会保障卡</a></li>
                    <li><a href="choosecertificate.aspx?certype=5">机动车驾驶证</a></li>
                    <li><a href="choosecertificate.aspx?certype=6">保安员证</a></li>
<%--                    <li><a href="choosecertificate.aspx?certype=7">外国签证</a></li>
                    <li><a href="choosecertificate.aspx?certype=8">标准寸照</a></li>--%>
                </ul>
            </div>
            <div class="midbox">
                <div class="Miss">
                    <a id="img1" href="choosecertificate.aspx"></a>
                    <a id="img2" href="choosecertificate.aspx"></a>
                    <a id="img3" href="javascript:void(0);"></a>
                    <a id="img4">
                        <p style="margin-top:13px;">1、优化流程，快速获取处理结果</p>
                        <p>2、新增证照库、购物车，相片管理更加专业方便</p>
                        <%--<p>3、新增毕业证相片、中小学生学籍相片、热门国家签证相片处理</p>--%>
                    </a>
                </div>
            </div>
            <div class="rightbox">
                <div class="flashad">
                    
                    <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="190" height="230" id="webXFXG">
                        <param name="movie" value="Flash/xfwe_home2.swf?v=0.1" />
                        <param name="quality" value="high" />
                        <param name="wmode" value="transparent" />
                        <param name="bgcolor" value="#ffffff" />
                        <param name="allowScriptAccess" value="sameDomain" />
                        <param name="allowFullScreen" value="true" />
                        <!--[if !IE]>-->
                        <object type="application/x-shockwave-flash" data="Flash/xfwe_home2.swf?v=0.1" width="190" height="230">
                            <param name="quality" value="high" />
                            <param name="wmode" value="transparent" />
                            <param name="bgcolor" value="#ffffff" />
                            <param name="allowScriptAccess" value="sameDomain" />
                            <param name="allowFullScreen" value="true" />
                        <!--<![endif]-->
                        <!--[if gte IE 6]>-->
                	        <p> 
                		        Either scripts and active content are not permitted to run or Adobe Flash Player version
                		        10.0.0 or greater is not installed.
                	        </p>
                        <!--<![endif]-->
                            <a href="http://www.adobe.com/go/getflashplayer">
                                <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash Player" />
                            </a>
                        <!--[if !IE]>-->
                        </object>
                        <!--<![endif]-->
                    </object>

                </div>
            </div>
            <div class="deskbox"></div>
        </div>
        <div class="rightbg"></div>
    </div>

</asp:Content>

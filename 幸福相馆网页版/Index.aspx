<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="XF_Web_Concise.Index" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>我的幸福相馆|网页版</title>
    <script src="JS/jquery-1.8.2.min.js" type="text/javascript"></script>
    <style type="text/css">
        *
        {
            border: 0;
            margin: 0;
            padding: 0;
            background-color: White;
        }
        .content
        {
            width: 1366px;
            height: 711px;
            position: absolute;
        }
        #leftbg
        {
            background: url(css/images/index/left.jpg) repeat-x;
            position: absolute;
            top: 0;
            left: 0;
            width: 50%;
            height: 711px;
            z-index: -1;
            overflow: hidden;
        }
        #rightbg
        {
            background: url(css/images/index/right.jpg) repeat-x;
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 711px;
            z-index: -1;
            overflow: hidden;
        }
        #bottombg
        {
            bottom:0;
            width:100%;
            height:100%;            
            background-color:rgb(251,243,230);
            position:absolute;
            z-index:-2;   
        }
    </style>
    <script type="text/javascript">

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-37774155-1']);
        _gaq.push(['_trackPageview']);

        (function () {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

        (function ($) {
            $.fn.center = function () {
                var left = ($(window).width() - this.width()) / 2;
                var scrollLeft = $(document).scrollLeft();
                return this.css({ position: 'absolute', 'top': 0, left: left + scrollLeft }).show();
            }
        })(jQuery);


        $(function () {
            $(".content").center();
        });

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="leftbg">
    </div>
    <div class="content">
        <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1366" height="711"
            id="webXFXG">
            <param name="movie" value="Flash/welcome.swf?v=0.2" />
            <param name="quality" value="high" />
            <param name="bgcolor" value="#ffffff" />
            <param name="allowScriptAccess" value="sameDomain" />
            <%--<param name="allowFullScreen" value="true" />--%>
            <!--[if !IE]>-->
            <object type="application/x-shockwave-flash" data="Flash/welcome.swf?v=0.2" width="1366"
                height="711">
                <param name="quality" value="high" />
                <param name="bgcolor" value="#ffffff" />
                <param name="allowScriptAccess" value="sameDomain" />
                <%--<param name="allowFullScreen" value="true" />--%>
                <!--<![endif]-->
                <!--[if gte IE 6]>-->
                <p>
                    Either scripts and active content are not permitted to run or Adobe Flash Player
                    version 10.0.0 or greater is not installed.
                </p>
                <!--<![endif]-->
                <a href="http://www.adobe.com/go/getflashplayer">
                    <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"
                        alt="Get Adobe Flash Player" />
                </a>
                <!--[if !IE]>-->
            </object>
            <!--<![endif]-->
        </object>
    </div>
    <div id="rightbg">
    </div>

    <div id="bottombg"></div>

    </form>
</body>
</html>

<%@ Page Title="" Language="C#" MasterPageFile="~/XF.master" AutoEventWireup="true" CodeBehind="myyt.aspx.cs" Inherits="XF_Web_Concise.myyt" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 证照库
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/myyt.css" rel="stylesheet" type="text/css" />
    <link href="CSS/messageBox.css" rel="stylesheet" type="text/css" />
    <link href="CSS/pictureView.css" rel="stylesheet" type="text/css" />

    <script src="JS/pictureView.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(function () {



            if ($("#pic_box div").size() <= 0) {
                $('#ts').hide();
                $("#nophoto").css("display","block");
            }

            if ($("body").height() < $(window).height()) {
                $("#pic_box").css("margin-bottom", $(window).height() - $("body").height());
            }

            showPicturePidList = new Array();

            $("#pic_box img").each(function () {

                var pid = $(this).attr("value");
                $(this).parent("span").append("<a href=\"javascript:delpic('" + pid + "')\"/>");
                $(this).attr("src", "photo.aspx?rtype=YTK&pid=" + $(this).attr("value"));

                showPicturePidList.push(pid);

                $(this).click(function () {
                    showPictureView(pid)
                });


                $(this).load(function () {
                    var w = $(this).width();
                    var h = $(this).height();

                    if (w / h > 3 / 2) {
                        $(this).css("height", 144);
                        w = $(this).width();
                        $(this).css("left", 0 - Math.floor((w - 216) / 2));
                    }
                    else {
                        $(this).css("width", 216);
                        h = $(this).height();
                        $(this).css("top", 0 - Math.floor((h - 144) / 2));
                    }
                });

            });

            $("#pic_box div span").each(function () {
                $(this).hover(function () {
                    $(this).children("a").show();
                },
                function () {
                    $(this).children("a").hide();
                });
            });
            //showPictureView(showPicturePidList[0]);
        });

        function delpic(pid) {
            $.messageBox("确定删除此相片？", "信息提示", function () {

                $.get("AjaxRes.aspx", { "type": "delyt", "pid": pid, "temp": Math.random() }, function (res) {
                    if (res.substr(0, 1) == "1") {
                        var obj = $("#pic_box img[value='" + pid + "']").parent("span").parent("div");
                        obj.fadeOut(300, function () {
                            //当天没有相片里，删除日期
                            if (obj.next("div").size() == 0 && obj.prev("div").size() == 0) {
                                obj.prev("h4").remove();
                            }
                            obj.remove();

                            if ($("#pic_box img").size() <= 0) {
                                $("#nophoto").css("display","block");
                            }

                        });
                        showPicturePidList.remove(pid);
                        if (delOnPictureShow) {
                            delOnPictureShow = false;
                            refreshPictureShow();
                        }

                       

                    }
                    else {
                        alert(res);
                    }
                });
            });
        }


        function ccc() {
            $('#ts').hide();
        }

    
    </script>
    <script src="JS/messageBox.js" type="text/javascript"></script>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
<h1><em><a href="myphoto.aspx" target="_self"></a></em>证照库 <span><a href="myphoto.aspx" target="_self">[ 返回 ]</a></span></h1>

<div id="ts">
  
  温馨提示：按相关要求法定证件照应选择近期（6个月以内）的彩色免冠正面照
<a href="javascript:ccc()">×</a>
  </div>
  <div id="pic_box">
  <span id="nophoto">相册内还没有相片，赶快去<a href="choosecertificate.aspx" target="_self">上传相片</a>吧！</span>
  
  <% =pic_list %>

  <em style="clear:both;display:block;"></em>
  </div>
</asp:Content>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PrintTemplate.aspx.cs" Inherits="XF_Web_Concise.PrintTemplate" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>我的幸福相馆 - 打印模版</title>
    <style type="text/css">
        body{font-size:14px;padding:0;margin:0;}
        #loadtable img {vertical-align:middle;}
        #loadtable {width:100px;margin-left:325px;overflow:hidden;text-align:center;}
        #printbox,#bigmbimg{display:none;}
        #printfield {padding: 3px 0;text-align: center;width:750px;height:30px;line-height:30px;background-color:rgb(238,238,238);}
        #printfield a {text-decoration: none;color:Blue;}
        #printfield a:hover {text-decoration:underline;}
        @media screen{
			img.mbimg {
				width:750px;
				height:500px;
			}
		}
		@media print{
			/*img.horizon {
				width:15.24cm;
				height:10.16cm;
			}
			img.vertical {
			    width:10.16cm;
				height:15.24cm;
			}*/
			.noprint{
				display:none;
			}
		}
    </style>
    <script src="JS/LodopFuncs.js" type="text/javascript"></script>
    <object  id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width="0" height="0">
       <embed id="LODOP_EM" type="application/x-print-lodop" width="0" height="0"></embed>
    </object>
    <script type="text/javascript">
        var pid = "<%=pid %>";
        var vcode = "<%=vcode %>";
        var smallPath = "<%=smallPath %>";
        var originalPath = "<%=originalPath %>";

        window.onload = function () {
            document.getElementById("smailmbimg").src = smallPath;
        }

        function ShowPrintField() {
            document.body.removeChild(document.getElementById("loadtable"));
            document.getElementById("printbox").style.display = "block";
            CheckIsInstall();
        }

        function PrintMB() {
            CreatePrintImage();
            LODOP.PRINT();
        }

        function PreviewMB() {
            CreatePrintImage();
            LODOP.PRINT_SETUP();
            //LODOP.PREVIEW();
        }

        function SelectPrinter() {
            LODOP = getLodop();
            LODOP.SELECT_PRINTER();
        }

        function CreatePrintImage() {
            LODOP = getLodop();
            LODOP.PRINT_INIT("Template Print Task");
            LODOP.ADD_PRINT_IMAGE(6, 0, "15.24cm", "10.16cm", "<img border='0' src='" + originalPath + "' />");
            //LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "");
            LODOP.SET_PRINT_STYLEA(0, "Stretch", 2);
        };

        function CheckIsInstall() {
            try {
                var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                if (LODOP == "download") {
                    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
                    var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
                    if (!is64IE)
                        document.getElementById("printfield").innerHTML = "<span style='color:#FF00FF;'>打印控件未安装!点击这里<a href='resources/install_lodop32.rar' target='_blank' style='decoration:underline'>执行安装</a>,安装后请刷新页面或重新进入。</span>";
                    else
                        document.getElementById("printfield").innerHTML = "<span style='color:#FF00FF;'>打印控件未安装!点击这里<a href='resources/install_lodop64.rar' target='_blank' style='decoration:underline'>执行安装</a>,安装后请刷新页面或重新进入。</span>";
                }
            } catch (err) {
                alert("Error:本机未安装或需要升级!");
            }
        };
    </script>
</head>
<body>
    <%=loadingStr + "432px;}</style>');</script>"%>
    <div id="printbox">
        <div id="smailmbfield">
            <img id="smailmbimg" class="mbimg" onload="javascript:ShowPrintField();" />
        </div>
        <div id="printfield" class="noprint">
            <a href="javascript:SelectPrinter();">[选 择 打 印 机]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:PrintMB();">[快 速 打 印]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:PreviewMB();">[预 览 设 置]</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:window.opener = null; window.open('', '_self'); window.close();">[关 闭 窗 口]</a>
        </div>
    </div>
</body>
</html>

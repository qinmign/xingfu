<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="huizhi_edzgdst.aspx.cs" Inherits="XF_Web_Concise.huizhi_edzgdst" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>
	打印回执
</title>
   
<link type="text/css" rel="Stylesheet" href="hz.css" />
<script src="../JS/jquery-1.8.2.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../JS/huizhi.js"></script>
</head>
<body>

    <form name="form1" id="form1">
    <div id="main" style="height:390px;">
   <%-- <img src="images/hzsy.gif" id="dt" alt="" />--%>
        <div id="mainbox">
            <div id="header">
                <h1>
                    <span>
                        </span>广东省第二代居民身份证数字相片采集回执</h1>
                        <h3>
                    采集服务单位：中国电信办证直通车证件用数字相片采集服务中心</h3>
             
            </div>
           
            <div id="content">  
            <p style="text-indent:24px">____________先生 / 女士 原身份证号码：________________________</p>
                    <p style="text-indent:24px;">您的相片符合《GA461-2004居民身份证制证用数字相片技术要求》，请持此回执及申请材料尽快到户口所在地派出所（办证中心）申办（本回执及数字相片60天内有效）。</p>
                    <div>
                    <p style="display:none;">*1</p>
                     <p  class="tmz">*<% =pid %>*</p>  </div>
                    <div class="zyts">                    
                    <span class="zyts">相片基本信息：</span>
                    
                    <p>相片图像号：<% =pid %></p>
                    <p>申办证件类型：广东二代证</p>
                    <p>户口(居住)地：<% =czdz  %></p> 
                    <p>采集时间：<% =scsj %></p>
                    <p>递交单位：我的幸福相馆<img alt="" src="images/tb.png" /></p>
                    <p>递交方式：个人自拍</p>
                    </div>
                
            </div>
            <div id="pic">
                <img alt="相片" src="../ShowPhoto.aspx?rtype=huizhi&pid=<%=pid %>" height="166" width="133" />
                <span class="sign">我已核实基本信息无误 <br />
并且相片为我本人      <br /><br />
                签名_________________</span>
            </div>           
        </div>
        <div id="crjts">
            <div style="text-align: center;margin-top:13px;">
                - - - -<img alt="剪刀" src="images/jdz.jpg" width="24" height="14" />- - - - - - - - - - - - - -请沿虚线剪开，并妥善保存以下相片信息至成功拿到证件- - - - - - - - - - - - - - -</div>
            <!--<div id="dxts">
                <p>相片图像号：<% =pid %>&nbsp;&nbsp;&nbsp;&nbsp;采集时间：<% =scsj %></p>
                <p>采集之日起60天内，您可以登录“我的幸福相馆”客户端免费补打本回执，详情请登录<a href="http://bzztc.gdbnet.cn/xfxg/"  target="_blank">http://bzztc.gdbnet.cn/xfxg/</a>进行了解。</p>
                <p>本回执使用过程中如有任何疑问，请及时拨打客户服务热线：020-38059396。</p>

                <div id="wxts" >
                    <span>温馨提示——二代证、居住证、驾驶证、保安员证相片都可以在家自拍啦！</span><br />
                  为满足广大群众更多的证件办理服务需求，“我的幸福相馆”在原有服务的基础上，特别推出广东省二代身份证、居住证及驾驶证、保安员证的证件相片自拍服务，在更大范围内帮助您实现“自己的证照自己照”，现在就登录“e证通”客户端体验吧！
                </div>
            </div>-->
        </div>
        
       
    </div>


    <div id="main" style="height:605px;">
    <%--<img src="images/hzsy.gif" id="dt" alt="" />--%>
        <div id="mainbox" style="height:440px;">
            <div id="header">
                <h1>
                    <span>
                        </span>（广东·<%=czdz.Substring(0,2) %>）社会保障卡数字相片采集回执</h1>
                        <h3>
                    采集服务单位：中国电信办证直通车证件用数字相片采集服务中心</h3>
             
            </div>
           
            <div id="content" style="height:380px;">  
            <p style="text-indent:24px">____________先生 / 女士 身份证号码：________________________</p>
                    <p style="text-indent:24px;">您的相片符合《汕头市社会保障卡数字相片技术要求》，请持此回执和申请材料及时到当地社保管理部门申办（本回执及数字相片半年内有效）。</p>
                    <div>
                    <p style="display:none;">*1</p>
                     <p  class="tmz">*<% =pid %>*</p>  </div>

                     <div>
                     <span class="zyts">重要提示：</span>
                     <p style="text-indent:2em">(1)社会保障卡数字相片的拍摄以社会保障卡服务部门（社保经办机构、街道镇人社所、村居、服务银行）通知为准，没有被要求提供制卡相片的暂不用拍摄。</p>
                     <p style="text-indent:2em">(2)拍摄社会保障卡数字相片时取得的居民身份证数字相片采集回执，在回执及相片有效期内可用于申办居民身份证，请注意保管好相关回执。</p>
                     </div>


                    <div class="zyts">                    
                    <span class="zyts">相片基本信息：</span>
                    
                    <p>相片图像号：<% =pid %></p>
                    <p>申办证件类型：社会保障卡</p>
                    <p>户口(居住)地：<% =czdz  %></p> 
                    <p>采集时间：<% =scsj %></p>
                    <p>递交单位：我的幸福相馆<img alt="" src="images/tb.png" /></p>
                    <p>递交方式：个人自拍</p>
                    </div>
                
            </div>
            <div id="pic" style="height:390px;">
                <img alt="相片" src="../ShowPhoto.aspx?rtype=huizhi&pid=<%=pid %>" height="166" width="124" />
                <span class="sign">我已核实基本信息无误 <br />
并且相片为我本人      <br /><br />
                签名_________________</span>
            </div>           
        </div>
        <div id="crjts">
            <div style="text-align: center;">
                ----<img alt="剪刀" src="images/jdz.jpg" width="24" height="14" />---------------------------请沿虚线剪开，并妥善保存以下相片信息至成功拿到证件--------------------------------</div>
            <div id="dxts">
               <p>相片图像号：<% =pid %>&nbsp;&nbsp;&nbsp;&nbsp;采集时间：<% =scsj %></p>
                <p>采集之日起60天内，您可以登录“我的幸福相馆”客户端免费补打本回执，详情请登录<a href="http://bzztc.gdbnet.cn/xfxg/"  target="_blank">http://bzztc.gdbnet.cn/xfxg/</a>进行了解。</p>
                <p>本回执使用过程中如有任何疑问，请及时拨打客户服务热线：020-38059396。</p>

                <div id="wxts" >
                    <span>温馨提示——二代证、居住证、驾驶证、保安员证相片都可以在家自拍啦！</span><br />
                    为满足广大群众更多的证件办理服务需求，“我的幸福相馆”在原有服务的基础上，特别推出广东省二代身份证、居住证及驾驶证、保安员证的证件相片自拍服务，在更大范围内帮助您实现“自己的证照自己照”，现在就登录“e证通”客户端体验吧！
                </div>
            </div>
        </div>
        
       
    </div>
    
     <div id="printfield">
            <a href="javascript:printhz()">
                打印回执</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="javascript:window.opener = null; window.open('', '_self'); window.close();">关闭窗口</a>
                    </div>
    </form>
</body>
</html>


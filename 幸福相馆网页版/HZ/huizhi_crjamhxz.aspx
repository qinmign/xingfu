<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="huizhi_crjamhxz.aspx.cs" Inherits="XF_Web_Concise.huizhi_crjamhxz" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>
	打印回执
</title>
    <style type="text/css">
      
    </style>
<link type="text/css" rel="Stylesheet" href="hz.css" />
<script src="../JS/jquery-1.8.2.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../JS/huizhi.js"></script>


</head>
<body>

    <form name="form1" id="form1">
   
    <div id="main">
   <%-- <img src="images/hzsy.gif" id="dt" alt="" />--%>
        <div id="mainbox">
            <div id="header">
                <h1>
                    <span>
                        </span>港澳居民來往內地通行證數字相片採集回執</h1>
                        <h3>
                    採集服務單位：中國電信辦證直通車證件用數字相片采集服務中心</h3>
             
            </div>
           
            <div id="content">
            
                    <p style="text-indent:24px;">您的相片符合《中華人民共和國出入境證件數字相片技術要求》，請持此回執及身份證、戶口本原件盡快到戶口所在地出入境管理部門申辦（本回執及數字相片個月內有效）。</p>
                    <div>
                    <p style="display:none;">*1</p>
                     <p  class="tmz">*<% =pid %>*</p>  </div>
                    <div class="zyts">                    
                    <span class="zyts">相片基本信息：</span>
                    
                    
                    
<p>相片圖像號：<% =pid %></p>
<p>申辦證件類型：港澳居民來往內地通行證</p>
<%--<p>戶口(居住)地：<% =czdz  %></p> --%>
<p>采集時間：<% =scsj %></p>
<p>遞交單位：我的幸福相館<img alt="" src="images/tb.png" /></p>
<p>遞交方式：個人自拍</p>
</div>
                
            </div>
            <div id="pic">
                <img alt="相片" src="../ShowPhoto.aspx?rtype=hz&pid=<%=pid %>" height="166" width="124" />
                <span class="sign">我已核實基本信息無誤 <br />
並且相片爲我本人      <br /><br />
                簽名_________________</span>
            </div>           
        </div>
        <div id="crjts">
            <div style="text-align: center;">
                ----<img alt="剪刀" src="images/jdz.jpg" width=";" height="'" />---------------------------請沿虛線剪開，並妥善保存以下相片信息至成功拿到證件--------------------------------</div>
            <div id="dxts">
               <p>相片圖像號：<% =pid %>&nbsp;&nbsp;&nbsp;&nbsp;采集時間：<% =scsj %></p>
<p>采集之日起0天內，您可以登錄“我的幸福相館”客戶端免費補打本回執，詳情請登錄<a href="http://bzztc.gdbnet.cn/xfxg/"  target="_blank">http://bzztc.gdbnet.cn/xfxg/</a>進行了解。</p>
<p>本回執使用過程中如有任何疑問，請及時撥打客戶服務熱線：00-0-'。</p>

                <div id="wxts" >
                    <span>溫馨提示——二代證、居住證、駕駛證、保安員證相片都可以在家自拍啦！</span><br />
                   爲滿足廣大群衆更多的證件辦理服務需求，“我的幸福相館”在原有服務的基礎上，特別推出廣東省二代身份證、居住證及駕駛證、保安員證的證件相片自拍服務，在更大範圍內幫助您實現“自己的證照自己照”，現在就登錄“e證通”客戶端體驗吧！
                </div>
            </div>
        </div>
        
       
    </div>
     <div id="printfield">
            <a href="javascript:printhz()">
                打印回執</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="javascript:window.opener = null; window.open('', '_self'); window.close();">關閉窗口</a>
                    </div>
    </form>
</body>
</html>


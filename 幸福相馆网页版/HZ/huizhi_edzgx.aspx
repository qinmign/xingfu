<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="huizhi_edzgx.aspx.cs" Inherits="XF_Web_Concise.huizhi_edzgx" %>

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
    <div id="main" style="height:430px;">
   <%-- <img src="images/hzsy.gif" id="dt" alt="" />--%>
        <div id="mainbox" style="height:416px;">
            <div id="header">
                <h1>
                    <span>
                        </span>广西籍在粤人员第二代居民身份证数字相片采集回执</h1>
                        <h3>
                    采集服务单位：中国电信办证直通车证件用数字相片采集服务中心</h3>
             
            </div>
           
            <div id="content" style="height:322px;">  
            <p style="text-indent:24px">____________先生 / 女士 原身份证号码：________________________</p>
                    <p style="text-indent:24px;">您的相片符合《GA461-2004居民身份证制证用数字相片技术要求》，凭此回执及委托书，可由被委托人在户籍所在地派出所申办二代证（本回执及数字相片90天内有效）。</p>
                    <div>
                    <p style="display:none;">*1</p>
                     <p  class="tmz">*<% =pid %>*</p>  </div>
                    <div class="zyts">                    
                    
                    <span class="zyts">相片基本信息：</span>
                    
                    <div>
                        <div style="float:left;width:250px;">
                            <p>相片图像号：<% =pid %></p>
                            <p>申办证件类型：广西二代证</p>
                            <p>户口(居住)地：<% =czdz  %></p>
                        </div>
                        <div style="float:left;width:250px;">
                            <p>采集时间：<% =scsj %></p>
                            <p>递交单位：我的幸福相馆<img alt="" src="images/tb.png" /></p>
                            <p>递交方式：个人自拍</p>
                        </div>
                    </div>
                    <div class="zyts" style="padding:10px 0 0 0;clear:both;">
                         <span class="zyts">重要提示：</span>                         
                         <p>本回执使用过程中如有任何疑问，请及时拨打客户服务热线：020-38059396。</p>
                         <p>如遇到办证困难，请在正常办公时间拨打广西公安厅户政管理部门咨询电话：0771-2892339。</p>
                         <p>采集之日起90天内，您可以登录“我的幸福相馆”客户端免费补打本回执，详情请登录</p>
                         <p><a href="http://bzztc.gdbnet.cn/xfxg/"  target="_blank">http://bzztc.gdbnet.cn/xfxg/</a>进行了解。</p>
                    </div>

                    </div>
                    
                
            </div>
            <div id="pic" style="height:322px;">
                <img alt="相片" src="../ShowPhoto.aspx?rtype=huizhi&pid=<%=pid %>" height="166" width="133" />
                <span class="sign">我已核实基本信息无误 <br />并且相片为我本人<br /><br />
                签名_________________</span>
            </div>
            <div style="width:100%;clear:both;text-align:center;margin:0 auto;">[注：回执及委托书须用A4规格纸张打印在一起才有效]</div>    
        </div>        
       
    </div>


    <div id="main" class="delegate" style="height:495px;">
        <h1>委&nbsp;&nbsp;托&nbsp;&nbsp;书</h1>
        <p style="text-indent:2em;">因本人长期在外，现委托<span class="b_line" style="width:130px;"></span>凭本人签字的《广西籍在粤人员第二代居民身份证数字相片采集回执》代理申办第二代居民身份证，并由被委托人持本人居民户口簿到户籍地公安派出所履行户口核对手续。本人保证申报信息真实准确，如有虚假，本人承担法律责任。</p>
        <p>委托人（签名）：<span class="b_line" style="width:130px;"></span>公民身份证号码：<span class="b_line" style="width:310px;"></span></p>
        <p>委托人现居住地址：<span class="b_line" style="width:559px;"></span></p>
        <p>委托人联系电话：<span class="b_line" style="width:575px;"></span></p>

        <p>被委托人（签名）：<span class="b_line" style="width:130px;"></span>公民身份证号码：<span class="b_line" style="width:293px;"></span></p>
        <p>与委托人关系：<span class="b_line" style="width:150px;"></span>联系电话：<span class="b_line" style="width:358px;"></span></p>
        <p><span class="b_line" style="width:100%;margin:28px 0 10px 0;border-bottom:1px solid gray;"></span></p>
        <p style="font-weight:bold;">如遇办证民警提示人口信息库中无委托人历史相片的，请携带委托人旧身份证原件或者由居（村）委会在本委托书签字盖章确认该相片是申办者本人。</p>
        <div class="b_tip"><div style="font-size:22px;font-weight:bold;width:460px;">经核实：此相片是委托人本人相片。</div><div><p>居（村）委会（章）</p><p>负责人签名：<span class="b_line" style="width:150px;"></span></p></div></div>
    </div>
    
     <div id="printfield">
            <a href="javascript:printhz()">
                打印回执</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:window.opener = null; window.open('', '_self'); window.close();">关闭窗口</a>
    </div>
    </form>
</body>
</html>


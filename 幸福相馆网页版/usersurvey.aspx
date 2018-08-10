<%@ Page Title="" Language="C#" MasterPageFile="~/XF2.Master" AutoEventWireup="true" CodeBehind="usersurvey.aspx.cs" Inherits="XF_Web_Concise.usersurvey" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 用户满意度调查
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/main2.css" rel="stylesheet" type="text/css" />
    <link href="CSS/usersurvey.css" rel="stylesheet" type="text/css" />
    <script src="JS/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="JS/usersurvey.js" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div class="content">
        <div class="headbg"></div>
        <div class="survey_box">
            <p style="font-size:16px;"><strong>尊敬的用户:</strong></p>
            <p style="text-indent:2em;font-size:16px;"><strong>您好！“我的幸福相馆”自2011年3月开通服务以来，专注于提供各类证件照的专业处理、采集及冲印服务，致力于实现广大群众“在家自拍证照”的愿望。我们的服务尚在发展阶段，创新便民服务模式难免会有一些不足之处，希望能得到您积极的支持与宝贵的建议，帮助我们不断提升服务技术与水平，您的肯定和支持是我们业务发展进步的最大的动力。</strong></p>
            
            <p class="w_title">1、您是从什么渠道了解到“我的幸福相馆”的？</p>
            <p><input type="radio" name="channel" id="channelA" value="A" class="channel" /><label for="channelA">A 相片采集回执</label></p>
            <p><input type="radio" name="channel" id="channelB" value="B" class="channel" /><label for="channelB">B 出入境政务网</label></p>
            <p><input type="radio" name="channel" id="channelC" value="C" class="channel" /><label for="channelC">C 出入境办证大厅服务宣传单</label></p>
            <p><input type="radio" name="channel" id="channelD" value="D" class="channel" /><label for="channelD">D 办证直通车综合信息服务平台</label></p>
            <p><input type="radio" name="channel" id="channelE" value="E" class="channel" /><label for="channelE">E 新闻报道</label></p>
            <p><input type="radio" name="channel" id="channelF" value="F" class="channel" /><label for="channelF">F 微博</label></p>
            <p><input type="radio" name="channel" id="channelG" value="G" class="channel" /><label for="channelG">G 亲朋好友介绍</label></p>
            <p><input type="radio" name="channel" id="channelH" value="H" class="channel" /><label for="channelH">H 其他（请填写）</label><input type="text" id="channelTxt" class="txtform"/></p>

            <p class="w_title">2、您选择“我的幸福相馆”而没有去照相馆的原因？（可多选）</p>
            <p><input type="checkbox" name="choosereason" id="crA" value="A" class="choosereason" /><label for="crA">A 省钱</label></p>
            <p><input type="checkbox" name="choosereason" id="crB" value="B" class="choosereason" /><label for="crB">B 方便</label></p>
            <p><input type="checkbox" name="choosereason" id="crC" value="C" class="choosereason" /><label for="crC">C 满意度更高</label></p>
            <p><input type="checkbox" name="choosereason" id="crD" value="D" class="choosereason" /><label for="crD">D 自己动手拍更有成就感</label></p>
            <p><input type="checkbox" name="choosereason" id="crE" value="E" class="choosereason" /><label for="crE">E 不喜欢被别人照相摆来摆去</label></p>
            <p><input type="checkbox" name="choosereason" id="crF" value="F" class="choosereason" /><label for="crF">F 其他（请填写）</label><input type="text" id="crTxt" class="txtform"/></p>
 
            <p class="w_title">3、您对“我的幸福相馆”处理出来的证件照满意吗？ </p>
            <p><input type="radio" name="satisfaction" id="satisfactionA" value="A" class="satisfaction" /><label for="satisfactionA">A 满意</label></p>
            <p><input type="radio" name="satisfaction" id="satisfactionB" value="B" class="satisfaction" /><label for="satisfactionB">B 不满意（请填写不满意原因）</label><input type="text" id="satisfactionTxt" class="txtform" /></p>

            <p class="w_title">4、您倾向于使用“我的幸福相馆”网页版还是客户端软件？</p>
            <p><input type="radio" name="usertend" id="usertendA" value="A" class="usertend" /><label for="usertendA">A 网页版</label></p>
            <p><input type="radio" name="usertend" id="usertendB" value="B" class="usertend" /><label for="usertendB">B 客户端软件</label></p>

            <p class="w_title">5、您期待“我的幸福相馆”推出手机客户端吗？</p>
            <p><input type="radio" name="phoneclient" id="phoneclientA" value="A" class="phoneclient"  /><label for="phoneclientA">A 很期待</label></p>
            <p><input type="radio" name="phoneclient" id="phoneclientB" value="B" class="phoneclient"  /><label for="phoneclientB">B 无所谓</label></p>

            <p class="w_title">6、“我的幸福相馆”是否为您办证照相带来了便利？</p>
            <p><input type="radio" name="convenient" id="convenientA" value="A" class="convenient"  /><label for="convenientA">A 是</label></p>
            <p><input type="radio" name="convenient" id="convenientB" value="B" class="convenient"  /><label for="convenientB">B 否</label></p>

            <p class="w_title">7、“我的幸福相馆”目前服务时间为8:00-22:30，您对服务时间是否满意？</p>
            <p><input type="radio" name="serviceTime" id="serviceTimeA" value="A" class="serviceTime"  /><label for="serviceTimeA">A 满意</label></p>
            <p><input type="radio" name="serviceTime" id="serviceTimeB" value="B" class="serviceTime"  /><label for="serviceTimeB">B 不满意（请填写您期待的服务时间）</label><input type="text" id="serviceTimeTxt" class="txtform" /></p>

            <p class="w_title" style="padding-bottom:10px;">8、您还希望“我的幸福相馆”提供哪些服务？（请填写）</p>
            <p><input type="text" id="serviceTxt" class="txtform" /></p>


            <p class="w_title">9、您认为“我的幸福相馆”网页版还有哪些地方需要改善？您的建议是？（可多选）</p>
            <p><input type="checkbox" name="improve" id="improveA" value="A" class="improve" /><label for="improveA">A 界面设计，存在问题：</label><input type="text" id="ProblemTxtA" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtA" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveB" value="B" class="improve" /><label for="improveB">B 操作流程，存在问题：</label><input type="text" id="ProblemTxtB" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtB" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveC" value="C" class="improve" /><label for="improveC">C 加载速度，存在问题：</label><input type="text" id="ProblemTxtC" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtC" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveD" value="D" class="improve" /><label for="improveD">D 递交相片，存在问题：</label><input type="text" id="ProblemTxtD" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtD" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveE" value="E" class="improve" /><label for="improveE">E 证照处理，存在问题：</label><input type="text" id="ProblemTxtE" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtE" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveF" value="F" class="improve" /><label for="improveF">F 支付订单，存在问题：</label><input type="text" id="ProblemTxtF" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtF" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveG" value="G" class="improve" /><label for="improveG">G 下载相片，存在问题：</label><input type="text" id="ProblemTxtG" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtG" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveH" value="H" class="improve" /><label for="improveH">H 打印回执，存在问题：</label><input type="text" id="ProblemTxtH" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtH" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveI" value="I" class="improve" /><label for="improveI">I 证照查询，存在问题：</label><input type="text" id="ProblemTxtI" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtI" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveJ" value="J" class="improve" /><label for="improveJ">J 其他方面，存在问题：</label><input type="text" id="ProblemTxtJ" class="txtform suggestTxt"  />改进意见：<input type="text" id="improveTxtJ" class="txtform suggestTxt"  /></p>
            <p><input type="checkbox" name="improve" id="improveK" value="K" class="improve" /><label for="improveK">K 增加功能，例如：</label><input type="text" id="SampleTxtK" class="txtform"  /></p>
            
            <br />
            <br />
            <a class="colorbtn submitbtn" href="javascript:SubmitAnswer();">提交</a>
        </div>
    </div>
</asp:Content>

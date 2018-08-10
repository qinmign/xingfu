<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true"
    CodeBehind="aboutUs.aspx.cs" Inherits="XF_Web_Concise.aboutUs" %>

<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
    关于我们
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/aboutUs.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="JS/aboutUs.js"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div id="body-div">
        <a id="goto-homepage" href="qt.aspx">首页 ></a><span> 关于我们</span>
        <div id="contend-div" class="clearfloat">
            <div id="list" class="float_l">
                <label id="tag1">
                    关于我们</label>
                <label id="tag2">
                    欢迎辞</label>
                <label id="tag3">
                    相关新闻</label>
                <label id="tag4">
                    客服支持</label>
                <label id="tag5">
                    意见反馈</label>
                <label id="tag6">
                    版权声明</label>
            </div>
            <label id="arrow" class="float_l">
            </label>
            <div id="tag-contend">
                <div id="tag1content" class="float_l" style="display: none">
                    <span class="tag4p1">关于我们</span>
                    <p>
                        “我的幸福相馆”是幸福360综合信息服务网为实现广大摄影爱好者“在家自拍证照”的服务愿景而特别推出的“一站式”服务品牌。“我的幸福相馆”模拟传统照相馆的服务场景，利用现代科技打造网络仿真相馆，为广大群众提供相片自拍、相片管理、相片冲印、相片制作等个性化便民服务，打破传统相馆的服务局限，让群众拍出更满意的证件照。</p>
                    <p>
                        追求美、追求便利是每个人的天性，大家都希望时刻展现出自己最好的一面，除了个人的外表、修养之外，证件也代表着一个人的“面子”，一张满意的证件照所带来的幸福感伴随一生；同时，人们也希望更加便捷地享受各类服务，最好是坐在家中就能全部搞定。以往，证件照只能在照相馆或办证厅照相点拍摄，群众常常需要多次往返相馆拍照、取相，而且由于时间仓促或准备不足等原因，还常常无法拍出最满意的相片，既影响了证件上的“形象”，又耗神耗力。随着时代的发展，数码相机已进入寻常百姓家庭，广大摄影爱好者的拍摄技术也迅速提高，迫切希望能够实现“在家自拍证照”。一方面，“在家自拍”让群众有充足的准备与拍摄时间，真正做到“想怎么拍就怎么拍，想拍多靓就拍多靓”；另一方面，“在家自拍”让证照拍摄变得更加简单方便，实现满意证照自己拍。</p>
                    <p>
                        为帮助广大群众实现“在家自拍证照”这一美好愿望，幸福360组织技术研发攻关，推出“我的幸福相馆”个性化便民服务，通过网页与客户端软件两种途径相结合的在线服务模式，有效降低了群众参与相片采集的技术门槛，通过直接采集群众自拍的相片原图来确保相片的真实性和时效性，打破传统拍摄证件照必须去照相馆或办证厅照相点的局限。群众只要具备一定的摄影基础，就能在家自己拍证照，并将拍摄的数码相片原图通过“我的幸福相馆”网站或“我的幸福相馆”客户端实时递交，经过在线自动裁剪和智能过滤处理成为符合要求的不同规格的证件相片，群众自行打印相片和采集回执，带齐相关材料就可前往办证大厅申请证件了，整个流程操作简单，十分便捷。对于没有打印设备的群众，可选择“我的幸福相馆”提供的在线代工服务，通过快递足不出户获取相片回执和贴表相。</p>
                    <p>
                        “我的幸福相馆”以满足各种行业应用的相片采集服务为切入点，依托互联网实现传统照相馆的各种相片服务，不断丰富个性化深度应用，搭建了一个操作简单、使用方便的网上“幸福相馆”，帮助群众将自己最美的一面展示出来，与传统照相馆一道，切实提升群众在照相过程中的幸福感，为构建和谐社会和“幸福中国”建设给力。</p>
                </div>
                <div id="tag2content" class="float_l" style="display: none">
                    <span class="tag4p1">欢迎辞</span>
                    <p style="text-indent: 0em; margin-top: 10px;">
                        尊敬的各位用户：</p>
                    <p>
                        欢迎您来到“我的幸福相馆”！</p>
                    <p>
                        “我的幸福相馆”是专注于通过互联网为广大摄影爱好者提供操作简单、使用方便的 “一站式”相片综合服务的个性化服务平台，通过模拟传统照相馆的服务场景，利用现代科技打造网络仿真相馆，帮助广大用户实现“在家自拍证照”的美好愿望。您只要拥有一台数码相机或高像素的手机，就能够轻松在家自拍相片，并将原图递交到“我的幸福相馆”在线实时制作成为满足要求的数码证照，用于办理证件或其他相关应用。“我的幸福相馆”也是您的标准相片管理中心，满足您多种个性化需求，您可以轻松对自己的标准相片进行存储、下载等管理操作，如果没有打印设备，您还可选择在线代工服务，由快递将打印好的相片送货上门，实现足不出户的绿色低碳生活。“我的幸福相馆”将传统相馆业务与网络服务相结合，突破传统照相行业的服务局限，给您多一种选择，与传统照相馆一道，切实提升您在照相环节的幸福感。</p>
                    <p>
                        我们的服务尚在发展阶段，创新便民服务模式难免会有一些不足之处，希望能得到您积极的支持与宝贵的意见，帮助我们提升服务水平与服务质量。未来，我们还将继续针对广大群众照相过程遇到的各种难题，推出更多专业服务，完善服务体系，为构建和谐社会和建设
                        “幸福中国”给力。</p>
                    <p>
                        在此，特别感谢各级政府、公安机关给予本平台的业务指导和技术支持，感谢各行业相关机构的大力帮助与积极配合！</p>
                    <p style="text-align: right;">
                        幸福360综合信息服务网</p>
                </div>
                <div id="tag3content" class="float_l" style="display: none">
                    <span class="tag4p1">相关新闻</span>
                    <ul>
                        <li><a href="news/news60.html" target="_blank">外地人在广州办护照细则公布 收费相同</a></li>
                        <li><a href="news/news59.html" target="_blank">后日起外地人能在穗办出入境证件 4种方式查进度</a></li>
                        <li><a href="news/news57.html" target="_blank">非重庆市户籍人员可直接在渝办理出入境证件</a></li>
                        <li><a href="news/news56.html" target="_blank">深圳下月起可实现赴台个人游</a></li>
                        <li><a href="news/news55.html" target="_blank">深圳赴台个人游今受理申请</a></li>
                        <li><a href="news/news54.html" target="_blank">异地就业者在读大学生可在广州办出入境证件</a></li>
                        <li><a href="news/news53.html" target="_blank">穗深外来就业人员下月可就地办护照</a></li>
                        <li><a href="news/news52.html" target="_blank">广深外地人 赴港出国办证不用返乡</a></li>
                        <li><a href="news/news51.html" target="_blank">公安部推出便民利民新举措</a></li>
                        <li><a href="news/news47.html" target="_blank">港澳通行证可跨镇办理 申请再次签注无需填表</a></li>
                    </ul>
                </div>
                <div id="tag4content" class="float_l" style="display: none">
                    <p class="tag4p1">
                        客服支持</p>
                    <p class="tag4p2">
                        网站尚在发展阶段，创新便民服务模式难免会有一些不足之处，希望能得到您积极的支持与宝贵的建议，帮助我们提升服务水平与服务质量，您的肯定和支持是我们业务发展进步最大的动力。</p>
                    <div id="kfxx">
                        <div style="float: left">
                            <label class="lbl1">
                                服务热线：020-38059396</label>
                            <label class="lbl2">
                                服务邮箱：xfxg4008309916@163.com</label>
                            <label class="lbl3">
                                服务时间：8:00~22:30<span style="font-weight: bold;">（节假日照常上班）</span></label>
                        </div>
                        <div style="float: right">
                            <img src="css/images/bz/about_woman.jpg">
                        </div>
                    </div>
                </div>
                <div id="tag5content" class="float_l" style="display: none">
                    <span class="tag4p1">意见反馈</span>
                    <p style="color: #D9E4EA">
                        --------------------------------------------------------------------------------------------------------------------------</p>
                    <p class="tag5p2">
                        我们的服务尚在发展阶段，创新便民服务模式难免会有一些不足之处，希望能得到您积极的支持与宝贵的建议，帮助我们不断提高服务技术与水平，您的肯定和支持是我们业务发展进步最大的动力。</p>
                    <span class="tag4p1" style="display: block">您的留言</span>
                    <div class="clearfloat">
                        <textarea id="suggestion" class="float_l" rows="" cols=""></textarea>
                        <div id="yhfk" class="float_l">
                        </div>
                    </div>
                    <p class="tag5p3">
                        请填写您的手机号码及电子邮箱，如果需要进一步处理，我们的客服会及时与您取得联系，优化解决您所反映的问题。</p>
                    <div>
                        <table id="tb" border="0" cellspacing="0" cellpadding="0" width="100%">
                            <tr>
                                <td class="td-left">
                                    <p>
                                        手机号码：</p>
                                </td>
                                <td>
                                    <input id="phone" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td class="td-left">
                                    <p>
                                        电子邮箱：</p>
                                </td>
                                <td>
                                    <input id="email" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <td class="td-left">
                                </td>
                                <td>
                                    <a id="submit">提 交</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="tag6content" class="float_l" style="display: none">
                    <span class="tag4p1">版权声明</span>
                    <p>
                        幸福360综合信息服务网（“本平台”）独立拥有本网站内相关内容（包括但不限于文字、图片、音频、视频、网页设计、网页编排）的版权和其他相关知识产权，独立拥有“我的幸福相馆”客户端软件相关的多项专利技术，受中国法律保护。未经本平台书面许可，任何单位及个人不得以任何方式或理由对上述本平台拥有版权、专利技术或其他知识产权的内容、商标的任何部分进行使用、复制、修改、抄录、传播或与其它产品捆绑使用、销售。</p>
                    <p>
                        违反上述声明而给本平台造成损失的，本平台将依据中华人民共和国《专利法》、《著作权法》、《计算机软件保护条例》等相关法律、法规追究其经济和法律责任。</p>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
    </div>
</asp:Content>

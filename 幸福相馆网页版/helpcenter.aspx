<%@ Page Title="" Language="C#" MasterPageFile="~/XF.Master" AutoEventWireup="true" CodeBehind="helpcenter.aspx.cs" Inherits="XF_Web_Concise.helpcenter" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
帮助中心
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <link href="CSS/help.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="js/help.js"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
<div id="body-div">
        <div id="navigation-div" class="navigation"><a id="goto-homepage" href="qt.aspx">首页 > </a><a id="expand_all">帮助中心 > </a><a id="item_name"></a><span id="detail_name"></span></div>
        <div class="content" class="clearfloat">
            <div id="content-div" class="float_l">
                <div class="content-title">&nbsp&nbsp 帮助中心</div>
                <div>
                    <div id="item1"><label id="label1" class="expand-icon expand">新手指南</label></div>
                    <div id="list1">
                        <ul>
                    	    <li><a id="a10" href="javascript:loaddetail(10,1);">操作流程</a></li>
                            <li><a id="a11" href="javascript:loaddetail(11,1);">找回密码</a></li>
                            <li><a id="a12" href="javascript:loaddetail(12,1);">服务收费</a></li>
                            <li><a id="a13" href="javascript:loaddetail(13,1);">用户管理</a></li>
                            <li><a id="a14" href="javascript:loaddetail(14,1);">冲印说明</a></li>
                        </ul> 
                    </div>                       
                </div>
                <div>
                    <div id="item2"><label id="label2" class="expand-icon expand">常见问题</label></div>
                    <div id="list2">
                        <ul>
                    	    <li><a id="a20" href="javascript:loaddetail(20,2);">注册登录</a></li>
                            <li><a id="a21" href="javascript:loaddetail(21,2);">证照拍摄</a></li>
                            <li><a id="a22" href="javascript:loaddetail(22,2);">递交处理</a></li>
                            <li><a id="a23" href="javascript:loaddetail(23,2);">冲印服务</a></li>
                            <li><a id="a24" href="javascript:loaddetail(24,2);">我的订单</a></li>
                            <li><a id="a25" href="javascript:loaddetail(25,2);">回执打印</a></li>
                            <li><a id="a26" href="javascript:loaddetail(26,2);">支付问题</a></li>
                        </ul> 
                     </div>
                </div>
                <div>
                    <div id="item3"><label id="label3" class="expand-icon expand">支付方式</label></div>
                    <div id="list3">
                        <ul>
                    	    <li><a id="a30" href="javascript:loaddetail(30,3);">电子钱包支付</a></li>
                            <li><a id="a31" href="javascript:loaddetail(31,3);">第三方支付</a></li>
                        </ul> 
                    </div>
                </div>
                <div>
                    <div id="item4"><label id="label4" class="expand-icon expand">配送服务</label></div>
                    <div id="list4">
                        <ul>
                    	    <li><a id="a40" href="javascript:loaddetail(40,4);">配送服务标准</a></li>                            
                        </ul> 
                    </div>
                </div>
            </div>
            <div id="detail-div" class="float_l">
                <strong id="detail_name2"></strong>
                <p class="interval-line">------------------------------------------------------------------------------------------------------------------------------</p>
                <div id="detail" class="mini-detail">                    
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/XF2.Master" AutoEventWireup="true" CodeBehind="photosearch.aspx.cs" Inherits="XF_Web_Concise.photosearch" %>
<asp:Content ID="Content1" ContentPlaceHolderID="mTitle" runat="server">
我的幸福相馆 - 相片查询
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="mHead" runat="server">
    <style type="text/css">
        .search_box{width:998px;height:400px;display:block;margin:20px auto 40px;border:1px solid rgb(222,231,236);}
        .print_head {width:983;height:45px;background-color:rgb(250,250,250);border-bottom:1px solid rgb(222,231,236);font-size:16px; padding-left:15px;line-height:45px;}
        .txtform{width:230px;height:25px;border:1px solid rgb(221,221,221);outline:0;padding:3px 3px 0;font-size:15px;}
        .colorbtn{display:block;text-align:center;color:White;text-decoration:none;}
        .searchbtn{width:110px;height:35px;font-size:17px;background-color:rgb(15,166,237);line-height:35px;display:inline-block;}    
        .searchbtn:hover{background-color:#0066FF;}
        #searchtable{margin:80px 0 0 340px;}
        #searchtable td{height:40px;}
        #resulttable{vertical-align:middle;border-collapse:collapse;margin:60px 0 0 90px;display:none;}
        #resulttable td{width:270px;}
        #resulttable .firsttr{height:160px;text-align:center;}
        #resulttable .firsttr td{border:1px solid rgb(209,209,209);}
        #resulttable .secondtr{height:70px;text-align:center;}
        #resulttable img{display:inline-block;}
        #resulttable p{text-align:left;margin-left:20px;font-size:15px;height:25px;}
    </style>
    <script src="JS/jquery-1.8.2.min.js" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="mBody" runat="server">
    <div class="search_box">
        <div class="print_head">打印相片</div>
        
        <table id="searchtable">
            <tr><td><input autocomplete="off" id="pidtxt" class="txtform" type="text" /></td></tr>
            <tr><td><input autocomplete="off" id="pwdtxt" class="txtform" type="text" /></td></tr>
            <tr><td><a class="searchbtn colorbtn" href="javascript:photosearch();">查询相片</a></td></tr>
        </table>

        <table id="resulttable">
            <tr class="firsttr"><td><img src="CSS/images/1.png" /></td><td><img src="CSS/images/2.png" /></td><td><p>图 像 号：F14031422284900</p><p>采集时间：2013-12-12 09:21:45</p><p>证件类型：港澳台居民出入境证件</p><p>回执有效期：至:2013-12-12</p></td></tr>
            <tr class="secondtr"><td><a class="searchbtn colorbtn" href="javascript:photosearch();">打印模版</a></td><td><a class="searchbtn colorbtn" href="javascript:photosearch();">打印回执</a></td><td><a class="searchbtn colorbtn" href="javascript:photosearch();">重新查询</a></td></tr>
        </table>

    </div>

    <script type="text/javascript">
        function photosearch() {
            $("#searchtable").hide();
            $("#resulttable").show();
        }
    </script>
</asp:Content>

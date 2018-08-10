$(function () {
    var pageName = window.location.pathname.toLowerCase();
    if (pageName.indexOf("qt.aspx") == -1 && pageName.indexOf("orderdetails.aspx") == -1 && $("#toppad").size() > 0) {

        var htmlString = '<div style="display:none;cursor:pointer;"><img src="CSS/images/notice/gg_01.png?v=1.1" alt="" /></div><div style="cursor:pointer;"><img src="CSS/images/notice/gg_02.png" alt="" /></div>';
        $("#toppad").append(htmlString);

        var timer;
        $("#toppad div").eq(0).click(function () {
            window.clearTimeout(timer);
            $("#toppad div").eq(0).hide();
            $("#toppad div").eq(1).slideDown("slow");
        });

        $("#toppad div").eq(1).click(function () {
            window.clearTimeout(timer);
            $("#toppad div").eq(1).slideUp("slow", function () {
                $("#toppad div").eq(0).slideDown();
            });
        });

        timer = window.setTimeout(function () {
            $("#toppad div").eq(1).slideUp("slow", function () {
                $("#toppad div").eq(0).slideDown();
            });
        }, 20000);
    }
    else
        $("#toppad").remove();
});
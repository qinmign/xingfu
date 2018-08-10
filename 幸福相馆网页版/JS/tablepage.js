function gettitle(c, n, m) {
    ShowCerHZ(n);
    var i;
    if (m == undefined) {
        for (i = 1; i <= c; i++) {
            if (i == n) {
                document.getElementById("a" + i).innerHTML = "" + i + "";
                document.getElementById("page" + i).style.display = "block";
            }
            else {
                document.getElementById("page" + i).style.display = "none";
                document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + i + ")'>[" + i + "]</a>";
            }
        }
    }

    else {
        for (i = 1; i <= c; i++) {
            if (i == n) {
                document.getElementById("page" + i).style.display = "block";
            }
            else {
                document.getElementById("page" + i).style.display = "none";
            }
        }

        if (n <= m / 2 + 1) {
            for (i = 1; i <= m + 1; i++) {
                if (i == n) {
                    document.getElementById("a" + i).innerHTML = "" + i + "";
                }
                else if (i < n || i < m) {
                    document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + i + "," + m + ")'>[" + i + "]</a>";
                }
                else if (i == m) {
                    document.getElementById("a" + i).innerHTML = "...";
                }
                else if (i == m + 1) {
                    document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + c + "," + m + ")'>[" + c + "]</a>";
                }
            }
        }
        else if (n >= c - m / 2) {
            for (i = 1; i <= m + 1; i++) {
                if (i == 1) {
                    document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + 1 + "," + m + ")'>[" + 1 + "]</a>";
                }
                else if (i == 2) {
                    document.getElementById("a" + i).innerHTML = "...";
                }
                else if (n == c - m - 1 + i) {
                    document.getElementById("a" + i).innerHTML = "" + n + "";
                }
                else {
                    var nn = c - m - 1 + i;
                    document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + nn + "," + m + ")'>[" + nn + "]</a>";
                }
            }
        }
        else {
            for (i = 1; i <= m + 1; i++) {
                if (i == 1) {
                    document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + 1 + "," + m + ")'>[" + 1 + "]</a>";
                }
                else if (i == 2) {
                    document.getElementById("a" + i).innerHTML = "...";
                }
                else if (i == m) {
                    document.getElementById("a" + i).innerHTML = "...";
                }
                else if (i == m + 1) {
                    document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + c + "," + m + ")'>[" + c + "]</a>";
                }
                else if (i == m / 2 + 1) {
                    document.getElementById("a" + i).innerHTML = "" + n + "";
                }
                else {
                    var nn = i - m / 2 - 1 + n;
                    document.getElementById("a" + i).innerHTML = "<a href='javascript:gettitle(" + c + "," + nn + "," + m + ")'>[" + nn + "]</a>";
                }
            }
        }
    }
}

function ShowCerHZ(n) {
    $("#page" + n + " img").each(function () {
        if ($(this).attr("src") == "" || $(this).attr("src") == undefined)
            $(this).attr("src", $(this).attr("url"));
    })
}
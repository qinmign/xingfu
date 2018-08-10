$(function () {
    $("#now_local").text("修改密码");
    $(".rightbox div").eq(0).text("修改密码");
});

function SavePwd() {
    if (CheckPwd()) {
        $.get("BackGroundWork.aspx", { "type": "PWDCHANGE", "oldpwd": $("#originPwd").val(), "newpwd": $("#newPwd").val() }, SaveResult);
    }
}

function SaveResult(res) {
    if (res.substr(0, 1) == "1") {
        alert("密码保存成功");
        $("#originPwd").val("");
        $("#newPwd").val("");
        $("#rePwd").val("");
    }
    else {
        alert(res.substr(2));
    }
}

function CheckPwd() {
    if ($("#originPwd").val() == "") {
        alert("请输入原密码");
        $("#originPwd").textFocus();
        return false;
    }

    if ($("#newPwd").val() == "") {
        alert("请输入新密码");
        $("#newPwd").textFocus();
        return false;
    }

    if ($("#newPwd").val().length < 6) {
        alert("密码至少为6位");
        $("#newPwd").textFocus();
        return false;
    }

    if ($("#newPwd").val().length > 20) {
        alert("密码最大为20位");
        $("#newPwd").textFocus();
        return false;
    }

    if ($("#rePwd").val() == "") {
        alert("请再次输入新密码");
        $("#rePwd").textFocus();
        return false;
    }

    if ($("#newPwd").val() != $("#rePwd").val()) {
        alert("两次输入的密码不一致");
        $("#rePwd").textFocus();
        return false;
    }
    return true;
}
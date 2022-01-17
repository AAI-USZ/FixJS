function login_login() {
    var l=$("#login_name").val();
    var p=$("#login_pass").val();
    $("#dlg_inner2.styledbutton").hide();
    $("#login_progress").text("Выполняется вход...");
    $.ajax({ url: "/api/passlogin",
        data:{user:l,password:p},
        dataType:'json',
        success: function (data) {
            if (data.ok) {
                 window.location = '/login?key='+data.desc;
                 $("#dlg_inner").hide()
            } else {
                 $("#login_progress").text(data.desc+"\n");
                 $("#dlg_inner2.styledbutton").css("display","inline-block");
            }
        },
        error: function (data,status) {
                $("#login_progress").text("Fucked up");
                $("#login_progress").text(data.status);  }});
    return false;
}
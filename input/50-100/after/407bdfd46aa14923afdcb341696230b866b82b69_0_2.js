function (data) {
            if (data.ok) {
                 window.location = '/login?key='+data.desc;
                 $("#dlg_inner").hide()
            } else {
                 $("#login_progress").text(data.desc+"\n");
                 $("#dlg_inner2.styledbutton").css("display","inline-block");
            }
        }
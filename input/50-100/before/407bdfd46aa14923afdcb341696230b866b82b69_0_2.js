function (data) { 
            if (data.ok) {
                 window.location = '/login?key='+data.desc;
                 $("#dlg_outer").css("display","none");
            } else {
                 $("#login_progress").text(data.desc+"\n");
                $("#dlg_inner2 .styledbutton").css("display","inline-block");
            }
        }
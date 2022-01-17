function(doPostback) {
            if (doPostback) {
               $.post(
                   askbot['urls']['mark_read_message'],
                   { formdata: "required" }
               );
            }
            $(".notify").fadeOut("fast");
            $('body').removeClass('user-messages');
            visible = false;
        }
function(html) {
            if (html) {
                $("body").addClass('user-messages');
                $(".notify span").html(html);        
            }          
            $(".notify").fadeIn("slow");
            visible = true;
        }
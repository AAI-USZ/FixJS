function() {
            var cookieValue = $.cookie($(this).attr("id"));            
            if (cookieValue == "true") {
                $(this).attr("checked","true");
            }
            else {
                if (cookieValue == "false") {
                    $(this).removeAttr("checked");    
                }
                else {
                    if ($(this).attr("data-default") == "true") {
                        $(this).attr("checked","true");   
                    }                                    
                }                
            }                               
        }
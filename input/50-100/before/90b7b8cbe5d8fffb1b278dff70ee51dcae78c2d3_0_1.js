function(){
        
        image_hidden_fields = $("div#" + currrent_img.attr("id"));
        
        ha = $("#current_high_area").attr("value")

        image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha"+ha.substring(9)+"_code_id").attr("value",$(this).attr("code_id"))
        
        $("#"+ha).css("background-color",$(this).attr("color"));    
    }
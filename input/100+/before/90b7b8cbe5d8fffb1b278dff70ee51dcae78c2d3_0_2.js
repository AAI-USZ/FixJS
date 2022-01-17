function () {
        if ($("#"+image_hidden_fields.attr("id") +"_ha1_code_id").attr("value") != "-1") {
            
            $("#"+image_hidden_fields.attr("id") +"_ha1").attr("value","1");
            
            setHighlightingAreaValues("_ha1",$("#myCarousel").position().top,$("#myCarousel").position().left,'0','0',currrent_img.width(),'130px');
            
            $("#"+image_hidden_fields.attr("id") +"_ha1_code_id").attr("value","-1");
            _top = $("#myCarousel").position().top + ($("#myCarousel").height()/2)
            
            $("#high_area1").css("top",  _top);

            $("#high_area1").css("left",$("#myCarousel").position().left);

            $("#high_area1").css("width",currrent_img.width());

            $("#high_area1").css("height",'130px'); 

            $("#high_area1").css("opacity","0.9");

            $("#high_area1").css("background-color","#eee");

            $("#high_area1").append("<h1 style='text-align:center'>Nothing to code here</h1>");
        };
    }
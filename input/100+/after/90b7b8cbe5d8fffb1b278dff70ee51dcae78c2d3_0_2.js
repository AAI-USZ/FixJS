function () {
        if ($("#"+image_hidden_fields.attr("id") +"_ha1_code_id").attr("value") != "-1") {
            
            $("#"+image_hidden_fields.attr("id") +"_ha1").attr("value","1");
            
            setHighlightingAreaValues("_ha1",1,1,'0','0',currrent_img.width(),currrent_img.height());
            
            $("#"+image_hidden_fields.attr("id") +"_ha1_code_id").attr("value","-1");
           
            
            $("#high_area1").css("top", $("#myCarousel").position().top);

            $("#high_area1").css("left", $("#myCarousel").position().left);

            $("#high_area1").css("width",currrent_img.width());

            $("#high_area1").css("height",currrent_img.height()); 

            $("#high_area1").css("opacity","0.9");

            $("#high_area1").css("background-color","#eee");

            $("#high_area1").append("<h1 style='text-align:center color: black;'>Nothing to code here</h1>");
        };
    }
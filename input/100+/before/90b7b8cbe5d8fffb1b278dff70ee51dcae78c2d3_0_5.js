function loadHighlightingAreas () {
    
    // get the position of the image in the page
    img_pos = $("#myCarousel").position();

    // get the div which contains the hidden field that holds the highlighted area values
    image_hidden_fields = $("div#" + currrent_img.attr("id"));


    _top = img_pos.top + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_y1").attr("value"));

    _left= img_pos.left + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_x1").attr("value"));

    $("#high_area1").css("top",_top);

    $("#high_area1").css("left",_left);

    $("#high_area1").css("height",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_height").attr("value"));

    $("#high_area1").css("width",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_width").attr("value")); 

    code_id = image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_code_id").attr("value")
    $("#high_area1").css("background-color", $("div#code"+code_id).css("background-color"))  

    if (image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_code_id").attr("value") == "-1")  {
        $("#high_area1").css("background-color", "#eee") 
        
        $("#high_area1").css("top",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_y1").attr("value"));

        $("#high_area1").css("left",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_x1").attr("value"));
    };

    _top = img_pos.top + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_y1").attr("value"));

    _left= img_pos.left + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_x1").attr("value"));

    $("#high_area2").css("top",_top);

    $("#high_area2").css("left",_left);

    $("#high_area2").css("height",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_height").attr("value"));

    $("#high_area2").css("width",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_width").attr("value")); 

    code_id = image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_code_id").attr("value")
    $("#high_area2").css("background-color", $("div#code"+code_id).css("background-color"))  
    
}
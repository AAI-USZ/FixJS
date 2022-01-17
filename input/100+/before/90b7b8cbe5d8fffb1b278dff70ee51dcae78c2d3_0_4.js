function highlightingArea (img, selection) {
    
    img_pos = $("#myCarousel").position();
    image_hidden_fields = $("div#" + currrent_img.attr("id"));

    if ( $("#"+image_hidden_fields.attr("id") +"_ha1").attr("value") == 0){

        setHighlightingAreaValues("_ha1", selection.x1,selection.y1,selection.x2,selection.y2,selection.width,selection.height);

        _top = img_pos.top + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_y1").attr("value"));

        _left= img_pos.left + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_x1").attr("value"));

        $("#high_area1").css("top",_top);

        $("#high_area1").css("left",_left);

        $("#high_area1").css("height",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_height").attr("value"));

        $("#high_area1").css("width",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha1_width").attr("value")); 

        $('#coding_topics').modal({backdrop:false});

        $("#current_high_area").attr("value","high_area1")


        $("#"+image_hidden_fields.attr("id") +"_ha1").attr("value","1")

    } else if ( $("#"+image_hidden_fields.attr("id") +"_ha2").attr("value") == 0){
        setHighlightingAreaValues("_ha2", selection.x1,selection.y1,selection.x2,selection.y2,selection.width,selection.height);

        _top = img_pos.top + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_y1").attr("value"));

        _left= img_pos.left + parseInt(image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_x1").attr("value"));

        $("#high_area2").css("top",_top);

        $("#high_area2").css("left",_left);

        $("#high_area2").css("height",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_height").attr("value"));

        $("#high_area2").css("width",image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha2_width").attr("value"));
        
        $('#coding_topics').modal({backdrop:false});

        $("#current_high_area").attr("value","high_area2")

        $("#"+image_hidden_fields.attr("id") +"_ha2").attr("value","1")

    } else {
        if(confirm("Do you want to clear current highlighted areas?")){
                $("#"+image_hidden_fields.attr("id") +"_ha1").attr("value","0");
                $("#"+image_hidden_fields.attr("id") +"_ha2").attr("value","0");
                setHighlightingAreaValues("_ha1",'0','0','0','0','0','0');
                setHighlightingAreaValues("_ha2",'0','0','0','0','0','0');
                clearHighlightedArea()
                currrent_img_area_select.cancelSelection()
            }else{
                currrent_img_area_select.cancelSelection()
            }
    }

	img.hide = true
    highlighting_done();

}
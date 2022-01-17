function(){

        
        if (currrent_img.attr("altr") == "Assets404") {
            currrent_img_area_select = $('#images_section div.active img').imgAreaSelect({instance: true, handles: true,onSelectEnd: highlightingArea, disable:true});
        }else{
            currrent_img_area_select = $('#images_section div.active img').imgAreaSelect({instance: true, handles: true,onSelectEnd: highlightingArea});
        }

        currrent_img = $("#images_section div.active img");

        // reset the highlighted areas values
        clearHighlightedArea();

        if ( $("#high_area1").css("top") == "0px") {
            loadHighlightingAreas();
        };

        $("#publication_date").text(currrent_img.attr("alt").slice(0,10));
        $("#newspaper_name").text(currrent_img.attr("media"));
    }
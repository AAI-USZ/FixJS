function () {
    carousel = $('#myCarousel').carousel({interval: 5000000,pause:"hover"});

    if ($("#target_image").attr("value") != null) {
        t_image = $("#target_image").attr("value")
        $("#images_section div.active img").parent().attr("class", "item")
        $("#images_section div img#" + t_image).parent().attr("class", "active item")

    };

    // get the object of image selection plugin
    currrent_img_area_select = $('#images_section div.active img').imgAreaSelect({instance: true, handles: true,onSelectEnd: highlightingArea});

    // current display image 
    currrent_img = $("#images_section div.active img") 
    if (currrent_img.attr("alt")){
        $("#publication_date").text(currrent_img.attr("alt").slice(0,10));
        $("#newspaper_name").text(currrent_img.attr("media"));
    };
    
    // change the currrent_img_area_select, currrent_img variable when user slide to another image, and also clean the highlighted areas
    carousel.on('slid',function(){

        currrent_img_area_select = $('#images_section div.active img').imgAreaSelect({instance: true, handles: true,onSelectEnd: highlightingArea});

        currrent_img = $("#images_section div.active img");

        // reset the highlighted areas values
        clearHighlightedArea();

        if ( $("#high_area1").css("top") == "0px") {
            loadHighlightingAreas();
        };

        $("#publication_date").text(currrent_img.attr("alt").slice(0,10));
        $("#newspaper_name").text(currrent_img.attr("media"));
    });

    $('input[name="codes"]').on("click",function(){
        
        image_hidden_fields = $("div#" + currrent_img.attr("id"));
        
        ha = $("#current_high_area").attr("value")

        image_hidden_fields.find("#"+image_hidden_fields.attr("id")+"_ha"+ha.substring(9)+"_code_id").attr("value",$(this).attr("code_id"))
        
        $("#"+ha).css("background-color",$(this).attr("color"));    
    });

    $("#clear_highlighting").click(function () {
        $("#"+image_hidden_fields.attr("id") +"_ha1").attr("value","0");
        $("#"+image_hidden_fields.attr("id") +"_ha2").attr("value","0");
        setHighlightingAreaValues("_ha1",'0','0','0','0','0','0');
        setHighlightingAreaValues("_ha2",'0','0','0','0','0','0');
        clearHighlightedArea()
    })  

    $("#skip_coding").click(function () {
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
    })

    
    if ( $("#high_area1").css("top") == "0px") {
        loadHighlightingAreas();
    };

}
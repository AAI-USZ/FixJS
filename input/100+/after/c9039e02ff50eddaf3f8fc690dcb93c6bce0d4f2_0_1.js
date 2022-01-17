function() {

    $(".number_link").click(function(){
        
        if($(this).attr("class") == "number_link enable") {
            // Enable Number
             $(this).removeClass("enable").addClass("disable");
             $(this).children().removeClass("disabled").addClass("enabled");
             $(this).parent().siblings().children().removeClass("img_disabled").addClass("img_enabled");
             $.get('enable/'+this.id);
            
        } else if ($(this).attr("class") == "number_link disable") {
            // Disable Number
            $(this).removeClass("disable").addClass("enable");
            $(this).children().removeClass("enabled").addClass("disabled");
            $(this).parent().siblings().children().removeClass("img_enabled").addClass("img_disabled");
            $.get('disable/'+this.id);

        }
        
    });

}
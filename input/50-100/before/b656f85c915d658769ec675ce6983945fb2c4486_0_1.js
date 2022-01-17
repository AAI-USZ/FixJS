function(){
        var tmp = $(this);
        if($(this).hasClass("open")){
            $("#help").slideUp("100", function(){
                tmp.removeClass("open");
                $("#data").show();
            });
        } else {            
            $("#data").hide();
            $("#help").slideDown("100", function(){
                tmp.addClass("open");
            });
        }
    }
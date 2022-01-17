function(){
    
        var b = $("body");
        
        b.removeClass("phase1");
        b.removeClass("phase2");
        b.removeClass("phase3");
        b.removeClass("phase4");
        b.removeClass("phase6");
    
        b.addClass("phase"+gamedata.gamephase);
    }
function(){
        var dt = this;
        // we've added something or moved something, so now make sure that height/weight/pos of everything is correct

        // ensure sizers are the right height now
        $("."+dt.cls("sizer")).each(function(){
            // FIXME duped above 
            var highest = 0;
            $(this).parent().find("."+dt.cls("cell")).each(function(){
                var thisheight = $(this).height() + dt.get_extras(this);
                if (thisheight > highest){
                    highest = thisheight;
                }
            });

            $(this).css("height", highest);
            $(this).css("min-height", highest);
        });
    }
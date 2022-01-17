function imgPopupUpdateSize($cloneObject){
        if( $(window).height() > $cloneObject.height()){
            $cloneObject.css({"max-width" : $(window).width() * 0.8});
        } else if( $(window).width() > $cloneObject.width() ){
            $cloneObject.css({"max-height" : $(window).height() * 0.8});
        } else {
            var x = $(window).width() / $cloneObject.width();
            var y = $(window).height() / $cloneObject.height();
            if( x > y ){
                $cloneObject.css({"max-width" : $(window).width() * 0.8 / x });
            } else {
                $cloneObject.css({"max-height" : $(window).height() * 0.8 / x });
            }
        }
        var top = $(window).height()/2 - $cloneObject.height()/2;
        $cloneObject.css({
            "left" : ($(window).width() - $cloneObject.width()) /2,
            "top" : top,
            "border" : "1px solid black"
        });
    }
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
        $cloneObject.css({"left" : ($(window).width() - $cloneObject.width()) /2 });
    }
function(num) {
        
        // remove old previousSlide class
        $j('.previousSlide').removeClass('previousSlide');
        
        // add new previousSlide
        $j('.currentSlide').addClass('previousSlide');
        
        // remove old currentSlide
        $j('.currentSlide').removeClass('currentSlide');
        
        // add new currentSlide
        $j('.thumb[data-index="' + num +'"]').addClass('currentSlide');
        $j('#scroll .image-container[data-index="' + num +'"]').addClass('currentSlide');
        
    }
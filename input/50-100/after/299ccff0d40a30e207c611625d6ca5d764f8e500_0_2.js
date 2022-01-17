function(pos, time) {
        
        $j('#scroll .image-container.previousSlide').animate({
            opacity: 0.25
        }, 200 , function() {
            // animation complete
        });
        
        $j('#scroll').animate({
            left: pos
        }, time , function() {
            // animation complete
            $j('#scroll .image-container.currentSlide').animate({
                opacity: 1
            }, 200 , function() {
                // animation complete
            });
            
        });
        
    }
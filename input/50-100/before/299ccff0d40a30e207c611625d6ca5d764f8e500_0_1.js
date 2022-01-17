function(num) {
        
        // remove old previous class
        $j('.previous').removeClass('previous');
        
        // add new previous
        $j('.current').addClass('previous');
        
        // remove old current
        $j('.current').removeClass('current');
        
        // add new current
        $j('.thumb[data-index="' + num +'"]').addClass('current');
        $j('#scroll .image-container[data-index="' + num +'"]').addClass('current');
        
    }
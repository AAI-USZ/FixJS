function() {
        
        var curDataIndex = parseInt($j('.thumb.current').attr('data-index'));
        
        if ($j(this).hasClass('prev')) {
            var newDataIndex = curDataIndex - 1;
        } else {
            var newDataIndex = curDataIndex + 1;
        }
        
        var showImage = '.thumb[data-index="' + newDataIndex + '"]';
        console.log($j(showImage));
        
        if ( $j(showImage)[0] != null ) {
            
            var positionLeft = '-' + $j(showImage).attr('data-position') + 'px';
            
            labelCurrentPosition(newDataIndex);
            animateScroll(positionLeft, 300);
            
        }
        
        return false;
    }
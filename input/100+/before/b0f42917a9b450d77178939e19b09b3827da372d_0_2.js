function( currentSlide, call ) {
        var middle = mainSlide - 1;
        var middleSlide = parseInt( slideContainer.attr('data-middle') );
        
        // Remove the select class from all items
        $(slideItems).removeClass('selected');

        // Add the selected class to the selected slide           
        $( slideItems[ currentSlide ] ).addClass('selected');
        
        slideContainer.attr('data-current', currentSlide );
        
        if( currentSlide > (middleSlide - 1) )
        {
            if( currentSlide < ( slideCount - ( mainSlide - 1) ) )
            {
                slideContainer.attr('data-middle', middleSlide + 1 );
                $('#drySlides').animate({ 'left': '-=102px'}, speed );
            }            
        }
        else
        if( currentSlide < (middleSlide - 1) ) {
            if( currentSlide >= (firstChunk - 1)
              )
            {
                slideContainer.attr('data-middle', middleSlide - 1 );
                $('#drySlides').animate({ 'left': '+=102px'}, speed );
            }
        }
    }
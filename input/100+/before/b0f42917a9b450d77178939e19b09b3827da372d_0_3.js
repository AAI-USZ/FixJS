function( args ) {
    
    var slideContainer = $('#drySlideContainer');
    var slideItems   = $('#drySlides li');
    var contentItems = $('#dryContent li');
    var copyContentItems = $('#dryCopyContent li');
    var slideCount   = slideItems.length;
    var speed        = args.speed ? args.speed : 'slow';
    var startFrame   = args.startFrame ? args.startFrame : 0;
    var mainSlide    = args.mainSlide ? args.mainSlide : 0;
    var beginningSlides = slideCount - mainSlide;
    var firstChunk      = slideCount - beginningSlides;
    
     // Add the slide content to the content container
    var displayContent = function( slide ) {
        
        // Hide all content items
        $( contentItems).removeClass('selected');
        $( contentItems).fadeOut(500);
        
        
        // Show the content for the given slide
        $( contentItems + '[data-content="' + slide + '"]').addClass('selected');
        $( contentItems + '[data-content="' + slide + '"]').fadeIn(500);
        
        
        // Hide all content items
        $( copyContentItems).removeClass('selected');
        $( copyContentItems).fadeOut(500);
        
        
        // Show the content for the given slide
        $( copyContentItems + '[data-content="' + slide + '"]').addClass('selected');
        $( copyContentItems + '[data-content="' + slide + '"]').fadeIn(500);
    };
    
    
    // Set the data-middle attribute on the slides
    slideContainer.attr('data-middle', mainSlide );
    
    // Iterate over all of the slide items and give them a data-slide number
    $.each(slideItems, function( index, value ) {
        $(value).attr('data-slide', index)
    });
    
    // Iterate over all of the content items and give them a data-content number
    $.each(contentItems, function( index, value ) {
        $(value).attr('data-content', index)
    });
    
    // Iterate over all of the content items and give them a data-content number
    $.each(copyContentItems, function( index, value ) {
        $(value).attr('data-content', index)
    });
    
    
    
    //assign an onclick function to the previous and next buttons
    $('#dryPreviousSlide').on('click', function() {
        previousSlide();
    });
    
    $('#dryNextSlide').on('click', function() {
        nextSlide();
    });
    
    
    
    // Add the selected class to the start slide item
    $( slideItems[ startFrame ] ).addClass('selected');
    
    // Show the content for the startFrame
    displayContent( startFrame );
    
    
    var previousSlide = function() {
        var currentSlide   = parseInt(slideContainer.attr('data-current'));
        
        if( currentSlide > 0 )
        {
            slideContainer.attr('data-current', currentSlide);
            selectSlideItem( currentSlide - 1, 'button' );
            displayContent( currentSlide - 1 );
        }
    };
    
    
    var selectSlideItem = function( currentSlide, call ) {
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
    };
    
    var nextSlide = function() {
        var currentSlide   = parseInt(slideContainer.attr('data-current')) + 1;
        
        if( currentSlide < slideCount )
        {
            slideContainer.attr('data-current', currentSlide + 1 );
            selectSlideItem( currentSlide, 'button' );
            displayContent( currentSlide );
        }
    };
    
    
    
    // Add the onclick function to each slide item
    slideItems.on('click', function( event ) {
        var that = $(this);
        var slide = parseInt( that.attr('data-slide') );
        
        selectSlideItem( slide, 'click' );
        displayContent( slide );
    });
}
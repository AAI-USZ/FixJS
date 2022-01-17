function( args ) {
    var id               = args.id ? args.id : 'drySlide_';
    
    
    // Assign the id to the elements
    $('.drySlideContainer[data-id="' + id + '"]').attr('id', id + '_drySlideContainer');
    $('.drySlideContainer[data-id="' + id + '"]').children('.drySlides').attr('id', id + '_drySlides');
    $('.dryContentContainer[data-id="' + id + '"]').attr('id', id + '_dryContentContainer');
    $('.dryContentContainer[data-id="' + id + '"]').children('.dryContent').attr('id', id + '_dryContent');
    $('.dryCopyContentContainer[data-id="' + id + '"]').attr('id', id + '_dryCopyContentContainer');
    $('.dryCopyContentContainer[data-id="' + id + '"]').children('.dryCopyContent').attr('id', id + '_dryCopyContent');
    $('.dryPreviousSlide[data-id="' + id + '"]').attr('id', id + '_dryPreviousSlide');
    $('.dryNextSlide[data-id="' + id + '"]').attr('id', id + '_dryNextSlide');

    var slideContainer   = $('#' + id + '_drySlideContainer.drySlideContainer');
    var slideItems       = $('#' + id + '_drySlides.drySlides li');
    var contentItems     = $('#' + id + '_dryContent.dryContent li');
    var copyContentItems = $('#' + id + '_dryCopyContent.dryCopyContent li');
    var slideCount       = slideItems.length;
    var speed            = args.speed ? args.speed : 'slow';
    var startFrame       = args.startFrame ? args.startFrame : 0;
    var mainSlide        = args.mainSlide ? args.mainSlide : 0;
    var beginningSlides  = slideCount - mainSlide;
    var firstChunk       = slideCount - beginningSlides;
    
     // Add the slide content to the content container
    var displayContent = function( slide ) {
        
        // Hide all content items
        $( contentItems).removeClass('selected');
        $( contentItems).fadeOut(500);
        
        // Show the content for the given slide
        $( contentItems + '[data-content="' + slide + '"]').addClass('selected');
        $( contentItems + '[data-content="' + slide + '"]').fadeIn(500);
        
        // Hide all copy content items
        $( copyContentItems).removeClass('selected');
        $( copyContentItems).fadeOut(500);
        
        // Show the copy content for the given slide
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
    $('#' + id + '_dryPreviousSlide.dryPreviousSlide').on('click', function() {
        previousSlide();
    });
    
    $('#' + id + '_dryNextSlide.dryNextSlide').on('click', function() {
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
                $('#' + id + '_drySlides.drySlides').animate({ 'left': '-=102px'}, speed );
            }            
        }
        else
        if( currentSlide < (middleSlide - 1) ) {
            if( currentSlide >= (firstChunk - 1)
              )
            {
                slideContainer.attr('data-middle', middleSlide - 1 );
                $('#' + id + '_drySlides.drySlides').animate({ 'left': '+=102px'}, speed );
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
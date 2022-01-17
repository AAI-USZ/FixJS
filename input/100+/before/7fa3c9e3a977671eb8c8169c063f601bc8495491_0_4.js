function()
                {
                    /* Collecting relative elements
                     */
                    
                    var ul = $( '> ul', this ),
                        li = $( '> li', ul );

                    /* Validates to be sure we got what we need
                     */
                    
                    if( ul.length == 0 )
                        throw 'No ul element found';

                    if( ul.length > 1 )
                        throw 'More then 1 ul element found';

                    if( li.length < 1 )
                        throw 'No li elements found';
                    
                    /* How many li elements exists in the initiation part.
                     * This tells us how many images acctuly existes after
                     * cloning has accured.
                     */
                    
                    var iniLiLength = li.length;
                    
                    /* Cloning elements
                     * 
                     * We need 5 li element for a nice flow and a good looking
                     * floded view.
                     */
                    
                    for( var i = iniLiLength; i < 5; )
                        li.each(
                            function()
                            {
                                i++;
                                ul.append( $( this ).clone( true, true ));
                            });
                    
                    /* Creating the viewport
                     */
                    
                    var viewPort = $( '<div />' )
                            .addClass( 'circus-slider-viewport' );
                    
                    /* Setting sizes
                     */
                    
                    var width = li.first().width();
                    viewPort.width( width );
                    ul.width( width * $( '> li', ul ).length );
                    
                    /* Setting positions so we start from the beginning but
                     * still have two element behind us.
                     */
                    
                    for( var i = 0; i < 2; i++ )
                        ul.prepend( $( '> li', ul ).last() );
                    
                    ul.css( 'left', '-' + ( width * 2 ) + 'px' );
                    
                    /* Setting the viewport
                     */
                        
                    ul.wrap( viewPort );
                    
                    /* A flag that determines if an animation is currently
                     * running.
                     */

                    var ani = false,
                    
                    /* Determines what view we are currently viewing
                     */
                    
                    viewIndex = 0,
                    
                    /* Cashes event if animation is currently running.
                     */
                    
                    eventCash = null;
                    
                    /* Defines the animation function that slides the slider
                     */
                        
                    var slide = function( tick )
                    {
                        // Prevents this animation from starting if there's
                        // already an animation running
                        if( ani )
                        {
                            // Cashed event will run after current animation
                            // has finished
                            eventCash = tick;
                            
                            return;
                        }

                        // Prevents other animations from starting
                        ani = true;
                        
                        // Resets eventual cash
                        eventCash = null;
                        
                        // Calculating the new viewIndex
                        viewIndex += tick;
                        
                        // Keeping the view index relevent
                        while( viewIndex >= iniLiLength )
                            viewIndex -= iniLiLength;
                        while( viewIndex < 0 )
                            viewIndex = iniLiLength + viewIndex;
                        
                        // Setting active class name on correct thumbnail
                        if( options.showThumbnails )
                        {
                            var activeClass = 'circus-slider-thumbnail-active',
                                thumbnailContainer = $(
                                    '> .circus-slider-thumbnail-container',
                                    thumbnailsWrapper );
                            
                            $( '> .circus-slider-thumbnail',
                                thumbnailContainer ).removeClass( activeClass );
                                
                            $( '> .circus-slider-thumbnail:nth('+viewIndex+')',
                                thumbnailContainer ).addClass( activeClass );
                        }
                        
                        var // Calculating the animation length
                            length = width * Math.abs( tick ),
                        
                            // Calculating new position value
                            left = tick < 0
                                 ? ul.position().left - length
                                 : ul.position().left,
                            
                            // Retrives the animation array
                            animation = halfMoonAnimation( length );

                        // Clones the endblocks and prepands it or vice versa
                        for( var n = 0; n < Math.abs( tick ); n++ )
                            tick < 0
                                ? ul.prepend(
                                    $( 'li:nth(' + ( iniLiLength - 1 ) + ')', 
                                        ul )
                                    .clone( true, true ))

                                : ul.append(
                                    $( 'li:nth(' + n + ')', 
                                        ul )
                                    .clone( true, true ));

                        ul.css(
                            {
                                // Positioning the content accordingly
                                'left':
                                    left + 'px',
                                
                                // Setting new size to be able to display
                                // cloned elements
                                'width':
                                    ( ul.width() + length ) + 'px'
                            });

                        // Starts the animation
                        var i    = 0,
                            l    = animation.length,
                            loop = function()
                            {
                                // Will clear interval if we reached the end
                                if( i == l )
                                {
                                    options.animator.removeFromQueue( loop );
                                    
                                    if( options.animator.isQueueEmpty() )
                                        options.animator.stop();
                                    
                                    // Removing flooded elements
                                    for( var n = 0; n < Math.abs( tick ); n++ )
                                        tick < 0
                                            ? $( '> li', ul ).last().remove()
                                            : $( '> li', ul ).first().remove();
                                    
                                    ul.css(
                                        {
                                            // Positioning content
                                            'left':
                                                ( tick < 0
                                                ? ul.position().left
                                                : ul.position().left 
                                                + length ) + 'px',
                                            
                                            // Setting new size after the
                                            // dublicates has been removed
                                            'width':
                                                ( ul.width() 
                                                - length ) + 'px'
                                        });

                                    options.postSlide( tick );
                                    ani = false;
                                    
                                    // Running cashed event
                                    if( options.eventCash )
                                        if( eventCash != null )
                                            slide( eventCash );
                                    
                                    return;
                                }

                                // Sets the new position value
                                ul.css(
                                    'left',
                                    ( tick < 0
                                    ? left + animation[ i++ ]
                                    : left - animation[ i++ ] )
                                    + 'px' );
                            };
                            
                        options.preSlide( tick );
                        options.animator.addToQueue( loop );
                        options.animator.start();
                    }
                    
                    /* Adding the buttons if specifyed in options
                     */
                    
                    if( options.showButtons )
                    {
                        /* Creating the buttons
                         */
                        
                        var leftButton = $( '<div />' )
                                .addClass( 'circus-slider-left-button' )
                                
                                /* Appending an empty element on the button
                                 * that could be used for styling with CSS.
                                 * ..it has no other purpose
                                 */
                                .append( $( '<div />' )),
                            
                            // @see leftButton for documentation
                            rightButton = $( '<div />' )
                                .addClass( 'circus-slider-right-button' )
                                .append( $( '<div />' ));
                                
                        /* Setting event listeners for the buttons
                         */

                        leftButton.click(
                            function( e )
                            {
                                // A hook that could be defined by the user
                                options.leftButtonClick( this, e );
                                
                                // The acctual sliding magic
                                slide( -1 );
                            });

                        rightButton.click(
                            // @see leftButton for documentation
                            function( e )
                            {
                                options.rightButtonClick( this, e );
                                
                                slide( 1 );
                            });
                        
                        /* Adding the buttons
                         */
                        
                        ul.parent()
                            .append( leftButton )
                            .append( rightButton );
                    }
                    
                    /* Adding the thumbnails if specifyed in options
                     */
                    
                    if( options.showThumbnails )
                    {
                        /* Creating the thumbnail container
                         */
                        
                        var thumbnailContainer = $( '<div />' )
                                .addClass(
                                    'circus-slider-thumbnail-container' );
                        
                        /* Adding the thumbnails to the container
                         */
                        
                        for( var i = 0, l = iniLiLength; i < l; i++ )
                            thumbnailContainer.
                                append(
                                    $( '<div />' )
                                        .addClass(
                                            'circus-slider-thumbnail' )
                                        
                                        // Setting the thumbnail index
                                        .attr( 'data-thumbnail', i )
                                        
                                        // Setting the event listener
                                        .click(
                                            function( e )
                                            {
                                                // Calling users predifined hook
                                                options.thumbnailClick(
                                                    this,
                                                    e );
                                                
                                                // If the hook stopped the
                                                // propagation than that will
                                                // prevent sliding
                                                if( e.isPropagationStopped() )
                                                    return;
                                                
                                                // Calculating a relevent path
                                                var go = $( this ).attr(
                                                            'data-thumbnail' )
                                                       - viewIndex;
                                                
                                                // Calculating closest path
                                                if( Math.abs( go ) > l / 2 )
                                                    go = go > 0
                                                       ? go - l
                                                       : l  + go;
                                                
                                                // Starts the animation
                                                slide( go );
                                            }));
                                            
                        /* Setting classname for active thumbnail
                         */
                        
                        $( '> .circus-slider-thumbnail:first-child',
                            thumbnailContainer )
                            .addClass( 'circus-slider-thumbnail-active' );
                        
                        /* Adding the thumbnail container to its wrapper
                         */
                        
                        var thumbnailsWrapper;
                        
                        switch( typeof options.thumbnailsWrapper )
                        {
                            case 'string':
                                thumbnailsWrapper = $(
                                    options.thumbnailsWrapper );
                                break;
                                
                            case 'object':
                                thumbnailsWrapper = options.thumbnailsWrapper;
                                break;
                            
                            case 'undefined':
                                thumbnailsWrapper = ul.parent();
                                break;
                        }
                        
                        thumbnailsWrapper.append( thumbnailContainer );
                        
                        /* Setting images as thumbnails if desired by the user,
                         * using first appering image
                         */
                        
                        if( options.useImagesForThumbnails )
                        {
                            var i = 0;
                            
                            // Setting relative pointers
                            thumbnailContainer = $(
                                '> .circus-slider-thumbnail-container', 
                                thumbnailsWrapper );
                            
                            // Looping through every thumbnail
                            $( '> div', thumbnailContainer ).each(
                                function()
                                {
                                    // The first image in the sliding position
                                    // will be represented as the thumbnail
                                    var img = $( 'img:first', li[ i++ ] );
                                    
                                    // Will not set any thumbnail if no image
                                    // is found
                                    if( img.length == 1 )
                                    {
                                        // Creating a new object so that we
                                        // have a relative scope for every
                                        // thumbnail.
                                        new (function( _this, src, w, h )
                                        {
                                            var img    = new Image();
                                            
                                            // Doing the magic onece the image
                                            // is done loading
                                            img.onload = function()
                                            {
                                                // Setting the thumbnail sizes
                                                // with some offset value
                                                var width  = w * 1.2,
                                                    height = h * 1.2;

                                                // Calculating the proportions
                                                if( this.width > this.height )
                                                    width = Math.round( 
                                                        width *
                                                        ( this.width
                                                        / this.height ));

                                                else
                                                    height = Math.round( 
                                                        height *
                                                        ( this.height
                                                        / this.width ));
                                                
                                                // Calculating the offset values
                                                var left = Math.round(
                                                         ( width  - w ) 
                                                         / 2 ),
                                                     
                                                    top  = Math.round(
                                                         ( height - h ) 
                                                         / 2 );
                                                
                                                // Setting the propertys
                                                img = $( img ).css(
                                                    {
                                                        'height':
                                                            height + 'px',
                                                        
                                                        'width':
                                                            width + 'px',
                                                        
                                                        'margin-top':
                                                            '-' + top + 'px',
                                                        
                                                        'margin-left':
                                                            '-' + left + 'px'
                                                    });
                                                
                                                // Adding the thumbnail to its
                                                // container
                                                $( _this ).append( img );
                                            }
                                            
                                            // Setting the image source after
                                            // we sat the onload event handler
                                            img.src = src;
                                            
                                        })( this,
                                            img.attr( 'src' ),
                                            $( this ).width(),
                                            $( this ).height() );
                                    }
                                });
                        }
                    }
                    
                    /* Automatic sliding
                     */
                    
                    if( typeof options.delay == 'number' )
                    {
                        var
                        hover  = false,
                        puseOn = $( ul );
                        
                        if( options.showButtons )
                            puseOn = puseOn
                                .add( leftButton )
                                .add( rightButton );
                            
                        if( options.showThumbnails )
                            puseOn = puseOn.add(
                                '> .circus-slider-thumbnail', 
                                thumbnailContainer );
                        
                        puseOn.hover(
                            function()
                            {hover = true;},
                            function()
                            {hover = false;});
                        
                        setInterval(
                            function()
                            {
                                if( document.hasFocus )
                                    if( !document.hasFocus() )
                                        return;
                                
                                if( !hover )
                                    slide( 1 );
                            },
                            options.delay );
                    }
                }
function( tick )
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
                        
                        // The former index before calculating a new value
                        var formerViewIndex = viewIndex;
                        
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
                            animation = pieAnimation( length );

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

                                    options.postSlide(
                                      tick,
                                      formerViewIndex,
                                      viewIndex );
                                      
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
                            
                        options.preSlide( tick, formerViewIndex, viewIndex );
                        options.animator.addToQueue( loop );
                        options.animator.start();
                    }
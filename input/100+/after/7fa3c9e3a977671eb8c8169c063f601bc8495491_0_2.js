function()
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
                            }
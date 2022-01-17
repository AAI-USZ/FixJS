function(){

                    // get the footer object for the $to page
                    $footer = getFooter( 'from' );

                    // Check if the footer is fixed but hidden and store as a boolean
                    pageHasHiddenFixedFooter = (( $footer.type == "hidden" ) ? true : false);

                    // Check if the footer is fixed and store as a boolean to be accessed 3 more times below
                    pageHasFixedFooter = ( ( ( $footer.type == "fixed" ) || ( pageHasHiddenFixedFooter ) ) ? true : false );

                    if ( pageHasHiddenFixedFooter ) {

                        // We don't need to wait for it to fade out
                        footerFadeOutDuration = 0;
                    }

                    if (pageHasFixedFooter) {

                        if ($(window).scrollTop() > 2) {

                            $.scrollTo( 2, scrollToDuration, 
                                
                                {
                                    easing:'easeInOutExpo', 
                                    onAfter: function() { 

                                        $footer.fadeOut(footerFadeOutDuration, function() {

                                            prepPage( 'from', pageHasFixedFooter );

                                            toggleViewportClass();

                                            prepPage( 'to' );

                                            //var start = new Date().getTime();
                                            //while (new Date().getTime() < start + 5000);

                                            $from.addClass( name + " out" + reverseClass );

                                            // if it's using a simultaneous transition handler, call the doneOut transition 
                                            // to start the to page animating in simultaneously
                                            if( simultaneous ){
                                                doneOut();
                                            
                                            } else {
                                                $from.animationComplete( doneOut ); 
                                            }
                                        }); 
                                    }
                                }
                            );

                        } else {

                            $footer.fadeOut(footerFadeOutDuration, function() {

                                prepPage( 'from', pageHasFixedFooter );

                                toggleViewportClass();

                                prepPage( 'to' );

                                $from.addClass( name + " out" + reverseClass );

                                // if it's using a simultaneous transition handler, call the doneOut transition 
                                // to start the to page animating in simultaneously
                                if( simultaneous ){
                                    doneOut();
                                
                                } else {
                                    $from.animationComplete( doneOut ); 
                                }
                            });
                        }

                    } else {

                        if ($(window).scrollTop() > 2) {

                            $.scrollTo( 2, scrollToDuration, 
                                
                                {
                                    easing:'easeInOutExpo', 
                                    onAfter: function() { 

                                        prepPage( 'from', pageHasFixedFooter );

                                        toggleViewportClass();

                                        prepPage( 'to' );

                                        $from.addClass( name + " out" + reverseClass );

                                        // if it's using a simultaneous transition handler, call the doneOut transition 
                                        // to start the to page animating in simultaneously
                                        if( simultaneous ){
                                            doneOut();
                                        
                                        } else {
                                            $from.animationComplete( doneOut ); 
                                        }
                                    }
                                }
                            );

                        } else {

                            prepPage( 'from', pageHasFixedFooter );

                            toggleViewportClass();

                            prepPage( 'to' );

                            $from.addClass( name + " out" + reverseClass );

                            // if it's using a simultaneous transition handler, call the doneOut transition 
                            // to start the to page animating in simultaneously
                            if( simultaneous ){
                                doneOut();
                            
                            } else {
                                $from.animationComplete( doneOut ); 
                            }
                        }
                    }
                }
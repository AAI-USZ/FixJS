function() {

                    // if we are coming FROM somewhere and if so, whether or not the transition handler is a simultaneous handler (slide)
                    if ( $from && simultaneous ) {
                        cleanFrom();
                    }
                
                    // get the footer object for the $to page
                    $footer = getFooter( 'to' );

                    // Check if the footer is fixed and store as a boolean to be accessed 3 more times below
                    pageHasFixedFooter = (( $footer.type == "fixed" ) ? true : false);

                    // Clean up the $to page
                    cleanTo( $footer, pageHasFixedFooter );

                    // Send focus to page as it is now display: block
                    $.mobile.focusPage( $to );

                    // In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
                    // This ensures we jump to that spot after the fact, if we aren't there already.
                    if(( $( window ).scrollTop() !== toScroll ) && (toScroll > 1) ) {

                        // Scoll back down to last scroll position that is tracked in toScroll
                        $.scrollTo( toScroll, scrollToDuration,   
                                    
                                    {
                                        easing:'easeInOutExpo', 
                                        onAfter: function() { 

                                            // If there is a fixed footer, then we need to fade it back in
                                            if (pageHasFixedFooter) {

                                                // Fade in the fixed footer
                                                $footer.fadeIn(footerFadeInDuration, function() {

                                                    // re-enable the special scrollstart event handler
                                                    $.event.special.scrollstart.enabled = true;
                                                });

                                            } else {

                                                // re-enable the special scrollstart event handler
                                                $.event.special.scrollstart.enabled = true;
                                            }
                                        }
                                    } 
                        );

                    } else {

                        // If there is a fixed footer, then we need to fade it back in
                        if (pageHasFixedFooter) {

                            // Fade in the fixed footer
                            $footer.fadeIn(footerFadeInDuration, function() {

                                // re-enable the special scrollstart event handler
                                $.event.special.scrollstart.enabled = true;
                            });

                        } else {

                            // re-enable the special scrollstart event handler
                            $.event.special.scrollstart.enabled = true;
                        }
                    }

                    // Toggle the ui-mobile-viewport-transitioning and viewport-<transition name> classes
                    toggleViewportClass();

                    // resolve the deferred promise
                    deferred.resolve( name, reverse, $to, $from, true );
                }
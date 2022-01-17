function ( which, pageHasFixedFooter ) {

                    pageHasFixedFooter = false || pageHasFixedFooter;

                    // Start it at zero so we have something to check against later
                    var totalHeight = 0;

                    $page = ( ( which == 'from' ) ? $from : $to );

                    // The to page will need some pre and post handling so everything can go in a smooth sequence
                    if ( which == 'to' ) {

                        // Set the to page opacity to 0 before setting display block and overflow visible
                        $to.addClass( 'ui-to-page-pre-transition' );

                        // Setting display block and overflow visible
                        $to.addClass( $.mobile.activePageClass );
                    }

                    defaultTotalHeight = ( ( which == 'from') ? ( screenHeight + $( window ).scrollTop() ) : ( ( screenHeight ) + toScroll ) );

                    // Let's calculate the height of $page based on the children of the main element (which theoretically should always be a page)
                    //$($page).children().each( function(index) {

                    //    totalHeight += $(this).height();
                    //});

                    if ( totalHeight == 0 ) {

                        // Use the old value as the fallback value
                        totalHeight = defaultTotalHeight;
                    }

                    if ( totalHeight > defaultTotalHeight ) {

                        // This is where we need to figure out how to handle the adjustments to the animation origins
                    }

                    // The to page will need some pre and post handling so everything can go in a smooth sequence
                    if ( which == 'to' ) {

                        // Removing the display block and overflow visible styles from page
                        $to.removeClass( $.mobile.activePageClass );
                    }

                    if (which == 'from') {

                        if (pageHasFixedFooter) {

                            $from.find('div[data-role="header"]').prop("data-position", "inline");
                            
                            $from
                                .removeClass("ui-page-header-fixed")
                                .find('div[data-role="header"]').first()
                                .removeClass("ui-header-fixed");

                            $from.find('div[data-role="footer"]').prop("data-position", "inline");

                            $from
                                .removeClass("ui-page-footer-fixed")
                                .find('div[data-role="footer"]').first()
                                .removeClass("ui-footer-fixed");
                        }

                    } else {

                        // get the footer object for the $to page
                        $footer = getFooter( 'to' );

                        // Check if the footer is fixed but hidden and store as a boolean
                        pageHasHiddenFixedFooter = (( $footer.type == "hidden" ) ? true : false);

                        // Check if the footer is fixed and store as a boolean to be accessed 3 more times below
                        pageHasFixedFooter = ( ( ( $footer.type == "fixed" ) || ( pageHasHiddenFixedFooter ) ) ? true : false );

                        if ( pageHasFixedFooter && !pageHasHiddenFixedFooter ) {

                            // Make sure the fixed footer on the page we're transitioning is not being displayed (we'll fade it in after the transition)
                            $footer .css('display', 'none')
                                    .prop("data-position", "inline")
                                    .removeClass("ui-footer-fixed");

                            $to
                                .removeClass("ui-page-header-fixed")
                                .find('div[data-role="header"]').first()
                                .removeClass("ui-header-fixed");

                            $to.removeClass("ui-page-footer-fixed");

                        } else if ( pageHasHiddenFixedFooter ) {

                            // Make sure the fixed footer on the page we're transitioning is not being displayed (we'll fade it in after the transition)
                            $footer.css('display', 'none');
                        
                        } else {

                            // nothing to do
                        }

                        // for some reason, the data-role="content" div was losing it's class="ui-content" so let's 
                        // first remove it in case it is there and then add it back in
                        $to.find('div[data-role="content"]').removeClass("ui-content").addClass("ui-content");
                    }

                    // set the page height based on the aggregate heights of the page's immediate children
                    $page.height( totalHeight );
                }
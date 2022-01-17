function ( which, pageHasFixedFooter ) {

                    pageHasFixedFooter = false || pageHasFixedFooter;

                    $page = ( ( which == 'from' ) ? $from : $to );

                    // The to page will need some pre and post handling so everything can go in a smooth sequence
                    if ( which == 'to' ) {

                        // Set the to page opacity to 0 before setting display block and overflow visible
                        $to.addClass( 'ui-to-page-pre-transition' );
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

                    } else { // must be the to page

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
                        //$to.find('div[data-role="content"]').removeClass("ui-content").addClass("ui-content");
                    }

                    // just set the page height to screenHeight * 2 so the page doesn't look truncated during transitions that use scaling
                    $page.height( screenHeight * 2 );
                }
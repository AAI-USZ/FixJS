function() {

                    // Start it at zero so we have something to check against later
                    var totalHeight = 0;

                    defaultTotalHeight = ( ( screenHeight ) + toScroll );

                    // Let's calculate the height of $page based on the children of the main element (which theoretically should always be a page)
                    $($to).children().each( function( index ) {

                        totalHeight += $( this ).height();
                    });

                    if ( totalHeight === 0 ) {

                        // Use the old value as the fallback value
                        totalHeight = defaultTotalHeight;
                    }

                    // set the to page's height
                    $to.height( totalHeight );
                }
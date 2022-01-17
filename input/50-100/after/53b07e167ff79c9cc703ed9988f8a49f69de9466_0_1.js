function(){

                    // Remove the opacity 0 setting before setting display block and overflow visible
                    $to.removeClass( 'ui-to-page-pre-transition' );

                    $to.addClass( name + " in" + reverseClass);

                    // Setting display block and overflow visible
                    $to.addClass( $.mobile.activePageClass );  

                    if( none ){
                        doneIn();

                    } else {
                        $to.animationComplete( doneIn );
                    }
                }
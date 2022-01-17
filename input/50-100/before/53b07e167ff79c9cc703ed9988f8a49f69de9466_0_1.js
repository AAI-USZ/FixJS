function(){

                    // Remove the opacity 0 setting before setting display block and overflow visible
                    $to.removeClass( 'ui-to-page-pre-transition' );

                    // Setting display block and overflow visible
                    $to.addClass( $.mobile.activePageClass );  

                    $to.addClass( name + " in" + reverseClass);

                    if( none ){
                        doneIn();

                    } else {
                        $to.animationComplete( doneIn );
                    }
                }
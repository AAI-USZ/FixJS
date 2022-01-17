function( ev ) {
                    
                    // move backwards (left-arrow or backspace)
                    if ( 0 == text[ 0 ].selectionStart && ( 8 == ev.keyCode || 37 == ev.keyCode ) ) {

                        var parent = $( this ).parent();
                        var prev = parent.prev(), val;

                        // remove previous (backspace)?
                        if ( 8 == ev.keyCode && parent.siblings().length ) {

                            val = parent.prev().attr( 'data-value' ); // + parent.find( 'input[ type="text" ]' ).val();
                            parent.prev().detach();
                            ev.preventDefault();

                        }

                        // jump backwards
                        var input = parent.find( 'input[ type="text" ]' )
                        val && ( input.val( val + input.val() ) );
                        
                        input.focus();

                    }

                    // move forward (right-arrow or delete)
                    if ( $( this ).val().length == text[ 0 ].selectionEnd && ( 46 == ev.keyCode || 39 == ev.keyCode ) ) {

                        var parent = $( this ).parent();
                        var next = parent.next();

                        // remove next (delete)
                        if ( 46 == ev.keyCode ) {
                            var val = next.attr( 'data-value' );
                            next.detach();
                            $( this ).val( $( this ).val() + val ).focus();
                        } else {
                            next.find( 'input[ type="text" ]' )
                                .focus();
                        }



                    }

                }
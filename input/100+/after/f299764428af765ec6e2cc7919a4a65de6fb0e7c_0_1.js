function( ev ) {

                    // get the selection data
                    var selection = $( this ).getSelection();
                    if ( selection.start != selection.end ) {
                        return; // disregard selection ranges
                    }
                    var cursor = selection.start;
                    var $this = $( this );
                    var end = $this.val().length;

                    // move backwards (left-key)
                    if ( 0 == cursor && KEY_LEFT == ev.keyCode ) {

                        // find and focus on text input box of the previous block
                        $this.parent().prev().find( 'input[ type="text" ]' ).focus();

                    }

                    // move forward (right-key)
                    if ( end == cursor && KEY_RIGHT == ev.keyCode ) {

                        // find and focus on the text input box of the next block
                        $this.parent().next().find( 'input[ type="text" ]' ).focus();

                    }

                    // remove the previous block (backspace)
                    if ( 0 == cursor && KEY_BACKSPACE == ev.keyCode ) {

                        var parent = $this.parent();
                        var prev = parent.prev();

                        // skip if this is the first block
                        if ( !prev.length ) {
                            return;
                        }

                        prev.detach(); // remove the previous block

                        // read the values of the removed text box, block and the current input box
                        var text_val = prev.find( 'input[ type="text" ]' ).val();
                        var val = prev.attr( 'data-value' );
                        var input = parent.find( 'input[ type="text" ]' );

                        // set the input value of the current block
                        input
                            .val( text_val + val + input.val() )
                            .setSelection( text_val.length + val.length, text_val.length + val.length )
                            .focus();

                        ev.preventDefault(); // this backspace shouldn't remove any characters

                    }

                    // remove the next block (delete)
                    if ( end == cursor && KEY_DELETE == ev.keyCode ) {

                        var parent = $this.parent();
                        var next = parent.next();

                        // skip if this is the last block
                        if ( !next.length ) {
                            return;
                        }

                        parent.detach(); // remove this block (practically the next)

                        // read the values of the removed text box, block and the next input box
                        var text_val = $this.val();
                        var val = parent.attr( 'data-value' );
                        var input = next.find( 'input[ type="text" ]' );

                        // set the input value of the next block
                        input
                            .val( text_val + val + input.val() )
                            .setSelection( text_val.length, text_val.length )
                            .focus();

                        ev.preventDefault(); // this delete shouldn't remove any characters

                    }

                }
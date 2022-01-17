function() {

                    var $this = $( this );
                    var parent = $this.parent();
                    var val = $this.val();

                    // dynamic width
                    // TODO: Make it smarter. Set the value into a temporary text field, set its 'size' attribute and then read the width attribute
                    $this.css( 'width', ( 3 + ( 13 * val.length ) ) );

                    // dynamic position
                    var height_compare = parent;
                    if ( height_compare.prev().length ) {
                        height_compare = height_compare.prev().first();
                        console.log( 'prev' );
                    } else if ( height_compare.next().length ) {
                        height_compare = height_compare.next().first();
                        console.log( 'next' );
                    } else {
                        console.log( 'parent' );
                    }
                    height_compare = height_compare.children().last();

                    var top = parseInt( height_compare.css( 'margin-top' ) ) + 
                        ( ( height_compare.innerHeight() - $this.innerHeight() ) / 2 );

                    $this.css( 'top', top + 'px' );

                    // create the blocks
                    var block_values = delimiter( val );
                    if ( 1 >= block_values.length ) return; // no delimiter found, no changes require.

                    var before = parent, first;
                    for ( var i = block_values.length - 2 ; i >= 0  ; i -- ) {
                        var block_value = block_values[ i ];

                        // create & insert the new block element
                        before = make_block( block_fn( block_value ), block_value )
                                    .insertBefore( before );

                        !first && ( first = before );

                    }

                    // clear up the text boxes and focus on next text box
                    $this.val( '' );
                    first.next().find( 'input' )
                        .val( block_values[ block_values.length - 1 ] )
                        .focus()

                }
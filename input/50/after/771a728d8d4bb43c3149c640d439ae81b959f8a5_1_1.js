function ( e ) {
                var $el = $( this );

                if ( 'undefined' != typeof $el.data( 'confirm' ) && !confirm( $el.data( 'confirm' ) ) )
                    return false;
            }
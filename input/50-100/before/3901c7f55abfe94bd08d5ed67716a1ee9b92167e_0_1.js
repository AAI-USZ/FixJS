function( self, type, fun ) {
            return $(self)[type](
                function(ev) {
                    ev = getTouchEvent( ev );
                    fingerDown = ev.identifier;

                    return fun.call( this, ev );
                }
            );
        }
function ( event, delta, deltaX, deltaY ) {
                // delta = deltaY;
                // if( self.options.orientation === 'horizontal' ){
                //     delta = deltaX ? deltaX : deltaY;
                // }
                delta = self.options.orientation === 'vertical' ? deltaY : -1 * deltaX;
                self.scrollHandle( -1 * delta );
                event.preventDefault();
            }
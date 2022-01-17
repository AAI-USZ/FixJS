function ( event, delta, deltaX, deltaY ) {
                delta = self.options.orientation === 'vertical' ? deltaY : deltaX;                
                self.scrollHandle( -1 * delta );
                event.preventDefault();
                clearTimeout( self.enterTimeout );
                setEnterTimeout();
            }
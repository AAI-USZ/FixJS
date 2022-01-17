function () {
            var self = this;

            // Move the scroller with the mousewheel using the event helper
            this.parent.on('mousewheel.scroller', function ( event, delta, deltaX, deltaY ) {
                delta = self.options.orientation === 'vertical' ? deltaY : deltaX;                
                self.scrollHandle( -1 * delta );
                event.preventDefault();
                clearTimeout( self.enterTimeout );
                setEnterTimeout();
            });

            // When clicking, ensure the mouseenter class is set for the duration
            this.handle.on( 'mousedown.scroller', function ( event ) {
                clearTimeout( self.enterTimeout );
                self.handle.addClass('mouseenter');
            });

            $(document).on('mouseup.scroller', function () {
                if( self.handle.hasClass('mouseenter') ){
                    setEnterTimeout();
                }
            });

            // Move the scroller with up/down clicks and mousehold
            this.parent.find('.scroller-up-down').on('mousedown.scroller', function () {
                self.scrollHandle( parseInt( $(this).attr('direction'), 10 ) );
            }).mousehold( self.options.mouseholdTimeout, self.options.mouseholdDeadtime, function () {
                self.scrollHandle( parseInt( $(this).attr('direction'), 10 ) );
            });

            // Clicking in the handle wrap should move handle to that location
            this.handle.parent().on( 'click.scroller', function ( event ) {
                var pos,
                    page = self.dim === 'top' ? event.pageY : event.pageX,
                    clickPos = page - self.handle.parent().offset()[ self.dim ],
                    handlePos = self.handle.position()[self.dim];

                // Make sure not over handle
                if( clickPos < handlePos || ( handlePos + self.handle[ self.func[0] ]() ) < clickPos ){
                    pos = clickPos < handlePos ? clickPos : clickPos - self.handle[ self.func[0] ]();
                    self.handle.draggable( "moveElement", self.dim, pos );
                }
            });

            // Moving mouse into scroller adds 'mouseenter' class
            this.parent.on('mouseenter.scroller', setEnterTimeout );

            function setEnterTimeout() {
                self.handle.addClass('mouseenter');
                self.enterTimeout = setTimeout( function () {
                    self.handle.removeClass('mouseenter');
                }, self.options.enterTimeoutDuration );
            }
        }
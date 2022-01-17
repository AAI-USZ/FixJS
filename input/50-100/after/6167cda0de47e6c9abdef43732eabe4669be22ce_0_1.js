function( p ) {
                p = Math.limit( p, 0.0, 1.0 );
                this.percentVal = p;

                var x = this.width() * p ;
                this.
                        children('.skybrush_slider_bar_slider').
                        translate( x, 0 );

                return this;
            }
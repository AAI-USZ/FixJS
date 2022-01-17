function( args ) {
        args = args || {};
        var min = typeof args.min == 'number' ? args.min : this.minDisplayed;
        var max = typeof args.max == 'number' ? args.max : this.maxDisplayed;

        // make and style the main container div for the axis
        var rulerdiv = this.yscale =
            dojo.create('div', {
                            className: 'ruler vertical_ruler',
                            style: {
                                height: this.height+'px',
                                position: 'absolute',
                                zIndex: 17
                            }
                        }, this.div );

        if( this.window_info && 'x' in this.window_info )
            rulerdiv.style.left = (this.window_info.x + (this.window_info.width||0)/2)+ "px";

        dojo.style(
            rulerdiv,
            ( this.config.align == 'top' ? { top: '0px' } :
              { bottom: this.trackPadding+"px"})
        );

        // now make a Ruler and draw the axis in the div we just made
        var ruler = new Ruler({
            min: min,
            max: max,
            direction: 'up',
            fixBounds: args.fixBounds || false
        });
        ruler.render_to( rulerdiv );

        this.ruler = ruler;
    }
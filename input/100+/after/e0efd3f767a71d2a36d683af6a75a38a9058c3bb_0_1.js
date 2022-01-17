function(anchor){

        // If an anchor was given, we try to get it,
        if('string' === typeof anchor){
            anchor = this.labels[anchor];
        }
        // then we default to the current panel.
        if('undefined' === typeof anchor){
            anchor = this.cur;
        }

        // We obtain the position of the current panel in the frame
        var p = anchor.position();
        var l = p.left;
        var t = p.top;
        // and subtract it from half a frame (FIXME what's frame doing here?) minus half a panel.
        l = (0.5 * (frame.innerWidth() - anchor.outerWidth())) - l;
        t = (0.5 * (frame.innerHeight() - anchor.outerHeight())) - t;
        this.pan(l, t);
    }
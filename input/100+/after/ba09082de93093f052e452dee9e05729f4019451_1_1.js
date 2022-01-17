function() {
        var args = arguments;
        this.bwg.whenReady( this, function() {
            this._readWigDataById.apply( this, args );
        });
    }
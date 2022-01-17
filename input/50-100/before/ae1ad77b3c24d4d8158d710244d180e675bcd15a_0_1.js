function( newValue ) {
        if ( arguments.length ) {
            this.options.value = newValue;
            this._refreshValue();
            this._change( null, 0 );
            return;
        }
        return this.options.value;
    }
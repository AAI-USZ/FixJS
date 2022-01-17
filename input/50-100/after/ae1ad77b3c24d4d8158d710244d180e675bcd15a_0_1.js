function( newValue ) {
        if ( arguments.length ) {
            // Only change if value is new.
            if (this.options.value != newValue){
                this.options.value = newValue;
                this._change( null, 0 );
            }
            this._refreshValue();
            return;
        }
        return this.options.value;
    }
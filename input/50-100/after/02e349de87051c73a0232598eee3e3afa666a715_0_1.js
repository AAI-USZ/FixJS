function( prop, val ){
        if ( ! this.hasOwnProperty( prop ) ){
            return this;
        }

        this[ prop ] = val;
        this.emit( 'update', { property: prop, value: val } );
        this.emit( 'update:' + prop, val );

        return this;
    }
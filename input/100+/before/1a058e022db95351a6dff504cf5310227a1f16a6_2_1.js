function ( expr ) {
        var args;
        if ( typeof expr === 'function' ) {
            args = Z.slice.call( arguments );
            args[0] = expr = expr();
            if ( expr ) return this.change.apply( this, args );
        }
        else return this.query.apply( this, arguments );
    }
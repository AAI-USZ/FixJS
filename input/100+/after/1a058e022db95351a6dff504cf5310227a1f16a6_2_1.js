function ( expr ) {
        var args, match, method;
        if ( typeof expr === 'function' ) {
            args = Z.slice.call( arguments );
            args[0] = expr = expr();
            if ( expr ) return this.change.apply( this, args );
        }
        else if ( typeof expr === 'string' &&
            ( match = expr.match( rxTransitionArrow ) ) &&
            ( method = transitionArrowMethods[ match[1] ] )
        ) {
            if ( arguments.length > 1 ) {
                return this[ method ].apply( this, [ match[2] ]
                    .concat( Z.slice.call( arguments, 1 ) ) );
            } else return this[ method ]( match[2] );
        }
        else return this.query.apply( this, arguments );
    }
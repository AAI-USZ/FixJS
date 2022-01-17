function router( loc ) {
        var i, len, item, rule, func, matches;

        for ( i = 0, len = routes.length; i < len; i++ ) {
            item = routes[ i ];
            rule = item.loc;
            func = item.func;

            if ( rule instanceof RegExp
                 && ( matches = rule.exec( loc ) ) !== null
            ) {
                func.apply( this, matches );
                break;

            } else if ( typeof rule == 'string' 
                        && rule == loc
            ) {
                func.call( this, loc );
                break;

            }
        }
    }
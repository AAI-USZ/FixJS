function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( prop.indexOf("-") == -1 && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
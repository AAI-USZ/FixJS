function ( initer, opt_index ) {
        if ( typeof opt_index == 'number' ) {
            if ( initers[ opt_index ] ) {
                initers.splice( opt_index, 0, initer );
            } else {
                initers[ opt_index ] = initer;
            }
        } else {
            initers.push( initer );
        }
    }
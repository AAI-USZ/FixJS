function ( initer, opt_index ) {
        if ( typeof opt_index == 'number' ) {
            initers.splice( opt_index, 0, initer );
        } else {
            initers.push( initer );
        }
    }
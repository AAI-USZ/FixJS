function( arr ) {
		var arrLen = arr.length,
			_arr = arr.slice().sort( ascNum ),
			count = 1,
			maxCount = 0,
			numMaxCount = 0,
			i = 0,
			mode_arr = [];
		for ( ; i < arrLen; i++ ) {
			if ( _arr[ i ] === _arr[ i + 1 ] ) {
				count++;
			} else {
				if ( count > maxCount ) {
					mode_arr = [ _arr[i] ];
					maxCount = count;
					numMaxCount = 0;
				} 
				// are there multiple max counts
				else if ( count === maxCount ) {
					mode_arr.push(_arr[i]);
					numMaxCount++;
				}
				
				// resetting count for new value in array
				count = 1;
			}
		}
		return ( numMaxCount === 0 ) ? mode_arr[0] : mode_arr;
	}
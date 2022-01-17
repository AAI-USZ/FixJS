function( arr ) {
		var arrLen = arr.length,
			_arr = arr.slice().sort( ascNum ),
			count = 1,
			maxCount = 0,
			numMaxCount = 0,
			i = 0,
			maxNum;
		for ( ; i < arrLen; i++ ) {
			if ( _arr[ i ] === _arr[ i + 1 ] ) {
				count++;
			} else {
				if ( count > maxCount ) {
					maxNum = _arr[i];
					maxCount = count;
					count = 1;
					numMaxCount = 0;
				} else {
					// are there multiple max counts
					if ( count === maxCount ) {
						numMaxCount++;
					// count is less than max count, so reset values
					} else {
						count = 1;
					}
				}
			}
		}
		return ( numMaxCount === 0 ) ? maxNum : false;
	}
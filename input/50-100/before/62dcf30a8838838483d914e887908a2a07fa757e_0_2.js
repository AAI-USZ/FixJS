function( arr ) {
		arr = isArray( arr[0] ) ? arr : [ arr ];
		if( arr.length > 1 && arr[0][length] > 1 ) {
			// matrix norm
		} else {
			// vector norm
			return Math.sqrt( jStat.dot( arr, arr ) );
		}
	}
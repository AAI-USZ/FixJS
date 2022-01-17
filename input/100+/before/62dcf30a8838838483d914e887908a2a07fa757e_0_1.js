function( arr, arg ) {
		arr = isArray( arr[0] ) ? arr : [ arr ];
		arg = isArray( arg[0] ) ? arg : [ arg ];

		// convert column to row vector
		var left = ( arr[0].length === 1 && arr[length] !== 1 ) ? jStat.transpose( arr ) : arr,
			right = ( arg[0].length === 1 && arg[length] !== 1 ) ? jStat.transpose( arg ) : arg,
			res = [],
			row = 0,
			nrow = left.length,
			ncol = left[0].length,
			sum, col;
		for( ; row < nrow; row++ ) {
			res[row] = [];
			sum = 0;
			for( col = 0; col < ncol; col++ ) {
				sum += left[row][col] * right[row][col];
			}
			res[row] = sum;
		}
		return ( res.length === 1 ) ? res[0] : res;
	}
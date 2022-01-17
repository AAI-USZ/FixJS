function( arr ) {
		// if arr is matrix, return as it is the desired cumulative matrix
		if ( jStat.utils.isArray(arr[0]) )
		{
			return arr;
		}
			
		var len = arr.length,
			sums = new Array( len ),
			i = 1;
		sums[0] = arr[0];
		for ( ; i < len; i++ ) {
			sums[i] = sums[i - 1] + arr[i];
		}
		return sums;
	}
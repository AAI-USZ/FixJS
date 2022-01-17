function( arr ) {
		var len = arr.length,
			sums = new Array( len ),
			i = 1;
		sums[0] = arr[0];
		for ( ; i < len; i++ ) {
			sums[i] = sums[i - 1] + arr[i];
		}
		return sums;
	}
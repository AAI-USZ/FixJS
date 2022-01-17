function( min, max, length, func ) {
		var arr = [],
			hival = 1e15,	// simple fix for IEEE floating point errors
			step = ( max * hival - min * hival ) / (( length - 1 ) * hival ),
			current = min,
			cnt = 0;
		for ( ; current <= max; cnt++, current = ( min * hival + step * hival * cnt ) / hival ) {
			arr.push(( func ? func( current ) : current ));
		}
		return arr;
	}
function( fullbool, func ) {
	var arr = [],
		i = 0,
		tmpthis = this;
	// assignment reassignation depending on how parameters were passed in
	if ( isFunction( fullbool )) {
		func = fullbool;
		fullbool = false;
	}
	// check if a callback was passed with the function
	if ( func ) {
		setTimeout( function() {
			func.call( tmpthis, jStat.fn.cumsum.call( tmpthis, fullbool ));
		}, 15 );
		return this;
	}
	// check if matrix and run calculations
	if ( this.length > 1 ) {
		tmpthis = fullbool === true ? this : this.transpose();
		for ( ; i < tmpthis.length; i++ )
			arr[i] = jStat.cumsum( tmpthis[i] );
		return arr;
	}
}
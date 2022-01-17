function( arr ) {
		var issymmetric = true,
			row = 0,
			size = arr.length, col;
		if( arr.length !== arr[0].length ) return false;
		for ( ; row < size; row++ ) {
			for ( col = 0; col < size; col++ ) {
				if ( arr[col][row] !== arr[row][col] ) return false;
			}
		}
		return true;
	}
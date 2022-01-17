function for_each_tile( func ) {
	y_max = Math.floor($oldbusted.height() / 48) - 1;
	x_max = Math.floor($oldbusted.width() / 48) - 1;
	for( var y = 0; y <= y_max; y++ ) {
		for( var x = 0; x <= x_max; x++ ) {
			func( x , y );
		}
	}
}
function( userId ){
		var colors = [ '#D799A6', '#3761AE', '#CAA385', '#8FA3A4', '#3798DC' ];
		var inx = userId % colors.length + 1;
		return colors[ inx ];
	}
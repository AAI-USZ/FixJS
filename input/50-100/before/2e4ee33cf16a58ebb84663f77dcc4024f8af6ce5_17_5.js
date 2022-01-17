function quote( str ) {
		return '"' + str.toString().replace(/"/g, '\\"') + '"';
	}
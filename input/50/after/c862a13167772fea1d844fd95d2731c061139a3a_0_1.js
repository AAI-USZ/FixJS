function() {
		return this.name.replace( /\./g, '-' ); + " " + (new Date()).getTime();
	}
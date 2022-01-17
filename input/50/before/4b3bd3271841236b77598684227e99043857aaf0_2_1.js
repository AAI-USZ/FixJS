function(loglevel, s) {
	     if( console && console.log && o.verbosity >= loglevel ) {
		 console.log("jQuery.reloadify: " + s);
	     }
	 }
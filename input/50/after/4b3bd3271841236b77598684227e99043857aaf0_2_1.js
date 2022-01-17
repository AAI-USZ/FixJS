function(loglevel, s) {
	     // Workaround for stupid old IEs
	     if( typeof window.console !== "undefined" && console.log && 
		 o.verbosity >= loglevel ) {
		 console.log("jQuery.reloadify: " + s);
	     }
	 }
function( fn ) {
		var div = document.createElement("div"),
			pass = fn( div );
		// release memory in IE
		div = null;
		return pass;
	}
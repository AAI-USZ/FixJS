function( div ) {
		var pass = true,
			id = "script" + (new Date()).getTime();
		div.innerHTML = "<a name ='" + id + "'/>";

		// Inject it into the root element, check its status, and remove it quickly
		docElem.insertBefore( div, docElem.firstChild );

		if ( document.getElementById( id ) ) {
			pass = false;
		}
		docElem.removeChild( div );
		return pass;
	}
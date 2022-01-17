function addToHistory( page ) {
		var blacklist = [ 'locationlookup-page' ];
		var blacklisted = blacklist.indexOf( page ) > -1;
		if( !blacklisted &&
			pageHistory[ pageHistory.length - 1 ] !== page ) { // avoid adding the same page twice
			pageHistory.push( page );
		}
	}
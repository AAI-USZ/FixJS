function addToHistory( page ) {
		if( pageHistory[ pageHistory.length - 1 ] !== page ) { // avoid adding the same page twice
			pageHistory.push( page );
		}
	}
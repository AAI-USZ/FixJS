function(x) {
	if(typeof(x) != "string") {
		throw "findISBNs: argument must be a string";
	}
	var isbns = [];

	// Match lines saying "isbn: " or "ISBN-10:" or similar, consider m-dashes and n-dashes as well
	var pattern = /(SBN|sbn)[ \u2014\u2013\u2012-]?(10|13)?[: ]*([0-9X][0-9X \u2014\u2013\u2012-]+)/g; 
	var match;
	
	while (match = pattern.exec(x)) {
		Zotero.debug("isbn0: " + match);
		var isbn = match[3];
		isbn = isbn.replace(/[ \u2014\u2013\u2012-]/g, '');
		if(isbn.length==20 || isbn.length==26) { 
			// Handle the case of two isbns (e.g. paper+hardback) next to each other
			isbns.push(isbn.slice(0,isbn.length/2), isbn.slice(isbn.length/2));
		} else if(isbn.length==23) { 
			// Handle the case of two isbns (10+13) next to each other
			isbns.push(isbn.slice(0,10), isbn.slice(10));
		} else if(isbn.length==10 || isbn.length==13) {
			isbns.push(isbn);
		}
	}

	// Validate ISBNs
	var validIsbns = [];
	for (var i =0; i < isbns.length; i++) {
		if(this._isValidISBN(isbns[i])) validIsbns.push(isbns[i]);
	}
	Zotero.debug("validIsbns: " + validIsbns);
	return validIsbns;
}
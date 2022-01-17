function(isbn) {
	if(isbn.length == 13) {
		// ISBN-13 should start with 978 or 979 i.e. GS1 for book publishing industry
		var prefix = isbn.slice(0,3);
		if (prefix != "978" && prefix != "979") return false;
		// Verify check digit
		var check = 0;
		for (var i = 0; i < 13; i+=2) check += isbn[i]*1;
		for (i = 1; i < 12; i+=2) check += 3 * isbn[i]*1;
		return (check % 10 == 0);
	} else if(isbn.length == 10) {
		// Verify ISBN-10 check digit
		var check = 0;
		for (var i = 0; i < 9; i++) check += isbn[i]*1 * (10-i);
		// last number might be 'X'
		if (isbn[9] == 'X' || isbn[9] == 'x') check += 10;
		else check += isbn[i]*1;
		return (check % 11 == 0);
	}
	return false;
}
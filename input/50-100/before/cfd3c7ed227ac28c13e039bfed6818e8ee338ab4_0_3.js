function convert_isbn13_to_isbn10(upc) {
	upc = upc.replace(/-/g, "");
	upc = upc.replace(/\s/g, "");
	if(validate_ean13(upc)===false) { return false; }
	if(!upc.match(/^978(\d{9})/)) {
	return false; }
	if(upc.match(/^978(\d{9})/)) {
	upc_matches = upc.match(/^978(\d{9})/);
	isbn10 = upc_matches[1]+validate_isbn10(upc_matches[1],true); }
	return isbn10; }
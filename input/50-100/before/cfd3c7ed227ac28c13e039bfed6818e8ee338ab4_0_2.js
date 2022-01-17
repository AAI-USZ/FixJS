function convert_isbn10_to_isbn13(upc) {
	upc = upc.replace(/-/g, "");
	upc = upc.replace(/\s/g, "");
	if(validate_isbn10(upc)===false) { return false; }
	if(upc.length>9) { fix_matches = upc.match(/^(\d{9})/); upc = fix_matches[1]; }
	isbn13 = "978"+upc+validate_ean13("978"+upc,true); 
	return isbn13; }
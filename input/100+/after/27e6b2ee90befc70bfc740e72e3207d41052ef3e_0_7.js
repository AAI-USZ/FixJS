function convert_issn8_to_issn13(upc) {
	upc = upc.replace(/-/g, "");
	upc = upc.replace(/\s/g, "");
	upc = upc.replace(/X/g, "");
	if(validate_issn8(upc)==false) { return false; }
	if(upc.length>7) { fix_matches = upc.match(/^(\d{7})/); upc = fix_matches[1]; }
	issn13 = "977"+upc+"00"+validate_ean13("977"+upc+"00",true); 
	return issn13; }
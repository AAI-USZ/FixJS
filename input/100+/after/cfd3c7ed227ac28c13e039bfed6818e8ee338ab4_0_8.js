function convert_issn13_to_issn8(upc) {
	upc = upc.replace(/-/g, "");
	upc = upc.replace(/\s/g, "");
	upc = upc.replace(/X/g, "");
	if(validate_ean13(upc)==false) { return false; }
	if(!upc.match(/^977(\d{7})/)) {
	return false; }
	if(upc.match(/^977(\d{7})/)) {
	upc_matches = upc.match(/^977(\d{7})/);
	issn8 = upc_matches[1]+validate_issn8(upc_matches[1],true); }
	return issn8; }
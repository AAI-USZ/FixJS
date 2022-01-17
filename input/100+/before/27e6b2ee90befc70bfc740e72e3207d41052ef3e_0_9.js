function convert_ismn13_to_ismn10(upc) {
	upc = upc.replace(/M/g, "");
	upc = upc.replace(/-/g, "");
	upc = upc.replace(/\s/g, "");
	if(validate_ean13(upc)===false) { return false; }
	if(!upc.match(/^9790(\d{8})/)) {
	return false; }
	if(upc.match(/^9790(\d{8})/)) {
	upc_matches = upc.match(/^9790(\d{8})/);
	ismn10 = upc_matches[1]+validate_ismn10(upc_matches[1],true); }
	return ismn10; }
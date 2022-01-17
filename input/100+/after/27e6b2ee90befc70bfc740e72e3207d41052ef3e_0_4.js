function convert_itf14_to_ean13(upc) {
	if(upc.length==13) { upc = "0".upc; }
	if(upc.length>14||upc.length<14) { return false; }
	if(validate_itf14(upc)==false) { return false; }
	if(!upc.match(/^(\d{1})(\d{12})(\d{1})/)) {
	return false; }
	if(upc.match(/^(\d{1})(\d{12})(\d{1})/)) {
	upc_matches = upc.match(/^(\d{1})(\d{12})(\d{1})/);
	ean13 = upc_matches[2]+validate_ean13(upc_matches[2], true); }
	return ean13; }
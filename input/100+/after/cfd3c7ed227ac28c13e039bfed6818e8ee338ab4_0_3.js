function convert_ean13_to_upca(upc) {
	if(upc.length==12) { upc = "0".upc; }
	if(upc.length>13||upc.length<13) { return false; }
	if(validate_ean13(upc)==false) { return false; }
	if(!upc.match(/^0(\d{12})/)) {
	return false; }
	if(upc.match(/^0(\d{12})/)) {
	upc_matches = upc.match(/^0(\d{12})/);
	upca = upc_matches[1]; }
	return upca; }
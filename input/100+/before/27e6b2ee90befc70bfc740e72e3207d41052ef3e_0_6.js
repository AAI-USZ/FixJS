function convert_upca_to_ean8(upc) {
	if(upc.length==11) { upc = upc+validate_upca(upc,true); }
	if(upc.length>12||upc.length<12) { return false; }
	if(validate_upca(upc)===false) { return false; }
	if(!preg_match(/^0000(\d{8})/, upc, upc_matches)) {
	return false; }
	if(preg_match(/^0000(\d{8})/, upc, upc_matches)) {
	ean8 = upc_matches[1]; }
	return ean8; }
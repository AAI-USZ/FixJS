function convert_ean8_to_upca(upc) {
	if(upc.length==7) { upc = upc+validate_ean8(upc,true); }
	if(upc.length>8||upc.length<8) { return false; }
	if(validate_ean8(upc)===false) { return false; }
	upca = "0000"+upc; 
	return upca; }
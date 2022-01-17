function convert_ean13_to_itf14(upc) {
	if(upc.length==11) { upc = upc+validate_upca(upc,true); }
	if(upc.length==12) { upc = "0"+upc; }
	if(upc.length>14||upc.length<13) { return false; }
	if(validate_ean13(upc)===false) { return false; }
	if(upc.length==13) { itf14 = "0"+upc; }
	if(upc.length==14) { itf14 = upc; }
	return itf14; }
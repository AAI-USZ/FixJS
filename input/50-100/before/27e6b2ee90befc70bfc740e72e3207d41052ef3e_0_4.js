function convert_ismn10_to_ismn13(upc) {
	upc = upc.replace(/M/g, "");
	upc = upc.replace(/-/g, "");
	upc = upc.replace(/\s/g, "");
	if(validate_ismn10(upc)===false) { return false; }
	if(upc.length>8) { fix_matches = upc.match(/^(\d{8})/); upc = fix_matches[1]; }
	ismn13 = "9790"+upc+validate_ean13("9790"+upc,true); 
	return ismn13; }
function parseVariable(type) {
	var variable = null;
	
	// {...sometype} means variable number of that type
	if ( /^(\.\.\.)(.+)$/.test(type) ) {
		type = RegExp.$2;
		variable = true;
	}
	
	return [type, variable];
}
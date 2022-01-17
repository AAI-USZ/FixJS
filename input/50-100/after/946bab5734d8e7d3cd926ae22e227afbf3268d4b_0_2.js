function() {
	var keys = [];
	for ( var key in localStorage ) {		
  	if ( key.match(/^dataPragma\d+/) ) {
			keys.push(key);
		}
	}

	for ( var item in keys ) {
		localStorage.removeItem(keys[item]);		
	}

	console.log("Removed values: " + keys.length);
}
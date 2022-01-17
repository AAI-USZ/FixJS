function() {
	var values = [];
	for ( var key in localStorage ) {		
  	if ( key.match(/^dataPragma\d+/) ) {
  		values.push(localStorage.getItem(key));  		  		
  	}
	}

	console.log("Stored pragma values: " + values);
	
	return values;	
}
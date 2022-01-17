function() {
	var inputs = $(":text");
	this.pragmas = [];
	this.resetLocalStorage();
	
	for ( var i = 0, length = inputs.length; i < length; i++ ) {
		var input = inputs[i];		

		// var value = value.replace(/^\s+|\s+$/g, "");
		var value = $.trim(input.value); 		

		if ( value !== "" ) {
			localStorage.setItem("dataPragma"+i, value);				
			console.log("Saved: " + value);
		}

		this.pragmas.push(value);
	}	
}
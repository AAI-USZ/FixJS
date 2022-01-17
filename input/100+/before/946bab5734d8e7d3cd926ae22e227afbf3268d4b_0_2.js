function() {
	var inputs = $(":text");
	this.pragmas = [];
	this.resetLocalStorage();

	var msg = "Values saved! \n";
	for ( var i = 0, length = inputs.length; i < length; i++ ) {
		var input = inputs[i];		

		// var value = value.replace(/^\s+|\s+$/g, "");
		var value = $.trim(input.value); 		

		if ( value !== "" ) {
			localStorage.setItem("dataPragma"+i, value);	
			msg = "\ndataPragma" + i + ": " + value;
		}

		this.pragmas.push(value);
	}

	alert(msg);
}
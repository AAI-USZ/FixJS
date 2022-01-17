function() {
	var inputs = $(":text");
	var pragmas = [];
	this.resetLocalStorage();
	
	var index = 0;
	for ( var i = 0, length = inputs.length; i < length; i++ ) {
		var input = inputs[i];		

		// var value = value.replace(/^\s+|\s+$/g, "");
		var value = $.trim(input.value); 		

		if ( value !== "" ) {
			var subvalues = value.split(" ");
			for ( var item in subvalues ) {				
				localStorage.setItem("dataPragma"+index, subvalues[item]);			
				pragmas.push(subvalues[item]);
				console.log("Saved: " + subvalues[item]);
				index += 1;
			}			
		}	
	}

	alert("Values saved: " + pragmas + "\n\nRestart your browser.");
}
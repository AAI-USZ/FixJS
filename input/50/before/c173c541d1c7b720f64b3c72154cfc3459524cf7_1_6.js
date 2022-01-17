function(aState, str) {
		 	check(aState, aState, str, isString, 'string-numeric?', 'string', 1);
			aState.v =  isNumericString(str);
		 }
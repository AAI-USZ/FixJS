function(aState, str) {
		 	check(aState, str, isString, 'string-numeric?', 'string', 1);
			aState.v =  isNumericString(str);
		 }
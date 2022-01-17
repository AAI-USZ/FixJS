function(aState, str) {
		 	check(aState, aState, str, isString, 'string-copy', 'string', 1);
			aState.v =  types.string(str.toString());
		 }
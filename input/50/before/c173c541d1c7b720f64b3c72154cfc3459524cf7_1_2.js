function(aState, str) {
		 	check(aState, aState, str, isString, 'string->symbol', 'string', 1);
			aState.v =  types.symbol(str.toString());
		 }
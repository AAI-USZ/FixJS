function(aState, str) {
		 	check(aState, aState, str, isString, 'string->immutable-string', 'string', 1);
			aState.v =  str.toString();
		 }
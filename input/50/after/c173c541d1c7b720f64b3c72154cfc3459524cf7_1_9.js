function(aState, str) {
		 	check(aState, str, isString, 'string->immutable-string', 'string', 1);
			aState.v =  str.toString();
		 }
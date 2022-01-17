function(aState, str) {
		 	check(aState, aState, str, isString, 'string-whitespace?', 'string', 1);
			aState.v =  isWhitespaceString(str);
		 }
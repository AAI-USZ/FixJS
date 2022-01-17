function(aState, str) {
		 	check(aState, str, isString, 'string-whitespace?', 'string', 1);
			aState.v =  isWhitespaceString(str);
		 }
function(aState, str) {
		 	check(aState, str, isString, 'string-alphabetic?', 'string', 1);
			aState.v =  isAlphabeticString(str);
		 }
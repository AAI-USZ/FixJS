function(aState, str) {
		 	check(aState, str, isString, 'string-upper-case?', 'string', 1);
			var primStr = str.toString();
			aState.v =  isAlphabeticString(str) && primStr.toUpperCase() === primStr;
		 }
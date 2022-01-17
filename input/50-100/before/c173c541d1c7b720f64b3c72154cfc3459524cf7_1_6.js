function(aState, str) {
		 	check(aState, aState, str, isString, 'string-lower-case?', 'string', 1);
			var primStr = str.toString();
			aState.v =  isAlphabeticString(str) && primStr.toLowerCase() === primStr;
		 }
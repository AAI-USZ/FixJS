function(aState, str, num) {
		 	check(aState, str, isString, 'string-ith', 'string', 1, arguments);
			check(aState, num, function(x) { return isNatural(x) && jsnums.lessThan(x, str.length); }, 'string-ith',
			      'exact integer in [0, length of the given string minus 1 (' + (str.length-1) + ')]', 2, arguments);
			aState.v =  types.string( str.charAt(jsnums.toFixnum(num)) );
		 }
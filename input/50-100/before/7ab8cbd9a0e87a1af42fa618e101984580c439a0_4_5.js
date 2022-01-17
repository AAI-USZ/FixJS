function(aState, num) {
		 	check(aState, aState, num, function(x) {
					if ( !isInteger(x) ) {
						return false;
					}
					var n = jsnums.toFixnum(x);
					return ((n >= 0 && n < 55296) ||
						(n > 57343 && n <= 1114111));
				},
				'int->string',
				'exact integer in [0,55295] or [57344,1114111]',
				1);

			aState.v =  types.string( String.fromCharCode(jsnums.toFixnum(num)) );
		 }
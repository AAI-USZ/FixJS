function(aState, str) {
		 	check(aState, aState, str, isString, 'string->list', 'string', 1);

			var lst = types.EMPTY;
			for (var i = str.length-1; i >= 0; i--) {
				lst = types.cons(types['char'](str.charAt(i)), lst);
			}
			aState.v =  lst;
		 }
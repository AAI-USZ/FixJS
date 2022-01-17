function(aState, str, c) {
		 	check(aState, aState, str, function(x) { return isString(x) && typeof x != 'string'; },
			      'string-fill!', 'mutable string', 1, arguments);
			check(aState, aState, c, isChar, 'string-fill!', 'char', 2, arguments);

			for (var i = 0; i < str.length; i++) {
				str.set(i, c.val);
			}
			aState.v =  types.VOID;
		 }
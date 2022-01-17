function(aState, str, k, c) {
		 	check(aState, aState, str, function(x) { return isString(x) && typeof x != 'string'; },
			      'string-set!', 'mutable string', 1, arguments);
			check(aState, aState, k, isNatural, 'string-set!', 'non-negative exact integer', 2, arguments);
			check(aState, aState, c, isChar, 'string-set!', 'char', 3, arguments);

			if ( jsnums.greaterThanOrEqual(k, str.length) ) {
				var msg = ('string-set!: index ' + n + ' out of range ' +
					   '[0, ' + (str.length-1) + '] for string: ' +
					   types.toWrittenString(str));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			str.set(jsnums.toFixnum(k), c.val);
			aState.v =  types.VOID;
		 }
function(aState, num, f) {
		 	check(aState, aState, num, isNatural, 'build-string', 'non-negative exact integer', 1, arguments);
			check(aState, aState, f, isFunction, 'build-string', 'procedure', 2, arguments);

			var buildStringHelp = function(n, acc) {
				if ( jsnums.greaterThanOrEqual(n, num) ) {
					return types.string(acc);
				}

				return CALL(f, [n],
					function(res) {
						check(aState, aState, res, isChar, 'build-string',
						      'procedure that returns a char', 2);
						return buildStringHelp(n+1, acc.push(res.val));
					});
			}
			aState.v =  buildStringHelp(0, []);
		 }
function useStrictEquality( b, a ) {
				if ( b instanceof a.constructor || a instanceof b.constructor ) {
					// to catch short annotaion VS 'new' annotation of a
					// declaration
					// e.g. var i = 1;
					// var j = new Number(1);
					return a == b;
				} else {
					return a === b;
				}
			}
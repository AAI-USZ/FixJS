function(array, fn, scope) {
			// normal use of array.filter() specified in the ECMA-262 standard
			if (supportFilter) {
				return array.filter(fn, scope);
			}
			
			// compatibility workaround if current javascript cannot support Array.filter()
			// see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
			else {
				if ((!XM.isFunction(fn)) || XM.isNull(fn)) throw new TypeError();
				
				var result = [],
						len = array.length;
							
				for (var i=0; i<len; i++) {
					if (i in array) {
						if (fn.call(scope, array[i], i, array)) {
							result.push(array[i]);
						}
					}
				}
				return result;
			}
		}
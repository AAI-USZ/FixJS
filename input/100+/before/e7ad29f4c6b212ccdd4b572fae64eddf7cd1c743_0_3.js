function(){

	//a set of browser support detection.
	var proto = Array.prototype,
			slice = proto.slice,
			supportFilter			= 'filter' in proto,
			supportForEach		= 'forEach' in proto,
			supportIndexOf		= 'indexOf' in proto,
			supportEvery			= 'every' in proto,
			supportMap				= 'map' in proto,
			supportSome				= 'some' in proto,
			supportReduce			= 'reduce' in proto,
			//determine if Array.splice is supported..
			supportSplice			= function() {
				var array = [],
						lnBefore,
						lnAfter,
						ss = [];

				if (!array.splice) return false;

				//start testing for IE8 splice bug (http://social.msdn.microsoft.com/Forums/lv-LV/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a)
				for(var j=0; j<20; j++) {
					ss.push("A");
				}

				ss.splice(15, 0, "F", "F", "F", "F", "F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F","F");
				lnBefore = ss.length;
				ss.splice(13, 0, "XXX"); //if IE8 used, length of ss will be 55 instead of 42..
				lnAfter = ss.length;

				if (lnBefore+1 != lnAfter) return false
				else return true
			};

	function fixArrayIndex (array, index) {
		return (index < 0) ? Math.max(0, array.length + index) : Math.min(array.length, index);
	}

	function replaceNative(array, index, removeCount, insert) {
		if (insert && insert.length) {
			if (index < array.length) {
				array.splice.apply(array, [index, removeCount].concat(insert))
			}
			else {
				array.push.apply(array, insert);
			}
		}
		else {
			array.splice(index, removeCount);
		}
		return array;
	}

	function replaceExtend(array, index, removeCount, insert) {
		var add = insert ? insert.length : 0,
			length = array.length,
			pos = fixArrayIndex(array, index);

		if (pos === length) {
			if (add) {
				array.push.apply(array, insert);
			}
		} else {
			var remove = Math.min(removeCount, length - pos),
				tailOldPos = pos + remove,
				tailNewPos = tailOldPos + add - remove,
				tailCount = length - tailOldPos,
				lengthAfterRemove = length - remove,
				i;

			if (tailNewPos < tailOldPos) { // case A
				for (i = 0; i < tailCount; ++i) {
					array[tailNewPos+i] = array[tailOldPos+i];
				}
			} else if (tailNewPos > tailOldPos) { // case B
				for (i = tailCount; i--; ) {
					array[tailNewPos+i] = array[tailOldPos+i];
				}
			} // else, add == remove (nothing to do)

			if (add && pos === lengthAfterRemove) {
				array.length = lengthAfterRemove; // truncate array
				array.push.apply(array, insert);
			} else {
				array.length = lengthAfterRemove + add; // reserves space
				for (i = 0; i < add; ++i) {
					array[pos+i] = insert[i];
				}
			}
		}

		return array;
	}

	function spliceNative(array) {
		return array.splice.apply(array, slice.call(arguments, 1));
	}

	function spliceExtend(array, index, removeCount) {
		var pos = fixArrayIndex(array, index),
			removed = array.slice(index, fixArrayIndex(array, pos+removeCount));

		if (arguments.length < 4) {
			replaceSim(array, pos, removeCount);
		} else {
			replaceSim(array, pos, removeCount, slice.call(arguments, 3));
		}

		return removed;
	}

	function eraseNative(array, index, removeCount) {
		array.splice(index, removeCount);
		return array;
	}

	function eraseExtend(array, index, removeCount) {
		return replaceExtend(array, index, removeCount);
	}

	var erase 	= supportSplice ? eraseNative : eraseExtend,
			replace = supportSplice ? replaceNative : replaceNative,
			splice 	= supportSplice ? spliceNative : spliceExtend;

	XM.Array = {

		/**
		 * 
		 */
		erase: erase,

		/**
		 *
		 */
		replace: replace,

		/**
		 *
		 */
		splice: splice,
		
		/**
		 * Check wheter the specified item is in the specified array.
		 * @param {Array} array The array to check.
		 * @param {Any}   item  The item to look for.
		 * @return {Boolean} Will return true if the specified item is in the array. Otherwise, will return false.
		 */
		inArray: function(array, item) {
			if (supportIndexOf) {
				return (array.indexOf(item) > -1);
			}

			var i, len;

			for (i = 0, len = array.length; i < len; i++) {
				if (array[i] === item) {
					return true;
				}
			}
			return false;
		},
		
		/**
		 * Filtering an {array} by returning a new array that pass the test implemented by the {fn} function
		 * @param {Array}     array Original array to be filtered.
		 * @param {Function}  fn    The test function.
		 * @param {Object}    scope The scope (i.e: reference to "this" keyword) of the test function
		 * @return {Array}    The filtered array
		 */
		filter: function(array, fn, scope) {
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
				return result
			}
		},

		/**
		 * Clone a flat array without referencing the previous one. A shorthand for Array.prototype.slice.call()
		 * @param {Array} array The array.
		 * @return {Array} The cloned array
		 */
		clone: function(array) {
				return Array.prototype.slice.call(array);
		}
	}
}
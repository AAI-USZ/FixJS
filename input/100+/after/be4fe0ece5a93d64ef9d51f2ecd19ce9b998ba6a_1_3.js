function() {

	// #region ExoWeb.Config
	//////////////////////////////////////////////////

	var config = {
		// Indicates that signal should use window.setTimeout when invoking callbacks. This is
		// done in order to get around problems with browser complaining about long-running script.
		signalTimeout: false,

		// The maximum number of pending signals to execute as a batch.
		// By default this is null, which means that no maximum is enforced.
		signalMaxBatchSize: null,

		// Causes the query processing to load model roots in the query individually. By default they are batch-loaded.
		individualQueryLoading: false,

		// Uniquely identifies this application if more than one app is hosted under the same domain name.
		appInstanceId: "?",

		// Controls different whether lazy loading are allowed. If set to false, an error is raised when lazy loading occurs.
		allowTypeLazyLoading: true,
		allowObjectLazyLoading: true,
		allowListLazyLoading: true
	};

	ExoWeb.config = config;

	// #endregion

	// #region ExoWeb.TypeChecking
	//////////////////////////////////////////////////

	var typeExpr = /\s([a-z|A-Z]+)/;

	function type(obj) {
		if (obj === undefined) {
			return "undefined";
		}
		else if (obj === null) {
			return "null";
		}
		else {
			return Object.prototype.toString.call(obj).match(typeExpr)[1].toLowerCase();
		}
	}
	ExoWeb.type = type;

	function isNullOrUndefined(obj) {
		return obj === null || obj === undefined;
	}
	ExoWeb.isNullOrUndefined = isNullOrUndefined;

	function isArray(obj) {
		return type(obj) === "array";
	}
	ExoWeb.isArray = isArray;

	function isString(obj) {
		return type(obj) === "string";
	}
	ExoWeb.isString = isString;

	function isNumber(obj) {
		return type(obj) === "number";
	}
	ExoWeb.isNumber = isNumber;

	var integerExpr = /^-?[0-9]+$/;

	function isInteger(obj) {
		return isNumber(obj) && !isNaN(obj) && integerExpr.test(obj.toString());
	}
	ExoWeb.isInteger = isInteger;

	function isNatural(obj) {
		return isInteger(obj) && obj > 0;
	}
	ExoWeb.isNatural = isNatural;

	function isWhole(obj) {
		return isInteger(obj) && obj >= 0;
	}
	ExoWeb.isWhole = isWhole;

	var decimalExpr = /^-?[0-9]+\.[0-9]+$/;

	function isDecimal(obj) {
		return isNumber(obj) && !isNaN(obj) && decimalExpr.test(obj.toString());
	}
	ExoWeb.isDecimal = isDecimal;

	function isFunction(obj) {
		return type(obj) === "function";
	}
	ExoWeb.isFunction = isFunction;

	function isObject(obj) {
		return type(obj) === "object" || (obj && obj instanceof Object);
	}
	ExoWeb.isObject = isObject;

	// #endregion

	// #region ExoWeb.Random
	//////////////////////////////////////////////////

	function randomInteger(min, max) {
		var scale;
		if (arguments.length === 0) {
			min = 0;
			max = 9;
		}
		else if (arguments.length === 1) {
			if (!isInteger(min)) {
				throw new Error("Minimum argument must be an integer.");
			}

			if (min < 0) {
				max = 0;
			}
			else {
				max = min;
				min = 0;
			}
		}
		else if (!isInteger(min)) {
			throw new Error("Minimum argument must be an integer.");
		}
		else if (!isInteger(max)) {
			throw new Error("Maximum argument must be an integer.");
		}
		else if (min >= max) {
			throw new Error("Minimum argument must be less than maximum argument.");
		}

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	ExoWeb.randomInteger = randomInteger;

	function randomText(len) {
		if (arguments.length === 0) {
			throw new Error("Length argument is required.");
		}
		else if (!isNatural(len)) {
			throw new Error("Length argument must be a natural number.");
		}

		var result = "";
		for (var i = 0; i < len; i++) {
			result += String.fromCharCode(randomInteger(97, 122));
		}
		return result;
	}

	ExoWeb.randomText = randomText;

	// #endregion

	// #region ExoWeb.Function
	//////////////////////////////////////////////////

	var overridableNonEnumeratedMethods;

	for (var m in {}) {
		if (m == "toString") {
			overridableNonEnumeratedMethods = [];
			break;
		}
	}

	if (!overridableNonEnumeratedMethods)
		overridableNonEnumeratedMethods = ["toString", "toLocaleString", "valueOf"];

	function addPrototypeMember(obj, name, member) {

		// method
		if (member instanceof Function) {
			obj[name] = member;
		}

		// property
		else if (member instanceof Object) {
			Object.defineProperty(obj, name, member);
		}

		// field
		else {
			obj[name] = member;
		}
	}

	Function.prototype.mixin = function mixin(members, obj) {
		if (!obj) {
			obj = this.prototype;
		}

		for (var m in members) {
			var member = members[m];
			if (members.hasOwnProperty(m)) {
				addPrototypeMember(obj, m, member);
			}
		}

		// IE's "in" operator doesn't return keys for native properties on the Object prototype
		overridableNonEnumeratedMethods.forEach(function (m) {
			var member = members[m];
			if (members.hasOwnProperty(m)) {
				addPrototypeMember(obj, m, member);
			}
		});
	};

	Function.prototype.dontDoubleUp = function Function$dontDoubleUp(options) {
		var proceed = this;
		var calls = [];
	
		// Is the function already being called with the same arguments?
		return function dontDoubleUp() {
			var i, ilen, j, jlen, origCallback, origThisPtr, partitionedArg, partitionedArgIdx, groupBy, callsInProgress, call, shouldJoinCall, otherPartitionedArg, partitionedInCall, joinArgIdx, args;
	
			// Make a copy of the invocation arguments.
			args = Array.prototype.slice.call(arguments);

			// Extract callback and thisPtr arguments, if they exist.
			if (options.callbackArg < arguments.length) {
				origCallback = arguments[options.callbackArg];
			}
			if (options.thisPtrArg < arguments.length) {
				origThisPtr = arguments[options.thisPtrArg];
			}

			// Determine what arguments can be partitioned into separate calls
			if (options.partitionedArg !== null && options.partitionedArg !== undefined) {
				partitionedArg = arguments[options.partitionedArg];
				if (!(partitionedArg instanceof Array)) {
					throw new Error("The partitioned argument must be an array.");
				}

				// Create a copy of the argument.
				partitionedArg = partitionedArg.copy();

				partitionedArgIdx = -1;
			}

			// Determine what values to use to group callers
			groupBy = [];
			if (options.groupBy && options.groupBy instanceof Array) {
				for (i = 0, ilen = options.groupBy.length; i < ilen; i++) {
					if (partitionedArg !== undefined && options.groupBy[i] === options.partitionedArg) {
						partitionedArgIdx = groupBy.length;
					}
					groupBy.push(arguments[options.groupBy[i]]);
				}
			}
			else if (options.groupBy !== null && options.groupBy !== undefined) {
				groupBy.push(arguments[options.groupBy]);
				if (options.groupBy === options.partitionedArg) {
					partitionedArgIdx = 0;
				}
			}
			else {
				for (i = 0, ilen = arguments.length; i < ilen; ++i) {
					if (i !== options.callbackArg && i !== options.thisPtrArg) {
						if (partitionedArg !== undefined && i === options.partitionedArg) {
							partitionedArgIdx = groupBy.length;
						}
						groupBy.push(arguments[i]);
					}
				}
			}

			// Verify that the the partitioned argument is part of the grouping.
			if (partitionedArgIdx === -1) {
				throw new Error("Invalid partitionedArg option.");
			}

			// Is this call already in progress?
			callsInProgress = [];
			for (i = 0, ilen = calls.length; (partitionedArg === undefined || partitionedArg.length > 0) && i < ilen; i++) {
				call = calls[i];

				// TODO: handle optional params better
				if (groupBy.length != call.groupBy.length) {
					continue;
				}

				// Only join calls together if they were called on the same object.
				shouldJoinCall = this === call.context;

				// Make sure all of the arguments match.
				for (j = 0, jlen = groupBy.length; shouldJoinCall && j < jlen; j++) {
					if (j === partitionedArgIdx) {	
						// Attempt to find items in partitioned argument that are in progress and remove them
						shouldJoinCall = call.groupBy[j].some(function(p) {
							return partitionedArg.indexOf(p) >= 0;
						});
					}
					else if (groupBy[j] !== call.groupBy[j]) {
						shouldJoinCall = false;
					}
				}

				if (shouldJoinCall) {

					partitionedInCall = [];

					// Remove partitioned args that will be satisfied by the call in progress.
					if (partitionedArg !== undefined) {
						otherPartitionedArg = call.groupBy[partitionedArgIdx];
						for (j = 0, jlen = otherPartitionedArg.length; j < jlen; j++) {
							joinArgIdx = partitionedArg.indexOf(otherPartitionedArg[j]);
							if (joinArgIdx >= 0) {
								partitionedInCall.push(otherPartitionedArg[j]);
								partitionedArg.splice(joinArgIdx, 1);
							}
						}
					}

					callsInProgress.push({ call: call, partitioned: partitionedInCall });

				}
			}

			if (callsInProgress.length === 0 || (partitionedArg !== undefined && partitionedArg.length > 0)) {

				// track the next call that is about to be made
				call = { callback: Functor(), groupBy: groupBy, context: this };
			
				calls.push(call);

				// make sure the original callback is invoked and that cleanup occurs
				call.callback.add(function() {
					if (calls.indexOf(call) < 0) {
						throw new Error("Call not found.");
					}
					if (origCallback) {
						origCallback.apply(origThisPtr || this, arguments);
					}
					if (options.memoize === true) {
						call.complete = true;
						call.response = {
							thisPtr: this,
							args: Array.prototype.slice.call(arguments)
						};
					}
					else {
						calls.remove(call);
					}
				});

				// Copy the args
				newArgs = args.slice();

				// use remaining partitioned args if in effect
				if (partitionedArg !== undefined && partitionedArg.length > 0) {
					newArgs[options.partitionedArg] = partitionedArg;
				}

				// pass the new callback to the inner function
				newArgs[options.callbackArg] = call.callback;

				call.args = newArgs;

				proceed.apply(this, newArgs);

			}

			if (callsInProgress.length > 0 && origCallback) {
		
				// wait for the original call to complete
				forEach(callsInProgress, function(call) {

					var invocationArgs;

					if (options.partitionedFilter) {
						invocationArgs = args.slice();
						invocationArgs[options.partitionedArg] = call.partitioned;
						invocationArgs[options.callbackArg] = origCallback;
					}

					var callbackArgs;

					if (call.call.complete === true) {
						if (options.partitionedFilter) {
							callbackArgs = Array.prototype.slice.call(call.call.response.args);
							options.partitionedFilter.call(origThisPtr || this, call.call.args, invocationArgs, callbackArgs);
						}
						else {
							callbackArgs = call.call.response.args;
						}

						origCallback.apply(origThisPtr || call.call.response.thisPtr, callbackArgs);
					}
					else {
						call.call.callback.add(function() {
							if (options.partitionedFilter) {
								callbackArgs = Array.prototype.slice.call(arguments);
								options.partitionedFilter.call(origThisPtr || this, call.call.args, invocationArgs, callbackArgs);
							}
							else {
								callbackArgs = arguments;
							}
	
							origCallback.apply(origThisPtr || this, callbackArgs);
						});
					}
				});

			}
		};
	};

	Function.prototype.cached = function Function$cached(options) {
		var proceed = this;
		var cache = {};

		var keygen = (options && options.key) || function(arg) { return arg; };

		return function cached() {
			var key = keygen.apply(this, arguments);
			return cache.hasOwnProperty(key) ? cache[key] : (cache[key] = proceed.apply(this, arguments));
		};
	};

	function bind(obj) {
		var slice = [].slice,
			args = slice.call(arguments, 1),
			self = this,
			nop = function () {},
			bound = function () {
				return self.apply(this instanceof nop ? this : (obj || {}),
					args.concat(slice.call(arguments)));
			};

		nop.prototype = self.prototype;
		bound.prototype = new nop();

		return bound;
	}

	// Function.prototype.bind polyfill
	if (!Function.prototype.bind)
		Function.prototype.bind = bind;

	Function.prototype.prepare = function prepare(thisPtr, args) {
		/// <summary>
		/// Returns a function that will invoke this function with the given
		/// this value and arguments, regardless of how the returned 
		/// function is invoked.
		/// </summary>

		var func = this;
		return function prepare$fn() {
			return func.apply(thisPtr || this, args || []);
		};
	};

	Function.prototype.prependArguments = function prependArguments(/* arg1, arg2, ... */) {
		var func = this;
		var additional = Array.prototype.slice.call(arguments);
		return function prependArguments$fn() {
			var args = [];
			args.addRange(additional);
			args.addRange(Array.prototype.slice.call(arguments));
			return func.apply(this, args);
		};
	};

	Function.prototype.appendArguments = function appendArguments(/* arg1, arg2, ... */) {
		var func = this;
		var additional = Array.prototype.slice.call(arguments);
		return function appendArguments$fn() {
			var args = Array.prototype.slice.call(arguments);
			args.addRange(additional);
			return func.apply(this, args);
		};
	};

	Function.prototype.spliceArguments = function spliceArguments(/* start, howmany, item1, item2, ... */) {
		var func = this;
		var spliceArgs = arguments;
		return function spliceArguments$fn() {
			var args = Array.prototype.slice.call(arguments);
			args.splice.apply(args, spliceArgs);
			return func.apply(this, args);
		};
	};

	Function.prototype.sliceArguments = function sliceArguments(/* start, end */) {
		var func = this;
		var sliceArgs = arguments;
		return function spliceArguments$fn() {
			var args = Array.prototype.slice.call(arguments);
			args = args.slice.apply(args, sliceArgs);
			return func.apply(this, args);
		};
	};

	function mergeFunctions(fn1, fn2, options) {
		// return early if one or both functions are not defined
		if (!fn1 && !fn2) return;
		if (!fn2) return fn1;
		if (!fn1) return fn2;

		if (options && options.async === true) {
			return function () {
				var idx = options.callbackIndex || 0;
				var callback = arguments[idx];

				if (!callback || !(callback instanceof Function))
					ExoWeb.trace.throwAndLog("functions",
						"Unable to merge async functions: the argument at index {0}{1} is not a function.",
						[idx, options.callbackIndex ? "" : " (default)"]);

				var signal = new Signal("mergeFunctions");

				// replace callback function with signal pending and invoke callback when both are complete
				var args1 = Array.prototype.slice.call(arguments);
				args1.splice(idx, 1, signal.pending());
				fn1.apply(this, args1);

				var args2 = Array.prototype.slice.call(arguments);
				args2.splice(idx, 1, signal.pending());
				fn2.apply(this, args2);

				signal.waitForAll(callback, (options.thisPtrIndex && arguments[options.thisPtrIndex]) || this);
			};
		}
		else if (options && options.andResults === true) {
			return function () {
				return fn1.apply(this, arguments) && fn2.apply(this, arguments);
			};
		}
		else if (options && options.orResults === true) {
			return function () {
				return fn1.apply(this, arguments) || fn2.apply(this, arguments);
			};
		}
		else {
			return function () {
				fn1.apply(this, arguments);
				fn2.apply(this, arguments);
			};
		}
	}

	function equals(obj) {
		return function(other) {
			return obj === other;
		};
	}

	function not(fn) {
		return function() {
			return !fn.apply(this, arguments);
		};
	}

	function before(original, fn) {
		return function() {
			fn.apply(this, arguments);
			original.apply(this, arguments);
		};
	}

	function after(original, fn) {
		return function() {
			original.apply(this, arguments);
			fn.apply(this, arguments);
		};
	}

	function callArgument(arg) {
		arg.call();
	};

	// #endregion

	// #region ExoWeb.Array
	//////////////////////////////////////////////////

	function addRange(arr, items) {
		Array.prototype.push.apply(arr, items);
	}

	function contains(arr, item, from) {
		return arr.indexOf(item, from) >= 0;
	}

	function copy(arr) {
		return Array.prototype.slice.call(arr);
	}

	// Filters out duplicate items from the given array.
	/////////////////////////////////////////////////////
	function distinct(arr) {
		var result = [];

		for(var i = 0, len = arr.length; i < len; i++)
			if (result.indexOf(arr[i]) < 0)
				result.push(arr[i]);

		return result;
	}

	function every(arr, callback, thisPtr) {
		for (var i = 0, len = arr.length; i < len; i++)
			if (i in arr && !callback.call(thisPtr || this, arr[i], i, arr))
				return false;

		return true;
	}

	function fill(arr, value, times) {
		for (var i = 0; i < times; i++)
			arr.push(value);
		return arr;
	}

	function filter(arr, callback, thisPtr) {
		var result = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			if (i in arr) {
				var val = arr[i]; // callback may mutate original item
				if (callback.call(thisPtr || this, val, i, arr))
					result.push(val);
			}
		}

		return result;
	}

	function first(arr, callback, thisPtr) {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (i in arr) {
				var val = arr[i];
				if (!callback || callback.call(thisPtr || this, val, i, arr) === true) {
					return val;
				}
			}
		}

		return null;
	}

	function forEach(arr, callback, thisPtr) {
		for (var i = 0, len = arr.length; i < len; i++)
			if (i in arr)
				callback.call(thisPtr || this, arr[i], i, arr);
	}

	function indexOf(arr, elt, from) {
		var len = arr.length;
		from = Number(from) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;

		for (; from < len; from++)
			if (from in arr && arr[from] === elt)
				return from;

		return -1;
	}

	function insert(arr, index, item) {
		Array.prototype.splice.call(arr, index, 0, item);
	}

	function insertRange(arr, index, items) {
		var args = items.slice();
		args.splice(0, 0, index, 0);
		Array.prototype.splice.apply(arr, args);
	}

	// Finds the set intersection of the two given arrays.  The items
	// in the resulting list are distinct and in no particular order.
	///////////////////////////////////////////////////////////////////
	function intersect(arr1, arr2) {
		return distinct(filter(arr1, function(item) {
			return arr2.indexOf(item) >= 0;
		}));
	}

	function last(arr, callback, thisPtr) {
		var result = null;

		for (var i = 0, len = arr.length; i < len; i++) {
			if (i in arr) {
				var val = arr[i];
				if (!callback || callback.call(thisPtr || this, val, i, arr) === true) {
					result = val;
				}
			}
		}

		return result;
	}

	function lastIndexOf(arr, item, from) {
		var len = arr.length;

		if (len === 0) return -1;

		var n = len;
		if (from) {
			n = Number(from);

			if (n !== n)
				n = 0;
			else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}

		var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);

		while (k >= 0)
			if (k in arr && arr[k] === item)
				return k;

		return -1;
	}

	function map(arr, callback, thisPtr) {
		var result = [];

		for (var i = 0, len = arr.length; i < len; i++)
			if (i in arr)
				result[i] = callback.call(thisPtr || this, arr[i], i, arr);

		return result;
	}

	function mapToArray(arr, callback, thisPtr) {
		var result = [];

		forEach(arr, function(item, i, a) {
			addRange(result, callback.call(thisPtr || this, item, i, a));
		});

		return result;
	}

	function observableSplice(arr, events, index, removeCount, addItems) {
		var removedArray, removedItem;

		if (removeCount) {
			if (removeCount > 1 && arr.removeRange) {
				removedArray = arr.removeRange(index, removeCount);
			}
			else if (removeCount === 1 && arr.removeAt) {
				removedItem = arr.removeAt(index);
			}
			else {
				removedArray = arr.splice(index, removeCount);
			}
	
			if (events) {
				events.push({
					action: Sys.NotifyCollectionChangedAction.remove,
					oldStartingIndex: index,
					oldItems: removedArray || [removedItem],
					newStartingIndex: null,
					newItems: null
				});
			}
		}

		if (addItems.length > 0) {
			if (addItems.length > 1 && arr.insertRange) {
				arr.insertRange(index, addItems);
			}
			else if (addItems.length === 1 && arr.insert) {
				arr.insert(index, addItems[0]);
			}
			else {
				insertRange(arr, index, addItems);
			}

			if (events) {
				events.push({
					action: Sys.NotifyCollectionChangedAction.add,
					oldStartingIndex: null,
					oldItems: null,
					newStartingIndex: index,
					newItems: addItems
				});
			}
		}
	}

	function peek(arr) {
		var peekVal = arr.pop();
		arr.push(peekVal);
		return peekVal;
	}

	function purge(arr, callback, thisPtr) {
		var result;

		for (var i = 0; i < arr.length; i++) {
			if (callback.call(thisPtr || this, arr[i], i, arr) === true) {
				// Invoke removeAt method if it exists.
				if (arr.removeAt)
					arr.removeAt(i);
				else
					arr.splice(i, 1);

				// Lazy create array and add index (accounting for previously removed).
				if (!result) result = [];
				result.push(i + result.length);

				// Decrement to account for removal.
				i--;
			}
		}

		return result;
	}

	function reduce(arr, accumlator, initialValue){
		var i = 0, len = arr.length, curr;

		if(typeof(accumlator) !== "function")
			throw new TypeError("First argument is not a function.");

		if(!len && arguments.length <= 2)
			throw new TypeError("Array length is 0 and no intial value was given.");

		if(arguments.length <= 2) {
			if (len === 0)
				throw new TypeError("Empty array and no second argument");

			curr = arr[i++]; // Increase i to start searching the secondly defined element in the array
		}
		else {
			curr = arguments[2];
		}

		for(; i < len; i++) {
			if (i in arr) {
				curr = accumlator.call(undefined, curr, arr[i], i, arr);
			}
		}

		return curr;
	}

	function remove(arr, item) {
		var idx = arr.indexOf(item);
		if (idx < 0)
			return false;

		arr.splice(idx, 1);
		return true;
	}

	function removeAt(arr, index) {
		arr.splice(index, 1);
	}

	function removeRange(arr, index, count) {
		return arr.splice(index, count);
	}

	function single(arr, callback, thisPtr) {
		var items = filter(arr, callback, thisPtr);

		if (items.length > 1)
			throw new Error("Expected a single item, but found " + items.length + ".");

		if (items.length === 0) {
			throw new Error("Expected a single item, but did not find a match.");
		}

		return items[0];
	}

	function some(arr, callback, thisPtr) {
		for (var i = 0, len = arr.length; i < len; i++)
			if (i in arr && callback.call(thisPtr || this, arr[i], i, arr))
				return true;

		return false;
	}

	function update(arr, target/*, trackEvents, equalityFn*/) {
		var source = arr, trackEvents = arguments[2], events = trackEvents ? [] : null, pointer = 0, srcSeek = 0, tgtSeek = 0, equalityFn = arguments[3];

		while (srcSeek < source.length) {
			if (source[srcSeek] === target[tgtSeek]) {
				if (pointer === srcSeek && pointer === tgtSeek) {
					// items match, so advance
					pointer = srcSeek = tgtSeek = pointer + 1;
				}
				else {
					// remove range from source and add range from target
					observableSplice(source, events, pointer, srcSeek - pointer, target.slice(pointer, tgtSeek));

					// reset to index follow target seek location since arrays match up to that point
					pointer = srcSeek = tgtSeek = tgtSeek + 1;
				}
			}
			else if (tgtSeek >= target.length) {
				// reached the end of the target array, so advance the src pointer and test again
				tgtSeek = pointer;
				srcSeek += 1;
			}
			else {
				// advance to the next target item to test
				tgtSeek += 1;
			}
		}

		observableSplice(source, events, pointer, srcSeek - pointer, target.slice(pointer, Math.max(tgtSeek, target.length)));

		return events;
	}

	if (!Array.prototype.addRange)
		Array.prototype.addRange = function(items) { addRange(this, items); };
	if (!Array.prototype.copy)
		Array.prototype.copy = function() { return copy(this); };
	if (!Array.prototype.clear)
		Array.prototype.clear = function () { this.length = 0; };
	if (!Array.prototype.contains)
		Array.prototype.contains = function (elt/*, from*/) { return contains(this, elt, arguments[1]); };
	if (!Array.prototype.dequeue)
		Array.prototype.dequeue = function() { return this.shift(); };
	if (!Array.prototype.distinct)
		Array.prototype.distinct = function() { return distinct(this); };
	if (!Array.prototype.every)
		Array.prototype.every = function(fun /*, thisp*/) { return every(this, fun, arguments[1]); };
	if (!Array.prototype.fill)
		Array.prototype.fill = function(value, times) { return fill(this, value, times); };
	if (!Array.prototype.filter)
		Array.prototype.filter = function(fun/*, thisp */) { return filter(this, fun, arguments[1]); };
	if (!Array.prototype.first)
		Array.prototype.first = function(fun/*, thisp */) { return first(this, fun, arguments[1]); };
	if (!Array.prototype.forEach)
		Array.prototype.forEach = function(fun /*, thisp*/) { forEach(this, fun, arguments[1]); };
	if (!Array.prototype.indexOf)
		Array.prototype.indexOf = function(elt/*, from*/) { return indexOf(this, elt, arguments[1]); };
	if (!Array.prototype.intersect)
		Array.prototype.intersect = function(items) { return intersect(this, items); };
	if (!Array.prototype.last)
		Array.prototype.last = function(fun/*, thisp */) { return last(this, fun, arguments[1]); };
	if (!Array.prototype.lastIndexOf)
		Array.prototype.lastIndexOf = function (item/*, from*/) { return lastIndexOf(this, item, arguments[1]); };
	if (!Array.prototype.map)
		Array.prototype.map = function(fun /*, thisp*/) { return map(this, fun, arguments[1]); };
	if (!Array.prototype.mapToArray)
		Array.prototype.mapToArray = function(fun/*, thisp*/) { return mapToArray(this, fun, arguments[1]); };
	if (!Array.prototype.peek)
		Array.prototype.peek = function() { return peek(this); };
	if (!Array.prototype.purge)
		Array.prototype.purge = function(fun/*, thisp*/) { return purge(this, fun, arguments[1]); };
	if (!Array.prototype.reduce)
		Array.prototype.reduce = function(accumulator, intialValue) { return reduce(this, accumulator, intialValue); };
	if (!Array.prototype.remove)
		Array.prototype.remove = function(item) { return remove(this, item); };
	if (!Array.prototype.single)
		Array.prototype.single = function(fun/*, thisp */) { return single(this, fun, arguments[1]); };
	if (!Array.prototype.some)
		Array.prototype.some = function(fun /*, thisp*/) { return some(this, fun, arguments[1]); };


	// #endregion

	// #region ExoWeb.String
	//////////////////////////////////////////////////

	// Add String.trim() if not natively supported
	if (typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g, '');
		}
	}
	function isNullOrEmpty(str) {
		return str === null || str === undefined || str === "";
	}

	// #endregion

	// #region ExoWeb.Trace
	//////////////////////////////////////////////////

	var errorHandler = function noOpErrorHandler(message, e) { };
	function setErrorHandler(fn) {
		errorHandler = fn;
	}
	ExoWeb.setErrorHandler = setErrorHandler;

	ExoWeb.trace = {
		// The following flags can be turned on to see debugging info.
		// Rather than editing the code below, set them in your application's page
		flags: {
			all: false,
			batch: false,
			signal: false,
			typeInit: false,
			objectInit: false,
			propInit: false,
			listInit: false,
			lazyLoad: false,
			markupExt: false,
			"~": false,
			"@": false,
			context: false,
			tests: false,
			mocks: false,
			server: false,
			ui: false,
			templates: false,
			rule: false,
			model: false,
			conditions: false,
			responseHandler: false
		},
		_isEnabled: function _isEnabled(category) {
			if (ExoWeb.trace.flags.all) {
				return true;
			}

			if (category instanceof Array) {
				for (var i = 0; i < category.length; ++i) {
					if (ExoWeb.trace.flags[category[i]]) {
						return true;
					}
				}
				return false;
			}
			else {
				return !!ExoWeb.trace.flags[category];
			}
		},
		_formatMessage: function _formatMessage(category, message, args/*, ...*/) {
			if (!(category instanceof Array)) {
				category = [category];
			}

			var catStr = category.join(", ");

			var formatArgs = Array.prototype.slice.call(arguments, 1);
			return "[" + catStr + "]: " + $format.apply(null, formatArgs);
		},
		log: function trace$log(category, message, args) {
			if (typeof (console) === "undefined") {
				return;
			}

			if (ExoWeb.trace._isEnabled(category)) {
				console.log(ExoWeb.trace._formatMessage.apply(this, arguments));
			}
		},
		logWarning: function trace$logWarning(category, message, args) {
			// append the warning category
			if (!(category instanceof Array)) {
				category = [category, "warning"];
			}
			else {
				category.push("warning");
			}

			// if the console is defined then log the message
			if (typeof (console) !== "undefined") {
				console.warn(ExoWeb.trace._formatMessage.apply(this, arguments));
			}
		},
		logError: function trace$logError(category, message, args) {
			// append the error category
			if (!(category instanceof Array)) {
				category = [category, "error"];
			}
			else {
				category.push("error");
			}

			// format the message text
			var msg = ExoWeb.trace._formatMessage.apply(this, arguments);

			// handle the error
			errorHandler(msg, message instanceof Error ? message : null);

			// if the console is defined then log the message
			if (typeof (console) !== "undefined") {
				console.error(msg);
			}

			return new Error(msg);
		},
		throwAndLog: function trace$throwAndLog(category, message, args) {
			ExoWeb.trace.logError(category, message, args);

			throw new Error($format(message, args));
		},
		getCallStack: function getCallStack() {
			var result = [];

			// process the callees until the end of the stack or until the depth limit is reached
			for (var f = arguments.callee, depth = 0, _f = null; f && depth < 25; _f = f, f = f && f.arguments ? f.arguments.callee.caller : null, depth++) {

				// format the function name and arguments
				var name = parseFunctionName(f);
				var args = f && f.arguments ? Array.prototype.slice.call(f.arguments).map(formatArgument).join(", ") : "";

				// append the new item
				result.push(name + "(" + args + ")");

				// Calling a function recursively will prevent this loop from terminating since arguments.callee.caller
				// will always refer to the current function.  This is because the property path arguments.callee.caller
				// is attached to the function definition rather than the function "activation object".  Allow the call
				// line to be written again to suggest the reason that the call stack could not be inspected further.
				// see http://bytes.com/topic/javascript/answers/470251-recursive-functions-arguments-callee-caller
				if (_f !== null & _f === f) {
					result.push("non-terminating loop detected...");
					break;
				}
			}

			return result;
		}
	};

	function formatArgument(arg) {
		try {
			if (arg === undefined) {
				return "undefined";
			}
			else if (arg === null) {
				return "null";
			}
			else if (arg instanceof Array) {
				return "[" + arg.map(formatArgument).join(", ") + "]";
			}
			else if (arg instanceof Function) {
				return parseFunctionName(arg) + "()";
			}
			else if (arg.constructor === String) {
				return "\"" + arg + "\"";
			}
			else {
				return arg.format ? arg.format() : (arg.toString ? arg.toString() : "~unknown");
			}
		}
		catch (e) {
			return "ERROR (" + parseFunctionName(arg.constructor) + "): " + e.toString();
		}
	}

	var funcRegex = /function\s*([\w_\$]*)/i;
	function parseFunctionName(f) {
		var result = funcRegex.exec(f);
		return result ? (result[1] || "{anonymous}") : "{anonymous}";
	}
	ExoWeb.parseFunctionName = parseFunctionName;

	var log = ExoWeb.trace.log;
	var logError = ExoWeb.trace.logError;
	var throwAndLog = ExoWeb.trace.throwAndLog;

	// #endregion

	// #region ExoWeb.Cache
	//////////////////////////////////////////////////

	var cacheInited = false;

	var scriptTag = document.getElementsByTagName("script");
	var referrer = scriptTag[scriptTag.length - 1].src;

	var cacheHash;

	var match = /[?&]cachehash=([^&]*)/i.exec(referrer);
	if (match) {
		cacheHash = match[1];
	}

	ExoWeb.cacheHash = cacheHash;

	if (window.localStorage) {

		ExoWeb.cache = function (key, value) {
			var localKey = key;

			// defer init of the cache so that the appInstanceId can be set
			if (!cacheInited) {
				cacheInited = true;

				// if there's an older version of caching, clear the entire cache (the old way)
				if (window.localStorage.getItem("cacheHash"))
					window.localStorage.clear();

				// Flush the local storage cache if the cache hash has changed
				if (cacheHash && ExoWeb.cache("cacheHash") != cacheHash) {
					ExoWeb.clearCache();
					ExoWeb.cache("cacheHash", cacheHash);
				}
			}

			// scope the cache to ExoWeb and to a particular app if there are multiple apps hosted at the same domain.
			localKey = "ExoWeb:cache:" + ExoWeb.config.appInstanceId + ":" + localKey;

			if (arguments.length == 1) {
				value = window.localStorage.getItem(localKey);
				return value ? JSON.parse(value) : null;
			}
			else if (arguments.length == 2) {
				var json = JSON.stringify(value);
				try {
					window.localStorage.setItem(localKey, json);
				}
				catch (e) {
					ExoWeb.trace.logWarning("cache", e);
				}
				return value;
			}
		};

		ExoWeb.clearCache = function () {
			window.localStorage.clear();
		};
	}

	// Caching Not Supported
	else {
		ExoWeb.cache = function (key, value) { return null; };
		ExoWeb.clearCache = function () { };
	}

	// #endregion

	// #region ExoWeb.Activity
	//////////////////////////////////////////////////

	var activityCallbacks = [];

	function registerActivity(label, callback, thisPtr) {
		if (label === undefined || label === null) {
			ExoWeb.trace.throwAndLog("activity", "Activity label cannot be null or undefined.");
		}

		if (label.constructor !== String) {
			ExoWeb.trace.throwAndLog("activity", "Activity label must be a string.");
		}

		if (callback === undefined || callback === null) {
			ExoWeb.trace.throwAndLog("activity", "Activity callback cannot be null or undefined.");
		}

		if (!(callback instanceof Function)) {
			ExoWeb.trace.throwAndLog("activity", "Activity callback must be a function.");
		}

		var item = { label: label, callback: callback };

		if (thisPtr) {
			callback.thisPtr = thisPtr;
		}

		activityCallbacks.push(item);
	}

	ExoWeb.registerActivity = registerActivity;

	function isBusy(/* logBusyLabel */) {
		var busy = false;
		var logBusyLabel = arguments[0];

		for (var i = 0, len = activityCallbacks.length; i < len; i++) {
			var item = activityCallbacks[i];

			if (item.callback.call(item.thisPtr || this) === true) {
				if (logBusyLabel) {
					busy = true;
					console.log("Item \"" + item.label + "\" is busy.");
				}
				else {
					return true;
				}
			}
		}

		return busy;
	}

	ExoWeb.isBusy = isBusy;

	// #endregion

	// #region ExoWeb.Batch
	//////////////////////////////////////////////////

	var batchIndex = 0;
	var allBatches = [];
	var currentBatch = null;

	function Batch(label) {
		this._index = batchIndex++;
		this._labels = [label];
		this._rootLabel = label;
		this._subscribers = [];

		//ExoWeb.trace.log("batch", "[{0}] {1} - created.", [this._index, this._rootLabel]);

		allBatches.push(this);
	}

	registerActivity("Batch", function() {
		return Batch.all().length > 0;
	});

	Batch.all = function Batch_$all(includeEnded) {
		return allBatches.filter(function(e) {
			return includeEnded || !e.isEnded();
		});
	};

	Batch.current = function Batch_$current() {
		return currentBatch;
	};

	Batch.suspendCurrent = function Batch_$suspendCurrent(message) {
		if (currentBatch !== null) {
			var batch = currentBatch;
			//ExoWeb.trace.log("batch", "[{0}] {1} - suspending {2}.", [currentBatch._index, currentBatch._rootLabel, message || ""]);
			currentBatch = null;
			return batch;
		}
	};

	Batch.start = function Batch_$start(label) {
		if (currentBatch) {
			currentBatch._begin(label);
		}
		else {
			currentBatch = new Batch(label);
		}

		return currentBatch;
	};

	Batch.resume = function Batch_$resume(batch) {
		if (batch) {
			(batch._transferredTo || batch)._resume();
		}
	};

	Batch.end = function Batch_$end(batch) {
		(batch._transferredTo || batch)._end();
	};

	Batch.whenDone = function Batch_$whenDone(fn, thisPtr) {
		if (currentBatch) {
			currentBatch.whenDone(fn, thisPtr);
		}
		else {
			fn.call(thisPtr || this);
		}
	};

	Batch.current = function Batch_$current() {
		return currentBatch;
	};

	Batch.mixin({
		_begin: function Batch$_begin(label) {
			//ExoWeb.trace.log("batch", "[{0}] {1} - beginning label {2}.", [this._index, this._rootLabel, label]);

			this._labels.push(label);

			return this;
		},
		_end: function Batch$_end() {
			// Cannot end a batch that has already been ended.
			if (this.isEnded()) {
				ExoWeb.trace.logWarning("batch", "[{0}] {1} - already ended.", [this._index, this._rootLabel]);
				return this;
			}

			// Remove the last label from the list.
			var label = this._labels.pop();

			//ExoWeb.trace.log("batch", "[{0}] {1} - ending label {2}.", [this._index, this._rootLabel, label]);

			if (this.isEnded()) {
				//ExoWeb.trace.log("batch", "[{0}] {1} - complete.", [this._index, this._rootLabel]);

				// If we are ending the current batch, then null out the current batch 
				// variable so that new batches can be created with a new root label.
				if (currentBatch === this) {
					currentBatch = null;
				}

				// Invoke the subscribers.
				var subscriber = this._subscribers.dequeue();
				while (subscriber) {
					subscriber.fn.apply(subscriber.thisPtr || this, arguments);
					subscriber = this._subscribers.dequeue();
				}
			}

			return this;
		},
		_transferTo: function Batch$_transferTo(otherBatch) {
			// Transfers this batch's labels and subscribers to the
			// given batch.  From this point forward this batch defers
			// its behavior to the given batch.

			//ExoWeb.trace.log("batch", "transferring from [{2}] {3} to [{0}] {1}.", [this._index, this._rootLabel, otherBatch._index, otherBatch._rootLabel]);

			// Transfer labels from one batch to another.
			otherBatch._labels.addRange(this._labels);
			this._labels.clear();
			otherBatch._subscribers.addRange(this._subscribers);
			this._subscribers.clear();
			this._transferredTo = otherBatch;
		},
		_resume: function Batch$_resume() {
			// Ignore resume on a batch that has already been ended.
			if (this.isEnded()) {
				return;
			}

			if (currentBatch !== null) {
				// If there is a current batch then simple transfer the labels to it.
				this._transferTo(currentBatch);
				return currentBatch;
			}

			//ExoWeb.trace.log("batch", "[{0}] {1} - resuming.", [this._index, this._rootLabel]);
			currentBatch = this;

			return this;
		},
		isEnded: function Batch$isEnded() {
			return this._labels.length === 0;
		},
		whenDone: function Batch$whenDone(fn, thisPtr) {
			//ExoWeb.trace.log("batch", "[{0}] {1} - subscribing to batch done.", [this._index, this._rootLabel]);

			this._subscribers.push({ fn: fn, thisPtr: thisPtr });

			return this;
		}
	});

	ExoWeb.Batch = Batch;

	// #endregion

	// #region ExoWeb.Signal
	//////////////////////////////////////////////////

	var pendingSignalTimeouts = null;

	function Signal(debugLabel) {
		this._waitForAll = [];
		this._pending = 0;
		var _this = this;
		this._oneDoneFn = function Signal$_oneDoneFn() { Signal.prototype.oneDone.apply(_this, arguments); };

		this._debugLabel = debugLabel;
	}

	var setupCallbacks = function setupCallbacks() {
		window.setTimeout(function () {
			var callbacks, maxBatch = isNumber(config.signalMaxBatchSize) ? config.signalMaxBatchSize : null;
			if (maxBatch && pendingSignalTimeouts.length > maxBatch) {
				// Exceeds max batch size, so only invoke the max number and delay the rest
				callbacks = pendingSignalTimeouts.splice(0, maxBatch);
				setupCallbacks();
			}
			else {
				// No max batch, or does not exceed size, so call all pending callbacks
				callbacks = pendingSignalTimeouts;
				pendingSignalTimeouts = null;
			}
			// Call each callback in order
			callbacks.forEach(callArgument);
		}, 1);
	};

	function doCallback(name, thisPtr, callback, args, executeImmediately) {
		if (executeImmediately === false || (config.signalTimeout === true && executeImmediately !== true)) {
			var batch = Batch.suspendCurrent("_doCallback");

			// manage a queue of callbacks to ensure the order of execution

			var setup = false;
			if (pendingSignalTimeouts === null) {
				pendingSignalTimeouts = [];
				setup = true;
			}

			pendingSignalTimeouts.push(function() {
				Batch.resume(batch);
				callback.apply(thisPtr, args || []);
			});

			if (setup) {
				setupCallbacks();
			}
		}
		else {
			callback.apply(thisPtr, args || []);
		}
	}

	Signal.mixin({
		pending: function Signal$pending(callback, thisPtr, executeImmediately) {
			if (this._pending === 0) {
				Signal.allPending.push(this);
			}

			this._pending++;
			//ExoWeb.trace.log("signal", "(++{_pending}) {_debugLabel}", this);
			return this._genCallback(callback, thisPtr, executeImmediately);
		},
		orPending: function Signal$orPending(callback, thisPtr, executeImmediately) {
			return this._genCallback(callback, thisPtr, executeImmediately);
		},
		_doCallback: function Signal$_doCallback(name, thisPtr, callback, args, executeImmediately) {
			doCallback.apply(this, arguments);
		},
		_genCallback: function Signal$_genCallback(callback, thisPtr, executeImmediately) {
			var signal = this, called = false;
			return function Signal$_genCallback$result() {
				signal._doCallback("pending", thisPtr || this, function Signal$_genCallback$fn() {
					if (called) {
						ExoWeb.trace.throwAndLog("signal", "({0}) signal callback was called more than once.", [signal._debugLabel]);
					}
					called = true;
					if (callback) {
						callback.apply(this, arguments);
					}
					signal.oneDone();
				}, arguments, executeImmediately);
			};
		},
		waitForAll: function Signal$waitForAll(callback, thisPtr, executeImmediately) {
			if (!callback) {
				return;
			}

			if (this._pending === 0) {
				this._doCallback("waitForAll", thisPtr, callback, [], executeImmediately);
			}
			else {
				this._waitForAll.push({ "callback": callback, "thisPtr": thisPtr, "executeImmediately": executeImmediately });
			}
		},
		oneDone: function Signal$oneDone() {
			//ExoWeb.trace.log("signal", "(--{0}) {1}", [this._pending - 1, this._debugLabel]);

			--this._pending;

			if (this._pending === 0) {
				Signal.allPending.remove(this);
			}

			while (this._pending === 0 && this._waitForAll.length > 0) {
				var item = this._waitForAll.dequeue();
				this._doCallback("waitForAll", item.thisPtr, item.callback, [], item.executeImmediately);
			}
		},
		isActive: function Signal$isActive() {
			return this._pending > 0;
		}
	});

	Signal.allPending = [];

	ExoWeb.Signal = Signal;

	// #endregion

	// #region ExoWeb.Functor
	//////////////////////////////////////////////////

	function Functor() {
		var funcs = [];

		var f = function Functor$fn() {
			for (var i = 0; i < funcs.length; ++i) {
				var item = funcs[i];

				// Ensure that there is either no filter or the filter passes.
				if (!item.filter || item.filter.apply(this, arguments) === true) {
					// If handler is set to execute once,
					// remove the handler before calling.
					if (item.once === true) {
						funcs.splice(i--, 1);
					}

					// Call the handler function.
					item.fn.apply(this, arguments);
				}
			}
		};

		f._funcs = funcs;
		f.add = Functor.add;
		f.remove = Functor.remove;
		f.isEmpty = Functor.isEmpty;

		return f;
	}

	Functor.add = function Functor$add(fn, filter, once) {
		var item = { fn: fn };

		if (filter !== undefined) {
			item.filter = filter;
		}

		if (once !== undefined) {
			item.once = once;
		}

		this._funcs.push(item);
	};

	Functor.remove = function Functor$remove(old) {
		for (var i = this._funcs.length - 1; i >= 0; --i) {
			if (this._funcs[i].fn === old) {
				this._funcs.splice(i, 1);
				break;
			}
		}
	};

	Functor.isEmpty = function Functor$isEmpty(args) {
		if (args) {
			return !this._funcs.some(function (item) { return !item.filter || item.filter.apply(this, args); }, this);
		}
		return this._funcs.length === 0;
	};

	var eventsInProgress = 0;

	// busy if there are any events in progress
	registerActivity("Functor", function() {
		return eventsInProgress > 0;
	});

	Functor.eventing = {
		_addEvent: function Functor$_addEvent(name, func, filter, once) {
			if (!this["_" + name]) {
				this["_" + name] = new Functor();
			}

			this["_" + name].add(func, filter, once);
		},
		_removeEvent: function Functor$_removeEvent(name, func) {
			var handler = this["_" + name];
			if (handler) {
				handler.remove(func);
			}
		},
		_raiseEvent: function Functor$_raiseEvent(name, argsArray) {
			var handler = this["_" + name];
			if (handler) {
				try {
					eventsInProgress++;
					handler.apply(this, argsArray || []);
				}
				finally {
					eventsInProgress--;
				}
			}
		},
		_clearEvent: function Functor$_clearEvent(name) {
			var evtName = "_" + name;
			if (this.hasOwnProperty(evtName)) {
				this[evtName] = null;
			}
		},
		_getEventHandler: function Functor$_getEventHandler(name) {
			return this["_" + name];
		}
	};

	ExoWeb.Functor = Functor;

	// #endregion

	// #region ExoWeb.FunctionChain
	//////////////////////////////////////////////////

	function FunctionChain(steps, thisPtr) {
		if (!(steps instanceof Array)) {
			ExoWeb.trace.throwAndLog("functionChain", "Steps must be an array of functions.");
		}

		this._steps = steps;
		this._thisPtr = thisPtr;
	}

	FunctionChain.prepare = function FunctionChain$_invoke() {
		// Return a function that can be invoked with callback and thisPtr.
		// Useful for assigning to a prototype member, since "this" is used
		// as the thisPtr for the chain if "thisPtr" argument is not supplied,
		// while "thisPtr" of invocation is used as the argument to "invoke".

		var steps = null,
			thisPtrOuter = null;

		// no args => empty chain
		if (arguments.length === 0) {
			steps = [];
		}
		// one array arg => array of steps
		else if (arguments.length === 1 && arguments[0] instanceof Array) {
			steps = arguments[0];
		}
		// two args (first array) => array of steps and this pointer
		else if (arguments.length === 2 && arguments[0] instanceof Array) {
			steps = arguments[0];
			thisPtrOuter = arguments[1];
		}
		// otherwise, assume arguments correspond to steps
		else {
			steps = Array.prototype.slice.call(arguments);
		}

		return function(callback, thisPtr) {
			var chain = new FunctionChain(steps, thisPtrOuter || this);
			chain.invoke(callback, thisPtr);
		};
	};

	function doStep(idx, callback, thisPtr) {
		var _callback = callback;
		var _thisPtr = thisPtr;
		var nextStep = idx + 1 < this._steps.length ?
			doStep.prependArguments(idx + 1, _callback, _thisPtr) :
			function() {
				if (_callback && _callback instanceof Function) {
					_callback.apply(_thisPtr || this, arguments);
				}
			};

		this._steps[idx].call(this._thisPtr || this, nextStep, this);
	}

	FunctionChain.mixin({
		invoke: function(callback, thisPtr) {
			doStep.call(this, 0, callback, thisPtr);
		}
	});

	ExoWeb.FunctionChain = FunctionChain;

	// #endregion

	// #region ExoWeb.EventScope
	//////////////////////////////////////////////////

	/// <reference path="Function.js" />
	/// <reference path="Functor.js" />

	var currentEventScope = null;

	function EventScope() {
		// If there is a current event scope
		// then it will be the parent of the new event scope
		var parent = currentEventScope;

		// Define the parent property
		Object.defineProperty(this, "parent", { value: parent });

		// Define the isActive property
		this.isActive = true;

		// Set this to be the current event scope
		currentEventScope = this;
	}

	EventScope.mixin(Functor.eventing);

	EventScope.mixin({
		exit: function() {
			if (!this.isActive) {
				throw new Error("The event scope has already exited.");
			}

			try {
				var handler = this._getEventHandler("exit");
				if (handler && !handler.isEmpty()) {
					if (this.parent === null || !this.parent.isActive) {
						// Invoke all subscribers
						handler();
					}
					else {
						// Move subscribers to the parent scope
						this.parent._addEvent("exit", handler);
					}

					// Clear the event to ensure that it isn't
					// inadvertantly raised again through this scope
					this._clearEvent("exit");
				}
			}
			finally {
				// The event scope is no longer active
				this.isActive = false;

				// Roll back to the closest active scope
				while (currentEventScope && !currentEventScope.isActive) {
					currentEventScope = currentEventScope.parent;
				}
			}
		}
	});

	function EventScope$invoke(callback, thisPtr) {
		if (thisPtr) {
			callback.call(thisPtr);
		}
		else {
			callback();
		}
	}

	function EventScope$onExit(callback, thisPtr) {
		if (currentEventScope === null) {
			// Immediately invoke the callback
			EventScope$invoke(callback, thisPtr);
		}
		else if (!currentEventScope.isActive) {
			throw new Error("The current event scope cannot be inactive.");
		}
		else {
			// Subscribe to the exit event
			currentEventScope._addEvent("exit", EventScope$invoke.bind(null, callback, thisPtr));
		}
	}

	function EventScope$perform(callback, thisPtr) {
		try {
			// Create an event scope
			var scope = new EventScope();

			// Invoke the callback
			EventScope$invoke(callback, thisPtr);
		}
		finally {
			// Exit the event scope
			scope.exit();
		}
	}


	// Export public functions
	var eventScopeApi = {
		onExit: EventScope$onExit,
		perform: EventScope$perform
	};

	ExoWeb.EventScope = eventScopeApi;

	// #endregion

	// #region ExoWeb.MessageQueue
	//////////////////////////////////////////////////

	function MessageQueue(handler, thisPtr) {

		// Require that a callback function is given.
		if (!handler || Object.prototype.toString.call(handler) !== "[object Function]")
			ExoWeb.trace.throwAndLog("messageQueue", "A callback must be provided to handle queued messages.");

		// Construct an array to store messages that are queued.
		var messages = [];
	
		// Number of milliseconds to wait before flushing the queue.
		var interval = null;

		// Timeout used for autoflush.
		var timeout = null;

		// Whether or not the interval resets when new items are enqueued.
		var rolling;

		// Starts or resets the timer when an item is enqueued.
		function startTimer() {
			if (timeout) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(function() {
				timeout = null;
				queue.flush();
			}, interval);
		}

		var queue = {

			/*
			* Adds a new message to the queue.  If an interval is enabled
			* it will either be started or reset (if rolling).
			*/
			add: function(message) {
				if (rolling === true || (timeout === null && rolling === false)) {
					startTimer();
				}

				messages.push(message);
			},

			/*
			* Returns the number of messages that have been enqueued.
			*/
			count: function() {
				return messages.length;
			},

			/*
			* Invokes the callback with all messages that have been queued to date.
			*/
			flush: function() {
				if (messages.length > 0) {
					if (thisPtr)
						handler.call(thisPtr, messages.splice(0, messages.length));
					else
						handler(messages.splice(0, messages.length));
				}
			},

			/*
			* Enables flushing the queue after a given number of milliseconds.
			*/
			autoFlush: function(every/*, rolling*/) {
				if (interval !== null)
					ExoWeb.trace.throwAndLog("messageQueue", "Autoflush is already enabled after {0} milliseconds.", [interval]);

				// Set interval and rolling options.
				rolling = arguments[1] ? true : false;
				interval = every;

				// Start the timer now if we already have messages.
				if (messages.length > 0) {
					startTimer();
				}
			}
		};

		return queue;
	}

	ExoWeb.MessageQueue = MessageQueue;

	// #endregion

	// #region ExoWeb.EvalWrapper
	//////////////////////////////////////////////////

	// Helper class for interpreting expressions
	function EvalWrapper(value) {
		this.value = value;
	}

	EvalWrapper.mixin({
		get: function EvalWrapper$get(member) {
			var propValue = getValue(this.value, member);

			if (propValue === undefined) {
				propValue = window[member];
			}

			if (propValue === undefined) {
				throw new TypeError(member + " is undefined");
			}

			return new EvalWrapper(propValue);
		}
	});

	ExoWeb.EvalWrapper = EvalWrapper;

	// #endregion

	// #region ExoWeb.Transform
	//////////////////////////////////////////////////

	function Transform(array, forLive) {
		if (array === null || array === undefined) {
			ExoWeb.trace.logError("transform", "Transform input is required.");
			throw new Error("Transform input is required.");
		}
		if (!(array instanceof Array)) {
			ExoWeb.trace.logError("transform", "Transform input must be an array.");
			throw new Error("Transform input must be an array.");
		}

		this._array = array;
		this.rootInput = array;
		if (forLive === true) {
			this._livePending = true;
			this._liveComplete = false;
		}
	}

	function TransformGroup(group, items) {
		this.group = group;
		this.items = items;
	}

	var compileFilterFunction = (function Transform$compileFilterFunction(filter) {
		var parser = /(([a-z_$][0-9a-z_$]*)([.]?))|(('([^']|\')*')|("([^"]|\")*"))/gi;
		var skipWords = ["true", "false", "$index", "null"];

		filter = filter.replace(parser, function(match, ignored, name, more, strLiteral) {
			if ((strLiteral !== undefined && strLiteral !== null && strLiteral.length > 0) || skipWords.indexOf(name) >= 0) {
				return match;
			}

			if (name === "$item") {
				return more ? "" : name;
			}

			if (more.length > 0) {
				return "get('" + name + "')" + more;
			}

			return "get('" + name + "').value";
		});

		return new Function("$item", "$index", "with(new ExoWeb.EvalWrapper($item)){ return (" + filter + ");}");
	}).cached();

	var compileSelectFunction = (function Transform$compileSelectFunction(selector) {
		return new Function("$item", "$index", "return ExoWeb.evalPath($item, '" + selector + "');");
	}).cached();

	var compileSelectManyFunction = (function Transform$compileSelectManyFunction(selector) {
		return new Function("$item", "$index", "return ExoWeb.evalPath($item, '" + selector + "');");
	}).cached();

	var compileGroupsFunction = (function Transform$compileGroupsFunction(groups) {
		return new Function("$item", "$index", "return ExoWeb.evalPath($item, '" + groups + "');");
	}).cached();

	var compileOrderingFunction = (function Transform$compileOrderingFunction(ordering) {
		var orderings = [];
		var parser = /\s*([a-z0-9_.]+)(\s+null)?(\s+(asc|desc))?(\s+null)? *(,|$)/gi;

		ordering.replace(parser, function(match, path, nullsFirst, ws, dir, nullsLast) {
			var isNullsFirst = (nullsFirst !== undefined && nullsFirst !== null && nullsFirst.length > 0);
			var isNullsLast = (nullsLast !== undefined && nullsLast !== null && nullsLast.length > 0);
			orderings.push({
				path: path,
				ab: dir === "desc" ? 1 : -1,
				nulls: isNullsLast || (!ws && isNullsFirst) ? 1 : -1
			});
		});

		function before(a, b) {
			if (a !== null && a !== undefined && a.constructor === String && b !== null && b !== undefined && b.constructor === String) {
				a = a.toLowerCase();
				b = b.toLowerCase();
			}
			return a < b;
		}

		return function compare(aObj, bObj) {
			for (var i = 0; i < orderings.length; ++i) {
				var order = orderings[i];

				var a = evalPath(aObj, order.path, null, null);
				var b = evalPath(bObj, order.path, null, null);

				if (a === null && b !== null) {
					return order.nulls;
				}
				if (a !== null && b === null) {
					return -order.nulls;
				}
				if (before(a, b)) {
					return order.ab;
				}
				if (before(b, a)) {
					return -order.ab;
				}
			}

			return 0;
		};
	}).cached();

	var transforms = {
		where: function where(input, filter, thisPtr) {
			var filterFn = filter instanceof Function ? filter : compileFilterFunction(filter);
			return input.filter(filterFn, thisPtr);
		},
		select: function select(input, selector, thisPtr) {
			var mapFn = selector instanceof Function ? selector : compileSelectFunction(selector);
			return input.map(mapFn, thisPtr);
		},
		selectMany: function select(input, selector, thisPtr) {
			var mapFn = selector instanceof Function ? selector : compileSelectFunction(selector);
			return input.mapToArray(mapFn, thisPtr);
		},
		groupBy: function groupBy(input, groups, thisPtr) {
			var groupFn = groups instanceof Function ? groups : compileGroupsFunction(groups);

			var result = [];
			var len = input.length;
			for (var i = 0; i < len; i++) {
				var item = input[i];
				var groupKey = groupFn.apply(thisPtr || item, [item, i]);

				var group = null;
				for (var g = 0; g < result.length; ++g) {
					if (result[g].group == groupKey) {
						group = result[g];
						group.items.push(item);
						break;
					}
				}

				if (!group) {
					result.push(new TransformGroup(groupKey, [item]));
				}
			}

			return result;
		},
		orderBy: function orderBy(input, ordering, thisPtr) {
			var sortFn = ordering instanceof Function ? ordering : compileOrderingFunction(ordering);
			return input.copy().sort(thisPtr ? sortFn.bind(thisPtr) : sortFn);
		}
	};

	function copyTransform(steps, array, live) {
		var result = $transform(array, live);
		steps.forEach(function(step) {
			result = result[step._transform.method].call(result, step._transform.arg, step._transform.thisPtr)
		});
		return result;
	}

	function makeTransform(array, priorTransform, method, arg, thisPtr) {
		// Make sure that the same transform is not made live more than once since this can cause collisions.
		if (priorTransform._liveComplete === true) {
			ExoWeb.trace.logError("transform", "Cannot call live on the same transform multiple times.");
			throw new Error("Cannot call live on the same transform multiple times.");
		}

		var result;

		// When creating a live transform, the result cannot be used directly as an array to
		// discourage using part of the result when the intention is to eventually call "live".
		// When live mode is not used, then if live is eventually called it will result in a non-optimal
		// copying of the transform.
		if (priorTransform._livePending === true) {
			result = new Transform(array, true);
		}
		else {
			Function.mixin(Transform.prototype, array);
			result = array;
		}

		result._prior = priorTransform;
		result.rootInput = priorTransform.rootInput;
		result._transform = { method: method, arg: arg, thisPtr: thisPtr };
		return result;
	}

	Transform.mixin({
		input: function Transform$input() {
			return this._array || this;
		},
		where: function Transform$where(filter, thisPtr) {
			var output = transforms.where(this.input(), filter, thisPtr);
			return makeTransform(output, this, "where", filter, thisPtr);
		},
		select: function Transform$select(selector, thisPtr) {
			var output = transforms.select(this.input(), selector, thisPtr);
			return makeTransform(output, this, "select", selector, thisPtr);
		},
		selectMany: function Transform$selectMany(selector, thisPtr) {
			var output = transforms.selectMany(this.input(), selector, thisPtr);
			return makeTransform(output, this, "selectMany", selector, thisPtr);
		},
		groupBy: function Transform$groupBy(groups, thisPtr) {
			var output = transforms.groupBy(this.input(), groups, thisPtr);
			if (this._livePending) {
				// make the items array observable if the transform is in live mode
				output.forEach(function(group) {
					ExoWeb.Observer.makeObservable(group.items);
				});
			}
			return makeTransform(output, this, "groupBy", groups, thisPtr);
		},
		orderBy: function Transform$orderBy(ordering, thisPtr) {
			var output = transforms.orderBy(this.input(), ordering, thisPtr);
			return makeTransform(output, this, "orderBy", ordering, thisPtr);
		},
		live: function Transform$live() {
			// Watches for changes on the root input into the transform
			// and raises observable change events on this item as the 
			// results change.

			var transform, steps = [], rootStep;

			// determine the set of transform steps and the level of nested grouping
			for (var step = this; step; step = step._prior) {
				if (step._prior) {
					steps.splice(0, 0, step);
				}
				else {
					rootStep = step;
				}
			}

			// copy and return a live-mode transform if live mode was not used originally
			if (this._livePending !== true) {
				return copyTransform(steps, rootStep.input(), true).live();
			}

			// make a copy of the final transformed data and make it observable
			var output = this.input().copy();
			ExoWeb.Observer.makeObservable(output);
			output.rootInput = this.rootInput;

			// watch for changes to root input and update the transform steps as needed
			ExoWeb.Observer.addCollectionChanged(rootStep.input(), function Transform$live$collectionChanged(sender, args) {
				var changes, stepInput, stepResult, modifiedItemsArrays = [];

				//Sys.NotifyCollectionChangedAction.add;

				// copy the set of changes since they will be manipulated
				changes = args.get_changes().map(function(c) {
					return {
						action: c.action,
						oldItems: c.oldItems ? c.oldItems.copy() : null,
						oldStartingIndex: c.oldStartingIndex,
						newItems: c.newItems ? c.newItems.copy() : null,
						newStartingIndex: c.newStartingIndex
					};
				});

				// make a copied version of the input so that it can be manipulated without affecting the result
				stepInput = rootStep.input().copy();

				// re-run the transform on the newly changed input
				steps.forEach(function(step) {
					// store a reference to the output of this step
					stepResult = step.input();

					if (step._transform.method === "where") {
						changes.purge(function(change) {
							if (change.oldItems) {
								var oldItems = change.oldItems;
								// determine which removed items made it through the filter
								change.oldItems = transforms[step._transform.method](change.oldItems, step._transform.arg, step._transform.thisPtr);
								if (change.oldItems.length === 0) {
									// none of the removed items make it through the filter, so discard
									change.oldItems = null;
									change.oldStartingIndex = null;
									return true;
								}
								else {
									// find the actual index of the first removed item in the resulting array
									change.oldStartingIndex = stepResult.indexOf(change.oldItems[0]);

									// remove the filtered items from the result array
									stepResult.splice(change.oldStartingIndex, change.oldItems.length);
								}
							}
							else if (change.newItems) {
								var newItems = change.newItems;
								// determine which added items will make it through the filter
								change.newItems = transforms[step._transform.method](change.newItems, step._transform.arg, step._transform.thisPtr);
								if (change.newItems.length === 0) {
									// none of the new items will make it through the filter, so discard
									change.newItems = null;
									change.newStartingIndex = null;
									return true;
								}
								else {
									// if not added to the beginning or end of the list, determine
									// the real starting index by finding the index of the previous item
									if (change.newStartingIndex !== 0 && (change.newStartingIndex + change.newItems.length) !== stepInput.length) {
										var found = false;
										for (var idx = change.newStartingIndex - 1; !found && idx >= 0; idx--) {
											if (stepResult.indexOf(stepInput[idx]) >= 0) {
												found = true;
											}
										}
										change.newStartingIndex = idx + 1;
									}

									// splice the filtered items into the result array
									var spliceArgs = change.newItems.copy();
									spliceArgs.splice(0, 0, change.newStartingIndex, 0);
									Array.prototype.splice.apply(stepResult, spliceArgs);
								}
							}
							else {
								return true;
							}
						});
					}
					else if (step._transform.method === "select") {
						changes.forEach(function(change) {
							if (change.oldItems) {
								change.oldItems = stepResult.splice(change.oldStartingIndex, change.oldItems.length);
							}
							else if (change.newItems) {
								var mapFn = step._transform.arg instanceof Function ? step._transform.arg : compileSelectFunction(step._transform.arg);
								change.newItems = change.newItems.map(function(item) {
									return mapFn.call(step._transform.thisPtr || item, item);
								});

								// splice the filtered items into the result array
								var spliceArgs = change.newItems.copy();
								spliceArgs.splice(0, 0, change.newStartingIndex, 0);
								Array.prototype.splice.apply(stepResult, spliceArgs);
							}
						});
					}
					else if (step._transform.method === "selectMany") {
						changes.forEach(function(change) {
							if (change.oldItems) {
								var mapFn = step._transform.arg instanceof Function ? step._transform.arg : compileSelectManyFunction(step._transform.arg);
								var oldItemsMany = change.oldItems.mapToArray(function(item) {
									return mapFn.call(step._transform.thisPtr || item, item);
								});
								var oldPreceeding = stepInput.slice(0, change.oldStartingIndex);
								var oldPreceedingMany = oldPreceeding.mapToArray(function(item) {
									return mapFn.call(step._transform.thisPtr || item, item);
								});
								change.oldItems = stepResult.splice(oldPreceedingMany.length, oldItemsMany.length);
								change.oldStartingIndex = oldPreceedingMany.length;
							}
							else if (change.newItems) {
								var mapFn = step._transform.arg instanceof Function ? step._transform.arg : compileSelectManyFunction(step._transform.arg);
								change.newItems = change.newItems.mapToArray(function(item) {
									return mapFn.call(step._transform.thisPtr || item, item);
								});

								// splice the filtered items into the result array
								var spliceArgs = change.newItems.copy();
								spliceArgs.splice(0, 0, change.newStartingIndex, 0);
								Array.prototype.splice.apply(stepResult, spliceArgs);
							}
						});
					}
					else if (step._transform.method === "groupBy") {
						var groupFn = step._transform.arg instanceof Function ? step._transform.arg : compileGroupsFunction(step._transform.arg);
						var copyOfResults = stepResult.copy();
						changes.forEach(function(change) {
							if (change.oldItems) {
								change.oldItems.forEach(function(item) {
									var groupKey = groupFn.call(step._transform.thisPtr || item, item);
									var group = copyOfResults.filter(function(g) { return g.group === groupKey; })[0];
									// begin and end update on items array
									if (modifiedItemsArrays.indexOf(group.items) < 0) {
										group.items.beginUpdate();
										modifiedItemsArrays.push(group.items);
									}
									// remove the item
									var idx = group.items.indexOf(item);
									group.items.remove(item);
									if (idx === 0) {
										var groupIndex = copyOfResults.indexOf(group),
											sourceIndex = stepInput.indexOf(group.items[0]),
											targetIndex = null;
										for (i = 0; i < copyOfResults.length; i++) {
											if (sourceIndex > stepInput.indexOf(copyOfResults[i].items[0])) {
												targetIndex = i + 1;
												break;
											}
										}
										if (targetIndex !== null) {
											copyOfResults.splice(groupIndex, 1);
											copyOfResults.splice(targetIndex, 0, group);
										}
									}
									if (group.items.length === 0) {
										// remove the group from the copy of the array
										copyOfResults.splice(copyOfResults.indexOf(group), 1);
									}
								});
							}
							else if (change.newItems) {
								change.newItems.forEach(function(item) {
									var groupKey = groupFn.call(step._transform.thisPtr || item, item),
										group = copyOfResults.filter(function(g) { return g.group === groupKey; })[0],
										sourceIndex,
										targetIndex,
										resequenceGroup = false,
										groupIndex,
										i;

									if (group) {
										// begin and end update on items array
										if (modifiedItemsArrays.indexOf(group.items) < 0) {
											group.items.beginUpdate();
											modifiedItemsArrays.push(group.items);
										}
										sourceIndex = stepInput.indexOf(item), targetIndex = null;
										for (i = 0; i < group.items.length; i++) {
											if (sourceIndex < stepInput.indexOf(group.items[i])) {
												targetIndex = i;
												break;
											}
										}
										if (targetIndex !== null) {
											group.items.insert(targetIndex, item);
											// group's index may have changed as a result
											if (targetIndex === 0) {
												resequenceGroup = true;
											}
										}
										else {
											group.items.add(item);
										}
									}
									else {
										group = new TransformGroup(groupKey, [item]);
										ExoWeb.Observer.makeObservable(group.items);
										copyOfResults.push(group);
										resequenceGroup = true;
									}

									if (resequenceGroup === true) {
										groupIndex = copyOfResults.indexOf(group);
										sourceIndex = stepInput.indexOf(group.items[0]);
										targetIndex = null;
										for (i = 0; i < groupIndex; i++) {
											if (sourceIndex < stepInput.indexOf(copyOfResults[i].items[0])) {
												targetIndex = i;
												break;
											}
										}
										if (targetIndex !== null) {
											copyOfResults.splice(groupIndex, 1);
											copyOfResults.splice(targetIndex, 0, group);
										}
									}
								});
							}
						});

						// collect new changes to groups
						changes = update(stepResult, copyOfResults, true);
					}
					else if (step._transform.method === "orderBy") {
						// sort the input and update the step result to match
						var sorted = transforms[step._transform.method](stepInput, step._transform.arg, step._transform.thisPtr);
						changes = update(stepResult, sorted, true);
					}

					// move the input forward to the result of the current step
					stepInput = stepResult;
				});

				// apply changes to the ouput array
				output.beginUpdate();
				changes.forEach(function(change) {
					if (change.oldItems) {
						output.removeRange(change.oldStartingIndex, change.oldItems.length);
					}
					else if (change.newItems) {
						output.insertRange(change.newStartingIndex, change.newItems);
					}
				});
				output.endUpdate();

				// release changes to items arrays of groups, changes to the array occur first to allow
				// for changes to groups' items to be ignored if the group is no longer a part of the output
				modifiedItemsArrays.forEach(function(items) {
					items.endUpdate();
				});
			});

			// mark the transform steps as live complete
			rootStep._liveComplete = true;
			steps.forEach(function(step) {
				step._liveComplete = true;
			});

			return output;
		}
	});

	ExoWeb.Transform = Transform;
	window.$transform = function transform(array, forLive) { return new Transform(array, forLive); };

	// #endregion

	// #region ExoWeb.Translator
	//////////////////////////////////////////////////

	function Translator() {
		this._forwardDictionary = {};
		this._reverseDictionary = {};
	}

	Translator.prototype = {
		lookup: function Translator$lookup(source, category, key) {
			if (source[category]) {
				return source[category][key] || null;
			}
		},
		forward: function Translator$forward(category, key) {
			return this.lookup(this._forwardDictionary, category, key);
		},
		reverse: function Translator$reverse(category, key) {
			return this.lookup(this._reverseDictionary, category, key);
		},
		add: function Translator$addMapping(category, key, value/*, suppressReverse*/) {
			// look for optional suppress reverse lookup argument
			var suppressReverse = (arguments.length == 4 && arguments[3].constructor === Boolean) ? arguments[3] : false;

			// lazy initialize the forward dictionary for the category
			if (!this._forwardDictionary[category]) {
				this._forwardDictionary[category] = {};
			}
			this._forwardDictionary[category][key] = value;

			// don't add to the reverse dictionary if the suppress flag is specified
			if (!suppressReverse) {
				// lazy initialize the reverse dictionary for the category
				if (!this._reverseDictionary[category]) {
					this._reverseDictionary[category] = {};
				}
				this._reverseDictionary[category][value] = key;
			}
		}
	};

	ExoWeb.Translator = Translator;

	// #endregion

	// #region ExoWeb.Utilities
	//////////////////////////////////////////////////

	// determine whether Object.defineProperty is supported and add legacy support is necessary/possible
	var definePropertySupported = false;
	var defineProperty;

	function defineLegacyProperty() {
		Object.defineProperty = function (obj, prop, desc) {

			// assume getter will only need to calculate once following the constructor
			if ("get" in desc) {
				if (desc.init) {
					// assume objects with prototypes are instances and go ahead and initialize the property using the getter
					if (obj.prototype) {
						obj[prop] = desc.get.call(obj, obj);
					}

					// otherwise, configure the prototype to initialize the property when the constructor is called
					else if (obj.constructor) {
						var initProperties = obj.constructor.__initProperties;
						if (!initProperties) {
							obj.constructor.__initProperties = initProperties = {};
						}
						initProperties[prop] = desc.get;
					}
				}
				else {
					ExoWeb.trace.throwAndLog("utilities", "Getters are not supported by the current browser.  Use definePropertySupported to check for full support.");
				}
			}

			// assume it is just a data property
			else {
				obj[prop] = desc.value;
			}

			// throw an exception if the property has a setter, which is definitely not supported
			if ("set" in desc) {
				ExoWeb.trace.throwAndLog("utilities", "Setters are not supported by the current browser.  Use definePropertySupported to check for full support.");
			}
		}
	}

	try {
		// emulate ES5 getter/setter API using legacy APIs
		if (Object.prototype.__defineGetter__ && !Object.defineProperty) {
			Object.defineProperty = function (obj, prop, desc) {

				// property with getter
				if ("get" in desc) obj.__defineGetter__(prop, desc.get);

				// property with setter
				if ("set" in desc) obj.__defineSetter__(prop, desc.set);

				// data only property
				if (!("get" in desc || "set" in desc)) {

					// read/write property
					if (desc.writable) {
						var value = desc.value;
						obj.__defineGetter__(prop, function () { return value; });
						obj.__defineSetter__(prop, function (val) { value = val; });
					}

					// read only property
					else {
						var value = desc.value;
						obj.__defineGetter__(prop, function () { return value; });
					}
				}
			}
			definePropertySupported = true;
		}

		// otherwise, ensure defineProperty actually works
		else if (Object.defineProperty && Object.defineProperty({}, "x", { get: function () { return true } }).x) {
			definePropertySupported = true;
		}

		// enable legacy support
		else {
			defineLegacyProperty();
		}
	} 

	// no getter/setter support
	catch (e) {

		// enable legacy support
		defineLegacyProperty();
	};

	// classes that call define property should
	function initializeLegacyProperties(obj) {
		if (definePropertySupported) return;
		var initProperties = obj.constructor.__initProperties;
		if (initProperties) {
			for (var p in initProperties) {
				obj[p] = initProperties[p].call(obj, obj);
			}
		}
	}

	// evalPath internal utility function
	function evalPath(obj, path, nullValue, undefinedValue) {
		var i, name, steps = path.split("."), source, value = obj;

		if (value === null) {
			return arguments.length >= 3 ? nullValue : null;
		}
		if (value === undefined) {
			return arguments.length >= 4 ? undefinedValue : undefined;
		}

		for (i = 0; i < steps.length; ++i) {
			name = steps[i];
			source = value;
			value = getValue(source, name);

			if (value === null) {
				return arguments.length >= 3 ? nullValue : null;
			}
			if (value === undefined) {
				return arguments.length >= 4 ? undefinedValue : undefined;
			}
		}

		if (value === null) {
			return arguments.length >= 3 ? nullValue : null;
		}
		if (value === undefined) {
			return arguments.length >= 4 ? undefinedValue : undefined;
		}

		return value;
	}

	ExoWeb.evalPath = evalPath;

	function getLastTarget(target, propertyPath) {
		var i, path = propertyPath, finalTarget = target;

		if (path.constructor == String) {
			path = path.split(".");
		}
		else if (!(path instanceof Array)) {
			throw ExoWeb.trace.logError(["$lastTarget", "core"], "invalid parameter propertyPath");
		}

		for (i = 0; i < path.length - 1; i++) {
			if (finalTarget) {
				finalTarget = getValue(finalTarget, path[i]);
			}
		}

		return finalTarget;
	}

	ExoWeb.getLastTarget = getLastTarget;
	window.$lastTarget = getLastTarget;

	// If a getter method matching the given property name is found on the target it is invoked and returns the 
	// value, unless the the value is undefined, in which case null is returned instead.  This is done so that 
	// calling code can interpret a return value of undefined to mean that the property it requested does not exist.
	// TODO: better name
	function getValue(target, property) {
		var value;

		// the see if there is an explicit getter function for the property
		var getter = target["get_" + property];
		if (getter) {
			value = getter.call(target);
			if (value === undefined) {
				value = null;
			}
		}

		// otherwise search for the property
		else {
			if ((isObject(target) && property in target) ||
				Object.prototype.hasOwnProperty.call(target, property) ||
				(target.constructor === String && /^[0-9]+$/.test(property) && parseInt(property, 10) < target.length)) {
				value = target[property];
				if (value === undefined) {
					value = null;
				}
			}
			else if (/\./.test(property)) {
				ExoWeb.trace.logWarning("", "Possible incorrect usage of \"getValue()\", the path \"{0}\" does not exist on the target and appears to represent a multi-hop path.", [property]);
			}
		}

		return value;
	}

	ExoWeb.getValue = getValue;

	function getCtor(type) {

		// Only return a value if the argument is defined
		if (type !== undefined && type !== null) {

			// If the argument is a function then return it immediately.
			if (isType(type, Function)) {
				return type;

			}
			else {
				var ctor;

				if (isType(type, String)) {
					// remove "window." from the type name since it is implied
					type = type.replace(/(window\.)?(.*)/, "$2");

					// evaluate the path
					ctor = evalPath(window, type);
				}

				// warn (and implicitly return undefined) if the result is not a javascript function
				if (ctor !== undefined && ctor !== null && !isType(ctor, Function)) {
					ExoWeb.trace.logWarning("", "The given type \"{0}\" is not a function.", [type]);
				}
				else {
					return ctor;
				}
			}
		}
	}

	ExoWeb.getCtor = getCtor;

	function isType(val, type) {

		// Exit early for checking function type
		if (val !== undefined && val !== null && val === Function && type !== undefined && type !== null && type === Function) {
			return true;
		}

		var ctor = getCtor(type);

		// ensure a defined value and constructor
		return val !== undefined && val !== null &&
				ctor !== undefined && ctor !== null &&
				// accomodate objects (instanceof) as well as intrinsic value types (String, Number, etc)
				(val instanceof ctor || val.constructor === ctor);
	}

	ExoWeb.isType = isType;

	function eachProp(obj, callback, thisPtr) {
		var prop;
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (callback.apply(thisPtr || this, [prop, obj[prop]]) === false) {
					break;
				}
			}
		}
	}

	ExoWeb.eachProp = eachProp;

	function objectToArray(obj) {
		var list = [];
		eachProp(obj, function(prop, value) {
			list.push(value);
		});
		return list;
	}

	ExoWeb.objectToArray = objectToArray;

	function $format(str, values) {
		var source = null, arrayMode = false;

		if (!values) return str;

		if (arguments.length > 2) {
			// use arguments passed to function as array
			source = Array.prototype.slice.call(arguments, 1);
		}
		else {
			source = !(values instanceof Array) ? [values] : values
		}

		return str.replace(/\{([0-9]+)\}/ig, function $format$token(match, indexStr) {
			var index = parseInt(indexStr, 10);
			var result = source[index];

			if (result !== null && result !== undefined && result.constructor !== String) {
				result = result.toString();
			}

			return result;
		});
	}

	window.$format = $format;

	function makeHumanReadable(text) {
		return text.replace(/([^A-Z]+)([A-Z])/g, "$1 $2");
	}

	ExoWeb.makeHumanReadable = makeHumanReadable;

	// #endregion

	// #region ExoWeb.TimeSpan
	//////////////////////////////////////////////////

	function TimeSpan(ms) {
		/// <field name="totalSeconds" type="Number">The target entity the condition is associated with.</field>

		this.totalMilliseconds = ms;

		initializeLegacyProperties(this);
	}

	TimeSpan.mixin({
		totalSeconds: { get: function () { return this.totalMilliseconds / 1000; }, init: true },
		totalMinutes: { get: function () { return this.totalSeconds / 60; }, init: true },
		totalHours: { get: function () { return this.totalMinutes / 60; }, init: true },
		totalDays: { get: function () { return this.totalHours / 24; }, init: true },
		milliseconds: { get: function () { return Math.floor(this.totalMilliseconds % 1000); }, init: true },
		seconds: { get: function () { return Math.floor(this.totalSeconds % 60); }, init: true },
		minutes: { get: function () { return Math.floor(this.totalMinutes % 60); }, init: true },
		hours: { get: function () { return Math.floor(this.totalHours % 24); }, init: true },
		days: { get: function () { return Math.floor(this.totalDays); }, init: true },
		toObject: function() {
			return {
				Hours: this.hours,
				Minutes: this.minutes,
				Seconds: this.seconds,
				Milliseconds: this.milliseconds,
				Ticks: this.totalMilliseconds * 1000000 / 100,
				Days: this.days,
				TotalDays: this.totalDays,
				TotalHours: this.totalHours,
				TotalMilliseconds: this.totalMilliseconds,
				TotalMinutes: this.totalMinutes,
				TotalSeconds: this.totalSeconds
			};
		},
		valueOf: function() {
			return this.totalMilliseconds;
		},
		toString: function TimeSpan$toString() { 
			var num;
			var label;

			if (this.totalHours < 1) {
				num = Math.round(this.totalMinutes);
				label = "minute";
			}
			else if (this.totalDays < 1) {
				num = Math.round(this.totalHours * 100) / 100;
				label = "hour";
			}
			else {
				num = Math.round(this.totalDays * 100) / 100;
				label = "day";
			}

			return num == 1 ? (num + " " + label) : (num + " " + label + "s");
		}
	});

	window.TimeSpan = TimeSpan;

	Date.mixin({
		subtract: function Date$subtract(d) {
			return new TimeSpan(this - d);
		},
		add: function Date$add(timeSpan) {
			return new Date(this.getTime() + timeSpan.totalMilliseconds);
		}
	});
	// #endregion

	// #region ExoWeb.Date
	//////////////////////////////////////////////////

	var dayOfWeek = {};
	var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	days.forEach(function(day, i) {
		dayOfWeek[day] = i;
	});

	Date.prototype.toDate = function toDate() {
		return new Date(this.getFullYear(), this.getMonth(), this.getDate());
	};

	Date.prototype.addYears = function addYears(numYears) {
		return new Date(this.getFullYear() + numYears, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
	};

	Date.prototype.addDays = function addDays(numDays, requireWeekDay) {
		var date = new Date(this.getFullYear(), this.getMonth(), this.getDate() + numDays, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());

		// If requireWeekDay is true and the day falls on a Saturday or Sunday, then
		// the the result will be moved back to the preceeding friday (when subtracting days)
		// or forward to the next monday (when adding days).
		if (requireWeekDay === true) {
			// Sunday
			if (date.getDay() === 0) {
				date.setDate(date.getDate() + (numDays >= 0 ? 1 : -2));
			}
			// Saturday 
			else if (date.getDay() === 6) {
				date.setDate(date.getDate() + (numDays >= 0 ? 2 : -1));
			}
		}

		return date;
	};

	var oneHourInMilliseconds = 1000 * 60 * 60;

	Date.prototype.addHours = function addHours(numHours) {
		return new Date(+this + (oneHourInMilliseconds * numHours));
	};

	function getDayOfWeek(day) {
		if (day !== undefined && day !== null && day.constructor === String)
			day = days.indexOf(day.toLowerCase());
		else if (day !== undefined && day !== null && day.constructor !== Number)
			day = null;

		return day >= 0 && day < days.length ? day : null;
	}

	Date.prototype.startOfWeek = function(startOfWeekDay) {
		var startOfWeek = getDayOfWeek(startOfWeekDay) || dayOfWeek.monday; // monday by default
		return this.addDays(startOfWeek - this.getDay());
	};

	Date.prototype.weekOfYear = function(startOfWeekDay) {
		var startOfWeek = getDayOfWeek(startOfWeekDay) || dayOfWeek.monday; // monday by default

		if (this.startOfWeek(startOfWeek).getYear() < this.getYear()) {
			return 0;
		}

		var firstDayOfYear = new Date(this.getFullYear(), 0, 1);
		var firstWeek = firstDayOfYear.startOfWeek(startOfWeek);
		if (firstWeek.getFullYear() < firstDayOfYear.getFullYear()) {
			firstWeek = firstWeek.addDays(7);
		}

		var weeks = 0;
		var target = this.toDate();
		for (var day = firstWeek; day <= target; day = day.addDays(7)) {
			weeks++;
		}

		return weeks;
	};

	Date.prototype.weekDifference = function (other, startOfWeek) {
		var isNegative = other <= this;
		var a = this, b = other;

		if (isNegative)
		{
			a = other;
			b = this;
		}

		var aWeek = a.weekOfYear(startOfWeek);
		var bWeek = b.weekOfYear(startOfWeek);

		for (var i = a.getFullYear(); i < b.getFullYear(); i++)
			bWeek += (new Date(i, 11, 31)).weekOfYear(startOfWeek);

		return isNegative ? aWeek - bWeek : bWeek - aWeek;
	};

	// #endregion

	// #region ExoWeb.Object
	//////////////////////////////////////////////////

	// original code grabbed from http://oranlooney.com/functional-javascript/
	Object.copy = function Object$Copy(obj, options/*, level*/) {
		if (!options) {
			options = {};
		}

		// initialize max level to default value
		if (!options.maxLevel) {
			options.maxLevel = 25;
		}

		// initialize level to default value
		var level = arguments.length > 2 ? arguments[2] : 0;

		if (level >= options.maxLevel || typeof obj !== 'object' || obj === null || obj === undefined) {
			return obj;  // non-object have value sematics, so obj is already a copy.
		}
		else {
			if (obj instanceof Array) {
				var result = [];
				for (var i = 0; i < obj.length; i++) {
					result.push(Object.copy(obj[i]));
				}
				return result;
			}
			else {
				var value = obj.valueOf();
				if (obj != value) {
					// the object is a standard object wrapper for a native type, say String.
					// we can make a copy by instantiating a new object around the value.
					return new obj.constructor(value);
				} else {
					// don't clone entities
					if (typeof(Entity) !== "undefined" && obj instanceof Entity) {
						return obj;
					}
					else {
						// ok, we have a normal object. copy the whole thing, property-by-property.
						var c = {};
						for (var property in obj) {
							// Optionally copy property values as well
							if (options.copyChildren) {
								c[property] = Object.copy(obj[property], options, level + 1);
							}
							else {
								c[property] = obj[property];
							}

						}
						return c;
					}
				}
			}
		}
	};
	// #endregion

	// #region ExoWeb.Observer
	//////////////////////////////////////////////////

	var Observer = { };

	Observer.addPathChanged = function Observer$addPathChanged(target, path, handler, allowNoTarget) {
		// Throw an error if the target is null or undefined, unless the calling code specifies that this is ok
		if (target === undefined || target === null) {
			if (allowNoTarget === true) {
				return;
			}
			else {
				ExoWeb.trace.throwAndLog("observer", "Cannot watch for changes to \"{0}\" on a null or undefined target.", [path instanceof Array ? path.join(".") : path]);
			}
		}

		// Ensure a set of path change handlers
		if (!target.__pathChangeHandlers) {
			target.__pathChangeHandlers = {};
		}

		var list = path;
		if (path instanceof Array) {
			path = path.join(".");
		}
		else {
			list = path.split(".");
		}

		var roots = [];

		function processStep(parent, item, index) {
			var observers = [];

			function addObserver(value) {
				var obs = new PropertyObserver(item);

				observers.push(obs);
				if (index === 0) {
					roots.push(obs);
				}

				obs.start(value, handler);

				// Continue to next steps if there are any
				if (index + 1 < list.length) {
					processStep(obs, list[index + 1], index + 1);
				}
			}

			function removeObserver(value) {
				for (var i = 0; i < observers.length; i++) {
					var obs = observers[i];
					if (obs._source === value) {
						Array.removeAt(observers, i--);
						if (index === 0) {
							Array.remove(roots, obs);
						}

						obs.stop();
					}
				}
			}

			// If there is a step before this one, then respond to 
			// changes to the value(s) at that step.
			if (parent) {
				parent._addEvent("valueCaptured", addObserver);
				parent._addEvent("valueReleased", removeObserver);
			}

			var source = index === 0 ? target : parent.value();
			if (source !== undefined && source !== null) {
				if (source instanceof Array) {
					Array.forEach(source, addObserver);

					// Watch for changes to the target if it is an array, so that we can
					// add new observers, remove old ones, and call the handler.
					if (index === 0) {
						Observer.addCollectionChanged(source, function(sender, args) {
							var changes = args.get_changes();

							Array.forEach(changes.removed || [], removeObserver);
							Array.forEach(changes.added || [], addObserver);
							handler();
						});
					}
				}
				else {
					addObserver(source);
				}
			}
		}

		// Start processing the path
		processStep(null, list[0], 0);

		// Store the observer on the object
		var pathChangeHandlers = target.__pathChangeHandlers[path];
		if (!pathChangeHandlers) {
			target.__pathChangeHandlers[path] = pathChangeHandlers = [];
		}
		pathChangeHandlers.push({ roots: roots, handler: handler });
	};

	Observer.removePathChanged = function Sys$Observer$removePathChanged(target, path, handler) {
		path = (path instanceof Array) ? path.join(".") : path;

		var pathChangeHandlers = target.__pathChangeHandlers ? target.__pathChangeHandlers[path] : null;

		if (pathChangeHandlers) {
			// Search the list for handlers that match the given handler and stop and remove them
			pathChangeHandlers.purge(function(pathChangeHandler) {
				if (pathChangeHandler.handler === handler) {
					Array.forEach(pathChangeHandler.roots, function(observer) {
						observer.stop();
					});
					return true;
				}
			});

			// If there are no more handlers for this path then remove it from the cache
			if (pathChangeHandlers.length === 0) {
				// delete the data specific to this path
				delete target.__pathChangeHandlers[path];

				// determine if there are any other paths being watched
				var hasHandlers = false;
				for (var remainingHandler in target.__pathChangeHandlers) {
					if (target.__pathChangeHandlers.hasOwnProperty(remainingHandler)) {
						hasHandlers = true;
					}
				}

				// null out the property of the target if there are no longer any paths being watched
				if (!hasHandlers) {
					target.__pathChangeHandlers = null;
				}
			}
		}
	};

	var observableInterface = {
		makeObservable: function (target) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		},
		disposeObservable: function (target) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		},
		addCollectionChanged: function (target, handler) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		},
		removeCollectionChanged: function (target, handler) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		},
		addPropertyChanged: function (target, property, handler) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		},
		removePropertyChanged: function (target, property, handler) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		},
		raisePropertyChanged: function (target, property) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		},
		setValue: function (target, property, value) {
			throw new Error("Observable provider has not been implemented.  Call ExoWeb.Model.setObservableProvider().");
		}
	};

	// sets the observer provider to use, verifying that it matches the defined interface.
	function setObserverProvider(provider) {
		for (var method in observableInterface) {
			var definition = provider[method];
			if (!(definition instanceof Function)) {
				throw new Error("Observable provider does not implement '" + method + "'.");
			}
			Observer[method] = definition;
		}
	};

	// expose publicly
	ExoWeb.Observer = Observer;
	// #endregion

	// #region ExoWeb.PropertyObserver
	//////////////////////////////////////////////////

	function PropertyObserver(prop) {
		this._source = null;
		this._prop = prop;
		this._handler = null;
	}

	PropertyObserver.mixin(Functor.eventing);

	PropertyObserver.mixin({
		value: function PropertyObserver$value() {
			return ExoWeb.getValue(this._source, this._prop);
		},
		release: function PropertyObserver$release(value) {
			// Notify subscribers that the old value should be released
			if (value instanceof Array) {
				Array.forEach(value, function(item) {
					this._raiseEvent("valueReleased", [item]);
				}, this);
			}
			else {
				this._raiseEvent("valueReleased", [value]);
			}
		},
		capture: function PropertyObserver$capture(value) {
			// Notify subscribers that a new value was captured
			if (value instanceof Array) {
				Array.forEach(value, function(item) {
					this._raiseEvent("valueCaptured", [item]);
				}, this);

				var _this = this;

				// Have to store the array since if the value changes we won't necessarily be able to retrieve the original array
				if (this._collectionTarget !== undefined && this._collectionTarget !== null) {
					Observer.removeCollectionChanged(this._collectionTarget, this._collectionHandler);
				}

				this._collectionTarget = value;

				this._collectionHandler = function collectionHandler(sender, args) {
					var changes = args.get_changes();

					// Call the actual handler
					_this._handler.apply(this, arguments);

					// remove old observers and add new observers
					Array.forEach(changes.removed || [], function(removed) {
						_this._raiseEvent("valueReleased", [removed]);
					});
					Array.forEach(changes.added || [], function(added) {
						_this._raiseEvent("valueCaptured", [added]);
					});
				};

				Observer.addCollectionChanged(this._collectionTarget, this._collectionHandler);
			}
			else {
				this._raiseEvent("valueCaptured", [value]);
			}
		},
		start: function PropertyObserver$start(source, handler) {
			if (this._source) {
				ExoWeb.trace.throwAndLog(["observer"], "Cannot start an observer that is already started.");
			}

			var _this = this;

			this._source = source;
			this._handler = handler;

			var value = this.value();

			this._propHandler = function propHandler(sender, args) {
				// Call the actual handler.
				_this._handler.apply(this, arguments);

				// Release the old value
				if (value !== undefined && value !== null) {
					_this.release(value);
				}

				value = _this.value();

				// Release the old value
				if (value !== undefined && value !== null) {
					_this.capture(value);
				}
			};

			Observer.addPropertyChanged(this._source, this._prop, this._propHandler);

			// If we currently have a value, then notify subscribers
			if (value !== undefined && value !== null) {
				this.capture(value);
			}
		},
		stop: function PropertyObserver$stop() {
			if (this._source) {
				// Remove the registered event(s)
				Observer.removePropertyChanged(this._source, this._prop, this._propHandler);

				// Have to store the array since if the value changes we won't necessarily be able to retrieve the original array
				if (this._collectionTarget !== undefined && this._collectionTarget !== null) {
					Observer.removeCollectionChanged(this._collectionTarget, this._collectionHandler);
					this.release(this._collectionTarget);
				}
				else {
					var value = this.value();
					if (value !== undefined && value !== null) {
						this.release(value);
					}
				}

				// Null out the source to indicate that it is no longer watching that object
				this._source = null;
			}
		}
	});

	ExoWeb.PropertyObserver = PropertyObserver;

	// #endregion

	// #region ExoWeb.Model.Resource
	//////////////////////////////////////////////////

	var Resource = {
		"allowed-values":							"{property} is not in the list of allowed values.",
		"compare-after":							"{property} must be after {compareSource}.",
		"compare-before":							"{property} must be before {compareSource}.",
		"compare-equal":							"{property} must be the same as {compareSource}.",
		"compare-greater-than":						"{property} must be greater than {compareSource}.",
		"compare-greater-than-or-equal":			"{property} must be greater than or equal to {compareSource}.",
		"compare-less-than":						"{property} must be less than {compareSource}.",
		"compare-less-than-or-equal":				"{property} must be less than or equal to {compareSource}.",
		"compare-not-equal":						"{property} must be different from {compareSource}.",
		"compare-on-or-after":						"{property} must be on or after {compareSource}.",
		"compare-on-or-before":						"{property} must be on or before {compareSource}.",
		"listlength-compare-equal":					"{property} length must be the same as {compareSource}.",
		"listlength-compare-greater-than":			"{property} length must be greater than {compareSource}.",
		"listlength-compare-greater-than-or-equal":	"{property} length must be greater than or equal to {compareSource}.",
		"listlength-compare-less-than":				"{property} length must be less than {compareSource}.",
		"listlength-compare-less-than-or-equal":	"{property} length must be less than or equal to {compareSource}.",
		"listlength-compare-not-equal":				"{property} length must be different from {compareSource}.",
		"range-at-least":							"{property} must be at least {min}.",
		"range-at-most":							"{property} must be at most {max}.",
		"range-between":							"{property} must be between {min} and {max}.",
		"range-on-or-after":						"{property} must be on or after {min}.",
		"range-on-or-before":						"{property} must be on or before {max}.",
		"required":									"{property} is required.",
		"required-if-after":						"{property} is required when {compareSource} is after {compareValue}.",
		"required-if-before":						"{property} is required when {compareSource} is before {compareValue}.",
		"required-if-equal":						"{property} is required when {compareSource} is {compareValue}.",
		"required-if-exists":						"{property} is required when {compareSource} is specified.",
		"required-if-greater-than":					"{property} is required when {compareSource} is greater than {compareValue}.",
		"required-if-greater-than-or-equal":		"{property} is required when {compareSource} is greater than or equal to {compareValue}.",
		"required-if-less-than":					"{property} is required when {compareSource} is less than {compareValue}.",
		"required-if-less-than-or-equal":			"{property} is required when {compareSource} is less than or equal to {compareValue}.",
		"required-if-not-equal":					"{property} is required when {compareSource} is not {compareValue}.",
		"required-if-not-exists":					"{property} is required when {compareSource} is not specified.",
		"required-if-on-or-after":					"{property} is required when {compareSource} is on or after {compareValue}.",
		"required-if-on-or-before":					"{property} is required when {compareSource} is on or before {compareValue}.",
		"string-format":							"{property} must be formatted as {formatDescription}.",
		"string-length-at-least":					"{property} must be at least {min} characters.",
		"string-length-at-most":					"{property} must be at most {max} characters.",
		"string-length-between":					"{property} must be between {min} and {max} characters.",

		// gets the resource with the specified name
		get: function Resource$get(name) {
			return this[name];
		}
	}

	// publicly export the resource object
	ExoWeb.Model.Resource = Resource;
	// #endregion

	// #region ExoWeb.Model.Format
	//////////////////////////////////////////////////

	function Format(options) {
		if (!options.hasOwnProperty("specifier") || !isString(options.specifier)) {
			throw new Error("Format specifier string must be provided.");
		}
		this._specifier = options.specifier;
		this._paths = options.paths;
		this._convert = options.convert;
		this._convertBack = options.convertBack;
		this._compile = options.compile;
		this._description = options.description;
		this._nullString = options.nullString || "";
		this._undefinedString = options.undefinedString || "";
	}

	var formatTemplateParser = /\[([a-z_][a-z0-9_.]*)(\:(.+?))?\]/ig;
	var metaPathParser = /^(.*\.|)meta(\..*|)$/;

	Format.fromTemplate = function Format$fromTemplate(type, template) {

		return new Format({
			specifier: template,

			compile: function compile() {

				if (!this._tokens) {
					this._paths = [];
					this._tokens = [];

					// Replace escaped \, [ or ] characters with placeholders
					template = template.replace(/\\\\/g, '\u0000').replace(/\\\[/g, '\u0001').replace(/\\\]/g, '\u0002');
					var index = 0;
					formatTemplateParser.lastIndex = 0;
					var match = formatTemplateParser.exec(template);

					// Process each token match
					while (match) {
						var path = match[1];
						var propertyPath = path;

						// See if the path represents a property path in the model
						var defaultFormat = null;
						try {
							// Detect property path followed by ".meta..."
							propertyPath = propertyPath.replace(metaPathParser, "$1");
							var isMetaPath = propertyPath.length > 0 && propertyPath.length < path.length;
							var allowFormat = !isMetaPath;
							if (isMetaPath) {
								propertyPath = propertyPath.substring(0, propertyPath.length - 1);
							}

							// If a property path remains, then attempt to find a default format and paths for the format
							if (propertyPath) {
								var property = Model.property(propertyPath, type);
								if (property) {
									// Only allow formats for a property path that is not followed by ".meta..."
									if (allowFormat) {
										// Determine the default property format
										defaultFormat = property.get_format();
		
										// If the path references one or more entity properties, include paths for the property format. Otherwise, just add the path.
										var lastIndex = formatTemplateParser.lastIndex;
										if (defaultFormat && defaultFormat.constructor === Format && defaultFormat !== this && defaultFormat.getPaths().length > 0)
											this._paths.addRange(defaultFormat.getPaths().map(function(p) { return propertyPath + "." + p; }));
										else
											this._paths.push(propertyPath);
										formatTemplateParser.lastIndex = lastIndex;
									}
									// Formats are not allowed, so just add the path
									else {
										this._paths.push(propertyPath);
									}
								}
							}
						}
						catch (e) { }

						// Create a token for the current match, including the prefix, path and format
						this._tokens.push({
							prefix: template.substring(index, formatTemplateParser.lastIndex - match[0].length).replace(/\u0000/g, '\\').replace(/\u0001/g, '[').replace(/\u0002/g, ']'),
							path: path,
							format: match[3] ? match[3].replace(/\u0000/g, '\\').replace(/\u0001/g, '[').replace(/\u0002/g, ']') : defaultFormat
						});

						// Track the last index and find the next match
						index = formatTemplateParser.lastIndex;
						match = formatTemplateParser.exec(template);
					}

					// Capture any trailing literal text as a token without a path
					if (index < template.length) {
						this._tokens.push({
							prefix: template.substring(index).replace(/\u0000/g, '\\').replace(/\u0001/g, '[').replace(/\u0002/g, ']')
						});
					}
				}
			},

			convert: function convert(obj) {
				if (obj === null || obj === undefined) {
					return "";
				}

				// Ensure the format has been compiled
				this._compile();

				var result = "";
				for (var index = 0; index < this._tokens.length; index++) {
					var token = this._tokens[index];
					if (token.prefix)
						result = result + token.prefix;
					if (token.path) {
						var value = evalPath(obj, token.path);
						if (value === undefined || value === null)
							value = "";
						else if (token.format) {
							if (token.format.constructor === String) {
								token.format = getFormat(value.constructor, token.format);
							}
							value = token.format.convert(value);
						}
						result = result + value;
					}
				}
				return result;
			}
		});
	};

	Format.mixin({
		getPaths: function () {
			if (this._compile)
				this._compile();
			return this._paths || [];
		},
		convert: function (val) {
			if (val === undefined) {
				return this._undefinedString;
			}

			if (val === null) {
				return this._nullString;
			}

			if (val instanceof FormatError) {
				return val.get_invalidValue();
			}

			if (!this._convert) {
				return val;
			}

			return this._convert(val);
		},
		convertBack: function (val) {
			if (val === null || val == this._nullString) {
				return null;
			}

			if (val === undefined || val == this._undefinedString) {
				return;
			}

			if (val.constructor == String) {
				val = val.trim();

				if (val.length === 0) {
					return null;
				}
			}

			if (!this._convertBack) {
				return val;
			}

			try {
				return this._convertBack(val);
			}
			catch (err) {
				if (err instanceof FormatError) {
					return err;
				}
				else {
					return new FormatError(this._description ?
								"{0} must be formatted as " + this._description :
								"{0} is not properly formatted",
								val);
				}
			}
		},
		toString: function() {
			return this._specifier;
		}
	});

	ExoWeb.Model.Format = Format;

	// #endregion

	// #region ExoWeb.Model.Model
	//////////////////////////////////////////////////

	function Model() {
		this._types = {};
		this._ruleQueue = [];
	}

	Model.mixin(Functor.eventing);

	Model.mixin({
		dispose: function Model$dispose() {
			for (var key in this._types) {
				delete window[key];
			}
		},
		addType: function Model$addType(name, base, origin, format) {
			var type = new Type(this, name, base, origin, format);
			this._types[name] = type;
			return type;
		},
		type: function (name) {
			return this._types[name];
		},
		types: function (filter) {
			var result = [];
			for (var typeName in this._types) {
				var type = this._types[typeName];
				if (!filter || filter(type)) {
					result.push(type);
				}
			}
			return result;
		},
		addBeforeContextReady: function (handler) {
			// Only executes the given handler once, since the event should only fire once
			if (!this._contextReady) {
				this._addEvent("beforeContextReady", handler, null, true);
			}
			else {
				handler();
			}
		},

		// queues a rule to be registered
		registerRule: function Model$registerRule(rule) {
			if(!this._contextReady) {
				this._ruleQueue.push(rule);
			}
			else {
				rule.register();
			}
		},

		// register rules pending registration
		registerRules: function Model$registerRules() {
			var rules = this._ruleQueue;
			this._ruleQueue = [];
			for (var i = 0; i < rules.length; i++) {
				rules[i].register();
			}
		},
		notifyBeforeContextReady: function () {
			this._contextReady = true;
			this.registerRules();
			this._raiseEvent("beforeContextReady", []);
		},
		addAfterPropertySet: function (handler) {
			this._addEvent("afterPropertySet", handler);
		},
		notifyAfterPropertySet: function (obj, property, newVal, oldVal) {
			this._raiseEvent("afterPropertySet", [obj, property, newVal, oldVal]);
		},
		addObjectRegistered: function (func, objectOrFunction, once) {
			this._addEvent("objectRegistered", func, objectOrFunction ? (objectOrFunction instanceof Function ? objectOrFunction : equals(objectOrFunction)) : null, once);
		},
		removeObjectRegistered: function (func) {
			this._removeEvent("objectRegistered", func);
		},
		notifyObjectRegistered: function (obj) {
			this._raiseEvent("objectRegistered", [obj]);
		},
		addObjectUnregistered: function (func) {
			this._addEvent("objectUnregistered", func);
		},
		notifyObjectUnregistered: function (obj) {
			this._raiseEvent("objectUnregistered", [obj]);
		},
		addListChanged: function (func) {
			this._addEvent("listChanged", func);
		},
		notifyListChanged: function (obj, property, changes) {
			this._raiseEvent("listChanged", [obj, property, changes]);
		},
		_ensureNamespace: function Model$_ensureNamespace(name, parentNamespace) {
			var target = parentNamespace;

			if (target.constructor === String) {
				var nsTokens = target.split(".");
				target = window;
				Array.forEach(nsTokens, function (token) {
					target = target[token];

					if (target === undefined) {
						ExoWeb.trace.throwAndLog("model", "Parent namespace \"{0}\" could not be found.", parentNamespace);
					}
				});
			}
			else if (target === undefined || target === null) {
				target = window;
			}

			// create the namespace object if it doesn't exist, otherwise return the existing namespace
			if (!(name in target)) {
				var result = target[name] = {};
				return result;
			}
			else {
				return target[name];
			}
		}
	});

	function ensureType(type, forceLoad, callback) {

		// immediately invoke the callback if no type was specified or the type is loaded
		if (!type || LazyLoader.isLoaded(type)) {
			return callback();
		}

		// force type loading if requested
		if (forceLoad) {
			LazyLoader.load(type, null, callback);
		}

		// otherwise, only continue processing when and if dependent types are loaded
		else {
			$extend(type._fullName, callback);
		}
	};

	Model.property = function Model$property(path, thisType/*, forceLoadTypes, callback, thisPtr*/) {

		// allow path to be either a string or PathTokens instance
		var tokens;
		if (path.constructor === PathTokens) {
			tokens = path;
			path = tokens.expression;
		}

		// get the optional arguments
		var forceLoadTypes = arguments.length >= 3 && arguments[2] && arguments[2].constructor === Boolean ? arguments[2] : false;
		var callback = arguments[3];
		var thisPtr = arguments[4];

		// immediately return cached property chains
		if (thisType && thisType._chains && thisType._chains[path]) {
			if (callback) {
				callback.call(thisPtr || this, thisType._chains[path]);
				return;
			}
			else {
				return thisType._chains[path];
			}
		}

		// get tokens for the specified path
		var tokens = tokens || new PathTokens(path);

		// get the instance type, if specified
		var type = thisType instanceof Function ? thisType.meta : thisType;

		// create a function to lazily load a property 
		var loadProperty = function (type, name, callback) {
			ensureType(type, forceLoadTypes, function () {
				callback.call(thisPtr || this, type.property(name));
			});
		}

		// handle single property expressions efficiently, as they are neither static nor chains
		if (tokens.steps.length === 1) {
			var name = tokens.steps[0].property;
			if (callback) {
				loadProperty(type, name, callback);
			}
			else {
				return type.property(name);
			}
		}

		// otherwise, first see if the path represents a property chain, and if not, a global property
		else {

			// predetermine the global type name and property name before seeing if the path is an instance path
			var globalTypeName = tokens.steps
				.slice(0, tokens.steps.length - 1)
				.map(function (item) { return item.property; })
				.join(".");

			var globalPropertyName = tokens.steps[tokens.steps.length - 1].property;

			// create a function to see if the path is a global property if instance processing fails
			var processGlobal = function (instanceParseError) {

				// Retrieve the javascript type by name.
				type = Model.getJsType(globalTypeName, true);

				// Handle non-existant or non-loaded type.
				if (!type) {
					if (callback) {
						// Retry when type is loaded
						$extend(globalTypeName, Model.property.prepare(this, Array.prototype.slice.call(arguments)));
						return;
					}
					else {
						ExoWeb.trace.throwAndLog(["model"], instanceParseError);
					}
				}

				// Get the corresponding meta type.
				type = type.meta;

				// return the static property
				if (callback) {
					loadProperty(type, globalPropertyName, callback);
				}
				else {
					return type.property(globalPropertyName);
				}
			}

			if (callback) {
				PropertyChain.create(type, tokens, forceLoadTypes, thisPtr ? callback.bind(thisPtr) : callback, processGlobal);
			}
			else {
				return PropertyChain.create(type, tokens, forceLoadTypes) || processGlobal(null);
			}
		}
	};

	Model.getJsType = function Model$getJsType(name, allowUndefined) {
		/// <summary>
		/// Retrieves the JavaScript constructor function corresponding to the given full type name.
		/// </summary>
		/// <returns type="Object" />

		var obj = window;
		var steps = name.split(".");
		for (var i = 0; i < steps.length; i++) {
			var step = steps[i];
			obj = obj[step];
			if (obj === undefined) {
				if (allowUndefined) {
					return;
				}
				else {
					throw new Error($format("The type \"{0}\" could not be found.  Failed on step \"{1}\".", [name, step]));
				}
			}
		}
		return obj;
	};

	ExoWeb.Model.Model = Model;

	// #endregion

	// #region ExoWeb.Model.Entity
	//////////////////////////////////////////////////

	function Entity() {
	}

	function forEachProperty(obj, callback, thisPtr) {
		for (var prop in obj) {
			callback.call(thisPtr || this, prop, obj[prop]);
		}
	}

	function getProperties(/*[properties] or [propName, propValue] */) {
		if (arguments.length === 2) {
			var properties = {};
			properties[arguments[0]] = arguments[1];
			return properties;
		}
		else {
			return arguments[0];
		}
	}

	Entity.mixin({
		init: function Entity$init(/*[properties] or [propName, propValue] */) {
			forEachProperty(getProperties.apply(this, arguments), function (name, value) {
				var prop = this.meta.type.property(name);

				if (!prop) {
					ExoWeb.trace.throwAndLog("propInit", "Could not find property \"{0}\" on type \"{1}\".", [name, this.meta.type.get_fullName()]);
				}

				// Initialization is not force.  If the propery already has a value it will be ignored.
				Property$_init.call(prop, this, value);
			}, this);
		},
		set: function Entity$set(/*[properties] or [propName, propValue] */) {
			forEachProperty(getProperties.apply(this, arguments), function (name, value) {
				var prop = this.meta.type.property(name);
				if (!prop) {
					ExoWeb.trace.throwAndLog("propInit", "Could not find property \"{0}\" on type \"{1}\".", [name, this.meta.type.get_fullName()]);
				}

				Property$_setter.call(prop, this, value, false);
			}, this);
		},
		get: function Entity$get(propName) {
			return this.meta.type.property(propName).value(this);
		},
		toString: function Entity$toString(format) {
			if (format) {
				format = getFormat(this.constructor, format);
			}
			else {
				format = this.meta.type.get_format();
			}

			if (format)
				return format.convert(this);
			else
				return Entity.toIdString(this);
		}
	});

	// Gets the typed string id suitable for roundtripping via fromIdString
	Entity.toIdString = function Entity$toIdString(obj) {
		return $format("{0}|{1}", [obj.meta.type.get_fullName(), obj.meta.id]);
	};

	// Gets or loads the entity with the specified typed string id
	Entity.fromIdString = function Entity$fromIdString(id) {
		var ids = id.split("|");
		var jstype = ExoWeb.Model.Model.getJsType(ids[0]);
		return jstype.meta.get(ids[1]);
	};

	ExoWeb.Model.Entity = Entity;

	// #endregion

	// #region ExoWeb.Model.Type
	//////////////////////////////////////////////////

	function Type(model, name, baseType, origin) {
		this._fullName = name;
		this._exports;

		// if origin is not provided it is assumed to be client
		this._origin = origin || "client";
		this._originForNewProperties = this._origin;

		this._pool = {};
		this._legacyPool = {};
		this._counter = 0;
		this._properties = {}; 
		this._instanceProperties = {};
		this._staticProperties = {};
		this._pendingInit = [];
		this._pendingInvocation = [];

		// define properties
		Object.defineProperty(this, "model", { value: model });
		Object.defineProperty(this, "rules", { value: [] });

		// generate class and constructor
		var jstype = Model.getJsType(name, true);

		// create namespaces as needed
		var nameTokens = name.split("."),
			token = nameTokens.dequeue(),
			namespaceObj = window;
		while (nameTokens.length > 0) {
			namespaceObj = model._ensureNamespace(token, namespaceObj);
			token = nameTokens.dequeue();
		}

		// the final name to use is the last token
		var finalName = token;
		jstype = generateClass(this);

		this._jstype = jstype;

		// If the namespace already contains a type with this name, append a '$' to the name
		if (!namespaceObj[finalName]) {
			namespaceObj[finalName] = jstype;
		}
		else {
			namespaceObj['$' + finalName] = jstype;
		}

		// setup inheritance
		this.derivedTypes = [];
		var baseJsType;

		if (baseType) {
			baseJsType = baseType._jstype;

			this.baseType = baseType;
			baseType.derivedTypes.push(this);
		
			// inherit all shortcut properties that have aleady been defined
			inheritBaseTypePropShortcuts(jstype, baseType);
		}
		else {
			baseJsType = Entity;
			this.baseType = null;
		}

		disableConstruction = true;
		this._jstype.prototype = new baseJsType();
		disableConstruction = false;

		this._jstype.prototype.constructor = this._jstype;

		// helpers
		jstype.meta = this;
	}

	// copy shortcut properties from a base meta type (recursively) to a target jstype
	function inheritBaseTypePropShortcuts(jstype, baseType) {
		for (var propName in baseType._properties) {
			jstype["$" + propName] = baseType._properties[propName];
		}

		// recursively add base type properties
		if (baseType.baseType) {
			inheritBaseTypePropShortcuts(jstype, baseType.baseType);
		}
	}

	var disableConstruction = false;

	var validateId = function Type$validateId(type, id) {
		if (id === null || id === undefined) {
			ExoWeb.trace.throwAndLog("model",
				"Id cannot be {0} (entity = {1}).",
				[id === null ? "null" : "undefined", type.get_fullName()]
			);
		}
		else if (id.constructor !== String) {
			ExoWeb.trace.throwAndLog("model",
				"Id must be a string:  encountered id {0} of type \"{1}\" (entity = {2}).",
				[id.toString(), ExoWeb.parseFunctionName(id.constructor), type.get_fullName()]
			);
		}
		else if (id === "") {
			ExoWeb.trace.throwAndLog("model",
				"Id cannot be a blank string (entity = {0}).",
				[type.get_fullName()]
			);
		}
	};

	function generateClass(type) {
		function construct(idOrProps, props) {
			if (!disableConstruction) {
				if (idOrProps && idOrProps.constructor === String) {
					var id = idOrProps;
					var obj = type.get(id);
					if (obj) {
						if (props) {
							obj.init(props);
						}
						return obj;
					}

					type.register(this, id);

					if (props) {
						this.init(props);
					}
				}
				else {
					type.register(this);

					// set properties passed into constructor
					if (idOrProps) {
						this.set(idOrProps);
					}

					// Raise init events if registered.
					for (var t = type; t; t = t.baseType) {
						var handler = t._getEventHandler("initNew");
						if (handler)
							handler(this, {});
					}
				}
			}
		}

		return construct;
	}

	var newIdPrefix = "+c";

	Type.getNewIdPrefix = function getNewIdPrefix() {
		if (arguments.length > 0) throw new Error("The method getNewIdPrefix does not accept arguments");
		return newIdPrefix.substring(1);
	};

	Type.setNewIdPrefix = function setNewIdPrefix(prefix) {
		if (prefix === null || prefix === undefined) throw new Error("The new id prefix argument is required");
		if (typeof(prefix) !== "string") throw new TypeError("The new id prefix must be a string, found " + prefix.toString());
		if (prefix.length === 0) throw new Error("The new id prefix cannot be empty string");
		newIdPrefix = "+" + prefix;
	};

	Type.prototype = {
		// gets and optionally sets the pending initialization status for a static property on the type
		pendingInvocation: function Type$pendingInvocation(rule, value) {
			var indexOfRule = this._pendingInvocation.indexOf(rule);
			if (arguments.length > 1) {
				if (value && indexOfRule < 0) {
					this._pendingInvocation.push(rule);
				}
				else if (!value && indexOfRule >= 0) {
					this._pendingInvocation.splice(indexOfRule, 1);
				}
			}
			return indexOfRule >= 0;
		},

		addInitNew: function Type$addInitNew(handler, obj, once) {
			this._addEvent("initNew", handler, obj ? equals(obj) : null, once);
			return this;
		},

		// gets and optionally sets the pending initialization status for a static property on the type
		pendingInit: function Type$pendingInit(prop, value) {
			var result = this[prop._fieldName] === undefined || this._pendingInit[prop.get_name()] === true;
			if (arguments.length > 1) {
				if (value) {
					this._pendingInit[prop.get_name()] = true;
				}
				else {
					delete this._pendingInit[prop.get_name()];
				}
			}
			return result;
		},
		addInitExisting: function Type$addInitExisting(handler, obj, once) {
			this._addEvent("initExisting", handler, obj ? equals(obj) : null, once);
			return this;
		},
		newId: function Type$newId() {
			// Get the next id for this type's heirarchy.
			for (var nextId, type = this; type; type = type.baseType) {
				nextId = Math.max(nextId || 0, type._counter);
			}

			// Update the counter for each type in the heirarchy.
			for (var type = this; type; type = type.baseType) {
				type._counter = nextId + 1;
			}

			// Return the new id.
			return newIdPrefix + nextId;
		},
		register: function Type$register(obj, id) {
			// register is called with single argument from default constructor
			if (arguments.length === 2) {
				validateId(this, id);
			}

			obj.meta = new ObjectMeta(this, obj);

			if (!id) {
				id = this.newId();
				obj.meta.isNew = true;
			}

			var key = id.toLowerCase();

			obj.meta.id = id;
			Observer.makeObservable(obj);

			for (var t = this; t; t = t.baseType) {
				if (t._pool.hasOwnProperty(key)) {
					ExoWeb.trace.throwAndLog("model", "Object \"{0}|{1}\" has already been registered.", [this.get_fullName(), id]);
				}

				t._pool[key] = obj;
				if (t._known) {
					t._known.add(obj);
				}
			}

			this.model.notifyObjectRegistered(obj);
		},
		changeObjectId: function Type$changeObjectId(oldId, newId) {
			validateId(this, oldId);
			validateId(this, newId);

			var oldKey = oldId.toLowerCase();
			var newKey = newId.toLowerCase();

			var obj = this._pool[oldKey];

			if (obj) {
				obj.meta.legacyId = oldId;

				for (var t = this; t; t = t.baseType) {
					t._pool[newKey] = obj;

					delete t._pool[oldKey];

					t._legacyPool[oldKey] = obj;
				}

				obj.meta.id = newId;

				return obj;
			}
			else {
				ExoWeb.trace.logWarning("model",
					"Attempting to change id: Instance of type \"{0}\" with id = \"{1}\" could not be found.",
					[this.get_fullName(), oldId]
				);
			}
		},
		unregister: function Type$unregister(obj) {
			for (var t = this; t; t = t.baseType) {
				delete t._pool[obj.meta.id.toLowerCase()];

				if (obj.meta.legacyId) {
					delete t._legacyPool[obj.meta.legacyId.toLowerCase()];
				}

				if (t._known) {
					t._known.remove(obj);
				}
			}

			this.model.notifyObjectUnregistered(obj);
		},
		get: function Type$get(id) {
			validateId(this, id);

			var key = id.toLowerCase();
			return this._pool[key] || this._legacyPool[key];
		},
		// Gets an array of all objects of this type that have been registered.
		// The returned array is observable and collection changed events will be raised
		// when new objects are registered or unregistered.
		// The array is in no particular order so if you need to sort it, make a copy or use $transform.
		known: function Type$known() {
			var list = this._known;
			if (!list) {
				list = this._known = [];

				for (var id in this._pool) {
					list.push(this._pool[id]);
				}

				Observer.makeObservable(list);
			}

			return list;
		},
		addPropertyAdded: function (handler) {
			this._addEvent("propertyAdded", handler);
		},
		addRule: function Type$addRule(def) {
			return new Rule(this, def);
		},
		addProperty: function Type$addProperty(def) {
			var format = def.format;
			if (format && format.constructor === String) {
				format = getFormat(def.type, format);
			}

			var prop = new Property(this, def.name, def.type, def.label, format, def.isList, def.isStatic, def.isPersisted, def.isCalculated, def.index);

			this._properties[def.name] = prop;
			(def.isStatic ? this._staticProperties : this._instanceProperties)[def.name] = prop;

			// modify jstype to include functionality based on the type definition
			function genPropertyShortcut(mtype, overwrite) {
				var shortcutName = "$" + def.name;
				if (!(shortcutName in mtype._jstype) || overwrite) {
					mtype._jstype[shortcutName] = prop;
				}

				mtype.derivedTypes.forEach(function (t) {
					genPropertyShortcut(t, false);
				});
			}
			genPropertyShortcut(this, true);

			if (prop.get_isStatic()) {
				// for static properties add member to javascript type
				this._jstype["get_" + def.name] = this._makeGetter(prop, Property$_getter.bind(prop), true);
			}
			else {
				// for instance properties add member to all instances of this javascript type
				this._jstype.prototype["get_" + def.name] = this._makeGetter(prop, Property$_getter.bind(prop), true);
			}

			if (!prop.get_isList()) {
				if (prop.get_isStatic()) {
					this._jstype["set_" + def.name] = this._makeSetter(prop);
				}
				else {
					this._jstype.prototype["set_" + def.name] = this._makeSetter(prop);
				}
			}

			this._raiseEvent("propertyAdded", [this, { property: prop}]);

			return prop;
		},
		addMethod: function Type$addMethod(def) {
			var methodName = this.get_fullName() + "." + def.name;
			var method = function () {
				//signature: p1, p2, p#, paths, onSuccess, onFail

				// Detect the optional success and failure callback delegates
				var onSuccess;
				var onFail;
				var paths = null;

				if (arguments.length > 1) {
					onSuccess = arguments[arguments.length - 2];
					if (onSuccess instanceof Function) {
						onFail = arguments[arguments.length - 1];
					}
					else {
						onSuccess = arguments[arguments.length - 1];
					}
				}
				else if (arguments.length > 0)
					onSuccess = arguments[arguments.length - 1];

				if (!(onSuccess instanceof Function))
					onSuccess = undefined;

				var onSuccessFn = function (result) {
					if (onSuccess !== undefined) {
						onSuccess(result.event);
					}
				};

				var argCount = arguments.length - (onSuccess === undefined ? 0 : 1) - (onFail === undefined ? 0 : 1);
				var firstArgCouldBeParameterSet = argCount > 0 && arguments[0] instanceof Object && !(def.parameters.length === 0 || arguments[0][def.parameters[0]] === undefined);
				var instance = this instanceof Entity ? this : null;

				if (argCount >= 1 && argCount <= 2 && arguments[0] instanceof Object &&
						((argCount == 1 && (def.parameters.length != 1 || firstArgCouldBeParameterSet)) ||
						((argCount == 2 && (def.parameters.length != 2 || (firstArgCouldBeParameterSet && arguments[1] instanceof Array)))))) {

					// Invoke the server event
					context.server.raiseServerEvent(methodName, instance, arguments[0], false, onSuccessFn, onFail, argCount == 2 ? arguments[1] : null);
				}

				// Otherwise, assume that the parameters were all passed in sequential order
				else {
					// Throw an error if the incorrect number of arguments were passed to the method
					if (def.parameters.length == argCount - 1 && arguments[argCount - 1] instanceof Array)
						paths = arguments[argCount - 1];
					else if (def.parameters.length != argCount)
						ExoWeb.trace.throwAndLog("type", "Invalid number of arguments passed to \"{0}.{1}\" method.", [this._fullName, def.name]);

					if (def.isStatic && paths)
						ExoWeb.trace.throwAndLog("type", "Cannot include paths when invoking a static method - \"{0}.{1}\".", [this.meta._fullName, def.name]);

					// Construct the arguments to pass
					var args = {};
					for (var parameter in def.parameters) {
						if (def.parameters.hasOwnProperty(parameter)) {
							args[def.parameters[parameter]] = arguments[parameter];
						}
					}

					// Invoke the server event
					context.server.raiseServerEvent(methodName, instance, args, false, onSuccessFn, onFail, paths);
				}
			};

			// Assign the method to the type for static methods, otherwise assign it to the prototype for instance methods
			if (def.isStatic) {
				this._jstype[def.name] = method;
			}
			else {
				this._jstype.prototype[def.name] = method;
			}

		},
		_makeGetter: function Type$_makeGetter(property, getter, skipTypeCheck) {
			return function () {
				// ensure the property is initialized
				var result = getter.call(property, this, skipTypeCheck);

				// ensure the property is initialized
				if (result === undefined || (property.get_isList() && !LazyLoader.isLoaded(result))) {
					ExoWeb.trace.throwAndLog(["model", "entity"], "Property {0}.{1} is not initialized.  Make sure instances are loaded before accessing property values.", [
						property._containingType.get_fullName(),
						property.get_name()
					]);
				}

				// return the result
				return result;
			};
		},
		_makeSetter: function Type$_makeSetter(prop) {
			var setter = function (val) {
				Property$_setter.call(prop, this, val, true);
			};

			setter.__notifies = true;

			return setter;
		},
		get_format: function Type$get_format() {
			return this._format ? this._format : (this.baseType ? this.baseType.get_format() : undefined);
		},
		set_format: function Type$set_format(value) {
			if (value && value.constructor == String)
				value = getFormat(this.get_jstype(), value);
			this._format = value;
		},
		get_fullName: function Type$get_fullName() {
			return this._fullName;
		},
		get_jstype: function Type$get_jstype() {
			return this._jstype;
		},
		get_properties: function Type$get_properties() {
			return ExoWeb.objectToArray(this._properties);
		},
		get_allproperties: function Type$get_allproperties() {
			var temp = ExoWeb.objectToArray(this._properties);

			//go up the base types until there are no more
			var tempObj = this;
			while (tempObj.baseType) {
				tempObj = tempObj.baseType;
				temp = tempObj.get_properties().concat(temp);
			}

			return temp;
		},
		get_baseproperties: function Type$get_baseproperties() {
			var temp = new Array();

			//go up the base types until there are no more
			var tempObj = this;
			var alreadyBase = true;
			while (tempObj.baseType) {
				tempObj = tempObj.baseType;
				temp = tempObj.get_properties().concat(temp);
				alreadyBase = false;
			}

			if (alreadyBase)
				temp = tempObj.get_properties();

			return temp;
		},
		get_staticProperties: function Type$get_staticProperties() {
			return this._staticProperties;
		},
		get_instanceProperties: function Type$get_instanceProperties() {
			return this._instanceProperties;
		},
		property: function Type$property(name) {
			var prop;
			for (var t = this; t && !prop; t = t.baseType) {
				prop = t._properties[name];

				if (prop) {
					return prop;
				}
			}
			return null;
		},
		conditionIf: function (options) {
			new ExoWeb.Model.Rule.condition(this, options);
			return this;
		},
		set_originForNewProperties: function Type$set_originForNewProperties(value) {
			this._originForNewProperties = value;
		},
		get_originForNewProperties: function Type$get_originForNewProperties() {
			return this._originForNewProperties;
		},
		set_origin: function Type$set_origin(value) {
			this._origin = value;
		},
		get_origin: function Type$get_origin() {
			return this._origin;
		},
		compileExpression: function Type$compile(expression) {

			// use exports if required
			if (this._exports) {
				expression = "return function() { return " + expression + "; }";
				var args = this._exports.names.concat([expression]);
				var compile = Function.apply(null, args);
				return compile.apply(null, this._exports.implementations);
			}

			// otherwise, just create the function based on the expression
			else {
				return new Function("return " + expression + ";");
			}
		},
		set_exports: function Type$set_exports(exports) {
			var names = [];
			var script = "return ["
			for (var name in exports) {
				names.push(name);
				script += exports[name] + ",";
			}
			if (script.length > 8) {
				script = script.slice(0, -1) + "];";
				this._exports = { names: names, implementations: new Function(script)() };
			}
		},
		eachBaseType: function Type$eachBaseType(callback, thisPtr) {
			for (var baseType = this.baseType; !!baseType; baseType = baseType.baseType) {
				if (callback.call(thisPtr || this, baseType) === false) {
					return;
				}
			}
		},
		isSubclassOf: function Type$isSubclassOf(mtype) {
			var result = false;

			this.eachBaseType(function (baseType) {
				if (baseType === mtype) {
					result = true;
					return false;
				}
			});

			return result;
		},
		toString: function Type$toString() {
			return this.get_fullName();
		}
	};

	Type.mixin(Functor.eventing);
	ExoWeb.Model.Type = Type;

	// #endregion

	// #region ExoWeb.Model.Property
	//////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////////////
	/// <remarks>
	/// If the interface for this class is changed it should also be changed in
	/// PropertyChain, since PropertyChain acts as an aggregation of properties 
	/// that can be treated as a single property.
	/// </remarks>
	///////////////////////////////////////////////////////////////////////////////
	function Property(containingType, name, jstype, label, format, isList, isStatic, isPersisted, isCalculated, index) {
		this._containingType = containingType;
		this._name = name;
		this._fieldName = "_" + name;
		this._jstype = jstype;
		this._label = label || makeHumanReadable(name);
		this._format = format;
		this._isList = isList === true;
		this._isStatic = isStatic === true;
		this._isPersisted = isPersisted === true;
		this._isCalculated = isCalculated === true;
		this._index = index;
		this._rules = [];
		this._defaultValue = 
			isList ? [] :
			jstype === Boolean ? false :
			jstype === Number ? 0 :
			null;

		if (containingType.get_originForNewProperties()) {
			this._origin = containingType.get_originForNewProperties();
		}

		if (this._origin === "client" && this._isPersisted) {
			ExoWeb.trace.logWarning("model",
				"Client-origin properties should not be marked as persisted: Type = {0}, Name = {1}",
				containingType.get_fullName(),
				name);
		}
	}

	// updates the property and message or conditionType options for property rules
	function preparePropertyRuleOptions(property, options, error) {
		options.property = property;
		if (error && error.constructor === String) {
			options.message = error;
		}
		else if (error instanceof ConditionType) {
			options.conditionType = error;
		}
		return options;
	}

	// updates the property and message or conditionType options for property rules
	function hasPropertyChangedSubscribers(property, obj) {
		var changedEvent = property._getEventHandler("changed");
		return changedEvent && !changedEvent.isEmpty([obj]);
	}

	// registers a rule with a specific property
	function registerPropertyRule(property, rule) {
		property._rules.push(rule);

		// Raise events if registered.
		var ruleRegisteredEvent = property._getEventHandler("ruleRegistered");
		if (ruleRegisteredEvent && !ruleRegisteredEvent.isEmpty()) {
			ruleRegisteredEvent(rule, { property: property });
		}
	}

	function Property$_init(obj, val, force) {
		var target = (this._isStatic ? this._containingType.get_jstype() : obj);
		var curVal = target[this._fieldName];

		if (curVal !== undefined && !(force === undefined || force)) {
			return;
		}

		target[this._fieldName] = val;

		if (val instanceof Array) {
			var _this = this;
			Observer.makeObservable(val);
			Observer.addCollectionChanged(val, function Property$collectionChanged(sender, args) {
				var changes = args.get_changes();

				// Don't raise the change event unless there is actually a change to the collection
				if (changes && changes.some(function(change) { return (change.newItems && change.newItems.length > 0) || (change.oldItems && change.oldItems.length > 0); })) {
					// NOTE: property change should be broadcast before rules are run so that if 
					// any rule causes a roundtrip to the server these changes will be available
					_this._containingType.model.notifyListChanged(target, _this, changes);

					// NOTE: oldValue is not currently implemented for lists
					_this._raiseEvent("changed", [target, { property: _this, newValue: val, oldValue: undefined, changes: changes, collectionChanged: true}]);

					Observer.raisePropertyChanged(target, _this._name);
				}
			});
		}

		Observer.raisePropertyChanged(target, this._name);

		// Return the property to support method chaining
		return this;
	}

	function Property$_ensureInited(obj) {
		// Determine if the property has been initialized with a value
		// and initialize the property if necessary
		if (!obj.hasOwnProperty(this._fieldName)) {

			// Initialize to the defined default value
			Property$_init.call(this, obj, this.get_defaultValue());

			// Mark the property as pending initialization
			obj.meta.pendingInit(this, true);
		}
	}

	function Property$_getter(obj) {
		// Ensure the entity is loaded before accessing property values
		if (LazyLoader.isLoaded(obj)) {
			// Ensure that the property has an initial (possibly default) value
			Property$_ensureInited.call(this, obj);

			// Raise get events
			// NOTE: get events may result in a change, so the value cannot be cached
			var getEvent = this._getEventHandler("get");
			if (getEvent && !getEvent.isEmpty()) {
				getEvent(obj, { property: this, value: obj[this._fieldName] });
			}

			// Return the property value
			return obj[this._fieldName];
		}
	}

	function Property$_setter(obj, val, skipTypeCheck, additionalArgs) {
		// Ensure the entity is loaded before setting property values
		if (!LazyLoader.isLoaded(obj)) {
			throw new ExoWeb.trace.logError(["model", "entity"], "Cannot set property {0}={1} for ghosted instance {2}({3}).", this._name, val === undefined ? "<undefined>" : val, obj.meta.type.get_fullName(), obj.meta.id);
		}

		// Ensure that the property has an initial (possibly default) value
		Property$_ensureInited.call(this, obj);

		if (!this.canSetValue(obj, val)) {
			throw new ExoWeb.trace.logError(["model", "entity"], "Cannot set {0}={1} for instance {2}({3}). A value of type {4} was expected.", this._name, val === undefined ? "<undefined>" : val, obj.meta.type.get_fullName(), obj.meta.id, this._jstype && this._jstype.meta ? this._jstype.meta.get_fullName() : parseFunctionName(this._jstype));
		}

		var old = obj[this._fieldName];

		// compare values so that this check is accurate for primitives
		var oldValue = (old === undefined || old === null) ? old : old.valueOf();
		var newValue = (val === undefined || val === null) ? val : val.valueOf();

		// Do nothing if the new value is the same as the old value. Account for NaN numbers, which are
		// not equivalent (even to themselves). Although isNaN returns true for non-Number values, we won't
		// get this far for Number properties unless the value is actually of type Number (a number or NaN).
		if (oldValue !== newValue && !(this._jstype === Number && isNaN(oldValue) && isNaN(newValue))) {
			// Set the backing field value
			obj[this._fieldName] = val;

			// NOTE: property change should be broadcast before rules are run so that if 
			// any rule causes a roundtrip to the server these changes will be available
			this._containingType.model.notifyAfterPropertySet(obj, this, val, old);

			var changedEvent = this._getEventHandler("changed");
			if (changedEvent && !changedEvent.isEmpty()) {
				// Create the event argument object
				var args = { property: this, newValue: val, oldValue: old };

				// Assign custom event argument values
				if (additionalArgs) {
					for (var p in additionalArgs) {
						if (additionalArgs.hasOwnProperty(p)) {
							args[p] = additionalArgs[p];
						}
					}
				}

				changedEvent(obj, args);
			}

			Observer.raisePropertyChanged(obj, this._name);
		}
	}

	Property.mixin({

		defaultValue: function Property$defaultValue(value) {
			this._defaultValue = value;
			return this;
		},

		equals: function Property$equals(prop) {
			if (prop !== undefined && prop !== null) {
				if (prop instanceof Property) {
					return this === prop;
				}
				else if (prop instanceof PropertyChain) {
					var props = prop.all();
					return props.length === 1 && this.equals(props[0]);
				}
			}
		},

		rule: function (type) {
			if (!type || !(type instanceof Function)) {
				ExoWeb.trace.throwAndLog("rule", "{0} is not a valid rule type.", [type ? type : (type === undefined ? "undefined" : "null")]);
			}

			return first(this._rules, function (rule) {
				if (rule instanceof type) {
					return true;
				}
			});
		},
		rules: function (filter) {
			return filter && filter instanceof Function ? this._rules.filter(filter) : this._rules.slice();
		},
		addRuleRegistered: function Property$addRuleRegistered(handler, obj, once) {
			this._addEvent("ruleRegistered", handler, obj ? equals(obj) : null, once);
			return this;
		},
		removeRuleRegistered: function Property$removeRuleRegistered(handler, obj, once) {
			this._removeEvent("ruleRegistered", handler);
			return this;
		},

		toString: function Property$toString() {
			if (this._isStatic) {
				return this.get_path();
			}
			else {
				return $format("this<{0}>.{1}", [this.get_containingType(), this.get_name()]);
			}
		},

		get_containingType: function Property$get_containingType() {
			return this._containingType;
		},
		isDefinedBy: function Property$isDefinedBy(mtype) {
			return this._containingType === mtype || mtype.isSubclassOf(this._containingType);
		},

		get_jstype: function Property$get_jstype() {
			return this._jstype;
		},

		get_index: function Property$get_index() {
			return this._index;
		},

		get_format: function Property$get_format() {
			if (!this._format) {
				if (this._jstype.meta instanceof ExoWeb.Model.Type)
					this._format = this._jstype.meta.get_format(); // Default to type-level formats for entity types
				else
					this._format = getFormat(this._jstype, "G"); // Default to general format for non-entity type
			}
			return this._format;
		},
		set_format: function Property$set_format(value) {
			this._format = getFormat(this._jstype, value);
		},
		format: function (val) {
			return this.get_format() ? this.get_format().convert(val) : val;
		},

		get_defaultValue: function Property$get_defaultValue() {
			// clone array and date defaults since they are mutable javascript types
			return this._defaultValue instanceof Array ? this._defaultValue.slice() :
				this._defaultValue instanceof Date ? new Date(+this._defaultValue) :
				this._defaultValue instanceof TimeSpan ? new TimeSpan(this._defaultValue.totalMilliseconds) :
				this._defaultValue;
		},

		get_origin: function Property$get_origin() {
			return this._origin ? this._origin : this._containingType.get_origin();
		},

		get_isEntityType: function Property$get_isEntityType() {
			if (!this.get_jstype().meta) {
				return false;
			}
			return !this._isList;
		},

		get_isEntityListType: function Property$get_isEntityListType() {
			if (!this.get_jstype().meta) {
				return false;
			}
			return this._isList;
		},

		get_isValueType: function Property$get_isValueType() {
			return !this.get_jstype().meta;
		},

		get_isList: function Property$get_isList() {
			return this._isList;
		},

		get_isStatic: function Property$get_isStatic() {
			return this._isStatic;
		},

		get_isPersisted: function Property$get_isPersisted() {
			return this._isPersisted;
		},

		get_isCalculated: function Property$get_isCalculated() {
			return this._isCalculated;
		},

		get_label: function Property$get_label() {
			return this._label;
		},

		get_name: function Property$get_name() {
			return this._name;
		},

		get_path: function Property$get_path() {
			return this._isStatic ? (this._containingType.get_fullName() + "." + this._name) : this._name;
		},

		canSetValue: function Property$canSetValue(obj, val) {
			// NOTE: only allow values of the correct data type to be set in the model

			if (val === undefined) {
				ExoWeb.trace.logWarning("model", "You should not set property values to undefined, use null instead: property = {0}.", this._name);
				return true;
			}

			if (val === null) {
				return true;
			}

			if (val.constructor) {
				// for entities check base types as well
				if (val.constructor.meta) {
					for (var valType = val.constructor.meta; valType; valType = valType.baseType) {
						if (valType._jstype === this._jstype) {
							return true;
						}
					}

					return false;
				}
				else {
					return val.constructor === this._jstype;
				}
			}
			else {
				var valObjectType;

				switch (typeof (val)) {
					case "string": valObjectType = String; break;
					case "number": valObjectType = Number; break;
					case "boolean": valObjectType = Boolean; break;
				}

				return valObjectType === this._jstype;
			}
		},

		value: function Property$value(obj, val, args) {
			var target = (this._isStatic ? this._containingType.get_jstype() : obj);

			if (target === undefined || target === null) {
				ExoWeb.trace.throwAndLog(["model"],
					"Cannot {0} value for {1}static property \"{2}\" on type \"{3}\": target is null or undefined.",
					[(arguments.length > 1 ? "set" : "get"), (this._isStatic ? "" : "non-"), this.get_path(), this._containingType.get_fullName()]);
			}

			if (arguments.length > 1) {
				Property$_setter.call(this, target, val, false, args);
			}
			else {
				return Property$_getter.call(this, target);
			}
		},

		isInited: function Property$isInited(obj) {
			var target = (this._isStatic ? this._containingType.get_jstype() : obj);
			if (!target.hasOwnProperty(this._fieldName)) {
				// If the backing field has not been created, then property is not initialized
				return false;
			}
			if (this._isList) {
				var value = target[this._fieldName];
				if (!LazyLoader.isLoaded(value)) {
					// If the list is not-loaded, then the property is not initialized
					return false;
				}
			}
			return true;
		},

		// starts listening for get events on the property. Use obj argument to
		// optionally filter the events to a specific object
		addGet: function Property$addGet(handler, obj, once) {
			this._addEvent("get", handler, obj ? equals(obj) : null, once);

			// Return the property to support method chaining
			return this;
		},

		// starts listening for change events on the property. Use obj argument to
		// optionally filter the events to a specific object
		addChanged: function Property$addChanged(handler, obj, once) {
			this._addEvent("changed", handler, obj ? equals(obj) : null, once);

			// Return the property to support method chaining
			return this;
		},
		removeChanged: function Property$removeChanged(handler) {
			this._removeEvent("changed", handler);
		},

		firstProperty: function Property$firstProperty() {
			return this;
		},
		lastProperty: function Property$lastProperty() {
			return this;
		},
		properties: function Property$properties() {
			return [this];
		},

		lastTarget: function Property$lastTarget(obj) {
			return obj;
		},

		ifExists: function (path) {
			Model.property(path, this._containingType, true, function (chain) {
				this.calculated({
					basedOn: [path],
					fn: function () {
						return !isNullOrUndefined(chain.value(this));
					}
				});
			}, this);

			return this;
		},

		alias: function (path, eventName) {
			Model.property(path, this._containingType, true, function (chain) {
				this.calculated({
					basedOn: [(eventName ? eventName + " of " : "") + path],
					fn: function () {
						return chain.value(this);
					}
				});
			}, this);

			return this;
		},

		rootedPath: function Property$rootedPath(type) {
			if (this.isDefinedBy(type)) {
				return this._isStatic ? this._containingType.get_fullName() + "." + this._name : this._name;
			}
		},

		label: function (label) {
			this._label = label;
			return this;
		},

		// Adds a rule to the property that will update its value based on a calculation.
		calculated: function (options) {
			options.property = this;
			var definedType = options.rootType ? options.rootType.meta : this._containingType;
			delete options.rootType;

			new CalculatedPropertyRule(definedType, options);
		
			return this;
		},
		required: function (error) {
			var options = preparePropertyRuleOptions(this, {}, error);
			new ExoWeb.Model.Rule.required(this._containingType, options);
			return this;
		},
		allowedValues: function (source, error) {
			var options = preparePropertyRuleOptions(this, { source: source }, error);
			new ExoWeb.Model.Rule.allowedValues(this._containingType, options);
			return this;
		},
		compare: function (operator, source, error) {
			var options = preparePropertyRuleOptions(this, { compareOperator: operator, compareSource: source }, error);
			new ExoWeb.Model.Rule.compare(this._containingType, options);
			return this;
		},
		range: function (min, max, error) {
			var options = preparePropertyRuleOptions(this, { min: min, max: max }, error);
			new ExoWeb.Model.Rule.range(this._containingType, options);
			return this;
		},
		conditionIf: function (options, type) {
			var definedType = options.rootType ? options.rootType.meta : this._containingType;
			delete options.rootType;

			options = preparePropertyRuleOptions(this, options, type);
			new ExoWeb.Model.Rule.validated(definedType, options);
			return this;
		},
		errorIf: function (options, error) {
			return this.conditionIf(options, error);
		},
		warningIf: function (options, warning) {
			return this.conditionIf($.extend(options, { category: ConditionType.Warning }), warning);
		},
		requiredIf: function (source, operator, value, error) {
			if (source.constructor === String) {
				var options = preparePropertyRuleOptions(this, { compareSource: source, compareOperator: operator, compareValue: value }, error);
				new ExoWeb.Model.Rule.requiredIf(this._containingType, options);
			}
			else {
				var definedType = source.rootType ? source.rootType.meta : this._containingType;
				delete source.rootType;
				source = preparePropertyRuleOptions(this, source);

				new ExoWeb.Model.Rule.requiredIf(definedType, source);
			}
			return this;
		},
		stringLength: function (min, max, error) {
			var options = preparePropertyRuleOptions(this, { min: min, max: max }, error);
			new ExoWeb.Model.Rule.stringLength(this._containingType, options);
			return this;
		},
		stringFormat: function (description, expression, reformat, error) {
			var options = preparePropertyRuleOptions(this, { description: description, expression: expression, reformat: reformat }, error);
			new ExoWeb.Model.Rule.stringFormat(this._containingType, options);
			return this;
		},
		listLength: function (options, error) {
			var options = preparePropertyRuleOptions(this, { staticLength: options.staticLength, compareSource: options.compareSource, compareOperator: options.compareOperator }, error);
			new ExoWeb.Model.Rule.listLength(this._containingType, options);
			return this;
		},
		triggersRoundtrip: function (paths) {
			this.addChanged(function (sender, args) {
				sender.meta.type.model.server.roundtrip(sender, paths);
			});
		}
	});
	Property.mixin(Functor.eventing);
	ExoWeb.Model.Property = Property;

	// #endregion

	// #region ExoWeb.Model.PathTokens
	//////////////////////////////////////////////////

	function PathTokens(expression) {
	
		// legacy: remove "this." prefix from instance properties
		if (expression.substr(0, 5) === "this.")
			expression = expression.substr(5);

		this.expression = expression;

		// replace "." in type casts so that they do not interfere with splitting path
		expression = expression.replace(/<[^>]*>/ig, function(e) { return e.replace(/\./ig, function() { return "$_$"; }); });

		if (expression.length > 0) {
			this.steps = expression.split(".").map(function(step) {
				var parsed = step.match(/^([a-z0-9_]+)(<([a-z0-9_$]+)>)?$/i);

				if (!parsed) {
					return null;
				}

				var result = { property: parsed[1] };

				if (parsed[3]) {
					// restore "." in type case expression
					result.cast = parsed[3].replace(/\$_\$/ig, function() { return "."; });
				}

				return result;
			});
		}
		else {
			this.steps = [];
		}
	}

	PathTokens.normalizePaths = function PathTokens$normalizePaths(paths) {
		var result = [];

		if (paths) {
			paths.forEach(function (p) {

				// coerce property and property chains into string paths
				p = p instanceof Property ? p.get_name() :
					p instanceof PropertyChain ? p.get_path() :
					p;

				var stack = [];
				var parent;
				var start = 0;
				var pLen = p.length;

				for (var i = 0; i < pLen; ++i) {
					var c = p.charAt(i);

					if (c === '{' || c === ',' || c === '}') {
						var seg = p.substring(start, i).trim();
						start = i + 1;

						if (c === '{') {
							if (parent) {
								stack.push(parent);
								parent += "." + seg;
							}
							else {
								parent = seg;
							}
						}
						else {   // ',' or '}'
							if (seg.length > 0) {
								result.push(new PathTokens(parent ? parent + "." + seg : seg));
							}

							if (c === '}') {
								parent = (stack.length === 0) ? undefined : stack.pop();
							}
						}
					}
				}

				if (stack.length > 0) {
					ExoWeb.trace.throwAndLog("model", "Unclosed '{' in path: {0}", [p]);
				}

				if (start === 0) {
					result.push(new PathTokens(p.trim()));
				}
			});
		}
		return result;
	};

	PathTokens.mixin({
		buildExpression: function PathTokens$buildExpression() {
			var path = "";
			this.steps.forEach(function(step) {
				path += (path ? "." : "") + step.property + (step.cast ? "<" + step.cast + ">" : "");
			});
			return path;
		},
		toString: function PathTokens$toString() {
			return this.expression;
		}
	});

	ExoWeb.Model.PathTokens = PathTokens;

	// #endregion

	// #region ExoWeb.Model.PropertyChain
	//////////////////////////////////////////////////

	function PropertyChain(rootType, properties, filters) {
		/// <summary>
		/// Encapsulates the logic required to work with a chain of properties and
		/// a root object, allowing interaction with the chain as if it were a 
		/// single property of the root object.
		/// </summary>

		var handlers = null;

		function onStepChanged(priorProp, sender, args) {
			// scan all known objects of this type and raise event for any instance connected
			// to the one that sent the event.
			this._rootType.known().forEach(function(known) {
				if (this.connects(known, sender, priorProp)) {
					// Copy the original arguments so that we don't affect other code
					var newArgs = Object.copy(args);

					// Reset property to be the chain, but store the original property as "triggeredBy"
					newArgs.originalSender = sender;
					newArgs.triggeredBy = newArgs.property;
					newArgs.property = this;

					// Call the handler, passing through the arguments
					this._raiseEvent("changed", [known, newArgs]);
				}
			}, this);
		}

		this._updatePropertyChangeSubscriptions = function() {
			var handler = this._getEventHandler("changed");
			var eventHandlersExist = handler && !handler.isEmpty();
			var subscribedToPropertyChanges = handlers !== null;

			if (!eventHandlersExist && subscribedToPropertyChanges) {
				// If there are no more subscribers then unsubscribe from property-level events
				this._properties.forEach(function(prop, index) {
					var handler = handlers[index];
					prop.removeChanged(handler);
				}, this);
				handlers = null;
			}
			else if (eventHandlersExist && !subscribedToPropertyChanges) {
				// If there are subscribers and we have not subscribed to property-level events, then do so
				handlers = [];
				this._properties.forEach(function(prop, index) {
					var priorProp = (index === 0) ? undefined : this._properties[index - 1];
					var handler = onStepChanged.bind(this).prependArguments(priorProp);
					handlers.push(handler);
					prop.addChanged(handler);
				}, this);
			}
		};

		this._rootType = rootType;
		this._properties = properties;
		this._filters = filters;
	}

	PropertyChain.create = function PropertyChain$create(rootType, pathTokens/*, forceLoadTypes, success, fail*/) {
		/// <summary>
		/// Attempts to synchronously or asynchronously create a property chain for the specified 
		/// root type and path.  Also handles caching of property chains at the type level.
		/// </summary>

		var type = rootType;
		var properties = [];
		var filters = [];

		// initialize optional callback arguments
		var forceLoadTypes = arguments.length >= 3 && arguments[2] && arguments[2].constructor === Boolean ? arguments[2] : false;
		var success = arguments.length >= 4 && arguments[3] && arguments[3] instanceof Function ? arguments[3] : null;
		var fail = arguments.length >= 5 && arguments[4] && arguments[4] instanceof Function ?
			arguments[4] : function (error) { if (success) { ExoWeb.trace.throwAndLog("model", error); } };

		// process each step in the path either synchronously or asynchronously depending on arguments
		var processStep = function PropertyChain$processStep() {

			// get the next step
			var step = pathTokens.steps.dequeue();
			if (!step) {
				fail($format("Syntax error in property path: {0}", [pathTokens.expression]));

				// return null to indicate that the path is not valid
				return null;
			}

			// get the property for the step 
			var prop = type.property(step.property);
			if (!prop) {
				fail($format("Path '{0}' references an unknown property: {1}.{2}.", [pathTokens.expression, type.get_fullName(), step.property]));

				// return null if the property does not exist
				return null;
			}

			// ensure the property is not static because property chains are not valid for static properties
			if (prop.get_isStatic()) {
				fail($format("Path '{0}' references a static property: {1}.{2}.", [pathTokens.expression, type.get_fullName(), step.property]));

				// return null to indicate that the path references a static property
				return null;
			}

			// store the property for the step
			properties.push(prop);

			// handle optional type filters
			if (step.cast) {

				// determine the filter type
				type = Model.getJsType(step.cast, true).meta;
				if (!type) {
					fail($format("Path '{0}' references an invalid type: {1}", [pathTokens.expression, step.cast]));
					return null;
				}

				var jstype = type.get_jstype();
				filters[properties.length] = function (target) {
					return target instanceof jstype;
				};
			}
			else {
				type = prop.get_jstype().meta;
			}

			// process the next step if not at the end of the path
			if (pathTokens.steps.length > 0) {
				return ensureType(type, forceLoadTypes, processStep);
			}

			// otherwise, create and return the new property chain
			else {

				// processing the path is complete, verify that chain is not zero-length
				if (properties.length === 0) {
					fail($format("PropertyChain cannot be zero-length."));
					return null;
				}

				// ensure filter types on the last step are loaded
				return ensureType(filters[properties.length - 1], forceLoadTypes, function () {

					// create and cache the new property chain
					var chain = new PropertyChain(rootType, properties, filters);
					if (!rootType._chains) {
						rootType._chains = {};
					}
					rootType._chains[pathTokens.expression] = chain;

					// if asynchronous processing was allowed, invoke the success callback
					if (success) {
						success(chain);
					}

					// return the new property chain
					return chain;
				});
			}
		};

		// begin processing steps in the path
		return ensureType(type, forceLoadTypes, processStep);
	}

	PropertyChain.mixin(Functor.eventing);

	PropertyChain.mixin({
		equals: function PropertyChain$equals(prop) {
			if (prop !== undefined && prop !== null) {
				if (prop instanceof Property) {
					return prop.equals(this);
				}
				else if (prop instanceof PropertyChain) {
					if (prop._properties.length !== this._properties.length) {
						return false;
					}

					for (var i = 0; i < this._properties.length; i++) {
						if (!this._properties[i].equals(prop._properties[i])) {
							return false;
						}
					}

					return true;
				}
			}
		},
		all: function PropertyChain$all() {
			return this._properties;
		},
		append: function PropertyChain$append(prop) {
			Array.addRange(this._properties, prop.all());
		},
		each: function PropertyChain$each(obj, callback, thisPtr, propFilter /*, target, p, lastProp*/) {
			/// <summary>
			/// Iterates over all objects along a property chain starting with the root object (obj).  This
			/// is analogous to the Array forEach function.  The callback may return a Boolean value to indicate 
			/// whether or not to continue iterating.
			/// </summary>
			/// <param name="obj" type="ExoWeb.Model.Entity">
			/// The root object to use in iterating over the chain.
			/// </param>
			/// <param name="callback" type="Function">
			/// The function to invoke at each iteration step.  May return a Boolean value to indicate whether 
			/// or not to continue iterating.
			/// </param>
			/// <param name="propFilter" type="ExoWeb.Model.Property" optional="true">
			/// If specified, only iterates over objects that are RETURNED by the property filter.  In other
			/// words, steps that correspond to a value or values of the chain at a specific property step).
			/// For example, if the chain path is "this.PropA.ListPropB", then...
			///     chain.each(target, callback, null, ListPropB);
			/// ...will iterate of the values of the list property only.
			/// </param>

			if (!callback || typeof (callback) != "function") {
				ExoWeb.trace.throwAndLog(["model"], "Invalid Parameter: callback function");
			}

			if (!obj) {
				ExoWeb.trace.throwAndLog(["model"], "Invalid Parameter: source object");
			}

			// invoke callback on obj first
			var target = arguments[4] || obj;
			var lastProp = arguments[6] || null;
			var props = this._properties.slice(arguments[5] || 0);
			for (var p = arguments[5] || 0; p < this._properties.length; p++) {
				var prop = this._properties[p];
				var canSkipRemainingProps = propFilter && lastProp === propFilter;
				var enableCallback = (!propFilter || lastProp === propFilter);

				if (target instanceof Array) {
					// if the target is a list, invoke the callback once per item in the list
					for (var i = 0; i < target.length; ++i) {
						// take into account any any chain filters along the way
						if (!this._filters[p] || this._filters[p](target[i])) {

							if (enableCallback && callback.call(thisPtr || this, target[i], i, target, prop, p, props) === false) {
								return false;
							}

							var targetValue = prop.value(target[i]);
							// continue along the chain for this list item
							if (!canSkipRemainingProps && (!targetValue || this.each(obj, callback, thisPtr, propFilter, targetValue, p + 1, prop) === false)){
								return false;
							}
						}
					}
					// subsequent properties already visited in preceding loop
					return true;
				}
				else {
					// return early if the target is filtered and does not match
					if (this._filters[p] && this._filters[p](target) === false) {
						break;
					}

					// take into account any chain filters along the way
					if (enableCallback && callback.call(thisPtr || this, target, -1, null, prop, p, props) === false) {
						return false;
					}
				}

				// if a property filter is used and was just evaluated, stop early
				if (canSkipRemainingProps) {
					break;
				}

				// move to next property in the chain
				target = target[prop._fieldName];

				// break early if the target is undefined
				if (target === undefined || target === null) {
					break;
				}

				lastProp = prop;
			}

			return true;
		},
		get_path: function PropertyChain$get_path() {
			if (!this._path) {
				this._path = this._getPathFromIndex(0);
			}

			return this._path;
		},
		_getPathFromIndex: function PropertyChain$_getPathFromIndex(startIndex) {
			var steps = [];
			if (this._properties[startIndex].get_isStatic()) {
				steps.push(this._properties[startIndex].get_containingType().get_fullName());
			}

			var previousStepType;
			this._properties.slice(startIndex).forEach(function (p, i) {
				if (i !== 0) {
					if (p.get_containingType() !== previousStepType && p.get_containingType().isSubclassOf(previousStepType)) {
						steps[steps.length - 1] = steps[steps.length - 1] + "<" + p.get_containingType().get_fullName() + ">";
					}
				}
				steps.push(p.get_name());
				previousStepType = p.get_jstype().meta;
			});

			return steps.join(".");
		},
		firstProperty: function PropertyChain$firstProperty() {
			return this._properties[0];
		},
		lastProperty: function PropertyChain$lastProperty() {
			return this._properties[this._properties.length - 1];
		},
		properties: function PropertyChain$properties() {
			return this._properties.slice();
		},
		lastTarget: function PropertyChain$lastTarget(obj) {
			for (var p = 0; p < this._properties.length - 1; p++) {
				var prop = this._properties[p];

				// exit early on null or undefined
				if (obj === undefined || obj === null) {
					return obj;
				}

				obj = prop.value(obj);
			}
			return obj;
		},

		prepend: function PropertyChain$prepend(props) {
			for (var p = props.length - 1; p >= 0; p--) {
				Array.insert(this._properties, 0, props[p]);
			}
		},

		canSetValue: function PropertyChain$canSetValue(obj, value) {
			return this.lastProperty().canSetValue(this.lastTarget(obj), value);
		},

		// Determines if this property chain connects two objects.
		connects: function PropertyChain$connects(fromRoot, toObj, viaProperty) {
			var connected = false;

			// perform simple comparison if no property is defined
			if (!viaProperty) {
				return fromRoot === toObj;
			}

			this.each(fromRoot, function (target) {
				if (target === toObj) {
					connected = true;
					return false;
				}
			}, this, viaProperty);

			return connected;
		},
		rootedPath: function PropertyChain$rootedPath(rootType) {
			for (var i = 0; i < this._properties.length; i++) {
				if (this._properties[i].isDefinedBy(rootType)) {
					var path = this._getPathFromIndex(i);
					return this._properties[i]._isStatic ? this._properties[i].get_containingType().get_fullName() + "." + path : path;
				}
			}
		},
		// starts listening for the get event of the last property in the chain on any known instances. Use obj argument to
		// optionally filter the events to a specific object
		addGet: function PropertyChain$addGet(handler, obj) {
			var chain = this;

			this.lastProperty().addGet(function PropertyChain$_raiseGet(sender, property, value, isInited) {
				handler(sender, chain, value, isInited);
			}, obj);

			// Return the property to support method chaining
			return this;
		},
		removeChanged: function PropertyChain$removeChanged(handler) {
			this._removeEvent("changed", handler);

			this._updatePropertyChangeSubscriptions();
		},
		// starts listening for change events along the property chain on any known instances. Use obj argument to
		// optionally filter the events to a specific object
		addChanged: function PropertyChain$addChanged(handler, obj, once, toleratePartial) {
			var filter = mergeFunctions(

			// Ensure that the chain is inited from the root if toleratePartial is false
				this.isInited.bind(this).spliceArguments(1, 1, !toleratePartial),

			// Only raise for the given root object if specified
				obj ? equals(obj) : null,

			// If multiple filters exist, both must pass
				{andResults: true }

			);

			this._addEvent("changed", handler, filter, once);

			this._updatePropertyChangeSubscriptions();

			// Return the property chain to support method chaining
			return this;
		},
		// Property pass-through methods
		///////////////////////////////////////////////////////////////////////
		get_containingType: function PropertyChain$get_containingType() {
			return this._rootType;
		},
		get_jstype: function PropertyChain$get_jstype() {
			return this.lastProperty().get_jstype();
		},
		get_format: function PropertyChain$get_format() {
			return this.lastProperty().get_format();
		},
		format: function PropertyChain$format(val) {
			return this.lastProperty().format(val);
		},
		get_isList: function PropertyChain$get_isList() {
			return this.lastProperty().get_isList();
		},
		get_isStatic: function PropertyChain$get_isStatic() {
			// TODO
			return this.lastProperty().get_isStatic();
		},
		get_label: function PropertyChain$get_label() {
			return this.lastProperty().get_label();
		},
		get_name: function PropertyChain$get_name() {
			return this.lastProperty().get_name();
		},
		get_isValueType: function PropertyChain$get_isValueType() {
			return this.lastProperty().get_isValueType();
		},
		get_isEntityType: function PropertyChain$get_isEntityType() {
			return this.lastProperty().get_isEntityType();
		},
		get_isEntityListType: function PropertyChain$get_isEntityListType() {
			return this.lastProperty().get_isEntityListType();
		},
		rules: function (filter) {
			return this.lastProperty().rules(filter);
		},
		value: function PropertyChain$value(obj, val, customInfo) {
			var target = this.lastTarget(obj, true);
			var prop = this.lastProperty();

			if (arguments.length > 1) {
				prop.value(target, val, customInfo);
			}
			else {
				return target ? prop.value(target) : target;
			}
		},
		isInited: function PropertyChain$isInited(obj, enforceCompleteness /*, fromIndex, fromProp*/) {
			/// <summary>
			/// Determines if the property chain is initialized, akin to single Property initialization.
			/// </summary>
			var allInited = true, initedProperties = [], fromIndex = arguments[2] || 0, fromProp = arguments[3] || null, expectedProps = this._properties.length - fromIndex;

			this.each(obj, function(target, targetIndex, targetArray, property, propertyIndex, properties) {
				if (targetArray && enforceCompleteness) {
					if (targetArray.every(function(item) { return this.isInited(item, true, propertyIndex, properties[propertyIndex - 1]); }, this)) {
						Array.prototype.push.apply(initedProperties, properties.slice(propertyIndex));
					}
					else {
						allInited = false;
					}

					// Stop iterating at an array value
					return false;
				}
				else {
					if (!targetArray || targetIndex === 0) {
						initedProperties.push(property);
					}
					if (!property.isInited(target)) {
						initedProperties.remove(property);
						allInited = false;

						// Exit immediately since chain is not inited
						return false;
					}
				}
			}, this, null, obj, fromIndex, fromProp);

			return allInited && (!enforceCompleteness || initedProperties.length === expectedProps);
		},
		toString: function PropertyChain$toString() {
			if (this._isStatic) {
				return this.get_path();
			}
			else {
				var path = this._properties.map(function (e) { return e.get_name(); }).join(".");
				return $format("this<{0}>.{1}", [this.get_containingType(), path]);
			}
		}
	});

	ExoWeb.Model.PropertyChain = PropertyChain;

	// #endregion

	// #region ExoWeb.Model.ObjectMeta
	//////////////////////////////////////////////////

	/// <reference path="ConditionTarget.js" />

	function ObjectMeta(type, obj) {
		this._obj = obj;
		this.type = type;
		this._conditions = {};
		this._pendingInit = {};
		this._pendingInvocation = [];
	}

	ObjectMeta.mixin({

		get_entity: function () {
			return this._obj;
		},

		// gets the property or property chain for the specified property path
		property: function ObjectMeta$property(propName, thisOnly) {
			return this.type.property(propName, thisOnly);
		},

		// gets and optionally sets the pending initialization status for a property on the current instance
		pendingInvocation: function ObjectMeta$pendingInvocation(rule, value) {
			var indexOfRule = this._pendingInvocation.indexOf(rule);
			if (arguments.length > 1) {
				if (value && indexOfRule < 0) {
					this._pendingInvocation.push(rule);
				}
				else if (!value && indexOfRule >= 0) {
					this._pendingInvocation.splice(indexOfRule, 1);
				}
			}
			return indexOfRule >= 0;
		},

		// gets and optionally sets the pending initialization status for a property on the current instance
		pendingInit: function ObjectMeta$pendingInit(prop, value) {
			var result = this._obj[prop._fieldName] === undefined || this._pendingInit[prop.get_name()] === true;
			if (arguments.length > 1) {
				if (value) {
					this._pendingInit[prop.get_name()] = true;
				}
				else {
					delete this._pendingInit[prop.get_name()];
				}
			}
			return result;
		},

		// gets the condition target with the specified condition type
		getCondition: function ObjectMeta$getCondition(conditionType) {
			return this._conditions[conditionType.code];
		},

		// stores the condition target for the current instance
		setCondition: function ObjectMeta$setCondition(conditionTarget) {
			if (conditionTarget.condition.type != formatConditionType) {
				this._conditions[conditionTarget.condition.type.code] = conditionTarget;
			}
		},

		// clears the condition for the current instance with the specified condition type
		clearCondition: function ObjectMeta$clearCondition(conditionType) {
			delete this._conditions[conditionType.code];
		},

		// determines if the set of permissions are allowed for the current instance
		isAllowed: function ObjectMeta$isAllowed(/*codes*/) {
			if (arguments.length === 0) {
				return undefined;
			}

			// ensure each condition type is allowed for the current instance
			for (var c = arguments.length - 1; c >= 0; c--) {
				var code = arguments[c];
				var conditionType = ConditionType.get(code);

				// return undefined if the condition type does not exist
				if (conditionType === undefined) {
					return undefined;
				}

				// throw an exception if the condition type is not a permission
				if (!(conditionType instanceof ConditionType.Permission)) {
					ExoWeb.trace.throwAndLog(["conditions"], "Condition type \"{0}\" should be a Permission.", [code]);
				}

				// return false if a condition of the current type exists and is a deny permission or does not exist and is a grant permission
				if (this._conditions[conditionType.code] ? !conditionType.isAllowed : conditionType.isAllowed) {
					return false;
				}
			}

			return true;
		},

		// determines whether the instance and optionally the specified property value is loaded
		isLoaded: function ObjectMeta$isLoaded(prop) {

			// first see if the current entity is loaded
			if (!LazyLoader.isLoaded(this._obj))
				return false;

			// immediately return true if a property name was not specified
			if (!prop)
				return true;

			// coerce property names into property instances
			if (isString(prop))
				prop = this.property(prop);

			// otherwise, get the property value and see if it loaded
			var val = prop.value(this._obj);

			// determine whether the value is loaded
			return !(val === undefined || !LazyLoader.isLoaded(val));
		},

		// get some or all of the condition
		conditions: function ObjectMeta$conditions(criteria) {

			// condition type filter
			if (criteria instanceof ConditionType) {
				var conditionTarget = this._conditions[criteria.code];
				return conditionTarget ? [conditionTarget.condition] : [];
			}

			// property filter
			if (criteria instanceof Property || criteria instanceof PropertyChain) {
				criteria = criteria.lastProperty();
				var result = [];
				for (var type in this._conditions) {
					var conditionTarget = this._conditions[type];
					if (conditionTarget.properties.some(function (p) { return p.equals(criteria); })) {
						result.push(conditionTarget.condition);
					}
				}
				return result;
			}

			// otherwise, just return all conditions
			var result = [];
			for (var type in this._conditions) {
				result.push(this._conditions[type].condition);
			}
			return result;
		},
		destroy: function () {
			this.type.unregister(this._obj);
		},
		// starts listening for change events on the conditions array. Use obj argument to
		// optionally filter the events to a specific condition type by passing either
		// the condition type code or type itself.
		addConditionsChanged: function ObjectMeta$addConditionsChanged(handler, criteria) {
			var filter;

			// condition type filter
			if (criteria instanceof ConditionType) {
				filter = function (sender, args) { return args.conditionTarget.condition.type === criteria; };
			}

			// property filter
			else if (criteria instanceof Property || criteria instanceof PropertyChain) {
				criteria = criteria.lastProperty();
				filter = function (sender, args) { return args.conditionTarget.properties.indexOf(criteria) >= 0; };
			}

			// subscribe to the event
			this._addEvent("conditionsChanged", handler, filter);

			// Return the object meta to support method chaining
			return this;
		},
		removeConditionsChanged: function ObjectMeta$removeConditionsChanged(handler) {
			this._removeEvent("conditionsChanged", handler);
		}
	});

	ObjectMeta.mixin(Functor.eventing);
	ExoWeb.Model.ObjectMeta = ObjectMeta;

	// #endregion

	// #region ExoWeb.Model.RuleInvocationType
	//////////////////////////////////////////////////

	var RuleInvocationType = {

		/// <summary>
		/// Occurs when an existing instance is initialized.
		/// </summary>
		InitExisting: 2,

		/// <summary>
		/// Occurs when a new instance is initialized.
		/// </summary>
		InitNew: 4,

		/// <summary>
		/// Occurs when a property value is retrieved.
		/// </summary>
		PropertyGet: 8,

		/// <summary>
		/// Occurs when a property value is changed.
		/// </summary>
		PropertyChanged: 16
	}


	// #endregion

	// #region ExoWeb.Model.Rule
	//////////////////////////////////////////////////

	/// <reference path="../core/Utilities.js" />
	/// <reference path="../core/EventScope.js" />

	var customRuleIndex = 0;

	function Rule(rootType, options) {
		/// <summary>Creates a rule that executes a delegate when specified model events occur.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			name:				the optional unique name of the type of validation rule
		//			execute:			a function to execute when the rule is triggered
		///			onInit:				true to indicate the rule should run when an instance of the root type is initialized, otherwise false
		///			onInitNew:			true to indicate the rule should run when a new instance of the root type is initialized, otherwise false
		///			onInitExisting:		true to indicate the rule should run when an existing instance of the root type is initialized, otherwise false
		///			onChangeOf:			an array of property paths (strings, Property or PropertyChain instances) that drive when the rule should execute due to property changes
		///			returns:			an array of properties (string name or Property instance) that the rule is responsible to calculating the value of
		/// </param>
		/// <returns type="Rule">The new rule.</returns>

		// exit immediately if called with no arguments
		if (arguments.length === 0) {
			return;
		}

		// ensure a valid root type was provided
		if (!(rootType instanceof ExoWeb.Model.Type)) {
			if (rootType && rootType.meta) {
				rootType = rootType.meta;
			}
			else {
				ExoWeb.trace.throwAndLog("rules", "A value root model type must be specified when constructing rules.");
			}
		}

		// store the initialization options for processing during registration
		if (options) {
			if (options instanceof Function) {
				this._options = {
					name: rootType.get_fullName() + ".Custom." + (++customRuleIndex),
					execute: function (obj) {
						// use the root object as this
						return options.apply(obj, arguments);
					}
				};
			}
			else {
				this._options = options;
				if (!this._options.name) {
					this._options.name = rootType.get_fullName() + ".Custom." + (++customRuleIndex);
				}
			}
		}
		else {
			this._options = {
				name: rootType.get_fullName() + ".Custom." + (++customRuleIndex)
			};
		}
	
		// explicitly override execute if specified
		if (this._options.execute instanceof Function) {
			this.execute = this._options.execute;
		}

		// define properties for the rule
		Object.defineProperty(this, "rootType", { value: rootType });
		Object.defineProperty(this, "name", { value: this._options.name });
		Object.defineProperty(this, "invocationTypes", { value: 0, writable: true });
		Object.defineProperty(this, "predicates", { value: [], writable: true });
		Object.defineProperty(this, "returnValues", { value: [], writable: true });

		// register the rule after loading has completed
		rootType.model.registerRule(this);
	}

	// base rule implementation
	Rule.mixin({

		// indicates that the rule should run only for new instances when initialized
		onInitNew: function () {

			// ensure the rule has not already been registered
			if (!this._options) {
				ExoWeb.trace.logError("rules", "Rules cannot be configured once they have been registered: {0}", [this.name]);
			}

			// configure the rule to run on init new
			this.invocationTypes |= RuleInvocationType.InitNew;
			return this;
		},

		// indicates that the rule should run only for existing instances when initialized
		onInitExisting: function () {

			// ensure the rule has not already been registered
			if (!this._options) {
				ExoWeb.trace.logError("rules", "Rules cannot be configured once they have been registered: {0}", [this.name]);
			}

			// configure the rule to run on init existingh
			this.invocationTypes |= RuleInvocationType.InitExisting;
			return this;
		},

		// indicates that the rule should run for both new and existing instances when initialized
		onInit: function () {

			// ensure the rule has not already been registered
			if (!this._options) {
				ExoWeb.trace.logError("rules", "Rules cannot be configured once they have been registered: {0}", [this.name]);
			}

			// configure the rule to run on both init new and init existing
			this.invocationTypes |= RuleInvocationType.InitNew | RuleInvocationType.InitExisting;
			return this;
		},

		// indicates that the rule should automatically run when one of the specified property paths changes
		// predicates:  an array of property paths (strings, Property or PropertyChain instances) that drive when the rule should execute due to property changes
		onChangeOf: function (predicates) {

			// ensure the rule has not already been registered
			if (!this._options) {
				ExoWeb.trace.logError("rules", "Rules cannot be configured once they have been registered: {0}", [this.name]);
			}

			// allow change of predicates to be specified as a parameter array without []'s
			if (predicates && predicates.constructor === String) {
				predicates = Array.prototype.slice.call(arguments);
			}

			// add to the set of existing change predicates
			this.predicates = this.predicates.length > 0 ? this.predicates.concat(predicates) : predicates;

			// also configure the rule to run on property change unless it has already been configured to run on property get
			if ((this.invocationTypes & RuleInvocationType.PropertyGet) === 0) {
				this.invocationTypes |= RuleInvocationType.PropertyChanged;
			}
			return this;
		},

		// indicates that the rule is responsible for calculating and returning values of one or more properties on the root type
		// properties:	an array of properties (string name or Property instance) that the rule is responsible to calculating the value of
		returns: function (properties) {
			if (!this._options) {
				ExoWeb.trace.logError("rules", "Rules cannot be configured once they have been registered: {0}", [this.name]);
			}
			// allow return properties to be specified as a parameter array without []'s
			if (properties && properties.constructor === String) {
				properties = Array.prototype.slice.call(arguments);
			}
			if (!properties) {
				ExoWeb.trace.throwAndLog("rules", "Rule must specify at least 1 property for returns.");
			}

			// add to the set of existing return value properties
			this.returnValues = this.returnValues.length > 0 ? this.returnValues.concat(properties) : properties;

			// configure the rule to run on property get and not on property change
			this.invocationTypes |= RuleInvocationType.PropertyGet;
			this.invocationTypes &= ~RuleInvocationType.PropertyChanged;
			return this;
		},

		// registers the rule based on the configured invocation types, predicates, and return values
		register: function Rule$register() {

			// track the rule with the root type
			this.rootType.rules.push(this);

			// configure the rule based on any specified options
			if (this._options) {
				if (this._options.onInit)
					this.onInit();
				if (this._options.onInitNew)
					this.onInitNew();
				if (this._options.onInitExisting)
					this.onInitExisting();
				if (this._options.onChangeOf)
					this.onChangeOf(this._options.onChangeOf);
				if (this._options.returns)
					this.returns(this._options.returns);

				// legacy support for basedOn option syntax
				if (this._options.basedOn) {
					this._options.basedOn.forEach(function (input) {
						var parts = input.split(" of ");
						if (parts.length >= 2) {
							if (parts[0].split(",").indexOf("change") >= 0) {
								this.onChangeOf([parts[1]]);
							}
						}
						else {
							this.onChangeOf(input);
						}
					}, this);
				}
			}

			// indicate that the rule should now be considered registered and cannot be reconfigured
			delete this._options;

			// create a function to safely execute the rule
			var execute = function (rule, obj, args) {

				// ensure the rule target is a valid rule root type
				if (!(obj instanceof rule.rootType.get_jstype())) { return; }

				EventScope$perform(function() {
					rule.execute.call(rule, obj, args);
				});
			};

			// create function to perform rule registration once predicates and return values have been prepared
			var register = function () {

				// create a scope variable to reference the current rule when creating event handlers
				var rule = this;

				// register for init new
				if (this.invocationTypes & RuleInvocationType.InitNew) {
					this.rootType.addInitNew(function (sender, args) {
						execute(rule, sender, args);
					});
				}

				// register for init existing
				if (this.invocationTypes & RuleInvocationType.InitExisting) {
					this.rootType.addInitExisting(function (sender, args) {
						execute(rule, sender, args);
					});
				}

				// register for property change
				if (this.invocationTypes & RuleInvocationType.PropertyChanged) {
					this.predicates.forEach(function (predicate) {
						predicate.addChanged(
							function (sender, args) {
								if (!sender.meta.pendingInvocation(rule)) {
									sender.meta.pendingInvocation(rule, true);
									EventScope$onExit(function() {
										sender.meta.pendingInvocation(rule, false);
										execute(rule, sender, args);
									});
								}
							},
							null, // no object filter
							false, // subscribe for all time, not once
							true // tolerate nulls since rule execution logic will handle guard conditions
						);
					});
				}

				// register for property get
				if (this.invocationTypes & RuleInvocationType.PropertyGet && this.returnValues) {

					// register for property get events for each return value to calculate the property when accessed
					this.returnValues.forEach(function (returnValue) {
						returnValue.addGet(function (sender, args) {

							// run the rule to initialize the property if it is pending initialization
							if (sender.meta.pendingInit(returnValue)) {
								sender.meta.pendingInit(returnValue, false);
								execute(rule, sender, args);
							}
						});
					});

					// register for property change events for each predicate to invalidate the property value when inputs change
					this.predicates.forEach(function (predicate) {
						predicate.addChanged(
							function (sender, args) {

								// immediately execute the rule if there are explicit event subscriptions for the property
								if (rule.returnValues.some(function (returnValue) { return hasPropertyChangedSubscribers(returnValue, sender); })) {
									if (!sender.meta.pendingInvocation(rule)) {
										sender.meta.pendingInvocation(rule, true);
										EventScope$onExit(function() {
											sender.meta.pendingInvocation(rule, false);
											execute(rule, sender, args);
										});
									}
								}

								// Otherwise, just mark the property as pending initialization and raise property change for UI subscribers
								else {
									rule.returnValues.forEach(function (returnValue) {
										sender.meta.pendingInit(returnValue, true);
										Observer.raisePropertyChanged(sender, returnValue.get_name());
									});
								}
							},
							null, // no object filter
							false, // subscribe for all time, not once
							true // tolerate nulls since rule execution logic will handle guard conditions
						);
					});
				}

				// allow rule subclasses to perform final initialization when registered
				if (this.onRegister instanceof Function) {
					this.onRegister();
				}
			};

			// resolve return values, which should all be loaded since the root type is now definitely loaded
			if (this.returnValues) {
				this.returnValues.forEach(function (returnValue, i) {
					if (!(returnValue instanceof Property)) {
						this.returnValues[i] = this.rootType.property(returnValue);
					}
				}, this);
			}

			// resolve all predicates, because the rule cannot run until the dependent types have all been loaded
			if (this.predicates) {
				var signal;
				var predicates = [];

				// setup loading of each property path that the calculation is based on
				this.predicates.forEach(function (predicate, i) {

					// simply copy the predicate over if has already a valid property or property chain
					if (predicate instanceof Property || predicate instanceof PropertyChain) {
						predicates.push(predicate);
					}

					// parse string inputs, which may be paths containing nesting {} hierarchial syntax
					else if (predicate.constructor === String) {

						// create a signal if this is the first string-based input
						if (!signal) {
							signal = new Signal("prepare rule predicates");
						}

						// normalize the paths to accommodate {} hierarchial syntax
						PathTokens.normalizePaths([predicate]).forEach(function (path) {
							Model.property(path, this.rootType, false, signal.pending(function (chain) {
								// add the prepared property or property chain
								predicates.push(chain);
							}, this, true), this);
						}, this);
					}
				}, this);

				// wait until all property information is available to initialize the rule
				if (signal) {
					signal.waitForAll(function () {
						this.predicates = predicates;
						register.call(this);
					}, this, true);
				}

				// otherwise, just immediately proceed with rule registration
				else {
					this.predicates = predicates;
					register.call(this);
				}
			}
		}
	});

	// creates a condition type for the specified rule and type or property, of the specified category type (usually Error or Warning)
	Rule.ensureConditionType = function Rule$ensureConditionType(ruleName, typeOrProp, category, sets) {
		var generatedCode =
			typeOrProp instanceof Property ? $format("{0}.{1}.{2}", [typeOrProp.get_containingType().get_fullName(), typeOrProp.get_name(), ruleName]) :
			typeOrProp instanceof Type ? $format("{0}.{1}", [typeOrProp.get_fullName(), ruleName]) : 
			ruleName;
		var counter = "";

		while (ConditionType.get(generatedCode + counter))
			counter++;

		// return a new client condition type of the specified category
		return new category(generatedCode + counter, $format("Generated condition type for {0} rule.", [ruleName]), null, "client");
	};

	// creates an error for the specified rule and type or property
	Rule.ensureError = function Rule$ensureError(ruleName, typeOrProp, sets) {
		return Rule.ensureConditionType(ruleName, typeOrProp, ConditionType.Error, sets);
	};

	// creates an error for the specified rule and type or property
	Rule.ensureWarning = function Rule$ensureWarning(ruleName, typeOrProp, sets) {
		return Rule.ensureConditionType(ruleName, typeOrProp, ConditionType.Warning, sets);
	};

	// publicly expose the rule
	ExoWeb.Model.Rule = Rule;

	// #endregion

	// #region ExoWeb.Model.RuleInput
	//////////////////////////////////////////////////

	function RuleInput(property) {
		this.property = property;
	}

	RuleInput.prototype = {
		set_dependsOnInit: function RuleInput$set_dependsOnInit(value) {
			this._init = value;
		},
		get_dependsOnInit: function RuleInput$get_dependsOnInit() {
			return this._init === undefined ? false : this._init;
		},
		set_dependsOnChange: function RuleInput$set_dependsOnChange(value) {
			this._change = value;
		},
		get_dependsOnChange: function RuleInput$get_dependsOnChange() {
			return this._change === undefined ? true : this._change;
		},
		set_dependsOnGet: function RuleInput$set_dependsOnGet(value) {
			this._get = value;
		},
		get_dependsOnGet: function RuleInput$get_dependsOnGet() {
			return this._get === undefined ? false : this._get;
		},
		get_isTarget: function RuleInput$get_isTarget() {
			return this._isTarget === undefined ? false : this._isTarget;
		},
		set_isTarget: function RuleInput$set_isTarget(value) {
			this._isTarget = value;
		}
	};
	ExoWeb.Model.RuleInput = RuleInput;

	// #endregion

	// #region ExoWeb.Model.ConditionRule
	//////////////////////////////////////////////////

	function ConditionRule(rootType, options) {
		/// <summary>Creates a rule that asserts a condition based on a predicate.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			assert:				a predicate that returns true when the condition should be asserted
		///			name:				the optional unique name of the type of rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		///			properties:			an array of property paths the validation condition should be attached to when asserted, in addition to the target property
		///			sets:				the optional array of condition type sets to associate the condition with
		///			onInit:				true to indicate the rule should run when an instance of the root type is initialized, otherwise false
		///			onInitNew:			true to indicate the rule should run when a new instance of the root type is initialized, otherwise false
		///			onInitExisting:		true to indicate the rule should run when an existing instance of the root type is initialized, otherwise false
		///			onChangeOf:			an array of property paths (strings, Property or PropertyChain instances) that drive when the rule should execute due to property changes
		/// </param>
		/// <returns type="ConditionRule">The new condition rule.</returns>

		// exit immediately if called with no arguments
		if (arguments.length === 0) return;

		// store the condition predicate
		var assert = options.assert || options.fn;
		if (assert) {
			this.assert = assert;
		}

		// automatically run the condition rule during initialization of new instances
		options.onInitNew = true;

		// coerce string to condition type
		var conditionType = options.conditionType;
		if (isString(conditionType)) {
			conditionType = ConditionType.get(conditionType);
		}

		// create a condition type if not passed in, defaulting to Error if a condition category was not specified
		Object.defineProperty(this, "conditionType", { 
			value: conditionType || Rule.ensureConditionType(options.name, rootType, options.category || ConditionType.Error, options.sets)
		});

		// automatically run the condition rule during initialization of existing instances if the condition type was defined on the client
		if (this.conditionType.origin !== "server") {
			options.onInitExisting = true;
		}

		// store the condition message and properties
		if (options.message) {
			Object.defineProperty(this, "message", { value: options.message, writable: true });
		}
		if (options.properties) {
			Object.defineProperty(this, "properties", { value: options.properties, writable: true });
		}

		// Call the base rule constructor
		Rule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	ConditionRule.prototype = new Rule();
	ConditionRule.prototype.constructor = ConditionRule;

	// implement the execute method
	ConditionRule.mixin({

		// subclasses may override this function to return the set of properties to attach conditions to for this rule
		properties: function ConditionRule$properties() {
			return this.hasOwnProperty("properties") ? this.properties : [];
		},

		// subclasses may override this function to calculate an appropriate message for this rule during the registration process
		message: function ConditionRule$message() {
			return this.conditionType.message;
		},

		// subclasses may override this function to indicate whether the condition should be asserted
		assert: function ConditionRule$assert(obj) {
			ExoWeb.trace.throwAndLog(["rules"], "ConditionRule.assert() must be passed into the constructor or overriden by subclasses.");
		},

		// asserts the condition and adds or removes it from the model if necessary
		execute: function ConditionRule$execute(obj) {

			var assert;

			// call assert the root object as "this" if the assertion function was overriden in the constructor
			if (this.hasOwnProperty("assert")) {

				// convert string functions into compiled functions on first execution
				if (this.assert.constructor === String) {
					this.assert = this.rootType.compileExpression(this.assert);
				}
				assert = this.assert.call(obj, obj);
			}

			// otherwise, allow "this" to be the current rule to support subclasses that override assert
			else {
				assert = this.assert(obj);
			}

			var message = this.message;
			if (message instanceof Function) {
				if (this.hasOwnProperty("message")) {
					// When message is overriden, use the root object as this
					message = message.bind(obj);
				}
				else {
					message = message.bind(this);
				}
			}

			// create or remove the condition if necessary
			if (assert !== undefined) {
				this.conditionType.when(assert, obj,
						this.properties instanceof Function ? this.properties(obj) : this.properties,
						message);
			}
		},
	
		// gets the string representation of the condition rule
		toString: function () {
			return this.message || this.conditionType.message;
		}
	});

	// expose the rule publicly
	Rule.condition = ConditionRule;
	ExoWeb.Model.ConditionRule = ConditionRule;
	// #endregion

	// #region ExoWeb.Model.ValidatedPropertyRule
	//////////////////////////////////////////////////

	function ValidatedPropertyRule(rootType, options) {
		/// <summary>Creates a rule that validates the value of a property in the model.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			isValid:			function (obj, prop, val) { return true; } (a predicate that returns true when the property is valid)
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		///			properties:			an array of property paths the validation condition should be attached to when asserted, in addition to the target property
		///			onInit:				true to indicate the rule should run when an instance of the root type is initialized, otherwise false
		///			onInitNew:			true to indicate the rule should run when a new instance of the root type is initialized, otherwise false
		///			onInitExisting:		true to indicate the rule should run when an existing instance of the root type is initialized, otherwise false
		///			onChangeOf:			an array of property paths (strings, Property or PropertyChain instances) that drive when the rule should execute due to property changes
		/// </param>
		/// <returns type="ValidatedPropertyRule">The new validated property rule.</returns>

		// exit immediately if called with no arguments
		if (arguments.length == 0) return;

		// ensure the rule name is specified
		options.name = options.name || "ValidatedProperty";

		// store the property being validated
		var prop = options.property instanceof Property ? options.property : rootType.property(options.property);
		Object.defineProperty(this, "property", { value: prop });

		// override the prototype isValid function if specified
		if (options.isValid instanceof Function) {
			this.isValid = options.isValid;
		}

		// ensure the properties and predicates to include the target property
		if (!options.properties) {
			options.properties = [prop.get_name()];
		}
		else if (options.properties.indexOf(prop.get_name()) < 0 && options.properties.indexOf(prop) < 0) {
			options.properties.push(prop.get_name());
		}
		if (!options.onChangeOf) {
			options.onChangeOf = [prop];
		}
		else if (options.onChangeOf.indexOf(prop.get_name()) < 0 && options.onChangeOf.indexOf(prop) < 0) {
			options.onChangeOf.push(prop);
		}

		// create a property specified condition type if not passed in, defaulting to Error if a condition category was not specified
		options.conditionType = options.conditionType || Rule.ensureConditionType(options.name, this.property, options.category || ConditionType.Error);

		// replace the property label token in the validation message if present
		if (options.message) {
			options.message = options.message.replace('{property}', prop.get_label());
		}

		// call the base rule constructor
		ConditionRule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	ValidatedPropertyRule.prototype = new ConditionRule();
	ValidatedPropertyRule.prototype.constructor = ValidatedPropertyRule;

	// extend the base type
	ValidatedPropertyRule.mixin({

		// returns false if the property is valid, true if invalid, or undefined if unknown
		assert: function ValidatedPropertyRule$assert(obj) {
			var isValid = this.isValid(obj, this.property, this.property.value(obj));
			return isValid === undefined ? isValid : !isValid;
		},

		// perform addition initialization of the rule when it is registered
		onRegister: function () {

			// register the rule with the target property
			registerPropertyRule(this.property, this);
		}

	});

	// Expose the rule publicly
	Rule.validated = ValidatedPropertyRule;
	ExoWeb.Model.ValidatedPropertyRule = ValidatedPropertyRule;
	// #endregion

	// #region ExoWeb.Model.CalculatedPropertyRule
	//////////////////////////////////////////////////

	function CalculatedPropertyRule(rootType, options) {
		/// <summary>Creates a rule that calculates the value of a property in the model.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:		the property being calculated (either a Property instance or string property name)
		///			calculate:		a function that returns the value to assign to the property, or undefined if the value cannot be calculated
		///			name:			the optional unique name of the rule
		///		    onInit:			true to indicate the rule should run when an instance of the root type is initialized, otherwise false
		///		    onInitNew:		true to indicate the rule should run when a new instance of the root type is initialized, otherwise false
		///		    onInitExisting:	true to indicate the rule should run when an existing instance of the root type is initialized, otherwise false
		///		    onChangeOf:		an array of property paths (strings, Property or PropertyChain instances) that drive when the rule should execute due to property changes
		/// </param>
		/// <returns type="CalculatedPropertyRule">The new calculated property rule.</returns>

		// store the property being validated
		var prop = options.property instanceof Property ? options.property : rootType.property(options.property);
		Object.defineProperty(this, "property", { value: prop });

		// ensure the rule name is specified
		options.name = options.name || (rootType.get_fullName() + "." + prop.get_name() + ".Calculated");

		// store the calculation function
		Object.defineProperty(this, "calculate", { value: options.calculate || options.fn, writable: true });

		// indicate that the rule is responsible for returning the value of the calculated property
		options.returns = [prop];

		// Call the base rule constructor 
		Rule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	CalculatedPropertyRule.prototype = new Rule();
	CalculatedPropertyRule.prototype.constructor = CalculatedPropertyRule;

	// extend the base type
	CalculatedPropertyRule.mixin({
		execute: function CalculatedPropertyRule$execute(obj) {
			var prop = this.property;

			// convert string functions into compiled functions on first execution
			if (this.calculate.constructor === String) {
				this.calculate = this.rootType.compileExpression(this.calculate);
			}

			// calculate the new property value
			var newValue = this.calculate.apply(obj);

			// exit immediately if the calculated result was undefined
			if (newValue === undefined) return;

			// modify list properties to match the calculated value instead of overwriting the property
			if (prop.get_isList()) {

				// re-calculate the list values
				var newList = newValue;

				// compare the new list to the old one to see if changes were made
				var curList = prop.value(obj);

				if (newList.length === curList.length) {
					var noChanges = true;

					for (var i = 0; i < newList.length; ++i) {
						if (newList[i] !== curList[i]) {
							noChanges = false;
							break;
						}
					}

					if (noChanges) {
						return;
					}
				}

				// update the current list so observers will receive the change events
				curList.beginUpdate();
				update(curList, newList);
				curList.endUpdate();
			}

			// otherwise, just set the property to the new value
			else {
				prop.value(obj, newValue, { calculated: true });
			}
		},
		toString: function () {
			return "calculation of " + this.property._name;
		},
		// perform addition initialization of the rule when it is registered
		onRegister: function () {

			// register the rule with the target property
			registerPropertyRule(this.property, this);
		}
	});

	// expose the rule publicly
	Rule.calculated = CalculatedPropertyRule;
	ExoWeb.Model.CalculatedPropertyRule = CalculatedPropertyRule;

	// #endregion

	// #region ExoWeb.Model.RequiredRule
	//////////////////////////////////////////////////

	function RequiredRule(rootType, options) {
		/// <summary>Creates a rule that validates that a property has a value.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		/// </param>
		/// <returns type="RequiredRule">The new required rule.</returns>

		// ensure the rule name is specified
		options.name = options.name || "Required";

		// ensure the error message is specified
		options.message = options.message || Resource.get("required");

		// call the base type constructor
		ValidatedPropertyRule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	RequiredRule.prototype = new ValidatedPropertyRule();
	RequiredRule.prototype.constructor = RequiredRule;

	// define a global function that determines if a value exists
	RequiredRule.hasValue = function RequiredRule$hasValue(val) {
		return val !== undefined && val !== null && (val.constructor !== String || val.trim() !== "") && (!(val instanceof Array) || val.length > 0);
	};

	// extend the base type
	RequiredRule.mixin({

		// returns true if the property is valid, otherwise false
		isValid: function RequiredRule$isValid(obj, prop, val) { return RequiredRule.hasValue(val); },

		// get the string representation of the rule
		toString: function() {
			return $format("{0}.{1} is required", [this.property.get_containingType().get_fullName(), this.property.get_name()]);
		}
	});

	// Expose the rule publicly
	Rule.required = RequiredRule;
	ExoWeb.Model.RequiredRule = RequiredRule;
	// #endregion

	// #region ExoWeb.Model.RangeRule
	//////////////////////////////////////////////////

	function RangeRule(rootType, options) {
		/// <summary>Creates a rule that validates a property value is within a specific range.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			min:				the minimum valid value of the property
		///			max:				the maximum valid value of the property
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		/// </param>
		/// <returns type="RangeRule">The new range rule.</returns>

		// ensure the rule name is specified
		options.name = options.name || "Range";

		// store the min and max lengths
		if (options.min !== undefined && options.min !== null) {
			Object.defineProperty(this, "min", { value: options.min });
		}
		if (options.max !== undefined && options.max !== null) {
			Object.defineProperty(this, "max", { value: options.max });
		}

		// get the property being validated in order to determine the data type
		var property = options.property instanceof Property ? options.property : rootType.property(options.property);

		// ensure the error message is specified
		options.message = options.message ||
			this.min !== undefined && this.max !== undefined ? Resource.get("range-between").replace("{min}", this.min).replace("{max}", this.max) : // between date or ordinal
				property.get_jstype() === Date ?
					this.min !== undefined ? 
						Resource.get("range-on-or-after").replace("{min}", this.min) : // on or after date
						Resource.get("range-on-or-before").replace("{max}", this.max) : // on or before date
					this.max !== undefined ? 
						Resource.get("range-at-least").replace("{min}", this.min) : // at least ordinal
						Resource.get("range-at-most").replace("{max}", this.max); // at most ordinal

		// call the base type constructor
		ValidatedPropertyRule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	RangeRule.prototype = new ValidatedPropertyRule();
	RangeRule.prototype.constructor = RangeRule;

	// extend the base type
	RangeRule.mixin({

		// returns true if the property is valid, otherwise false
		isValid: function RangeRule$isValid(obj, prop, val) {
			return val === null || val === undefined || ((this.min === undefined || val >= this.min) && (this.max === undefined || val <= this.max));
		},

		// get the string representation of the rule
		toString: function () {
			return $format("{0}.{1} in range, min: {2}, max: {3}",
				[this.get_property().get_containingType().get_fullName(),
				this.get_property().get_name(),
				this.min ? "" : this.min,
				this.max ? "" : this.max]);
		}
	});

	// Expose the rule publicly
	Rule.range = RangeRule;
	ExoWeb.Model.RangeRule = RangeRule;
	// #endregion

	// #region ExoWeb.Model.AllowedValuesRule
	//////////////////////////////////////////////////

	function AllowedValuesRule(rootType, options) {
		/// <summary>Creates a rule that validates whether a selected value or values is in a list of allowed values.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:		the property being validated (either a Property instance or string property name)
		///			source:			the source property for the allowed values (either a Property or PropertyChain instance or a string property path)
		///			name:			the optional unique name of the rule
		///			conditionType:	the optional condition type to use, which will be automatically created if not specified
		///			category:		ConditionType.Error || ConditionType.Warning, defaults to ConditionType.Error if not specified
		///			message:		the message to show the user when the validation fails
		/// </param>
		/// <returns type="AllowedValuesRule">The new allowed values rule.</returns>

		// ensure the rule name is specified
		options.name = options.name || "AllowedValues";

		// ensure the error message is specified
		options.message = options.message || Resource.get("allowed-values");

		// ensure changes to the allowed values triggers rule execution
		options.onChangeOf = [options.source];

		// define properties for the rule
		if (options.source instanceof Property || options.source instanceof PropertyChain) {
			Object.defineProperty(this, "sourcePath", { value: options.source.get_path() });
			Object.defineProperty(this, "source", { value: options.source });
		}
		else {
			Object.defineProperty(this, "sourcePath", { value: options.source });
		}

		// call the base type constructor
		ValidatedPropertyRule.apply(this, [rootType, options]);

		// never run allowed values rules during initialization of existing instances
		options.onInitExisting = false;
	}

	// setup the inheritance chain
	AllowedValuesRule.prototype = new ValidatedPropertyRule();
	AllowedValuesRule.prototype.constructor = AllowedValuesRule;

	// extend the base type
	AllowedValuesRule.mixin({
		onRegister: function AllowedValuesRule$onRegister() {

			// get the allowed values source, if only the path was specified
			if (!this.source) {
				Object.defineProperty(this, "source", { value: Model.property(this.sourcePath, this.rootType) });
			}

			// call the base method
			ValidatedPropertyRule.prototype.onRegister.call(this);
		},
		isValid: function AllowedValuesRule$isValid(obj, prop, value) {

			// return true if no value is currently selected
			if (value === undefined || value === null) {
				return true;
			}

			// get the list of allowed values of the property for the given object
			var allowed = this.values(obj);

			// return undefined if the set of allowed values cannot be determined
			if (allowed === undefined || !LazyLoader.isLoaded(allowed)) {
				return;
			}

			// ensure that the value or list of values is in the allowed values list (single and multi-select)				
			if (value instanceof Array) {
				return value.every(function (item) { return Array.contains(allowed, item); });
			}
			else {
				return Array.contains(allowed, value);
			}
		},
		values: function AllowedValuesRule$values(obj, exitEarly) {
			if (!this.source) {
				ExoWeb.trace.logWarning("rule", "AllowedValues rule on type \"{0}\" has not been initialized.", [this.prop.get_containingType().get_fullName()]);
				return;
			}

			// For non-static properties, verify that a final target exists and
			// if not return an appropriate null or undefined value instead.
			if (!this.source.get_isStatic()) {
				// Get the value of the last target for the source property (chain).
				var lastTarget = this.source.lastTarget(obj, exitEarly);

				// Use the last target to distinguish between the absence of data and
				// data that has not been loaded, if a final value cannot be obtained.
				if (lastTarget === undefined) {
					// Undefined signifies unloaded data
					return undefined;
				}
				else if (lastTarget === null) {
					// Null signifies the absensce of a value
					return null;
				}
			}

			// Return the value of the source for the given object
			return this.source.value(obj);
		},
		toString: function AllowedValuesRule$toString() {
			return $format("{0}.{1} allowed values = {2}", [this.property.get_containingType().get_fullName(), this.property.get_name(), this._sourcePath]);
		}
	});

	// expose the rule publicly
	Rule.allowedValues = AllowedValuesRule;
	ExoWeb.Model.AllowedValuesRule = AllowedValuesRule;

	// #endregion

	// #region ExoWeb.Model.CompareRule
	//////////////////////////////////////////////////

	function CompareRule(rootType, options) {
		/// <summary>Creates a rule that validates a property by comparing it to another property.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			compareSource:		the source property to compare to (either a Property or PropertyChain instance or a string property path)
		///			compareOperator:	the relational comparison operator to use (one of "Equal", "NotEqual", "GreaterThan", "GreaterThanEqual", "LessThan" or "LessThanEqual")
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		/// </param>
		/// <returns type="CompareRule">The new compare rule.</returns>

		options.name = options.name || "Compare";
	
		// ensure changes to the compare source triggers rule execution
		options.onChangeOf = [options.compareSource];

		// define properties for the rule
		Object.defineProperty(this, "compareOperator", { value: options.compareOperator });
		if (options.source instanceof Property || options.compareSource instanceof PropertyChain) {
			Object.defineProperty(this, "comparePath", { value: options.compareSource.get_path() });
			Object.defineProperty(this, "compareSource", { value: options.compareSource });
		}
		else {
			Object.defineProperty(this, "comparePath", { value: options.compareSource });
		}

		// call the base type constructor
		ValidatedPropertyRule.apply(this, [rootType, options]);
	}

	// compares the source value to a comparison value using the specified operator
	CompareRule.compare = function CompareRule$compare(sourceValue, compareOp, compareValue, defaultValue) {
		if (compareValue === undefined || compareValue === null) {
			switch (compareOp) {
				case "Equal": return !RequiredRule.hasValue(sourceValue);
				case "NotEqual": return RequiredRule.hasValue(sourceValue);
			}
		}

		if (sourceValue !== undefined && sourceValue !== null && compareValue !== undefined && compareValue !== null) {
			switch (compareOp) {
				case "Equal": return sourceValue == compareValue;
				case "NotEqual": return sourceValue != compareValue;
				case "GreaterThan": return sourceValue > compareValue;
				case "GreaterThanEqual": return sourceValue >= compareValue;
				case "LessThan": return sourceValue < compareValue;
				case "LessThanEqual": return sourceValue <= compareValue;
			}
			// Equality by default.
			return sourceValue == compareValue;
		}

		return defaultValue;
	};

	// setup the inheritance chain
	CompareRule.prototype = new ValidatedPropertyRule();
	CompareRule.prototype.constructor = CompareRule;

	// extend the base type
	CompareRule.mixin({

		// return true of the comparison is valid, otherwise false
		isValid: function Compare$isValid(obj, prop, value) {
			var compareValue = this.compareSource.value(obj);
			return CompareRule.compare(value, this.compareOperator, compareValue, true);
		},

		// calculates the appropriate message based on the comparison operator and data type
		message: function () {
			var message;
			var isDate = this.compareSource.get_jstype() === Date;
			if (this.compareOperator === "Equal") {
				message = Resource.get("compare-equal");
			}
			else if (this.compareOperator === "NotEqual") {
				message = Resource.get("compare-not-equal");
			}
			else if (this.compareOperator === "GreaterThan") {
				message = Resource.get(isDate ? "compare-after" : "compare-greater-than");
			}
			else if (this.compareOperator === "GreaterThanEqual") {
				message = Resource.get(isDate ? "compare-on-or-after" : "compare-greater-than-or-equal");
			}
			else if (this.compareOperator === "LessThan") {
				message = Resource.get(isDate ? "compare-before" : "compare-less-than");
			}
			else if (this.compareOperator === "LessThanEqual") {
				message = Resource.get(isDate ? "compare-on-or-before" : "compare-less-than-or-equal");
			}
			else {
				ExoWeb.trace.throwAndLog(["rule"], "Invalid comparison operator for compare rule.");
			}
			message = message
				.replace('{property}', this.property.get_label())
				.replace("{compareSource}", this.compareSource.get_label());
			return message;
		},

		// perform addition initialization of the rule when it is registered
		onRegister: function () {

			// get the compare source, if only the path was specified
			if (!this.compareSource) {
				Object.defineProperty(this, "compareSource", { value: Model.property(this.comparePath, this.rootType) });
			}

			// call the base method
			ValidatedPropertyRule.prototype.onRegister.call(this);
		}
	});

	// expose the rule publicly
	Rule.compare = CompareRule;
	ExoWeb.Model.CompareRule = CompareRule;

	// #endregion

	// #region ExoWeb.Model.RequiredIfRule
	//////////////////////////////////////////////////

	function RequiredIfRule(rootType, options) {
		/// <summary>Creates a rule that conditionally validates whether a property has a value.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			isRequired:			a predicate function indicating whether the property should be required
		///			compareSource:		the source property to compare to (either a Property or PropertyChain instance or a string property path)
		///			compareOperator:	the relational comparison operator to use (one of "Equal", "NotEqual", "GreaterThan", "GreaterThanEqual", "LessThan" or "LessThanEqual")
		///			compareValue:		the optional value to compare to
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		///		    onInit:				true to indicate the rule should run when an instance of the root type is initialized, otherwise false
		///		    onInitNew:			true to indicate the rule should run when a new instance of the root type is initialized, otherwise false
		///		    onInitExisting:		true to indicate the rule should run when an existing instance of the root type is initialized, otherwise false
		///		    onChangeOf:			an array of property paths (strings, Property or PropertyChain instances) that drive when the rule should execute due to property changes
		/// </param>
		/// <returns type="RequiredIfRule">The new required if rule.</returns>

		options.name = options.name || "RequiredIf";
	
		// ensure changes to the compare source triggers rule execution
		if (!options.onChangeOf && options.compareSource) {
			options.onChangeOf = [options.compareSource];
		}

		// predicate-based rule
		var isRequired = options.isRequired || options.fn;
		if (isRequired instanceof Function) {
			this.isRequired = isRequired;
			options.message = options.message || Resource.get("required");
		}

		// comparison-based rule
		else {
			Object.defineProperty(this, "comparePath", { value: options.compareSource });
			Object.defineProperty(this, "compareOperator", {
				value: options.compareOperator || (options.compareValue !== undefined && options.compareValue !== null ? "Equal" : "NotEqual"),
				writable: true
			});
			Object.defineProperty(this, "compareValue", { value: options.compareValue, writable: true });
		}
	
		// call the base type constructor
		ValidatedPropertyRule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	RequiredIfRule.prototype = new ValidatedPropertyRule();
	RequiredIfRule.prototype.constructor = RequiredIfRule;

	// extend the base type
	RequiredIfRule.mixin({

		// determines whether the property should be considered required
		isRequired: function RequiredIfRule$required(obj) {
			var sourceValue = this.compareSource.value(obj);
			return CompareRule.compare(sourceValue, this.compareOperator, this.compareValue, false);
		},

		// calculates the appropriate message based on the comparison operator and data type
		message: function () {
			var message;
			var isDate = this.compareSource.get_jstype() === Date;
			if (this.compareValue === undefined || this.compareValue === null) {
				message = Resource.get(this.compareOperator === "Equal" ? "required-if-not-exists" : "required-if-exists");
			}
			else if (this.compareOperator === "Equal") {
				message = Resource.get("required-if-equal");
			}
			else if (this.compareOperator === "NotEqual") {
				message = Resource.get("required-if-not-equal");
			}
			else if (this.compareOperator === "GreaterThan") {
				message = Resource.get(isDate ? "required-if-after" : "required-if-greater-than");
			}
			else if (this.compareOperator === "GreaterThanEqual") {
				message = Resource.get(isDate ? "required-if-on-or-after" : "required-if-greater-than-or-equal");
			}
			else if (this.compareOperator === "LessThan") {
				message = Resource.get(isDate ? "required-if-before" : "required-if-less-than");
			}
			else if (this.compareOperator === "LessThanEqual") {
				message = Resource.get(isDate ? "required-if-on-or-before" : "required-if-less-than-or-equal");
			}
			else {
				ExoWeb.trace.throwAndLog(["rule"], "Invalid comparison operator for compare rule.");
			}
			message = message
				.replace('{property}', this.property.get_label())
				.replace("{compareSource}", this.compareSource.get_label())
				.replace("{compareValue}", this.compareSource.format(this.compareValue));
			return message;
		},

		// returns false if the property is valid, true if invalid, or undefined if unknown
		assert: function RequiredIfRule$assert(obj) {
			var isReq;

			if (this.hasOwnProperty("isRequired"))
				isReq = this.isRequired.call(obj, obj);

			// otherwise, allow "this" to be the current rule to support subclasses that override assert
			else 
				isReq = this.isRequired(obj);
		
			return isReq && !RequiredRule.hasValue(this.property.value(obj));
		},

		// perform addition initialization of the rule when it is registered
		onRegister: function () {

			// call the base method
			ValidatedPropertyRule.prototype.onRegister.call(this);

			// perform addition registration for required if rules with a compare source
			if (this.comparePath) {

				// get the compare source, which is already a rule predicate and should immediately resolve
				Object.defineProperty(this, "compareSource", { value: Model.property(this.comparePath, this.rootType) });

				// flip the equality rules for boolean data types
				if (this.compareSource.get_jstype() === Boolean && this.compareOperator == "NotEqual" && (this.compareValue === undefined || this.compareValue === null)) {
					this.compareOperator = "Equal";
					this.compareValue = true;
				}
			}
		}
	});

	// Expose the rule publicly
	Rule.requiredIf = RequiredIfRule;
	ExoWeb.Model.RequiredIfRule = RequiredIfRule;

	// #endregion

	// #region ExoWeb.Model.StringLengthRule
	//////////////////////////////////////////////////

	function StringLengthRule(rootType, options) {
		/// <summary>Creates a rule that validates that the length of a string property is within a specific range.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			min:				the minimum length of the property
		///			max:				the maximum length of the property
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		/// </param>
		/// <returns type="RangeRule">The new range rule.</returns>

		// ensure the rule name is specified
		options.name = options.name || "StringLength";

		// store the min and max lengths
		Object.defineProperty(this, "min", { value: options.min });
		Object.defineProperty(this, "max", { value: options.max });

		// ensure the error message is specified
		options.message = options.message ||
			(options.min && options.max ? Resource.get("string-length-between").replace("{min}", this.min).replace("{max}", this.max) :
			options.min ? Resource.get("string-length-at-least").replace("{min}", this.min) :
			Resource.get("string-length-at-most").replace("{max}", this.max));

		// call the base type constructor
		ValidatedPropertyRule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	StringLengthRule.prototype = new ValidatedPropertyRule();
	StringLengthRule.prototype.constructor = StringLengthRule;

	// extend the base type
	StringLengthRule.mixin({

		// returns true if the property is valid, otherwise false
		isValid: function StringLengthRule$isValid(obj, prop, val) {
			return !val || val === "" || ((!this.min || val.length >= this.min) && (!this.max || val.length <= this.max));
		},

		// get the string representation of the rule
		toString: function () {
			return $format("{0}.{1} in range, min: {2}, max: {3}",
				[this.get_property().get_containingType().get_fullName(),
				this.get_property().get_name(),
				this.min ? "" : this.min,
				this.max ? "" : this.max]);
		}
	});

	// Expose the rule publicly
	Rule.stringLength = StringLengthRule;
	ExoWeb.Model.StringLengthRule = StringLengthRule;

	// #endregion

	// #region ExoWeb.Model.StringFormatRule
	//////////////////////////////////////////////////

	function StringFormatRule(rootType, options) {
		/// <summary>Creates a rule that validates that a string property value is correctly formatted.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			description:		the human readable description of the format, such as MM/DD/YYY
		///		    expression:			a regular expression string or RegExp instance that the property value must match
		///		    reformat:			and optional regular expression reformat string or reformat function that will be used to correct the value if it matches
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		/// </param>
		/// <returns type="StringFormatRule">The new string format rule.</returns>

		// exit immediately if called with no arguments
		if (arguments.length == 0) return;

		// ensure the rule name is specified
		options.name = options.name || "StringFormat";

		// ensure the error message is specified
		options.message = options.message || Resource.get("string-format").replace("{formatDescription}", options.description);

		// define properties for the rule
		Object.defineProperty(this, "description", { value: options.description });
		Object.defineProperty(this, "expression", { value: options.expression instanceof RegExp ? options.expression : RegExp(options.expression) });
		Object.defineProperty(this, "reformat", { value: options.reformat });

		// call the base type constructor
		ValidatedPropertyRule.apply(this, [rootType, options]);
	}

	// setup the inheritance chain
	StringFormatRule.prototype = new ValidatedPropertyRule();
	StringFormatRule.prototype.constructor = StringFormatRule;

	// extend the base type
	StringFormatRule.mixin({

		// returns true if the property is valid, otherwise false
		isValid: function StringFormatRule$isValid(obj, prop, val) {
			var isValid = true;
			if (val && val != "") {
				this.expression.lastIndex = 0;
				isValid = this.expression.test(val);
				if (isValid && this.reformat) {
					if (this.reformat instanceof Function) {
						val = this.reformat(val);
					}
					else {
						this.expression.lastIndex = 0;
						val = val.replace(this.expression, this.reformat);
					}
					prop.value(obj, val);
				}
			}
			return isValid;
		},

		// get the string representation of the rule
		toString: function () {
			return $format("{0}.{1} formatted as {2}",
				[this.get_property.get_containingType().get_fullName(),
				this.get_property().get_name(),
				this.description]);
		}
	});

	// Expose the rule publicly
	Rule.stringFormat = StringFormatRule;
	ExoWeb.Model.StringFormatRule = StringFormatRule;

	// #endregion

	// #region ExoWeb.Model.ListLengthRule
	//////////////////////////////////////////////////

	function ListLengthRule(rootType, options) {
		/// <summary>Creates a rule that validates whether a list contains the correct number of items.</summary>
		/// <param name="rootType" type="Type">The model type the rule is for.</param>
		/// <param name="options" type="Object">
		///		The options for the rule, including:
		///			property:			the property being validated (either a Property instance or string property name)
		///			compareSource:		the optional source property to compare the list length to (either a Property or PropertyChain instance or a string property path)
		///			compareOperator:	the relational comparison operator to use (one of "Equal", "NotEqual", "GreaterThan", "GreaterThanEqual", "LessThan" or "LessThanEqual")
		///			compareValue:		the optional list length value to compare to
		///			name:				the optional unique name of the type of validation rule
		///			conditionType:		the optional condition type to use, which will be automatically created if not specified
		///			category:			ConditionType.Error || ConditionType.Warning (defaults to ConditionType.Error)
		///			message:			the message to show the user when the validation fails
		/// </param>
		/// <returns type="ListLengthRule">The new list length rule.</returns>


	}

	ListLengthRule.load = function ListLengthRule$load(rule, loadedType, mtype, callback, thisPtr) {
		if (!loadedType.meta.baseType || LazyLoader.isLoaded(loadedType.meta.baseType)) {
			var inputs = [];

			var targetInput = new RuleInput(rule.prop);
			targetInput.set_isTarget(true);
			if (rule.prop.get_origin() === "client")
				targetInput.set_dependsOnInit(true);
			inputs.push(targetInput);

			//no need to register the rule with the comparePath if you are using a static length
			if (rule._comparePath != "") {
				Model.property(rule._comparePath, rule.prop.get_containingType(), true, function (chain) {
					rule._compareProperty = chain;

					var compareInput = new RuleInput(rule._compareProperty);
					inputs.push(compareInput);

					rule._inited = true;

					if (chain.get_jstype() === Boolean && rule._compareOp == "NotEqual" && (rule._compareValue === undefined || rule._compareValue === null)) {
						rule._compareOp = "Equal";
						rule._compareValue = true;
					}

					Rule.register(rule, inputs, false, mtype, callback, thisPtr);
				});
			}
			else {
				//register the rule without reference to compareSource
				rule._inited = true;
				Rule.register(rule, inputs, false, mtype, callback, thisPtr);
			}
		}
		else {
			$extend(loadedType.meta.baseType.get_fullName(), function (baseType) {
				ListLengthRule.load(rule, baseType, mtype, callback, thisPtr);
			});
		}
	};

	ListLengthRule.prototype = {
		isValid: function Compare$isValid(obj) {
			if (!this._compareProperty && this._staticLength < 0) {
				return true;
			}

			var srcValue = this.prop.value(obj);
			var cmpValue = this._staticLength >= 0 ? this._staticLength : this._compareProperty.value(obj);

			//if the src value is not a list we are not comparing a valid object
			if (!isArray(srcValue))
				return true;

			//if the value we are comparing against is not numeric, this is not a valid comparison
			if (!isWhole(parseInt(cmpValue)))
				return true;

			return CompareRule.compare(srcValue.length, this._compareOp, parseInt(cmpValue), true);
		},
		execute: function ListLengthRule$execute(obj) {
			if (this._inited === true) {

				var isValid = this.isValid(obj);

				var message = isValid ? '' : $format("{0} length must be {1}{2} {3}", [
						this.prop.get_label(),
						ExoWeb.makeHumanReadable(this._compareOp).toLowerCase(),
						(this._compareOp === "GreaterThan" || this._compareOp == "LessThan") ? "" : " to",
						this._staticLength >= 0 ? this._staticLength : this._compareProperty.get_label()
					]);
				this.err = new Condition(this.conditionType, message, [this.prop], this);

				obj.meta.conditionIf(this.err, !isValid);
			}
			else {
				ExoWeb.trace.logWarning("rule", "List Length rule on type \"{0}\" has not been initialized.", [this.prop.get_containingType().get_fullName()]);
			}
		}
	};

	// expose the rule publicly
	Rule.listLength = ListLengthRule;
	ExoWeb.Model.ListLengthRule = ListLengthRule;
	// #endregion

	// #region ExoWeb.Model.ConditionTypeSet
	//////////////////////////////////////////////////

	function ConditionTypeSet(name) {
		if (allConditionTypeSets[name]) {
			ExoWeb.trace.throwAndLog("conditions", "A set with the name \"{0}\" has already been created.", [name]);
		}

		Object.defineProperty(this, "name", { value: name });
		Object.defineProperty(this, "types", { value: [] });
		Object.defineProperty(this, "active", { value: false, writable: true });


		allConditionTypeSets[name] = this;
	}

	var allConditionTypeSets = {};

	ConditionTypeSet.all = function ConditionTypeSet$all() {
		/// <summary>
		/// Returns an array of all condition type sets that have been created.
		/// Note that the array is created each time the function is called.
		/// </summary>
		/// <returns type="Array" />

		var all = [];
		for (var name in allConditionTypeSets) {
			all.push(allConditionTypeSets[name]);
		}
		return all;
	};

	ConditionTypeSet.get = function ConditionTypeSet$get(name) {
		/// <summary>
		/// Returns the condition type set with the given name, if it exists.
		/// </summary>
		/// <param name="name" type="String" />
		/// <returns type="ConditionTypeSet" />

		return allConditionTypeSets[name];
	};

	ConditionTypeSet.prototype = {
		activate: function ConditionTypeSet$activate(value) {
			if (!this.active) {
				this.active = true;
				this._raiseEvent("activated");
			}
		},
		deactivate: function ConditionTypeSet$deactivate() {
			if (this.active) {
				this.active = false;
				this._raiseEvent("deactivated");
			}
		},
		addActivated: function ConditionTypeSet$addActivated(handler) {
			this._addEvent("activated", handler);
		},
		removeActivated: function ConditionTypeSet$removeActivated(handler) {
			this._removeEvent("activated", handler);
		},
		addDeactivated: function ConditionTypeSet$addDeactivated(handler) {
			this._addEvent("deactivated", handler);
		},
		removeDeactivated: function ConditionTypeSet$removeDeactivated(handler) {
			this._removeEvent("deactivated", handler);
		}
	};

	ConditionTypeSet.mixin(ExoWeb.Functor.eventing);

	ExoWeb.Model.ConditionTypeSet = ConditionTypeSet;

	// #endregion

	// #region ExoWeb.Model.ConditionType
	//////////////////////////////////////////////////

	function ConditionType(code, category, message, sets, origin) {
		// So that sub types can use it's prototype.
		if (arguments.length === 0) {
			return;
		}

		if (allConditionTypes[code]) {
			ExoWeb.trace.throwAndLog("conditions", "A condition type with the code \"{0}\" has already been created.", [code]);
		}

		Object.defineProperty(this, "code", { value: code });
		Object.defineProperty(this, "category", { value: category });
		Object.defineProperty(this, "message", { value: message });
		Object.defineProperty(this, "sets", { value: sets || [] });
		Object.defineProperty(this, "rules", { value: [] });
		Object.defineProperty(this, "origin", { value: origin });

		if (sets && sets.length > 0) {
			Array.forEach(sets, function(s) {
				s.types.push(this);
			}, this);
		}

		allConditionTypes[code] = this;
	}

	var allConditionTypes = {};

	ConditionType.all = function ConditionType$all() {
		/// <summary>
		/// Returns an array of all condition types that have been created.
		/// Note that the array is created each time the function is called.
		/// </summary>
		/// <returns type="Array" />

		var all = [];
		for (var name in allConditionTypes) {
			all.push(allConditionTypes[name]);
		}
		return all;
	}

	ConditionType.get = function ConditionType$get(code) {
		/// <summary>
		/// Returns the condition type with the given code, if it exists.
		/// </summary>
		/// <param name="code" type="String" />
		/// <returns type="ConditionTypeSet" />

		return allConditionTypes[code];
	};

	ConditionType.prototype = {

		// adds or removes a condition from the model for the specified target if necessary
		when: function ConditionType$when(condition, target, properties, message) {

			// get the current condition if it exists
			var conditionTarget = target.meta.getCondition(this);

			// add the condition on the target if it does not exist yet
			if (condition) {

				// if the message is a function, invoke to get the actual message
				message = message instanceof Function ? message(target) : message;

				// create a new condition if one does not exist
				if (!conditionTarget) {
					return new Condition(this, message, target, properties, "client");
				}

				// replace the condition if the message has changed
				else if (message && message != conditionTarget.condition.message) {

					// destroy the existing condition
					conditionTarget.condition.destroy();

					// create a new condition with the updated message
					return new Condition(this, message, target, properties, "client");
				}

				// otherwise, just return the existing condition
				else {
					return conditionTarget.condition;
				}
			}

			// Destroy the condition if it exists on the target and is no longer valid
			if (conditionTarget != null)
				conditionTarget.condition.destroy();

			// Return null to indicate that no condition was created
			return null;
		},
		extend: function ConditionType$extend(data) {
			for (var prop in data) {
				if (prop !== "type" && prop !== "rule" && !this["get_" + prop]) {
					var fieldName = "_" + prop;
					this[fieldName] = data[prop];
					this["get" + fieldName] = function ConditionType$getter() {
						return this[fieldName];
					}
				}
			}
		}
	}

	ExoWeb.Model.ConditionType = ConditionType;

	(function() {
		//////////////////////////////////////////////////////////////////////////////////////
		function Error(code, message, sets, origin) {
			ConditionType.call(this, code, "Error", message, sets, origin);
		}

		Error.prototype = new ConditionType();

		ExoWeb.Model.ConditionType.Error = Error;

		//////////////////////////////////////////////////////////////////////////////////////
		function Warning(code, message, sets, origin) {
			ConditionType.call(this, code, "Warning", message, sets, origin);
		}

		Warning.prototype = new ConditionType();

		ExoWeb.Model.ConditionType.Warning = Warning;

		//////////////////////////////////////////////////////////////////////////////////////
		function Permission(code, message, sets, permissionType, isAllowed, origin) {
			ConditionType.call(this, code, "Permission", message, sets, origin);
			Object.defineProperty(this, "permissionType", { value: permissionType });
			Object.defineProperty(this, "isAllowed", { value: isAllowed });
		}

		Permission.prototype = new ConditionType();

		ExoWeb.Model.ConditionType.Permission = Permission;
	})();

	// #endregion

	// #region ExoWeb.Model.ConditionTarget
	//////////////////////////////////////////////////

	/// <reference path="Entity.js" />
	/// <reference path="Property.js" />
	/// <reference path="Condition.js" />

	function ConditionTarget(condition, target, properties) {
		/// <summary>Represents the association of a condition to a specific target entity.</summary>
		/// <param name="condition" type="Condition">The condition the target is for.</param>
		/// <param name="target" type="Entity">The target entity the condition is associated with.</param>
		/// <param name="properties" type="Array" elementType="Property">The set of properties on the target entity the condition is related to.</param>
		/// <returns type="ConditionTarget">The new condition target.</returns>

	    /// <field name="target" type="Entity">The target entity the condition is associated with.</field>
	    /// <field name="condition" type="Condition">The condition the target is for.</field>
	    /// <field name="properties" type="Array" elementType="Property">The set of properties on the target entity the condition is related to.</field>

	    Object.defineProperty(this, "target", { value: target });
		Object.defineProperty(this, "condition", { value: condition });
		Object.defineProperty(this, "properties", { value: properties });

		// attach the condition target to the target entity
		target.meta.setCondition(this);
	}
	// #endregion

	// #region ExoWeb.Model.Condition
	//////////////////////////////////////////////////

	/// <reference path="Type.js" />
	/// <reference path="ObjectMeta.js" />
	/// <reference path="Entity.js" />
	/// <reference path="Property.js" />
	/// <reference path="PathToken.js" />
	/// <reference path="ConditionTarget.js" />

	function Condition(type, message, target, properties, origin) {
		/// <summary>Represents an instance of a condition of a specific type associated with one or more entities in a model.</summary>
	    /// <param name="type" type="ConditionType">The type of condition, which usually is an instance of a subclass like Error, Warning or Permission.</param>
	    /// <param name="message" type="String">The optional message to use for the condition, which will default to the condition type message if not specified.</param>
		/// <param name="target" type="Entity">The root target entity the condition is associated with.</param>
	    /// <param name="properties" type="Array" elementType="String">The set of property paths specifying which properties and entities the condition should be attached to.</param>
		/// <param name="origin" type="String">The original source of the condition, either "client" or "server".</param>
		/// <returns type="Condition">The new condition instance.</returns>

		/// <field name="type" type="ConditionType">The type of condition, which usually is an instance of a subclass like Error, Warning or Permission.</field>
		/// <field name="message" type="String">The optional message to use for the condition, which will default to the condition type message if not specified.</field>
		/// <field name="origin" type="String">The original source of the condition, either "client" or "server".</field>
		/// <field name="targets" type="Array" elementType="ConditionTarget">The set of condition targets that link the condition to specific entities and properties.</field>

		Object.defineProperty(this, "type", { value: type });
		Object.defineProperty(this, "message", { value: message || (type ? type.message : undefined) });
		Object.defineProperty(this, "origin", { value: origin });

		var targets = [];

		// create targets if a root was specified
		if (target) {

			// set the properties to an empty array if not specified and normalize the paths to expand {} syntax if used
			properties = PathTokens.normalizePaths(properties || []);

			// create a single condition target if the specified properties are all on the root
			if (properties.every(function (p) { return p.length === 1; }))
				targets.push(new ConditionTarget(this, target, properties));

			// otherwise, process the property paths to create the necessary sources
			else {
				// process each property path to build up the condition sources
				for (var p = properties.length - 1; p >= 0; p--) {
					var steps = properties[p].steps;
					var instances = [target];

					// iterate over each step along the path
					for (var s = steps.length - 1; s >= 0; s--) {
						var step = steps[s].property;
						var childInstances = [];

						// create condition targets for all instances for the current step along the path
						for (var i = instances.length - 1; i >= 0; i--) {
							var instance = instances[i];

							// see if a target already exists for the current instance
							var conditionTarget = null;
							for (var t = targets.length - 1; t >= 0; t--) {
								if (targets[t].target === instance) {
									conditionTarget = targets[t];
									break;
								}
							}

							// get the property for the current step and instance type and skip if the property cannot be found
							var property = instance.meta.type.property(step);
							if (!property) {
								continue;
							}

							// create the condition target if it does not already exist
							if (!conditionTarget) {
								conditionTarget = new ConditionTarget(this, instance, [property]);
								targets.push(conditionTarget);
							}

							// otherwise, just ensure it references the current step
							else if (conditionTarget.properties.indexOf(property) < 0)
								conditionTarget.properties.push(property);

							// get the value of the current step
							var child = property.value(instance);

							// add the children, if any, to the set of child instances to process for the next step
							if (child instanceof Entity)
								childInstances.push(child);
							else if (child instanceof Array && child.length > 0 && child[0] instanceof Entity)
								childInstances.concat(child);
						}

						// assign the set of instances to process for the next step
						instances = childInstances;
					}
				}
			}
		}

		// store the condition targets
		Object.defineProperty(this, "targets", { value: targets });

		// raise events for the new condition
		if (this.type != formatConditionType) {
			for (var t = targets.length - 1; t >= 0; t--) {
				var conditionTarget = targets[t];
				conditionTarget.target.meta._raiseEvent("conditionsChanged", [conditionTarget.target.meta, { conditionTarget: conditionTarget, add: true, remove: false}]);
			}
		}
	}

	// implementation
	Condition.mixin({
		destroy: function Condition$destroy() {
			/// <summary>Removes the condition targets from all target instances and raises condition change events.</summary>

			for (var t = this.targets.length - 1; t >= 0; t--) {
				var conditionTarget = this.targets[t];
				conditionTarget.target.meta.clearCondition(conditionTarget.condition.type);
				conditionTarget.target.meta._raiseEvent("conditionsChanged", [conditionTarget.target.meta, { conditionTarget: conditionTarget, add: false, remove: true}]);
			}

			// remove references to all condition targets
			this.targets.slice(0, 0);
		},
		toString: function Condition$toString() {
			return this.message;
		}
	});

	// Expose the type publicly
	ExoWeb.Model.Condition = Condition;

	// #endregion

	// #region ExoWeb.Model.FormatError
	//////////////////////////////////////////////////

	function FormatError(message, invalidValue) {
		Object.defineProperty(this, "message", { value: message });
		Object.defineProperty(this, "invalidValue", { value: invalidValue });
	}

	var formatConditionType = new ConditionType.Error("FormatError", "The value is not properly formatted.", []);

	FormatError.mixin({
		createCondition: function FormatError$createCondition(target, prop) {
			return new Condition(formatConditionType,
				$format(this.message, prop.get_label()),
				target,
				[prop.get_name()],
				"client");
		},
		toString: function FormateError$toString() {
			return this._invalidValue;
		}
	});

	ExoWeb.Model.FormatError = FormatError;

	// #endregion

	// #region ExoWeb.Model.FormatProvider
	//////////////////////////////////////////////////

	var formatProvider = function formatProvider(type, format) {
		throw new Error("Format provider has not been implemented.  Call ExoWeb.Model.setFormatProvider(fn);");
	};

	function getFormat(type, format) {

		// return null if a format specifier was not provided
		if (!format || format === '')
			return null;

		// initialize format cache
		if (!type._formats)
			type._formats = {};

		// first see if the requested format is cached
		var f = type._formats[format];
		if (f)
			return f;

		// then see if it is an entity type
		if (type.meta && type.meta instanceof Type)
			type._formats[format] = f = Format.fromTemplate(type, format);

		// otherwise, call the format provider to create a new format
		else
			type._formats[format] = f = formatProvider(type, format);

		return f;
	}

	function setFormatProvider(fn) {
		formatProvider = fn;
	};

	ExoWeb.Model.getFormat = getFormat;


	// #endregion

	// #region ExoWeb.Model.LazyLoader
	//////////////////////////////////////////////////

	function LazyLoader() {
	}

	LazyLoader.eval = function LazyLoader$eval(target, path, successCallback, errorCallback, scopeChain, thisPtr/*, continueFn, performedLoading, root, processed*/) {
		var processed, root, performedLoading, continueFn, step, scope, i, value;

		if (path === undefined || path === null) {
			path = "";
		}

		if (isType(path, String)) {
			path = new PathTokens(path);
		}
		else if (isType(path, Array)) {
			path = new PathTokens(path.join("."));
		}
		else if (!isType(path, PathTokens)) {
			throw new Error("Unknown path \"" + path + "\" of type " + ExoWeb.parseFunctionName(path.constructor) + ".");
		}

		scopeChain = scopeChain || [window];

		// If additional arguments were specified (internal), then use those.
		if (arguments.length === 10) {
			// Allow an invocation to specify continuing loading properties using a given function, by default this is LazyLoader.eval.
			// This is used by evalAll to ensure that array properties can be force loaded at any point in the path.
			continueFn = arguments[6] instanceof Function ? arguments[6] : continueFn;
			// Allow recursive calling function (eval or evalAll) to specify that loading was performed.
			performedLoading = arguments[7] instanceof Boolean ? arguments[7] : false;
			// Allow recursive calling function (eval or evalAll) to specify the root object being used.
			root = arguments[8];
			// Allow recursive calling function (eval or evalAll) to specify the processed steps.
			processed = arguments[9];
		}
		// Initialize to defaults.
		else {
			continueFn = LazyLoader.eval;
			performedLoading = false;
			root = target;
			processed = [];
		}

		// If the target is null or undefined then attempt to backtrack using the scope chain
		if (target === undefined || target === null) {
			target = root = scopeChain.dequeue();
		}
	
		while (path.steps.length > 0) {
			// If null or undefined was passed in with no scope chain, fail
			if (target === undefined || target === null) {
				if (errorCallback) {
					errorCallback.apply(thisPtr || this, ["Target is null or undefined"]);
				}
				else {
					throw new Error("Cannot complete property evaluation because the target is null or undefined");
				}
			}

			// If an array is encountered and this call originated from "evalAll" then delegate to "evalAll", otherwise 
			// this will most likely be an error condition unless the remainder of the path are properties of Array.
			if (continueFn === LazyLoader.evalAll && target instanceof Array) {
				continueFn(target, path, successCallback, errorCallback, scopeChain, thisPtr, continueFn, performedLoading, root, processed);
				return;
			}

			// Get the next step to evaluate
			step = path.steps.dequeue();

			// If the target is not loaded then load it and continue when complete
			if (!LazyLoader.isLoaded(target, step.property)) {
				performedLoading = true;
				Array.insert(path.steps, 0, step);
				LazyLoader.load(target, step.property, function() {
					continueFn(target, path, successCallback, errorCallback, scopeChain, thisPtr, continueFn, performedLoading, root, processed);
				});
				return;
			}

			// Get the value of the current step
			value = getValue(target, step.property);

			// If the value is undefined then there is a problem since getValue returns null if a property exists but returns no value.
			if (value === undefined) {
				// Attempt to backtrack using the next item in the scope chain.
				if (scopeChain.length > 0) {
					target = root = scopeChain.dequeue();
					Array.insert(path.steps, 0, step);
					for (i = processed.length - 1; i >= 0; i--) {
						Array.insert(path.steps, 0, processed[i]);
					}
					processed.length = 0;
				}
				// Otherwise, fail since the path could not be evaluated
				else {
					if (errorCallback) {
						errorCallback.apply(thisPtr || this, ["Property is undefined: " + step.property]);
					}
					else {
						throw new Error("Cannot complete property evaluation because a property is undefined: " + step.property);
					}

					return;
				}
			}
			// The next target is null (nothing left to evaluate) or there is a cast of the current property and the value is 
			// not of the cast type (no need to continue evaluating).
			else if (value === null || (step.cast && !isType(value, step.cast))) {
				if (successCallback) {
					successCallback.apply(thisPtr || this, [null, performedLoading, root]);
				}
				return;
			}
			// Otherwise, continue to the next property.
			else {
				processed.push(step);
				target = value;
			}
		}

		// Load final object
		if (target !== undefined && target !== null && !LazyLoader.isLoaded(target)) {
			performedLoading = true;
			LazyLoader.load(target, null, successCallback ? successCallback.prepare(thisPtr || this, [target, performedLoading, root]) : undefined);
		}
		else if (successCallback) {
			successCallback.apply(thisPtr || this, [target, performedLoading, root]);
		}
	};

	LazyLoader.evalAll = function LazyLoader$evalAll(target, path, successCallback, errorCallback, scopeChain, thisPtr/*, continueFn, performedLoading, root, processed*/) {
		var root, performedLoading, processed;

		if (arguments.length === 10) {
			performedLoading = arguments[7] instanceof Boolean ? arguments[7] : false;
			root = arguments[8];
			processed = arguments[9];
		}
		else {
			performedLoading = false;
			root = target;
			processed = [];
		}

		// Ensure that the target is an array
		if (!(target instanceof Array)) {
			LazyLoader.eval(target, path, successCallback, errorCallback, scopeChain, thisPtr, LazyLoader.evalAll, performedLoading, root, processed);
			return;
		}
		// Ensure that the array is loaded, then continue
		else if (!LazyLoader.isLoaded(target)) {
			LazyLoader.load(target, null, function() {
				LazyLoader.evalAll(target, path, successCallback, errorCallback, scopeChain, thisPtr, LazyLoader.evalAll, performedLoading, root, processed);
			});
			return;
		}

		var signal = new Signal("evalAll - " + path);
		var results = [];
		var errors = [];
		var successCallbacks = [];
		var errorCallbacks = [];
		var allSucceeded = true;

		target.forEach(function(subTarget, i) {
			results.push(null);
			errors.push(null);
			successCallbacks.push(signal.pending(function(result, performedLoadingOne, rootOne) {
				performedLoading = performedLoading || performedLoadingOne;
				results[i] = result;
				if (root !== rootOne) {
					ExoWeb.trace.logWarning("lazyLoad", "Found different roots when evaluating all paths.");
				}
				root = rootOne;
			}));
			errorCallbacks.push(signal.orPending(function(err) {
				allSucceeded = false;
				errors[i] = err;
			}));
		});

		target.forEach(function(subTarget, i) {
			// Make a copy of the original path tokens for arrays so that items' processing don't affect one another.
			if (path instanceof PathTokens) {
				path = path.buildExpression();
			}
			LazyLoader.eval(subTarget, path, successCallbacks[i], errorCallbacks[i], scopeChain, thisPtr, LazyLoader.evalAll, performedLoading, root, processed.slice(0));
		});

		signal.waitForAll(function() {
			if (allSucceeded) {
				// call the success callback if one exists
				if (successCallback) {
					successCallback.apply(thisPtr || this, [results, performedLoading, root]);
				}
			}
			else if (errorCallback) {
				errorCallback.apply(thisPtr || this, [errors]);
			}
			else {
				errors.forEach(function(e) {
					throw new Error("Error encountered while attempting to eval paths for all items in the target array: " + e);
				});
			}
		});
	};

	LazyLoader.isLoaded = function LazyLoader$isLoaded(obj, propName) {
		if (obj === undefined || obj === null) {
			return;
		}

		var reg = obj._lazyLoader;

		if (!reg) {
			return true;
		}

		var loader;
		if (propName && reg.byProp) {
			loader = reg.byProp[propName];
		}

		if (!loader) {
			loader = reg.allProps;
		}

		return !loader || (!!loader.isLoaded && obj._lazyLoader.isLoaded(obj, propName));
	};

	LazyLoader.load = function LazyLoader$load(obj, propName, callback, thisPtr) {
		var reg = obj._lazyLoader;
		if (!reg) {
			if (callback && callback instanceof Function) {
				callback.call(thisPtr || this);
			}
		}
		else {
			var loader;
			if (propName && reg.byProp) {
				loader = reg.byProp[propName];
			}

			if (!loader) {
				loader = reg.allProps;
			}

			if (!loader) {
				ExoWeb.trace.throwAndLog(["lazyLoad"], "Attempting to load object but no appropriate loader is registered. object: {0}, property: {1}", [obj, propName]);
			}

			loader.load(obj, propName, callback, thisPtr);
		}
	};

	LazyLoader.isRegistered = function LazyLoader$isRegistered(obj, loader, propName) {
		var reg = obj._lazyLoader;

		if (!reg) {
			return false;
		}
		if (propName) {
			return reg.byProp && reg.byProp[propName] === loader;
		}

		return reg.allProps === loader;
	};

	LazyLoader.register = function LazyLoader$register(obj, loader, propName) {
		var reg = obj._lazyLoader;

		if (!reg) {
			reg = obj._lazyLoader = {};
		}

		if (propName) {
			if (!reg.byProp) {
				reg.byProp = {};
			}

			reg.byProp[propName] = loader;
		}
		else {
			obj._lazyLoader.allProps = loader;
		}
	};

	LazyLoader.unregister = function LazyLoader$unregister(obj, loader, propName) {
		var reg = obj._lazyLoader;

		if (!reg) {
			return;
		}

		if (propName) {
			delete reg.byProp[propName];
		} else if (reg.byProp) {
			var allDeleted = true;
			for (var p in reg.byProp) {
				if (reg.byProp[p] === loader) {
					delete reg.byProp[p];
				}
				else {
					allDeleted = false;
				}
			}

			if (allDeleted) {
				delete reg.byProp;
			}
		}

		if (reg.allProps === loader) {
			delete reg.allProps;
		}

		if (!reg.byProp && !reg.allProps) {
			delete obj._lazyLoader;
		}
	};

	ExoWeb.Model.LazyLoader = LazyLoader;

	// #endregion

	// #region ExoWeb.Model.Utilities
	//////////////////////////////////////////////////

	var coreGetValue = getValue;

	// If a getter method matching the given property name is found on the target it is invoked and returns the 
	// value, unless the the value is undefined, in which case null is returned instead.  This is done so that 
	// calling code can interpret a return value of undefined to mean that the property it requested does not exist.
	// TODO: better name
	getValue = function getValueOverride(target, property) {

		// first see if the property is a model property
		if (target instanceof ExoWeb.Model.Entity) {
			var prop = target.meta.type.property(property);
			if (prop) {
				var value = prop.value(target);
				if (value === undefined) {
					value = null;
				}
				return value;
			}
		}

		return coreGetValue(target, property);
	}

	ExoWeb.getValue = getValue;
	// #endregion

	// #region ExoWeb.Mapper.ObjectProvider
	//////////////////////////////////////////////////

	var objectProviderFn = function objectProviderFn(type, ids, paths, inScope, changes, onSuccess, onFailure) {
		throw new Error("Object provider has not been implemented.  Call ExoWeb.Mapper.setObjectProvider(fn);");
	};

	function objectProvider(type, ids, paths, inScope, changes, onSuccess, onFailure, thisPtr) {
		var scopeQueries;

		// ensure correct value of "scopeQueries" argument
		if (onSuccess !== undefined && onSuccess !== null && !(onSuccess instanceof Function)) {
			// scopeQueries is included in call, so shift arguments
			scopeQueries = onSuccess;
			onSuccess = onFailure;
			onFailure = thisPtr;
			thisPtr = arguments.length > 8 ? arguments[8] : null;
		}
		else {
			// scopeQueries is NOT included in call, so insert default value into args array
			scopeQueries = context.server._scopeQueries;
		}

		if (onFailure !== undefined && onFailure !== null && !(onFailure instanceof Function)) {
			thisPtr = onFailure;
			onFailure = null;
		}

		var batch = ExoWeb.Batch.suspendCurrent("objectProvider");
		objectProviderFn.call(this, type, ids, paths, inScope, changes, scopeQueries,
			function objectProviderSuccess() {
				ExoWeb.Batch.resume(batch);
				if (onSuccess) onSuccess.apply(thisPtr || this, arguments);
			},
			function objectProviderFailure() {
				ExoWeb.Batch.resume(batch);
				if (onFailure) onFailure.apply(thisPtr || this, arguments);
			});
	}
	ExoWeb.Mapper.setObjectProvider = function setObjectProvider(fn) {
		objectProviderFn = fn;
	};

	// #endregion

	// #region ExoWeb.Mapper.QueryProvider
	//////////////////////////////////////////////////

	var queryProviderFn = function queryProviderFn(queries, changes, onSuccess, onFailure) {
		throw new Error("Query provider has not been implemented.  Call ExoWeb.Mapper.setQueryProvider(fn);");
	};

	function queryProvider(queries, changes, onSuccess, onFailure, thisPtr) {
		var scopeQueries;

		// ensure correct value of "scopeQueries" argument
		if (!isFunction(onSuccess)) {
			// scopeQueries is included in call, so shift arguments
			scopeQueries = onSuccess;
			onSuccess = onFailure;
			onFailure = thisPtr;
			thisPtr = arguments.length > 5 ? arguments[5] : null;
		}
		else {
			// scopeQueries is NOT included in call, so insert default value into args array
			scopeQueries = context.server._scopeQueries;
		}

		if (!isFunction(onFailure)) {
			thisPtr = onFailure;
			onFailure = null;
		}

		var batch = ExoWeb.Batch.suspendCurrent("queryProvider");
		queryProviderFn.call(this, queries, changes, scopeQueries,
			function queryProviderSuccess() {
				ExoWeb.Batch.resume(batch);
				if (onSuccess) {
					onSuccess.apply(thisPtr || this, arguments);
				}
			},
			function queryProviderFailure() {
				ExoWeb.Batch.resume(batch);
				if (onFailure) {
					onFailure.apply(thisPtr || this, arguments);
				}
			});
	}

	ExoWeb.Mapper.setQueryProvider = function setQueryProvider(fn) {
		queryProviderFn = fn;
	};

	// #endregion

	// #region ExoWeb.Mapper.TypeProvider
	//////////////////////////////////////////////////

	var typeProviderFn = function typeProviderFn(types, onSuccess, onFailure) {
		throw new Error("Type provider has not been implemented.  Call ExoWeb.Mapper.setTypeProvider(fn);");
	};

	function typeProviderImpl(types, callback, thisPtr) {
		var batch = ExoWeb.Batch.suspendCurrent("typeProvider");

		var typesToLoad = copy(types);
		var cachedTypes = [];
		purge(typesToLoad, function(type) {
			var cachedType = ExoWeb.cache(type);

			if (!cachedType) {
				return false;
			}
			else if (ExoWeb.cacheHash && cachedType.cacheHash !== ExoWeb.cacheHash) {
				// the cached type definition is out of date, so remove it and continue
				ExoWeb.cache(type, null);
				return false;
			}

			cachedTypes.push(type);
			return true;
		});

		var typesJson = {};

		// If some (or all) of the types are currently cached, go ahead and call the success function.
		if (cachedTypes.length > 0) {
			cachedTypes.forEach(function(type) {
				typesJson[type] = ExoWeb.cache(type).types[type];
			});
		}

		if (typesToLoad.length > 0) {
			typeProviderFn.call(this, typesToLoad,
				function typeProviderSuccess(result) {
					ExoWeb.Batch.resume(batch);

					var resultsJson = result.types;

					// Add the resulting json and cache each type.
					eachProp(resultsJson, function(type) {

						// construct a json object, with the cachehash, for cacheing
						var json = { cacheHash: ExoWeb.cacheHash, types: {} };

						// extract the type definition
						json.types[type] = typesJson[type] = resultsJson[type];

						// cache the type
						ExoWeb.cache(type, json);

					});

					callback.call(thisPtr || this, true, typesJson);
				},
				function typeProviderFailure() {
					ExoWeb.Batch.resume(batch);

					var args = copy(arguments);
					args.splice(0, 0, false);
					callback.apply(thisPtr || this, args);
				});
		}
		else {
			ExoWeb.Batch.resume(batch);
			callback.call(thisPtr || this, true, typesJson);
		}
	}

	function deleteTypeJson(originalArgs, invocationArgs, callbackArgs) {
		// If type request was handled by another caller, then assume that typesFromJson will be called
		if (callbackArgs[0]) {
			callbackArgs.splice(1, 1, {}, callbackArgs[1]);
		}
	}

	var typeProvider = typeProviderImpl.dontDoubleUp({ callbackArg: 1, partitionedArg: 0, partitionedFilter: deleteTypeJson, memoize: true });

	ExoWeb.Mapper.setTypeProvider = function setTypeProvider(fn) {
		typeProviderFn = fn;
	};

	// #endregion

	// #region ExoWeb.Mapper.ListProvider
	//////////////////////////////////////////////////

	var listProviderFn = function listProvider(ownerType, ownerId, paths, changes, onSuccess, onFailure) {
		throw new Error("List provider has not been implemented.  Call ExoWeb.Mapper.setListProvider(fn);");
	};

	function listProvider(ownerType, ownerId, listProp, otherProps, changes, onSuccess, onFailure, thisPtr) {
		var scopeQueries;

		// ensure correct value of "scopeQueries" argument
		if (onSuccess !== undefined && onSuccess !== null && !(onSuccess instanceof Function)) {
			// scopeQueries is included in call, so shift arguments
			scopeQueries = onSuccess;
			onSuccess = onFailure;
			onFailure = thisPtr;
			thisPtr = arguments.length > 7 ? arguments[7] : null;
		}
		else {
			// scopeQueries is NOT included in call, so insert default value into args array
			scopeQueries = context.server._scopeQueries;
		}

		if (onFailure !== undefined && onFailure !== null && !(onFailure instanceof Function)) {
			thisPtr = onFailure;
			onFailure = null;
		}

		var batch = ExoWeb.Batch.suspendCurrent("listProvider");

		var listPath = ownerId == "static" ? ownerType + "." + listProp : listProp;
		var paths = [listPath];

		// prepend list prop to beginning of each other prop
		if (otherProps.length > 0) {
			Array.forEach(otherProps, function(p) {
				paths.push(listPath + "." + p);
			});
		}

		listProviderFn.call(this, ownerType, ownerId == "static" ? null : ownerId, paths, changes, scopeQueries,
			function listProviderSuccess() {
				ExoWeb.Batch.resume(batch);
				if (onSuccess) onSuccess.apply(thisPtr || this, arguments);
			},
			function listProviderFailure() {
				ExoWeb.Batch.resume(batch);
				if (onFailure) onFailure.apply(thisPtr || this, arguments);
			});
	}

	ExoWeb.Mapper.setListProvider = function setListProvider(fn) {
		listProviderFn = fn;
	};

	// #endregion

	// #region ExoWeb.Mapper.RoundtripProvider
	//////////////////////////////////////////////////

	var roundtripProviderFn = function roundtripProviderFn(changes, onSuccess, onFailure) {
		throw new Error("Roundtrip provider has not been implemented.  Call ExoWeb.Mapper.setRoundtripProvider(fn);");
	};

	function roundtripProvider(type, id, paths, changes, onSuccess, onFailure, thisPtr) {
		var scopeQueries;

		// ensure correct value of "scopeQueries" argument
		if (onSuccess !== undefined && onSuccess !== null && !(onSuccess instanceof Function)) {
			// scopeQueries is included in call, so shift arguments
			scopeQueries = onSuccess;
			onSuccess = onFailure;
			onFailure = thisPtr;
			thisPtr = arguments.length > 4 ? arguments[4] : null;
		}
		else {
			// scopeQueries is NOT included in call, so insert default value into args array
			scopeQueries = context.server._scopeQueries;
		}

		if (onFailure !== undefined && onFailure !== null && !(onFailure instanceof Function)) {
			thisPtr = onFailure;
			onFailure = null;
		}

		var batch = ExoWeb.Batch.suspendCurrent("roundtripProvider");
		roundtripProviderFn.call(this, type, id, paths, changes, scopeQueries,
			function roundtripProviderSucess() {
				ExoWeb.Batch.resume(batch);
				if (onSuccess) onSuccess.apply(thisPtr || this, arguments);
			},
			function roundtripProviderFailure() {
				ExoWeb.Batch.resume(batch);
				if (onFailure) onFailure.apply(thisPtr || this, arguments);
			});
	}

	ExoWeb.Mapper.setRoundtripProvider = function setRoundtripProvider(fn) {
		roundtripProviderFn = fn;
	};

	// #endregion

	// #region ExoWeb.Mapper.SaveProvider
	//////////////////////////////////////////////////

	var saveProviderFn = function saveProviderFn(root, changes, onSuccess, onFailure) {
		throw new Error("Save provider has not been implemented.  Call ExoWeb.Mapper.setSaveProvider(fn);");
	};

	function saveProvider(root, changes, onSuccess, onFailure, thisPtr) {
		var scopeQueries;

		// ensure correct value of "scopeQueries" argument
		if (onSuccess !== undefined && onSuccess !== null && !(onSuccess instanceof Function)) {
			// scopeQueries is included in call, so shift arguments
			scopeQueries = onSuccess;
			onSuccess = onFailure;
			onFailure = thisPtr;
			thisPtr = arguments.length > 5 ? arguments[5] : null;
		}
		else {
			// scopeQueries is NOT included in call, so insert default value into args array
			scopeQueries = context.server._scopeQueries;
		}

		if (onFailure !== undefined && onFailure !== null && !(onFailure instanceof Function)) {
			thisPtr = onFailure;
			onFailure = null;
		}

		var batch = ExoWeb.Batch.suspendCurrent("saveProvider");
		saveProviderFn.call(this, root, changes, scopeQueries,
			function saveProviderSuccess() {
				ExoWeb.Batch.resume(batch);
				if (onSuccess) onSuccess.apply(thisPtr || this, arguments);
			},
			function saveProviderFailure() {
				ExoWeb.Batch.resume(batch);
				if (onFailure) onFailure.apply(thisPtr || this, arguments);
			});
	}

	ExoWeb.Mapper.setSaveProvider = function setSaveProvider(fn) {
		saveProviderFn = fn;
	};

	// #endregion

	// #region ExoWeb.Mapper.EventProvider
	//////////////////////////////////////////////////

	var eventProviderFn = function eventProviderFn(eventType, instance, event, paths, changes, onSuccess, onFailure) {
		throw new Error("Event provider has not been implemented.  Call ExoWeb.Mapper.setEventProvider(fn);");
	};

	function eventProvider(eventType, instance, event, paths, changes, onSuccess, onFailure, thisPtr) {
		var scopeQueries;

		// ensure correct value of "scopeQueries" argument
		if (onSuccess !== undefined && onSuccess !== null && !(onSuccess instanceof Function)) {
			// scopeQueries is included in call, so shift arguments
			scopeQueries = onSuccess;
			onSuccess = onFailure;
			onFailure = thisPtr;
			thisPtr = arguments.length > 8 ? arguments[8] : null;
		}
		else {
			// scopeQueries is NOT included in call, so insert default value into args array
			scopeQueries = context.server._scopeQueries;
		}

		if (onFailure !== undefined && onFailure !== null && !(onFailure instanceof Function)) {
			thisPtr = onFailure;
			onFailure = null;
		}

		var batch = ExoWeb.Batch.suspendCurrent("eventProvider");
		eventProviderFn.call(this, eventType, instance, event, paths, changes, scopeQueries,
			function eventProviderSuccess() {
				ExoWeb.Batch.resume(batch);
				if (onSuccess) onSuccess.apply(thisPtr || this, arguments);
			},
			function eventProviderFailure() {
				ExoWeb.Batch.resume(batch);
				if (onFailure) onFailure.apply(thisPtr || this, arguments);
			});
	}

	ExoWeb.Mapper.setEventProvider = function setEventProvider(fn) {
		eventProviderFn = fn;
	};

	// #endregion

	// #region ExoWeb.Mapper.ResponseHandler
	//////////////////////////////////////////////////

	function ResponseHandler(model, serverSync, options) {
		if (options === undefined || options === null) {
			throw new Error("Options cannot be null or undefined.");
		}

		this._model = model;
		this._serverSync = serverSync;
		this._options = options;
	}

	ResponseHandler.mixin({
		execute: ExoWeb.FunctionChain.prepare(
			function ResponseHandler$startResponseBatch(callback, thisPtr) {
				/// <summary>
				/// Start a new response batch.
				/// </summary>

				this._batch = Batch.start("ResponseHandler");
				callback.call(thisPtr || this);
			},
			function ResponseHandler$setServerInfo(callback, thisPtr) {
				/// <summary>
				/// Set server info from JSON
				/// </summary>

				if (this._options.serverInfo) {
					this._serverSync.set_ServerInfo(this._options.serverInfo);
				}

				callback.call(thisPtr || this);
			},

			function ResponseHandler$loadTypes(callback, thisPtr) {
				/// <summary>
				/// Load types from JSON
				/// </summary>

				if (this._options.types) {
					for (var typeName in this._options.types) {
						var signal = new Signal("embeddedType(" + typeName + ")");

						// load type(s)
						var typesToUse = {};
						typesToUse[typeName] = this._options.types[typeName];
						typesFromJson(this._model, typesToUse);

						var mtype = this._model.type(typeName);

						// ensure base classes are loaded too
						mtype.eachBaseType(function (mtype) {
							if (!ExoWeb.Model.LazyLoader.isLoaded(mtype)) {
								ExoWeb.Model.LazyLoader.load(mtype, null, signal.pending());
							}
						});

						signal.waitForAll(function () {
							TypeLazyLoader.unregister(mtype);
							raiseExtensions(mtype);
						});
					}
				}

				callback.call(thisPtr || this);
			},

			function ResponseHandler$startQueueingEvents(callback, thisPtr) {
				/// <summary>
				/// Start queueing model events
				/// </summary>

				this._eventScope = new EventScope();
				callback.call(thisPtr || this);
			},

			function ResponseHandler$applyChanges(callback, thisPtr) {
				/// <summary>
				/// Apply changes from JSON
				/// </summary>

				if (this._options.changes) {
					if (this._options.changes) {
						this._serverSync.applyChanges(this._options.checkpoint, this._options.changes, this._options.source, null, this._options.beforeApply, this._options.afterApply, callback, thisPtr);
					}
					else {
						if (this._options.source) {
							// no changes, so record empty set
							this._serverSync._changeLog.start(this._options.source);
							this._serverSync._changeLog.start("client");
						}
						callback.call(thisPtr || this);
					}
				}
				else {
					callback.call(thisPtr || this);
				}
			},

			function ResponseHandler$loadInstances(callback, thisPtr) {
				/// <summary>
				/// Load instance data from JSON
				/// </summary>

				if (this._options.instances) {
					objectsFromJson(this._model, this._options.instances, function (instancesPendingInit) {
						this.instancesPendingInit = instancesPendingInit;
						callback.apply(thisPtr || this, arguments);
					}, this);
				}
				else {
					callback.call(thisPtr || this);
				}
			},

			function ResponseHandler$registerRules(callback, thisPtr) {
				/// <summary>
				/// Register all rules pending registration with the model
				/// </summary>

				this._model.registerRules();
				callback.call(thisPtr || this);
			},

			function ResponseHandler$stopQueueingEvents(callback, thisPtr) {
				/// <summary>
				/// Stop queueing model events
				/// </summary>

				this._eventScope.exit();
				callback.call(thisPtr || this);
			},

			function ResponseHandler$initInstances(callback, thisPtr) {
				/// <summary>
				/// Initialize all instances loaded by the response
				/// </summary>

				// Raise init events for existing instances loaded by the response
				if (this.instancesPendingInit) {
					this.instancesPendingInit.forEach(function (obj) {
						for (var t = obj.meta.type; t; t = t.baseType) {
							var handler = t._getEventHandler("initExisting");
							if (handler)
								handler(obj, {});
						}
					});
				}

				callback.call(thisPtr || this);
			},

			function ResponseHandler$loadConditions(callback, thisPtr) {
				/// <summary>
				/// Load conditions from JSON
				/// </summary>

				if (this._options.conditions) {
					conditionsFromJson(this._model, this._options.conditions, this.instancesPendingInit, callback, thisPtr);
				}
				else {
					callback.call(thisPtr || this);
				}
			},

			function ResponseHandler$endResponseBatch(callback, thisPtr) {
				/// <summary>
				/// End the response batch.
				/// </summary>

				Batch.end(this._batch);
				callback.call(thisPtr || this);
			}
		)
	});

	ExoWeb.Mapper.ResponseHandler = ResponseHandler;

	// #endregion

	// #region ExoWeb.Mapper.Translation
	//////////////////////////////////////////////////

	// Gets or loads the entity with the specified typed string id
	Entity.fromIdString = function Entity$fromIdString(id) {
		var ids = id.split("|");
		var jstype = ExoWeb.Model.Model.getJsType(ids[0]);
		var obj = jstype.meta.get(ids[1]);

		if (!obj) {
			obj = new jstype(ids[1]);
			ObjectLazyLoader.register(obj);
		}

		return obj;
	};

	function toExoModel(val, translator) {
		if (val === undefined || val === null)
			return;

		// entities only: translate forward to the server's id
		if (val instanceof ExoWeb.Model.Entity) {
			var result = {
				id: val.meta.id,
				type: val.meta.type.get_fullName()
			};

			if (val.meta.isNew) {
				result.isNew = true;
			}

			result.id = translator.forward(result.type, result.id) || result.id;
			return result;
		}

		return val;
	}

	function translateId(translator, type, id) {
		// get the server id, either translated or as the serialized entity id itself
		var serverId = translator.forward(type, id) || id;
		// get the client id, either a reverse translation of the server id or the server id itself
		var clientId = translator.reverse(type, serverId) || serverId;

		return clientId;
	}

	function fromExoModel(val, translator, create, supplementalObjectsArray) {
		if (val !== undefined && val !== null && val.type && val.id ) {
			var type = ExoWeb.Model.Model.getJsType(val.type);

			// Entities only: translate back to the client's id.  This is necessary to handle the fact that ids are created on 
			// both the client and server.  Also, in some cases a transaction references an entity that was created on the server 
			// and then committed, so that the id actually references an object that already exists on the client but with a different id.
			//--------------------------------------------------------------------------------------------------------
			if (type.meta && type.meta instanceof ExoWeb.Model.Type && translator) {
				// don't alter the original object
				var id = translateId(translator, val.type, val.id);

				var obj = type.meta.get(id);

				// If the object was not found and a supplemental list was provided, then search for it
				if (!obj && supplementalObjectsArray && supplementalObjectsArray.length > 0) {
					var matches = supplementalObjectsArray.filter(function(o) {
						return o instanceof type && o.meta.id === id;
					});
					if (matches.length > 1) {
						throw ExoWeb.trace.logError("translator", "Expected a single item, but found " + matches.length + ".");
					}
					obj = matches[0];
				}

				if (!obj && create) {
					obj = new type(id);
					ObjectLazyLoader.register(obj);
					ExoWeb.trace.log(["entity", "server"], "{0}({1})  (ghost)", [type.meta.get_fullName(), id]);
				}

				return obj;
			}

			// is this needed? Can the if statement that checks type.meta be removed?
			return val;
		}

		return val;
	}

	// #endregion

	// #region ExoWeb.Mapper.ExoModelEventListener
	//////////////////////////////////////////////////

	function ExoModelEventListener(model, translator, filters) {
		this._model = model;
		this._translator = translator;
		this._filters = filters;

		// listen for events
		model.addListChanged(this.onListChanged.bind(this));
		model.addAfterPropertySet(this.onPropertyChanged.bind(this));
		model.addObjectRegistered(this.onObjectRegistered.bind(this));
		model.addObjectUnregistered(this.onObjectUnregistered.bind(this));
	}

	ExoModelEventListener.mixin(ExoWeb.Functor.eventing);

	ExoModelEventListener.mixin({
		addChangeDetected: function ExoModelEventListener$onEvent(handler) {
			this._addEvent("changeDetected", handler);
		},

		// Model event handlers
		onListChanged: function ExoModelEventListener$onListChanged(obj, property, listChanges) {
			if (this._filters && this._filters.listChanged && this._filters.listChanged(obj, property, listChanges) !== true)
				return;

			for (var i = 0; i < listChanges.length; ++i) {
				var listChange = listChanges[i];

				var change = {
					type: "ListChange",
					instance: toExoModel(obj, this._translator),
					property: property.get_name(),
					added: [],
					removed: []
				};

				var _this = this;
				if (listChange.newStartingIndex >= 0 || listChange.newItems) {
					Array.forEach(listChange.newItems, function ExoModelEventListener$onListChanged$addedItem(obj) {
						change.added.push(toExoModel(obj, _this._translator));
					});
				}
				if (listChange.oldStartingIndex >= 0 || listChange.oldItems) {
					Array.forEach(listChange.oldItems, function ExoModelEventListener$onListChanged$removedItem(obj) {
						change.removed.push(toExoModel(obj, _this._translator));
					});
				}

				this._raiseEvent("changeDetected", [change]);
			}
		},
		onObjectRegistered: function ExoModelEventListener$onObjectRegistered(obj) {
			if (this._filters && this._filters.objectRegistered && this._filters.objectRegistered(obj) !== true)
				return;

			if (obj.meta.isNew) {
				var change = {
					type: "InitNew",
					instance: toExoModel(obj, this._translator)
				};

				this._raiseEvent("changeDetected", [change]);
			}
		},
		onObjectUnregistered: function ExoModelEventListener$onObjectUnregistered(obj) {
			if (this._filters && this._filters.objectUnregistered && this._filters.objectUnregistered(obj) !== true)
				return;

			if (obj.meta.type.get_origin() === "server") {
				ExoWeb.trace.throwAndLog("server", "Unregistering server-type objects is not currently supported: {0}({1})", obj.meta.type.fullName, obj.meta.id);
			}
		},
		onPropertyChanged: function ExoModelEventListener$onPropertyChanged(obj, property, newValue, oldValue) {
			if (this._filters && this._filters.propertyChanged && this._filters.propertyChanged(obj, property, newValue, oldValue) !== true)
				return;

			if (property.get_isValueType()) {
				var valueChange = {
					type: "ValueChange",
					instance: toExoModel(obj, this._translator),
					property: property.get_name(),
					oldValue: oldValue,
					newValue: newValue
				};

				this._raiseEvent("changeDetected", [valueChange]);
			}
			else {
				var refChange = {
					type: "ReferenceChange",
					instance: toExoModel(obj, this._translator),
					property: property.get_name(),
					oldValue: toExoModel(oldValue, this._translator),
					newValue: toExoModel(newValue, this._translator)
				};

				this._raiseEvent("changeDetected", [refChange]);
			}
		}
	});

	ExoWeb.Mapper.ExoModelEventListener = ExoModelEventListener;

	// #endregion

	// #region ExoWeb.Mapper.ChangeSet
	//////////////////////////////////////////////////

	function ChangeSet(source, initialChanges) {
		if (!source || source.constructor !== String) {
			ExoWeb.trace.throwAndLog("changeLog", "Creating a change set requires a string source argument.");
		}

		this._source = source;
		this._changes = (initialChanges && initialChanges instanceof Array) ?
			[].concat(initialChanges) :
			[];
	}

	ChangeSet.mixin(Functor.eventing);

	ChangeSet.mixin({
		add: function(change) {
			var idx = this._changes.push(change) - 1;
			this._raiseEvent("changeAdded", [change, idx, this]);
			return idx;
		},
		addChangeAdded: function(fn, filter, once) {
			this._addEvent("changeAdded", fn, filter, once);
		},
		addChangeUndone: function(fn, filter, once) {
			this._addEvent("changeUndone", fn, filter, once);
		},
		addTruncated: function(fn, filter, once) {
			this._addEvent("truncated", fn, filter, once);
		},
		changes: function() {
			return this._changes;
		},
		checkpoint: function(title, code) {
			// Generate a random code for the checkpoint if one is not given.
			if (!code) {
				code = randomText(10);
			}

			// Add the checkpoint and return the code.
			this.add({ type: "Checkpoint", title: title || "untitled", code: code });
			return code;
		},
		count: function (filter, thisPtr) {
			if (!filter) {
				return this._changes.length;
			}

			return this._changes.filter(filter, thisPtr).length;
		},
		lastChange: function() {
			return this._changes.length > 0 ? this._changes[this._changes.length - 1] : null;
		},
		serialize: function(filter, thisPtr) {
			return {
				source: (this._source === "init" || this._source === "client") ? this._source : "server",
				changes: filter ? 
					this._changes.filter(filter, thisPtr) :
					Array.prototype.slice.call(this._changes)
			};
		},
		source: function() {
			return this._source;
		},
		truncate: function(checkpoint, filter, thisPtr) {
			// Allow calling as function(filter, thisPtr)
			if (checkpoint && Object.prototype.toString.call(checkpoint) === "[object Function]") {
				thisPtr = filter;
				filter = checkpoint;
				checkpoint = null;
			}

			// Wrap custom filter if a checkpoint is given.
			if (checkpoint) {
				var foundCheckpoint = false;
				var customFilter = filter;
				filter = function(change) {
					// Check to see if this is the checkpoint we're looking for.
					if (change.type === "Checkpoint" && change.code === checkpoint)
						foundCheckpoint = true;

					// Stop truncating when the checkpoint is found.
					if (foundCheckpoint === true)
						return false;

					// Delegate to custom filter if one is given.
					return customFilter ? customFilter.apply(this, arguments) : true;
				};
			}

			// Discard all changes that match the given filter
			var numRemoved;
			if (filter) {
				var removedAt = this._changes.purge(filter, thisPtr);
				numRemoved = removedAt ? removedAt.length : 0;
			}
			else {
				numRemoved = this._changes.length;
				this._changes.clear();
			}

			this._raiseEvent("truncated", [numRemoved, this]);
			return numRemoved;
		},
		undo: function() {
			if (this._changes.length > 0) {
				var lastIdx = this._changes.length - 1;
				var change = this._changes[lastIdx];
				this._changes.splice(lastIdx, 1);
				this._raiseEvent("changeUndone", [change, lastIdx, this]);
				return change;
			}

			return null;
		}
	});

	// #endregion

	// #region ExoWeb.Mapper.ChangeLog
	//////////////////////////////////////////////////

	function ChangeLog() {
		this._activeSet = null;
		this._sets = [];
	}

	ChangeLog.mixin(Functor.eventing);

	ChangeLog.mixin({
		activeSet: function () {
			// Returns the active change set.

			return this._activeSet;
		},
		add: function (change) {
			// Adds a new change to the log.

			if (this._activeSet === null) {
				throw new Error("The change log is not currently active.");
			}

			var idx = this._activeSet.add(change);

			this._raiseEvent("changeAdded", [change, idx, this._activeSet, this]);

			return idx;
		},
		addChangeAdded: function (fn, filter, once) {
			this._addEvent("changeAdded", fn, filter, once);
		},
		addChangeSetStarted: function (fn, filter, once) {
			this._addEvent("changeSetStarted", fn, filter, once);
		},
		addChangeUndone: function (fn, filter, once) {
			this._addEvent("changeUndone", fn, filter, once);
		},
		addSet: function (source, changes) {
			this._sets.push(new ChangeSet(source, changes));
		},
		addTruncated: function (fn, filter, once) {
			this._addEvent("truncated", fn, filter, once);
		},
		checkpoint: function (title, code) {
			if (this._activeSet && this._sets.some(function (s) { return s.changes().length > 0; })) {
				return this._activeSet.checkpoint(title, code);
			}
		},
		count: function (filter, thisPtr) {
			var result = 0;
			forEach(this._sets, function (set) {
				result += set.count(filter, thisPtr);
			}, this);
			return result;
		},
		lastChange: function () {
			for (var i = this._sets.length - 1; i >= 0; i--) {
				var set = this._sets[i];
				var change = set.lastChange();
				if (change !== null && change !== undefined) {
					return change;
				}
			}

			return null;
		},
		serialize: function (filter, thisPtr) {
			// Serializes the log and it's sets, including
			// those changes that pass the given filter.

			return this._sets.map(function (set) {
				return set.serialize(filter, thisPtr);
			});
		},
		set: function (index) {
			if (index === null || index === undefined || Object.prototype.toString.call(index) !== "[object Number]") {
				throw Error("The set method expects a numeric index argument.");
			}

			var idx = index < 0 ? (this._sets.length + index) : index;
			return this._sets[idx];
		},
		sets: function () {
			// Returns the current list of sets.

			return this._sets;
		},
		start: function (source) {
			// Starts a new change set, which means that new changes will
			// be added to the new set from this point forward.

			if (!source || source.constructor !== String) {
				throw ExoWeb.trace.logError("changeLog", "ChangeLog.start requires a string source argument.");
			}

			var set = new ChangeSet(source);
			var idx = this._sets.push(set) - 1;
			this._activeSet = set;

			this._raiseEvent("changeSetStarted", [set, idx, this]);

			return set;
		},
		truncate: function (checkpoint, filter, thisPtr) {
			// Removes all change sets where all changes match the given
			// filter.  If a set contains one or more changes that do NOT
			// match, the set is left intact with those changes.

			// Allow calling as function(filter, thisPtr)
			if (checkpoint && Object.prototype.toString.call(checkpoint) === "[object Function]") {
				thisPtr = filter;
				filter = checkpoint;
				checkpoint = null;
			}

			var numRemoved = 0;
			var foundCheckpoint = false;

			for (var i = 0; i < this._sets.length; i++) {
				if (checkpoint) {
					foundCheckpoint = this._sets[i].changes().some(function (c) {
						return c.type === "Checkpoint" && c.code === checkpoint;
					});
				}

				numRemoved += this._sets[i].truncate(checkpoint, filter, thisPtr);

				// If all changes have been removed (or all but the given checkpoint) then discard the set
				if (this._sets[i].changes().length === 0) {
					this._sets.splice(i--, 1);
					if (this._sets[i] === this._activeSet) {
						this._activeSet = null;
					}
				}

				if (foundCheckpoint)
					break;
			}

			// Start a new change set
			this.start("client");

			this._raiseEvent("truncated", [numRemoved, this]);
			return numRemoved;
		},
		undo: function () {
			if (!this._activeSet) {
				ExoWeb.trace.throwAndLog("server", "The change log is not currently active.");
			}

			var currentSet = this._activeSet,
				currentSetIndex = this._sets.indexOf(currentSet);

			while (currentSet.changes().length === 0) {
				// remove the set from the log
				this._sets.splice(currentSetIndex, 1);

				if (--currentSetIndex < 0) {
					return null;
				}

				currentSet = this._sets[currentSetIndex];
				this._activeSet = currentSet;
			}

			var idx = currentSet.changes().length - 1;
			var change = currentSet.undo();

			this._raiseEvent("changeUndone", [change, idx, currentSet, this]);

			return change;
		}
	});

	// #endregion

	// #region ExoWeb.Mapper.ServerSync
	//////////////////////////////////////////////////

	/// <reference path="../core/Array.js" />
	/// <reference path="../core/Function.js" />
	/// <reference path="../core/Signal.js" />

	function ServerSync(model) {
		if (!model || typeof(model) !== "object" || !(model instanceof ExoWeb.Model.Model)) {
			throw ExoWeb.trace.logError("server", "A model must be specified when constructing a ServerSync object.");
		}

		this._changeLog = new ChangeLog();
		this._pendingServerEvent = false;
		this._pendingRoundtrip = false;
		this._pendingSave = false;
		this._scopeQueries = [];
		this._objectsExcludedFromSave = [];
		this._objectsDeleted = [];
		this._translator = new ExoWeb.Translator();
		this._serverInfo = null;

		// define properties
		Object.defineProperty(this, "model", { value: model });

		function isDeleted(obj, isChange) {
			if (Array.contains(this._objectsDeleted, obj)) {
				if (isChange) {
					ExoWeb.trace.logWarning("server", "Object {0}({1}) was changed but has been deleted.", obj.meta.type.get_fullName(), obj.meta.id);
				}
				return true;
			}
			return false;
		}

		// don't record changes to types that didn't originate from the server
		function filterObjectEvent(obj) {
			return !isDeleted.apply(this, [obj, false]) && obj.meta.type.get_origin() === "server";
		}

		// don't record changes to types or properties that didn't originate from the server
		function filterPropertyEvent(obj, property) {
			return !isDeleted.apply(this, [obj, true]) && property.get_containingType().get_origin() === "server" && property.get_origin() === "server" && !property.get_isStatic();
		}

		this._listener = new ExoModelEventListener(this.model, this._translator, {
			listChanged: filterPropertyEvent.bind(this),
			propertyChanged: filterPropertyEvent.bind(this),
			objectRegistered: filterObjectEvent.bind(this),
			objectUnregistered: filterObjectEvent.bind(this)
		});

		var applyingChanges = 0;
		this.isApplyingChanges = function ServerSync$isApplyingChanges() {
			return applyingChanges > 0;
		};
		this.beginApplyingChanges = function ServerSync$beginApplyingChanges() {
			applyingChanges++;
		};
		this.endApplyingChanges = function ServerSync$endApplyingChanges() {
			applyingChanges--;

			if (applyingChanges < 0)
				ExoWeb.trace.throwAndLog("Error in transaction log processing: unmatched begin and end applying changes.");
		};

		var isCapturingChanges;
		this.isCapturingChanges = function ServerSync$isCapturingChanges() {
			return isCapturingChanges === true;
		};
		this.beginCapturingChanges = function ServerSync$beginCapturingChanges() {
			if (!isCapturingChanges) {
				isCapturingChanges = true;
				this._changeLog.start("client");
			}
		};

		this.ignoreChanges = function(before, callback, after, thisPtr) {
			return function() {
				var beforeCalled = false;

				try {
					applyingChanges++;

					if (before && before instanceof Function)
						before();
				
					beforeCalled = true;

					callback.apply(thisPtr || this, arguments);
				}
				finally {
					applyingChanges--;
				
					if (beforeCalled === true && after && after instanceof Function)
						after();
				}
			};
		};

		model.addObjectRegistered(function(obj) {
			// if an existing object is registered then register for lazy loading
			if (!obj.meta.isNew && obj.meta.type.get_origin() == "server" && isCapturingChanges === true && !applyingChanges) {
				ObjectLazyLoader.register(obj);
				//ExoWeb.trace.log(["entity", "server"], "{0}({1})  (ghost)", [obj.meta.type.get_fullName(), obj.meta.id]);
			}
		});

		// Assign back reference
		Object.defineProperty(model, "server", { value: this });

		this._listener.addChangeDetected(this._captureChange.bind(this));

		Observer.makeObservable(this);
	}

	function isPropertyChangePersisted(change) {
		if (change.property) {
			var jstype = ExoWeb.Model.Model.getJsType(change.instance.type, true);
			if (jstype) {
				var prop = jstype.meta.property(change.property);
				// Can't save non-persisted properties
				if (!prop.get_isPersisted()) {
					return false;
				}
			}
		}
		return true;
	}

	ServerSync.mixin(Functor.eventing);

	var pendingRequests = 0;

	registerActivity("ServerSync: request", function() {
		return pendingRequests > 0;
	});

	function serializeChanges(includeAllChanges, simulateInitRoot) {
		var changes = this._changeLog.serialize(includeAllChanges ? this.canSend : this.canSave, this);

		// temporary HACK (no, really): splice InitNew changes into init transaction
		if (simulateInitRoot && simulateInitRoot.meta.isNew) {
			function isRootInitChange(change) {
				return change.type === "InitNew" && change.instance.type === simulateInitRoot.meta.type.get_fullName() &&
					(change.instance.id === simulateInitRoot.meta.id || this._translator.reverse(change.instance.type, change.instance.id) === simulateInitRoot.meta.id);
			}

			var found = false;
			var initSet = changes.filter(function(set) { return set.source === "init"; })[0];
			if (!initSet || !initSet.changes.some(isRootInitChange, this)) {
				changes.forEach(function(set) {
					if (found === true) return;
					set.changes.forEach(function(change, index) {
						if (found === true) return;
						else if (isRootInitChange.call(this, change)) {
							set.changes.splice(index, 1);
							if (!initSet) {
								initSet = { changes: [change], source: "init" };
								changes.splice(0, 0, initSet);
							}
							else {
								initSet.changes.push(change);
							}
							found = true;
						}
					}, this);
				}, this);
			}
		}

		return changes;
	}

	// when ServerSync is made singleton, this data will be referenced via closure
	function ServerSync$addScopeQuery(query) {
		this._scopeQueries.push(query);
	}

	function ServerSync$storeInitChanges(changes) {
		var activeSet = this._changeLog.activeSet();

		this._changeLog.addSet("init", changes);

		if (activeSet) {
			this._changeLog.start(activeSet.source());
		}
	}

	function ServerSync$retroactivelyFixChangeWhereIdChanged(changeInstance, obj) {
		// Update change to reflect the object's new id if it is referencing a legacy id
		if (changeInstance.id === obj.meta.legacyId) {
			changeInstance.id = obj.meta.id;
			changeInstance.isNew = false;
		}
	}

	ServerSync.mixin({
		// Enable/disable save & related functions
		///////////////////////////////////////////////////////////////////////
		enableSave: function ServerSync$enableSave(obj) {
			if (!(obj instanceof ExoWeb.Model.Entity)) {
				ExoWeb.trace.throwAndLog("server", "Can only enableSave on entity objects.");
			}

			if (Array.contains(this._objectsExcludedFromSave, obj)) {
				var oldPendingChanges;
				if (this._saveRoot) {
					// If autosave is enabled then determine if we need to queue a timeout
					oldPendingChanges = this.changes(false, this._saveRoot, true);
				}
				Array.remove(this._objectsExcludedFromSave, obj);
				Observer.raisePropertyChanged(this, "HasPendingChanges");

				// Determine if ther are now pending changes
				if (oldPendingChanges && oldPendingChanges.length === 0 && this._saveInterval && !this._saveTimeout) {
					if (this.changes(false, this._saveRoot, true).length > 0) {
						this._queueAutoSave();
					}
				}
				return true;
			}
		},
		disableSave: function ServerSync$disableSave(obj) {
			if (!(obj instanceof ExoWeb.Model.Entity)) {
				ExoWeb.trace.throwAndLog("server", "Can only disableSave on entity objects.");
			}

			if (!Array.contains(this._objectsExcludedFromSave, obj)) {
				var oldPendingChanges;
				if (this._saveRoot) {
					// If autosave is enabled then determine if we need to queue a timeout
					oldPendingChanges = this.changes(false, this._saveRoot, true);
				}
				this._objectsExcludedFromSave.push(obj);
				Observer.raisePropertyChanged(this, "HasPendingChanges");

				// Determine if ther are no longer pending changes
				if (oldPendingChanges && oldPendingChanges.length > 0 && this._saveInterval && this._saveTimeout) {
					if (this.changes(false, this._saveRoot, true).length === 0) {
						window.clearTimeout(this._saveTimeout);
						this._saveTimeout = null;
					}
				}
				return true;
			}
		},
		notifyDeleted: function ServerSync$notifyDeleted(obj) {
			if (!(obj instanceof ExoWeb.Model.Entity)) {
				throw ExoWeb.trace.logError("server", "Notified of deleted object that is not an entity.");
			}

			if (!Array.contains(this._objectsDeleted, obj)) {
				this._objectsDeleted.push(obj);
				return true;
			}
		},
		canSend: function (change) {
			if (change.type === "Checkpoint") return false;

			// Don't send changes to calculated properties since they can be reproduced at any point when accessed.
			if (change.type === "ListChange" || change.type === "ReferenceChange" || change.type === "ValueChange") {
				var jstype = ExoWeb.Model.Model.getJsType(change.instance.type, true);
				if (jstype && LazyLoader.isLoaded(jstype.meta) && jstype.meta.property(change.property).get_isCalculated()) {
					return false;
				}
			}

			return true;
		},
		canSaveObject: function ServerSync$canSaveObject(objOrMeta) {
			var obj;
			var errorFmt = "Unable to test whether object can be saved:  {0}.";

			if (arguments.length === 0) {
				ExoWeb.trace.throwAndLog("server", errorFmt, ["argument not given"]);
			}
			else if (objOrMeta === undefined || objOrMeta === null) {
				ExoWeb.trace.throwAndLog("server", errorFmt, ["argument is null or undefined"]);
			}
			else if (objOrMeta instanceof ExoWeb.Model.ObjectMeta) {
				obj = objOrMeta._obj;
			}
			else if (objOrMeta instanceof ExoWeb.Model.Entity) {
				obj = objOrMeta;
			}
			else {
				ExoWeb.trace.throwAndLog("server", errorFmt, ["argument is not of correct type"]);
			}

			return !Array.contains(this._objectsExcludedFromSave, obj) && !Array.contains(this._objectsDeleted, obj);
		},
		canSave: function ServerSync$canSave(change) {

			// Can't save changes that can't be sent to the server at all.
			if (!this.canSend(change)) return false;

			// For list changes additionally check added and removed objects.
			if (change.type === "ListChange") {
				if (change.added.length > 0 || change.removed.length > 0) {
					var ignore = true;

					// Search added and removed for an object that can be saved.
					Array.forEach(change.added, function (item) {
						// if the type doesn't exist then obviously the instance doesn't either
						var jstype = ExoWeb.Model.Model.getJsType(item.type, true);
						if (!jstype) {
							ignore = false;
						}
						else {
							var obj = fromExoModel(item, this._translator, false, this._objectsDeleted);
							// Only objects that exist can be disabled
							if (!obj || this.canSaveObject(obj)) {
								ignore = false;
							}
						}
					}, this);
					Array.forEach(change.removed, function (item) {
						// if the type doesn't exist then obviously the instance doesn't either
						var jstype = ExoWeb.Model.Model.getJsType(item.type, true);
						if (!jstype) {
							ignore = false;
						}
						else {
							var obj = fromExoModel(item, this._translator, false, this._objectsDeleted);
							if (!obj || this.canSaveObject(obj)) {
								ignore = false;
							}
						}
					}, this);

					// If no "savable" object was found in added or 
					// removed then this change cannot be saved.
					if (ignore) {
						return false;
					}
				}
			}
			// For reference changes additionally check oldValue/newValue
			else if (change.type === "ReferenceChange") {
				var oldJsType = change.oldValue && ExoWeb.Model.Model.getJsType(change.oldValue.type, true);
				if (oldJsType) {
					var oldValue = fromExoModel(change.oldValue, this._translator, false, this._objectsDeleted);
					if (oldValue && !this.canSaveObject(oldValue)) {
						return false;
					}
				}

				var newJsType = change.newValue && ExoWeb.Model.Model.getJsType(change.newValue.type, true);
				if (newJsType) {
					var newValue = fromExoModel(change.newValue, this._translator, false, this._objectsDeleted);
					if (newValue && !this.canSaveObject(newValue)) {
						return false;
					}
				}
			}

			// if the type doesn't exist then obviously the instance doesn't either
			var jstype = ExoWeb.Model.Model.getJsType(change.instance.type, true);
			if (!jstype) {
				return true;
			}

			// Ensure that the instance that the change pertains to can be saved.
			var instanceObj = fromExoModel(change.instance, this._translator, false, this._objectsDeleted);
			return !instanceObj || this.canSaveObject(instanceObj);
		},

		_handleResult: function ServerSync$_handleResult(result, source, checkpoint, callbackOrOptions) {
			var callback, beforeApply, afterApply;

			if (callbackOrOptions instanceof Function) {
				callback = callbackOrOptions;
			}
			else {
				callback = callbackOrOptions.callback;
				beforeApply = callbackOrOptions.beforeApply;
				afterApply = callbackOrOptions.afterApply;
			}

			var handler = new ResponseHandler(this.model, this, {
				instances: result.instances,
				conditions: result.conditions,
				types: result.types && result.types instanceof Array ? null : result.types,
				changes: result.changes,
				source: source,
				checkpoint: checkpoint,
				serverInfo: result.serverInfo,
				beforeApply: beforeApply,
				afterApply: afterApply
			});

			handler.execute(callback, this);
		},

		// General events methods
		///////////////////////////////////////////////////////////////////////
		_raiseBeginEvents: function (method, args) {
			this._raiseEvent(method + "Begin", [this, args]);
			this._raiseEvent("requestBegin", [this, args]);
		},
		_raiseEndEvents: function (method, result, args) {
			this._raiseEvent(method + result, [this, args]);
			this._raiseEvent("request" + result, [this, args]);
			this._raiseEvent(method + "End", [this, args]);
			this._raiseEvent("requestEnd", [this, args]);
		},
		addRequestBegin: function (handler) {
			this._addEvent("requestBegin", handler);
		},
		removeRequestBegin: function (handler) {
			this._removeEvent("requestBegin", handler);
		},
		addRequestEnd: function (handler) {
			this._addEvent("requestEnd", handler);
		},
		removeRequestEnd: function (handler) {
			this._removeEvent("requestEnd", handler);
		},
		addRequestSuccess: function (handler) {
			this._addEvent("requestSuccess", handler);
		},
		removeRequestSuccess: function (handler) {
			this._removeEvent("requestSuccess", handler);
		},
		addRequestFailed: function (handler) {
			this._addEvent("requestFailed", handler);
		},
		removeRequestFailed: function (handler) {
			this._removeEvent("requestFailed", handler);
		},

		// Raise Server Event
		///////////////////////////////////////////////////////////////////////
		raiseServerEvent: function ServerSync$raiseServerEvent(name, instance, event, includeAllChanges, success, failed, paths) {
			pendingRequests++;

			// Checkpoint the log to ensure that we only truncate changes that were saved.
			var checkpoint = this._changeLog.checkpoint("server event " + name + " " + (new Date()).format("d"));

			Observer.setValue(this, "PendingServerEvent", true);

			var args = { type: "raiseServerEvent", eventTarget: instance, eventName: name, eventRaised: event, checkpoint: checkpoint, includeAllChanges: includeAllChanges };
			this._raiseBeginEvents("raiseServerEvent", args);

			// if no event object is provided then use an empty object
			if (event === undefined || event === null) {
				event = {};
			}

			for (var key in event) {
				var arg = event[key];

				if (arg instanceof Array) {
					event[key] = arg.map(function (a) { return toExoModel(a, this._translator); }, this);
				}
				else {
					event[key] = toExoModel(arg, this._translator);
				}
			}

			eventProvider(
				name,
				toExoModel(instance, this._translator),
				event,
				paths,
			// If includeAllChanges is true, then use all changes including those 
			// that should not be saved, otherwise only use changes that can be saved.
				serializeChanges.call(this, includeAllChanges, instance),
				this._onRaiseServerEventSuccess.bind(this).appendArguments(args, checkpoint, success),
				this._onRaiseServerEventFailed.bind(this).appendArguments(args, failed || success)
			);
		},
		_onRaiseServerEventSuccess: function ServerSync$_onRaiseServerEventSuccess(result, args, checkpoint, callback) {
			Observer.setValue(this, "PendingServerEvent", false);

			args.responseObject = result;

			this._handleResult(result, args.eventName, checkpoint, function () {
				var event = result.events[0];
				if (event instanceof Array) {
					for (var i = 0; i < event.length; ++i) {
						event[i] = fromExoModel(event[i], this._translator, true);
					}
				}
				else {
					event = fromExoModel(event, this._translator, true);
				}

				restoreDates(event);

				result.event = event;
				args.eventResponse = event;

				this._raiseEndEvents("raiseServerEvent", "Success", args);

				if (callback && callback instanceof Function)
					callback.call(this, result);

				pendingRequests--;
			});
		},
		_onRaiseServerEventFailed: function ServerSync$_onRaiseServerEventFailed(error, args, callback) {
			Observer.setValue(this, "PendingServerEvent", false);

			args.error = error;

			this._raiseEndEvents("raiseServerEvent", "Failed", args);

			if (callback && callback instanceof Function)
				callback.call(this, error);

			pendingRequests--;
		},
		addRaiseServerEventBegin: function (handler) {
			this._addEvent("raiseServerEventBegin", handler);
		},
		removeRaiseServerEventBegin: function (handler) {
			this._removeEvent("raiseServerEventBegin", handler);
		},
		addRaiseServerEventEnd: function (handler) {
			this._addEvent("raiseServerEventEnd", handler);
		},
		removeRaiseServerEventEnd: function (handler) {
			this._removeEvent("raiseServerEventEnd", handler);
		},
		addRaiseServerEventSuccess: function (handler) {
			this._addEvent("raiseServerEventSuccess", handler);
		},
		removeRaiseServerEventSuccess: function (handler) {
			this._removeEvent("raiseServerEventSuccess", handler);
		},
		addRaiseServerEventFailed: function (handler) {
			this._addEvent("raiseServerEventFailed", handler);
		},
		removeRaiseServerEventFailed: function (handler) {
			this._removeEvent("raiseServerEventFailed", handler);
		},

		// Roundtrip
		///////////////////////////////////////////////////////////////////////
		roundtrip: function ServerSync$roundtrip(root, paths, success, failed) {
			pendingRequests++;

			if (root && root instanceof Function) {
				success = root;
				failed = paths;
				root = null;
				paths = null;
			}

			var checkpoint = this._changeLog.checkpoint("roundtrip " + (new Date()).format("d"));

			Observer.setValue(this, "PendingRoundtrip", true);

			var args = { type: "roundtrip", checkpoint: checkpoint };
			this._raiseBeginEvents("roundtrip", args);

			var mtype = root ? root.meta.type || root.meta : null;
			var id = root ? root.meta.id || STATIC_ID : null;

			roundtripProvider(
				mtype ? mtype.get_fullName() : null,
				id,
				paths,
				serializeChanges.call(this, !!root, root),
				this._onRoundtripSuccess.bind(this).appendArguments(args, checkpoint, success),
				this._onRoundtripFailed.bind(this).appendArguments(args, failed || success)
			);
		},
		_onRoundtripSuccess: function ServerSync$_onRoundtripSuccess(result, args, checkpoint, callback) {
			Observer.setValue(this, "PendingRoundtrip", false);

			args.responseObject = result;

			this._handleResult(result, "roundtrip", checkpoint, function () {
				this._raiseEndEvents("roundtrip", "Success", args);

				if (callback && callback instanceof Function)
					callback.call(this, result);

				pendingRequests--;
			});
		},
		_onRoundtripFailed: function ServerSync$_onRoundtripFailed(error, args, callback) {
			Observer.setValue(this, "PendingRoundtrip", false);

			args.error = error;

			this._raiseEndEvents("roundtrip", "Failed", args);

			if (callback && callback instanceof Function)
				callback.call(this, error);

			pendingRequests--;
		},
		startAutoRoundtrip: function ServerSync$startAutoRoundtrip(interval) {
			//ExoWeb.trace.log("server", "auto-roundtrip enabled - interval of {0} milliseconds", [interval]);

			// cancel any pending roundtrip schedule
			this.stopAutoRoundtrip();

			function doRoundtrip() {
				//ExoWeb.trace.log("server", "auto-roundtrip starting ({0})", [new Date()]);
				this.roundtrip(function () {
					//ExoWeb.trace.log("server", "auto-roundtrip complete ({0})", [new Date()]);
					this._roundtripTimeout = window.setTimeout(doRoundtrip.bind(this), interval);
				});
			}

			this._roundtripTimeout = window.setTimeout(doRoundtrip.bind(this), interval);
		},
		stopAutoRoundtrip: function ServerSync$stopAutoRoundtrip() {
			if (this._roundtripTimeout) {
				window.clearTimeout(this._roundtripTimeout);
			}
		},
		addRoundtripBegin: function (handler) {
			this._addEvent("roundtripBegin", handler);
		},
		removeRoundtripBegin: function (handler) {
			this._removeEvent("roundtripBegin", handler);
		},
		addRoundtripEnd: function (handler) {
			this._addEvent("roundtripEnd", handler);
		},
		removeRoundtripEnd: function (handler) {
			this._removeEvent("roundtripEnd", handler);
		},
		addRoundtripSuccess: function (handler) {
			this._addEvent("roundtripSuccess", handler);
		},
		removeRoundtripSuccess: function (handler) {
			this._removeEvent("roundtripSuccess", handler);
		},
		addRoundtripFailed: function (handler) {
			this._addEvent("roundtripFailed", handler);
		},
		removeRoundtripFailed: function (handler) {
			this._removeEvent("roundtripFailed", handler);
		},

		// Save
		///////////////////////////////////////////////////////////////////////
		save: function ServerSync$save(root, success, failed) {
			pendingRequests++;

			// Checkpoint the log to ensure that we only truncate changes that were saved.
			var checkpoint = this._changeLog.checkpoint("save " + (new Date()).format("d"));

			Observer.setValue(this, "PendingSave", true);

			var args = { type: "save", root: root, checkpoint: checkpoint };
			this._raiseBeginEvents("save", args);

			saveProvider(
				toExoModel(root, this._translator),
				serializeChanges.call(this, false, root),
				this._onSaveSuccess.bind(this).appendArguments(args, checkpoint, success),
				this._onSaveFailed.bind(this).appendArguments(args, failed || success)
			);
		},
		_onSaveSuccess: function ServerSync$_onSaveSuccess(result, args, checkpoint, callback) {
			Observer.setValue(this, "PendingSave", false);

			args.responseObject = result;

			this._handleResult(result, "save", checkpoint, function () {
				this._raiseEndEvents("save", "Success", args);

				if (callback && callback instanceof Function)
					callback.call(this, result);

				pendingRequests--;
			});
		},
		_onSaveFailed: function (error, args, callback) {
			Observer.setValue(this, "PendingSave", false);

			args.error = error;

			this._raiseEndEvents("save", "Failed", args);

			if (callback && callback instanceof Function)
				callback.call(this, error);

			pendingRequests--;
		},
		startAutoSave: function ServerSync$startAutoSave(root, interval) {
			// cancel any pending save schedule
			this.stopAutoSave();
			this._saveInterval = interval;
			this._saveRoot = root;
		},
		stopAutoSave: function ServerSync$stopAutoSave() {
			if (this._saveTimeout) {
				window.clearTimeout(this._saveTimeout);
				this._saveTimeout = null;
			}

			this._saveInterval = null;
			this._saveRoot = null;
		},
		_queueAutoSave: function ServerSync$_queueAutoSave() {
			if (this._saveTimeout)
				return;

			function doAutoSave() {
				//ExoWeb.trace.log("server", "auto-save starting ({0})", [new Date()]);
				this.save(this._saveRoot, function ServerSync$doAutoSave$callback() {
					//ExoWeb.trace.log("server", "auto-save complete ({0})", [new Date()]);

					// wait for the next change before next auto save
					this._saveTimeout = null;
				});
			}

			this._saveTimeout = window.setTimeout(doAutoSave.bind(this), this._saveInterval);
		},
		addSaveBegin: function (handler) {
			this._addEvent("saveBegin", handler);
		},
		removeSaveBegin: function (handler) {
			this._removeEvent("saveBegin", handler);
		},
		addSaveEnd: function (handler) {
			this._addEvent("saveEnd", handler);
		},
		removeSaveEnd: function (handler) {
			this._removeEvent("saveEnd", handler);
		},
		addSaveSuccess: function (handler) {
			this._addEvent("saveSuccess", handler);
		},
		removeSaveSuccess: function (handler) {
			this._removeEvent("saveSuccess", handler);
		},
		addSaveFailed: function (handler) {
			this._addEvent("saveFailed", handler);
		},
		removeSaveFailed: function (handler) {
			this._removeEvent("saveFailed", handler);
		},

		// Apply Changes
		///////////////////////////////////////////////////////////////////////
		applyChanges: function (checkpoint, changes, source, filter, beforeApply, afterApply, callback, thisPtr) {
			if (!changes || !(changes instanceof Array)) {
				if (callback) {
					callback.call(thisPtr || this);
				}
				return;
			}

			var newChanges = 0;

			var signal = new Signal("applyChanges");
			var waitForAllRegistered = false;

			try {
				var batch = ExoWeb.Batch.start("apply changes");

				this.beginApplyingChanges();

				if ((source !== undefined && source !== null && (!this._changeLog.activeSet() || this._changeLog.activeSet().source() !== source)) || this.isCapturingChanges()) {
					this._changeLog.start(source || "unknown");
				}

				var currentChanges = this._changeLog.count(this.canSave, this);
				var totalChanges = changes.length;

				// Determine that the target of a change is a new instance
				var instanceIsNew = function (change) {
					if (ExoWeb.Model.Model.getJsType(change.instance.type, true)) {
						var obj = fromExoModel(change.instance, this._translator);
						return obj && obj.meta.isNew;
					}
					return false;
				};

				// truncate change log up-front if save occurred
				var shouldDiscardChange;
				var saveChanges = changes.filter(function (c, i) { return c.type === "Save"; });
				var numSaveChanges = saveChanges.length;
				if (numSaveChanges > 0) {
					// Collect all of the id changes in the response. Multiple saves could occur.
					var idChanges = saveChanges.mapToArray(function (change) { return change.added || []; });

					// Create a list of new instances that were saved. Use a typed identifier form since the id stored
					// in changes in the change log will be a server id rather than client id (if there is a distinction)
					// and using the typed identifier approach allows for a straightforward search of the array.
					var newInstancesSaved = idChanges.map(function (idChange) { return idChange.type + "|" + idChange.oldId; });

					// Truncate changes that we believe were actually saved based on the response
					shouldDiscardChange = function (change) {
						var couldHaveBeenSaved, isNewObjectNotYetSaved;

						// Determine if the change could have been saved in the first place
						couldHaveBeenSaved = this.canSave(change);

						// Determine if the change targets a new object that has not been saved
						isNewObjectNotYetSaved = change.instance && (change.instance.isNew || instanceIsNew.call(this, change)) && !newInstancesSaved.contains(change.instance.type + "|" + change.instance.id);

						// Return a value indicating whether or not the change should be removed
						return couldHaveBeenSaved && !isNewObjectNotYetSaved;
					};

					// Truncate changes that we believe were actually saved based on the response
					this._changeLog.truncate(checkpoint, shouldDiscardChange.bind(this));

					// Update affected scope queries
					idChanges.forEach(function (idChange) {
						var jstype = ExoWeb.Model.Model.getJsType(idChange.type, true);
						if (jstype && ExoWeb.Model.LazyLoader.isLoaded(jstype.meta)) {
							var serverOldId = idChange.oldId;
							var clientOldId = !(idChange.oldId in jstype.meta._pool) ?
								this._translator.reverse(idChange.type, serverOldId) :
								idChange.oldId;
							this._scopeQueries.forEach(function (query) {
								query.ids = query.ids.map(function (id) {
									return (id === clientOldId) ? idChange.newId : id;
								}, this);
							}, this);
						}
					}, this);
				}

				var numPendingSaveChanges = numSaveChanges;

				changes.forEach(function (change, changeIndex) {
					if (change.type === "InitNew") {
						this.applyInitChange(change, beforeApply, afterApply, signal.pending());
					}
					else if (change.type === "ReferenceChange") {
						this.applyRefChange(change, beforeApply, afterApply, signal.pending());
					}
					else if (change.type === "ValueChange") {
						this.applyValChange(change, beforeApply, afterApply, signal.pending());
					}
					else if (change.type === "ListChange") {
						this.applyListChange(change, beforeApply, afterApply, signal.pending());
					}
					else if (change.type === "Save") {
						this.applySaveChange(change, beforeApply, afterApply, signal.pending());
						numPendingSaveChanges--;
					}

					if (change.type !== "Save") {
						var noObjectsWereSaved = numSaveChanges === 0;
						var hasPendingSaveChanges = numPendingSaveChanges > 0;

						// Only record a change if there is not a pending save change, also take into account new instances that are not saved
						if (noObjectsWereSaved || !hasPendingSaveChanges || !shouldDiscardChange.call(this, change)) {
							// Apply additional filter
							if (!filter || filter(change) === true) {
								newChanges++;
								this._changeLog.add(change);
							}
						}
					}
				}, this);

				// start a new set to capture future changes
				if (this.isCapturingChanges()) {
					this._changeLog.start("client");
				}

				waitForAllRegistered = true;
				signal.waitForAll(function () {
					this.endApplyingChanges();
					ExoWeb.Batch.end(batch);
					if (callback) {
						callback.call(thisPtr || this);
					}
				}, this, true);
			}
			finally {
				if (!waitForAllRegistered) {
					this.endApplyingChanges();
					ExoWeb.Batch.end(batch);
				}
			}

			// raise "HasPendingChanges" change event, only new changes were recorded
			if (newChanges > 0) {
				Observer.raisePropertyChanged(this, "HasPendingChanges");
			}
		},
		applySaveChange: function (change, before, after, callback, thisPtr) {
			if (!(change.added || change.deleted)) {
				if (callback) {
					callback.call(thisPtr || this);
				}
				return;
			}

			change.deleted.forEach(function (instance) {
				tryGetJsType(this.model, instance.type, null, false, function (type) {
					tryGetEntity(this.model, this._translator, type, instance.id, null, LazyLoadEnum.None, this.ignoreChanges(before, function (obj) {
						// Notify server object that the instance is deleted
						this.notifyDeleted(obj);
						// Simply a marker flag for debugging purposes
						obj.meta.isDeleted = true;
						// Unregister the object so that it can't be retrieved via get, known, or have rules execute against it
						type.meta.unregister(obj);
						// Remove affected scope queries
						this._scopeQueries.purge(function (query) {
							// Remove the deleted object's id from the scope query
							query.ids.purge(function (id) {
								return (id === obj.meta.id);
							}, this);
							// Remove the scope query if it is empty
							return query.ids.length === 0;
						}, this);
					}, after), this);
				}, this);
			}, this);

			change.added.forEach(function (idChange, idChangeIndex) {
				ensureJsType(this.model, idChange.type, this.ignoreChanges(before, function (jstype) {
					var serverOldId = idChange.oldId;
					var clientOldId = !(idChange.oldId in jstype.meta._pool) ?
							this._translator.reverse(idChange.type, serverOldId) :
							idChange.oldId;

					// If the client recognizes the old id then this is an object we have seen before
					if (clientOldId) {
						var type = this.model.type(idChange.type);

						// Attempt to load the object.
						var obj = type.get(clientOldId);

						// Ensure that the object exists.
						if (!obj) {
							ExoWeb.trace.throwAndLog("server",
								"Unable to change id for object of type \"{0}\" from \"{1}\" to \"{2}\" since the object could not be found.",
								[jstype.meta.get_fullName(), idChange.oldId, idChange.newId]
							);
						}

						// Change the id and make non-new.
						type.changeObjectId(clientOldId, idChange.newId);
						Observer.setValue(obj.meta, "isNew", false);

						// Update affected scope queries
						this._scopeQueries.forEach(function (query) {
							query.ids = query.ids.map(function (id) {
								return (id === clientOldId) ? idChange.newId : id;
							}, this);
						}, this);

						// Update post-save changes with new id
						function fixChangeInstanceDueToIdChange(inst) {
							if (inst) {
								var jstype = Model.getJsType(inst.type, true);
								if (jstype && obj === fromExoModel(inst, this._translator)) {
									inst.id = idChange.newId;
									inst.isNew = false;
								}
							}
						}

						this._changeLog._sets.forEach(function (set) {
							set._changes.forEach(function (change) {
								// Only process changes to model instances
								if (!change.instance) return;

								fixChangeInstanceDueToIdChange.call(this, change.instance);

								// For list changes additionally check added and removed objects.
								if (change.type === "ListChange") {
									if (change.added.length > 0)
										change.added.forEach(fixChangeInstanceDueToIdChange, this);
									if (change.removed.length > 0)
										change.removed.forEach(fixChangeInstanceDueToIdChange, this);
								}
								// For reference changes additionally check oldValue/newValue
								else if (change.type === "ReferenceChange") {
									fixChangeInstanceDueToIdChange.call(this, change.oldValue);
									fixChangeInstanceDueToIdChange.call(this, change.newValue);
								}
							}, this);
						}, this);
					}
					// Otherwise, log an error.
					else {
						ExoWeb.trace.logWarning("server",
							"Cannot apply id change on type \"{0}\" since old id \"{1}\" was not found.",
							idChange.type,
							idChange.oldId);
					}
				}, after), this);
			}, this);

			// Callback immediately since nothing will be force loaded
			if (callback) {
				callback.call(thisPtr || this);
			}
		},
		applyInitChange: function (change, before, after, callback, thisPtr) {
			tryGetJsType(this.model, change.instance.type, null, false, this.ignoreChanges(before, function (jstype) {
				if (!jstype.meta.get(change.instance.id)) {
					// Create the new object
					var newObj = new jstype();

					// Check for a translation between the old id that was reported and an actual old id.  This is
					// needed since new objects that are created on the server and then committed will result in an accurate
					// id change record, but "instance.id" for this change will actually be the persisted id.
					var serverOldId = this._translator.forward(change.instance.type, change.instance.id) || change.instance.id;

					// Remember the object's client-generated new id and the corresponding server-generated new id
					this._translator.add(change.instance.type, newObj.meta.id, serverOldId);
				}
			}, after), this);

			// Callback immediately since nothing will be force loaded
			if (callback) {
				callback.call(thisPtr || this);
			}
		},
		applyRefChange: function (change, before, after, callback, thisPtr) {
			var exited = false;
			var callImmediately = true;

			tryGetJsType(this.model, change.instance.type, change.property, false, function (srcType) {
				tryGetEntity(this.model, this._translator, srcType, change.instance.id, change.property, LazyLoadEnum.None, this.ignoreChanges(before, function (srcObj) {
					// Update change to reflect the object's new id
					ServerSync$retroactivelyFixChangeWhereIdChanged(change.instance, srcObj);

					// Apply change
					if (change.newValue) {
						// Don't call immediately since we may need to lazy load the type
						if (!exited) {
							callImmediately = false;
						}

						tryGetJsType(this.model, change.newValue.type, null, true, this.ignoreChanges(before, function (refType) {
							var refObj = fromExoModel(change.newValue, this._translator, true);

							// Update change to reflect the object's new id
							ServerSync$retroactivelyFixChangeWhereIdChanged(change.newValue, refObj);

							// Update change to reflect the object's new id
							if (change.newValue.id === refObj.meta.legacyId) {
								change.newValue.id = refObj.meta.id;
							}

							// Change the property value
							Observer.setValue(srcObj, change.property, refObj);

							// Callback once the type has been loaded
							if (!callImmediately && callback) {
								callback.call(thisPtr || this);
							}
						}, after), this);
					}
					else {
						Observer.setValue(srcObj, change.property, null);
					}

					// Update oldValue's id in change object
					if (change.oldValue) {
						tryGetJsType(this.model, change.oldValue.type, null, true, this.ignoreChanges(before, function (refType) {
							// Update change to reflect the object's new id
							var refObj = fromExoModel(change.oldValue, this._translator, true);
							ServerSync$retroactivelyFixChangeWhereIdChanged(change.oldValue, refObj);
						}, after), this);
					}
				}, after), this);
			}, this);

			// Callback immediately since nothing will be force loaded...yet
			if (callImmediately && callback) {
				callback.call(thisPtr || this);
			}

			exited = true;
		},
		applyValChange: function (change, before, after, callback, thisPtr) {
			tryGetJsType(this.model, change.instance.type, change.property, false, function (srcType) {
				tryGetEntity(this.model, this._translator, srcType, change.instance.id, change.property, LazyLoadEnum.None, this.ignoreChanges(before, function (srcObj) {
					// Update change to reflect the object's new id
					ServerSync$retroactivelyFixChangeWhereIdChanged(change.instance, srcObj);

					// Cache the new value, becuase we access it many times and also it may be modified below
					// to account for timezone differences, but we don't want to modify the actual change object.
					var newValue = change.newValue;

					// Cache the property since it is not a simple property access.
					var property = srcObj.meta.property(change.property);

					if (property.get_jstype() === Date && newValue && newValue.constructor == String && newValue.length > 0) {

						// Convert from string (e.g.: "2011-07-28T06:00:00.000Z") to date.
						dateRegex.lastIndex = 0;
						newValue = new Date(newValue.replace(dateRegex, dateRegexReplace));

						//now that we have the value set for the date.
						//if the underlying property datatype is actually a date and not a datetime
						//then we need to add the local timezone offset to make sure that the date is displayed acurately.
						if (property.get_format() && !hasTimeFormat.test(property.get_format().toString())) {
							var serverOffset = this.get_ServerTimezoneOffset();
							var localOffset = -(new Date().getTimezoneOffset() / 60);
							newValue = newValue.addHours(serverOffset - localOffset);
						}
					}
					else if (newValue && newValue instanceof TimeSpan) {
						newValue = newValue.toObject();
					}

					Observer.setValue(srcObj, change.property, newValue);

				}, after), this);
			}, this);

			// Callback immediately since nothing will be force loaded
			if (callback) {
				callback.call(thisPtr || this);
			}
		},
		applyListChange: function (change, before, after, callback, thisPtr) {
			var exited = false;
			var callImmediately = true;

			tryGetJsType(this.model, change.instance.type, change.property, false, function (srcType) {
				tryGetEntity(this.model, this._translator, srcType, change.instance.id, change.property, LazyLoadEnum.None, this.ignoreChanges(before, function (srcObj) {
					// Update change to reflect the object's new id
					ServerSync$retroactivelyFixChangeWhereIdChanged(change.instance, srcObj);

					var prop = srcObj.meta.property(change.property);
					var list = prop.value(srcObj);

					list.beginUpdate();

					var listSignal = new ExoWeb.Signal("applyListChange-items");

					// apply added items
					if (change.added.length > 0) {
						// Don't call immediately since we may need to lazy load the type
						if (!exited) {
							callImmediately = false;
						}

						// Add each item to the list after ensuring that the type is loaded
						change.added.forEach(function (item) {
							tryGetJsType(this.model, item.type, null, true, listSignal.pending(this.ignoreChanges(before, function (itemType) {
								var itemObj = fromExoModel(item, this._translator, true);

								// Update change to reflect the object's new id
								ServerSync$retroactivelyFixChangeWhereIdChanged(item, itemObj);

								if (!list.contains(itemObj)) {
									ListLazyLoader.allowModification(list, function() {
										list.add(itemObj);
									});
								}
							}, after)), this, true);
						}, this);
					}

					// apply removed items
					change.removed.forEach(function (item) {
						// no need to load instance only to remove it from a list when it can't possibly exist
						tryGetJsType(this.model, item.type, null, false, this.ignoreChanges(before, function (itemType) {
							var itemObj = fromExoModel(item, this._translator, true);

							// Update change to reflect the object's new id
							ServerSync$retroactivelyFixChangeWhereIdChanged(item, itemObj);

							ListLazyLoader.allowModification(list, function() {
								list.remove(itemObj);
							});
						}, after), this, true);
					}, this);

					// don't end update until the items have been loaded
					listSignal.waitForAll(this.ignoreChanges(before, function () {
						if (exited) {
							this.beginApplyingChanges();
						}
						ListLazyLoader.allowModification(list, function() {
							list.endUpdate();
						});
						if (exited) {
							this.endApplyingChanges();
						}
						// Callback once all instances have been added
						if (!callImmediately && callback) {
							callback.call(thisPtr || this);
						}
					}, after), this, true);
				}, after), this);
			}, this);

			// Callback immediately since nothing will be force loaded...yet
			if (callImmediately && callback) {
				callback.call(thisPtr || this);
			}

			exited = true;
		},

		// Checkpoint
		///////////////////////////////////////////////////////////////////////
		checkpoint: function ServerSync$checkpoint() {
			return this._changeLog.checkpoint();
		},

		// Rollback
		///////////////////////////////////////////////////////////////////////
		rollback: function ServerSync$rollback(checkpoint, callback) {
			var signalRegistered;

			try {
				this.beginApplyingChanges();

				var signal = new ExoWeb.Signal("ServerSync.rollback");
				var signalRegistered = false;

				function processNextChange() {
					var change = this._changeLog.undo();

					if (change) {
						if (change.type === "Checkpoint" && change.code === checkpoint) {
							// Exit when we find the checkpoint
							return;
						}

						var callback = signal.pending(processNextChange, this);

						if (change.type == "InitNew") {
							this.rollbackInitChange(change, callback);
						}
						else if (change.type == "ReferenceChange") {
							this.rollbackRefChange(change, callback);
						}
						else if (change.type == "ValueChange") {
							this.rollbackValChange(change, callback);
						}
						else if (change.type == "ListChange") {
							this.rollbackListChange(change, callback);
						}
					}
				}

				processNextChange.call(this);

				signal.waitForAll(function () {
					this.endApplyingChanges();

					if (callback && callback instanceof Function) {
						callback();
					}

					Observer.raisePropertyChanged(this, "HasPendingChanges");
				}, this);

				// set signalRegistered to true to let the finally block now that the signal will handle calling endApplyingChanges
				signalRegistered = true;
			}
			finally {
				// the signal was not registered, therefore we need to handle endApplyingChanges call here
				if (!signalRegistered) {
					this.endApplyingChanges();
				}
			}
		},
		rollbackValChange: function ServerSync$rollbackValChange(change, callback) {
			tryGetJsType(this.model, change.instance.type, change.property, false, function (srcType) {
				tryGetEntity(this.model, this._translator, srcType, change.instance.id, change.property, LazyLoadEnum.None, function (srcObj) {

					Observer.setValue(srcObj, change.property, change.oldValue);
					callback();

				}, this);
			}, this);
		},
		rollbackRefChange: function ServerSync$rollbackRefChange(change, callback) {
			tryGetJsType(this.model, change.instance.type, change.property, false, function (srcType) {
				tryGetEntity(this.model, this._translator, srcType, change.instance.id, change.property, LazyLoadEnum.None, function (srcObj) {
					if (change.oldValue) {
						tryGetJsType(this.model, change.oldValue.type, null, true, function (refType) {
							tryGetEntity(this.model, this._translator, refType, change.oldValue.id, change.property, LazyLoadEnum.None, function (refObj) {
								Observer.setValue(srcObj, change.property, refObj);
								callback();
							}, this);
						}, this);
					}
					else {
						Observer.setValue(srcObj, change.property, null);
						callback();
					}
				}, this);
			}, this);
		},
		rollbackInitChange: function ServerSync$rollbackInitChange(change, callback) {
			//TODO: need to remove from the translator
			callback();
		},
		rollbackListChange: function ServerSync$rollbackListChange(change, callback) {
			tryGetJsType(this.model, change.instance.type, change.property, false, function (srcType) {
				tryGetEntity(this.model, this._translator, srcType, change.instance.id, change.property, LazyLoadEnum.None, function (srcObj) {
					var prop = srcObj.meta.property(change.property);
					var list = prop.value(srcObj);
					var translator = this._translator;

					list.beginUpdate();

					// Rollback added items
					Array.forEach(change.added, function rollbackListChanges$added(item) {
						tryGetJsType(this.model, item.type, null, false, function (itemType) {
							var childObj = fromExoModel(item, translator);
							if (childObj) {
								list.remove(childObj);
							}
						}, this);
					});

					// Rollback removed items
					Array.forEach(change.removed, function rollbackListChanges$added(item) {
						tryGetJsType(this.model, item.type, null, true, function (itemType) {
							var childObj = fromExoModel(item, translator, true);

							list.add(childObj);
						}, this);
					});

					list.endUpdate();

					callback();
				}, this);
			}, this);
		},

		// Various
		///////////////////////////////////////////////////////////////////////
		_captureChange: function ServerSync$_captureChange(change) {
			if (!this.isApplyingChanges() && this.isCapturingChanges()) {
				if (change.property) {
					var instance = fromExoModel(change.instance, this._translator);
					var property = instance.meta.property(change.property);

					if (property.get_jstype() === Date && change.newValue && property.get_format() && !hasTimeFormat.test(property.get_format().toString())) {
						var serverOffset = this.get_ServerTimezoneOffset();
						var localOffset = -(new Date().getTimezoneOffset() / 60);
						var difference = localOffset - serverOffset;
						change.newValue = change.newValue.addHours(difference);
					}
					else if (change.newValue && change.newValue instanceof TimeSpan) {
						change.newValue = change.newValue.toObject();
					}
				}

				this._changeLog.add(change);

				Observer.raisePropertyChanged(this, "HasPendingChanges");

				if (this._saveInterval && this.canSave(change) && isPropertyChangePersisted(change)) {
					this._queueAutoSave();
				}
			}
		},
		changes: function ServerSync$changes(includeAllChanges, simulateInitRoot, excludeNonPersisted) {
			var list = [];
			var sets = serializeChanges.call(this, includeAllChanges, simulateInitRoot);
			sets.forEach(function (set) {
				if (excludeNonPersisted) {
					list.addRange(set.changes.filter(isPropertyChangePersisted));
				}
				else {
					list.addRange(set.changes);
				}
			});
			return list;
		},
		get_Changes: function ServerSync$get_Changes(includeAllChanges/*, ignoreWarning*/) {
			if (arguments.length < 2 || arguments[1] !== true) {
				ExoWeb.trace.logWarning("server", "Method get_Changes is not intended for long-term use - it will be removed in the near future.");
			}
			return this.changes(includeAllChanges, null);
		},
		get_HasPendingChanges: function ServerSync$get_HasPendingChanges() {
			return this._changeLog.sets().some(function (set) {
				return set.changes().some(function (change) {
					return this.canSave(change);
				}, this);
			}, this);
		},
		get_PendingAction: function ServerSync$get_PendingAction() {
			return this._pendingServerEvent || this._pendingRoundtrip || this._pendingSave;
		},
		get_PendingServerEvent: function ServerSync$get_PendingServerEvent() {
			return this._pendingServerEvent;
		},
		set_PendingServerEvent: function ServerSync$set_PendingServerEvent(value) {
			var oldValue = this._pendingServerEvent;
			this._pendingServerEvent = value;

			if (oldValue !== value) {
				Observer.raisePropertyChanged(this, "PendingAction");
			}
		},
		get_PendingRoundtrip: function ServerSync$get_PendingRoundtrip() {
			return this._pendingRoundtrip;
		},
		set_PendingRoundtrip: function ServerSync$set_PendingRoundtrip(value) {
			var oldValue = this._pendingRoundtrip;
			this._pendingRoundtrip = value;

			if (oldValue !== value) {
				Observer.raisePropertyChanged(this, "PendingAction");
			}
		},
		get_PendingSave: function ServerSync$get_PendingSave() {
			return this._pendingSave;
		},
		set_PendingSave: function ServerSync$set_PendingSave(value) {
			var oldValue = this._pendingSave;
			this._pendingSave = value;

			if (oldValue !== value) {
				Observer.raisePropertyChanged(this, "PendingAction");
			}
		},
		get_ServerTimezoneOffset: function ServerSync$get_ServerTimezoneOffset() {
			//if we have not set the server timezone offset yet, retrieve it from the server
			var timezoneOffset = 0;

			if (this._serverInfo !== null) {
				timezoneOffset = this._serverInfo.TimeZoneOffset;
			}

			return timezoneOffset;
		},
		set_ServerInfo: function ServerSync$set_ServerTimezoneOffset(newInfo) {
			//join the new server info with the information that you are adding.
			this._serverInfo = this._serverInfo ? $.extend(this._serverInfo, newInfo) : newInfo;
		}
	});

	ExoWeb.Mapper.ServerSync = ServerSync;

	ServerSync.Save = function ServerSync$Save(root, success, failed) {
		root.meta.type.model.server.save(root, success, failed);
	};

	ServerSync.GetServerTimeZone = function ServerSync$GetServerTimeZone(root) {
		return root.meta.type.model.server.get_ServerTimezoneOffset(root);
	};

	// #endregion

	// #region ExoWeb.Mapper.Internals
	//////////////////////////////////////////////////

	/// <reference path="../Model/Type.js" />
	/// <reference path="../Model/ObjectMeta.js" />
	/// <reference path="../Model/Entity.js" />
	/// <reference path="../Model/Property.js" />
	/// <reference path="../Model/PathToken.js" />
	/// <reference path="../Model/ConditionTarget.js" />
	/// <reference path="../Model/Condition.js" />

	var STATIC_ID = "static";
	var dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})(\.\d{3})?Z$/g;
	var dateRegexReplace = "$2/$3/$1 $4:$5:$6 GMT";
	var hasTimeFormat = /[hHmts]/;

	function ensureJsType(model, typeName, callback, thisPtr) {
		var mtype = model.type(typeName);

		if (!mtype) {
			fetchTypes(model, [typeName], function(jstypes) {
				callback.apply(thisPtr || this, jstypes);
			});
		}
		else if (!ExoWeb.Model.LazyLoader.isLoaded(mtype)) {
			ExoWeb.Model.LazyLoader.load(mtype, null, function(jstype) {
				callback.apply(thisPtr || this, [jstype]);
			});
		}
		else {
			callback.apply(thisPtr || this, [mtype.get_jstype()]);
		}
	}

	function conditionsFromJson(model, conditionsJson, forInstances, callback, thisPtr) {

		for (var conditionCode in conditionsJson) {
			conditionFromJson(model, forInstances, conditionCode, conditionsJson[conditionCode]);
		}

		if (callback && callback instanceof Function) {
			callback.call(thisPtr || this);
		}
	}

	function conditionFromJson(model, forInstances, conditionCode, conditionsJson) {
		var conditionType = ExoWeb.Model.ConditionType.get(conditionCode);

		if (!conditionType) {
			ExoWeb.trace.logWarning(["server", "conditions"], "A condition type with code \"{0}\" could not be found.", [conditionCode]);
			return;
		}

		var serverSync = model.server;

		// process each condition
		if (forInstances) {
			conditionsJson.forEach(function (conditionJson) {
				var rootTarget = conditionJson.targets[0];
				if (rootTarget) {
					tryGetJsType(serverSync.model, rootTarget.instance.type, null, false, function (jstype) {
						tryGetEntity(serverSync.model, serverSync._translator, jstype, rootTarget.instance.id, null, LazyLoadEnum.None, function (rootTargetInstance) {
							if (forInstances.indexOf(rootTargetInstance) >= 0) {
								conditionTargetsFromJson(model, conditionType, conditionJson.message, conditionJson.targets);
							}
						});
					});
				}
			});
		}
		else {
			conditionsJson.forEach(function (conditionJson) {
				conditionTargetsFromJson(model, conditionType, conditionJson.message, conditionJson.targets);
			});
		}
	}

	function conditionTargetsFromJson(model, conditionType, message, targetsJson) {
		var condition = new Condition(conditionType, message, null, null, "server");

		var serverSync = model.server;

		// process each condition target
		targetsJson.forEach(function (target) {
			tryGetJsType(serverSync.model, target.instance.type, null, false, function (jstype) {
				tryGetEntity(serverSync.model, serverSync._translator, jstype, target.instance.id, null, LazyLoadEnum.None, function (instance) {
					condition.targets.push(new ConditionTarget(condition, instance, target.properties.map(function (p) { return jstype.meta.property(p); })));
				});
			});
		});
	}

	function objectsFromJson(model, json, callback, thisPtr) {
		var signal = new ExoWeb.Signal("objectsFromJson");
		var objectsLoaded = [];
		for (var typeName in json) {
			var poolJson = json[typeName];
			for (var id in poolJson) {
				// locate the object's state in the json
				objectFromJson(model, typeName, id, poolJson[id], signal.pending(function (obj) {
					if (obj) {
						objectsLoaded.push(obj);
					}
				}), thisPtr);
			}
		}

		signal.waitForAll(function() {
			callback.call(thisPtr || this, objectsLoaded);
		});
	}

	function objectFromJson(model, typeName, id, json, callback, thisPtr) {
		// get the object to load
		var obj;

		// family-qualified type name is not available so can't use getType()
		var mtype = model.type(typeName);

		// if this type has never been seen, go and fetch it and resume later
		if (!mtype) {
			fetchTypes(model, [typeName], function() {
				objectFromJson(model, typeName, id, json, callback);
			});
			return;
		}

		// Load object's type if needed
		if (!ExoWeb.Model.LazyLoader.isLoaded(mtype)) {
			ExoWeb.Model.LazyLoader.load(mtype, null, function() {
				objectFromJson(model, typeName, id, json, callback, thisPtr);
			});
			return;
		}

		// get target object to load
		if (id === STATIC_ID) {
			obj = null;
		}
		else {
			obj = getObject(model, typeName, id, null, true);
		}

		var loadedObj;

		///initialize the object if it was ghosted
		if (id === STATIC_ID || (obj && obj.wasGhosted) || !LazyLoader.isLoaded(obj)) {
			if (obj) {
				delete obj.wasGhosted;
			}

			var loadedProperties = [];

			// Load object's properties
			for (var t = mtype; t !== null; t = t.baseType) {
				var props = obj ? t.get_instanceProperties() : t.get_staticProperties();

				for (var propName in props) {
					if (loadedProperties.contains(propName))
						continue;

					loadedProperties.push(propName);

					var prop = props[propName];

		//					ExoWeb.trace.log("propInit", "{0}({1}).{2} = {3}", [typeName, id, propName, propData]);

					if (!prop) {
						ExoWeb.trace.throwAndLog(["objectInit"], "Cannot load object {0}({2}) because it has an unexpected property '{1}'", [typeName, propName, id]);
					}

					if(prop.get_origin() !== "server")
						continue;

					var propData;

					// instance fields have indexes, static fields use names
					if(obj) {
						propData = json[prop.get_index()];
					}
					else {
						propData = json[propName];

						// not all static fields may be present
						if(propData === undefined)
							continue;
					}

					if (propData === null) {
						Property$_init.call(prop, obj, null);
					}
					else {
						var propType = prop.get_jstype();

						 if (prop.get_isList()) {
						 	var list = prop.get_isStatic() ? prop.value() : obj[prop._fieldName];

							if (propData == "?") {
								// don't overwrite list if its already a ghost
								if (!list) {
									list = ListLazyLoader.register(obj, prop);
									Property$_init.call(prop, obj, list, false);
								}
							}
							else {
								if (!list || !ExoWeb.Model.LazyLoader.isLoaded(list)) {

									var doInit = undefined;

									// json has list members
									if (list) {
										ListLazyLoader.unregister(list);
										doInit = false;
									}
									else {
										list = [];
										doInit = true;
									}

									for (var i = 0; i < propData.length; i++) {
										var ref = propData[i];
										list.push(getObject(model, propType, (ref && ref.id || ref), (ref && ref.type || propType)));
									}

									if (doInit) {
										Property$_init.call(prop, obj, list);
									}
								}
							}
						}
						else {
							var ctor = prop.get_jstype(true);

							// assume if ctor is not found its a model type not an intrinsic
							if (!ctor || ctor.meta) {
								Property$_init.call(prop, obj, getObject(model, propType, (propData && propData.id || propData), (propData && propData.type || propType)));
							}
							else {
								// Coerce strings into dates
								if (ctor == Date && propData && propData.constructor == String && propData.length > 0) {

									// Convert from string (e.g.: "2011-07-28T06:00:00.000Z") to date.
									dateRegex.lastIndex = 0;
									propData = new Date(propData.replace(dateRegex, dateRegexReplace));

									//now that we have the value set for the date.
									//if the underlying property datatype is actually a date and not a datetime
									//then we need to add the local timezone offset to make sure that the date is displayed acurately.
									if (prop.get_format() && !hasTimeFormat.test(prop.get_format().toString())) {
										var serverOffset = model.server.get_ServerTimezoneOffset();
										var localOffset = -(new Date().getTimezoneOffset() / 60);
										propData = propData.addHours(serverOffset - localOffset);
									}
								}
								else if (ctor === TimeSpan) {
									propData = new TimeSpan(propData.TotalMilliseconds);
								}
								Property$_init.call(prop, obj, propData);
							}
						}
					}
				}
			}

			if (obj) {
				// track the newly loaded instance to pass to the caller
				loadedObj = obj;

				// unregister the instance from loading
				ObjectLazyLoader.unregister(obj);
			}
		}

		if (callback && callback instanceof Function) {
			callback.call(thisPtr || this, loadedObj);
		}
	}

	function typesFromJson(model, json) {
		for (var typeName in json) {
			typeFromJson(model, typeName, json[typeName]);
		}
	}

	function typeFromJson(model, typeName, json) {
//			ExoWeb.trace.log("typeInit", "{1}   <.>", arguments);

		// get model type. it may have already been created for lazy loading
		var mtype = getType(model, typeName, json.baseType);

		// set the default type format
		if (json.format) {
			mtype.set_format(getFormat(mtype.get_jstype(), json.format));
		}

		if (mtype.get_originForNewProperties() === "client") {
			ExoWeb.trace.throwAndLog("typeInit", "type \"{0}\" has already been loaded", mtype._fullName);
		}

		// define properties
		for (var propName in json.properties) {
			var propJson = json.properties[propName];

			// Type
			var propType = propJson.type;
			if (propJson.type.endsWith("[]")) {
				propType = propType.toString().substring(0, propType.length - 2);
				propJson.isList = true;
			}
			propType = getJsType(model, propType);

			// Format
			var format = getFormat(propType, propJson.format);

			// Add the property
			var prop = mtype.addProperty({
				name: propName,
				type: propType,
				label: propJson.label,
				format: format,
				isList: propJson.isList === true,
				isStatic: propJson.isStatic === true,
				isPersisted: propJson.isPersisted !== false,
				isCalculated: propJson.isCalculated === true,
				index: propJson.index
			});

			// setup static properties for lazy loading
			if (propJson.isStatic && propJson.isList) {
				Property$_init.call(prop, null, ListLazyLoader.register(null, prop));
			}

			// process property specific rules, which have a specialized json syntax to improve readability and minimize type json size
			if (propJson.rules) {
				for (var rule in propJson.rules) {
					var options = propJson.rules[rule];
				
					// default the type to the rule name if not specified
					if (!options.type) {
						options.type = rule;

						// calculate the name of the rule if not specified in the json, assuming it will be unique
						if (!options.name) {
							options.name = mtype.get_fullName() + "." + prop.get_name() + "." + rule.substr(0, 1).toUpperCase() + rule.substr(1);
						}
					}

					// initialize the name of the rule if not specified in the json
					else if (!options.name) {
						options.name = rule;
					}

					options.property = prop;
					ruleFromJson(mtype, options);
				}
			}
		}

		// ensure all properties added from now on are considered client properties
		mtype.set_originForNewProperties("client");

		// define methods
		for (var methodName in json.methods) {
			var methodJson = json.methods[methodName];
			mtype.addMethod({ name: methodName, parameters: methodJson.parameters, isStatic: methodJson.isStatic });
		}

		// define condition types
		if (json.conditionTypes)
			conditionTypesFromJson(model, mtype, json.conditionTypes);

		// define rules 
		if (json.rules) {
			for (var i = 0; i < json.rules.length; ++i) {
				ruleFromJson(mtype, json.rules[i]);
			}
		}

		// store exports
		if (json.exports) {
			mtype.set_exports(json.exports);
		}
	}

	function conditionTypesFromJson(model, mtype, json) {
		json.forEach(function (ctype) {
			conditionTypeFromJson(mtype, ctype);
		});
	}

	function conditionTypeFromJson(mtype, json) {

		// for rules that assert a single condition, the code will be the unique name of the rule
		json.code = json.code || json.name;

		// attempt to retrieve the condition type by code.
		var conditionType = ExoWeb.Model.ConditionType.get(json.code);

		// create the condition type if it does not already exist.
		if (!conditionType) {

			// get a list of condition type sets for this type.
			var sets = !json.sets ? [] : json.sets.map(function(name) {
				var set = ExoWeb.Model.ConditionTypeSet.get(name);
				if (!set) {
					set = new ExoWeb.Model.ConditionTypeSet(name);
				}
				return set;
			});

			// create the appropriate condition type based on the category.
			if (!json.category || json.category == "Error") {
				conditionType = new ExoWeb.Model.ConditionType.Error(json.code, json.message, sets, "server");
			}
			else if (json.category == "Warning") {
				conditionType = new ExoWeb.Model.ConditionType.Warning(json.code, json.message, sets, "server");
			}
			else if (json.category == "Permission") {
				conditionType = new ExoWeb.Model.ConditionType.Permission(json.code, json.message, sets, json.permissionType, json.isAllowed, "server");
			}
			else {
				conditionType = new ExoWeb.Model.ConditionType(json.code, json.category, json.message, sets, "server");
			}

			// account for the potential for subclasses to be serialized with additional properties.
			conditionType.extend(json);
		}

		if (json.rule && json.rule.hasOwnProperty("type")) {
			conditionType.rules.push(ruleFromJson(mtype, json.rule, conditionType));
		}

		return conditionType;
	}

	function ruleFromJson(mtype, options) {
		var ruleType = ExoWeb.Model.Rule[options.type];
		if (options.conditionType) {
			options.conditionType = conditionTypeFromJson(mtype, options.conditionType);
		}
		else if (ruleType.prototype instanceof ConditionRule) {
			options.conditionType = conditionTypeFromJson(mtype, options);
		}
		return new ruleType(mtype, options);
	}

	function getJsType(model, typeName, forLoading) {
		// Get an array representing the type family.
		var family = typeName.split(">");

		// Try to get the js type from the window object.
		var jstype = ExoWeb.Model.Model.getJsType(family[0], true);

		// If its not defined, assume the type is a model type
		// that may eventually be fetched.
		if (jstype === undefined) {
			jstype = getType(model, null, family).get_jstype();
		}

		return jstype;
	}

	function flattenTypes(types, flattened) {
		function add(item) {
			if (flattened.indexOf(item) < 0) {
				flattened.push(item);
			}
		}

		if (types instanceof Array) {
			Array.forEach(types, add);
		}
		else if (typeof (types) === "string") {
			Array.forEach(types.split(">"), add);
		}
		else if (types) {
			add(types);
		}
	}

	// Gets a reference to a type.  IMPORTANT: typeName must be the
	// family-qualified type name (ex: Employee>Person).
	function getType(model, finalType, propType) {
		// ensure the entire type family is at least ghosted
		// so that javascript OO mechanisms work properly
		var family = [];

		flattenTypes(finalType, family);
		flattenTypes(propType, family);

		var mtype;
		var baseType;

		while (family.length > 0) {
			baseType = mtype;

			var type = family.pop();

			if (type instanceof ExoWeb.Model.Type) {
				mtype = type;
			}
			else if (type.meta) {
				mtype = type.meta;
			}
			else {
				// type is a string
				mtype = model.type(type);

				// if type doesn't exist, setup a ghost type
				if (!mtype) {
					mtype = model.addType(type, baseType, "server");
					TypeLazyLoader.register(mtype);
				}
			}
		}

		return mtype;
	}

	function getObject(model, propType, id, finalType, forLoading) {
		if (id === STATIC_ID) {
			ExoWeb.trace.throwAndLog(["objectInit", "lazyLoad"], "getObject() can only be called for instances (id='{0}')", [id]);
		}

		// get model type
		var mtype = getType(model, finalType, propType);

		// Try to locate object in pool
		var obj = mtype.get(id);

		// if it doesn't exist, create a ghost
		if (!obj) {
			obj = new (mtype.get_jstype())(id);
			obj.wasGhosted = true;
			if (!forLoading) {
				ObjectLazyLoader.register(obj);
//					ExoWeb.trace.log("entity", "{0}({1})  (ghost)", [mtype.get_fullName(), id]);
			}
		}

		return obj;
	}

	function onTypeLoaded(model, typeName) {
		var mtype = model.type(typeName);
		mtype.eachBaseType(function(mtype) {
			if (!ExoWeb.Model.LazyLoader.isLoaded(mtype)) {
				ExoWeb.trace.throwAndLog("typeLoad", "Base type " + mtype._fullName + " is not loaded.");
			}
		});
		TypeLazyLoader.unregister(mtype);
		raiseExtensions(mtype);
		return mtype;
	}

	///////////////////////////////////////////////////////////////////////////////
	function fetchTypesImpl(model, typeNames, callback, thisPtr) {
		var signal = new ExoWeb.Signal("fetchTypes(" + typeNames.join(",") + ")");
		signal.pending();

		var typesPending = typeNames.copy(), typesLoaded = [];

		function typesFetched(success, types, otherTypes) {
			var baseTypesToFetch = [], loadedTypes = [], baseTypeDependencies = {}, loadableTypes = [];

			if (success) {
				typesFromJson(model, types);

				// Update types that have been loaded.  This needs to be persisted since
				// this function can recurse and arguments are not persisted.
				eachProp(types, function(prop) { typesLoaded.push(prop); });
				if (otherTypes) {
					eachProp(otherTypes, function(prop) { typesLoaded.push(prop); });
				}

				// Extract the types that can be loaded since they have no pending base types
				purge(typesPending, function(typeName) {
					var mtype, pendingBaseType = false;

					// In the absense of recursion this will be equivalent to enumerating
					// the properties of the "types" and "otherTypes" arguments.
					if (typesLoaded.contains(typeName)) {
						mtype = model.type(typeName);
						if (mtype) {
							if (LazyLoader.isLoaded(mtype)) {
								loadedTypes.push(mtype._fullName);
							}
							else {
								// find base types that are not loaded
								mtype.eachBaseType(function(baseType) {
									// Don't raise the loaded event until the base types are marked as loaded (or about to be marked as loaded in this pass)
									if (!LazyLoader.isLoaded(baseType)) {
										// Base type will be loaded in this pass
										if (typesLoaded.contains(baseType._fullName)) {
											if (baseTypeDependencies.hasOwnProperty(typeName)) {
												baseTypeDependencies[typeName].splice(0, 0, baseType._fullName);
											}
											else {
												baseTypeDependencies[typeName] = [baseType._fullName];
											}
										}
										else {
											pendingBaseType = true;
											if (!baseTypesToFetch.contains(baseType._fullName) && !typesPending.contains(baseType._fullName)) {
												baseTypesToFetch.push(baseType._fullName);
											}
										}
									}
								});

								if (!pendingBaseType) {
									loadableTypes.push(typeName);
									return true;
								}
							}
						}
					}
				});

				// Remove types that have already been marked as loaded
				loadedTypes.forEach(function(typeName) {
					typesPending.remove(typeName);
				});

				// Raise loaded event on types that can be marked as loaded
				while(loadableTypes.length > 0) {
					var typeName = loadableTypes.dequeue();
					if (baseTypeDependencies.hasOwnProperty(typeName)) {
						// Remove dependencies from array and map
						var deps = baseTypeDependencies[typeName];
						delete baseTypeDependencies[typeName];
						deps.forEach(function(t) {
							loadableTypes.remove(t);
							delete baseTypeDependencies[t];
						});

						// Splice the types back into the beginning of the array in the correct order.
						var spliceArgs = deps;
						spliceArgs.push(typeName);
						spliceArgs.splice(0, 0, 0, 0);
						Array.prototype.splice.apply(loadableTypes, spliceArgs);
					}
					else {
						typesPending.remove(typeName);
						onTypeLoaded(model, typeName);
					}
				}

				// Fetch any pending base types
				if (baseTypesToFetch.length > 0) {
					// TODO: need to notify dontDoubleUp that these types are
					// now part of the partitioned argument for the call.
					typesPending.addRange(baseTypesToFetch);

					// Make a recursive request for base types.
					typeProvider(baseTypesToFetch, typesFetched);
				}
				else if (typesPending.length === 0 && signal.isActive()) {
					// COMPLETE!!!
					signal.oneDone();
				}
			}
			// Handle an error response.  Loading should
			// *NOT* continue as if the type is available.
			else {
				ExoWeb.trace.throwAndLog("typeInit",
					"Failed to load {0} (HTTP: {1}, Timeout: {2})",
					typeNames.join(","),
					types._statusCode,
					types._timedOut);
			}
		}

		// request the types
		typeProvider(typeNames, typesFetched);

		signal.waitForAll(function() {
			if (callback && callback instanceof Function) {
				callback.call(thisPtr || this, typeNames.map(function(typeName) { return model.type(typeName).get_jstype(); }));
			}
		});
	}

	function moveTypeResults(originalArgs, invocationArgs, callbackArgs) {
		callbackArgs[0] = invocationArgs[1].map(function(typeName) { return invocationArgs[0].type(typeName).get_jstype(); });
	}

	var fetchTypes = fetchTypesImpl.dontDoubleUp({ callbackArg: 2, thisPtrArg: 3, partitionedArg: 1, partitionedFilter: moveTypeResults });

	// fetches model paths and calls success or fail based on the outcome
	function fetchPathTypes(model, jstype, path, success, fail) {
		var step = path.steps.dequeue();
		while (step) {
			// locate property definition in model
			var prop = jstype.meta.property(step.property);

			if (!prop) {
				fail("Could not find property \"" + step.property + "\" on type \"" + jstype.meta.get_fullName() + "\".");
			}

			// don't need to fetch type information for value types
			if (prop.get_isValueType()) {
				break;
			}

			// Load the type of the property if its not yet loaded
			var mtype;
			if (step.cast) {
				mtype = model.type(step.cast);

				// if this type has never been seen, go and fetch it and resume later
				if (!mtype) {
					Array.insert(path.steps, 0, step);
					fetchTypes(model, [step.cast], function() {
						fetchPathTypes(model, jstype, path, success, fail);
					});
					return;
				}
			}
			else {
				mtype = prop.get_jstype().meta;
			}

			// if property's type isn't load it, then fetch it
			if (!ExoWeb.Model.LazyLoader.isLoaded(mtype)) {
				fetchTypes(model, [mtype.get_fullName()], function(jstypes) {
					fetchPathTypes(model, jstypes[0], path, success, fail);
				});

				// path walking will resume with callback
				return;
			}

			// keep walking the path
			jstype = mtype.get_jstype();

			step = path.steps.dequeue();
		}

		// Inform the caller that the path has been successfully fetched
		success();
	}

	function fetchQueryTypes(model, typeName, paths, callback) {
		var signal = new ExoWeb.Signal("fetchTypes");

		function rootTypeLoaded(jstype) {
		
			// process all paths
			if (paths) {
				Array.forEach(paths, function (path) {

					// attempt to fetch the path
					fetchPathTypes(model, jstype, path, signal.pending(), function (err) {

						// determine if the path represents a static property if the path was not valid
						var step = null, typeName = "";
						while (path.steps.length > 1) {
							step = path.steps.dequeue();
							typeName += (typeName.length > 0 ? "." : "") + step.property;
						}

						var mtype = model.type(typeName);

						var fetchStaticPathTypes = function fetchStaticPathTypes() {
							fetchPathTypes(model, (mtype || model.type(typeName)).get_jstype(), path, signal.pending(), function () {
								ExoWeb.trace.throwAndLog("typeInit", "Invalid query path \"" + path + "\" - " + err);
							});
						};

						if (!mtype) {
							// first time type has been seen, fetch it
							fetchTypes(model, [typeName], signal.pending(function (jstypes) {
								fetchStaticPathTypes(jstypes[0]);
							}));
						}
						else if (!ExoWeb.Model.LazyLoader.isLoaded(mtype)) {
							// lazy load type and continue walking the path
							ExoWeb.Model.LazyLoader.load(mtype, null, signal.pending(fetchStaticPathTypes));
						}
						else {
							fetchStaticPathTypes();
						}

					});
				});
			}
		}

		// load root type, then load types referenced in paths
		var rootType = model.type(typeName);
		if (!rootType) {
			var _typeName = typeName;
			fetchTypes(model, [typeName], signal.pending(function(jstypes) {
				rootTypeLoaded(jstypes[0]);
			}));
		}
		else if (!ExoWeb.Model.LazyLoader.isLoaded(rootType)) {
			ExoWeb.Model.LazyLoader.load(rootType, null, signal.pending(rootTypeLoaded));
		}
		else {
			rootTypeLoaded(rootType.get_jstype());
		}

		signal.waitForAll(callback);
	}

	// Recursively searches throught the specified object and restores dates serialized as strings
	function restoreDates(value) {
		function tryRestoreDate(obj, key) {
			var val = obj[key];
			if (val && val.constructor === String && dateRegex.test(val)) {
				dateRegex.lastIndex = 0;
				obj[key] = new Date(val.replace(dateRegex, dateRegexReplace));
			}
		}

		if (value instanceof Array) {
			for (var i = 0; i < value.length; i++) {
				tryRestoreDate(value, i);
			}
		}
		else if (value instanceof Object) {
			for (var field in value) {
				if (value.hasOwnProperty(field)) {
					tryRestoreDate(value, field);
				}
			}
		}
	}

	function tryGetJsType(model, name, property, forceLoad, callback, thisPtr) {
		var jstype = ExoWeb.Model.Model.getJsType(name, true);

		if (jstype && ExoWeb.Model.LazyLoader.isLoaded(jstype.meta)) {
			callback.call(thisPtr || this, jstype);
		}
		else if (jstype && forceLoad) {
//				ExoWeb.trace.log("server", "Forcing lazy loading of type \"{0}\".", [name]);
			ExoWeb.Model.LazyLoader.load(jstype.meta, property, callback, thisPtr);
		}
		else if (!jstype && forceLoad) {
//				ExoWeb.trace.log("server", "Force creating type \"{0}\".", [name]);
			ensureJsType(model, name, callback, thisPtr);
		}
		else {
//				ExoWeb.trace.log("server", "Waiting for existance of type \"{0}\".", [name]);
			$extend(name, function() {
//					ExoWeb.trace.log("server", "Type \"{0}\" was loaded, now continuing.", [name]);
				callback.apply(this, arguments);
			}, thisPtr);
		}
	}

	var LazyLoadEnum = {
		None: 0,
		Force: 1,
		ForceAndWait: 2
	};

	function tryGetEntity(model, translator, type, id, property, lazyLoad, callback, thisPtr) {
		var obj = type.meta.get(translateId(translator, type.meta.get_fullName(), id));

		if (obj && ExoWeb.Model.LazyLoader.isLoaded(obj)) {
			callback.call(thisPtr || this, obj);
		}
		else if (lazyLoad == LazyLoadEnum.Force) {
			if (!obj) {
				ExoWeb.trace.log("server", "Forcing creation of object \"{0}|{1}\".", [type.meta.get_fullName(), id]);
				obj = fromExoModel({ type: type.meta.get_fullName(), id: id }, translator, true);
			}
			callback.call(thisPtr || this, obj);
			ExoWeb.trace.log("server", "Forcing lazy loading of object \"{0}|{1}\".", [type.meta.get_fullName(), id]);
			ExoWeb.Model.LazyLoader.load(obj, property);
		}
		else if (lazyLoad == LazyLoadEnum.ForceAndWait) {
			if (!obj) {
				ExoWeb.trace.log("server", "Forcing creation of object \"{0}|{1}\".", [type.meta.get_fullName(), id]);
				obj = fromExoModel({ type: type.meta.get_fullName(), id: id }, translator, true);
			}

			ExoWeb.trace.log("server", "Forcing lazy loading of object \"{0}|{1}\".", [type.meta.get_fullName(), id]);
			ExoWeb.Model.LazyLoader.load(obj, property, thisPtr ? callback.bind(thisPtr) : callback);
		}
		else {
			ExoWeb.trace.log("server", "Waiting for existance of object \"{0}|{1}\".", [type.meta.get_fullName(), id]);

			function invokeCallback() {
				if (filter(obj) !== true)
					return;

				// only invoke the callback once
				propertyFilter = function() { return false; };
				callback.call(thisPtr || this, obj);
			}

			var objSignal = new Signal("wait for object to exist");

			if (!obj) {
				model.addObjectRegistered(objSignal.pending(null, null, true), function(newObj) {
					if (newObj.meta.type === type.meta && newObj.meta.id === id) {
						obj = newObj;
						return true;
					}
				}, true);
			}

			objSignal.waitForAll(function () {
				// if a property was specified and its not inited, then wait for it
				if (property && type.meta.property(property).isInited(obj) !== true) {
					type.meta.property(property).addChanged(callback.bind(thisPtr), obj, true);
					return;
				}

				callback.call(thisPtr || this, obj);
			}, null, true);
		}
	}

	// #endregion

	// #region ExoWeb.Mapper.TypeLazyLoader
	//////////////////////////////////////////////////

	function TypeLazyLoader() {
	}

	function typeLoad(mtype, propName, callback, thisPtr) {
		if (!ExoWeb.config.allowTypeLazyLoading) {
			throw new ExoWeb.trace.logError(["typeInit", "lazyLoad"], "Type lazy loading has been disabled: {0}", mtype.get_fullName());
		}

//				ExoWeb.trace.log(["typeInit", "lazyLoad"], "Lazy load: {0}", [mtype.get_fullName()]);
		fetchTypes(mtype.model, [mtype.get_fullName()], function(jstypes) {
			if (callback && callback instanceof Function) {
				callback(jstypes[0]);
			}
		}, thisPtr);
	}

	TypeLazyLoader.mixin({
		load: typeLoad.dontDoubleUp({ callbackArg: 2, thisPtrArg: 3, groupBy: 0 })
	});

	(function() {
		var instance = new TypeLazyLoader();

		TypeLazyLoader.register = function(obj) {
			ExoWeb.Model.LazyLoader.register(obj, instance);
		};

		TypeLazyLoader.unregister = function(obj) {
			ExoWeb.Model.LazyLoader.unregister(obj, instance);
		};
	})();

	// #endregion

	// #region ExoWeb.Mapper.ObjectLazyLoader
	//////////////////////////////////////////////////

	// <reference path="../core/Config.js" />

	function ObjectLazyLoader() {
		this._requests = {};
		this._typePaths = {};
	}

	var pendingObjects = 0;

	registerActivity("ObjectLazyLoader", function() {
		return pendingObjects > 0;
	});

	function objLoad(obj, propName, callback, thisPtr) {
		if (!ExoWeb.config.allowObjectLazyLoading) {
			throw new ExoWeb.trace.logError(["objectInit", "lazyLoad"], "Object lazy loading has been disabled: {0}({1})", mtype.get_fullName(), id);
		}

		pendingObjects++;

		var signal = new ExoWeb.Signal("object lazy loader");

		var id = obj.meta.id || STATIC_ID;
		var mtype = obj.meta.type || obj.meta;

		// Get the paths from the original query(ies) that apply to this object (based on type).
		var paths = ObjectLazyLoader.getRelativePaths(obj);

		// Add the property to load if specified.  Assumes an instance property.
		if (propName && paths.indexOf(propName) < 0) {
			paths.push(propName);
		}

		// fetch object json
		ExoWeb.trace.logWarning(["objectInit", "lazyLoad"], "Lazy load: {0}({1})", mtype.get_fullName(), id);

		// TODO: reference to server will be a singleton, not context
		objectProvider(mtype.get_fullName(), [id], paths, false,
			serializeChanges.call(context.server, true),
			function(result) {
				mtype.model.server._handleResult(result, $format("Lazy load: {0}({1})", mtype.get_fullName(), id), null, function() {
					LazyLoader.unregister(obj, this);
					pendingObjects--;

					// Raise init events if registered.
					for (var t = mtype; t; t = t.baseType) {
						var handler = t._getEventHandler("initExisting");
						if (handler)
							handler(obj, {});
					}

					callback.call(thisPtr || this, obj);
				});
			},
			function(e) {
				pendingObjects--;
				var message = $format("Failed to load {0}({1}): ", [mtype.get_fullName(), id]);
				if (e !== undefined && e !== null &&
					e.get_message !== undefined && e.get_message !== null &&
					e.get_message instanceof Function) {

					message += e.get_message();
				}
				else {
					message += "unknown error";
				}
				ExoWeb.trace.logError("lazyLoad", message);
			});

		// does the object's type need to be loaded too?
		if (!LazyLoader.isLoaded(mtype)) {
			LazyLoader.load(mtype, null, signal.pending());
		}
	}

	ObjectLazyLoader.mixin({
		load: objLoad.dontDoubleUp({ callbackArg: 2, thisPtrArg: 3, groupBy: 0 })
	});

	(function() {
		var instance = new ObjectLazyLoader();

		ObjectLazyLoader.addPaths = function ObjectLazyLoader$addPaths(rootType, paths) {
			var typePaths = instance._typePaths[rootType];
			if (!typePaths) {
				typePaths = instance._typePaths[rootType] = [];
			}
			for (var i = 0; i < paths.length; i++) {
				var path = paths[i];
				if (typePaths.indexOf(path) < 0) {
					typePaths.push(path);
				}
			}
		};

		ObjectLazyLoader.getRelativePaths = function getRelativePaths(obj) {
			return ObjectLazyLoader.getRelativePathsForType(obj.meta.type);
		};

		ObjectLazyLoader.getRelativePathsForType = function getRelativePathsForType(type) {
			var relPaths = [];

			for (var typeName in instance._typePaths) {
				var jstype = Model.getJsType(typeName);

				if (jstype && jstype.meta) {
					var paths = instance._typePaths[typeName];
					for (var i = 0; i < paths.length; i++) {
						var path = paths[i].expression;
						var chain = Model.property(path, jstype.meta);
						// No need to include static paths since if they were 
						// cached then they were loaded previously.
						if (!chain.get_isStatic()) {
							var rootedPath = chain.rootedPath(type);
							if (rootedPath) {
								relPaths.push(rootedPath);
							}
						}
					}
				}
			}

			return relPaths.distinct();
		};

		ObjectLazyLoader.register = function(obj) {
			if (!LazyLoader.isRegistered(obj, instance)) {
				if (obj.meta.type.get_origin() !== "server") {
					ExoWeb.trace.logError(["objectInit", "lazyLoad"], "Cannot lazy load instance of non-server-origin type: {0}({1})", obj.meta.type.get_fullName(), obj.meta.id);
				}
				LazyLoader.register(obj, instance);
			}
		};

		ObjectLazyLoader.unregister = function(obj) {
			LazyLoader.unregister(obj, instance);
		};
	})();

	// #endregion

	// #region ExoWeb.Mapper.ListLazyLoader
	//////////////////////////////////////////////////

	function ListLazyLoader() {
	}

	function listLoad(list, propName, callback, thisPtr) {
		var signal = new ExoWeb.Signal("list lazy loader");

		var model = list._ownerProperty.get_containingType().model;
		var ownerId = list._ownerId;
		var containingType = list._ownerProperty.get_containingType();
		var owner = ownerId === STATIC_ID ? containingType.get_jstype() : containingType.get(ownerId);
		var ownerType = ownerId === STATIC_ID ? owner.meta.get_fullName() : owner.meta.type.get_fullName();
		var prop = list._ownerProperty;
		var propIndex = list._ownerProperty.get_index();
		var propName = list._ownerProperty.get_name();
		var propType = list._ownerProperty.get_jstype().meta;

		if (!ExoWeb.config.allowListLazyLoading) {
			throw new ExoWeb.trace.logError(["listInit", "lazyLoad"], "List lazy loading has been disabled: {0}({1}).{2}", ownerType, ownerId, propName);
		}

		// load the objects in the list
		ExoWeb.trace.logWarning(["listInit", "lazyLoad"], "Lazy load: {0}({1}).{2}", ownerType, ownerId, propName);

		var objectJson, conditionsJson;

		// TODO: reference to server will be a singleton, not context
		listProvider(ownerType, ownerId, propName, ownerId === STATIC_ID ? [] : ObjectLazyLoader.getRelativePathsForType(propType),
			serializeChanges.call(context.server, true),
			signal.pending(function(result) {
				objectJson = result.instances;
				conditionsJson = result.conditions;
			}),
			signal.orPending(function(e) {
				var errorMessage;
				if (e !== undefined && e !== null &&
						e.get_message !== undefined && e.get_message !== null &&
						e.get_message instanceof Function) {

					errorMessage = e.get_message();
				}
				else if (e.message) {
					errorMessage = e.message;
				}
				else {
					errorMessage = "unknown error";
				}

				throw ExoWeb.trace.logError(["listInit", "lazyLoad"], "Failed to load {0}({1}).{2}: {3}", ownerType, ownerId, propName, errorMessage);
			})
		);

		// ensure that the property type is loaded as well.
		// if the list has objects that are subtypes, those will be loaded later
		// when the instances are being loaded
		if (!ExoWeb.Model.LazyLoader.isLoaded(propType)) {
			ExoWeb.Model.LazyLoader.load(propType, null, signal.pending());
		}

		signal.waitForAll(function() {
			if (!objectJson) {
				return;
			}

//					ExoWeb.trace.log("list", "{0}({1}).{2}", [ownerType, ownerId, propName]);

			// The actual type name and id as found in the resulting json.
			var jsonId = ownerId;
			var jsonType = ownerType;

			// Find the given type and id in the object json.  The type key may be a dervied type.
			function searchJson(mtype, id) {
				// The given type is a key that is present in the result json.
				if (objectJson[mtype.get_fullName()]) {

					// The id is also a key.
					if (objectJson[mtype.get_fullName()][id]) {
						jsonType = mtype.get_fullName();
						jsonId = id;
						return true;
					}

					// Ids returned from the server are not always in the same case as ids on the client, so check one-by-one.
					for (var varId in objectJson[mtype.get_fullName()]) {
						if (varId.toLowerCase() == id.toLowerCase()) {
							jsonType = mtype.get_fullName();
							jsonId = varId;
							return true;
						}
					}
				}

				// Check derived types recursively.
				for (var i = 0; i < mtype.derivedTypes.length; i++) {
					if (searchJson(mtype.derivedTypes[i], id)) {
						return true;
					}
				}
			}

			if (!searchJson(ExoWeb.Model.Model.getJsType(ownerType).meta, ownerId)) {
				ExoWeb.trace.throwAndLog(["list", "lazyLoad"], "Data could not be found for {0}:{1}.", [ownerType, ownerId]);
			}

			var listJson = prop.get_isStatic() ?
				objectJson[jsonType][jsonId][propName] :
				objectJson[jsonType][jsonId][propIndex];

			if (!(listJson instanceof Array)) {
				ExoWeb.trace.throwAndLog(["list", "lazyLoad"],
					"Attempting to load list {0} of instance {1}:{2}, but the response JSON is not an array: {3}.",
					[propName, ownerType, ownerId, listJson]);
			}

			// populate the list with objects
			for (var i = 0; i < listJson.length; i++) {
				var ref = listJson[i];
				var item = getObject(model, propType, (ref && ref.id || ref), (ref && ref.type || propType));
				list.push(item);

				// if the list item is already loaded ensure its data is not in the response
				// so that it won't be reloaded
				if (ExoWeb.Model.LazyLoader.isLoaded(item)) {
					delete objectJson[jsonType][ref.id];
				}
			}

			// remove list from json and process the json.  there may be
			// instance data returned for the objects in the list
			if (ExoWeb.Model.LazyLoader.isLoaded(owner)) {
				delete objectJson[jsonType][jsonId];
			}

			ListLazyLoader.unregister(list, this);

			var batch = ExoWeb.Batch.start($format("{0}({1}).{2}", [ownerType, ownerId, propName]));

			var done = function() {
				// Collection change driven by user action or other behavior would result in the "change" event
				//	being raised for the list property.  Since we don't want to record this as a true observable
				//	change, raise the event manually so that rules will still run as needed.
				// This occurs before batch end so that it functions like normal object loading.
				prop._raiseEvent("changed", [owner, { property: prop, newValue: list, oldValue: undefined, collectionChanged: true}]);

				ExoWeb.Batch.end(batch);
				callback.call(thisPtr || this, list);
			};

			objectsFromJson(model, objectJson, function() {
				if (conditionsJson) {
					conditionsFromJson(model, conditionsJson, list.slice(0), done);
				}
				else {
					done();
				}
			});
		});
	}

	ListLazyLoader.mixin({
		load: listLoad.dontDoubleUp({ callbackArg: 2, thisPtrArg: 3, groupBy: 0 })
	});

	(function() {
		var instance = new ListLazyLoader();

		var modifiableLists = [];

		function lazyListModified(sender, args) {
			// Check that modifications have not been allowed.
			if (modifiableLists.indexOf(sender) < 0) {
				// Check that at least one change involves adding or removing a non-new instance.
				if (args.get_changes().mapToArray(function(c) { return c.newItems || []; }).concat(args.get_changes().mapToArray(function(c) { return c.oldItems || []; })).some(function(i) { return !i.meta.isNew; })) {
					throw new ExoWeb.trace.logError(["list", "lazyLoad"], "{0} list {1}.{2} was modified but it has not been loaded.",
						this._isStatic ? "Static" : "Non-static",
						this._isStatic ? this._containingType.get_fullName() : "this<" + this._containingType.get_fullName() + ">",
						this._name
					);
				}
			}
		}

		ListLazyLoader.register = function(obj, prop) {
			var list = [];

			// Throw an error if a non-loaded list is modified
			var collectionChangeHandler = lazyListModified.bind(prop);
			list._collectionChangeHandler = collectionChangeHandler;
			Observer.addCollectionChanged(list, collectionChangeHandler);

			list._ownerId = prop.get_isStatic() ? STATIC_ID : obj.meta.id;
			list._ownerProperty = prop;

			ExoWeb.Model.LazyLoader.register(list, instance);

			return list;
		};

		ListLazyLoader.unregister = function(list) {
			Observer.removeCollectionChanged(list, list._collectionChangeHandler);
			ExoWeb.Model.LazyLoader.unregister(list, instance);

			delete list._ownerId;
			delete list._ownerProperty;
			delete list._collectionChangeHandler;
		};

		ListLazyLoader.allowModification = function(list, callback, thisPtr) {
			modifiableLists.push(list);
			callback.call(thisPtr || this);
			modifiableLists.remove(list);
		};
	})();

	// #endregion

	// #region ExoWeb.Mapper.Context
	//////////////////////////////////////////////////

	// Signal to keep track of any ongoing context initialization
	var allSignals = new ExoWeb.Signal("Context : allSignals");

	ExoWeb.registerActivity("Context: allSignals", function() {
		return allSignals.isActive();
	});

	function Context() {
		this.model = { meta: new ExoWeb.Model.Model() };
		this.server = new ServerSync(this.model.meta);
	}

	Context.mixin(ExoWeb.Functor.eventing);

	var numberOfPendingQueries;

	Context.mixin({
		addReady: function Context$addReady(callback, thisPtr) {
			var queriesAreComplete = numberOfPendingQueries === 0;

			this._addEvent("ready", thisPtr ? callback.bind(thisPtr) : callback, null, true);

			// Simulate the event being raised immediately if a query or queries have already completed
			if (queriesAreComplete) {
				// Subscribers will not actually be called until signals have subsided
				allSignals.waitForAll(function() {
					this._raiseEvent("ready");
				}, this);
			}
		}
	});

	function ensureContext() {
		if (!window.context) {
			window.context = new Context();
		}
		else if (!(window.context instanceof Context)) {
			ExoWeb.trace.throwAndLog("context", "The window object has a context property that is not a valid context.");
		}
		return window.context;
	}

	Context.ready = function Context$ready(context) {
		numberOfPendingQueries--;

		var queriesAreComplete = numberOfPendingQueries === 0;

		if (queriesAreComplete) {
			// Indicate that one or more model queries are ready for consumption
			allSignals.waitForAll(function() {
				context._raiseEvent("ready");
			});
		}
	};

	Context.query = function Context$query(context, options) {
		var queriesHaveBegunOrCompleted = numberOfPendingQueries !== undefined;
		if (!queriesHaveBegunOrCompleted) {
			numberOfPendingQueries = 0;
		}
		numberOfPendingQueries++;

		// Execute the query and fire the ready event when complete
		(new ContextQuery(context, options)).execute(function() {
			Context.ready(context);
		});
	}

	// #endregion

	// #region ExoWeb.Mapper.ContextQuery
	//////////////////////////////////////////////////

	function ContextQuery(context, options) {
		this.context = context;
		this.options = options;
		this.batch = null;
		this.state = {};
	}

	ContextQuery.mixin({
		execute: ExoWeb.FunctionChain.prepare(

		// Starts a batch so that others will not respond to changes that are
		// broadcast during querying, i.e. instance loading.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$setup(callback, thisPtr) {
				// start a batch to represent all of the pending work
				ExoWeb.trace.log("context", "Starting context query batch.");
				this.batch = ExoWeb.Batch.start("context query");

				// store init changes as early as possible
				if (this.options.changes)
					ServerSync$storeInitChanges.call(this.context.server, this.options.changes);

				// If the allSignals signal is not active, then set up a fake pending callback in
				// order to ensure that the context is not "loaded" prior to models being initilized.
				if (!allSignals.isActive()) {
					this._predictiveModelPending = allSignals.pending(null, this, true);
				}

				// Setup lazy loading on the context object to control lazy evaluation.
				// Loading is considered complete at the same point model.ready() fires. 
				ExoWeb.Model.LazyLoader.register(this.context, {
					load: function context$load(obj, propName, callback, thisPtr) {
						//ExoWeb.trace.log(["context", "lazyLoad"], "caller is waiting for createContext.ready(), propName={1}", arguments);

						// objects are already loading so just queue up the calls
						allSignals.waitForAll(function context$load$callback() {
							//ExoWeb.trace.log(["context", "lazyLoad"], "raising createContext.ready()");

							ExoWeb.Model.LazyLoader.unregister(obj, this);

							if (callback && callback instanceof Function) {
								callback.call(thisPtr || this);
							}
						}, this, true);
					}
				});

				callback.call(thisPtr || this);
			},

		// Perform pre-processing of model queries and their paths.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$initModels(callback, thisPtr) {
				if (this.options.model) {
					// Start capturing changes prior to processing any model query
					this.context.server.beginCapturingChanges();
					ExoWeb.trace.log("context", "Running init step for model queries.");
					ExoWeb.eachProp(this.options.model, function (varName, query) {
						// Assert that the necessary properties are provided
						if (!query.hasOwnProperty("from") || (!query.hasOwnProperty("id") && !query.hasOwnProperty("ids")))
							ExoWeb.trace.throwAndLog("types", "The model query \"{0}\" requires a from and id or ids clause.", [varName]);
						if (query.hasOwnProperty("id") && query.hasOwnProperty("ids"))
							ExoWeb.trace.throwAndLog("types", "The model query \"{0}\" specifies both id or ids.", [varName]);

						// common initial setup of state for all model queries
						this.state[varName] = { signal: new ExoWeb.Signal("createContext." + varName), isArray: false };

						if (this._predictiveModelPending) {
							delete this._predictiveModelPending;
						}
						else {
							allSignals.pending(null, this, true);
						}

						// normalize id(s) property and determine whether the result should be an array
						if (query.hasOwnProperty("ids") && !(query.ids instanceof Array)) {
							query.ids = [query.ids];
						}
						else if (query.hasOwnProperty("id") && !(query.id instanceof Array)) {
							query.ids = [query.id];
							delete query.id;
						}
						else {
							// we know that either id or ids is specified, so if neither
							// one is NOT an array, then the query must be an array
							this.state[varName].isArray = true;

							// pre-initialize array queries
							var arr = [];
							Observer.makeObservable(arr);
							this.context.model[varName] = arr;
						}

						// get rid of junk (null/undefined/empty) ids
						query.ids = filter(query.ids, not(isNullOrEmpty));

						// remove new ids for later processing
						query.newIds = purge(query.ids, equals($newId()));

						// Store the paths for later use in lazy loading
						query.normalized = ExoWeb.Model.PathTokens.normalizePaths(query.include);
						ObjectLazyLoader.addPaths(query.from, query.normalized);

						// use temporary config setting to enable/disable scope-of-work functionality
						if (query.inScope !== false) {
							if (query.ids.length > 0) {
								this.state[varName].scopeQuery = {
									from: query.from,
									ids: query.ids,
									// TODO: this will be subset of paths interpreted as scope-of-work
									include: query.include ? query.include : [],
									inScope: true,
									forLoad: false
								};
							}
						}
					}, this);
				}

				// Undo predictive pending "callback" set up before models were processed.
				if (this._predictiveModelPending) {
					delete this._predictiveModelPending;
					allSignals.oneDone();
				}

				callback.call(thisPtr || this);
			},

		// Only fetch the types if they are not embedded. If the types are
		// embedded then fetching the types from server will cause a signal to
		// be created that will never be processed.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$fetchTypes(callback, thisPtr) {
				var typesToLoad = [], model = this.context.model.meta, instances = this.options.instances, signal = new ExoWeb.Signal("ContextQuery$fetchTypes");

				// Include types for all instances in instance payload
				if (instances && (!this.options.types || this.options.types instanceof Array)) {
					eachProp(this.options.instances, function(t) {
						// Add the type of the instances.
						var mtype = model.type(t);
						if (!mtype || !LazyLoader.isLoaded(mtype)) {
							typesToLoad.push(t);
						}
					}, this);
				}

				// Load all types specified in types portion of query
				if (this.options.types && this.options.types instanceof Array) {
					this.options.types
						.map(function(t) {
							return t.from || t;
						}).filter(function(t) {
							// Exclude types that are already loaded
							var mtype = model.type(t);
							return !model || !LazyLoader.isLoaded(mtype);
						}).forEach(function(t) {
							if (!typesToLoad.contains(t)) {
								typesToLoad.push(t);
							}
						});
				}

				// Fetch types in a single batch request
				if (typesToLoad.length > 0) {
					fetchTypes(model, typesToLoad, signal.pending(), this);
				}

				// Fetch additional types based on model queries and paths
				if (this.options.model && (!this.options.types || this.options.types instanceof Array)) {
					ExoWeb.eachProp(this.options.model, function (varName, query) {
						fetchQueryTypes(this.context.model.meta, query.from, query.normalized, signal.pending());
					}, this);
				}

				signal.waitForAll(callback, thisPtr);
			},

		// Process embedded data as if it had been recieved from the server in
		// the form of a web service response. This should enable flicker-free
		// page loads by embedded data, changes, etc.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$processEmbedded(callback, thisPtr) {
				ExoWeb.trace.log("context", "Processing embedded data in query.");

				if (this.options.instances || this.options.conditions || (this.options.types && !(this.options.types instanceof Array))) {
					var handler = new ResponseHandler(this.context.model.meta, this.context.server, {
						instances: this.options.instances,
						conditions: this.options.conditions,
						types: this.options.types && this.options.types instanceof Array ? null : this.options.types,
						serverInfo: this.options.serverInfo
					});

					handler.execute(function () {
						// Update 'isNew' for objects that show up in InitNew changes.
						if (this.options.changes) {
							this.options.changes.forEach(function (change) {
								if (change.type === "InitNew") {
									tryGetJsType(this.context.server.model, change.instance.type, null, false, function (jstype) {
										var obj = jstype.meta.get(change.instance.id);
										if (obj) {
											obj.meta.isNew = true;
										}
									}, this);
								}
							}, this);
						}

						callback.call(thisPtr || this);
					}, this);
				}
				else {
					callback.call(thisPtr || this);
				}
			},

		// Detect batch query candidates and send batch request, if batching is
		// enabled (true by default).
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$doBatchRequest(callback, thisPtr) {
				if (this.options.model && ExoWeb.config.individualQueryLoading !== true) {
					var pendingQueries = [];
					var batchQuerySignal;

					ExoWeb.trace.log("context", "Looking for potential loading requests in query.");

					ExoWeb.eachProp(this.options.model, function (varName, query) {
						if (!query.load && query.ids.length > 0) {
							var jstype = ExoWeb.Model.Model.getJsType(query.from, true);

							// get a list of ids that should be batch-requested
							var batchIds = filter(query.ids, function (id, index) {
								// if the type doesn't exist, include the id in the batch query
								if (!jstype) return true;

								// check to see if the object already exists, i.e. because of embedding
								var obj = jstype.meta.get(translateId(this.context.server._translator, query.from, id));

								// if it doesn't exist, include the id in the batch query
								if (obj === undefined) return true;

								// otherwise, include it in the model
								if (this.state[varName].isArray) {
									this.context.model[varName][index] = obj;
								}
								else {
									this.context.model[varName] = obj;
								}
							}, this);

							if (batchIds.length > 0) {
								if (batchQuerySignal === undefined) {
									batchQuerySignal = new ExoWeb.Signal("batch query");
									batchQuerySignal.pending(null, this, true);
								}

								// complete the individual query signal after the batch is complete
								batchQuerySignal.waitForAll(this.state[varName].signal.pending(null, this, true), this, true);

								pendingQueries.push({
									from: query.from,
									ids: batchIds,
									include: query.include || [],
									inScope: true,
									forLoad: true
								});
							}
						}
					}, this);

					if (pendingQueries.length > 0) {
						// perform batch query
						queryProvider(pendingQueries, null,
							function context$objects$callback(result) {
								objectsFromJson(this.context.model.meta, result.instances, function () {
									if (result.conditions) {
										conditionsFromJson(this.context.model.meta, result.conditions, null, function () {
											batchQuerySignal.oneDone();
										});
									}
									else {
										batchQuerySignal.oneDone();
									}
								}, this);
							},
							function context$objects$callback(error) {
								ExoWeb.trace.logError("objectInit", "Failed to load batch query (HTTP: {_statusCode}, Timeout: {_timedOut})", error);
								batchQuerySignal.oneDone();
							}, this);
					}
				}

				callback.call(thisPtr || this);
			},

		// Send individual requests and simulate for "load" option.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$doIndividualRequests(callback, thisPtr) {
				if (this.options.model) {
					// 2) Start loading instances individually
					ExoWeb.eachProp(this.options.model, function (varName, query) {
						if (query.load) {
							// bypass all server callbacks if data is embedded
							this.state[varName].objectJson = query.load.instances;
							this.state[varName].conditionsJson = query.load.conditions;
						}
						// need to load data from server
						// fetch object state if an id of a persisted object was specified
						else if (ExoWeb.config.individualQueryLoading === true) {
							tryGetJsType(this.context.model.meta, query.from, null, true, function (type) {
								// TODO: eliminate duplication!!!
								// get the list of ids that should be individually loaded
								var individualIds = filter(query.ids, function (id, index) {
									// check to see if the object already exists, i.e. because of embedding
									var obj = type.meta.get(translateId(this.context.server._translator, query.from, id));

									// if it doesn't exist, include the id in the batch query
									if (obj === undefined) return true;

									// otherwise, include it in the model
									if (this.state[varName].isArray) {
										this.context.model[varName][index] = obj;
									}
									else {
										this.context.model[varName] = obj;
									}
								}, this);

								if (individualIds.length > 0) {
									// for individual queries, include scope queries for all *BUT* the query we are sending
									var scopeQueries = [];
									var currentVarName = varName;
									ExoWeb.eachProp(this.options.model, function (varName, query) {
										if (varName !== currentVarName && this.state[varName].scopeQuery) {
											scopeQueries.push(this.state[varName].scopeQuery);
										}
									}, this);

									objectProvider(query.from, individualIds, query.include || [], true, null, scopeQueries,
										this.state[varName].signal.pending(function context$objects$callback(result) {
											this.state[varName].objectJson = result.instances;
											this.state[varName].conditionsJson = result.conditions;
										}, this, true),
										this.state[varName].signal.orPending(function context$objects$callback(error) {
											ExoWeb.trace.logError("objectInit",
												"Failed to load {0}({1}) (HTTP: {3}, Timeout: {4})",
												query.from,
												query.ids,
												error._statusCode,
												error._timedOut);
										}, this, true), this);
								}
							}, this);
						}
					}, this);
				}

				callback.call(thisPtr || this);
			},

		// Load static paths for queries that don't otherwise require loading.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$doStaticRequests(callback, thisPtr) {
				if (this.options.model) {
					ExoWeb.eachProp(this.options.model, function (varName, query) {
						if (!query.load && query.ids.length === 0) {
							// Remove instance paths when an id is not specified
							var staticPaths = query.include ? query.include.filter(function (p) { return !p.startsWith("this."); }) : null;

							// Only call the server if paths were specified
							if (staticPaths && staticPaths.length > 0) {
								objectProvider(null, null, staticPaths, false, null,
									allSignals.pending(function context$objects$callback(result) {
										// load the json. this may happen asynchronously to increment the signal just in case
										objectsFromJson(this.context.model.meta, result.instances, allSignals.pending(function () {
											if (result.conditions) {
												conditionsFromJson(this.context.model.meta, result.conditions, null, allSignals.pending());
											}
										}), this);
									}, this, true),
									allSignals.orPending(function context$objects$callback(error) {
										ExoWeb.trace.logError("objectInit",
											"Failed to load {0}({1}) (HTTP: {2}, Timeout: {3})",
											query.from,
											query.ids,
											error._statusCode,
											error._timedOut);
									}, this, true)
								);
							}
						}
					}, this);
				}

				callback.call(thisPtr || this);
			},

		// Process instances data for queries as they finish loading.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$processResults(callback, thisPtr) {
				if (this.options.model) {
					ExoWeb.eachProp(this.options.model, function (varName, query) {
						this.state[varName].signal.waitForAll(function context$model() {
							// make sure everything isn't considered complete until new objects are also created
							if (query.newIds) allSignals.pending();

							// check to see if the root(s) have already been established
							if ((!this.state[varName].isArray && this.context.model[varName]) ||
								(this.state[varName].isArray && !query.ids.some(function (id, index) { return !this.context.model[varName][index]; }))) {

								allSignals.oneDone();
								return;
							}
							// otherwise, loading is required to establish roots if there are any server ids
							else if (query.ids.length > 0) {
								var processResponse = new Signal("processing response");

								if (this.state[varName].objectJson) {
									// load the json. this may happen asynchronously so increment the signal just in case
									objectsFromJson(this.context.model.meta, this.state[varName].objectJson, processResponse.pending(null, this), this, true);

									// indicate that instance data is already being loaded
									delete this.state[varName].objectJson;
								}

								processResponse.waitForAll(this.state[varName].signal.pending(function context$model$callback() {
									var mtype = this.context.model.meta.type(query.from);

									if (!mtype) {
										ExoWeb.trace.throwAndLog("context", $format("Could not get type {0} required to process query results.", [query.from]));
									}

									// establish roots for each id
									forEach(query.ids, function (id, index) {
										// TODO: resolve translator access
										var clientId = translateId(this.context.server._translator, query.from, id);
										var obj = mtype.get(clientId);

										// if it doesn't exist, raise an error
										if (obj === undefined)
											ExoWeb.trace.throwAndLog("context", "Could not get {0} with id = {1}{2}.", [query.from, clientId, (id !== clientId ? "(" + id + ")" : "")]);

										// otherwise, include it in the model
										if (!this.state[varName].isArray && !this.context.model[varName]) {
											this.context.model[varName] = obj;
										}
										else if (this.state[varName].isArray && !this.context.model[varName][index]) {
											this.context.model[varName][index] = obj;
										}
									}, this);

									if (this.state[varName].conditionsJson) {
										conditionsFromJson(this.context.model.meta, this.state[varName].conditionsJson, null, function () {
											// model object has been successfully loaded!
											allSignals.oneDone();
										}, this);
									}
									else {
										// model object has been successfully loaded!
										allSignals.oneDone();
									}
								}, this), this);
							}
							else {
								// model object has been successfully loaded!
								allSignals.oneDone();
							}

							if (this.state[varName].objectJson) {
								// ensure that instance data is loaded (even if not needed to establish roots) just in case
								// root object was satisfied because it happened to be a part of the model of another root object
								objectsFromJson(this.context.model.meta, this.state[varName].objectJson, allSignals.pending());
							}

							// construct a new object(s) if a new id(s) was specified
							if (query.newIds) {
								// if json must be processed, signal will have been incremented again
								this.state[varName].signal.waitForAll(function () {
									if (this.state[varName].isArray) {
										foreach(query.newIds, function (index) {
											this.context.model[varName][index] = new (this.context.model.meta.type(query.from).get_jstype())();
										}, this);
									}
									else {
										this.context.model[varName] = new (this.context.model.meta.type(query.from).get_jstype())();
									}
								}, this);

								// model object has been successfully loaded!
								allSignals.oneDone();
							}
						}, this);
					}, this, true);
				}

				callback.call(thisPtr || this);
			},

		// Perform pre-processing of model queries and their paths.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$postQueries(callback, thisPtr) {
				if (this.options.model) {
					ExoWeb.trace.log("context", "Running post query step for model queries.");
					ExoWeb.eachProp(this.options.model, function (varName, query) {
						if (this.state[varName].scopeQuery) {
							ServerSync$addScopeQuery.call(this.context.server, this.state[varName].scopeQuery);
						}
					}, this);
				}

				callback.call(thisPtr || this);
			},

		// Final cleanup step. Allow rules to run initially, end the batch,
		// and allow the server sync to start capturing existing objects in
		// order to attach a lazy loader.
		///////////////////////////////////////////////////////////////////////////////
			function ContextQuery$cleanup(callback, thisPtr) {
				allSignals.waitForAll(function () {
					// allows previously defered rules to run
					this.context.model.meta.notifyBeforeContextReady();

					ExoWeb.Batch.end(this.batch);
				}, this, true);

				callback.call(thisPtr || this);
			}
		)
	});

	// #endregion

	// #region ExoWeb.Mapper.ExoWeb
	//////////////////////////////////////////////////

	// Don't activate the DOM automatically, instead delay until after context initialization
	Sys.activateDom = false;

	// Object constant to signal to mapper to create a new instance rather than load one
	var $newId = function $newId() {
		return "$newId";
	};

	window.$newId = $newId;

	// Indicates whether or not the DOM has been activated
	var activated = false;

	var modelReadyHandler = function modelReadyHandler(contextReady, extendContext, domReady) {
		return function () {
			var readySignal = new Signal();

			if (extendContext) {
				extendContext(window.context, readySignal.pending());
			}

			readySignal.waitForAll(function modelReadyHandler$signalReady() {
				if (contextReady) {
					contextReady(window.context);
				}

				$(function modelReadyHandler$documentReady() {
					// Activate the document if this is the first context to load
					if (!activated) {
						activated = true;
						Sys.Application.activateElement(document.documentElement);
					}

					// Invoke dom ready notifications
					if (domReady) {
						domReady(window.context);
					}
				});
			});
		};
	};

	// The (combined) set of options that are pending execution
	// Options will stack up until something is encountered that triggers loading to occur
	var pendingOptions = null;

	var updatePendingOptionsWith = function updatePendingOptionsWith(newOptions) {
		if (pendingOptions !== null) {
			pendingOptions.init = mergeFunctions(pendingOptions.init, newOptions.init);
			pendingOptions.extendContext = mergeFunctions(pendingOptions.extendContext, newOptions.extendContext, { async: true, callbackIndex: 1 });
			pendingOptions.contextReady = mergeFunctions(pendingOptions.contextReady, newOptions.contextReady);
			pendingOptions.domReady = mergeFunctions(pendingOptions.domReady, newOptions.domReady);
			pendingOptions.types = pendingOptions.types ? (newOptions.types ? pendingOptions.types.concat(newOptions.types) : pendingOptions.types) : newOptions.types;
			pendingOptions.model = pendingOptions.model ? $.extend(pendingOptions.model, newOptions.model) : newOptions.model;
			pendingOptions.changes = pendingOptions.changes ? (newOptions.changes ? pendingOptions.changes.concat(newOptions.changes) : pendingOptions.changes) : newOptions.changes;
			pendingOptions.conditions = pendingOptions.conditions ? $.extend(pendingOptions.conditions, newOptions.conditions) : newOptions.conditions;
			pendingOptions.instances = pendingOptions.instances ? $.extend(pendingOptions.instances, newOptions.instances) : newOptions.instances;
			pendingOptions.serverInfo = pendingOptions.serverInfo ? $.extend(pendingOptions.serverInfo, newOptions.serverInfo) : newOptions.serverInfo;
		}
		else {
			pendingOptions = newOptions;
		}
	};

	var flushPendingOptions = function flushPendingOptions() {
		var includesEmbeddedData, executingOptions, init, contextReady, extendContext, domReady;

		includesEmbeddedData = pendingOptions.model ||
			(pendingOptions.types && !(pendingOptions.types instanceof Array)) ||
			pendingOptions.instances ||
			pendingOptions.conditions ||
			pendingOptions.changes;

		if (includesEmbeddedData) {
			executingOptions = pendingOptions;
			pendingOptions = null;

			window.context = ensureContext();

			// Perform context initialization when the model is ready
			if (executingOptions.contextReady || executingOptions.extendContext || executingOptions.domReady || !activated) {
				window.context.addReady(modelReadyHandler(executingOptions.contextReady, executingOptions.extendContext, executingOptions.domReady));
			}

			// Perform initialization immediately
			if (executingOptions.init) {
				executingOptions.init(window.context);
			}

			// Start the new query
			Context.query(window.context, {
				model: executingOptions.model,
				types: executingOptions.types,
				changes: executingOptions.changes,
				conditions: executingOptions.conditions,
				instances: executingOptions.instances,
				serverInfo: executingOptions.serverInfo
			});
		}
		else if (window.context) {
			if (!(window.context instanceof Context)) {
				ExoWeb.trace.throwAndLog("context", "The window object has a context property that is not a valid context.");
			}

			if (pendingOptions.init) {
				// Context has already been created, so perform initialization and remove it so that we don't double-up
				init = pendingOptions.init;
				pendingOptions.init = null;
				init(window.context);
			}

			if (pendingOptions.contextReady || pendingOptions.extendContext || pendingOptions.domReady) {
				contextReady = pendingOptions.contextReady;
				extendContext = pendingOptions.extendContext;
				domReady = pendingOptions.domReady;
				pendingOptions.contextReady = pendingOptions.extendContext = pendingOptions.domReady = null;
				window.context.addReady(modelReadyHandler(contextReady, extendContext, domReady));
			}
		}
	};

	// Global method for initializing ExoWeb on a page
	var $exoweb = function $exoweb(newOptions) {
		// Support initialization function argument
		if (newOptions instanceof Function) {
			newOptions = { init: newOptions };
		}

		updatePendingOptionsWith(newOptions);
		flushPendingOptions();
	};

	window.$exoweb = $exoweb;

	// #endregion

	// #region ExoWeb.Mapper.Extend
	//////////////////////////////////////////////////

	var pendingTypeExtensions = {};
	var pendingSubtypeExtensions = {};

	function raiseExtensions(mtype) {
		//ExoWeb.Batch.whenDone(function() { 
			// apply app-specific configuration
			// defer until loading is completed to reduce init events
			var exts = pendingTypeExtensions[mtype.get_fullName()];
			if (exts) {
				delete pendingTypeExtensions[mtype.get_fullName()];
				exts(mtype.get_jstype());
			}

			mtype.eachBaseType(function(baseType) {
				var subExts = pendingSubtypeExtensions[baseType.get_fullName()];
				if (subExts) {
					// don't delete subtype extensions since more subtypes may be created
					subExts(mtype.get_jstype());
				}
			});
		//});
	}

	function extendOne(typeName, callback, thisPtr) {
		var jstype = ExoWeb.Model.Model.getJsType(typeName, true);

		if (jstype && ExoWeb.Model.LazyLoader.isLoaded(jstype.meta)) {
			callback.call(thisPtr || this, jstype);
		}
		else {
			var pending = pendingTypeExtensions[typeName];

			if (!pending) {
				pending = pendingTypeExtensions[typeName] = ExoWeb.Functor();
			}

			pending.add(thisPtr ? callback.bind(thisPtr) : callback);
		}
	}

	window.$extend = function(typeInfo, callback, thisPtr) {
		if (!typeInfo) {
			ExoWeb.trace.throwAndLog("extend", "Invalid value passed into $extend, argument must be of type String or String[].");
		}

		// If typeInfo is an arry of type names, then use a signal to wait until all types are loaded.
		if (Object.prototype.toString.call(typeInfo) === "[object Array]") {
			var signal = new ExoWeb.Signal("extend");

			var types = [];
			Array.forEach(typeInfo, function(item, index) {
				if (item.constructor !== String) {
					ExoWeb.trace.throwAndLog("extend", "Invalid value passed into $extend, item in array must be of type String.");
				}

				extendOne(item, signal.pending(function(type) {
					types[index] = type;
				}), thisPtr);
			});

			signal.waitForAll(function() {
				// When all types are available, call the original callback.
				callback.apply(thisPtr || this, types);
			});
		}
		// Avoid the overhead of signal and just call extendOne directly.
		else {
			if (typeInfo.constructor !== String) {
				ExoWeb.trace.throwAndLog("extend", "Invalid value passed into $extend, argument must be of type String or String[].");
			}

			extendOne(typeInfo, callback, thisPtr);
		}
	};

	window.$extendSubtypes = function(typeName, callback, thisPtr) {
		if (!typeName || typeName.constructor !== String) {
			ExoWeb.trace.throwAndLog("extend", "Invalid value passed into $extendSubtypes, argument must be of type String.");
		}

		var jstype = ExoWeb.Model.Model.getJsType(typeName, true);

		if (jstype) {
			// Call for existing, loaded subtypes
			Array.forEach(jstype.meta.derivedTypes || [], function(mtype) {
				if (mtype && ExoWeb.Model.LazyLoader.isLoaded(mtype)) {
					callback.call(thisPtr || this, mtype.get_jstype());
					Array.forEach(mtype.derivedTypes || [], arguments.callee.spliceArguments(1, 2));
				}
			});
		}
	
		var pending = pendingSubtypeExtensions[typeName];

		if (!pending) {
			pending = pendingSubtypeExtensions[typeName] = ExoWeb.Functor();
		}

		pending.add(thisPtr ? callback.bind(thisPtr) : callback);
	};

	window.$extendProperties = function (typeName, includeBuiltIn, callback, thisPtr) {
		if (!typeName || typeName.constructor !== String) {
			ExoWeb.trace.throwAndLog("extend", "Invalid value passed into $extendProperties, argument must be of type String.");
		}

		if (includeBuiltIn && includeBuiltIn instanceof Function) {
			thisPtr = callback;
			callback = includeBuiltIn;
			includeBuiltIn = false;
		}

		extendOne(typeName, function (jstype) {
			// Raise handler for existing properties
			jstype.meta.get_properties().forEach(function (prop) {
				if (includeBuiltIn === true || prop.get_origin() !== "server")
					callback.call(thisPtr || this, prop, true);
			});

			// Raise handler when new properties are added
			jstype.meta.addPropertyAdded(function (sender, args) {
				callback.call(thisPtr || this, args.property, false);
			});
		});
	}

	// #endregion

	// #region ExoWeb.UI.Toggle
	//////////////////////////////////////////////////

	function Toggle(element) {

		// Default action is show
		this._action = "show";

		Toggle.initializeBase(this, [element]);
	}

	var Toggle_allowedActions = ["show", "hide", "enable", "disable", "render", "dispose", "addClass", "removeClass"];

	// Actions
	Toggle.mixin({
		// Show/Hide
		//////////////////////////////////////////////////////////
		link_show: function Toggle$link_show() {
			if ((this._action === "show" && $(this._element).is(".toggle-on")) || (this._action === "hide" && $(this._element).is(".toggle-off"))) {
				this.set_state("on");
			}
			else {
				this.set_state("off");
			}
		},
		do_show: function Toggle$do_show() {
			$(this._element).show();
			this.set_state("on");

			// visibility has changed so raise event
			if (this._visible === undefined || this._visible === false) {
				Sys.Observer.raiseEvent(this, "shown");
			}

			this._visible = true;
		},
		do_hide: function Toggle$do_hide() {
			$(this._element).hide();
			this.set_state("off");

			// visibility has changed so raise event
			if (this._visible === undefined || this._visible === true) {
				Sys.Observer.raiseEvent(this, "hidden");
			}

			this._visible = false;
		},
		add_on: function Toggle$add_on(handler) {
			this._addHandler("on", handler);
		},
		remove_on: function Toggle$remove_on(handler) {
			this._removeHandler("on", handler);
		},
		add_off: function Toggle$add_off(handler) {
			this._addHandler("off", handler);
		},
		remove_off: function Toggle$remove_off(handler) {
			this._removeHandler("off", handler);
		},
		add_shown: function Toggle$add_shown(handler) {
			this._addHandler("shown", handler);
		},
		remove_shown: function Toggle$remove_shown(handler) {
			this._removeHandler("shown", handler);
		},
		add_hidden: function Toggle$add_hidden(handler) {
			this._addHandler("hidden", handler);
		},
		remove_hidden: function Toggle$remove_hidden(handler) {
			this._removeHandler("hidden", handler);
		},
		get_visible: function Toggle$get_visible() {
			return this._visible;
		},

		// Enable/Disable
		//////////////////////////////////////////////////////////
		link_disable: function Toggle$link_disable() {
			if ((this._action === "disable" && $(this._element).is(".toggle-on")) || (this._action === "enable" && $(this._element).is(".toggle-off"))) {
				$("select,input,textarea,a,button,optgroup,option", this._element).andSelf().attr("disabled", "disabled");
				this.set_state("off");
			}
			else {
				this.set_state("on");
			}
		},
		do_enable: function Toggle$do_enable() {
			$("select,input,textarea,a,button,optgroup,option", this._element).andSelf().removeAttr("disabled");
			this.set_state("on");
		},
		do_disable: function Toggle$do_disable() {
			$("select,input,textarea,a,button,optgroup,option", this._element).andSelf().attr("disabled", "disabled");
			this.set_state("off");
		},

		// Render/Destroy
		//////////////////////////////////////////////////////////
		link_render: function Toggle$link_render() {
			this._context = null;

			if ((this._action === "render" && $(this._element).is(".toggle-on")) || (this._action === "dispose" && $(this._element).is(".toggle-off"))) {
				var pctx = this.get_templateContext();

				if (!this._ctxIdx && this._element.childNodes.length > 0)
					throw new Error("A toggle control is attached to the node, which expects a template context id, but no id was specified.");

				var newContext = new Sys.UI.TemplateContext(this._ctxIdx);
				newContext.data = pctx.dataItem;
				newContext.components = [];
				newContext.nodes = [];
				newContext.dataItem = pctx.dataItem;
				newContext.index = 0;
				newContext.parentContext = pctx;
				newContext.containerElement = this._element;
				newContext.template = this._getTemplate();
				newContext.template._ensureCompiled();
				this._context = newContext;

				Sys.Application._linkContexts(pctx, this, pctx.dataItem, this._element, newContext, this._contentTemplate);

				newContext.initializeComponents();
				newContext._onInstantiated(null, true);
				this.set_state("on");
			}
			else {
				this.set_state("off");
			}
		},
		init_render: function Toggle$init_render() {
			if (!this._template && !$(this._element).is(".sys-template")) {
				ExoWeb.trace.throwAndLog(["ui", "toggle"], "When using toggle in render/dispose mode, the element should be marked with the \"sys-template\" class.");
			}

			this._template = new Sys.UI.Template(this._element);
			this._template._ensureCompiled();
			$(this._element).empty();
			$(this._element).removeClass("sys-template");
		},
		do_render: function Toggle$do_render() {
			var pctx = this.get_templateContext();

			var renderArgs = new Sys.Data.DataEventArgs(pctx.dataItem);
			Sys.Observer.raiseEvent(this, "rendering", renderArgs);

			this.set_state("on");
			$(this._element).empty();
			$(this._element).show();

			var context = this._context = this._template.instantiateIn(this._element, pctx.dataItem, pctx.dataItem, 0, null, pctx, this._contentTemplate);
			context.initializeComponents();

			Sys.Observer.raiseEvent(this, "rendered", renderArgs);
		},
		do_dispose: function Toggle$do_dispose() {
			var renderArgs = new Sys.Data.DataEventArgs();
			Sys.Observer.raiseEvent(this, "rendering", renderArgs);

			this.set_state("off");
			if (this._context) {
				this._context.dispose();
			}
			$(this._element).empty();
			$(this._element).hide();

			Sys.Observer.raiseEvent(this, "rendered", renderArgs);
		},
		add_rendering: function (handler) {
			this._addHandler("rendering", handler);
		},
		remove_rendering: function (handler) {
			this._removeHandler("rendering", handler);
		},
		add_rendered: function (handler) {
			this._addHandler("rendered", handler);
		},
		remove_rendered: function (handler) {
			this._removeHandler("rendered", handler);
		},

		// addClass / removeClass
		//////////////////////////////////////////////////////////
		do_addClass: function Toggle$do_addClass() {
			var $el = $(this._element);
		
			if(!$el.is("." + this._class)) {
				$el.addClass(this._class);
				this.set_state("on");
				Sys.Observer.raiseEvent(this, "classAdded");
			}
		},
		do_removeClass: function Toggle$do_removeClass() {
			var $el = $(this._element);
		
			if($el.is("." + this._class)) {
				$el.removeClass(this._class);
				this.set_state("off");
				Sys.Observer.raiseEvent(this, "classRemoved");
			}
		},
		add_classAdded: function Toggle$add_classAdded(handler) {
			this._addHandler("classAdded", handler);
		},
		remove_classAdded: function Toggle$remove_classAdded(handler) {
			this._removeHandler("classAdded", handler);
		},
		add_classRemoved: function Toggle$add_classRemoved(handler) {
			this._addHandler("classRemoved", handler);
		},
		remove_classRemoved: function Toggle$remove_classRemoved(handler) {
			this._removeHandler("classRemoved", handler);
		}
	});

	// Inverse Actions
	Toggle.mixin({
		// Hide/Show
		//////////////////////////////////////////////////////////
		link_hide: Toggle.prototype.link_show,
		init_hide: Toggle.prototype.init_show,
		undo_hide: Toggle.prototype.do_show,
		undo_show: Toggle.prototype.do_hide,

		// Enable/Disable
		//////////////////////////////////////////////////////////
		link_enabled: Toggle.prototype.link_disable,
		init_disable: Toggle.prototype.init_enable,
		undo_disable: Toggle.prototype.do_enable,
		undo_enable: Toggle.prototype.do_disable,

		// Render/Dispose
		//////////////////////////////////////////////////////////
		link_dispose: Toggle.prototype.link_render,
		init_dispose: Toggle.prototype.init_render,
		undo_render: Toggle.prototype.do_dispose,
		undo_dispose: Toggle.prototype.do_render,

		// addClass/removeClass
		//////////////////////////////////////////////////////////
		undo_addClass: Toggle.prototype.do_removeClass,
		undo_removeClass: Toggle.prototype.do_addClass
	});

	Toggle.mixin({
		_generatesContext: function Toggle$_generatesContext() {
			return this._action === "render" || this._action === "dispose";
		},
		_getTemplate: function Toggle$_getTemplate() {
			return this._template;
		},
		_setTemplate: function Toggle$_setTemplate(value) {
			this._template = value;
		},
		_setTemplateCtxId: function Toggle$_setTemplateCtxId(idx) {
			this._ctxIdx = idx;
		},

		get_templateContext: function Toggle$get_templateContext() {
			/// <value mayBeNull="false" type="Sys.UI.TemplateContext" locid="P:J#ExoWeb.UI.Toggle.templateContext"></value>
			if (!this._parentContext) {
				this._parentContext = Sys.UI.Template.findContext(this._element);
			}
			return this._parentContext;
		},
		set_templateContext: function Toggle$set_templateContext(value) {
			this._parentContext = value;
		},

		get_action: function Toggle$get_action() {
			/// <summary>
			/// The value that determines what the control should
			/// do when its state changes. Ignored if the class property is set
			/// Options:  show, hide, enable, disable, render, dispose, addClass, removeClass
			/// </summary>

			return this._action;
		},
		set_action: function Toggle$set_action(value) {
			if (!Array.contains(Toggle_allowedActions, value)) {
				ExoWeb.trace.throwAndLog("ui", "Invalid toggle action \"{0}\".  Possible values are \"{1}\".", [value, Toggle_allowedActions.join(", ")]);
			}

			this._action = value;
			this.execute();
		},

		get_class: function Toggle$get_class() {
			/// <summary>
			/// Class to add or remove
			/// </summary>

			return this._class;
		},
		set_class: function Toggle$set_class(value) {
			this._class = value;
			if (!this._action)
				this._action = "addClass";
			this.execute();
		},

		get_on: function Toggle$get_on() {
			/// <summary>
			/// The value that the control will watch to determine
			/// when its state should change.
			/// </summary>

			return this._on;
		},
		set_on: function Toggle$set_on(value) {
			var changed = value !== this._on;

			if (changed) {
				if (this._on && this._on instanceof Array) {
					Observer.removeCollectionChanged(this._on, this._collectionChangedHandler);
				}

				this._on = value;

				if (this._on && this._on instanceof Array) {
					this._collectionChangedHandler = this.execute.bind(this);
					Observer.addCollectionChanged(this._on, this._collectionChangedHandler);
				}

				this.execute();
			}
			else if (this._when && this._when instanceof Function) {
				this._on = value;
				this.execute();
			}
		},

		get_when: function Toggle$get_when() {
			/// <summary>
			/// The value to compare "on" to, this will most likely 
			/// be a static value, like true or false.
			/// </summary>

			return this._when;
		},
		set_when: function Toggle$set_when(value) {
			this._when = value;
			this.execute();
		},

		set_strictMode: function Toggle$set_strictMode(value) {
			/// <summary>
			/// If true, the "on" value will be strictly compared
			/// to the "when" value.  Otherwise, if "when" is undefined
			/// the "on" value will be checked for truthiness.
			/// </summary>

			this._strictMode = value;
		},
		get_strictMode: function Toggle$get_strictMode() {
			return this._strictMode;
		},

		get_groupName: function Toggle$get_groupName() {
			return this._groupName;
		},
		set_groupName: function Toggle$set_groupName(value) {
			this._groupName = value;
		},

		get_state: function Toggle$get_state() {
			return this._state;
		},
		set_state: function Toggle$set_state(value) {
			this._state = value;
			this._stateClass(value);
			Sys.Observer.raiseEvent(this, value);
		},

		equals: function Toggle$equals() {
			if (this._when === undefined) {
				// When is not defined, so condition depends entirely on "on" property
				var onType = Object.prototype.toString.call(this._on);

				if (this._strictMode === true) {
					if (this._on.constructor !== Boolean)
						ExoWeb.trace.throwAndLog("ui", "With strict mode enabled, toggle:on should be a value of type Boolean.");

					return this._on;
				}
				else if (onType === "[object Array]") {
					return this._on.length > 0;
				}
				else {
					// Default case when not in strict mode is truthiness.
					return !!this._on;
				}
			}
			else if (this._when instanceof Function) {
				var result = this._when(this._on);
				if (this._strictMode === true) {
					if (result === null || result === undefined || result.constructor !== Boolean)
						ExoWeb.trace.throwAndLog("ui", "With strict mode enabled, toggle:when function should return a value of type Boolean.");
					return result;
				}
				else {
					return !!result;
				}
			}
			else {
				return this._on === this._when;
			}
		},

		canExecute: function Toggle$canExecute() {
			// Ensure that the control is initialized, has an element, and the "on" property has been set.
			// Scenario 1:  The set_on or set_when methods may be called before the control has been initialized.
			// Scenario 2:  If a lazy markup extension is used to set the "on" or "when" properties then a callback could set the 
			//				property value when the element is undefined, possibly because of template re-rendering.
			// Scenario 3:  If a lazy markup extension is used to set the "on" property then it may not have a value when initialized.
			return this.get_isInitialized() && this._element !== undefined && this._element !== null && this.hasOwnProperty("_on");
		},
		execute: function Toggle$execute() {
			if (this.canExecute()) {
				this[(this.equals() === true ? "do_" : "undo_") + this._action].call(this);
			}
		},
		addContentTemplate: function Toggle$addContentTemplate(tmpl) {
			if (this._action !== "render" && this._action !== "dispose" && this.get_templateContext() === Sys.Application._context) {
				throw Error.invalidOperation("invalidSysContentTemplate");
			}
			Sys.UI.IContentTemplateConsumer.prototype.addContentTemplate.apply(this, arguments);
		},
		dispose: function ExoWeb$UI$Toggle$dispose() {
			if (this._template) {
				this._template.dispose();
			}
			if (this._context) {
				this._context.dispose();
			}
			this._action = this._class = this._collectionChangedHandler = this._contentTemplate =
				this._context = this._ctxIdx = this._groupName = this._on = this._parentContext =
				this._state = this._strictMode = this._template = this._visible = this._when = null;
			ExoWeb.UI.Toggle.callBaseMethod(this, "dispose");
		},
		link: function Toggle$link() {
			// Perform custom link logic for the action
			var actionLink = this["link_" + this._action];
			if (actionLink) {
				actionLink.call(this);
			}

			ExoWeb.UI.Toggle.callBaseMethod(this, "link");
		},
		initialize: function Toggle$initialize() {
			Toggle.callBaseMethod(this, "initialize");

			if (this.get_isLinkPending()) {
				this.link();
			}
			else {
				// Perform custom init logic for the action
				var actionInit = this["init_" + this._action];
				if (actionInit) {
					actionInit.call(this);
				}
	
				this.execute();
			}
		},
		_stateClass: function(state)
		{
			if(state == "on")
				$(this._element).addClass("toggle-on").removeClass("toggle-off");
			else
				$(this._element).removeClass("toggle-on").addClass("toggle-off");
		}
	});

	ExoWeb.UI.Toggle = Toggle;
	Toggle.registerClass("ExoWeb.UI.Toggle", Sys.UI.Control, Sys.UI.ITemplateContextConsumer, Sys.UI.IContentTemplateConsumer);

	// #endregion

	// #region ExoWeb.UI.ToggleGroup
	//////////////////////////////////////////////////

	function ToggleGroup(element) {
		ToggleGroup.initializeBase(this, [element]);
	}

	ToggleGroup.mixin({
		_execute: function ToggleGroup$_execute() {
			if (this._visible.length === 0 && this._children.length > 0) {
				$(this._element).hide();
			}
			else {
				$(this._element).show();
			}
		},
		_toggleAdded: function ToggleGroup$_toggleAdded(idx, elem) {
			if (elem.control.get_groupName() === this._name && !Array.contains(this._children, elem)) {
				this._children.push(elem);

				if (elem.control.get_state() === "on") {
					this._add(elem);
				}

				elem.control.add_on(this._onHandler);
				elem.control.add_off(this._offHandler);
			}
		},
		_toggleRemoved: function ToggleGroup$_toggleRemoved(idx, elem) {
			if (Array.contains(this._children, elem)) {
				elem.control.remove_on(this._onHandler);
				elem.control.remove_off(this._offHandler);

				this._remove(elem);
				this._children.remove(elem);
				this._execute();
			}
		},
		_toggleOn: function ToggleGroup$_toggleOn(sender) {
			this._add(sender.get_element());
			this._execute();
		},
		_toggleOff: function ToggleGroup$_toggleOff(sender) {
			this._remove(sender.get_element());
			this._execute();
		},
		get_name: function ToggleGroup$get_name() {
			return this._name;
		},
		set_name: function ToggleGroup$set_name(value) {
			this._name = value;
		},
		_add: function (elem) {
			if (this._visible.indexOf(elem) < 0)
				this._visible.push(elem);
		},
		_remove: function (elem) {
			this._visible.remove(elem);
		},
		initialize: function ToggleGroup$initialize() {
			ToggleGroup.callBaseMethod(this, "initialize");

			this._children = [];
			this._visible = [];

			this._onHandler = this._toggleOn.bind(this);
			this._offHandler = this._toggleOff.bind(this);

			$(":toggle", this._element).ever(this._toggleAdded.bind(this), this._toggleRemoved.bind(this));

			this._execute();
		}
	});

	ExoWeb.UI.ToggleGroup = ToggleGroup;
	ToggleGroup.registerClass("ExoWeb.UI.ToggleGroup", Sys.UI.Control);

	// #endregion

	// #region ExoWeb.UI.Template
	//////////////////////////////////////////////////

	function Template(element) {
		/// <summary locid="M:J#ExoWeb.UI.Template.#ctor">
		/// In addition to defining template markup, also defines rules that are used
		/// to determine if it should be chosen as the template for a given element
		/// based on a CSS selector as well as a javascript filter that is evaluated 
		/// against the element in question.
		/// </summary>
		/// <param name="element"></param>
		Template.initializeBase(this, [element]);
	}

	var allTemplates = {};

	Template.prototype = {

		get_name: function Template$get_name() {
			/// <value mayBeNull="true" type="String" locid="P:J#ExoWeb.UI.Template.name"></value>
			return this._name;
		},
		set_name: function Template$set_name(value) {
			this._name = value;
		},

		get_nameArray: function Template$get_nameArray() {
			/// <value mayBeNull="true" type="String" locid="P:J#ExoWeb.UI.Template.nameArray"></value>
			if (this._name && !this._nameArray) {
				this._nameArray = this._name.trim().split(/\s+/);
			}
			return this._nameArray;
		},

		get_kind: function Template$get_kind() {
			/// <value mayBeNull="true" type="String" locid="P:J#ExoWeb.UI.Template.kind"></value>
			return this._kind;
		},
		set_kind: function Template$set_kind(value) {
			this._kind = value;
		},

		get_dataType: function Template$get_dataType() {
			/// <value mayBeNull="true" type="String" locid="P:J#ExoWeb.UI.Template.dataType"></value>
			return this._dataType;
		},
		set_dataType: function Template$set_dataType(value) {
			if (ExoWeb.isType(value, Function)) {
				this._dataType = ExoWeb.parseFunctionName(value);
				this._dataTypeCtor = value;
			}
			else if (ExoWeb.isType(value, String)) {
				this._dataType = value;
			}
		},

		get_dataTypeCtor: function Template$get_dataTypeCtor() {
			/// <value mayBeNull="true" type="String" locid="P:J#ExoWeb.UI.Template.dataTypeCtor"></value>
			if (!this._dataTypeCtor && ExoWeb.isType(this._dataType, String)) {
				// lazy evaluate the actual constructor
				this._dataTypeCtor = ExoWeb.getCtor(this._dataType);
			}
			return this._dataTypeCtor;
		},

		get_isReference: function Template$get_isReference() {
			/// <value mayBeNull="true" type="Boolean" locid="P:J#ExoWeb.UI.Template.isReference"></value>
			return this._isReference;
		},
		set_isReference: function Template$set_isReference(value) {
			if (value && value.constructor === String) {
				var str = value.toLowerCase().trim();
				if (str === "true") {
					value = true;
				}
				else if (str === "false") {
					value = false;
				}
				else {
					this._isReferenceText = value;
					value = null;
				}
			}
			this._isReference = value;
		},

		get_isList: function Template$get_isList() {
			/// <value mayBeNull="true" type="Boolean" locid="P:J#ExoWeb.UI.Template.isList"></value>
			return this._isList;
		},
		set_isList: function Template$set_isList(value) {
			if (value && value.constructor === String) {
				var str = value.toLowerCase().trim();
				if (str === "true") {
					value = true;
				}
				else if (str === "false") {
					value = false;
				}
				else {
					this._isListText = value;
					value = null;
				}
			}
			this._isList = value;
		},

		get_aspects: function Template$get_aspects() {
			/// <value mayBeNull="true" type="Boolean" locid="P:J#ExoWeb.UI.Template.aspects"></value>
			if (!this._aspects) {
				var aspects = this._aspects = {};
				if (this._isList !== null && this._isList !== undefined) {
					aspects.isList = this._isList;
				}
				if (this._isReference !== null && this._isReference !== undefined) {
					aspects.isReference = this._isReference;
				}
				if (this.get_dataType() !== null && this.get_dataType() !== undefined) {
					aspects.dataType = this.get_dataTypeCtor();
				}
			}
			return this._aspects;
		},

		isCorrectKind: function Template$isCorrectKind(obj) {
			/// <summary locid="M:J#ExoWeb.UI.Template.isCorrectKind">
			/// Determines whether the given object is of the correct kind
			/// for the template, if a kind is specified.
			/// </summary>
			/// <param name="obj" optional="false" mayBeNull="false"></param>
			/// <returns type="Boolean"></returns>
			if (obj instanceof ExoWeb.View.Adapter) {
				return this._kind === "@";
			}
			else {
				return this._kind === undefined;
			}
		},

		_namesSatisfiedBy: function Template$_namesSatisfiedBy(names) {
			/// <summary locid="M:J#ExoWeb.UI.Template._namesSatisfiedBy">
			/// Determines whether the given names collection satisifes all
			/// required template names.
			/// </summary>
			/// <param name="names" type="Array" optional="false" mayBeNull="false"></param>
			/// <returns type="Boolean"></returns>
			return !this.get_nameArray() || !this.get_nameArray().some(function(n) { return !names.contains(n); });
		},

		_aspectsSatisfiedBy: function Template$_aspectsSatisfiedBy(aspects) {
			/// <summary locid="M:J#ExoWeb.UI.Template._aspectsSatisfiedBy">
			/// Determines whether the given data satisfies special aspects
			/// required by the template.
			/// </summary>
			/// <param name="aspects" type="Array" optional="false" mayBeNull="false"></param>
			/// <returns type="Boolean"></returns>
			var satisfied = true;
			eachProp(this.get_aspects(), function(name, value) {
				if (!aspects.hasOwnProperty(name) || (value === null || value === undefined) || (name !== "dataType" && aspects[name] !== value) || (name === "dataType" && aspects[name] !== value && !(aspects[name] && aspects[name].meta && aspects[name].meta.isSubclassOf(value.meta)))) {
					return (satisfied = false);
				}
			});
			return satisfied;
		},

		matches: function Template$matches(data, names) {
			/// <summary locid="M:J#ExoWeb.UI.Template.matches">
			/// Determines whether the given data and name array match the template.
			/// </summary>
			/// <param name="data" optional="false" mayBeNull="false"></param>
			/// <param name="names" type="Array" optional="false" mayBeNull="false"></param>
			/// <returns type="Boolean"></returns>
			if (this._namesSatisfiedBy(names)) {
				var aspects;
				if (data && data.aspects && data.aspects instanceof Function) {
					aspects = data.aspects();
				}
				else {
					aspects = {
						isList: (data && data instanceof Array),
						isReference: (data && data instanceof ExoWeb.Model.Entity)
					};
					if (data === null || data === undefined) {
						aspects.dataType = null;
					}
					else if (data instanceof ExoWeb.Model.Entity) {
						aspects.dataType = data.meta.type.get_jstype();
					}
					else if (data instanceof Array) {
						aspects.dataType = Array;
					}
					else if (data instanceof Object) {
						aspects.dataType = Object;
					}
					else {
						aspects.dataType = data.constructor;
					}
				}
				return this._aspectsSatisfiedBy(aspects);
			}
		},

		toString: function() {
			return $format("<{0} name=\"{1}\" kind=\"{2}\" datatype=\"{3}\" isreference=\"{4}\" islist=\"{5}\" />",
				this._element.tagName.toLowerCase(),
				this._name || "",
				this._kind || "",
				this._dataType || "",
				isNullOrUndefined(this._isReference) ? "" : this._isReference,
				isNullOrUndefined(this._isList) ? "" : this._isList
			);
		},

		dispose: function Template$dispose() {
			this._aspects = this._contentTemplate = this._dataType = this._dataTypeCtor = this._isList = this._isListText =
				this._isReference = this._isReferenceText = this._kind = this._name = this._nameArray = null;
			ExoWeb.UI.Template.callBaseMethod(this, "dispose");
		},

		initialize: function() {
			/// <summary locid="M:J#ExoWeb.UI.Template.initialize" />
			Template.callBaseMethod(this, "initialize");

			// add a class that can be used to search for templates 
			// and make sure that the template element is hidden
			$(this._element).addClass("exoweb-template").hide();

			if (this._element.control.constructor !== String) {
				var el = this._element;
				var tagName = el.tagName.toLowerCase();
				var cache = allTemplates[tagName];
				if (!cache) {
					cache = allTemplates[tagName] = [];
				}
				cache.push(el);
			}
		}

	};

	function findTemplate(tagName, data, names) {
		/// <summary locid="M:J#ExoWeb.UI.Template.find">
		/// Finds the first field template that match the given data and names and returns the template.
		/// </summary>
		ExoWeb.trace.log(["templates"], "attempt to find template match for names = {0}, data = {1}", [names.join(","), data]);

		if (data === undefined || data === null) {
			ExoWeb.trace.logWarning("templates", "Attempting to find template for {0} data.", [data === undefined ? "undefined" : "null"]);
		}

		var cache;
		if (cache = allTemplates[tagName]) {
			for (var t = cache.length - 1; t >= 0; t--) {
				var tmplEl = cache[t];
				var tmpl = tmplEl.control;
	
				if (tmpl instanceof Template) {
					var isCorrectKind = tmpl.isCorrectKind(data);
					if ((isCorrectKind === undefined || isCorrectKind === true) && tmpl.matches(data, names)) {
						return tmplEl;
					}
				}
			}
		}

		return null;
	}

	// bookkeeping for Template.load
	// TODO: consider wrapper object to clean up after templates are loaded?
	var templateCount = 0;
	var externalTemplatesSignal = new ExoWeb.Signal("external templates");
	var lastTemplateRequestSignal;

	Template.load = function Template$load(path, options) {
		/// <summary locid="M:J#ExoWeb.UI.Template.load">
		/// Loads external templates into the page.
		/// </summary>

		var id = "exoweb-templates-" + (templateCount++);

		var lastReq = lastTemplateRequestSignal;

		// set the last request signal to the new signal and increment
		var signal = lastTemplateRequestSignal = new ExoWeb.Signal(id);
		var callback = externalTemplatesSignal.pending(signal.pending(function () {
			//				ExoWeb.trace.log("ui", "Activating elements for templates \"{0}\"", [id]);
			// Activate template controls within the response.
			Sys.Application.activateElement(this);
		}));

		$(function ($) {
			var tmpl = $("<div id='" + id + "'/>")
					.hide()
					.appendTo("body");

			//if the template is stored locally look for the path as a div on the page rather than the cache
			if (options && options.isLocal === true) {
				var localTemplate = $('#' + path);
				callback.call(localTemplate.get(0));
			}
			else {
				var html = ExoWeb.cache(path);

				if (html) {
					tmpl.append(html);
					callback.call(tmpl.get(0));
				} 
				else {
					tmpl.load(path, function (responseText, textStatus, jqXHR) {
						if (jqXHR.isResolved()) {
							// Cache the template
							ExoWeb.cache(path, responseText);

							// if there is a pending request then wait for it to complete
							if (lastReq) {
								lastReq.waitForAll(callback, this);
							}
							else {
								callback.call(this);
							}
						}
					});
				}
			}
		});
	};

	ExoWeb.UI.Template = Template;
	Template.registerClass("ExoWeb.UI.Template", Sys.UI.Control, Sys.UI.IContentTemplateConsumer);

	// #endregion

	// #region ExoWeb.UI.Content
	//////////////////////////////////////////////////

	function Content(element) {
		/// <summary locid="M:J#ExoWeb.UI.Content.#ctor">
		/// Finds its matching template and renders using the provided data as the 
		/// binding context.  It can be used as a "field control", using part of the 
		/// context data to select the appropriate control template.  Another common 
		/// usage would be to select the appropriate template for a portion of the UI,
		/// as in the example where an objects meta type determines how it is 
		/// displayed in the UI.
		/// </summary>
		/// <param name="element"></param>
		Content.initializeBase(this, [element]);
	}

	var contentControlsRendering = 0;

	registerActivity("Content rendering", function() {
		if (contentControlsRendering < 0) {
			ExoWeb.trace.logWarning("ui", "Number of content controls rendering should never dip below zero.");
		}

		return contentControlsRendering > 0;
	});

	Content.prototype = {

		get_template: function Content$get_template() {
			/// <value mayBeNull="true" type="String" locid="P:J#ExoWeb.UI.Content.template"></value>
			return this._template;
		},
		set_template: function (value) {
			this._template = value;
		},

		get_data: function Content$get_data() {
			/// <value mayBeNull="false" locid="P:J#ExoWeb.UI.Content.data"></value>
			return this._data;
		},
		set_data: function Content$set_data(value) {
			var removedData = ((value === undefined || value === null) && (this._data !== undefined && this._data !== null));

			if (this._changedHandler) {
				// Remove old change handler if applicable.
				Observer.removeCollectionChanged(this._data, this._changedHandler);
				delete this._changedHandler;
			}

			this._data = value;

			if (value instanceof Array) {
				// Watch for changes to an array.
				this._changedHandler = this._collectionChanged.bind(this);
				Observer.addCollectionChanged(value, this._changedHandler);
			}

			// Force rendering to occur if we previously had a value and now do not.
			this.update(removedData);
		},

		get_disabled: function Content$get_disabled() {
			/// <value mayBeNull="false" type="Boolean" locid="P:J#ExoWeb.UI.Content.disabled"></value>
			return this._disabled === undefined ? false : !!this._disabled;
		},
		set_disabled: function Content$set_disabled(value) {
			var newValue;

			if (value.constructor === Boolean) {
				newValue = value;
			}
			else if (value.constructor === String) {
				newValue = value.toLowerCase() == "true" ? true : (value.toLowerCase() == "false" ? false : undefined);
			}
			else {
				ExoWeb.trace.throwAndLog(["ui", "content"], "Invalid value for property \"disabled\": {0}.", [value]);
			}

			var oldValue = this._disabled;
			this._disabled = newValue;

			if (oldValue === true && newValue === false) {
				this.update();
			}
		},

		get_contexts: function Content$get_contexts() {
			/// <value mayBeNull="false" type="Array" locid="P:J#ExoWeb.UI.Content.contexts"></value>
			return [this._context];
		},

		get_templateContext: function Content$get_templateContext() {
			/// <value mayBeNull="false" type="Sys.UI.TemplateContext" locid="P:J#ExoWeb.UI.Content.templateContext"></value>
			if (!this._parentContext) {
				this._parentContext = Sys.UI.Template.findContext(this._element);
			}
			return this._parentContext;
		},
		set_templateContext: function Context$set_templateContext(value) {
			this._parentContext = value;
		},

		get_isRendered: function Context$get_isRendered() {
			/// <value mayBeNull="false" type="Boolean" locid="P:J#ExoWeb.UI.Content.isRendered"></value>
			return this._isRendered;
		},

		add_rendering: function Content$add_rendering(handler) {
			/// <summary locid="E:J#ExoWeb.UI.Content.rendering" />
			this._addHandler("rendering", handler);
		},
		remove_rendering: function Content$remove_rendering(handler) {
			this._removeHandler("rendering", handler);
		},

		add_rendered: function Content$add_rendered(handler) {
			/// <summary locid="E:J#ExoWeb.UI.Content.rendered" />
			this._addHandler("rendered", handler);
		},
		remove_rendered: function Content$remove_rendered(handler) {
			this._removeHandler("rendered", handler);
		},

		add_error: function (handler) {
			/// <summary locid="E:J#ExoWeb.UI.Content.error" />
			this._addHandler("error", handler);
		},
		remove_error: function (handler) {
			this._removeHandler("error", handler);
		},

		_collectionChanged: function (sender, args) {
			this.update(true);
		},

		_initializeResults: function Content$_initializeResults() {
			if (this._context) {
				this._context.initializeComponents();
			}
		},

		_generatesContext: function Content$_generatesContext() {
			return true;
		},
		_setTemplateCtxId: function Content$_setTemplateCtxId(idx) {
			this._ctxIdx = idx;
		},

		_findTemplate: function Content$_findTemplate() {
			/// <summary locid="M:J#ExoWeb.UI.Content._findTemplate">
			/// Find the first matching template for the content control.
			/// </summary>
			var tmplNames;
			if (this._contentTemplate) {
				tmplNames = this._contentTemplate;
			}
			if (this._template) {
				if (tmplNames) {
					tmplNames += " ";
					tmplNames += this._template;
				}
				else {
					tmplNames = this._template;
				}
			}

			var tmplEl = findTemplate(this._element.tagName.toLowerCase(), this._data, tmplNames ? tmplNames.trim().split(/\s+/) : []);

			if (!tmplEl) {
				ExoWeb.trace.throwAndLog(["ui", "templates"], "This content region does not match any available templates. Tag={0}, Data={1}, Template={2}", [this._element.tagName.toLowerCase(), this._data, tmplNames || ""]);
			}

			return tmplEl;
		},

		_canRender: function Content$_canRender(force) {
			/// <summary locid="M:J#ExoWeb.UI.Content._canRender">
			/// Ensure that the control is initialized, has an element, and the "data" property has been set.
			/// 1) The set_data method may be called before the control has been initialized.
			/// 2) If a lazy markup extension is used to set the "data" property then a callback could set the 
			/// property value when the element is undefined, possibly because of template re-rendering.
			/// 3) If a lazy markup extension is used to set the "data" property then it may not have a value when initialized.
			/// Also check that the control has not been disabled.
			/// </summary>

			return ((this._data !== undefined && this._data !== null) || force === true) &&
				this.get_isInitialized() && this._element !== undefined && this._element !== null && !this.get_disabled();
		},

		_getResultingTemplateNames: function Content$_getResultingTemplateNames(tmplEl) {
			// use sys:content-template (on content control) and content:template
			var contentTemplateNames;
			if (this._contentTemplate) {
				contentTemplateNames = this._contentTemplate;
				if (this._template) {
					contentTemplateNames += " " + this._template;
				}
			}
			else if (this._template) {
				contentTemplateNames = this._template;
			}
			else {
				contentTemplateNames = "";
			}

			var contentTemplate = contentTemplateNames.trim().split(/\s+/).distinct();

			// Remove names matched by the template
			if (contentTemplate.length > 0) {
				var tmplNames = tmplEl.control.get_nameArray();
				if (tmplNames) {
					purge(contentTemplate, function(name) {
						return tmplNames.indexOf(name) >= 0;
					});
				}
			}

			// Add sys:content-template defined on the template element
			if (tmplEl.control._contentTemplate) {
				contentTemplate.addRange(tmplEl.control._contentTemplate.trim().split(/\s+/));
			}

			return contentTemplate;
		},

		_render: function Content$_render() {
			/// <summary locid="M:J#ExoWeb.UI.Content._render">
			/// Render the content template into the container element.
			/// </summary>

			// Failing to empty content before rendering can result in invalid content since rendering 
			// content is not necessarily in order because of waiting on external templates.
			var container = this._element;

			$(container).empty();

			var parentContext = this.get_templateContext();
			this._context = null;

			var data = this._data;
			if (data !== null && data !== undefined) {
				var tmplEl = this._findTemplate();
				var template = new Sys.UI.Template(tmplEl);

				// get custom classes from template
				var classes = $(tmplEl).attr("class");
				if (classes) {
					classes = $.trim(classes.replace("exoweb-template", "").replace("sys-template", ""));
					$(container).addClass(classes);
				}

				// Get the list of template names applicable to the control's children
				var contentTemplate = this._getResultingTemplateNames(tmplEl);

				this._context = template.instantiateIn(container, this._data, this._data, 0, null, parentContext, contentTemplate.join(" "));

				this._initializeResults();
			}
		},

		_renderStart: function Content$_renderStart(force) {
			/// <summary locid="M:J#ExoWeb.UI.Content._renderStart">
			/// Start the rendering process. There may be a delay if external templates
			/// have not yet finished loading.
			/// </summary>
			if (this._canRender(force)) {
				contentControlsRendering++;

				externalTemplatesSignal.waitForAll(function () {
					if (this._element === undefined || this._element === null) {
						contentControlsRendering--;
						return;
					}

					var renderArgs = new Sys.Data.DataEventArgs(this._data);
					Sys.Observer.raiseEvent(this, "rendering", renderArgs);

					this._isRendered = false;

					try {
						this._render();
						this._isRendered = true;
						Sys.Observer.raiseEvent(this, "rendered", renderArgs);
					}
					finally {
						contentControlsRendering--;
					}
				}, this);
			}
		},

		link: function Content$link() {
			/// <summary locid="M:J#ExoWeb.UI.Content.link" />
			if (!this._linkInProgress) {
				this._linkInProgress = true;
				externalTemplatesSignal.waitForAll(function () {
					delete this._linkInProgress;
					this._isRendered = true;
					this._context = null;

					if (!this._ctxIdx && this._element.childNodes.length > 0)
						throw new Error("A content control is attached to the node, which expects a template context id, but no id was specified.");

					if ((this._data !== null && this._data !== undefined) || this._element.childNodes.length > 0) {
						var pctx = this.get_templateContext();
						var tmplEl = this._findTemplate();

						var newContext = new Sys.UI.TemplateContext(this._ctxIdx);
						newContext.data = this._data;
						newContext.components = [];
						newContext.nodes = [];
						newContext.dataItem = this._data;
						newContext.index = 0;
						newContext.parentContext = pctx;
						newContext.containerElement = this._element;
						newContext.template = new Sys.UI.Template(tmplEl);
						newContext.template._ensureCompiled();

						this._context = newContext;

						// Get the list of template names applicable to the control's children
						var contentTemplate = this._getResultingTemplateNames(tmplEl);

						var element = this._element;
						Sys.Application._linkContexts(pctx, this, this._data, element, newContext, contentTemplate.join(" "));

						for (var i = 0; i < element.childNodes.length; i++) {
							newContext.nodes.push(element.childNodes[i]);
						}

						newContext._onInstantiated(null, true);
						this._initializeResults();
					}

					ExoWeb.UI.Content.callBaseMethod(this, 'link');
				}, this);
			}
		},

		update: function Content$update(force) {
			if (this.get_isLinkPending()) {
				if (this.hasOwnProperty("_data")) {
					this.link();
				}
			}
			else if (this._canRender(force)) {
				this._renderStart(force);
			}
		},

		dispose: function ExoWeb$UI$Content$dispose() {
			if (this._context) {
				this._context.dispose();
			}
			if (this._changedHandler) {
				Observer.removeCollectionChanged(this._data, this._changedHandler);
				this._changedHandler = null;
			}
			this._contentTemplate = this._context = this._ctxIdx =
				this._data = this._disabled = this._isRendered = this._parentContext = this._template = null;
			ExoWeb.UI.Content.callBaseMethod(this, "dispose");
		},

		initialize: function Content$initialize() {
			/// <summary locid="M:J#ExoWeb.UI.Content.initialize" />
			Content.callBaseMethod(this, "initialize");

			if ($(this._element).is(".sys-template")) {
				if ($(this._element).children().length > 0) {
					ExoWeb.trace.logWarning(["ui", "content"],
						"Content control is marked with the \"sys-template\" class, which means that its children will be ignored and discarded.");
				}
				else {
					ExoWeb.trace.logWarning(["ui", "content"],
						"No need to mark a content control with the \"sys-template\" class.");
				}
			}
			this.update();
		}

	};

	ExoWeb.UI.Content = Content;
	Content.registerClass("ExoWeb.UI.Content", Sys.UI.Control, Sys.UI.ITemplateContextConsumer, Sys.UI.IContentTemplateConsumer);

	// #endregion

	// #region ExoWeb.UI.DataView
	//////////////////////////////////////////////////

	var dataViewsRendering = 0;

	registerActivity("DataView rendering", function() {
		if (dataViewsRendering < 0) {
			ExoWeb.trace.logWarning("ui", "Number of dataview controls rendering should never dip below zero.");
		}

		return dataViewsRendering > 0;
	});

	var dataViewRefresh = Sys.UI.DataView.prototype.refresh;
	Sys.UI.DataView.prototype.refresh = function refresh() {
		dataViewsRendering++;

		if (this.get_element()) {
			dataViewRefresh.apply(this, arguments);
		}
		else {
			ExoWeb.trace.logWarning("ui", "Attempting to refresh, but DataView was being disposed.");
		}

		dataViewsRendering--;
	};

	// #endregion

	// #region ExoWeb.UI.Html
	//////////////////////////////////////////////////

	function Html(element) {
		/// <summary>
		/// </summary>
		/// <example>
		///		<div sys:attach="html" html:url="http://www.google.com"></div>
		/// </example>

		Html.initializeBase(this, [element]);
	}

	Html.prototype = {
		get_source: function Html$get_source() {
			return this._source;
		},
		set_source: function Html$set_source(value) {
			this._source = value;
		},
		get_loadingClass: function Html$get_loadingClass() {
			return this._loadingClass;
		},
		set_loadingClass: function Html$set_loadingClass(value) {
			this._loadingClass = value;
		},
		get_url: function Html$get_url() {
			return this._url;
		},
		set_url: function Html$set_url(value) {
			this._url = value;
		},
		get_path: function Html$get_path() {
			var source = this.get_source();
			var url = this.get_url();
			if (source instanceof ExoWeb.Model.Entity) {
				url = source.toString(url);
			}
			return $format(url, source);
		},
		initialize: function Html$initialize() {
			Html.callBaseMethod(this, "initialize");

			var path = this.get_path();
			var element = this.get_element();
			var loadingClass = this.get_loadingClass();

			$(element).addClass(loadingClass);

			$(element).load(path, function(responseText, status, response) {
				$(element).removeClass(loadingClass);

				if (status != "success" && status != "notmodified") {
					ExoWeb.trace.throwAndLog("ui", "Failed to load html: status = {0}", status);
				}
			});
		}
	};

	ExoWeb.UI.Html = Html;
	Html.registerClass("ExoWeb.UI.Html", Sys.UI.Control);

	// #endregion

	// #region ExoWeb.UI.Behavior
	//////////////////////////////////////////////////

	function Behavior(element) {
		/// <summary>
		/// </summary>
		/// <example>
		///		<div sys:attach="behavior" behavior:script="Sys.scripts.Foo" behavior:class="My.Class" behavior:prop-foo="bar"></div>
		/// </example>

		Behavior.initializeBase(this, [element]);
	}

	Behavior.prototype = {
		get_script: function Behavior$get_script() {
			return this._script;
		},
		set_script: function Behavior$set_script(value) {
			this._script = value;
		},
		get_scriptObject: function Behavior$get_script() {
			if (!this._scriptObject) {
				var path = this._script.startsWith("window") ?
					this._script.substring(7) :
					this._script;

				this._scriptObject = ExoWeb.evalPath(window, path);
			}

			return this._scriptObject;
		},
		get_class: function Behavior$get_class() {
			return this._class;
		},
		set_class: function Behavior$set_class(value) {
			this._class = value;
		},
		get_dontForceLoad: function Behavior$get_dontForceLoad() {
			return this._dontForceLoad;
		},
		set_dontForceLoad: function Behavior$set_dontForceLoad(value) {
			this._dontForceLoad = value;
		},
		get_classObject: function Behavior$get_classObject() {
			if (!this._classObject) {
				this._classObject = ExoWeb.getCtor(this._class);
			}

			return this._classObject;
		},
		get_properties: function Behavior$get_properties() {
			if (!this._properties) {
				this._properties = {};
				for (var prop in this) {
					if (prop.startsWith("prop_") && !prop.startsWith("prop_add_")) {
						var name = Sys.Application._mapToPrototype(prop.substring(5), this.get_classObject());

						if (!name) {
							ExoWeb.trace.throwAndLog("ui",
								"Property '{0}' could not be found on type '{1}'.",
								[prop.substring(5), this._class]);
						}

						this._properties[name] = this[prop];
					}
				}
			}

			return this._properties;
		},
		get_events: function Behavior$get_events() {
			if (!this._events) {
				this._events = {};
				for (var prop in this) {
					if (prop.startsWith("prop_add_")) {
						var name = Sys.Application._mapToPrototype(prop.substring(9), this.get_classObject());

						if (!name) {
							ExoWeb.trace.throwAndLog("ui",
								"Event '{0}' could not be found on type '{1}'.",
								[prop.substring(9), this._class]);
						}

						this._events[name] = this[prop];
					}
				}
			}

			return this._events;
		},
		_create: function Behavior$create() {
			// if the element is not within the document body it 
			// probably means that it is being removed - TODO: verify
			if (!$.contains(document.body, this._element)) {
				return;
			}

			this._behavior = $create(this.get_classObject(), this.get_properties(), this.get_events(), null, this._element);
		},
		initialize: function Behavior$initialize() {
			Behavior.callBaseMethod(this, "initialize");

			if (!this._dontForceLoad) {
				Sys.require([this.get_scriptObject()], this._create.bind(this));
			}
			else {
				this._create();
			}
		}
	};

	ExoWeb.UI.Behavior = Behavior;
	Behavior.registerClass("ExoWeb.UI.Behavior", Sys.UI.Control);

	// #endregion

	// #region ExoWeb.UI.Utilities
	//////////////////////////////////////////////////

	function getTemplateSubContainer(childElement) {
		var element = childElement;

		function isDataViewOrContent(el) {
			return (el.control && el.control instanceof Sys.UI.DataView) ||
				(el.control && el.control instanceof ExoWeb.UI.Content);
		}

		// find the first parent that has an attached ASP.NET Ajax dataview or ExoWeb content control (ignore toggle)
		while (element.parentNode && !isDataViewOrContent(element.parentNode)) {
			element = element.parentNode;
		}

		// containing template was not found
		if (element.parentNode && isDataViewOrContent(element.parentNode)) {
			return element;
		}
	}

	function getDataForContainer(container, subcontainer, index) {
		if (!container) {
			return;
		}

		var data = null;

		if (container.control instanceof Sys.UI.DataView || container.control instanceof ExoWeb.UI.Content) {
			var containerContexts = container.control.get_contexts();
			var containerData = container.control.get_data();

			// ensure an array for conformity
			if (!(containerData instanceof Array)) {
				containerData = [containerData];
			}

			if (containerContexts) {
				// if there is only one context in the array then the index must be zero
				if (containerContexts.length == 1) {
					index = 0;
				}

				if (index !== undefined && index !== null && index.constructor === Number) {
					if (index >= containerContexts.length) {
//							ExoWeb.trace.log("ui", "invalid index");
					}
					else {
						var indexedContext = containerContexts[index];
						var indexedData = containerData[index];
						data = (indexedContext) ? indexedContext.dataItem : indexedData;
					}
				}
				else {
					// try to find the right context based on the element's position in the dom
					for (var i = 0, l = containerContexts.length; i < l; i++) {
						var childContext = containerContexts[i];
						if (childContext && childContext.containerElement === container && Sys._indexOf(childContext.nodes, subcontainer) > -1) {
							data = childContext.dataItem;
						}
					}
				}
			}
		}

		return data;
	}

	function getParentContext(options/*{ target, subcontainer, index, level, dataType, ifFn }*/) {
		/// <summary>
		/// 	Finds the template context data based on the given options.
		/// </summary>
		/// <param name="options" type="Object">
		/// 	The object which contains the options to use.
		/// 	target:  The target from which to start searching.  This can be an HTML
		/// 					element, a control, or a template context.
		/// 		index (optional):  The index of the desired context.  If the desired context
		/// 					is one level up and is part of a list, this argument can be used
		/// 					to specify which template context to return.
		/// 		level (optional):  The number of levels to travel.  By default this is "1",
		/// 					which means that the immediate parent context data will be returned.
		/// 		dataType (optional):  If specified, this type is used as the type of data to search
		/// 					for.  When context data of this type is encountered it is returned.
		/// 					Note that arrays are not supported.  If the data is an array and the
		/// 					type of items must be checked, use the "ifFn" argument.
		/// 		ifFn (optional):  A function that determines whether the correct data has been
		/// 					found.  The context data is returned as soon as the result of calling 
		/// 					this function with the current data and container is true.
		/// </param>
		/// <returns type="Object" />

		var target = options.target, effectiveLevel = options.level || 1, container, subcontainer = options.subcontainer, i = 0, searching = true, context, data;

		if (target.control && (target.control instanceof Sys.UI.DataView || target.control instanceof ExoWeb.UI.Content)) {
			target = target.control;
		}
		else if (target instanceof Sys.UI.Template) {
			target = target.get_element();
		}
		else if (target instanceof Sys.UI.TemplateContext) {
			target = target.containerElement;
		}

		while (searching === true) {
			// if we are starting out with a dataview then look at the parent context rather than walking 
			// up the dom (since the element will probably not be present in the dom)
			if (!container && (target instanceof Sys.UI.DataView || target instanceof ExoWeb.UI.Content)) {
				context = target.get_templateContext();

				// If the control's context is the global context, then exit here with a custom result
				if (context._global === true) {
					return { data: null, global: true, container: document.documentElement, subcontainer: target.get_element() };
				}

				container = context.containerElement;

				if (container.control instanceof Toggle)
					container = Sys.UI.Template.findContext(container).containerElement;
			
				if (options.target && options.target.tagName) {
					subcontainer = getTemplateSubContainer(options.target);
				}
			}
			else {
				var obj = container || target;
				subcontainer = getTemplateSubContainer(obj);

				if (!subcontainer) {
					// Back up and attempt to go through the control.
					if (obj.control && (obj.control instanceof Sys.UI.DataView || container.control instanceof ExoWeb.UI.Content)) {
						container = null;
						target = obj.control;
						continue;
					}

					throw Error.invalidOperation("Not within a container template.");
				}

				container = subcontainer.parentNode;
			}

			// Increment the counter to check against the level parameter.
			i++;

			// Get the context data for the current level.
			data = getDataForContainer(container, subcontainer, options.index);

			if (options.dataType) {
				// Verify that the current data is not the data type that we are looking for.
				searching = !data || !(data instanceof options.dataType || data.constructor === options.dataType);
			}
			else if (options.ifFn) {
				// Verify that the stop function conditions are not met.
				searching = !(options.ifFn.call(this, data, container));
			}
			else {
				// Finally, check the level.  If no level was specified then we will only go up one level.
				searching = i < effectiveLevel;
			}
		}

		return { data: data, container: container, subcontainer: subcontainer };
	}

	ExoWeb.UI.getParentContext = getParentContext;

	ExoWeb.UI.getParentContextData = function() {
		return getParentContext.apply(this, arguments).data;
	};

	window.$parentContextData = function $parentContextData(target, index, level, dataType, ifFn) {
		/// <summary>
		/// 	Finds the template context data based on the given options.
		/// </summary>
		/// <param name="target" type="Object">
		/// 	The target from which to start searching.  This can be an HTML element, a 
		/// 	control, or a template context.
		/// </param>
		/// <param name="index" type="Number" integer="true" optional="true">
		/// 	The index of the desired context.  If the desired context is one level
		/// 	up and is part of a list, this argument can be used to specify which
		/// 	template context to return.
		/// </param>
		/// <param name="level" type="Number" integer="true" optional="true">
		/// 	The number of levels to travel.  By default this is "1", which means that
		/// 	the immediate parent context data will be returned.
		/// </param>
		/// <param name="dataType" type="Function" optional="true">
		/// 	If specified, this type is used as the type of data to search for.  When context
		/// 	data of this type is encountered it is returned.  Note that arrays are not supported.
		/// 	If the data is an array and the type of items must be checked, use the "ifFn" argument.
		/// </param>
		/// <param name="ifFn" type="Function" optional="true">
		/// 	A function that determines whether the correct data has been found.  The context data
		/// 	is returned as soon as the result of calling this function with the current data and 
		/// 	container is true.
		/// </param>
		/// <returns type="Object" />

		return getParentContext({
			"target": target,
			"index": index,
			"level": level,
			"dataType": dataType,
			"ifFn": ifFn
		}).data;
	};

	function getIsLast(control, index) {
		/// <summary>
		/// 	Returns whether the data for the given control at the given index is 
		/// 	the last object in the list.
		/// </summary>
		/// <param name="control" type="Sys.UI.Control">The control.</param>
		/// <param name="index" type="Number" integer="true">The index.</param>
		/// <returns type="Boolean" />

		var len = control.get_element().control.get_contexts().length;
		return index == len - 1;
	}

	window.$isLast = getIsLast;

	// #endregion

	// #region ExoWeb.View.AdapterMarkupExtension
	//////////////////////////////////////////////////

	Sys.Application.registerMarkupExtension(
		"@",
		function AdapterMarkupExtention(component, targetProperty, templateContext, properties) {
			if (properties.required) {
				ExoWeb.trace.logWarning(["@", "markupExt"], "Adapter markup extension does not support the \"required\" property.");
			}

			var path = properties.path || properties.$default;
			delete properties.$default;

			var source;
			if (properties.source) {
				source = properties.source;
				delete properties.source;
			}
			else {
				source = templateContext.dataItem;
			}

			var adapter;
			if (!path) {
				if (!(source instanceof Adapter)) {
					throw new Error("No path was specified for the \"@\" markup extension, and the source is not an adapter.");
				}
				for (var prop in properties) {
					if (properties.hasOwnProperty(prop) && prop !== "isLinkPending") {
						throw new Error("Additional adapter properties cannot be specified when deferring to another adapter (no path specified). Found property \"" + prop + "\".");
					}
				}
				adapter = source;
			}
			else {
				adapter = new Adapter(source, path, properties.format, properties);
				templateContext.components.push(adapter);
			}

			adapter.ready(function AdapterReady() {
				Observer.setValue(component, targetProperty, adapter);
			});
		},
		false
	);

	// #endregion

	// #region ExoWeb.View.MetaMarkupExtension
	//////////////////////////////////////////////////

	var bindingSetters = [];
	var setterExpr = /^set_(.*)$/;
	ExoWeb.eachProp(Sys.Binding.prototype, function(prop) {
		var name = setterExpr.exec(prop);
		if (name) {
			bindingSetters.push(name[1]);
		}
	});

	Sys.Application.registerMarkupExtension(
		"#",
		function MetaMarkupExtension(component, targetProperty, templateContext, properties) {
			if (properties.required) {
				ExoWeb.trace.logWarning(["#", "markupExt"], "Meta markup extension does not support the \"required\" property.");
			}

			var options, element;

			if (Sys.Component.isInstanceOfType(component)) {
				element = component.get_element();
			}
			else if (Sys.UI.DomElement.isDomElement(component)) {
				element = component;
			}

			options = Sys._merge({
				source: templateContext.dataItem,
				templateContext: templateContext,
				target: component,
				targetProperty: targetProperty,
				property: element.nodeName === "SELECT" ? "systemValue" : "displayValue"
			}, properties);

			delete properties.$default;

			// remove properties that apply to the binding
			for (var p in properties) {
				if (properties.hasOwnProperty(p)) {
					if (bindingSetters.indexOf(p) >= 0) {
						delete properties[p];
					}
				}
			}

			options.path = options.path || options.$default;
			delete options.$default;

			var adapter = options.source = new Adapter(options.source || templateContext.dataItem, options.path, options.format, properties);

			options.path = options.property;
			delete options.property;
		
			templateContext.components.push(adapter);
			templateContext.components.push(Sys.Binding.bind(options));
		},
		false
	);

	// #endregion

	// #region ExoWeb.View.ConditionMarkupExtension
	//////////////////////////////////////////////////

	Sys.Application.registerMarkupExtension("?",
		function (component, targetProperty, templateContext, properties) {
			var options = Sys._merge({
				source: templateContext.dataItem,
				templateContext: templateContext,
				targetProperty: targetProperty
			}, properties);

			var meta = options.source.meta;

			options.type = options.type || options.$default;
			delete options.$default;

			options.single = options.single && (options.single === true || options.single.toString().toLowerCase() === "true");

			var types = options.type ? options.type.split(",") : null;

			var sets = options.set ? options.set.split(",") : null;

			var target = function () {
				if (options.target && options.target.constructor === String)
					return evalPath(options.source, options.target);
				return options.target;
			};

			function updateConditions() {
				var currentTarget = target();
				var conditions = meta.conditions().filter(function (c) {
					return (!types || types.indexOf(c.type.code) >= 0) && // check for type code match (if specified)
						(!sets || intersect(sets, c.type.sets.map(function (s) { return s.name; })).length > 0) && // check for set code match (if specified)
						(!target || c.targets.some(function (t) { return t.target === currentTarget; })); // check for target (if specified)
				});

				if (options.single === true) {
					if (conditions.length > 1) {
						ExoWeb.trace.throwAndLog("?", "Multiple conditions were found for type \"{0}\".", [options.type]);
					}

					conditions = conditions.length === 0 ? null : conditions[0];
				}

				Observer.setValue(component, properties.targetProperty || targetProperty, conditions);
			}

			updateConditions();
			meta.addConditionsChanged(updateConditions, meta);
		},
		false);

	// #endregion

	// #region ExoWeb.View.Binding
	//////////////////////////////////////////////////

	function Binding(templateContext, source, sourcePath, target, targetPath, options, scopeChain) {
		Binding.initializeBase(this);

		this._templateContext = templateContext;
		this._source = source;
		this._sourcePath = sourcePath;
		this._target = target;

		var pathLower = targetPath ? targetPath.toLowerCase() : targetPath;
		if (pathLower === "innertext") {
			this._targetPath = "innerText";
		}
		else if (pathLower === "innerhtml") {
			this._targetPath = "innerHTML";
		}
		else {
			this._targetPath = targetPath;
		}

		this._options = options || {};

		this._isTargetElement = Sys.UI.DomElement.isDomElement(target);

		if (this._sourcePath) {
			// Start the initial fetch of the source value.
			this._evalSuccessHandler = this._evalSuccess.bind(this);
			this._evalFailureHandler = this._evalFailure.bind(this);
			ExoWeb.Model.LazyLoader.eval(this._source, this._sourcePath, this._evalSuccessHandler, this._evalFailureHandler, scopeChain);
		}
		else {
			this._evalSuccess(this._source);
		}
	}

	function ensureArray(value) {
		return isArray(value) ? value : (isNullOrUndefined(value) ? [] : [value]);
	}

	Binding.mixin({

		// Functions concerned with setting the value of the target after
		// the source value has been retrieved and manipulated based on options.
		//////////////////////////////////////////////////////////////////////////

		_setTarget: function(value) {
			if (this._isTargetElement && (this._targetPath === "innerText" || this._targetPath === "innerHTML")) {
				if (value && !isString(value))
					value = value.toString();

				// taken from Sys$Binding$_sourceChanged
				Sys.Application._clearContent(this._target);
				if (this._targetPath === "innerHTML")
					this._target.innerHTML = value;
				else
					this._target.appendChild(document.createTextNode(value));
				Observer.raisePropertyChanged(this._target, this._targetPath);
			}
			else if (this._isTargetElement && value === null) {
				// IE would set the value to "null"
				Observer.setValue(this._target, this._targetPath, "");
			}
			else {
				Observer.setValue(this._target, this._targetPath, value);
			}
		},

		_queue: function (value) {
			if (this._pendingValue) {
				this._pendingValue = value;
				return;
			}

			this._pendingValue = value;

			Batch.whenDone(function() {
				var targetValue = this._pendingValue;
				delete this._pendingValue;

				if (this._disposed === true) {
					return;
				}

				this._setTarget(targetValue);
			}, this);
		},

		// Functions that filter or transform the value of the source before
		// setting the target.  These methods are NOT asynchronous.
		//////////////////////////////////////////////////////////////////////////

		_getValue: function(value) {
			// Use a default value if the source value is null. NOTE: Because of the way LazyLoader.eval and evalPath are used,
			// the result should never be undefined. Undefined would indicate that a property did not exist, which would be an
			// error. This also has the side-effect of being more compatible with server-side rendering.
			if (value === null) {
				if (this._options.hasOwnProperty("nullValue")) {
					return this._options.nullValue;
				}
			}
			else {
				// Attempt to format the source value using a format specifier
				if (this._options.format) {
					return getFormat(value.constructor, this._options.format).convert(value);
				}
				else if (this._options.transform) {
					// Generate the transform function
					if (!this._transformFn) {
						this._transformFn = new Function("list", "$index", "$dataItem", "return $transform(list, true)." + this._options.transform + ";");
					}
					// Transform the original list using the given options
					var transformResult = this._transformFn(value, this._templateContext.index, this._templateContext.dataItem);
					if (transformResult.live !== Transform.prototype.live) {
						ExoWeb.trace.throwAndLog("~", "Invalid transform result: may only contain \"where\", \"orderBy\", \"select\", \"selectMany\", and \"groupBy\".");
					}
					return transformResult.live();
				}
			}
			return value;
		},

		// Functions that deal with responding to changes, asynchronous loading,
		// and general bookkeeping.
		//////////////////////////////////////////////////////////////////////////

		_require: function(source, callback) {
			ExoWeb.Model.LazyLoader.evalAll(source, this._options.required, function() {
				callback.call(this);
			}, null, null, this);
		},

		_update: function (value, oldItems, newItems) {
			if (this._disposed === true) {
				return;
			}

			// if necessary, remove an existing collection change handler
			if (this._collectionChangedHandler) {
				Observer.removeCollectionChanged(this._value, this._collectionChangedHandler);
				delete this._value;
				delete this._collectionChangedHandler;
			}

			// if the value is an array and we will transform the value or require paths, then watch for collection change events
			if (value && value instanceof Array && this._options.required) {
				this._value = value;
				this._collectionChangedHandler = this._collectionChanged.bind(this);
				Observer.makeObservable(value);
				Observer.addCollectionChanged(value, this._collectionChangedHandler);
			}

			// If additional paths are required then load them before invoking the callback.
			if (this._options.required) {
				this._updateWatchedItems(value, oldItems, newItems, function() {
					this._queue(this._getValue(value));
				});
			}
			else {
				this._queue(this._getValue(value));
			}
		},
	
		_updateWatchedItems: function(value, oldItems, newItems, callback) {
			// Unwatch require path for items that are no longer relevant.
			if (oldItems && oldItems.length > 0) {
				oldItems.forEach(function(item) {
					Observer.removePathChanged(item, this._options.required, this._watchedItemPathChangedHandler);
				}, this);
				delete this._watchedItemPathChangedHandler;
			}

			if (value) {
				// Load required paths, then manipulate the source value and update the target.
				this._require(value, function() {
					if (this._disposed === true) {
						return;
					}

					if (newItems && newItems.length > 0) {
						// Watch require path for new items.
						this._watchedItemPathChangedHandler = this._watchedItemPathChanged.bind(this);
						forEach(newItems, function(item) {
							Observer.addPathChanged(item, this._options.required, this._watchedItemPathChangedHandler, true);
						}, this);
					}

					if (callback) {
						callback.call(this);
					}
				});
			}
			else if (callback) {
				callback.call(this);
			}
		},

		_collectionChanged: function(items, evt) {
			// In the case of an array-valued source, respond to a collection change that is raised for the source value.
			if (this._options.required) {
				var oldItems = evt.get_changes().mapToArray(function(change) { return change.oldItems || []; });
				var newItems = evt.get_changes().mapToArray(function(change) { return change.newItems || []; });
				this._updateWatchedItems(items, oldItems, newItems);
			}
		},

		_watchedItemPathChanged: function(sender, args) {
			this._update(this._sourcePathResult);
		},

		_sourcePathChanged: function() {
			// Save the previous result and evaluate and store the new one.
			var prevSourcePathResult = this._sourcePathResult;
			this._sourcePathResult = evalPath(this._source, this._sourcePath);

			// if the value is the same (which will commonly happen when the source is an array) then there is no need to update
			if (prevSourcePathResult !== this._sourcePathResult) {
				// Respond to a change that occurs at any point along the source path.
				this._update(this._sourcePathResult, ensureArray(prevSourcePathResult), ensureArray(this._sourcePathResult));
			}
		},

		_evalSuccess: function(result, performedLoading, source) {
			this._source = source;

			if (this._disposed) {
				return;
			}

			delete this._evalSuccessHandler;

			if (this._sourcePath) {
				this._sourcePathChangedHandler = this._sourcePathChanged.bind(this);
				Observer.addPathChanged(this._source, this._sourcePath, this._sourcePathChangedHandler, true);
			}

			this._sourcePathResult = result;

			this._update(result, null, ensureArray(result));
		},

		_evalFailure: function(err) {
			if (this._disposed) {
				return;
			}

			delete this._evalFailureHandler;

			ExoWeb.trace.throwAndLog(["~", "markupExt"], "Couldn't evaluate path '{0}', {1}", [this._sourcePath, err]);
		},

		dispose: function() {
			if (!this._disposed) {
				this._disposed = true;
				if (this._collectionChangedHandler) {
					Observer.removeCollectionChanged(this._value, this._collectionChangedHandler);
					this._collectionChangedHandler = null;
				}
				if (this._sourcePathChangedHandler) {
					Observer.removePathChanged(this._source, this._sourcePath, this._sourcePathChangedHandler);
					this._sourcePathChangedHandler = null;
				}
				if (this._watchedItemPathChangedHandler) {
					ensureArray(this._sourcePathResult).forEach(function(item) {
						Observer.removePathChanged(item, this._options.required, this._watchedItemPathChangedHandler);
					}, this);
					this._watchedItemPathChangedHandler = null;
				}
				if (this._evalSuccessHandler) {
					this._evalSuccessHandler = null;
				}
				if (this._evalFailureHandler) {
					this._evalFailureHandler = null;
				}
				this._isTargetElement = this._options = this._pendingValue = this._source =
					this._sourcePath = this._sourcePathResult = this._target = this._targetPath =
					this._templateContext = this._transformFn = this._value = null;
			}
			Binding.callBaseMethod(this, "dispose");
		}

	});

	ExoWeb.View.Binding = Binding;
	Binding.registerClass("ExoWeb.View.Binding", Sys.Component, Sys.UI.ITemplateContextConsumer);

	// #endregion

	// #region ExoWeb.View.LazyMarkupExtension
	//////////////////////////////////////////////////

	Sys.Application.registerMarkupExtension(
		"~",
		function LazyMarkupExtension(component, targetProperty, templateContext, properties) {
			var source;
			var scopeChain;
			var path = properties.path || properties.$default || null;

			// if a source is specified and it is a string, then execute the source as a JavaScript expression
			if (properties.source) {
				if (properties.source.constructor === String) {
					// create a function to evaluate the binding source from the given string
					var evalSource = new Function("$element", "$index", "$dataItem", "$context", "return " + properties.source + ";");

					// get the relevant html element either as the component or the component's target element
					var element = null;
					if (Sys.Component.isInstanceOfType(component)) {
						element = component.get_element();
					}
					else if (Sys.UI.DomElement.isDomElement(component)) {
						element = component;
					}

					// evaluate the value of the expression
					source = evalSource(element, templateContext.index, templateContext.dataItem, templateContext);

					// don't try to eval the path against window
					scopeChain = [];
				}
				else {
					source = properties.source;
				}
			}
			else if (templateContext.dataItem) {
				source = templateContext.dataItem;
			}
			else {
				// No context data, so path must be global
				source = window;
				scopeChain = [];
			}

			// Build an options object that represents only the options that the binding
			// expects, and only if they were specified in the markup extension
			var options = {};
			if (properties.hasOwnProperty("required")) {
				options.required = properties.required;
			}
			if (properties.hasOwnProperty("transform")) {
				options.transform = properties.transform;
			}
			if (properties.hasOwnProperty("format")) {
				options.format = properties.format;
			}
			if (properties.hasOwnProperty("nullValue")) {
				options.nullValue = properties.nullValue;
			}

			// Construct the new binding class
			var binding = new Binding(templateContext, source, path, component, properties.targetProperty || targetProperty, options, scopeChain);

			// register with the template context as a child component
			templateContext.components.push(binding);
		},
		false
	);

	// #endregion

	// #region ExoWeb.View.Adapter
	//////////////////////////////////////////////////

	function Adapter(target, propertyPath, format, options) {
		Adapter.initializeBase(this);

		this._target = target instanceof OptionAdapter ? target.get_rawValue() : target;
		this._propertyPath = propertyPath;
		this._ignoreTargetEvents = false;
		this._readySignal = new ExoWeb.Signal("Adapter Ready");

		if (options.allowedValuesTransform) {
			this._allowedValuesTransform = options.allowedValuesTransform;
		}

		if (options.optionsTransform) {
			throw ExoWeb.trace.logError(["@", "markupExt"], "Option \"optionsTransform\" is obsolete, use \"allowedValuesTransform\" instead. Path = \"{0}\".", propertyPath);
		}

		if (options.allowedValuesMayBeNull) {
			this._allowedValuesMayBeNull = options.allowedValuesMayBeNull;
		}

		// Initialize the property chain.
		this._initPropertyChain();

		// Determine the display format to use
		this._format = format ? getFormat(this._propertyChain.get_jstype(), format) : this._propertyChain.get_format();

		// Load the object this adapter is bound to and then load allowed values.
		ExoWeb.Model.LazyLoader.eval(this._target, this._propertyChain.get_path(),
			this._readySignal.pending(),
			this._readySignal.orPending(function(err) {
				ExoWeb.trace.throwAndLog(["@", "markupExt"], "Couldn't evaluate path '{0}', {1}", [propertyPath, err]);
			})
		);

		// Add arbitrary options so that they are made available in templates.
		this._extendProperties(options);
	}

	Adapter.mixin({
		// Internal book-keeping and setup methods
		///////////////////////////////////////////////////////////////////////
		_extendProperties: function Adapter$_extendProperties(options) {
			if (options) {
				var allowedOverrides = ["label", "helptext"];
				this._extendedProperties = [];
				for (var optionName in options) {
					// check for existing getter and setter methods
					var getter = this["get_" + optionName];
					var setter = this["set_" + optionName];

					// if the option is already defined don't overwrite critical properties (e.g.: value)
					if (getter && !Array.contains(allowedOverrides, optionName)) {
						continue;
					}

					this._extendedProperties.push(optionName);

					// create a getter and setter if they don't exist
					if (!getter || !(getter instanceof Function)) {
						getter = this["get_" + optionName] =
							(function makeGetter(adapter, optionName) {
								return function Adapter$customGetter() { return adapter["_" + optionName]; };
							})(this, optionName);
					}
					if (!setter || !(setter instanceof Function)) {
						setter = this["set_" + optionName] =
							(function makeSetter(adapter, optionName) {
								return function Adapter$customSetter(value) { adapter["_" + optionName] = value; };
							})(this, optionName);
					}

					// set the option value
					setter.call(this, options[optionName]);
				}
			}
		},
		_initPropertyChain: function Adapter$_initPropertyChain() {
			// start with the target or its raw value in the case of an adapter
			var sourceObject = (this._target instanceof Adapter) ? this._target.get_rawValue() : this._target;

			if (!(sourceObject instanceof Entity)) {
				throw new ExoWeb.trace.logError("@", "Adapter source is not an entity.");
			}

			// get the property chain for this adapter starting at the source object
			this._propertyChain = Model.property(this._propertyPath, sourceObject.meta.type);
			if (!this._propertyChain) {
				ExoWeb.trace.throwAndLog(["@", "markupExt"], "Property \"{0}\" could not be found.", this._propertyPath);
			}

			// If the target is an adapter, prepend its property chain.  Cannot simply concatenate paths
			// since the child path could be instance-dependent (i.e. the parents value is a subtype).
			if (this._target instanceof Adapter) {
				if (this._propertyChain instanceof Property) {
					this._propertyChain = new PropertyChain(this._propertyChain.get_jstype().meta, [this._propertyChain], []);
				}

				var parentProp = this._target.get_propertyChain();

				this._propertyChain.prepend(parentProp instanceof PropertyChain ? parentProp.all() : [parentProp]);
				this._parentAdapter = this._target;
				this._target = this._target.get_target();
			}
		},
		_loadForFormatAndRaiseChange: function Adapter$_loadForFormatAndRaiseChange(val) {
			var signal = new ExoWeb.Signal("Adapter.displayValue");
			this._doForFormatPaths(val, function (path) {
				ExoWeb.Model.LazyLoader.evalAll(val, path, signal.pending());
			});
			signal.waitForAll(function () {
				Observer.raisePropertyChanged(this, "displayValue");
				Observer.raisePropertyChanged(this, "systemValue");
			}, this);
		},
		_doForFormatPaths: function Adapter$_doForFormatPaths(val, callback, thisPtr) {
			if (val === undefined || val === null || !this._format) {
				return;
			}

			if (fmt) {
				Array.forEach(this._format.getPaths(), callback, thisPtr || this);
			}
		},
		_unsubscribeFromFormatChanges: function Adapter$_unsubscribeFromFormatChanges(val) {
			this._doForFormatPaths(val, function (path) {
				var subscription = this._formatSubscribers[path];
				if (subscription.chain) {
					subscription.chain.removeChanged(subscription.handler);
				}
			});
		},
		_subscribeToFormatChanges: function Adapter$_subscribeToFormatChanges(val) {
			this._doForFormatPaths(val, function (path) {
				Model.property(path, this._propertyChain.lastProperty().get_jstype().meta, true, function (chain) {
					var subscription = this._formatSubscribers[path] = { chain: chain, handler: this._loadForFormatAndRaiseChange.bind(this).prependArguments(val) };
					var entities = val instanceof Array ? val : [val];
					entities.forEach(function (entity) {
						chain.addChanged(subscription.handler, entity, false, true);
					});
				}, this);
			});
		},
		_ensureObservable: function Adapter$_ensureObservable() {
			var _this = this;

			if (!this._observable) {
				Observer.makeObservable(this);

				// subscribe to property changes at all points in the path
				this._targetChangedHandler = this._onTargetChanged.bind(this);
				this._propertyChain.addChanged(this._targetChangedHandler, this._target, false, true);

				this._formatSubscribers = {};

				// set up initial watching of format paths
				if (this._propertyChain.lastTarget(this._target)) {
					var rawValue = this._propertyChain.value(this._target);
					this._subscribeToFormatChanges(rawValue);
				}

				// when the value changes resubscribe
				this._propertyChain.addChanged(function (sender, args) {
					_this._unsubscribeFromFormatChanges(args.oldValue);
					_this._subscribeToFormatChanges(args.newValue);
				}, this._target, false, true);

				this._observable = true;
			}
		},
		_onTargetChanged: function Adapter$_onTargetChanged(sender, args) {
			if (this._ignoreTargetEvents) {
				return;
			}

			var _this = this;
			var rawValue = this.get_rawValue();

			// raise raw value changed event
			ExoWeb.Model.LazyLoader.eval(rawValue, null, function () {
				Observer.raisePropertyChanged(_this, "rawValue");
			});

			// raise value changed event
			this._loadForFormatAndRaiseChange(rawValue);

			// Raise change on options representing the old and new value in the event that the property 
			// has be changed by non-UI code or another UI component.  This will result in double raising 
			// events if the value was set by changing selected on one of the OptionAdapter objects.
			if (this._options) {
				Array.forEach(this._options, function (o) {
					// Always reload selected for options in an array since we don't know what the old values in the list were
					if (args.newValue instanceof Array || o.get_rawValue() == args.newValue || o.get_rawValue() == args.oldValue) {
						Observer.raisePropertyChanged(o, "selected");
					}
				});
			}

			// Re-attach validation handlers if needed
			var properties = this._propertyChain.properties();
			var numProps = properties.length;

			// The last target does not change if this is a single-property chain,
			// so no need to update validation events
			if (numProps > 1 && args.triggeredBy !== this._propertyChain.lastProperty()) {
				// Remove event handlers for previous last target 
				if (args.oldValue) {
					// Determine the old last target
					var property,
						propIndex = properties.indexOf(args.triggeredBy) + 1,
						newLastTarget = this._propertyChain.lastTarget(this._target),
						oldLastTarget = args.oldValue;
					while (oldLastTarget && propIndex < numProps - 1) {
						property = properties[propIndex++],
						oldLastTarget = property.value(oldLastTarget);
					}

					// Remove and re-add validation handlers if the last target has changed
					if (oldLastTarget !== newLastTarget) {
						this.get_conditions().clear();
						if (this._conditionsChangedHandler) {
							oldLastTarget.meta.removeConditionsChanged(this._conditionsChangedHandler);
						}
					}
				}

				// Add the conditions for the new target and subscribe to changes
				if (this.get_conditions() && newLastTarget) {
					this.get_conditions().addRange(newLastTarget.meta.conditions(this.get_propertyChain().lastProperty()));
					newLastTarget.meta.addConditionsChanged(this._conditionsChangedHandler, this.get_propertyChain());
				}
			}

			// Dispose of existing event handlers related to allowed value loading
			disposeOptions.call(this);
			signalOptionsReady.call(this);
		},
		_setValue: function Adapter$_setValue(value) {
			var prop = this._propertyChain;

			// clear existing format errors
			if (this._formatError) {
				this.get_conditions().remove(this._formatError);
				this._formatError = undefined;
			}

			// insert new format errors, if the value is not valid
			if (value instanceof ExoWeb.Model.FormatError) {
				this._formatError = value.createCondition(this._propertyChain.lastTarget(this._target), this._propertyChain.lastProperty());
				this.get_conditions().insert(0, this._formatError);
			}

			// otherwise, update the property value
			else {
				var changed = prop.value(this._target) !== value;
				this.set_rawValue(value, changed);
			}
		},

		// Various methods.
		///////////////////////////////////////////////////////////////////////
		ready: function Adapter$ready(callback, thisPtr) {
			this._readySignal.waitForAll(callback, thisPtr);
		},
		toString: function Adapter$toString() {
			var targetType;
			if (this._target === null) {
				targetType = "null";
			}
			else if (this._target === undefined) {
				targetType = "undefined";
			}
			else {
				targetType = ExoWeb.parseFunctionName(this._target.constructor);
			}

			var value;
			try {
				value = this.get_rawValue();

				if (value === null) {
					value = "null";
				}
				else if (value === undefined) {
					value = "undefined";
				}
				else if (value.constructor !== String) {
					value = value.toString();
				}
			}
			catch (e) {
				value = "[error]";
			}

			return $format("<{0}>.{1}:  {2}", [targetType, this._propertyPath, value]);
		},

		// Properties that are intended to be used by templates.
		///////////////////////////////////////////////////////////////////////
		isType: function Adapter$isType(jstype) {
			if (this._jstype && this._jstype instanceof Function) {
				return this._jstype === jstype;
			}

			for (var propType = this._propertyChain.get_jstype(); propType !== null; propType = propType.getBaseType()) {
				if (propType === jstype) {
					return true;
				}
			}

			return false;
		},
		aspects: function Adapter$aspects() {
			if (!this._aspects) {
				this._aspects = {
					"isList": this.get_isList(),
					"isReference": this.get_isEntity() || this.get_isEntityList(),
					"dataType": this.get_dataType()
				};
			}
			return this._aspects;
		},
		get_isList: function Adapter$get_isList() {
			return this._propertyChain.get_isList();
		},
		get_isEntity: function Adapter$get_isEntity() {
			return this._propertyChain.get_isEntityType();
		},
		get_isEntityList: function Adapter$get_isEntityList() {
			return this._propertyChain.get_isEntityListType();
		},
		get_isStatic: function Adapter$get_isStatic() {
			return this._propertyChain.get_isStatic();
		},
		get_target: function Adapter$get_target() {
			return this._target;
		},
		get_propertyPath: function Adapter$get_propertyPath() {
			return this._propertyPath;
		},
		get_propertyChain: function Adapter$get_propertyChain() {
			return this._propertyChain;
		},
		get_format: function Adapter$get_format() {
			return this._format;
		},
		get_dataType: function Adapter$get_dataType() {
			return this._propertyChain.get_jstype();
		},
		get_label: function Adapter$get_label() {
			// if no label is specified then use the property label
			return this._label || this._propertyChain.get_label();
		},
		get_helptext: function Adapter$get_helptext() {
			// help text may also be included in the model?
			return this._helptext || "";
		},
		get_rawValue: function Adapter$get_rawValue() {
			this._ensureObservable();
			return this._propertyChain.value(this._target);
		},
		set_rawValue: function Adapter$set_rawValue(value, changed) {
			var prop = this._propertyChain;

			if (changed === undefined) {
				changed = prop.value(this._target) !== value;
			}

			if (changed) {
				this._ignoreTargetEvents = true;

				try {
					prop.value(this._target, value);
				}
				finally {
					this._ignoreTargetEvents = false;
				}
			}
		},
		get_systemValue: function Adapter$get_systemValue() {
			var rawValue = this.get_rawValue();
			if (this.get_isEntity()) {
				return rawValue ? Entity.toIdString(rawValue) : "";
			}
			else if (this.isType(Boolean)) {
				if (rawValue === true) {
					return "true";
				}
				else if (rawValue === false) {
					return "false";
				}
				else {
					return "";
				}
			}
			else {
				ExoWeb.trace.logWarning(["@", "markupExt"], "Possible incorrect usage of systemValue for a type that is not supported");
				return rawValue ? rawValue.toString() : "";
			}
		},
		set_systemValue: function Adapter$set_systemValue(value) {
			if (this.get_isEntity()) {

				// set to null
				if (!value) {
					this._setValue(null);
				}
				else {
					var entity = Entity.fromIdString(value);

					// set immediately if loaded
					if (LazyLoader.isLoaded(entity)) {
						this._setValue(entity);
					}

					// lazy load if necessary
					else {
						LazyLoader.load(entity, null, function () {
							this._setValue(entity);
						}, this);
					}
				}
			}
			else if (this.isType(Boolean)) {
				if (value === "true") {
					this._setValue(true);
				}
				else if (value === "false") {
					this._setValue(false);
				}
				else {
					this._setValue(null);
				}
			}
			else {
				ExoWeb.trace.throwAndLog(["@", "markupExt"], "Cannot set systemValue property of Adapters for non-entity types.");
			}
		},
		get_displayValue: function Adapter$get_displayValue() {
			var displayValue;
			var rawValue = this.get_rawValue();

			if (this._format) {
				// Use a markup or property format if available
				if (rawValue instanceof Array) {
					displayValue = rawValue.map(function (value) { return this._format.convert(value); }, this);
				}
				else {
					displayValue = this._format.convert(rawValue);
				}
			}
			else if (rawValue instanceof Array) {
				// If no format exists, then fall back to toString
				displayValue = rawValue.map(function (value) {
					if (value === null || value === undefined) {
						return "";
					}
					else {
						return value.toString();
					}
				}, this);
			}
			else if (rawValue === null || rawValue === undefined) {
				displayValue = "";
			}
			else {
				displayValue = rawValue.toString();
			}

			return displayValue instanceof Array ? displayValue.join(", ") : displayValue;
		},
		set_displayValue: function Adapter$set_displayValue(value) {
			if (this.get_isEntity()) {
				ExoWeb.trace.throwAndLog(["@", "markupExt"], "Cannot set displayValue property of Adapters for entity types.");
			}
			else {
				value = this._format ? this._format.convertBack(value) : value;
				this._setValue(value);
			}
		},

		dispose: function Adapter$dispose() {
			var disposed = this._disposed, options = null;

			if (!disposed) {
				this._disposed = true;
				disposeOptions.call(this);
				options = this._options;
				if (this._extendedProperties) {
					var ext = this._extendedProperties;
					for (var i = 0, l = ext.length; i < l; i++) {
						this["_" + ext[i]] = null;
					}
					this._extendedProperties = null;
				}
				if (this._targetChangedHandler) {
					this._propertyChain.removeChanged(this._targetChangedHandler);
					this._targetChangedHandler = null;
				}
				this._unsubscribeFromFormatChanges(this.get_rawValue());
				// Clean up validation event handlers
				var lastTarget = this._propertyChain.lastTarget(this._target);
				if (lastTarget) {
					if (this._conditionsChangedHandler) {
						lastTarget.meta.removeConditionsChanged(this._conditionsChangedHandler);
					}
				}
				this._allowedValues = this._allowedValuesMayBeNull = this._aspects = this._badValue =
					this._format = this._formatSubscribers = this._helptext = this._jstype = this._ignoreTargetEvents = this._label =
					this._observable = this._options = this._allowedValuesTransform = this._parentAdapter = this._propertyChain =
					this._propertyPath = this._readySignal = this._target = null;
			}

			Adapter.callBaseMethod(this, "dispose");

			if (!disposed) {
				Observer.disposeObservable(this);
				if (options) {
					options.forEach(Observer.disposeObservable);
				}
			}
		}
	});

	// #region Conditions

	function conditionsChangedHandler(conditions, sender, args) {
		if (args.add) {
			conditions.add(args.conditionTarget.condition);
		}
		else if (args.remove) {
			conditions.remove(args.conditionTarget.condition);
		}
	};

	Adapter.mixin({
		get_conditions: function Adapter$get_conditions() {

			// initialize the conditions if necessary
			if (!this._conditions) {

				// get the current target
				var target = this.get_propertyChain().lastTarget(this._target);

				// get the current set of conditions
				var conditions = this._conditions = target ? target.meta.conditions(this.get_propertyChain().lastProperty()) : [];

				// make the conditions observable
				Observer.makeObservable(this._conditions);

				// subscribe to condition changes on the current target
				if (target) {
					var handler = this._conditionsChangedHandler = conditionsChangedHandler.prependArguments(conditions);
					target.meta.addConditionsChanged(handler, this.get_propertyChain());
				}
			}
			return this._conditions;
		},
		get_firstError: function Adapter$get_firstError() {

			// gets the first error in a set of conditions, always returning required field errors first, and null if no errors exist
			var getFirstError = function (conditions) {
				var firstError = null;
				for (var c = 0; c < conditions.length; c++) {
					var condition = conditions[c];
					if (condition.type instanceof ConditionType.Error && (firstError === null || /Required/i.test(condition.type.code))) {
						firstError = condition;
					}
				}
				return firstError;
			};

			// initialize on first access
			if (!this.hasOwnProperty("_firstError")) {

				var conditions = this.get_conditions();
				this._firstError = getFirstError(conditions);

				// automatically update when condition changes occur
				var adapter = this;
				conditions.add_collectionChanged(function (sender, args) {

					var err = getFirstError(conditions);

					// store the first error and raise property change if it differs from the previous first error
					if (adapter._firstError !== err) {
						adapter._firstError = err;
						Observer.raisePropertyChanged(adapter, "firstError");
					}
				});
			}

			// return the first error
			return this._firstError;
		}
	});

	// #endregion

	// #region Options

	function disposeOptions() {
		var lastProperty = this._propertyChain.lastProperty();
		var allowedValuesRule = lastProperty.rule(ExoWeb.Model.Rule.allowedValues);
		if (this._allowedValuesChangedHandler) {
			allowedValuesRule.source.removeChanged(this._allowedValuesChangedHandler);
			this._allowedValuesChangedHandler = null;
		}
		if ( this._allowedValuesRuleExistsHandler) {
			this._propertyChain.lastProperty().removeRuleRegistered(this._allowedValuesRuleExistsHandler);
			this._allowedValuesRuleExistsHandler = null;
		}
		if (this._allowedValuesExistHandler) {
			allowedValuesRule.source.removeChanged(this._allowedValuesExistHandler);
			this._allowedValuesExistHandler = null;
		}
		this._options = null;
	}

	// Create an option adapter from the given object
	function createOptionAdapter(item) {
		// If it is a transform group then create an option group
		if (item instanceof TransformGroup) {
			return new OptionGroupAdapter(this, item.group, item.items);
		}
		// Otherwise,create a single option
		else {
			return new OptionAdapter(this, item);
		}
	}

	// Notify subscribers that options are available
	function signalOptionsReady() {
		if (this._disposed) {
			return;
		}

		// Delete backing fields so that options can be recalculated (and loaded)
		delete this._options;

		// Raise events in order to cause subscribers to fetch the new value
		ExoWeb.Observer.raisePropertyChanged(this, "options");
	}

	// If the given rule is allowed values, signal options ready
	function checkAllowedValuesRuleExists(rule) {
		if (rule instanceof Rule.allowedValues) {
			this._propertyChain.lastProperty().removeRuleRegistered(this._allowedValuesRuleExistsHandler);
			signalOptionsReady.call(this);
		}
	}

	function checkAllowedValuesExist() {
		var lastProperty = this._propertyChain.lastProperty();
		var allowedValuesRule = lastProperty.rule(ExoWeb.Model.Rule.allowedValues);
		var targetObj = this._propertyChain.lastTarget(this._target);
		var allowedValues = allowedValuesRule.values(targetObj, !!this._allowedValuesMayBeNull);

		if (allowedValues instanceof Array) {
			allowedValuesRule.source.removeChanged(this._allowedValuesExistHandler);
			delete this._allowedValuesExistHandler;
			signalOptionsReady.call(this);
		}
	}

	// Update the given options source array to match the current allowed values
	function refreshOptionsFromAllowedValues(optionsSourceArray) {
		var lastProperty = this._propertyChain.lastProperty();
		var allowedValuesRule = lastProperty.rule(ExoWeb.Model.Rule.allowedValues);
		var targetObj = this._propertyChain.lastTarget(this._target);
		var allowedValues = allowedValuesRule.values(targetObj, !!this._allowedValuesMayBeNull);
		if (allowedValues) {
			update(optionsSourceArray, allowedValues);
		}
		else {
			signalOptionsReady.call(this);
		}
	}

	// Perform any required loading of allowed values items
	function ensureAllowedValuesLoaded(newItems, callback, thisPtr) {
		var signal = new Signal("ensureAllowedValuesLoaded");
		newItems.forEach(function(item) {
			if (!LazyLoader.isLoaded(item)) {
				LazyLoader.load(item, null, signal.pending());
			}
		});
		signal.waitForAll(callback, thisPtr);
	}

	function clearInvalidOptions(allowedValues) {
		var rawValue = this.get_rawValue();
		if (allowedValues) {
			// Remove option values that are no longer valid
			if (rawValue instanceof Array) {
				purge(rawValue, function (item) {
					return allowedValues.indexOf(item) < 0;
				}, this);
			}
			else if (allowedValues.indexOf(rawValue) < 0) {
				this.set_rawValue(null);
			}
		}
		else if (rawValue instanceof Array) {
			rawValue.clear();
		}
		else {
			this.set_rawValue(null);
		}
	}

	function allowedValuesChanged(optionsSourceArray, sender, args) {
		var lastProperty = this._propertyChain.lastProperty();
		var allowedValuesRule = lastProperty.rule(ExoWeb.Model.Rule.allowedValues);
		var allowedValues = allowedValuesRule.values(this._propertyChain.lastTarget(this._target), !!this._allowedValuesMayBeNull);

		// Clear out invalid selections
		clearInvalidOptions.call(this, allowedValues);

		// Load allowed value items that were added
		if (args.changes) {
			// Collect all items that were added
			var newItems = [];
			args.changes.forEach(function(change) {
				if (change.newItems) {
					newItems.addRange(change.newItems);
				}
			});
			if (newItems.length > 0) {
				ensureAllowedValuesLoaded(newItems, refreshOptionsFromAllowedValues.prependArguments(optionsSourceArray), this);
			}
			else {
				refreshOptionsFromAllowedValues.call(this, optionsSourceArray);
			}
		}
		else if (!args.oldValue && args.newValue) {
			// If there was previously not a value of the path and now there is, then all items are new
			ensureAllowedValuesLoaded(allowedValues, refreshOptionsFromAllowedValues.prependArguments(optionsSourceArray), this);
		}
		else {
			refreshOptionsFromAllowedValues.call(this, optionsSourceArray);
		}

	}

	Adapter.mixin({
		get_options: function Adapter$get_options() {
			if (!this.hasOwnProperty("_options")) {
				if (this.isType(Boolean)) {
					this._options = [createOptionAdapter.call(this, true), createOptionAdapter.call(this, false)];
				}
				else {
					var lastProperty = this._propertyChain.lastProperty();
					var allowedValuesRule = lastProperty.rule(ExoWeb.Model.Rule.allowedValues);

					// Watch for the registration of an allowed values rule if it doesn't exist
					if (!allowedValuesRule) {
						this._allowedValuesRuleExistsHandler = checkAllowedValuesRuleExists.bind(this);
						lastProperty.addRuleRegistered(this._allowedValuesRuleExistsHandler);
						this._options = null;
						return;
					}

					// Cache the last target
					var targetObj = this._propertyChain.lastTarget(this._target);

					// Retrieve the value of allowed values property
					var allowedValues = allowedValuesRule.values(targetObj, !!this._allowedValuesMayBeNull);

					// Load allowed values if the path is not inited
					if (allowedValues === undefined) {
						ExoWeb.trace.logWarning(["@", "markupExt"], "Adapter forced eval of allowed values. Rule: {0}", [allowedValuesRule]);
						ExoWeb.Model.LazyLoader.eval(allowedValuesRule.source.get_isStatic() ? null : targetObj,
							allowedValuesRule.source.get_path(),
							signalOptionsReady.bind(this));
						this._options = null;
						return;
					}

					// Watch for changes until the allowed values path has a value
					if (!allowedValues) {
						this._allowedValuesExistHandler = checkAllowedValuesExist.bind(this);
						allowedValuesRule.source.addChanged(this._allowedValuesExistHandler, targetObj);
						clearInvalidOptions.call(this);
						this._options = null;
						return;
					}

					// Load the allowed values list if it is not already loaded
					if (!ExoWeb.Model.LazyLoader.isLoaded(allowedValues)) {
						ExoWeb.trace.logWarning(["@", "markupExt"], "Adapter forced loading of allowed values list. Rule: {0}", [allowedValuesRule]);
						ExoWeb.Model.LazyLoader.load(allowedValues, null, signalOptionsReady.bind(this), this);
						this._options = null;
						return;
					}

					clearInvalidOptions.call(this, allowedValues);

					// Create an observable copy of the allowed values that we can keep up to date in our own time
					var observableAllowedValues = allowedValues.slice();
					ExoWeb.Observer.makeObservable(observableAllowedValues);

					// Respond to changes to allowed values
					this._allowedValuesChangedHandler = allowedValuesChanged.bind(this).prependArguments(observableAllowedValues);
					allowedValuesRule.source.addChanged(this._allowedValuesChangedHandler, targetObj, false, true);

					// Create a transform that watches the observable copy and uses the user-supplied _allowedValuesTransform if given
					if (this._allowedValuesTransform) {
						transformedAllowedValues = (new Function("$array", "{ return $transform($array, true)." + this._allowedValuesTransform + "; }"))(observableAllowedValues);
						if (transformedAllowedValues.live !== Transform.prototype.live) {
							ExoWeb.trace.throwAndLog("@", "Invalid options transform result: may only contain \"where\", \"orderBy\", \"select\", \"selectMany\", and \"groupBy\".");
						}
					}
					else {
						transformedAllowedValues = $transform(observableAllowedValues, true);
					}

					// Map the allowed values to option adapters
					this._options = transformedAllowedValues.select(createOptionAdapter.bind(this)).live();
				}
			}

			return this._options;
		}
	});

	// #endregion

	ExoWeb.View.Adapter = Adapter;
	Adapter.registerClass("ExoWeb.View.Adapter", Sys.Component, Sys.UI.ITemplateContextConsumer);

	// #endregion

	// #region ExoWeb.View.OptionAdapter
	//////////////////////////////////////////////////

	function OptionAdapter(parent, obj) {
		this._parent = parent;
		this._obj = obj;

		// watch for changes to properties of the source object and update the label
		this._ensureObservable();
	}

	OptionAdapter.prototype = {
		// Internal book-keeping and setup methods
		///////////////////////////////////////////////////////////////////////
		_loadForFormatAndRaiseChange: function OptionAdapter$_loadForFormatAndRaiseChange(val) {
			if (val === undefined || val === null) {
				Observer.raisePropertyChanged(this, "displayValue");
				Observer.raisePropertyChanged(this, "systemValue");
				return;
			}

			var signal = new ExoWeb.Signal("OptionAdapter.displayValue");
			this._parent._doForFormatPaths(val, function (path) {
				ExoWeb.Model.LazyLoader.evalAll(val, path, signal.pending());
			}, this);
			signal.waitForAll(function () {
				Observer.raisePropertyChanged(this, "displayValue");
				Observer.raisePropertyChanged(this, "systemValue");
			}, this);
		},
		_subscribeToFormatChanges: function OptionAdapter$_subscribeToFormatChanges(val) {
			this._parent._doForFormatPaths(val, function (path) {
				Model.property(path, val.meta.type, true, function (chain) {
					var subscription = this._formatSubscribers[path] = { chain: chain, handler: this._loadForFormatAndRaiseChange.bind(this).prependArguments(val) };
					chain.addChanged(subscription.handler, val);
				}, this);
			}, this);
		},
		_ensureObservable: function OptionAdapter$_ensureObservable() {
			if (!this._observable) {
				Observer.makeObservable(this);

				this._formatSubscribers = {};

				// set up initial watching of format paths
				this._subscribeToFormatChanges(this._obj);

				this._observable = true;
			}
		},

		// Properties consumed by UI
		///////////////////////////////////////////////////////////////////////////
		get_parent: function OptionAdapter$get_parent() {
			return this._parent;
		},
		get_rawValue: function OptionAdapter$get_rawValue() {
			return this._obj;
		},
		get_displayValue: function OptionAdapter$get_displayValue() {
			var format = this._parent._format;
			return format ? format.convert(this._obj) : this._obj;
		},
		get_systemValue: function OptionAdapter$get_systemValue() {
			if (this._obj === null || this._obj === undefined) {
				return "";
			}
			else {
				return this._parent.get_isEntity() ? Entity.toIdString(this._obj) : this._obj.toString();
			}
		},
		get_selected: function OptionAdapter$get_selected() {
			var rawValue = this._parent.get_rawValue();

			if (rawValue instanceof Array) {
				return Array.contains(rawValue, this._obj);
			}
			else {
				return rawValue === this._obj;
			}
		},
		set_selected: function OptionAdapter$set_selected(value) {
			var rawValue = this._parent.get_rawValue();

			if (rawValue instanceof Array) {
				if (value && !Array.contains(rawValue, this._obj)) {
					rawValue.add(this._obj);
				}
				else if (!value && Array.contains(rawValue, this._obj)) {
					rawValue.remove(this._obj);
				}
			}
			else {
				if (value) {
					this._parent.set_rawValue(this._obj);
				}
				else {
					this._parent.set_rawValue(null);
				}
			}
		},
		get_conditions: function OptionAdapter$get_conditions() {
			return this._parent.get_conditions();
		}
	};

	ExoWeb.View.OptionAdapter = OptionAdapter;

	// #endregion

	// #region ExoWeb.View.OptionGroupAdapter
	//////////////////////////////////////////////////

	function OptionGroupAdapter(parent, obj, items) {
		this._parent = parent;
		this._obj = obj;
		this._options = $transform(items).select(parent._createOption.bind(parent)).live();

		// watch for changes to properties of the source object and update the label
		this._ensureObservable();
	}

	OptionGroupAdapter.prototype = {
		// Properties consumed by UI
		///////////////////////////////////////////////////////////////////////////
		get_parent: function OptionGroupAdapter$get_parent() {
			return this._parent;
		},
		get_rawValue: function OptionGroupAdapter$get_rawValue() {
			return this._obj;
		},
		get_displayValue: function OptionGroupAdapter$get_displayValue() {
			var result = this._obj;
			if (result !== null && result !== undefined && result.formats && result.formats.$display) {
				result = result.formats.$display.convert(result);
			}
			return result;
		},
		get_systemValue: function OptionGroupAdapter$get_systemValue() {
			var result = this._obj;
			if (result !== null && result !== undefined && result.formats && result.formats.$system) {
				result = result.formats.$system.convert(result);
			}
			return result;
		},
		get_options: function OptionGroupAdapter$get_options() {
			return this._options;
		},
		get_conditions: function OptionGroupAdapter$get_conditions() {
			return this._parent.get_conditions();
		}
	};

	ExoWeb.View.OptionGroupAdapter = OptionGroupAdapter;
	OptionGroupAdapter.registerClass("ExoWeb.View.OptionGroupAdapter");

	// #endregion

	// #region ExoWeb.View.MsAjax
	//////////////////////////////////////////////////

	(function () {
		var targetChangedImpl = Sys.Binding.prototype._targetChanged;
		Sys.Binding.prototype._targetChanged = function (force) {
			var target = this._target;

			// invoke the method implementation
			targetChangedImpl.apply(this, [force]);
		
			if (this._disposed) return;

			// Set _lastTarget=false on other radio buttons in the group, since they only 
			// remember the last target that was recieved when an event fires and radio button
			// target change events fire on click (which does not account for de-selection).  
			// Otherwise, the source value is only set the first time the radio button is selected.
			if (Sys.UI.DomElement.isDomElement(target) && $(target).is("input[type=radio]:checked")) {
				$("input[type=radio][name='" + target.name + "']").each(function () {
					if (this != target && this.__msajaxbindings !== undefined) {
						var bindings = this.__msajaxbindings;
						for (var i = 0; i < bindings.length; i++)
							bindings[i]._lastTarget = bindings[i]._lastSource = false;
					}
				});
			};
		};

		var sourceChangedImpl = Sys.Binding.prototype._sourceChanged;
		Sys.Binding.prototype._sourceChanged = function (force) {
			var target = this._target,
				link = force === false;

			// invoke the method implementation
			sourceChangedImpl.apply(this, [force]);

			if (this._disposed) return;

			// Remove checked attribute from other radio buttons in the group that are currently checked.
			if (!link && Sys.UI.DomElement.isDomElement(target) && $(target).is("input[type=radio]:checked") && !this._lastSource) {
				$(target).removeAttr("checked");
			}
		};

		Sys.UI.DataView.prototype._loadData = function _loadData(value) {
			this._swapData(this._data, value);
			var oldValue = this._data;
			this._data = value;
			this._setData = true;
			this._stale = false;
			// Array data should not typically be set unless some intermediate
			// process (like transform) is creating a new array from the same original.
			if ((value && value instanceof Array) && (oldValue && oldValue instanceof Array)) {
				// copy the original array
				var arr = oldValue.slice();
				var changes = update(arr, value, true);
				this._collectionChanged(value, new Sys.NotifyCollectionChangedEventArgs(changes));
			}
			else {
				this._dirty = true;
				if (this._isActive()) {
					if (this.get_isLinkPending()) {
						this.link();
					}
					else {
						this.refresh();
					}
					this.raisePropertyChanged("data");
				}
				else {
					this._changed = true;
				}
			}
		};
	})();

	// Get's the last object in the source path.  Ex: Customer.Address.Street returns the Address object.
	function getFinalSrcObject(binding) {
		var src = binding.get_source();

		for (var i = 0; i < binding._pathArray.length - 1; ++i) {
			src = src[binding._pathArray[i]] || src["get_" + binding._pathArray[i]]();
		}

		return src;
	}

	ExoWeb.View.getFinalSrcObject = getFinalSrcObject;

	function getFinalPathStep(binding) {
		return binding._pathArray[binding._pathArray.length - 1];
	}

	ExoWeb.View.getFinalPathStep = getFinalPathStep;

	function getBindingInfo(binding) {
		var srcObj = getFinalSrcObject(binding);

		var target;
		var property;

		// Option adapter defers to parent adapter
		if (srcObj instanceof ExoWeb.View.OptionAdapter) {
			srcObj = srcObj.get_parent();
		}

		if (srcObj instanceof ExoWeb.View.Adapter) {
			var chain = srcObj.get_propertyChain();
			property = chain.lastProperty();
			target = chain.lastTarget(srcObj.get_target());
		}
		else if (srcObj instanceof ExoWeb.Model.Entity) {
			var propName = getFinalPathStep(binding);
			property = srcObj.meta.property(propName);
			target = srcObj;
		}

		return {
			target: target,
			property: property
		};
	}

	ExoWeb.View.getBindingInfo = getBindingInfo;

	// #endregion

	// #region Validation
	//////////////////////////////////////////////////

	var isError = function (condition) {
		return condition.type instanceof ExoWeb.Model.ConditionType.Error;
	};

	var isValidationCondition = function (condition) {
		return condition.type instanceof ExoWeb.Model.ConditionType.Error || condition.type instanceof ExoWeb.Model.ConditionType.Warning;
	};

	var ensureInited = function ($el) {
		if (!window.ExoWeb) {
			return;
		}

		if ($el.attr("__validating") === undefined) {
			// register for model validation events
			var bindings = $el.liveBindings();

			for (var i = 0; i < bindings.length; i++) {
				var binding = bindings[i];
				var srcObj = ExoWeb.View.getFinalSrcObject(binding);
				var propName = ExoWeb.View.getFinalPathStep(binding);

				var meta = srcObj.meta || srcObj;

				if (meta instanceof ExoWeb.Model.ObjectMeta) {
					var property = meta.type.property(propName);
					meta.addConditionsChanged(function (sender, args) {
						if (isValidationCondition(args.conditionTarget.condition)) {
							$el.trigger("validated", [meta.conditions(property)]);
						}
					}, property);
				}
				else if (meta && meta.get_conditions) {
					var conditions = meta.get_conditions();
					ExoWeb.Observer.addCollectionChanged(conditions, function (sender, args) {
						$el.trigger("validated", [conditions.filter(isValidationCondition)]);
					});
				}
			}

			// don't double register for events
			$el.attr("__validating", true);
		}
	};

	jQuery.fn.validated = function (f) {
		this.each(function () {
			$(this).bind('validated', f);
			ensureInited($(this));
		});

		return this;
	};

	// Gets all model rules associated with the property an element is bound to
	jQuery.fn.rules = function (ruleType) {
		if (!window.Sys || !window.ExoWeb || !ExoWeb.Model) return [];

		return $(this).liveBindings()
			.map(function(binding) {
				return ExoWeb.View.getBindingInfo(binding);
			}).filter(function(info) {
				return !!info.property;
			}).map(function(info) {
				return info.property.rule(ruleType);
			});
	};

	jQuery.fn.errors = function () {
		if (!window.Sys || !window.ExoWeb || !ExoWeb.Model) return [];

		return $(this).liveBindings().mapToArray(function (binding) {

			var source = binding.get_source();
			if (source instanceof ExoWeb.View.Adapter) {
				return source.get_conditions().filter(isError);
			}
			else {
				var info = ExoWeb.View.getBindingInfo(binding);

				// Guard against null/undefined target.  This could happen if the target is 
				// undefined, or if the path is multi-hop, and the full path is not defined.
				if (!info.target || !info.property) return [];

				return info.target.meta.conditions(info.property).filter(isError);
			}
		});
	};

	// #endregion

	// #region Selectors
	//////////////////////////////////////////////////

	var exoWebAndModel = false;

	jQuery.expr[":"].rule = function (obj, index, meta, stack) {
		if (exoWebAndModel === false) {
			if (!(window.ExoWeb && ExoWeb.Model))
				return false;
			exoWebAndModel = true;
		}

		var ruleName = meta[3];
		var ruleType = ExoWeb.Model.Rule[ruleName];

		if (!ruleType) {
			ExoWeb.trace.throwAndLog(["ui", "jquery"], "Unknown rule in selector: " + ruleName);
		}

		return $(obj).rules(ruleType).length > 0;
	};

	jQuery.expr[":"].bound = function (obj, index, meta, stack) {
		if (exoWebAndModel === false) {
			if (!(window.ExoWeb && ExoWeb.Model))
				return false;
			exoWebAndModel = true;
		}

		return $(obj).liveBindings().length > 0;
	};

	//////////////////////////////////////////////////////////////////////////////////////
	// helpers for working with controls
	var dataviewPrereqs = false;
	jQuery.expr[":"].dataview = function (obj, index, meta, stack) {
		if (dataviewPrereqs === false) {
			if (!(window.Sys !== undefined && Sys.UI !== undefined && obj.control !== undefined && Sys.UI.DataView !== undefined))
				return false;
			dataviewPrereqs = true;
		}

		return obj.control instanceof Sys.UI.DataView;
	};

	var contentPrereqs = false;
	jQuery.expr[":"].content = function (obj, index, meta, stack) {
		if (contentPrereqs === false) {
			if (!(window.ExoWeb !== undefined && ExoWeb.UI !== undefined && obj.control !== undefined && ExoWeb.UI.Content !== undefined && obj.control))
				return false;

			contentPrereqs = true;
		}

		return obj.control instanceof ExoWeb.UI.Content;
	};

	var togglePrereqs = false;
	jQuery.expr[":"].toggle = function (obj, index, meta, stack) {
		if (togglePrereqs === false) {
			if (!(window.ExoWeb !== undefined && ExoWeb.UI !== undefined && obj.control !== undefined && ExoWeb.UI.Toggle !== undefined && obj.control))
				return false;

			togglePrereqs = true;
		}

		return obj.control instanceof ExoWeb.UI.Toggle;
	};

	jQuery.expr[":"].control = function (obj, index, meta, stack) {
		var typeName = meta[3];
		var jstype = new Function("{return " + typeName + ";}");

		return obj.control instanceof jstype();
	};

	// #endregion

	// #region Helpers
	//////////////////////////////////////////////////

	jQuery.fn.control = function jQuery$control(propName, propValue) {
		if (arguments.length === 0) {
			return this.get(0).control;
		}
		else if (arguments.length == 1) {
			return this.get(0).control["get_" + propName]();
		}
		else {
			this.each(function jQuery$control$one(index, element) {
				this.control["set_" + propName](propValue);
			});
		}
	};

	jQuery.fn.commands = function jQuery$commands(commands) {
		var control = this.control();
		control.add_command(function jQuery$commands$command(sender, args) {
			var handler = commands[args.get_commandName()];
			if (handler) {
				handler(sender, args);
			}
		});
	};

	// Gets all Sys.Bindings for an element
	jQuery.fn.liveBindings = function jQuery$liveBindings() {
		var bindings = [];
		this.each(function jQuery$liveBindings$one() {
			if (this.__msajaxbindings)
				Array.addRange(bindings, this.__msajaxbindings);
		});
		return bindings;
	};

	// #endregion

	// #region Ever
	//////////////////////////////////////////////////

	// Cache lists of ever handlers by type
	var everHandlers = { added: [], deleted: [], bound: [], unbound: [] };

	var processElements = function processElements(container, els, action, source) {
		// Determine if the input is an array
		var isArr = Object.prototype.toString.call(els) === "[object Array]",

			// The number of elements to process
			numEls = isArr ? els.length : 1,

			// Cache of handlers for the action in question
			actionHandlers,

			// The number of unfiltered handlers
			numActionHandlers,

			// Handlers that are applicable to this call
			handlers,

			// The number of cached handlers
			numHandlers,

			// Determines whether to search children for matches
			doSearch,

			// Element iteration index variable
			i = 0,

			// Element iteration item variable
			el,

			// Optimization: cache the jQuery object for the element
			$el,

			// Handler iteration index variable
			j,

			// Handler iteration item variable
			handler;

		if (numEls === 0) {
			return;
		}

		actionHandlers = everHandlers[action];

		// Filter based on source and context
		i = -1;
		numActionHandlers = actionHandlers.length;
		handlers = [];
		while (++i < numActionHandlers) {
			handler = actionHandlers[i];

			// If a handler source is specified then filter by the source
			if (handler.source && handler.source !== source) {
				continue;
			}

			// If a handler context is specified then see if it contains the given container, or equals if children were passed in
			if (handler.context && !((isArr && handler.context === container) || jQuery.contains(handler.context, container))) {
				continue;
			}

			handlers.push(handler);
		}

		numHandlers = handlers.length;

		if (numHandlers === 0) {
			return;
		}

		// Only perform descendent search for added/deleted actions, since this
		// doesn't make sense for bound/unbound, which are specific to an element.
		doSearch = action === "added" || action === "deleted";

		i = -1;
		while (++i < numEls) {
			el = isArr ? els[i] : els;

			// Only process elements
			if (el.nodeType === 1) {
				j = 0;
				$el = jQuery(el);

				while (j < numHandlers) {
					handler = handlers[j++];

					// Test root
					if ($el.is(handler.selector)) {
						handler.action.apply(el, [0, el]);
					}

					if (doSearch && el.children.length > 0) {
						// Test children
						$el.find(handler.selector).each(handler.action);
					}
				}
			}
		}
	};

	var interceptingBound = false;
	var interceptingTemplates = false;
	var interceptingWebForms = false;
	var interceptingToggle = false;
	var interceptingContent = false;
	var partialPageLoadOccurred = false;

	function ensureIntercepting() {
		if (!interceptingBound && window.Sys && Sys.Binding && Sys.UI && Sys.UI.TemplateContext) {
			var addBinding = Sys.Binding.prototype._addBinding;
			if (!addBinding) {
				throw new Error("Could not find Binding._addBinding method to override.");
			}
			Sys.Binding.prototype._addBinding = function addBinding$wrap(element) {
				addBinding.apply(this, arguments);
				var ctx = this._templateContext;
				if (ctx._completed && ctx._completed.length > 0) {
					ctx.add_instantiated(function addBinding$contextInstantiated() {
						processElements(element, element, "bound");
					});
				}
				else {
					processElements(element, element, "bound");
				}
			};
			var disposeBindings = Sys.Binding._disposeBindings;
			if (!disposeBindings) {
				throw new Error("Could not find Binding._disposeBindings method to override.");
			}
			Sys.Binding._disposeBindings = function disposeBindings$wrap() {
				disposeBindings.apply(this, arguments);
				processElements(this, this, "unbound");
			};
			interceptingBound = true;
		}

		if (!interceptingTemplates && window.Sys && Sys.UI && Sys.UI.Template) {
			var instantiateInBase = Sys.UI.Template.prototype.instantiateIn;
			if (!instantiateInBase) {
				throw new Error("Could not find Template.instantiateIn method to override.");
			}
			Sys.UI.Template.prototype.instantiateIn = function instantiateIn$wrap() {
				var context = instantiateInBase.apply(this, arguments);
				if (context.nodes.length > 0) {
					processElements(context.containerElement, context.nodes, "added", "template");
				}
				return context;
			};
			// intercept Sys.UI.DataView._clearContainers called conditionally during dispose() and refresh().
			// dispose is too late because the nodes will have been cleared out.
			Sys.UI.DataView.prototype._clearContainers = function _clearContainers$override(placeholders, start, count) {
				var i, len, nodes, startNode, endNode, context;
				for (i = start || 0, len = count ? (start + count) : this._contexts.length; i < len; i++) {
					context = this._contexts[i];
					nodes = context.nodes;
					if (nodes.length > 0) {
						processElements(context.containerElement, nodes, "deleted", "template");
					}
					if (count) {
						if (!startNode) {
							startNode = nodes[0];
						}
						if (nodes.length > 0) {
							endNode = nodes[nodes.length - 1];
						}
					}
				}
				for (i = 0, len = placeholders.length; i < len; i++) {
					var ph = placeholders[i],
						container = ph ? ph.parentNode : this.get_element();
					if (!count || (startNode && endNode)) {
						this._clearContainer(container, ph, startNode, endNode, true);
					}
				}
				for (i = start || 0, len = count ? (start + count) : this._contexts.length; i < len; i++) {
					var ctx = this._contexts[i];
					ctx.nodes = null;
					ctx.dispose();
				}
			};
			Sys.UI.DataView.prototype._clearContainer = function _clearContainer$override(container, placeholder, startNode, endNode, suppressEvent) {
				var count = placeholder ? placeholder.__msajaxphcount : -1;
				if ((count > -1) && placeholder) placeholder.__msajaxphcount = 0;
				if (count < 0) {
					if (placeholder) {
						container.removeChild(placeholder);
					}
					if (!suppressEvent) {
						if (container.childNodes.length > 0) {
							processElements(container, container.childNodes, "deleted", "template");
						}
					}
					if (!startNode) {
						Sys.Application.disposeElement(container, true);
					}
					var cleared = false;
					if (!startNode) {
						try {
							container.innerHTML = "";
							cleared = true;
						}
						catch (err) { }
					}
					if (!cleared) {
						var child = startNode || container.firstChild, nextChild;
						while (child) {
							nextChild = child === endNode ? null : child.nextSibling;
							Sys.Application.disposeElement(child, false);
							container.removeChild(child);
							child = nextChild;
						}
					}
					if (placeholder) {
						container.appendChild(placeholder);
					}
				}
				else if (count > 0) {
					var i, l, start, children = container.childNodes;
					for (i = 0, l = children.length; i < l; i++) {
						if (children[i] === placeholder) {
							break;
						}
					}
					start = i - count;
					for (i = 0; i < count; i++) {
						var element = children[start];
						processElements(element, element, "deleted", "template");
						Sys.Application.disposeElement(element, false);
						container.removeChild(element);
					}
				}
			};
			interceptingTemplates = true;
		}

		if (!interceptingWebForms && window.Sys && Sys.WebForms && Sys.WebForms.PageRequestManager) {
			Sys.WebForms.PageRequestManager.getInstance().add_pageLoading(function PageRequestManager$ever_deleted(sender, evt) {
				partialPageLoadOccurred = true;
				var updating = evt.get_panelsUpdating();
				if (updating.length > 0) {
					processElements(null, updating, "deleted", "updatePanel");
				}
			});
			Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function PageRequestManager$ever_added(sender, evt) {
				// Only process elements for update panels that were added if we have actually done a partial update.
				// This is needed so that the "ever" handler is not called twice when a panel is added to the page on first page load.
				if (partialPageLoadOccurred) {
					var created = evt.get_panelsCreated();
					if (created.length > 0) {
						processElements(null, created, "added", "updatePanel");
					}
				}

				var updated = evt.get_panelsUpdated();
				if (updated.length > 0) {
					processElements(null, updated, "added", "updatePanel");
				}
			});
			interceptingWebForms = true;
		}

		if (!interceptingToggle && window.ExoWeb && ExoWeb.UI && ExoWeb.UI.Toggle) {
			var undoRender = ExoWeb.UI.Toggle.prototype.undo_render;
			if (!undoRender) {
				throw new Error("Could not find Toggle.undo_render method to override.");
			}
			ExoWeb.UI.Toggle.prototype.undo_render = function Toggle$undo_render$wrap() {
				var children = this._element.children;
				if (children.length > 0) {
					processElements(this._element, children, "deleted", "template");
				}
				undoRender.apply(this, arguments);
			};
			var toggleDispose = ExoWeb.UI.Toggle.prototype.do_dispose;
			if (!toggleDispose) {
				throw new Error("Could not find Toggle.do_dispose method to override.");
			}
			ExoWeb.UI.Toggle.prototype.do_dispose = function Toggle$do_dispose$wrap() {
				var children = this._element.children;
				if (children.length > 0) {
					processElements(this._element, children, "deleted", "template");
				}
				toggleDispose.apply(this, arguments);
			};
			interceptingToggle = true;
		}

		if (!interceptingContent && window.ExoWeb && ExoWeb.UI && ExoWeb.UI.Content) {
			var _render = ExoWeb.UI.Content.prototype._render;
			if (!_render) {
				throw new Error("Could not find Content._render method to override.");
			}
			ExoWeb.UI.Content.prototype._render = function Content$_render$wrap() {
				if (this._element) {
					var children = this._element.children;
					if (children.length > 0) {
						processElements(this._element, children, "deleted", "template");
					}
				}
				_render.apply(this, arguments);
			};
			interceptingContent = true;
		}
	}

	var rootContext = jQuery("body").context;

	var addEverHandler = function addEverHandler(context, selector, type, source, action) {
		var handlers, i, len, handler, existingHandler, existingFn;
		i = 0;
		handlers = everHandlers[type];
		len = handlers.length;
		while (i < len) {
			existingHandler = handlers[i++];
			if (existingHandler.context === context && existingHandler.source === source && existingHandler.selector === selector) {
				handler = existingHandler;
				break;
			}
		}
		if (!handler) {
			handler = { selector: selector, action: action };
			if (context) {
				handler.context = context;
			}
			handlers.push(handler);
		}
		else if (handler.action.add) {
			handler.action.add(action);
		}
		else {
			existingFn = handler.action;
			if (window.ExoWeb) {
				handler.action = ExoWeb.Functor();
				handler.action.add(existingFn);
				handler.action.add(action);
			}
			else {
				handler.action = function() {
					existingFn.apply(this, arguments);
					action.apply(this, arguments);
				};
			}
		}
	};

	// Matches elements as they are dynamically added to the DOM
	jQuery.fn.ever = function jQuery$ever(opts) {

		// The non-selector context that was passed into this jQuery object
		var queryContext,

			// The selector that was specified on the query
			querySelector = this.selector,

			// The jQuery objects that the action may be immediately performed for
			boundImmediate,
			addedImmediate,

			// The options the will be used to add handlers
			options;

		// Optimization: only make a record of the context if it's not the root context
		if (this.context !== rootContext) {
			queryContext = this.context;
		}

		// Handle legacy form
		if (typeof (opts) === "function") {
			addedImmediate = this;
			options = {
				context: queryContext,
				selector: querySelector,
				added: opts,
				deleted: arguments[1]
			};
		}
		// Use options argument directly
		else {
			options = opts;
			// Detect non-supported options
			if (window.ExoWeb) {
				for (var opt in options) {
					if (options.hasOwnProperty(opt) && !/^(selector|source|added|deleted|bound|unbound)$/.test(opt)) {
						ExoWeb.trace.logWarning("ever", "Unexpected option \"" + opt + "\"");
					}
				}
			}
			// Set the context if it was specified
			if (queryContext) {
				options.context = queryContext;
			}
			// Filter the immediate object if it will be used to invoke immediately (added/bound)
			if (options.added) {
				addedImmediate = this;
				if (options.selector) {
					addedImmediate = addedImmediate.find(options.selector);
				}
			}
			if (options.bound) {
				boundImmediate = this;
				if (options.selector) {
					boundImmediate = boundImmediate.find(options.selector);
				}
				boundImmediate = boundImmediate.filter(":bound");
			}
			// Merge the query selector with the options selector
			if (querySelector) {
				if (options.selector) {
					options.selector = querySelector.replace(/,/g, " " + options.selector + ",") + " " + options.selector;
				}
				else {
					options.selector = querySelector;
				}
			}
			else if (!options.selector) {
				if (window.ExoWeb) {
					ExoWeb.trace.throwAndLog("ever", "Ever requires a selector");
				}
				else {
					throw new Error("Ever requires a selector");
				}
			}
			if (window.ExoWeb && options.source) {
				if (!(options.added || options.deleted)) {
					ExoWeb.trace.logWarning("ever", "The source option only applies to added and deleted handlers");
				}
				if (options.source !== "template" && options.source !== "updatePanel") {
					ExoWeb.trace.logWarning("ever", "Unexpected source \"" + options.source + "\"");
				}
			}
		}

		// Add ever handlers
		if (options.added) {
			if (addedImmediate.length > 0) {
				addedImmediate.each(options.added);
			}
			addEverHandler(options.context, options.selector, "added", options.source, options.added);
		}
		if (options.deleted) {
			addEverHandler(options.context, options.selector, "deleted", options.source, options.deleted);
		}
		if (options.bound) {
			if (boundImmediate.length > 0) {
				boundImmediate.each(options.bound);
			}
			addEverHandler(options.context, options.selector, "bound", options.source, options.bound);
		}
		if (options.unbound) {
			addEverHandler(options.context, options.selector, "unbound", options.source, options.unbound);
		}

		// Ensure that code is being overriden to call ever handlers where appropriate
		ensureIntercepting();

		// Really shouldn't chain calls b/c only elements currently in the DOM would be affected
		return null;
	};

	// #endregion

	// #region ExoWeb.DotNet.WebService
	//////////////////////////////////////////////////

	ExoWeb.DotNet.config = {};

	var path = window.location.pathname;
	var idx = path.lastIndexOf("/");

	if (idx > 0 && idx < path.length - 1) {
		path = path.substring(0, idx + 1);
	}
	else if (idx === 0 && path.length > 1) {
		path += "/";
	}

	var fmt = window.location.port ? "{0}//{1}:{2}" : "{0}//{1}";
	var host = $format(fmt, window.location.protocol, window.location.hostname, window.location.port);

	function getPath() {
		return host + (ExoWeb.DotNet.config.appRoot || path) + "ExoWeb.axd";
	}

	function processRequest(method, data, success, failure) {
		$.ajax({ url: getPath() + "/" + method, type: "Post", data: JSON.stringify(data), processData: false, dataType: "text", contentType: "application/json",
			success: function(result) {
				success(JSON.parse(result));
			},
			error: function(result) { 
				var error = { message: result.statusText };
				try
				{
					error = JSON.parse(result.responseText);
				}
				catch(e) {}
				failure(error);
			}
		});
	}

	// Define the ExoWeb.Request method
	function request(args, onSuccess, onFailure) {
		args.config = ExoWeb.DotNet.config;
		processRequest("Request", args, onSuccess, onFailure);
	}

	ExoWeb.Mapper.setEventProvider(function WebService$eventProviderFn(eventType, instance, event, paths, changes, scopeQueries, onSuccess, onFailure) {
		request({
			events: [{type: eventType, instance: instance, event: event, include: paths}],
			queries: scopeQueries,
			changes: changes
		}, onSuccess, onFailure);
	});

	ExoWeb.Mapper.setRoundtripProvider(function (type, id, paths, changes, scopeQueries, onSuccess, onFailure) {
		var queries = [];

		if (type) {
			queries.push({
				from: type,
				ids: [id],
				include: paths,
				inScope: true,
				forLoad: true
			});
		}

		queries.addRange(scopeQueries);

		request({
			changes: changes,
			queries: queries
		}, onSuccess, onFailure);
	});

	ExoWeb.Mapper.setObjectProvider(function WebService$objectProviderFn(type, ids, paths, inScope, changes, scopeQueries, onSuccess, onFailure) {
		request({
			queries:[{
				from: type,
				ids: ids,
				include: paths,
				inScope: inScope,
				forLoad: true
			}].concat(scopeQueries),
			changes:changes
		}, onSuccess, onFailure);
	});

	ExoWeb.Mapper.setQueryProvider(function WebService$queryProviderFn(queries, changes, scopeQueries, onSuccess, onFailure) {
		request({
			changes: changes,
			queries: queries.concat(scopeQueries)
		}, onSuccess, onFailure);
	});

	ExoWeb.Mapper.setSaveProvider(function WebService$saveProviderFn(root, changes, scopeQueries, onSuccess, onFailure) {
		request({
			events:[{type: "Save", instance: root}],
			queries: scopeQueries,
			changes:changes
		}, onSuccess, onFailure);
	});

	ExoWeb.Mapper.setListProvider(function WebService$listProviderFn(ownerType, ownerId, paths, changes, scopeQueries, onSuccess, onFailure) {
		request({
			queries: [{
				from: ownerType,
				ids: ownerId === null ? [] : [ownerId],
				include: paths,
				inScope: false,
				forLoad: true
			}].concat(scopeQueries),
			changes: changes
		}, onSuccess, onFailure);
	});

	ExoWeb.Mapper.setTypeProvider(function WebService$typeProviderFn(types, onSuccess, onFailure) {
		if (types.length === 1) {
			var data = { type: types[0], config: ExoWeb.DotNet.config};

			if (ExoWeb.cacheHash) {
				data.cachehash = ExoWeb.cacheHash;
			}

			Sys.Net.WebServiceProxy.invoke(getPath(), "GetType", true, data, onSuccess, onFailure, null, 1000000, false, null);
		}
		else {
			request({ types: types }, onSuccess, onFailure);
		}
	});

	var loggingError = false;
	ExoWeb.setErrorHandler(function WebService$errorHandlerFn(message, e) {
		if (loggingError === false) {
			try {
				loggingError = true;
				Sys.Net.WebServiceProxy.invoke(
					getPath(),
					"LogError",
					false,
					{
						message: message,
						type: e ? parseFunctionName(e.constructor) : "Error",
						stackTrace: ExoWeb.trace.getCallStack().join("\n"),
						url: window.location.href,
						refererUrl: document.referrer,
						config: ExoWeb.DotNet.config
					}, null, null, null, 1000000, false, null);
			}
			finally {
				loggingError = false;
			}
		}
	});

	// #endregion

	// #region FormatProvider
	//////////////////////////////////////////////////

	setFormatProvider(function FormatProvider(type, format) {

		// Date
		if (type === Date) {
			// Add support for g and G that are not natively supported by the MSAJAX framework
			if (format === "g")
				format = Date._expandFormat(Sys.CultureInfo.CurrentCulture.dateTimeFormat, "d") + " " + Date._expandFormat(Sys.CultureInfo.CurrentCulture.dateTimeFormat, "t");
			else if (format === "G")
				format = Date._expandFormat(Sys.CultureInfo.CurrentCulture.dateTimeFormat, "d") + " " + Date._expandFormat(Sys.CultureInfo.CurrentCulture.dateTimeFormat, "T");

			return new Format({
				description: "",
				specifier: format,
				convert: function (val) {
					return val.localeFormat(format);
				},
				convertBack: function (str) {
					var date = Date.parseLocale(str, format);
					if (date === null)
						throw new Error("Invalid date format");
					return date;
				}
			});
		}

		// Number
		if (type === Number) {
			var isCurrencyFormat = format.match(/[$c]+/i);
			var isPercentageFormat = format.match(/[%p]+/i);
			var isIntegerFormat = format.match(/[dnfg]0/i);

			return new Format({
				description: "",
				specifier: format,
				convert: function (val) {
					// Default to browser formatting for general format
					if (format.toLowerCase() === "g")
						return val.toString();

					// Otherwise, use the localized format
					return val.localeFormat(format);
				},
				convertBack: function (str) {
					// Handle use of () to denote negative numbers
					var sign = 1;
					if (str.match(/^\(.*\)$/)) {
						str = str.substring(1, str.length - 1);
						sign = -1;
					}
					var result;

					// Remove currency symbols before parsing
					if (isCurrencyFormat)
						result = Number.parseLocale(str.replace(Sys.CultureInfo.CurrentCulture.numberFormat.CurrencySymbol, "")) * sign;

					// Remove percentage symbols before parsing and divide by 100
					else if (isPercentageFormat)
						result = Number.parseLocale(str.replace(Sys.CultureInfo.CurrentCulture.numberFormat.PercentSymbol, "")) / 100 * sign;

					// Ensure integers are actual whole numbers
					else if (isIntegerFormat && !isInteger(Number.parseLocale(str)))
						result = NaN;

					// Just parse a simple number
					else
						result = Number.parseLocale(str) * sign;

					if (isNaN(result))
						throw new Error("Invalid format");

					return result;
				}
			});
		}

		// Boolean
		if (type === Boolean) {
			// Format strings used for true, false, and null (or undefined) values
			var trueFormat, falseFormat, nullFormat;

			if (format && format.toLowerCase() === "g") {
				trueFormat = "True";
				falseFormat = "False";
				nullFormat = ""
			}
			else {
				var formats = format.split(';');
				trueFormat = formats.length > 0 ? formats[0] : "";
				falseFormat = formats.length > 1 ? formats[1] : "";
				nullFormat = formats.length > 2 ? formats[2] : "";
			}

			return new Format({
				description: "",
				specifier: format,
				convert: function (val) {
					if (val === true)
						return trueFormat;
					else if (val === false)
						return falseFormat;
					else
						return nullFormat;
				},
				convertBack: function (str) {
					if (str.toLowerCase() === trueFormat.toLowerCase())
						return true;
					else if (str.toLowerCase() === falseFormat.toLowerCase())
						return false;
					else
						return null;
				}
			});
		}

		// Default
		return new Format({
			description: "",
			specifier: "",
			convert: function (val) {
				return val.toString();
			},
			convertBack: function (str) {
				return str;
			}
		});

	});
	// #endregion

	// #region ObserverProvider
	//////////////////////////////////////////////////

	function raiseSpecificPropertyChanged(target, args) {
		var func = target.__propertyChangeHandlers[args.get_propertyName()];
		if (func && func instanceof Function) {
			func.apply(this, arguments);
		}
	}

	setObserverProvider({

		makeObservable: Sys.Observer.makeObservable,

		disposeObservable: Sys.Observer.disposeObservable,

		addCollectionChanged: Sys.Observer.addCollectionChanged,

		removeCollectionChanged: Sys.Observer.removeCollectionChanged,

		addPropertyChanged: function Sys$Observer$addSpecificPropertyChanged(target, property, handler) {
			if (!target.__propertyChangeHandlers) {
				target.__propertyChangeHandlers = {};
				Sys.Observer.addPropertyChanged(target, raiseSpecificPropertyChanged);
			}

			var func = target.__propertyChangeHandlers[property];

			if (!func) {
				target.__propertyChangeHandlers[property] = func = ExoWeb.Functor();
			}

			func.add(handler);
		},

		removePropertyChanged: function Sys$Observer$removeSpecificPropertyChanged(target, property, handler) {
			var func = target.__propertyChangeHandlers ? target.__propertyChangeHandlers[property] : null;

			if (func) {
				func.remove(handler);

				// if the functor is empty then remove the callback as an optimization
				if (func.isEmpty()) {
					delete target.__propertyChangeHandlers[property];

					var hasHandlers = false;
					for (var remainingHandler in target.__propertyChangeHandlers) {
						if (target.__propertyChangeHandlers.hasOwnProperty(remainingHandler)) {
							hasHandlers = true;
						}
					}

					if (!hasHandlers) {
						target.__propertyChangeHandlers = null;
						Sys.Observer.removePropertyChanged(target, raiseSpecificPropertyChanged);
					}
				}
			}
		},

		raisePropertyChanged: Sys.Observer.raisePropertyChanged,

		setValue: Sys.Observer.setValue
	});
	// #endregion
}
function() {


var CALL;
var setCALL = function(V) {
    CALL = function(op, operands, k) {
	return new V(op, operands, k);
    };
};



var PAUSE;
var setPAUSE = function(V) {
    PAUSE = function(onPause) {
	return new V(onPause);
    };
};








var PRIMITIVES = {};

var PrimProc = types.PrimProc;
var CasePrimitive = types.CasePrimitive;


//////////////////////////////////////////////////////////////////////

// Helper Functions

var id = function(x) { return x; };

var sub1 = function(x) {
	check(undefined, x, isNumber, 'sub1', 'number', 1, [x]);
	return jsnums.subtract(x, 1);
}

var add1 = function(x) {
	check(undefined, x, isNumber, 'add1', 'number', 1, [x]);
	return jsnums.add(x, 1);
}

var callWithValues = function(f, vals) {
	if (vals instanceof types.ValuesWrapper) {
		return CALL(f, vals.elts, id);
	}
	else {
		return CALL(f, [vals], id);
	}
};

var procedureArity = function(proc) {
	check(undefined, proc, isFunction, 'procedure-arity', 'procedure', 1, [proc]);
			
	var singleCaseArity = function(aCase) {
		if (aCase instanceof types.ContinuationClosureValue) {
			return types.arityAtLeast(0);
		}
		else if (aCase.isRest) {
			return types.arityAtLeast(aCase.numParams);
		}
		else {
			return aCase.numParams;
		}
	}
	
	if ( proc instanceof PrimProc ||
	     proc instanceof types.ClosureValue ||
	     proc instanceof types.ContinuationClosureValue ) {
		return singleCaseArity(proc);
	}
	else {
		var cases;
		if ( proc instanceof CasePrimitive ) {
			cases = proc.cases;
		}
		else if ( proc instanceof types.CaseLambdaValue ) {
			cases = proc.closures;
		}
		else {
			throw types.internalError('procedure-arity given wrong type that passed isFunction!', false);
		}

		var ret = [];
		for (var i = 0; i < cases.length; i++) {
			ret.push( singleCaseArity(cases[i]) );
		}
		ret = normalizeArity(ret);
		if (ret.length == 1) {
			return ret[0];
		}
		return types.list(ret);
	}
};

var normalizeArity = function(arity) {
	var newArity = arity.splice(0);
	var sortFunc = function(x, y) {
		if ( types.isArityAtLeast(x) && types.isArityAtLeast(y) ) {
			return types.arityValue(x) - types.arityValue(y);
		}
		else if ( types.isArityAtLeast(x) ) {
			return types.arityValue(x) - y - 0.5;
		}
		else if ( types.isArityAtLeast(y) ) {
			return x - types.arityValue(y) + 0.5;
		}
		else {
			return x - y;
		}
	};
	newArity.sort(sortFunc);

	for (var i = 0; i < newArity.length-1; i++) {
		if ( types.isArityAtLeast(newArity[i]) ) {
			return newArity.splice(0, i+1);
		}
	}
	return newArity;
};


var procArityContains = helpers.procArityContains;
//var procArityContains = function(n) {
//	return function(proc) {
//		if ( !isFunction(proc) ) {
//			return false;
//		}
//
//		var arity = procedureArity(proc);
//		if ( !isList(arity) ) {
//			arity = types.pair(arity, types.EMPTY);
//		}
//
//		while ( !arity.isEmpty() ) {
//			if ( isNumber(arity.first()) &&
//			     n === arity.first() ) {
//				return true;
//			}
//			else if ( types.isArityAtLeast(arity.first()) &&
//				  types.arityValue( arity.first() ) <= n ) {
//				return true;
//			}
//			arity = arity.rest();
//		}
//		return false;
//	}
//}

var length = function(lst) {
	checkList(lst, 'length', 1, [lst]);
	var ret = 0;
	for (; !lst.isEmpty(); lst = lst.rest()) {
		ret = ret+1;
	}
	return ret;
}

var append = function(initArgs) {
	if (initArgs.length == 0) {
		return types.EMPTY;
	}
	var args = initArgs.slice(0, initArgs.length-1);
	var lastArg = initArgs[initArgs.length - 1];
	arrayEach(args, function(x, i) {checkList(x, 'append', i+1, initArgs);});

	var ret = lastArg;
	for (var i = args.length-1; i >= 0; i--) {
		ret = args[i].append(ret);
	}
	return ret;
}

var foldHelp = function(f, acc, args) {
	if ( args[0].isEmpty() ) {
		return acc;
	}

	var fArgs = [];
	var argsRest = [];
	for (var i = 0; i < args.length; i++) {
		fArgs.push(args[i].first());
		argsRest.push(args[i].rest());
	}
	fArgs.push(acc);
	return CALL(f, fArgs,
		function(result) {
			return foldHelp(f, result, argsRest);
		});
}

var quicksort = function(functionName) {
	return function(initList, comp) {
		checkList(initList, functionName, 1, arguments);
		check(undefined, comp, procArityContains(2), functionName, 'procedure (arity 2)', 2, arguments);
	
		var quicksortHelp = function(lst) {
			if ( lst.isEmpty() ) {
				return types.EMPTY;
			}
	
			var compYes = new PrimProc('compYes', 1, false, false,
					function(x) { return CALL(comp, [x, lst.first()], id); });
			var compNo = new PrimProc('compNo', 1, false, false,
					function(x) { return CALL(comp, [x, lst.first()],
								  function(res) { return !res; });
					});
			var recCallProc = new PrimProc('quicksort', 1, false, false, quicksortHelp);
			return CALL(PRIMITIVES['filter'], [compYes, lst.rest()],
				function(half1) {
					return CALL(recCallProc, [half1],
						function(sorted1) {
							return CALL(PRIMITIVES['filter'], [compNo, lst.rest()],
								function(half2) {
									return CALL(recCallProc, [half2],
										function(sorted2) {
											return append([sorted1,
												       types.list([lst.first()]),
												       sorted2]);
										});
								});
						});
				});
		}
		return quicksortHelp(initList);
	};
}

var compare = function(args, comp) {
	var curArg = args[0];
	for (var i = 1; i < args.length; i++) {
		if ( !comp(curArg, args[i]) ) {
			return false;
		}
		curArg = args[i];
	}
	return true;
}

// isAlphabeticString: string -> boolean
var isAlphabeticString = function(s) {
	for(var i = 0; i < s.length; i++) {
		if (! ((s.charAt(i) >= "a" && s.charAt(i) <= "z") ||
		       (s.charAt(i) >= "A" && s.charAt(i) <= "Z"))) {
			return false;
		}
	}
	return true;
}

var isNumericString = function(s) {
	for (var i = 0; i < s.length; i++) {
		if ( ! (s.charAt(i) >= '0' && s.charAt(i) <= '9') ) {
			return false;
		}
	}
	return true;
}

// isWhitespaceString: string -> boolean
var isWhitespaceString = (function() {
	var pat = new RegExp("^\\s*$");
	return function(s) {
		return (s.match(pat) ? true : false);
	}
}());




var isImmutable = function(x) {
	return ((isString(x) ||
		 isByteString(x) ||
		 isVector(x) ||
		 isBox(x)) &&
		!x.mutable);
};




// Every world configuration function (on-tick, stop-when, ...)
// produces a WorldConfigOption instance.
var WorldConfigOption = types.Class.extend({
	init: function(name) {
	    this.name = name;	    
	},

	configure: function(config) {
	    throw types.internalError("unimplemented", false);
	},

	toDomNode: function(cache) {
	    var div = document.createElement('div');
	    div.appendChild(document.createTextNode("(" + this.name + " ...)"));
	    return div;
	},

	toWrittenString: function(cache) {
	    return "(" + this.name + " ...)";
	},

	toDisplayedString: function(cache) {
	    return "(" + this.name + " ...)";
	}
});


var isWorldConfigOption = function(x) { return x instanceof WorldConfigOption; };



var onEvent = function(funName, inConfigName, numArgs) {
    return function(handler) {
	return onEventBang(funName, inConfigName)(handler,
						  new PrimProc('', numArgs, false, false, function() { return types.EMPTY; }));
    };
};

var onEventBang = function(funName, inConfigName) {
    return function(handler, effectHandler) {
	check(undefined, handler, isFunction, funName, 'procedure', 1, arguments);
	check(undefined, effectHandler, isFunction, funName, 'procedure', 2, arguments);
	return new (WorldConfigOption.extend({
		    init: function() {
			this._super(funName);
		    },
		    configure: function(config) {
			var newHash = {};
			newHash[inConfigName] = handler;
			newHash[inConfigName+'Effect'] = effectHandler;
			return config.updateAll(newHash);
		    }}))();
    };
};


var assocListToHash = helpers.assocListToHash;

var raise = helpers.raise;


var makeCaller = function(aState) {
	var onFail = function(e) {
		if (typeof(console) !== 'undefined' && console.log) {
			console.log('There was an error in a procedure converted from scheme to javascript');
			if (e.stack) {
				console.log(e.stack);
			}
			else {
				console.log(e);
			}
		}
		throw e;
	}
	return function(operator, operands, k) {
		return interpret.call(aState, operator, operands, k, onFail);
	}
};


var schemeProcToJs = function(aState, schemeProc) {
	var caller = function(operator, operands, k) {
		return interpret.call(aState, operator, operands, k, function(e) { throw e; });
	}
	return function(k) {
		var args = [];
		for (var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		caller(schemeProc, args, k);
	}
};


// Struct Procedure types
var StructProc = function(typeName, name, numParams, isRest, usesState, impl) {
	PrimProc.call(this, name, numParams, isRest, usesState, impl);
	this.typeName = typeName;
};
StructProc.prototype = PrimProc.prototype;

var StructConstructorProc = function() {
	StructProc.apply(this, arguments);
};
StructConstructorProc.prototype  = StructProc.prototype;

var StructPredicateProc = function() {
	StructProc.apply(this, arguments);
};
StructPredicateProc.prototype  = StructProc.prototype;

var StructAccessorProc = function() {
	StructProc.apply(this, arguments);
};
StructAccessorProc.prototype  = StructProc.prototype;

var StructMutatorProc = function() {
	StructProc.apply(this, arguments);
};
StructMutatorProc.prototype  = StructProc.prototype;

var getMakeStructTypeReturns = function(aStructType) {
	var name = aStructType.name;
	return new types.ValuesWrapper(
		[aStructType,
		 (new StructConstructorProc(name,
					    'make-'+name,
					    aStructType.numberOfArgs,
					    false,
					    false,
					    aStructType.constructor)),
		 (new StructPredicateProc(name, name+'?', 1, false, false, aStructType.predicate)),
		 (new StructAccessorProc(name,
					 name+'-ref',
					 2,
					 false,
					 false,
					 function(x, i) {
						check(undefined, x, aStructType.predicate, name+'-ref', 'struct:'+name, 1, arguments);
						check(undefined, i, isNatural, name+'-ref', 'non-negative exact integer', 2, arguments);

						var numFields = aStructType.numberOfFields;
						if ( jsnums.greaterThanOrEqual(i, numFields) ) {
							var msg = (name+'-ref: slot index for <struct:'+name+'> not in ' +
								   '[0, ' + (numFields-1) + ']: ' + i);
							raise( types.incompleteExn(types.exnFailContract, msg, []) );
						}
						return aStructType.accessor(x, jsnums.toFixnum(i));
					 })),
		 (new StructMutatorProc(name,
					name+'-set!',
					3,
					false,
					false,
					function(x, i, v) {
						check(undefined, x, aStructType.predicate, name+'-set!', 'struct:'+name, 1, arguments);
						check(undefined, i, isNatural, name+'-set!', 'non-negative exact integer', 2, arguments);

						var numFields = aStructType.numberOfFields;
						if ( jsnums.greaterThanOrEqual(i, numFields) ) {
							var msg = (name+'-set!: slot index for <struct'+name+'> not in ' +
								   '[0, ' + (numFields-1) + ']: ' + i);
							raise( types.incompleteExn(types.exnFailContract, msg, []) );
						}
						aStructType.mutator(x, jsnums.toFixnum(i), v)
					})) ]);
};




//////////////////////////////////////////////////////////////////////


var isNumber = jsnums.isSchemeNumber;
var isReal = jsnums.isReal;
var isRational = jsnums.isRational;
var isComplex = isNumber;
var isInteger = jsnums.isInteger;

var isNatural = function(x) {
	return jsnums.isExact(x) && isInteger(x) && jsnums.greaterThanOrEqual(x, 0);
};

var isNonNegativeReal = function(x) {
	return isReal(x) && jsnums.greaterThanOrEqual(x, 0);
};

var isAngle = function(x) {
	return isReal(x) && jsnums.greaterThanOrEqual(x, 0) && jsnums.lessThan(x, 360);
};
var isSideCount = function(x) {
	return isInteger(x) && jsnums.greaterThanOrEqual(x, 3);
};
var isStepCount = function(x) {
	return isInteger(x) && jsnums.greaterThanOrEqual(x, 1);
};


var isSymbol = types.isSymbol;
var isChar = types.isChar;
var isString = types.isString;
var isPair = types.isPair;
var isEmpty = function(x) { return x === types.EMPTY; };
var isList = helpers.isList;
var isListOf = helpers.isListOf;

var isVector = types.isVector;
var isBox = types.isBox;
var isHash = types.isHash;
var isByteString = types.isByteString;

var isByte = function(x) {
	return (isNatural(x) &&
		jsnums.lessThanOrEqual(x, 255));
}

var isBoolean = function(x) {
	return (x === true || x === false);
}

var isFunction = types.isFunction;

var isEqual = function(x, y) {
	return types.isEqual(x, y, new types.UnionFind());
}

var isEq = function(x, y) {
	return x === y;
}

var isEqv = function(x, y) {
	if (isNumber(x) && isNumber(y)) {
		return jsnums.eqv(x, y);
	}
	else if (isChar(x) && isChar(y)) {
		return x.val === y.val;
	}
	return x === y;
}

var isImage = world.Kernel.isImage;
var isScene = world.Kernel.isScene;
var isColor = world.Kernel.isColor;
var nameToColor = world.Kernel.nameToColor;
var isFontFamily = function(x){
	return ((isString(x) || isSymbol(x)) &&
			(x.toString().toLowerCase() == "default" ||
			 x.toString().toLowerCase() == "decorative" ||
			 x.toString().toLowerCase() == "roman" ||
			 x.toString().toLowerCase() == "script" ||
			 x.toString().toLowerCase() == "swiss" ||
			 x.toString().toLowerCase() == "modern" ||
			 x.toString().toLowerCase() == "symbol" ||
			 x.toString().toLowerCase() == "system"))
	|| !x;		// false is also acceptable
};
var isFontStyle = function(x){
	return ((isString(x) || isSymbol(x)) &&
			(x.toString().toLowerCase() == "normal" ||
			 x.toString().toLowerCase() == "italic" ||
			 x.toString().toLowerCase() == "slant"))
	|| !x;		// false is also acceptable
};
var isFontWeight = function(x){
	return ((isString(x) || isSymbol(x)) &&
			(x.toString().toLowerCase() == "normal" ||
			 x.toString().toLowerCase() == "bold" ||
			 x.toString().toLowerCase() == "light"))
	|| !x;		// false is also acceptable
};
var colorDb = world.Kernel.colorDb;
var isMode = function(x) {
	return ((isString(x) || isSymbol(x)) &&
		(x.toString().toLowerCase() == "solid" ||
		 x.toString().toLowerCase() == "outline"));
};

var isPlaceX = function(x) {
	return ((isString(x) || isSymbol(x)) &&
			(x.toString().toLowerCase() == "left"  ||
			 x.toString().toLowerCase() == "right" ||
			 x.toString().toLowerCase() == "center" ||
			 x.toString().toLowerCase() == "middle"));
};

var isPlaceY = function(x) {
	return ((isString(x) || isSymbol(x)) &&
			(x.toString().toLowerCase() == "top"	  ||
			 x.toString().toLowerCase() == "bottom"   ||
			 x.toString().toLowerCase() == "baseline" ||
			 x.toString().toLowerCase() == "center"   ||
			 x.toString().toLowerCase() == "middle"));
};

var isStyle = function(x) {
	return ((isString(x) || isSymbol(x)) &&
		(x.toString().toLowerCase() == "solid" ||
		 x.toString().toLowerCase() == "outline"));
};


var isAssocList = function(x) {
	return isPair(x) && isPair(x.rest()) && isEmpty(x.rest().rest());
};


var isCompoundEffect = function(x) {
	return ( types.isEffect(x) || isListOf(x, isCompoundEffect) );
};

var isJsObject = types.isJsObject;
var isJsFunction = function(x) {
	return isJsObject(x) && typeof(x.obj) == 'function';
};



var arrayEach = function(arr, f) {
	for (var i = 0; i < arr.length; i++) {
		f.call(null, arr[i], i);
	}
}

//var throwCheckError = helpers.throwCheckError;
var check = helpers.check;

var checkList = function(x, functionName, position, args) {
	if ( !isList(x) ) {
		helpers.throwCheckError([functionName,
					 'list',
					 helpers.ordinalize(position),
					 x],
					position,
					args);
	}
}

var checkListOf = helpers.checkListOf;

var checkListOfLength = function(lst, n, functionName, position, args) {
	if ( !isList(lst) || (length(lst) < n) ) {
		helpers.throwCheckError([functionName,
					 'list with ' + n + ' or more elements',
					 helpers.ordinalize(position),
					 lst],
					position,
					args);
	}
}

var checkAllSameLength = function(lists, functionName, args) {
	if (lists.length == 0)
		return;
	
	var len = length(lists[0]);
	arrayEach(lists,
		  function(lst, i) {
			if (length(lst) != len) {
				var argsStr = helpers.map(function(x) { return " ~s"; }, args).join('');
				var msg = helpers.format(functionName + ': all lists must have the same size; arguments were:' + argStr,
							 args);
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
		});
}


//////////////////////////////////////////////////////////////////////


// Special moby-specific primitives

PRIMITIVES['verify-boolean-branch-value'] =
	new PrimProc('verify-boolean-branch-value',
		     2,
		     false,
		     false,
		     function(x, aLoc) { 
			 if (x !== true && x !== false) {
			     // FIXME: should throw structure
			     // make-moby-error-type:branch-value-not-boolean
			     // instead.
			     throw new Error("the value " + sys.inspect(x) + " is not boolean type at " + aLoc);
			 }
			 return x;
		     })

PRIMITIVES['throw-cond-exhausted-error'] = 
	new PrimProc('throw-cond-exhausted-error',
		     1,
		     false,
		     false,
		     function(aLoc) {
			     // FIXME: should throw structure
			     // make-moby-error-type:conditional-exhausted
			     // instead.
			 throw types.schemeError(types.incompleteExn(types.exnFail, "cond: all question results were false", []));
		     });


PRIMITIVES['print-values'] = 
    new PrimProc('print-values',
		 0,
		 true,
		 true,
		 function(state, values) {
		     var printed = false;
		     for (var i = 0; i < values.length; i++) {
			 if (values[i] !== types.VOID) {
			     state.getPrintHook()(values[i]);
			     printed = true;
			 }
		     }
		     if (printed) {
			 state.getDisplayHook()("\n");
		     }
		     state.v = types.VOID;
		 });





PRIMITIVES['check-expect'] =
    new PrimProc('check-expect',
		 2,
		 false, true,
		 function(aState, actual, expected) {
		 	if ( isFunction(actual) || isFunction(expected) ) {
				var msg = 'check-expect cannot compare functions';
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
		 	if ( !isEqual(actual, expected) ) {
				var msg = helpers.format('check-expect: actual value ~s differs from ~s, the expected value.\n',
							 [actual, expected]);
			        aState.getDisplayHook()(msg);
			    var stackTrace = state.getStackTraceFromContinuationMarks(
									state.captureCurrentContinuationMarks(aState));
			    for (var i = 0; i < stackTrace.length; i++) {
			        aState.getPrintHook()(helpers.makeLocationDom(stackTrace[i]));
			    }
			}
			aState.v = types.VOID;
		});
PRIMITIVES['EXAMPLE'] = PRIMITIVES['check-expect'];


PRIMITIVES['check-within'] =
    new PrimProc('check-within',
		 3,
		 false, true,
		 function(aState, actual, expected, range) {
		 	if ( !isNonNegativeReal(range) ) {
				var msg = helpers.format('check-within requires a non-negative real number for range, given ~s.',
							 [range]);
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
		 	if ( isFunction(actual) || isFunction(expected) ) {
				var msg = 'check-within cannot compare functions';
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			
		 	if ( !( isEqual(actual, expected) ||
			        (isReal(actual) && isReal(expected) &&
				 jsnums.lessThanOrEqual(jsnums.abs(jsnums.subtract(actual, expected)),
					 		range)) ) ) {
				var msg = helpers.format('check-within: actual value ~s is not within ~s of expected value ~s.',
							 [actual, range, expected]);

			        aState.getDisplayHook()(msg);
			    var stackTrace = state.getStackTraceFromContinuationMarks(
				state.captureCurrentContinuationMarks(aState));
			    for (var i = 0; i < stackTrace.length; i++) {
			        aState.getPrintHook()(helpers.makeLocationDom(stackTrace[i]));
			    }
			}
			aState.v = types.VOID;
		});
				


//////////////////////////////////////////////////////////////////////

var defaultPrint = 
    new PrimProc('print', 
		 1, 
		 false, 
		 true, 
		 function(state, x) {
		     state.getPrintHook()(types.toWrittenString(x));
		     state.v = types.VOID;
		 });


PRIMITIVES['write'] =
    new CasePrimitive('write',
	[new PrimProc('write', 1, false, true, function(aState, x) {
			aState.getPrintHook()(x);
			aState.v = types.VOID;
		}),
	 new PrimProc('write', 2, false, true, function(aState, x, port) {
		 	throw types.internalError('write to a port not implemented yet.', false);
		}) ]);



PRIMITIVES['display'] = 
	new CasePrimitive('display',
		      [new PrimProc('display', 1, false, true, function(state, x) {
			  state.getDisplayHook()(types.toDisplayedString(x));
			  state.v = types.VOID;
	}),
			  new PrimProc('display', 2, false, true, function(state, x, port) {
	     // FIXME
	     throw types.internalError("display to a port not implemented yet.", false);
	 } )]);



PRIMITIVES['newline'] = 
	new CasePrimitive('newline',
	[new PrimProc('newline', 0, false, true, function(state) {
		    state.getDisplayHook()('\n');
	    state.v = types.VOID;
	}),
	 new PrimProc('newline', 1, false, false, function(port) {
	     // FIXME
	     throw types.internalError("newline to a port not implemented yet.", false);
	 } )]);



PRIMITIVES['current-print'] =
    new PrimProc('current-print', 
		 0, 
		 false, false,
		 function() {
		     return defaultPrint;
		 });


PRIMITIVES['current-continuation-marks'] =
    // FIXME: should be CasePrimitive taking either 0 or 1 arguments
    new PrimProc('current-continuation-marks',
		 0,
		 false, true,
		 function(aState) {
		     aState.v = state.captureCurrentContinuationMarks(aState);
		 });

PRIMITIVES['continuation-mark-set->list'] = 
    new PrimProc('continuation-mark-set->list',
		 2,
		 false,
		 true,
		 function(aState, markSet, keyV) {
		     check(aState, markSet, 
			   types.isContinuationMarkSet, 
			   'continuation-mark-set->list',
			   'continuation-mark-set',
			   1,
			   [markSet, keyV]);
		     aState.v = types.list(markSet.ref(keyV));
		 });



PRIMITIVES['for-each'] =
    new PrimProc('for-each', 
		 2, 
		 true, true,
		 function(aState, f, firstArg, arglists) {
		 	var allArgs = [f, firstArg].concat(arglists);
		 	arglists.unshift(firstArg);
			check(aState, f, isFunction, 'for-each', 'procedure', 1, allArgs);
			arrayEach(arglists, function(lst, i) {checkList(lst, 'for-each', i+2, allArgs);});
			checkAllSameLength(arglists, 'for-each', allArgs);

			var forEachHelp = function(args) {
				if (args[0].isEmpty()) {
					aState.v =  types.VOID;
					return;
				}

				var argsFirst = [];
				var argsRest = [];
				for (var i = 0; i < args.length; i++) {
					argsFirst.push(args[i].first());
					argsRest.push(args[i].rest());
				}

				aState.v =  CALL(f, argsFirst,
					function(result) {return forEachHelp(argsRest);});
				return;
			}

			aState.v =  forEachHelp(arglists);
		 });


PRIMITIVES['make-thread-cell'] = 
	new CasePrimitive('make-thread-cell', [
	new PrimProc("make-thread-cell",
		     1, false, false,
		     function(x) {
			  return new types.ThreadCell(x, false);
		     }
		    ),
	new PrimProc("make-thread-cell",
		     2, false, false,
		     function(x, y) {
			  return new types.ThreadCell(x, y);
		     }
		    )]);



PRIMITIVES['make-continuation-prompt-tag'] = 
	new CasePrimitive('make-continuation-prompt-tag', 
			  [
	new PrimProc("make-continuation-prompt-tag",
		     0, false, false,
		     function() {
			  return new types.ThreadCell();
		     }
		    ),
	new PrimProc("make-continuation-prompt-tag",
		     1, false, false,
		     function(x) {
			  return new types.ThreadCell(x);
		     }
		    )]);



var makeOptionPrimitive = function(name,
				   numArgs,
				   defaultVals,
				   usesState,
				   bodyF) {
    var makeNthPrimitive = function(n) {
	return new PrimProc(name,
			     numArgs + n,
			     false,
			     usesState,
			     function() {
				 var expectedNumArgs = numArgs + n + (usesState ? 1 : 0);
				 assert.equal(arguments.length,
					      expectedNumArgs);
				 var args = [arguments];
				 for (var i = 0; i < arguments.length; i++) {
				     args.push(arguments[i]);
				 }
				 var startDefaults = i - numArgs - (usesState ? 1 : 0);
				 return bodyF.apply(
				     bodyF,
				     args.concat(defaultVals.slice(startDefaults)));
			     });
    };
	
    var cases = [];
    for (var i = 0; i <= defaultVals.length; i++) {
	cases.push(makeNthPrimitive(i));
    }
    return new CasePrimitive(name, cases);
};




PRIMITIVES['make-struct-type'] =
	makeOptionPrimitive(
	    'make-struct-type',
	    4,
	    [false, 
	     types.EMPTY,
	     types.symbol("prefab"),
	     false,
	     types.EMPTY,
	     false],
	    true,
	    function(userArgs,
		     aState,
		     name,
		     superType,
		     initFieldCnt,
		     autoFieldCnt,
		     autoV,
		     props,	 // FIXME: currently ignored
		     inspector,  // FIXME: currently ignored
		     procSpec,	 // FIXME: currently ignored
		     immutables, // FIXME: currently ignored
		     guard) {
		check(aState, name, isSymbol, 'make-struct-type', 'symbol', 1, userArgs);
		check(aState, superType, function(x) { return x === false || types.isStructType(x); },
		      'make-struct-type', 'struct-type or #f', 2, userArgs);
		check(aState, initFieldCnt, isNatural, 'make-struct-type', 'exact non-negative integer', 3, userArgs);
		check(aState, autoFieldCnt, isNatural, 'make-struct-type', 'exact non-negative integer', 4, userArgs);
		// TODO: check props
		// TODO: check inspector
		// TODO: check procSpect
		checkListOf(immutables, isNatural, 'make-struct-type', 'exact non-negative integer', 9, userArgs);
		check(aState, guard, function(x) { return x === false || isFunction(x); },
		      'make-struct-type', 'procedure or #f', 10, userArgs);
		// Check the number of arguments on the guard
		var numberOfGuardArgs = initFieldCnt + 1 + (superType ? superType.numberOfArgs : 0);
		if ( guard && !procArityContains(numberOfGuardArgs)(guard) ) {
			raise(types.incompleteExn(
				types.exnFailContract,
				helpers.format(
					'make-struct-type: guard procedure does not accept ~a arguments '
					+ '(one more than the number constructor arguments): ~s',
					[numberOfGuardArgs, guard]),
				[]));
		}
		var jsGuard = (guard ? schemeProcToJs(aState, guard) : false);
		var aStructType = 
		    types.makeStructureType(name.toString(),
					    superType,
					    jsnums.toFixnum(initFieldCnt),
					    jsnums.toFixnum(autoFieldCnt),
					    autoV,
					    jsGuard);

		aState.v = getMakeStructTypeReturns(aStructType);
	    });
			    
			   
PRIMITIVES['make-struct-field-accessor'] =
	makeOptionPrimitive(
	    'make-struct-field-accessor',
	    2,
	    [false],
	    false,
	    function(userArgs, accessor, fieldPos, fieldName) {
	    	check(aState, accessor, function(x) { return x instanceof StructAccessorProc && x.numParams > 1; },
		      'make-struct-field-accessor', 'accessor procedure that requires a field index', 1, userArgs);
		check(aState, fieldPos, isNatural, 'make-struct-field-accessor', 'exact non-negative integer', 2, userArgs);
		check(aState, fieldName, function(x) { return x === false || isSymbol(x); },
		      'make-struct-field-accessor', 'symbol or #f', 3, userArgs);
	    	var fixnumPos = jsnums.toFixnum(fieldPos);
	    	var procName = accessor.typeName + '-'
			+ (fieldName ? fieldName.toString() : 'field' + fixnumPos);

		return new StructAccessorProc(accessor.typeName, procName, 1, false, false,
					      function(x) {
						  return accessor.impl(x, fixnumPos);
					      });
	    });



PRIMITIVES['make-struct-field-mutator'] =
	makeOptionPrimitive(
	    'make-struct-field-mutator',
	    2,
	    [false],
	    false,
	    function(userArgs, mutator, fieldPos, fieldName) {
	    	check(undefined, mutator, function(x) { return x instanceof StructMutatorProc && x.numParams > 1; },
		      'make-struct-field-mutator', 'mutator procedure that requires a field index', 1, userArgs);
		check(undefined, fieldPos, isNatural, 'make-struct-field-mutator', 'exact non-negative integer', 2, userArgs);
		check(undefined, fieldName, function(x) { return x === false || isSymbol(x); },
		      'make-struct-field-mutator', 'symbol or #f', 3, userArgs);
	    	var fixnumPos = jsnums.toFixnum(fieldPos);
	    	var procName = mutator.typeName + '-'
			+ (fieldName ? fieldName.toString() : 'field' + fixnumPos);

		return new StructMutatorProc(mutator.typeName, procName, 2, false, false,
					     function(x, v) {
						 return mutator.impl(x, fixnumPos, v);
					     });
	    });


PRIMITIVES['struct-type?'] = new PrimProc('struct-type?', 1, false, false, types.isStructType);

PRIMITIVES['struct-constructor-procedure?'] =
    new PrimProc('struct-constructor-procedure?', 1, false, false,
		 function(x) { return x instanceof StructConstructorProc; });

PRIMITIVES['struct-predicate-procedure?'] =
    new PrimProc('struct-predicate-procedure?', 1, false, false,
		 function(x) { return x instanceof StructPredicateProc; });

PRIMITIVES['struct-accessor-procedure?'] =
    new PrimProc('struct-accessor-procedure?', 1, false, false,
		 function(x) { return x instanceof StructAccessorProc; });

PRIMITIVES['struct-mutator-procedure?'] =
    new PrimProc('struct-mutator-procedure?', 1, false, false,
		 function(x) { return x instanceof StructMutatorProc; });



PRIMITIVES['procedure-arity'] = new PrimProc('procedure-arity', 1, false, false, procedureArity);


PRIMITIVES['apply'] =
    new PrimProc('apply',
		 2,
		 true, true,
		 function(aState, f, firstArg, args) {
		 	var allArgs = [f, firstArg].concat(args);
		 	check(aState, f, isFunction, 'apply', 'procedure', 1, allArgs);
		 	args.unshift(firstArg);

			var lastArg = args.pop();
			checkList(lastArg, 'apply', args.length+2, allArgs);
			var args = args.concat(helpers.schemeListToArray(lastArg));

			aState.v =  CALL(f, args, id);
		 });


PRIMITIVES['values'] =
    new PrimProc('values',
		 0,
		 true, false,
		 function(args) {
		 	if (args.length === 1) {
				return args[0];
			}
		 	return new types.ValuesWrapper(args);
		 });


PRIMITIVES['call-with-values'] =
    new PrimProc('call-with-values',
		 2,
		 false, true,
		 function(aState, g, r) {
		 	check(aState, g, procArityContains(0), 'call-with-values', 'procedure (arity 0)', 1, arguments);
			check(aState, r, isFunction, 'call-with-values', 'procedure', 2, arguments);

			aState.v =  CALL(g, [],
				function(res) {
					return callWithValues(r, res);
				});
		 });


PRIMITIVES['compose'] =
    new PrimProc('compose',
		 0,
		 true, true,
		 function(aState, procs) {
		 	arrayEach(procs, function(p, i) {check(aState, p, isFunction, 'compose', 'procedure', i+1, procs);});

			if (procs.length == 0) {
				aState.v =  PRIMITIVES['values'];
				return;
			}
			var funList = types.list(procs).reverse();
			
			var composeHelp = function(x, fList) {
				if ( fList.isEmpty() ) {
					return x;
				}

				return CALL(new PrimProc('', 1, false, false,
						         function(args) {
							     return callWithValues(fList.first(), args);
							 }),
					    [x],
					    function(result) {
						return composeHelp(result, fList.rest());
					    });
			}
			aState.v =  new PrimProc('', 0, true, false,
					    function(args) {
						if (args.length === 1) {
							return composeHelp(args[0], funList);
						}
					        return composeHelp(new types.ValuesWrapper(args), funList);
					    });
		 });


PRIMITIVES['current-inexact-milliseconds'] =
    new PrimProc('current-inexact-milliseconds',
		 0,
		 false, false,
		 function() {
			return jsnums.makeFloat((new Date()).valueOf());
		 });


PRIMITIVES['current-seconds'] =
    new PrimProc('current-seconds',
		 0,
		 false, false,
		 function() {
		 	return Math.floor( (new Date()).getTime() / 1000 );
		 });


PRIMITIVES['not'] =
    new PrimProc('not',
		 1,
		 false, false,
		 function(x) {
		 	return x === false;
		 });


PRIMITIVES['void'] =
    new PrimProc('void', 0, true, false,
		 function(args) {
		 	return types.VOID;
		 });


PRIMITIVES['random'] =
	new CasePrimitive('random',
	[new PrimProc('random', 0, false, false,
		      function() {return types['float'](Math.random());}),
	 new PrimProc('random', 1, false, false,
		      function(n) {
			  check(undefined, n, isNatural, 'random', 'non-negative exact integer', 1, arguments);
			  return Math.floor(Math.random() * jsnums.toFixnum(n));
		      }) ]);


PRIMITIVES['sleep'] =
    new CasePrimitive('sleep',
	[new PrimProc('sleep', 0, false, false, function() { return types.VOID; }),
	 new PrimProc('sleep',
		      1,
		      false, false,
		      function(secs) {
			  check(undefined, secs, isNonNegativeReal, 'sleep', 'non-negative real number', 1);
			  
			  var millisecs = jsnums.toFixnum(jsnums.multiply(secs, 1000) );
			  return PAUSE(function(restarter, caller) {
				  setTimeout(function() { restarter(types.VOID); },
					     millisecs);
			  });
		      }) ]);


PRIMITIVES['identity'] = new PrimProc('identity', 1, false, false, id);


PRIMITIVES['raise'] = new PrimProc('raise', 1, false, false, raise);

PRIMITIVES['error'] =
    new PrimProc('error',
		 1,
		 true, true,
		 function(aState, arg1, args) {
		 	var allArgs = [arg1].concat(args);
		 	check(aState, arg1, function(x) {return isSymbol(x) || isString(x);},
			      'error', 'symbol or string', 1, allArgs);

			if ( isSymbol(arg1) ) {
				if ( args.length === 0 ) {
					raise( types.incompleteExn(types.exnFail, "error: " + arg1.val, []) );
				}
				var formatStr = args.shift();
				check(aState, formatStr, isString, 'error', 'string', 2, allArgs);

				args.unshift(arg1);
				raise( types.incompleteExn(types.exnFail, helpers.format('~s: '+formatStr.toString(), args), []) );
			}
			else {
				var msgBuffer = [arg1.toString()];
				for (var i = 0; i < args.length; i++) {
					msgBuffer.push( types.toWrittenString(args[i]) );
				}
				raise( types.incompleteExn(types.exnFail, msgBuffer.join(''), []) );
			}
		 });


PRIMITIVES['make-exn'] = new PrimProc('make-exn', 2, false, false, types.exn);

PRIMITIVES['exn-message'] =
    new PrimProc('exn-message',
		 1,
		 false, true,
		 function(aState, exn) {
		 	check(aState, exn, types.isExn, 'exn-message', 'exn', 1, [exn]);
			aState.v =  ''+types.exnMessage(exn);
		 });


PRIMITIVES['exn-continuation-marks'] =
    new PrimProc('exn-continuation-marks',
		 1,
		 false, true,
		 function(aState, exn) {
		 	check(aState, exn, types.isExn, 'exn-continuation-marks', 'exn', 1, [exn]);
			aState.v =  types.exnContMarks(exn);
		 });


PRIMITIVES['make-exn:fail'] = new PrimProc('make-exn:fail', 2, false, false, types.exnFail);


PRIMITIVES['make-exn:fail:contract'] = new PrimProc('make-exn:fail:contract', 2, false, false, types.exnFailContract);


PRIMITIVES['make-exn:fail:contract:division-by-zero'] =
    new PrimProc('make-exn:fail:contract:division-by-zero', 2, false, false, types.exnFailContractDivisionByZero);



/***********************
 *** Math Primitives ***
 ***********************/


PRIMITIVES['*'] = 
    new PrimProc('*',
		 0,
		 true, true,
		 function(aState, args) {
		     arrayEach(args, function(x, i) {check(aState, x, isNumber, '*', 'number', i+1, args);});

		     var result = types.rational(1);
		     for(var i = 0; i < args.length; i++) {
			  result = jsnums.multiply(args[i], result);
		     }
		     aState.v =  result;
		 });



PRIMITIVES['-'] = 
    new PrimProc("-",
		 1,
		 true, true,
		 function(aState, x, args) {
		     var allArgs = [x].concat(args);
		     check(aState, x, isNumber, '-', 'number', 1, allArgs);
		     arrayEach(args, function(y, i) {check(aState, y, isNumber, '-', 'number', i+2, allArgs);});

		     if (args.length == 0) { 
			  aState.v =  jsnums.subtract(0, x);
			  return;
		     }
		     var result = x;
		     for (var i = 0; i < args.length; i++) {
			  result = jsnums.subtract(result, args[i]);
		     }
		     aState.v =  result;
		 });


PRIMITIVES['+'] = 
    new PrimProc("+",
		 0,
		 true, true,
		 function(aState, args) {
		     arrayEach(args, function(x, i) {check(aState, x, isNumber, '+', 'number', i+1, args);});

		     if (args.length == 0) { 
			  aState.v =  0;
			  return;
		     }
		     var result = args[0];
		     for (var i = 1; i < args.length; i++) {
			  result = jsnums.add(result, args[i]);
		     }
		     aState.v =  result;
		 });


PRIMITIVES['='] = 
    new PrimProc("=",
		 2,
		 true, true,
		 function(aState, x, y, args) {
		 	args.unshift(y);
		 	args.unshift(x);
		 	arrayEach(args, function(z, i) {check(aState, z, isNumber, '=', 'number', i+1, args);});

		 	aState.v =  compare(args, jsnums.equals);
		 });


PRIMITIVES['=~'] =
    new PrimProc('=~',
		 3,
		 false, true,
		 function(aState, x, y, range) {
		 	check(aState, x, isReal, '=~', 'real', 1, arguments);
			check(aState, y, isReal, '=~', 'real', 2, arguments);
			check(aState, range, isNonNegativeReal, '=~', 'non-negative-real', 3, arguments);

			aState.v =  jsnums.lessThanOrEqual(jsnums.abs(jsnums.subtract(x, y)), range);
		 });


PRIMITIVES['/'] =
    new PrimProc('/',
		 1,
		 true, true,
		 function(aState, x, args) {
		 	var allArgs = [x].concat(args);
		 	check(aState, x, isNumber, '/', 'number', 1, allArgs);
		 	arrayEach(args, function(y, i) {check(aState, y, isNumber, '/', 'number', i+2, allArgs);});
			
		 	var positionStack = 
        		state.captureCurrentContinuationMarks(aState).ref(
            		types.symbol('moby-application-position-key'));
        
       
       		var locationList = positionStack[positionStack.length - 1];


			if (args.length == 0) {
				if ( jsnums.equals(x, 0) ) {
					raise( types.incompleteExn(types.exnFailContractDivisionByZero, 
												new types.Message([new types.ColoredPart('/', locationList.first()),
													": division by ",
													new types.ColoredPart("zero", locationList.rest().rest().first())]),
												[]) );
				}	
				aState.v = jsnums.divide(1, x);
				return;
			}

		 	var res = x;
		 	var func = locationList.first();

		 	locationList = locationList.rest().rest(); //move along to align args and locationList
		 	for (var i = 0; i < args.length; i++) {
				if ( jsnums.equals(args[i], 0) ) {
					raise( types.incompleteExn(types.exnFailContractDivisionByZero, 
												new types.Message([new types.ColoredPart('/', func),
													": division by ",
													new types.ColoredPart("zero", locationList.first())]),
												[]) );
				}	
				res = jsnums.divide(res, args[i]);
				locationList = locationList.rest();
		 	}
		 	aState.v = res;
		 });

 

PRIMITIVES['sub1'] =
    new PrimProc("sub1",
		 1,
		 false, false,
		 sub1);

PRIMITIVES['add1'] =
    new PrimProc("add1",
		 1,
		 false, false,
		 add1);


PRIMITIVES['<'] = 
    new PrimProc('<',
		 2,
		 true, true,
		 function(aState, x, y, args) {
		 	args.unshift(y);
		 	args.unshift(x);
		 	arrayEach(args, function(z, i) {check(aState, z, isNumber, '<', 'number', i+1, args);});

		 	aState.v =  compare(args, jsnums.lessThan);
		 });


PRIMITIVES['>'] =
    new PrimProc('>',
		 2,
		 true, true,
		 function(aState, x, y, args) {
		 	args.unshift(y);
		 	args.unshift(x);
		 	arrayEach(args, function(z, i) {check(aState, z, isNumber, '>', 'number', i+1, args);});

		 	aState.v =  compare(args, jsnums.greaterThan);
		 });


PRIMITIVES['<='] = 
    new PrimProc('<=',
		 2,
		 true, true,
		 function(aState, x, y, args) {
		 	args.unshift(y);
		 	args.unshift(x);
		 	arrayEach(args, function(z, i) {check(aState, z, isNumber, '<=', 'number', i+1, args);});

		 	aState.v =  compare(args, jsnums.lessThanOrEqual);
		 });


PRIMITIVES['>='] =
    new PrimProc('>=',
		 2,
		 true, true,
		 function(aState, x, y, args) {
		 	args.unshift(y);
		 	args.unshift(x);
		 	arrayEach(args, function(z, i) {check(aState, z, isNumber, '>=', 'number', i+1, args);});

		 	aState.v =  compare(args, jsnums.greaterThanOrEqual);
		 });




PRIMITIVES['abs'] =
    new PrimProc('abs',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isReal, 'abs', 'real', 1);
			aState.v =  jsnums.abs(x);
		 });


PRIMITIVES['quotient'] =
    new PrimProc('quotient',
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isInteger, 'quotient', 'integer', 1, arguments);
			check(aState, y, isInteger, 'quotient', 'integer', 2, arguments);

			aState.v =  jsnums.quotient(x, y);
		 });


PRIMITIVES['remainder'] =
    new PrimProc('remainder',
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isInteger, 'remainder', 'integer', 1, arguments);
			check(aState, y, isInteger, 'remainder', 'integer', 2, arguments);

			aState.v =  jsnums.remainder(x, y);
		 });


PRIMITIVES['modulo'] =
    new PrimProc('modulo',
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isInteger, 'modulo', 'integer', 1, arguments);
			check(aState, y, isInteger, 'modulo', 'integer', 2, arguments);

			aState.v =  jsnums.modulo(x, y);
		 });


PRIMITIVES['max'] =
    new PrimProc('max',
		 1,
		 true, true,
		 function(aState, x, args) {
			args.unshift(x);
//		 	check(aState, x, isReal, 'max', 'real', 1, allArgs);
			arrayEach(args, function(y, i) {check(aState, y, isReal, 'max', 'real', i+1, args);});

			var curMax = x;
			for (var i = 1; i < args.length; i++) {
				if ( jsnums.greaterThan(args[i], curMax) ) {
					curMax = args[i];
				}
			}
			aState.v =  curMax;
		 });


PRIMITIVES['min'] =
    new PrimProc('min',
		 1,
		 true, true,
		 function(aState, x, args) {
		 	args.unshift(x);
//		 	check(aState, x, isReal, 'min', 'real', 1);
			arrayEach(args, function(y, i) {check(aState, y, isReal, 'min', 'real', i+1, args);});

			var curMin = x;
			for (var i = 1; i < args.length; i++) {
				if ( jsnums.lessThan(args[i], curMin) ) {
					curMin = args[i];
				}
			}
			aState.v =  curMin;
		 });


PRIMITIVES['gcd'] =
    new PrimProc('gcd',
		 1,
		 true, true,
		 function(aState, x, args) {
		 	var allArgs = [x].concat(args);
		 	check(aState, x, isInteger, 'gcd', 'integer', 1, allArgs);
		 	arrayEach(args, function(y, i) {check(aState, y, isInteger, 'gcd', 'integer', i+2, allArgs);});

		 	aState.v =  jsnums.gcd(x, args);
		 });

PRIMITIVES['lcm'] =
    new PrimProc('lcm',
		 1,
		 true, true,
		 function(aState, x, args) {
		 	var allArgs = [x].concat(args);
		 	check(aState, x, isInteger, 'lcm', 'integer', 1, allArgs);
		 	arrayEach(args, function(y, i) {check(aState, y, isInteger, 'lcm', 'integer', i+2, allArgs);});

		 	aState.v =  jsnums.lcm(x, args);
		 });


PRIMITIVES['floor'] =
    new PrimProc('floor',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isReal, 'floor', 'real', 1);
			aState.v =  jsnums.floor(x);
		 });


PRIMITIVES['ceiling'] =
    new PrimProc('ceiling',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isReal, 'ceiling', 'real', 1);
			aState.v =  jsnums.ceiling(x);
		 });


PRIMITIVES['round'] =
    new PrimProc('round',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isReal, 'round', 'real', 1);
			aState.v =  jsnums.round(x);
		 });


PRIMITIVES['numerator'] =
    new PrimProc('numerator',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isRational, 'numerator', 'rational number', 1);
			aState.v =  jsnums.numerator(x);
		 });


PRIMITIVES['denominator'] =
    new PrimProc('denominator',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isRational, 'denominator', 'rational number', 1);
			aState.v =  jsnums.denominator(x);
		 });


PRIMITIVES['expt'] = 
    new PrimProc("expt",
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isNumber, 'expt', 'number', 1, arguments);
			check(aState, y, isNumber, 'expt', 'number', 2, arguments);
		 	aState.v =  jsnums.expt(x, y);
		 });


PRIMITIVES['exp'] =
    new PrimProc('exp',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'exp', 'number', 1);
			aState.v =  jsnums.exp(x);
		 });


PRIMITIVES['log'] =
    new PrimProc('log',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'log', 'number', 1);
			aState.v =  jsnums.log(x);
		 });


PRIMITIVES['sin'] =
    new PrimProc('sin',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'sin', 'number', 1);
			aState.v =  jsnums.sin(x);
		 });


PRIMITIVES['cos'] =
    new PrimProc('cos',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'cos', 'number', 1);
			aState.v =  jsnums.cos(x);
		 });


PRIMITIVES['tan'] =
    new PrimProc('tan',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'tan', 'number', 1);
			aState.v =  jsnums.tan(x);
		 });


PRIMITIVES['asin'] =
    new PrimProc('asin',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'asin', 'number', 1);
			aState.v =  jsnums.asin(x);
		 });


PRIMITIVES['acos'] =
    new PrimProc('acos',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'acos', 'number', 1);
			aState.v =  jsnums.acos(x);
		 });


PRIMITIVES['atan'] =
    new PrimProc('atan',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'atan', 'number', 1);
			aState.v =  jsnums.atan(x);
		 });


PRIMITIVES['sinh'] =
    new PrimProc('sinh',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'sinh', 'number', 1);
			aState.v =  jsnums.sinh(x);
		 });


PRIMITIVES['cosh'] =
    new PrimProc('cosh',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'cosh', 'number', 1);
			aState.v =  jsnums.cosh(x);
		 });


PRIMITIVES['sqr'] =
    new PrimProc('sqr',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'sqr', 'number', 1);
			aState.v =  jsnums.sqr(x);
		 });


PRIMITIVES['sqrt'] =
    new PrimProc('sqrt',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'sqrt', 'number', 1);
			aState.v =  jsnums.sqrt(x);
		 });


PRIMITIVES['integer-sqrt'] =
    new PrimProc('integer-sqrt',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isInteger, 'integer-sqrt', 'integer', 1);
			aState.v =  jsnums.integerSqrt(x);
		 });


PRIMITIVES['make-rectangular'] =
    new PrimProc('make-rectangular',
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isReal, 'make-rectangular', 'real', 1, arguments);
			check(aState, y, isReal, 'make-rectangular', 'real', 2, arguments);
			aState.v =  types.complex(x, y);
		 });

PRIMITIVES['make-polar'] =
    new PrimProc('make-polar',
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isReal, 'make-polar', 'real', 1, arguments);
			check(aState, x, isReal, 'make-polar', 'real', 2, arguments);
			aState.v =  jsnums.makeComplexPolar(x, y);
		 });


PRIMITIVES['real-part'] =
    new PrimProc('real-part',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'real-part', 'number', 1);
			aState.v =  jsnums.realPart(x);
		 });


PRIMITIVES['imag-part'] =
    new PrimProc('imag-part',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'imag-part', 'number', 1);
			aState.v =  jsnums.imaginaryPart(x);
		 });


PRIMITIVES['angle'] =
    new PrimProc('angle',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'angle', 'number', 1);
			aState.v =  jsnums.angle(x);
		 });


PRIMITIVES['magnitude'] =
    new PrimProc('magnitude',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'magnitude', 'number', 1);
			aState.v =  jsnums.magnitude(x);
		 });


PRIMITIVES['conjugate'] =
    new PrimProc('conjugate',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'conjugate', 'number', 1);
			aState.v =  jsnums.conjugate(x);
		 });


PRIMITIVES['sgn'] =
    new PrimProc('sgn',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isReal, 'sgn', 'real number', 1);
			if ( jsnums.greaterThan(x, 0) ) {
				aState.v =  1;
				return;
			}
			else if ( jsnums.lessThan(x, 0) ) {
				aState.v =  -1;
				return;
			}
			else {
				aState.v =  0;
			}
		 });


PRIMITIVES['inexact->exact'] =
    new PrimProc('inexact->exact',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'inexact->exact', 'number', 1);
			try {
				aState.v =  jsnums.toExact(x);
				return;
			} catch(e) {
				raise( types.exnFailContract('inexact->exact: no exact representation for '
							     + types.toWrittenString(x),
							     false) );
			}
		 });


PRIMITIVES['exact->inexact'] =
    new PrimProc('exact->inexact',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'exact->inexact', 'number', 1);
			aState.v =  jsnums.toInexact(x);
		 });


PRIMITIVES['number->string'] =
    new PrimProc('number->string',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isNumber, 'number->string', 'number', 1);
			aState.v =  types.string(x+'');
		 });


PRIMITIVES['string->number'] =
    new PrimProc('string->number',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string->number', 'string', 1);
			aState.v =  jsnums.fromString(str);
		 });


PRIMITIVES['xml->s-exp'] =
    new PrimProc('xml->s-exp',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'xml->s-exp', 'string', 1);
			if (str.length == 0) {
				aState.v =  types.string('');
				return;
			}

			var xmlDoc;
			try {
				//Internet Explorer
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = "false";
				xmlDoc.loadXML(s);
				// FIXME: check parse errors
			}
			catch(e) {
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(s, "text/xml");
				// FIXME: check parse errors
			}

			var parseAttributes = function(attrs) {
				var result = types.EMPTY;
				for (var i = 0; i < attrs.length; i++) {
					var keyValue = types.cons(types.symbol(attrs.item(i).nodeName),
								  types.cons(attrs.item(i).nodeValue,
									     types.EMPTY));
					result = types.cons(keyValue, result);
				}
				return types.cons(types.symbol("@"), result).reverse();
			};

			var parse = function(node) {
				if (node.nodeType == Node.ELEMENT_NODE) {
					var result = types.EMPTY;
					var child = node.firstChild;
					while (child != null) {
						var nextResult = parse(child);
						if (isString(nextResult) && 
						    !result.isEmpty() &&
						    isString(result.first())) {
							result = types.cons(result.first() + nextResult,
									    result.rest());
						} else {
							result = types.cons(nextResult, result);
						}
						child = child.nextSibling;
					}
					result = result.reverse();
					result = types.cons(parseAttributes(node.attributes),
							    result);
					result = types.cons(
						types.symbol(node.nodeName),
						result);
					return result;
				} else if (node.nodeType == Node.TEXT_NODE) {
					return node.textContent;
				} else if (node.nodeType == Node.CDATA_SECTION_NODE) {
					return node.data;
				} else {
					return types.EMPTY;
				}
			};
			var result = parse(xmlDoc.firstChild);
			aState.v =  result;
		 });




/******************
 *** Predicates ***
 ******************/

PRIMITIVES['procedure?'] = new PrimProc('procedure?', 1, false, false, isFunction);

PRIMITIVES['pair?'] = new PrimProc('pair?', 1, false, false, isPair);
PRIMITIVES['cons?'] = new PrimProc('cons?', 1, false, false, isPair);
PRIMITIVES['empty?'] = new PrimProc('empty?', 1, false, false, isEmpty);
PRIMITIVES['null?'] = new PrimProc('null?', 1, false, false, isEmpty);

PRIMITIVES['undefined?'] = new PrimProc('undefined?', 1, false, false, function(x) { return x === types.UNDEFINED; });
PRIMITIVES['void?'] = new PrimProc('void?', 1, false, false, function(x) { return x === types.VOID; });

PRIMITIVES['symbol?'] = new PrimProc('symbol?', 1, false, false, isSymbol);
PRIMITIVES['string?'] = new PrimProc('string?', 1, false, false, isString);
PRIMITIVES['char?'] = new PrimProc('char?', 1, false, false, isChar);
PRIMITIVES['boolean?'] = new PrimProc('boolean?', 1, false, false, isBoolean);
PRIMITIVES['vector?'] = new PrimProc('vector?', 1, false, false, isVector);
PRIMITIVES['struct?'] = new PrimProc('struct?', 1, false, false, types.isStruct);
PRIMITIVES['eof-object?'] = new PrimProc('eof-object?', 1, false, false, function(x) { return x === types.EOF; });
PRIMITIVES['posn?'] = new PrimProc('posn?', 1, false, false, types.isPosn);
PRIMITIVES['bytes?'] = new PrimProc('bytes?', 1, false, false, isByteString);
PRIMITIVES['byte?'] = new PrimProc('byte?', 1, false, false, isByte);

PRIMITIVES['number?'] = new PrimProc('number?', 1, false, false, isNumber);
PRIMITIVES['complex?'] = new PrimProc('complex?', 1, false, false, isComplex);
PRIMITIVES['real?'] = new PrimProc('real?', 1, false, false, isReal);
PRIMITIVES['rational?'] = new PrimProc('rational?', 1, false, false, isRational);
PRIMITIVES['integer?'] = new PrimProc('integer?', 1, false, false, isInteger);

PRIMITIVES['exact?'] =
    new PrimProc('exact?', 1, false, true,
		 function(aState, x) {
			check(aState, x, isNumber, 'exact?', 'number', 1);
			aState.v =  jsnums.isExact(x);
		 });
PRIMITIVES['inexact?'] =
    new PrimProc('inexact?', 1, false, true,
		 function(aState, x) {
			check(aState, x, isNumber, 'inexact?', 'number', 1);
			aState.v =  jsnums.isInexact(x);
		 });

PRIMITIVES['odd?'] =
    new PrimProc('odd?',
		 1,
		 false, true,
		 function(aState, x) {
			check(aState, x, isInteger, 'odd?', 'integer', 1);
			aState.v =  jsnums.equals(jsnums.modulo(x, 2), 1);
		 });
PRIMITIVES['even?'] =
    new PrimProc('even?',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isInteger, 'even?', 'integer', 1);
			aState.v =  jsnums.equals(jsnums.modulo(x, 2), 0);
		 });

PRIMITIVES['zero?'] =
    new PrimProc("zero?",
		 1,
		 false, false,
		 function(x) {
		     aState.v =  jsnums.equals(0, x)
		 });

PRIMITIVES['positive?'] =
    new PrimProc('positive?',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isReal, 'positive?', 'real', 1);
			aState.v =  jsnums.greaterThan(x, 0);
		 });
PRIMITIVES['negative?'] =
    new PrimProc('negative?',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, isReal, 'negative?', 'real', 1);
			aState.v =  jsnums.lessThan(x, 0);
		 });

PRIMITIVES['box?'] = new PrimProc('box?', 1, false, false, isBox);

PRIMITIVES['hash?'] = new PrimProc('hash?', 1, false, false, isHash);


PRIMITIVES['eq?'] = new PrimProc('eq?', 2, false, false, isEq);
PRIMITIVES['eqv?'] = new PrimProc('eqv?', 2, false, false, isEqv);
PRIMITIVES['equal?'] = new PrimProc('equal?', 2, false, false, isEqual);
PRIMITIVES['equal~?'] =
    new PrimProc('equal~?',
		 3,
		 false, true,
		 function(aState, x, y, range) {
		 	check(aState, range, isNonNegativeReal, 'equal~?', 'non-negative number', 3, arguments);

			aState.v =  (isEqual(x, y) ||
				(isReal(x) && isReal(y) &&
				 jsnums.lessThanOrEqual(jsnums.abs(jsnums.subtract(x, y)), range)));
		 });


PRIMITIVES['false?'] = new PrimProc('false?', 1, false, false, function(x) { return x === false; });
PRIMITIVES['boolean=?'] =
    new PrimProc('boolean=?',
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isBoolean, 'boolean=?', 'boolean', 1, arguments);
			check(aState, y, isBoolean, 'boolean=?', 'boolean', 2, arguments);
			aState.v =  x === y;
		 });

PRIMITIVES['symbol=?'] =
    new PrimProc('symbol=?',
		 2,
		 false, true,
		 function(aState, x, y) {
		 	check(aState, x, isSymbol, 'symbol=?', 'symbol', 1, arguments);
			check(aState, y, isSymbol, 'symbol=?', 'symbol', 2, arguments);
			aState.v =  isEqual(x, y);
		 });


PRIMITIVES['js-object?'] = new PrimProc('js-object?', 1, false, false, isJsObject);


/***********************
 *** List Primitives ***
 ***********************/

PRIMITIVES['cons'] =
    new PrimProc('cons',
		 2,
		 false, false,
		 function(f, r) {
//		 	checkList(r, "cons", 2);
		 	return types.cons(f, r);
		 });


PRIMITIVES['car'] =
    new PrimProc('car',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, isPair, 'car', 'pair', 1);
			aState.v =  lst.first();
		 });

PRIMITIVES['cdr'] =
    new PrimProc('cdr',
		 1,
		 false, true,
		 function(aState, lst) {
			check(aState, lst, isPair, 'cdr', 'pair', 1);
			aState.v =  lst.rest();
		 });

PRIMITIVES['caar'] =
    new PrimProc('caar',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return (isPair(x) && isPair(x.first())); },
			      'caar', 'caarable value', 1);
		 	aState.v =  lst.first().first();
		 });

PRIMITIVES['cadr'] =
    new PrimProc('cadr',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return isPair(x) && isPair(x.rest()); },
			      'cadr', 'cadrable value', 1);
			aState.v =  lst.rest().first();
		 });

PRIMITIVES['cdar'] =
    new PrimProc('cdar',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return isPair(x) && isPair(x.first()); },
			      'cdar', 'cdarable value', 1);
		 	aState.v =  lst.first().rest();
		 });

PRIMITIVES['cddr'] =
    new PrimProc('cddr',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return isPair(x) && isPair(x.rest()); },
			      'cddr', 'cddrable value', 1);
		 	aState.v =  lst.rest().rest();
		 });

PRIMITIVES['caaar'] =
    new PrimProc('caaar',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.first()) &&
							  isPair(x.first().first()) ); },
			      'caaar', 'caaarable value', 1);
		 	aState.v =  lst.first().first().first();
		 });

PRIMITIVES['caadr'] =
    new PrimProc('caadr',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.rest()) &&
							  isPair(x.rest().first()) ); },
			      'caadr', 'caadrable value', 1);
		 	aState.v =  lst.rest().first().first();
		 });

PRIMITIVES['cadar'] =
    new PrimProc('cadar',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.first()) &&
							  isPair(x.first().rest()) ); },
			      'cadar', 'cadarable value', 1);
		 	aState.v =  lst.first().rest().first();
		 });

PRIMITIVES['cdaar'] =
    new PrimProc('cdaar',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.first()) &&
							  isPair(x.first().first()) ); },
			      'cdaar', 'cdaarable value', 1);
		 	aState.v =  lst.first().first().rest();
		 });

PRIMITIVES['cdadr'] =
    new PrimProc('cdadr',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.rest()) &&
							  isPair(x.rest().first()) ); },
			      'cdadr', 'cdadrable value', 1);
		 	aState.v =  lst.rest().first().rest();
		 });

PRIMITIVES['cddar'] =
    new PrimProc('cddar',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.first()) &&
							  isPair(x.first().rest()) ); },
			      'cddar', 'cddarable value', 1);
		 	aState.v =  lst.first().rest().rest();
		 });

PRIMITIVES['caddr'] =
    new PrimProc('caddr',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.rest()) &&
							  isPair(x.rest().rest()) ); },
			      'caddr', 'caddrable value', 1);
		 	aState.v =  lst.rest().rest().first();
		 });

PRIMITIVES['cdddr'] =
    new PrimProc('cdddr',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.rest()) &&
							  isPair(x.rest().rest()) ); },
			      'cdddr', 'cdddrable value', 1);
		 	aState.v =  lst.rest().rest().rest();
		 });

PRIMITIVES['cadddr'] =
    new PrimProc('cadddr',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return ( isPair(x) &&
							  isPair(x.rest()) &&
							  isPair(x.rest().rest()) &&
				       			  isPair(x.rest().rest().rest()) ); },
			      'cadddr', 'cadddrable value', 1);
		 	aState.v =  lst.rest().rest().rest().first();
		 });


PRIMITIVES['rest'] =
    new PrimProc('rest',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return isList(x) && !isEmpty(x); },
			      'rest', 'non-empty list', 1);
			aState.v =  lst.rest();
		 });

PRIMITIVES['first'] =
    new PrimProc('first',
		 1,
		 false, true,
		 function(aState, lst) {
		 	check(aState, lst, function(x) { return isList(x) && !isEmpty(x); },
			      'first', 'non-empty list', 1);
			aState.v =  lst.first();
		 });

PRIMITIVES['second'] =
    new PrimProc('second',
		 1,
		 false, false,
		 function(lst) {
			checkListOfLength(lst, 2, 'second', 1);
			return lst.rest().first();
		 });

PRIMITIVES['third'] =
    new PrimProc('third',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOfLength(lst, 3, 'third', 1);
			return lst.rest().rest().first();
		 });

PRIMITIVES['fourth'] =
    new PrimProc('fourth',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOfLength(lst, 4, 'fourth', 1);
			return lst.rest().rest().rest().first();
		 });

PRIMITIVES['fifth'] =
    new PrimProc('fifth',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOfLength(lst, 5, 'fifth', 1);
		 	return lst.rest().rest().rest().rest().first();
		 });

PRIMITIVES['sixth'] =
    new PrimProc('sixth',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOfLength(lst, 6, 'sixth', 1);
		 	return lst.rest().rest().rest().rest().rest().first();
		 });

PRIMITIVES['seventh'] =
    new PrimProc(
		 'seventh',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOfLength(lst, 7, 'seventh', 1);
		 	return lst.rest().rest().rest().rest().rest().rest().first();
		 });

PRIMITIVES['eighth'] =
    new PrimProc('eighth',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOfLength(lst, 8, 'eighth', 1);
		 	return lst.rest().rest().rest().rest().rest().rest().rest().first();
		 });


PRIMITIVES['length'] =
    new PrimProc('length',
		 1,
		 false, false,
		 function(lst) {
		  	return jsnums.makeRational(length(lst));
		 });


PRIMITIVES['list?'] = new PrimProc('list?', 1, false, false, isList);


PRIMITIVES['list'] =
    new PrimProc('list',
		 0,
		 true, false,
		 types.list);


PRIMITIVES['list*'] =
    new PrimProc('list*',
		 1,
		 true, false,
		 function(items, otherItems) {
		 	var allArgs = [items].concat(otherItems);
		 	if (otherItems.length == 0) {
				return items;
			}
		 
		 	var lastListItem = otherItems.pop();
		 	checkList(lastListItem, 'list*', otherItems.length+2, allArgs);

		 	otherItems.unshift(items);
		 	return append([types.list(otherItems), lastListItem]);
		 });


PRIMITIVES['list-ref'] =
    new PrimProc('list-ref',
		 2,
		 false, true,
		 function(aState,origList, num) {
		 	checkList(origList, 'list-ref', 1, arguments);
		 	check(aState, num, isNatural, 'list-ref', 'non-negative exact integer', 2, arguments);

		 	var positionStack = 
        		state.captureCurrentContinuationMarks(aState).ref(
            		types.symbol('moby-application-position-key'));
        
       
       		  var locationList = positionStack[positionStack.length - 1];

			var lst = origList;
			var n = jsnums.toFixnum(num);
		 	for (var i = 0; i < n; i++) {
		 		if (lst.isEmpty() || lst.rest().isEmpty()) { //fixing off by one error
					/*var msg = ('list-ref: index ' + n +
						   ' is too large for list: ' +
						   types.toWrittenString(origList));*/
					raise( types.incompleteExn(types.exnFailContract, 
												new types.Message([
													new types.ColoredPart('list-ref', locationList.first()),
													": index ",
													new types.ColoredPart(n, locationList.rest().rest().first()) ,
													' is too large for list: ',
													new types.ColoredPart(types.toWrittenString(origList), locationList.rest().first())]), 
												[]) );
		 		}
	  			lst = lst.rest();
		 	}
		 	aState.v = lst.first();
		 });

PRIMITIVES['list-tail'] =
    new PrimProc('list-tail',
		 2,
		 false, true,
		 function(aState, lst, num) {
		 	checkList(lst, 'list-tail', 1, arguments);
			check(aState, x, isNatural, 'list-tail', 'non-negative exact integer', 2, arguments);

			var lst = origList;
			var n = jsnums.toFixnum(num);
		 	for (var i = 0; i < n; i++) {
				if (lst.isEmpty()) {
					var msg = ('list-tail: index ' + n +
						   ' is too large for list: ' +
						   types.toWrittenString(origList));
					raise( types.incompleteExn(types.exnFailContract, msg, []) );
				}
				lst = lst.rest();
			}
			aState.v =  lst;
		 });


PRIMITIVES['append'] =
    new PrimProc('append',
		 0,
		 true, false,
		 append);


PRIMITIVES['reverse'] =
    new PrimProc('reverse',
		 1,
		 false, false,
		 function(lst) {
		 	checkList(lst, 'reverse', 1);
		 	return lst.reverse();
		 });


PRIMITIVES['map'] =
    new PrimProc('map',
		 2,
		 true, true,
		 function(aState, f, lst, arglists) {
		 	var allArgs = [f, lst].concat(arglists);
		 	arglists.unshift(lst);
		 	check(aState, f, isFunction, 'map', 'procedure', 1, allArgs);
		 	arrayEach(arglists, function(x, i) {checkList(x, 'map', i+2, allArgs);});
			checkAllSameLength(arglists, 'map', allArgs);
			
			var mapHelp = function(f, args, acc) {
				if (args[0].isEmpty()) {
				    return acc.reverse();
				}
				
				var argsFirst = [];
				var argsRest = [];
				for (var i = 0; i < args.length; i++) {
					argsFirst.push(args[i].first());
					argsRest.push(args[i].rest());
				}
				var result = CALL(f, argsFirst,
					function(result) {
						return mapHelp(f, argsRest, types.cons(result, acc));
					});
				return result;
			}
			aState.v =  mapHelp(f, arglists, types.EMPTY);
		});


PRIMITIVES['andmap'] =
    new PrimProc('andmap',
		 2,
		 true, true,
		 function(aState, f, lst, arglists) {
		 	var allArgs = [f, lst].concat(arglists);
		 	arglists.unshift(lst);
		  	check(aState, f, isFunction, 'andmap', 'procedure', 1, allArgs);
		  	arrayEach(arglists, function(x, i) {checkList(x, 'andmap', i+2, allArgs);});
			checkAllSameLength(arglists, 'andmap', allArgs);
  
			var andmapHelp = function(f, args) {
				if ( args[0].isEmpty() ) {
					return true;
				}

				var argsFirst = [];
				var argsRest = [];
				for (var i = 0; i < args.length; i++) {
					argsFirst.push(args[i].first());
					argsRest.push(args[i].rest());
				}

				return CALL(f, argsFirst,
					function(result) {
						return result && andmapHelp(f, argsRest);
					});
			}
			aState.v =  andmapHelp(f, arglists);
		 });


PRIMITIVES['ormap'] =
    new PrimProc('ormap',
		 2,
		 true, true,
		 function(aState, f, lst, arglists) {
		 	var allArgs = [f, lst].concat(arglists);
		 	arglists.unshift(lst);
		  	check(aState, f, isFunction, 'ormap', 'procedure', 1, allArgs);
		  	arrayEach(arglists, function(x, i) {checkList(x, 'ormap', i+2, allArgs);});
			checkAllSameLength(arglists, 'ormap', allArgs);

			var ormapHelp = function(f, args) {
				if ( args[0].isEmpty() ) {
					return false;
				}

				var argsFirst = [];
				var argsRest = [];
				for (var i = 0; i < args.length; i++) {
					argsFirst.push(args[i].first());
					argsRest.push(args[i].rest());
				}

				return CALL(f, argsFirst,
					function(result) {
						return result || ormapHelp(f, argsRest);
					});
			}
			aState.v =  ormapHelp(f, arglists);
		});


PRIMITIVES['memq'] =
    new PrimProc('memq',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkList(lst, 'memq', 2, arguments);
			while ( !lst.isEmpty() ) {
				if ( isEq(item, lst.first()) ) {
					return lst;
				}
				lst = lst.rest();
			}
			return false;
		 });


PRIMITIVES['memv'] =
    new PrimProc('memv',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkList(lst, 'memv', 2, arguments);
			while ( !lst.isEmpty() ) {
				if ( isEqv(item, lst.first()) ) {
					return lst;
				}
				lst = lst.rest();
			}
			return false;
		 });


PRIMITIVES['member'] =
    new PrimProc('member',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkList(lst, 'member', 2, arguments);
		 	while ( !lst.isEmpty() ) {
		 		if ( isEqual(item, lst.first()) ) {
		 			return lst;
		 		}
		 		lst = lst.rest();
		 	}
		 	return false;
		 });

PRIMITIVES['member?'] =
    new PrimProc('member?',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkList(lst, 'member?', 2, arguments);
		 	while ( !lst.isEmpty() ) {
		 		if ( isEqual(item, lst.first()) ) {
		 			return true;
		 		}
		 		lst = lst.rest();
		 	}
		 	return false;
		 });


PRIMITIVES['memf'] =
    new PrimProc('memf',
		 2,
		 false, true,
		 function(aState, f, initList) {
		 	check(aState, f, isFunction, 'memf', 'procedure', 1, arguments);
			checkList(initList, 'memf', 2, arguments);

			var memfHelp = function(lst) {
				if ( lst.isEmpty() ) {
					return false;
				}

				return CALL(f, [lst.first()],
					function(result) {
						if (result) {
							return lst;
						}
						return memfHelp(lst.rest());
					});
			}
			aState.v =  memfHelp(initList);
		 });


PRIMITIVES['assq'] =
    new PrimProc('assq',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkListOf(lst, isPair, 'assq', 'pair', 2, arguments);
			while ( !lst.isEmpty() ) {
				if ( isEq(item, lst.first().first()) ) {
					return lst.first();
				}
				lst = lst.rest();
			}
			return false;
		 });


PRIMITIVES['assv'] =
    new PrimProc('assv',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkListOf(lst, isPair, 'assv', 'pair', 2, arguments);
			while ( !lst.isEmpty() ) {
				if ( isEqv(item, lst.first().first()) ) {
					return lst.first();
				}
				lst = lst.rest();
			}
			return false;
		 });


PRIMITIVES['assoc'] =
    new PrimProc('assoc',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkListOf(lst, isPair, 'assoc', 'pair', 2, arguments);
			while ( !lst.isEmpty() ) {
				if ( isEqual(item, lst.first().first()) ) {
					return lst.first();
				}
				lst = lst.rest();
			}
			return false;
		 });


PRIMITIVES['remove'] =
    new PrimProc('remove',
		 2,
		 false, false,
		 function(item, lst) {
		 	checkList(lst, 'remove', 2, arguments);
		 	var originalLst = lst;
		 	var result = types.EMPTY;
		 	while ( !lst.isEmpty() ) {
		 		if ( isEqual(item, lst.first()) ) {
		 			return append([result.reverse(), lst.rest()]);
		 		} else {
		 			result = types.cons(lst.first(), result);
		 			lst = lst.rest();
		 		}
		 	}
		 	return originalLst;
		 });


PRIMITIVES['filter'] =
    new PrimProc('filter',
		 2,
		 false, true,
		 function(aState, f, lst) {
		 	check(aState, f, procArityContains(1), 'filter', 'procedure (arity 1)', 1, arguments);
			checkList(lst, 'filter', 2);

			var filterHelp = function(f, lst, acc) {
				if ( lst.isEmpty() ) {
					return acc.reverse();
				}

				return CALL(f, [lst.first()],
					function(result) {
						if (result) {
							return filterHelp(f, lst.rest(),
								types.cons(lst.first(), acc));
						}
						else {
							return filterHelp(f, lst.rest(), acc);
						}
					});
			}
			aState.v =  filterHelp(f, lst, types.EMPTY);
		 });

PRIMITIVES['foldl'] =
    new PrimProc('foldl',
		 3,
		 true, true,
		 function(aState, f, initAcc, lst, arglists) {
		 	arglists.unshift(lst);
			var allArgs = [f, initAcc].concat(arglists);
		 	check(aState, f, isFunction, 'foldl', 'procedure', 1, allArgs);
			arrayEach(arglists, function(x, i) {checkList(x, 'foldl', i+3, allArgs);});
			checkAllSameLength(arglists, 'foldl', allArgs);
	
			aState.v =  foldHelp(f, initAcc, arglists);
		});

PRIMITIVES['foldr'] =
    new PrimProc('foldr',
		 3,
		 true, true,
		 function(aState, f, initAcc, lst, arglists) {
		 	arglists.unshift(lst);
			var allArgs = [f, initAcc].concat(arglists);
		 	check(aState, f, isFunction, 'foldr', 'procedure', 1, allArgs);
			arrayEach(arglists, function(x, i) {checkList(x, 'foldr', i+3, allArgs);});
			checkAllSameLength(arglists, 'foldr', allArgs);

			for (var i = 0; i < arglists.length; i++) {
				arglists[i] = arglists[i].reverse();
			}
			
			aState.v =  foldHelp(f, initAcc, arglists);
		});


PRIMITIVES['quicksort'] = new PrimProc('quicksort', 2, false, false, quicksort('quicksort'));
PRIMITIVES['sort'] = new PrimProc('sort', 2, false, false, quicksort('sort'));



PRIMITIVES['argmax'] =
    new PrimProc('argmax',
		 2,
		 false, true,
		 function(aState, f, initList) {
		 	var args = arguments
		 	check(aState, f, isFunction, 'argmax', 'procedure', 1, args);
			check(aState, initList, isPair, 'argmax', 'non-empty list', 2, args);

			var argmaxHelp = function(lst, curMaxVal, curMaxElt) {
				if ( lst.isEmpty() ) {
					return curMaxElt;
				}

				return CALL(f, [lst.first()],
					function(result) {
						check(aState, result, isReal, 'argmax',
						      'procedure that returns real numbers', 1, args);
						if (jsnums.greaterThan(result, curMaxVal)) {
							return argmaxHelp(lst.rest(), result, lst.first());
						}
						else {
							return argmaxHelp(lst.rest(), curMaxVal, curMaxElt);
						}
					});
			}
			aState.v =  CALL(f, [initList.first()],
				function(result) {
					check(aState, result, isReal, 'argmax', 'procedure that returns real numbers', 1, args);
					return argmaxHelp(initList.rest(), result, initList.first());
				});
		 });


PRIMITIVES['argmin'] =
    new PrimProc('argmin',
		 2,
		 false, true,
		 function(aState, f, initList) {
		 	var args = arguments;
		 	check(aState, f, isFunction, 'argmin', 'procedure', 1, args);
			check(aState, initList, isPair, 'argmin', 'non-empty list', 2, args);

			var argminHelp = function(lst, curMaxVal, curMaxElt) {
				if ( lst.isEmpty() ) {
					return curMaxElt;
				}

				return CALL(f, [lst.first()],
					function(result) {
						check(aState, result, isReal, 'argmin',
						      'procedure that returns real numbers', 1, args);
						if (jsnums.lessThan(result, curMaxVal)) {
							return argminHelp(lst.rest(), result, lst.first());
						}
						else {
							return argminHelp(lst.rest(), curMaxVal, curMaxElt);
						}
					});
			}
			aState.v =  CALL(f, [initList.first()],
				function(result) {
					check(aState, result, isReal, 'argmin', 'procedure that returns real numbers', 1, args);
					return argminHelp(initList.rest(), result, initList.first());
				});
		 });


PRIMITIVES['build-list'] =
    new PrimProc('build-list',
		 2,
		 false, true,
		 function(aState, num, f) {
		 	check(aState, num, isNatural, 'build-list', 'non-negative exact integer', 1, arguments);
			check(aState, f, isFunction, 'build-list', 'procedure', 2, arguments);

			var buildListHelp = function(n, acc) {
				if ( jsnums.greaterThanOrEqual(n, num) ) {
					return acc.reverse();
				}

				return CALL(f, [n],
					function (result) {
						return buildListHelp(n+1, types.cons(result, acc));
					});
			}
			aState.v =  buildListHelp(0, types.EMPTY);
		 });


/**********************
 *** Box Primitives ***
 **********************/


PRIMITIVES['box'] = new PrimProc('box', 1, false, false, types.box);

PRIMITIVES['box-immutable'] = new PrimProc('box-immutable', 1, false, false, types.boxImmutable);

PRIMITIVES['unbox'] =
    new PrimProc('unbox',
		 1,
		 false, true,
		 function(aState, box) {
		 	check(aState, box, isBox, 'unbox', 'box', 1);
			aState.v =  box.unbox();
		 });


PRIMITIVES['set-box!'] =
    new PrimProc('set-box!',
		 2,
		 false, true,
		 function(aState, box, newVal) {
		 	check(aState, box, function(x) { return isBox(x) && x.mutable; }, 'set-box!', 'mutable box', 1, arguments);
			box.set(newVal);
			aState.v =  types.VOID;
		 });



/****************************
 *** Hashtable Primitives ***
 ****************************/


PRIMITIVES['make-hash'] =
	new CasePrimitive('make-hash', 
	[new PrimProc('make-hash', 0, false, false, function() { return types.hash(types.EMPTY); }),
	 new PrimProc('make-hash',
		      1,
		      false, false,
		      function(lst) {
			  checkListOf(lst, isPair, 'make-hash', 'list of pairs', 1);
			  return types.hash(lst);
		      }) ]);

PRIMITIVES['make-hasheq'] =
	new CasePrimitive('make-hasheq',
	[new PrimProc('make-hasheq', 0, false, false, function() { return types.hashEq(types.EMPTY); }),
	 new PrimProc('make-hasheq',
		      1,
		      false, false,
		      function(lst) {
			  checkListOf(lst, isPair, 'make-hasheq', 'list of pairs', 1);
			  return types.hashEq(lst);
		      }) ]);

PRIMITIVES['hash-set!'] =
    new PrimProc('hash-set!',
		 3,
		 false, true,
		 function(aState, obj, key, val) {
		 	check(aState, obj, isHash, 'hash-set!', 'hash', 1, arguments);
			obj.hash.put(key, val);
			aState.v =  types.VOID;
		 });

PRIMITIVES['hash-ref'] =
	new CasePrimitive('hash-ref',
	[new PrimProc('hash-ref',
		      2,
		      false, false,
		      function(obj, key) {
			  check(aState, obj, isHash, 'hash-ref', 'hash', 1, arguments);

			  if ( !obj.hash.containsKey(key) ) {
			  	var msg = 'hash-ref: no value found for key: ' + types.toWrittenString(key);
			  	raise( types.incompleteExn(types.exnFailContract, msg, []) );
			  }
			  return obj.hash.get(key);
		      }),
	 new PrimProc('hash-ref',
		      3,
		      false, false,
		      function(obj, key, defaultVal) {
			  check(aState, obj, isHash, 'hash-ref', 'hash', 1, arguments);

			  if (obj.hash.containsKey(key)) {
				return obj.hash.get(key);
			  }
			  else {
				if (isFunction(defaultVal)) {
					return CALL(defaultVal, [], id);
				}
				return defaultVal;
			  }
		      }) ]);

PRIMITIVES['hash-remove!'] =
    new PrimProc('hash-remove',
		 2,
		 false, true,
		 function(aState, obj, key) {
		 	check(aState, obj, isHash, 'hash-remove!', 'hash', 1, arguments);
			obj.hash.remove(key);
			aState.v =  types.VOID;
		 });

PRIMITIVES['hash-map'] =
    new PrimProc('hash-map',
		 2,
		 false, true,
		 function(aState, ht, f) {
		 	check(aState, ht, isHash, 'hash-map', 'hash', 1, arguments);
			check(aState, f, isFunction, 'hash-map', 'procedure', 2, arguments);
			
			var keys = ht.hash.keys();
			var hashMapHelp = function(i, acc) {
				if (i >= keys.length) {
					return acc;
				}

				var val = ht.hash.get(keys[i]);
				return CALL(f, [keys[i], val],
					function(result) {
						return hashMapHelp(i+1, types.cons(result, acc));
					});
			}
			aState.v =  hashMapHelp(0, types.EMPTY);
		 });


PRIMITIVES['hash-for-each'] =
    new PrimProc('hash-for-each',
		 2,
		 false, true,
		 function(aState, ht, f) {
		 	check(aState, ht, isHash, 'hash-for-each', 'hash', 1, arguments);
			check(aState, f, isFunction, 'hash-for-each', 'procedure', 2, arguments);
		 	
		 	var keys = ht.hash.keys();
		 	var hashForEachHelp = function(i) {
		 		if (i >= keys.length) {
					return types.VOID;
				}

				var val = ht.hash.get(keys[i]);
				return CALL(f, [keys[i], val],
					function(result) {
						return hashForEachHelp(i+1);
					});
			}
			aState.v =  hashForEachHelp(0);
		 });



/*************************
 *** String Primitives ***
 *************************/


PRIMITIVES['make-string'] =
    new PrimProc('make-string',
		 2,
		 false, true,
		 function(aState, n, c) {
		 	check(aState, n, isNatural, 'make-string', 'non-negative exact integer', 1, arguments);
			check(aState, c, isChar, 'make-string', 'char', 2, arguments);

			var ret = [];
			for (var i = 0; jsnums.lessThan(i, n); i++) {
				ret.push(c.val);
			}
			aState.v =  types.string(ret);
		 });


PRIMITIVES['replicate'] =
    new PrimProc('replicate',
		 2,
		 false, true,
		 function(aState, n, str) {
		 	check(aState, n, isNatural, 'replicate', 'non-negative exact integer', 1, arguments);
			check(aState, str, isString, 'replicate', 'string', 2, arguments);

			var ret = "";
			var primStr = str.toString();
			for (var i = 0; jsnums.lessThan(i, n); i++) {
				ret += primStr;
			}
			aState.v =  types.string(ret);
		 });


PRIMITIVES['string'] =
    new PrimProc('string',
		 0,
		 true, true,
		 function(aState, chars) {
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'string', 'char', i+1, chars);});

			var ret = [];
			for (var i = 0; i < chars.length; i++) {
				ret.push(chars[i].val);
			}
			aState.v =  types.string(ret);
		 });


PRIMITIVES['string-length'] =
    new PrimProc('string-length', 1, false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string-length', 'string', 1);
			aState.v =  str.length;
		 });


PRIMITIVES['string-ref'] =
    new PrimProc('string-ref',
		 2,
		 false, true,
		 function(aState, str, num) {
		 	check(aState, str, isString, 'string-ref', 'string', 1, arguments);
			check(aState, num, isNatural, 'string-ref', 'non-negative exact integer', 2, arguments);

			var n = jsnums.toFixnum(num);
			if (n >= str.length) {
				var msg = ('string-ref: index ' + n + ' out of range ' +
					   '[0, ' + (str.length-1) + '] for string: ' +
					   types.toWrittenString(str));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			aState.v =  types['char'](str.charAt(n));
		 });


PRIMITIVES['string=?'] =
    new PrimProc('string=?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
		 	strs.unshift(str1);
		 	arrayEach(strs, function(str, i) {check(aState, str, isString, 'string=?', 'string', i+1, strs);});
		 	
			aState.v =  compare(strs, function(strA, strB) {return strA.toString() === strB.toString();});
		 });


PRIMITIVES['string-ci=?'] =
    new PrimProc('string-ci=?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);

			for(var i = 0; i < strs.length; i++) {
				check(aState, strs[i], isString, 'string-ci=?', 'string', i+1, strs);
				strs[i] = strs[i].toString().toLowerCase();
			}

			aState.v =  compare(strs, function(strA, strB) {return strA === strB;});
		 });


PRIMITIVES['string<?'] =
    new PrimProc('string<?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);
			arrayEach(strs, function(str, i) {check(aState, str, isString, 'string<?', 'string', i+1, strs);});

			aState.v =  compare(strs, function(strA, strB) {return strA.toString() < strB.toString();});
		 });


PRIMITIVES['string>?'] =
    new PrimProc('string>?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);
			arrayEach(strs, function(str, i) {check(aState, str, isString, 'string>?', 'string', i+1, strs);});

			aState.v =  compare(strs, function(strA, strB) {return strA.toString() > strB.toString();});
		 });


PRIMITIVES['string<=?'] =
    new PrimProc('string<=?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);
			arrayEach(strs, function(str, i) {check(aState, str, isString, 'string<=?', 'string', i+1, strs);});

			aState.v =  compare(strs, function(strA, strB) {return strA.toString() <= strB.toString();});
		 });


PRIMITIVES['string>=?'] =
    new PrimProc('string>=?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);
			arrayEach(strs, function(str, i) {check(aState, str, isString, 'string>=?', 'string', i+1, strs);});

			aState.v =  compare(strs, function(strA, strB) {return strA.toString() >= strB.toString();});
		 });


PRIMITIVES['string-ci<?'] =
    new PrimProc('string-ci<?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);

			for (var i = 0; i < strs.length; i++) {
				check(aState, strs[i], isString, 'string-ci<?', 'string', i+1, strs);
				strs[i] = strs[i].toString().toLowerCase();
			}

			aState.v =  compare(strs, function(strA, strB) {return strA < strB;});
		 });


PRIMITIVES['string-ci>?'] =
    new PrimProc('string-ci>?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);

			for (var i = 0; i < strs.length; i++) {
				check(aState, strs[i], isString, 'string-ci>?', 'string', i+1, strs);
				strs[i] = strs[i].toString().toLowerCase();
			}

			aState.v =  compare(strs, function(strA, strB) {return strA > strB;});
		 });


PRIMITIVES['string-ci<=?'] =
    new PrimProc('string-ci<=?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);

			for (var i = 0; i < strs.length; i++) {
				check(aState, strs[i], isString, 'string-ci<=?', 'string', i+1, strs);
				strs[i] = strs[i].toString().toLowerCase();
			}

			aState.v =  compare(strs, function(strA, strB) {return strA <= strB;});
		 });


PRIMITIVES['string-ci>=?'] =
    new PrimProc('string-ci>=?',
		 2,
		 true, true,
		 function(aState, str1, str2, strs) {
		 	strs.unshift(str2);
			strs.unshift(str1);

			for (var i = 0; i < strs.length; i++) {
				check(aState, strs[i], isString, 'string-ci>=?', 'string', i+1, strs);
				strs[i] = strs[i].toString().toLowerCase();
			}

			aState.v =  compare(strs, function(strA, strB) {return strA >= strB;});
		 });


PRIMITIVES['substring'] =
	new CasePrimitive('substring', 
	[new PrimProc('substring',
		      2,
		      false, true,
		      function(aState, str, theStart) {
			  check(aState, str, isString, 'substring', 'string', 1, arguments);
			  check(aState, theStart, isNatural, 'substring', 'non-negative exact integer', 2, arguments);
			  
			  var positionStack = 
        		state.captureCurrentContinuationMarks(aState).ref(
            		types.symbol('moby-application-position-key'));
        
       
       		  var locationList = positionStack[positionStack.length - 1];

			  var start = jsnums.toFixnum(theStart);
			  if (start > str.length) {
			   /*	var msg = ('substring: starting index ' + start + ' out of range ' +
					   '[0, ' + str.length + '] for string: ' + types.toWrittenString(str)); */
				raise( types.incompleteExn(types.exnFailContract,
											new types.Message([ new types.ColoredPart('substring', locationList.first()),
																': starting index ',
																new types.ColoredPart(start, locationList.rest().rest().first()),
																' out of range ',
																'[0, ',
																 str.length, 
																 '] for string: ',
																 new types.ColoredPart(types.toWrittenString(str), locationList.rest().first())
												]), 
											[]) );
			  }
			  else {
			  	aState.v = types.string( str.substring(jsnums.toFixnum(start)) );

			  	return;
			  }
		      }),
	 new PrimProc('substring',
		      3,
		      false, true,
		      function(aState, str, theStart, theEnd) {
			  check(aState, str, isString, 'substring', 'string', 1, arguments);
			  check(aState, theStart, isNatural, 'substring', 'non-negative exact integer', 2, arguments);
			  check(aState, theEnd, isNatural, 'substring', 'non-negative exact integer', 3, arguments);

			  var positionStack = 
        		state.captureCurrentContinuationMarks(aState).ref(
            		types.symbol('moby-application-position-key'));
        
       		  var locationList = positionStack[positionStack.length - 1];

       		  locationList

			  var start = jsnums.toFixnum(theStart);
			  var end = jsnums.toFixnum(theEnd);
			  if (start > str.length) {
			   /*	var msg = ('substring: starting index ' + start + ' out of range ' +
					   '[0, ' + str.length + '] for string: ' + types.toWrittenString(str)); */
				raise( types.incompleteExn(types.exnFailContract,
											new types.Message([ new types.ColoredPart('substring', locationList.first()),
																': starting index ',
																new types.ColoredPart(start, locationList.rest().rest().first()),
																' out of range ',
																'[0, ',
																 str.length, 
																 '] for string: ',
																 new types.ColoredPart(types.toWrittenString(str), locationList.rest().first())
												]), 
											[]) );
			  }
			  if (end < start || end > str.length) {
			   	/*var msg = ('substring: ending index ' + end + ' out of range ' + '[' + start +
					   ', ' + str.length + '] for string: ' + types.toWrittenString(str));*/ 
				raise( types.incompleteExn(types.exnFailContract,
											new types.Message([ new types.ColoredPart('substring', locationList.first()),
																': ending index ',
																new types.ColoredPart(end, locationList.rest().rest().rest().first()),
																' out of range ',
																'[0, ',
																 str.length, 
																 '] for string: ',
																 new types.ColoredPart(types.toWrittenString(str), locationList.rest().first())
												]), 
											[]) );
			  }
			  aState.v = types.string( str.substring(start, end) );
			 // return;
		      }) ]);


PRIMITIVES['string-append'] = 
    new PrimProc("string-append",
		 0,
		 true, true,
		 function(aState, args) {
		 	arrayEach(args,
				function(str, i) {
					check(aState, str, isString, 'string-append', 'string', i+1, args);
				});
			
			for (var i = 0; i < args.length; i++) {
				args[i] = args[i].toString();
			}
			aState.v =  types.string(args.join(""));
		 });


PRIMITIVES['string->list'] =
    new PrimProc('string->list',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string->list', 'string', 1);

			var lst = types.EMPTY;
			for (var i = str.length-1; i >= 0; i--) {
				lst = types.cons(types['char'](str.charAt(i)), lst);
			}
			aState.v =  lst;
		 });


PRIMITIVES['list->string'] =
    new PrimProc('list->string',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOf(lst, isChar, 'list->string', 'char', 1);

			var ret = [];
			while( !lst.isEmpty() ) {
				ret.push(lst.first().val);
				lst = lst.rest();
			}
			return types.string(ret);
		 });


PRIMITIVES['string-copy'] =
    new PrimProc('string-copy',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string-copy', 'string', 1);
			aState.v =  types.string(str.toString());
		 });



PRIMITIVES['string->symbol'] =
    new PrimProc('string->symbol',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string->symbol', 'string', 1);
			aState.v =  types.symbol(str.toString());
		 });


PRIMITIVES['symbol->string'] =
    new PrimProc('symbol->string',
		 1,
		 false, true,
		 function(aState, symb) {
		 	check(aState, symb, isSymbol, 'symbol->string', 'symbol', 1);
			aState.v =  types.string(symb.toString());
		 });


PRIMITIVES['format'] =
    new PrimProc('format', 1, true, true,
		 function(aState, formatStr, args) {
		 	check(aState, formatStr, isString, 'format', 'string', 1, [formatStr].concat(args));
			aState.v =  types.string( helpers.format(formatStr, args, 'format') );
		 });


PRIMITIVES['printf'] =
    new PrimProc('printf', 1, true, true,
		 function(state, formatStr, args) {
		 	check(aState, formatStr, isString, 'printf', 'string', 1, [formatStr].concat(args));
			var msg = helpers.format(formatStr, args, 'printf');
			state.getDisplayHook()(msg);
			state.v = types.VOID;
		 });


PRIMITIVES['string->int'] =
    new PrimProc('string->int',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, function(s) {return isString(s) && s.length == 1;},
			      'string->int', '1-letter string', 1);
			aState.v =  str.charCodeAt(0);
		 });


PRIMITIVES['int->string'] =
    new PrimProc('int->string',
		 1,
		 false, true,
		 function(aState, num) {
		 	check(aState, num, function(x) {
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
		 });


PRIMITIVES['explode'] =
    new PrimProc('explode',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'explode', 'string', 1);
			var ret = types.EMPTY;
			for (var i = str.length-1; i >= 0; i--) {
				ret = types.cons( types.string(str.charAt(i)), ret );
			}
			aState.v =  ret;
		 });

PRIMITIVES['implode'] =
    new PrimProc('implode',
		 1,
		 false, false,
		 function(lst) {
		 	checkListOf(lst, function(x) { return isString(x) && x.length == 1; },
				    'implode', 'list of 1-letter strings', 1);
			var ret = [];
			while ( !lst.isEmpty() ) {
				ret.push( lst.first().toString() );
				lst = lst.rest();
			}
			return types.string(ret);
		 });


PRIMITIVES['string-alphabetic?'] =
    new PrimProc('string-alphabetic?',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string-alphabetic?', 'string', 1);
			aState.v =  isAlphabeticString(str);
		 });


PRIMITIVES['string-ith'] =
    new PrimProc('string-ith',
		 2,
		 false, true,
		 function(aState, str, num) {
		 	check(aState, str, isString, 'string-ith', 'string', 1, arguments);
			check(aState, num, function(x) { return isNatural(x) && jsnums.lessThan(x, str.length); }, 'string-ith',
			      'exact integer in [0, length of the given string minus 1 (' + (str.length-1) + ')]', 2, arguments);
			aState.v =  types.string( str.charAt(jsnums.toFixnum(num)) );
		 });


PRIMITIVES['string-lower-case?'] =
    new PrimProc('string-lower-case?',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string-lower-case?', 'string', 1);
			var primStr = str.toString();
			aState.v =  isAlphabeticString(str) && primStr.toLowerCase() === primStr;
		 });


PRIMITIVES['string-numeric?'] =
    new PrimProc('string-numeric?',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string-numeric?', 'string', 1);
			aState.v =  isNumericString(str);
		 });


PRIMITIVES['string-upper-case?'] =
    new PrimProc('string-upper-case?',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string-upper-case?', 'string', 1);
			var primStr = str.toString();
			aState.v =  isAlphabeticString(str) && primStr.toUpperCase() === primStr;
		 });


PRIMITIVES['string-whitespace?'] =
    new PrimProc('string-whitespace?',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string-whitespace?', 'string', 1);
			aState.v =  isWhitespaceString(str);
		 });


PRIMITIVES['build-string'] =
    new PrimProc('build-string',
		 2,
		 false, true,
		 function(aState, num, f) {
		 	check(aState, num, isNatural, 'build-string', 'non-negative exact integer', 1, arguments);
			check(aState, f, isFunction, 'build-string', 'procedure', 2, arguments);

			var buildStringHelp = function(n, acc) {
				if ( jsnums.greaterThanOrEqual(n, num) ) {
					return types.string(acc);
				}

				return CALL(f, [n],
					function(res) {
						check(aState, res, isChar, 'build-string',
						      'procedure that returns a char', 2);
						return buildStringHelp(n+1, acc.push(res.val));
					});
			}
			aState.v =  buildStringHelp(0, []);
		 });


PRIMITIVES['string->immutable-string'] =
    new PrimProc('string->immutable-string',
		 1,
		 false, true,
		 function(aState, str) {
		 	check(aState, str, isString, 'string->immutable-string', 'string', 1);
			aState.v =  str.toString();
		 });


PRIMITIVES['string-set!'] =
    new PrimProc('string-set!',
		 3,
		 false, true,
		 function(aState, str, k, c) {
		 	check(aState, str, function(x) { return isString(x) && typeof x != 'string'; },
			      'string-set!', 'mutable string', 1, arguments);
			check(aState, k, isNatural, 'string-set!', 'non-negative exact integer', 2, arguments);
			check(aState, c, isChar, 'string-set!', 'char', 3, arguments);

			if ( jsnums.greaterThanOrEqual(k, str.length) ) {
				var msg = ('string-set!: index ' + n + ' out of range ' +
					   '[0, ' + (str.length-1) + '] for string: ' +
					   types.toWrittenString(str));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			str.set(jsnums.toFixnum(k), c.val);
			aState.v =  types.VOID;
		 });


PRIMITIVES['string-fill!'] =
    new PrimProc('string-fill!',
		 2,
		 false, true,
		 function(aState, str, c) {
		 	check(aState, str, function(x) { return isString(x) && typeof x != 'string'; },
			      'string-fill!', 'mutable string', 1, arguments);
			check(aState, c, isChar, 'string-fill!', 'char', 2, arguments);

			for (var i = 0; i < str.length; i++) {
				str.set(i, c.val);
			}
			aState.v =  types.VOID;
		 });



/******************************
 *** Byte String Primitives ***
 ******************************/


PRIMITIVES['make-bytes'] =
	new CasePrimitive('make-bytes',
	[new PrimProc('make-bytes',
		      1,
		      false, false,
		      function(k) {
			  check(aState, k, isNatural, 'make-bytes', 'non-negative exact integer', 1);
			  
			  var ret = [];
			  for (var i = 0; i < jsnums.toFixnum(k); i++) {
			  	ret.push(0);
			  }
			  return types.bytes(ret, true);
		      }),
	 new PrimProc('make-bytes',
		      2,
		      false, false,
		      function(k, b) {
			  check(aState, k, isNatural, 'make-bytes', 'non-negative exact integer', 1, arguments);
			  check(aState, b, isByte, 'make-bytes', 'byte', 2, arguments);

			  var ret = [];
			  for (var i = 0; i < jsnums.toFixnum(k); i++) {
			  	ret.push(b);
			  }
			  return types.bytes(ret, true);
		      }) ]);


PRIMITIVES['bytes'] =
    new PrimProc('bytes',
		 0,
		 true, true,
		 function(aState, args) {
		 	arrayEach(args, function(b, i) {check(aState, b, isByte, 'bytes', 'byte', i+1, args);});
			aState.v =  types.bytes(args, true);
		 });


PRIMITIVES['bytes->immutable-bytes'] =
    new PrimProc('bytes->immutable-bytes',
		 1,
		 false, true,
		 function(aState, bstr) {
		 	check(aState, bstr, isByteString, 'bytes->immutable-bytes', 'byte string', 1);
			if ( bstr.mutable ) {
				aState.v =  bstr.copy(false);
				return;
			}
			else {
				aState.v =  bstr;
			}
		 });


PRIMITIVES['bytes-length'] =
    new PrimProc('bytes-length',
		 1,
		 false, true,
		 function(aState, bstr) {
		 	check(aState, bstr, isByteString, 'bytes-length', 'byte string', 1);
			aState.v =  bstr.length();
		 });


PRIMITIVES['bytes-ref'] =
    new PrimProc('bytes-ref',
		 2,
		 false, true,
		 function(aState, bstr, num) {
		 	check(aState, bstr, isByteString, 'bytes-ref', 'byte string', 1, arguments);
			check(aState, num, isNatural, 'bytes-ref', 'non-negative exact integer', 2, arguments);

			var n = jsnums.toFixnum(num);
			if ( n >= bstr.length() ) {
				var msg = ('bytes-ref: index ' + n + ' out of range ' +
					   '[0, ' + (bstr.length-1) + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			aState.v =  bstr.get(n);
		 });


PRIMITIVES['bytes-set!'] =
    new PrimProc('bytes-set!',
		 3,
		 false, true,
		 function(aState, bstr, num, b) {
		 	check(aState, bstr, function(x) { return isByteString(x) && x.mutable; },
			      'bytes-set!', 'mutable byte string', 1, arguments);
			check(aState, num, isNatural, 'bytes-set!', 'non-negative exact integer', 2, arguments);
			check(aState, b, isByte, 'bytes-set!', 'byte', 3, arguments);

			var n = jsnums.toFixnum(num);
			if ( n >= bstr.length() ) {
				var msg = ('bytes-set!: index ' + n + ' out of range ' +
					   '[0, ' + (bstr.length-1) + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			bstr.set(n, b);
			aState.v =  types.VOID;
		 });


PRIMITIVES['subbytes'] =
	new CasePrimitive('subbytes',
	[new PrimProc('subbytes',
		      2,
		      false, true,
		      function(aState, bstr, theStart) {
		          	check(aState, bstr, isByteString, 'subbytes', 'bytes string', 1, arguments);
			  		check(aState, theStart, isNatural, 'subbytes', 'non-negative exact integer', 2, arguments);
			  
			  var start = jsnums.toFixnum(theStart);
			  if (start > bstr.length()) {
			   	var msg = ('subbytes: starting index ' + start + ' out of range ' +
					   '[0, ' + bstr.length + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			  }
			  else {
			  	aState.v =  bstr.subbytes(jsnums.toFixnum(start));
			  }
		      }),
	 new PrimProc('subbytes',
		      3,
		      false, true,
		      function(aState, bstr, theStart, theEnd) {
		          check(aState, bstr, isByteString, 'subbytes', 'byte string', 1, arguments);
			  check(aState, theStart, isNatural, 'subbytes', 'non-negative exact integer', 2, arguments);
			  check(aState, theEnd, isNatural, 'subbytes', 'non-negative exact integer', 3, arguments);

			  var start = jsnums.toFixnum(theStart);
			  var end = jsnums.toFixnum(theEnd);
			  if (start > bstr.length()) {
			   	var msg = ('subbytes: starting index ' + start + ' out of range ' +
					   '[0, ' + bstr.length() + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			  }
			  if (end < start || end > bstr.length()) {
			   	var msg = ('subbytes: ending index ' + end + ' out of range ' + '[' + start +
					   ', ' + bstr.length() + '] for byte-string: ' +
					   types.toWrittenString(bstr));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			  }
			   else {
			  	aState.v =  bstr.subbytes(start, end);
			   }
		      }) ]);


PRIMITIVES['bytes-copy'] =
    new PrimProc('bytes-copy',
		 1,
		 false, true,
		 function(aState, bstr) {
		 	check(aState, bstr, isByteString, 'bytes-copy', 'byte string', 1);
			aState.v =  bstr.copy(true);
		 });


PRIMITIVES['bytes-fill!'] =
    new PrimProc('bytes-fill!',
		 2,
		 false, true,
		 function(aState, bstr, b) {
		 	check(aState, bstr, function(x) { return isByteString(x) && x.mutable; },
			      'bytes-fill!', 'mutable byte string', 1, arguments);
			check(aState, b, isByte, 'bytes-fill!', 'byte', 2, arguments);
			
			for (var i = 0; i < bstr.length(); i++) {
				bstr.set(i, b);
			}
			aState.v =  types.VOID;
		 });


PRIMITIVES['bytes-append'] =
    new PrimProc('bytes-append',
		 0,
		 true, true,
		 function(aState, args) {
		  	arrayEach(args, function(x, i) { check(aState, x, isByteString, 'bytes-append', 'byte string', i+1, args); });

			var ret = [];
			for (var i = 0; i < args.length; i++) {
				ret = ret.concat(args[i].bytes);
			}
			aState.v =  types.bytes(ret, true);
		 });


PRIMITIVES['bytes->list'] =
    new PrimProc('bytes->list',
		 1,
		 false, true,
		 function(aState, bstr) {
		 	check(aState, bstr, isByteString, 'bytes->list', 'byte string', 1);

			var ret = types.EMPTY;
			for (var i = bstr.length()-1; i >= 0; i--) {
				ret = types.cons(bstr.get(i), ret);
			}
			aState.v =  ret;
		 });


PRIMITIVES['list->bytes'] =
    new PrimProc('list->bytes',
		 1,
		 false, true,
		 function(aState, lst) {
		 	checkListOf(lst, isByte, 'list->bytes', 'byte', 1);

			var ret = [];
			while ( !lst.isEmpty() ) {
				ret.push(lst.first());
				lst = lst.rest();
			}
			aState.v =  types.bytes(ret, true);
		 });


PRIMITIVES['bytes=?'] =
    new PrimProc('bytes=?',
		 2,
		 true, true,
		 function(aState, bstr1, bstr2, bstrs) {
		 	bstrs.unshift(bstr2);
			bstrs.unshift(bstr1);
			arrayEach(bstrs, function(x, i) { check(aState, x, isByteString, 'bytes=?', 'byte string', i+1, bstrs); });

			aState.v =  compare(bstrs, function(bstrA, bstrB) { return bstrA.toString() === bstrB.toString(); });
		 });


PRIMITIVES['bytes<?'] =
    new PrimProc('bytes<?',
		 2,
		 true, true,
		 function(aState, bstr1, bstr2, bstrs) {
		 	bstrs.unshift(bstr2);
			bstrs.unshift(bstr1);
			arrayEach(bstrs, function(x, i) { check(aState, x, isByteString, 'bytes<?', 'byte string', i+1, bstrs); });

			aState.v =  compare(bstrs, function(bstrA, bstrB) { return bstrA.toString() < bstrB.toString(); });
		 });


PRIMITIVES['bytes>?'] =
    new PrimProc('bytes>?',
		 2,
		 true, true,
		 function(aState, bstr1, bstr2, bstrs) {
		 	bstrs.unshift(bstr2);
			bstrs.unshift(bstr1);
			arrayEach(bstrs, function(x, i) { check(aState, x, isByteString, 'bytes>?', 'byte string', i+1, bstrs); });

			aState.v =  compare(bstrs, function(bstrA, bstrB) { return bstrA.toString() > bstrB.toString(); });
		 });




/*************************
 *** Vector Primitives ***
 *************************/


PRIMITIVES['make-vector'] =
    new PrimProc('make-vector',
		 2,
		 false, true,
		 function(aState, size, content) {
		 	check(aState, size, isNatural, 'make-vector', 'non-negative exact integer', 1, arguments);
			var s = jsnums.toFixnum(size);
			var ret = [];
			for (var i = 0; i < s; i++) {
				ret.push(content);
			}
			aState.v =  types.vector(ret);
		 });


PRIMITIVES['vector'] =
    new PrimProc('vector',
		 0,
		 true, false,
		 function(args) {
		 	return types.vector(args);
		 });


PRIMITIVES['vector-length'] =
    new PrimProc('vector-length',
		 1,
		 false, true,
		 function(aState, vec) {
		 	check(aState, vec, isVector, 'vector-length', 'vector', 1);
			aState.v =  vec.length();
		 });


PRIMITIVES['vector-ref'] =
    new PrimProc('vector-ref',
		 2,
		 false, true,
		 function(aState, vec, index) {
		 	check(aState, vec, isVector, 'vector-ref', 'vector', 1, arguments);
			check(aState, index, isNatural, 'vector-ref', 'non-negative exact integer', 2, arguments);

			var i = jsnums.toFixnum(index);
			if (i >= vec.length()) {
				var msg = ('vector-ref: index ' + i + ' out of range ' +
					   '[0, ' + (vec.length()-1) + '] for vector: ' +
					   types.toWrittenString(vec));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			aState.v =  vec.ref(i);
		 });


PRIMITIVES['vector-set!'] =
    new PrimProc('vector-set!',
		 3,
		 false, true,
		 function(aState, vec, index, val) {
		 	check(aState, vec, isVector, 'vector-set!', 'vector', 1, arguments);
			check(aState, index, isNatural, 'vector-set!', 'non-negative exact integer', 2, arguments);

			var i = jsnums.toFixnum(index);
			if (i >= vec.length()) {
				var msg = ('vector-set!: index ' + i + ' out of range ' +
					   '[0, ' + (vec.length()-1) + '] for vector: ' +
					   types.toWrittenString(vec));
				raise( types.incompleteExn(types.exnFailContract, msg, []) );
			}
			vec.set(i, val);
			aState.v =  types.VOID;
		 });


PRIMITIVES['vector->list'] =
    new PrimProc('vector->list',
		 1,
		 false, true,
		 function(aState, vec) {
		 	check(aState, vec, isVector, 'vector->list', 'vector', 1);
			aState.v =  vec.toList();
		 });


PRIMITIVES['list->vector'] =
    new PrimProc('list->vector',
		 1,
		 false, false,
		 function(lst) {
		 	checkList(lst, 'list->vector', 1);
			return types.vector( helpers.schemeListToArray(lst) );
		 });


PRIMITIVES['build-vector'] =
    new PrimProc('build-vector',
		 2,
		 false, true,
		 function(aState, num, f) {
		 	check(aState, num, isNatural, 'build-vector', 'non-negative exact integer', 1, arguments);
			check(aState, f, isFunction, 'build-vector', 'procedure', 2, arguments);

			var buildVectorHelp = function(n, acc) {
				if ( jsnums.greaterThanOrEqual(n, num) ) {
					return types.vector(acc);
				}

				return CALL(f, [n],
					function (result) {
						return buildVectorHelp(n+1, acc.push(result));
					});
			}
			aState.v =  buildVectorHelp(0, []);
		 });



/***********************
 *** Char Primitives ***
 ***********************/


PRIMITIVES['char=?'] =
    new PrimProc('char=?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char=?', 'char', i+1, chars);});

			aState.v =  compare(chars, function(c1, c2) {return c1.val === c2.val;});
		 });


PRIMITIVES['char<?'] =
    new PrimProc('char<?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char<?', 'char', i+1, chars);});

			aState.v =  compare(chars, function(c1, c2) {return c1.val < c2.val;});
		 });


PRIMITIVES['char>?'] =
    new PrimProc('char>?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char>?', 'char', i+1, chars);});

			aState.v =  compare(chars, function(c1, c2) {return c1.val > c2.val;});
		 });


PRIMITIVES['char<=?'] =
    new PrimProc('char<=?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char<=?', 'char', i+1, chars);});

			aState.v =  compare(chars, function(c1, c2) {return c1.val <= c2.val;});
		 });


PRIMITIVES['char>=?'] =
    new PrimProc('char>=?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char>=?', 'char', i+1, chars);});

			aState.v =  compare(chars, function(c1, c2) {return c1.val >= c2.val;});
		 });


PRIMITIVES['char-ci=?'] =
    new PrimProc('char-ci=?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char-ci=?', 'char', i+1, chars);});

			aState.v =  compare(chars,
				function(c1, c2) {
					return c1.val.toLowerCase() === c2.val.toLowerCase();
				});
		 });


PRIMITIVES['char-ci<?'] =
    new PrimProc('char-ci<?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char-ci<?', 'char', i+1, chars);});

			aState.v =  compare(chars,
				function(c1, c2) {
					return c1.val.toLowerCase() < c2.val.toLowerCase();
				});
		 });


PRIMITIVES['char-ci>?'] =
    new PrimProc('char-ci>?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char-ci>?', 'char', i+1, chars);});

			aState.v =  compare(chars,
				function(c1, c2) {
					return c1.val.toLowerCase() > c2.val.toLowerCase();
				});
		 });


PRIMITIVES['char-ci<=?'] =
    new PrimProc('char-ci<=?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char-ci<=?', 'char', i+1, chars);});

			aState.v =  compare(chars,
				function(c1, c2) {
					return c1.val.toLowerCase() <= c2.val.toLowerCase();
				});
		 });


PRIMITIVES['char-ci>=?'] =
    new PrimProc('char-ci>=?',
		 2,
		 true, true,
		 function(aState, char1, char2, chars) {
		 	chars.unshift(char2);
			chars.unshift(char1);
			arrayEach(chars, function(c, i) {check(aState, c, isChar, 'char-ci>=?', 'char', i+1, chars);});

			aState.v =  compare(chars,
				function(c1, c2) {
					return c1.val.toLowerCase() >= c2.val.toLowerCase();
				});
		 });


PRIMITIVES['char-alphabetic?'] =
    new PrimProc('char-alphabetic?',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char-alphabetic?', 'char', 1);
			aState.v =  isAlphabeticString(c.val);
		 });


PRIMITIVES['char-numeric?'] =
    new PrimProc('char-numeric?',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char-numeric?', 'char', 1);
			aState.v =  (c.val >= '0' && c.val <= '9');
		 });


PRIMITIVES['char-whitespace?'] =
    new PrimProc('char-whitespace?',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char-whitespace?', 'char', 1);
			aState.v =  isWhitespaceString(c.val);
		 });


PRIMITIVES['char-upper-case?'] =
    new PrimProc('char-upper-case?',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char-upper-case?', 'char', 1);
			aState.v =  (isAlphabeticString(c.val) && c.val.toUpperCase() === c.val);
		 });


PRIMITIVES['char-lower-case?'] =
    new PrimProc('char-lower-case?',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char-lower-case?', 'char', 1);
			aState.v =  (isAlphabeticString(c.val) && c.val.toLowerCase() === c.val);
		 });


PRIMITIVES['char->integer'] =
    new PrimProc('char->integer',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char->integer', 'char', 1);
			aState.v =  c.val.charCodeAt(0);
		 });


PRIMITIVES['integer->char'] =
    new PrimProc('integer->char',
		 1,
		 false, true,
		 function(aState, num) {
		 	check(aState, num, function(x) {
					if ( !isInteger(x) ) {
						return false;
					}
					var n = jsnums.toFixnum(x);
					return ((n >= 0 && n < 55296) ||
						(n > 57343 && n <= 1114111));
				},
				'integer->char',
				'exact integer in [0,#x10FFFF], not in [#xD800,#xDFFF]',
				1);

			aState.v =  types['char']( String.fromCharCode(jsnums.toFixnum(num)) );
		 });


PRIMITIVES['char-upcase'] =
    new PrimProc('char-upcase',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char-upcase', 'char', 1);
			aState.v =  types['char']( c.val.toUpperCase() );
		 });


PRIMITIVES['char-downcase'] =
    new PrimProc('char-downcase',
		 1,
		 false, true,
		 function(aState, c) {
		 	check(aState, c, isChar, 'char-downcase', 'char', 1);
			aState.v =  types['char']( c.val.toLowerCase() );
		 });



/***********************
 *** Posn Primitives ***
 ***********************/


PRIMITIVES['make-posn'] =
    new PrimProc('make-posn',
		 2,
		 false, false,
		 function(x, y) {
		 	return types.posn(x, y);
		 });


PRIMITIVES['posn-x'] =
    new PrimProc('posn-x',
		 1,
		 false, true,
		 function(aState, p) {
		 	check(aState, p, types.isPosn, 'posn-x', 'posn', 1);
			aState.v =  types.posnX(p);
		 });


PRIMITIVES['posn-y'] =
    new PrimProc('posn-y',
		 1,
		 false, true,
		 function(aState, p) {
		 	check(aState, p, types.isPosn, 'posn-y', 'posn', 1);
			aState.v =  types.posnY(p);
		 });


PRIMITIVES['key=?'] =
    new PrimProc('key=?',
		 2,
		 false, false,
		 function(key1, key2) {
		     if (types.isChar(key1)) {
			 key1 = key1.getValue();
		     }
		     if (types.isChar(key2)) {
			 key2 = key2.getValue();
		     }
		     return (key1.toString().toLowerCase() === key2.toString().toLowerCase());
		 });



/************************
 *** Image Primitives ***
 ************************/



PRIMITIVES['image?'] = new PrimProc('image?', 1, false, false, isImage);

PRIMITIVES['image=?'] =
    new PrimProc('image=?',
		 2,
		 false, true,
		 function(aState, img1, img2) {
		 	check(aState, img1, isImage, 'image=?', 'image', 1);
			check(aState, img2, isImage, 'image=?', 'image', 2);
			aState.v =  isEqual(img1, img2);
		 });


PRIMITIVES['make-color'] =
        new CasePrimitive('make-color',
                          [new PrimProc('make-color',
		                        3,
		                        false, false,
		                        function(r, g, b) {
		 	                    check(aState, r, isByte, 'make-color', 'number between 0 and 255', 1, arguments);
		 	                    check(aState, g, isByte, 'make-color', 'number between 0 and 255', 2, arguments);
		 	                    check(aState, b, isByte, 'make-color', 'number between 0 and 255', 3, arguments);
                                            
			                    return types.color(jsnums.toFixnum(r),
					                       jsnums.toFixnum(g),
					                       jsnums.toFixnum(b));
		                        }),
                           new PrimProc('make-color',
		                        4,
		                        false, false,
		                        function(r, g, b, a) {
		 	                    check(aState, r, isByte, 'make-color', 'number between 0 and 255', 1, arguments);
		 	                    check(aState, g, isByte, 'make-color', 'number between 0 and 255', 2, arguments);
		 	                    check(aState, b, isByte, 'make-color', 'number between 0 and 255', 3, arguments);
		 	                    check(aState, a, isByte, 'make-color', 'number between 0 and 255', 4, arguments);
                                            
			                    return types.color(jsnums.toFixnum(r),
					                       jsnums.toFixnum(g),
					                       jsnums.toFixnum(b),
					                       jsnums.toFixnum(a));
		                        })
                          ]);

PRIMITIVES['color-red'] =
    new PrimProc('color-red',
		 1,
		 false, true,
		 function(aState, col) {
		 	check(aState, col, types.isColor, 'color-red', 'color', 1);
			aState.v =  types.colorRed(col);
		 });

PRIMITIVES['color-green'] =
    new PrimProc('color-green',
		 1,
		 false, true,
		 function(aState, col) {
		 	check(aState, col, types.isColor, 'color-green', 'color', 1);
			aState.v =  types.colorGreen(col);
		 });

PRIMITIVES['color-blue'] =
    new PrimProc('color-blue',
		 1,
		 false, true,
		 function(aState, col) {
		 	check(aState, col, types.isColor, 'color-blue', 'color', 1);
			aState.v =  types.colorBlue(col);
		 });

PRIMITIVES['color-alpha'] =
    new PrimProc('color-alpha',
		 1,
		 false, true,
		 function(aState, col) {
		 	check(aState, col, types.isColor, 'color-alpha', 'color', 1);
			aState.v =  types.colorAlpha(col);
		 });


PRIMITIVES['empty-scene'] =
    new PrimProc('empty-scene',
		 2,
		 false, true,
		 function(aState, width, height) {
		 	check(aState, width, isNonNegativeReal, 'empty-scene', 'non-negative number', 1, arguments);
			check(aState, height, isNonNegativeReal, 'empty-scene', 'non-negative number', 2, arguments);
		     aState.v =  world.Kernel.sceneImage(jsnums.toFixnum(width), jsnums.toFixnum(height), [], true);
		 });


PRIMITIVES['place-image'] =
    new PrimProc('place-image',
		 4,
		 false, true,
		 function(aState, picture, x, y, background) {
			check(aState, picture, isImage, "place-image", "image", 1, arguments);
			check(aState, x, isReal, "place-image", "real", 2, arguments);
			check(aState, y, isReal, "place-image", "real", 3, arguments);
			check(aState, background, function(x) { return isScene(x) || isImage(x) },
			      "place-image", "image", 4, arguments);
			if (isScene(background)) {
			    aState.v =  background.add(picture, jsnums.toFixnum(x), jsnums.toFixnum(y));
			    return;
			} else {
			    var newScene = world.Kernel.sceneImage(background.getWidth(),
								   background.getHeight(),
								   [], 
								   false);
			    newScene = newScene.add(background.updatePinhole(0, 0), 0, 0);
			    newScene = newScene.add(picture, jsnums.toFixnum(x), jsnums.toFixnum(y));
			    aState.v =  newScene;
			}
		 });


PRIMITIVES['place-image/align'] =
new PrimProc('place-image/align',
			 6,
			 false, true,
			 function(aState, img, x, y, placeX, placeY, background) {
			 check(aState, img,		isImage,	"place-image/align", "image",	1, arguments);
			 check(aState, x,		isReal,		"place-image/align", "real",	2, arguments);
			 check(aState, y,		isReal,		"place-image/align", "real",	3, arguments);
			 check(aState, placeX,	isPlaceX,	"place-image/align", "x-place", 4, arguments);
			 check(aState, placeY,	isPlaceY,	"place-image/align", "y-place", 5, arguments);
			 check(aState, background, function(x) { return isScene(x) || isImage(x) },
										"place-image/align", "image",	6, arguments);
			 
			 // calculate x and y based on placeX and placeY
			 if		 (placeX == "left"  ) x = x + img.pinholeX;
			 else if (placeX == "right" ) x = x - img.pinholeX;
			 if		 (placeY == "top"   ) y = y + img.pinholeY;
			 else if (placeY == "bottom") y = y - img.pinholeY;

			 if (isScene(background)) {
			 aState.v =  background.add(img, jsnums.toFixnum(x), jsnums.toFixnum(y));
			 return;
			 } else {
			 var newScene = world.Kernel.sceneImage(background.getWidth(),
													background.getHeight(),
													[], 
													false);
			 newScene = newScene.add(background.updatePinhole(0, 0), 0, 0);
			 newScene = newScene.add(img, jsnums.toFixnum(x), jsnums.toFixnum(y));
			 aState.v =  newScene;
			 }
			 });


PRIMITIVES['scene+line'] =
new PrimProc('scene+line',
			 6,
			 false, true,
			 function(aState, img, x1, y1, x2, y2, c) {
			 check(aState, img,		isImage,	"scene+line", "image",				1, arguments);
			 check(aState, x1,		isReal,		"scene+line", "finite real number", 2, arguments);
			 check(aState, y1,		isReal,		"scene+line", "finite real number", 3, arguments);
			 check(aState, x2,		isReal,		"scene+line", "finite real number", 4, arguments);
			 check(aState, y2,		isReal,		"scene+line", "finite real number", 5, arguments);
			 check(aState, c,		isColor,	"scene+line", "color",				6, arguments);
			 if (colorDb.get(c)) {
			 c = colorDb.get(c);
			 }
			 // make a scene containing the image
		     newScene = world.Kernel.sceneImage(jsnums.toFixnum(img.getWidth()), 
												jsnums.toFixnum(img.getHeight()), 
												[],
												true);
			 newScene = newScene.add(img.updatePinhole(0, 0), 0, 0);
			 // make an image containing the line
			 line = world.Kernel.lineImage(jsnums.toFixnum(x2-x1),
										   jsnums.toFixnum(y2-y1),
										   c,
										   false);
			 // add the line to scene, offset by the original amount
			 aState.v =  newScene.add(line, jsnums.toFixnum(x1), jsnums.toFixnum(y1));
			 });

PRIMITIVES['put-pinhole'] =
    new PrimProc('put-pinhole',
		 3,
		 false, true,
		 function(aState, img, x, y) {
			check(aState, img, isImage, "put-pinhole", "image", 1, arguments);
			check(aState, x, isReal, "put-pinhole", "real", 2, arguments);
			check(aState, y, isReal, "put-pinhole", "real", 3, arguments);
			aState.v =  img.updatePinhole(jsnums.toFixnum(x), jsnums.toFixnum(y));
    		 });


PRIMITIVES['circle'] =
    new PrimProc('circle',
		 3,
		 false, true,
		 function(aState, aRadius, aStyle, aColor) {
			check(aState, aRadius, isNonNegativeReal, "circle", "non-negative number", 1, arguments);
			check(aState, aStyle, isMode, "circle", "style", 2, arguments);
			check(aState, aColor, isColor, "circle", "color", 3, arguments);


			if (colorDb.get(aColor)) {
				aColor = colorDb.get(aColor);
			}
		     aState.v =  world.Kernel.circleImage(jsnums.toFixnum(aRadius), aStyle.toString(), aColor);
		 });


PRIMITIVES['star'] =
    new CasePrimitive(
	'star',
	// implementation to match htdp/image
	[new PrimProc('star',
		      5,
		      false, true,		      
		      function(aState, n, outer, inner, m, c) {
			  check(aState, n, isSideCount, "star", 
				"positive integer greater than or equal to 3", 
				1, arguments);
			  check(aState, outer, isNonNegativeReal, "star", 
				"non-negative number", 
				2, arguments);
			  check(aState, inner, 
				isNonNegativeReal, "star",
				"non-negative number", 3, arguments);
			  check(aState, m, isMode, "star", "style", 4, arguments);
			  check(aState, c, isColor, "star", "color", 5, arguments);
			  if (colorDb.get(c)) {
			      c = colorDb.get(c);
			  }
			  aState.v =  world.Kernel.starImage(jsnums.toFixnum(n),
							jsnums.toFixnum(outer),
							jsnums.toFixnum(inner),
							m.toString(),
							c);
		      }),
	 // implementation to match 2htdp/image
	 new PrimProc('star', 
		      3,
		      false, true,
		      function(aState, sideLength, mode, color) {
			  check(aState, sideLength, isNonNegativeReal,
				"star", "non-negative number", 1, arguments);
			  check(aState, mode, isMode, "star", "style", 2, arguments);
			  check(aState, color, isColor, "star", "color", 3, arguments);
			  if (colorDb.get(color)) {
			      color = colorDb.get(color);
			  }
			  aState.v =  world.Kernel.polygonImage(jsnums.toFixnum(sideLength), 
							   jsnums.toFixnum(5), 
							   jsnums.toFixnum(2), 
							   mode.toString(), 
							   color);
		      })]);



PRIMITIVES['radial-star'] =
new PrimProc('radial-star',
			 5,
			 false, true,
			 function(aState, aPoints, anOuter, anInner, aStyle, aColor) {
			 check(aState, aPoints, function(x) { return isNatural(x) && jsnums.greaterThanOrEqual(x, 2); },
									"radial-star", "positive integer greater than or equal to 2", 1, arguments);
			 check(aState, anOuter, function(x) { return isReal(x) && jsnums.greaterThan(x, 0); },
									"radial-star", "positive number", 2, arguments);
			 check(aState, anInner, function(x) { return isReal(x) && jsnums.greaterThan(x, 0); },
									"radial-star", "positive number", 2, arguments);
			 check(aState, aStyle, isMode, "radial-star", "style", 4, arguments);
			 check(aState, aColor, isColor, "radial-star", "color", 5, arguments);
			 
			 if (colorDb.get(aColor)) {
			 aColor = colorDb.get(aColor);
			 }
			 aState.v =  world.Kernel.starImage(jsnums.toFixnum(aPoints),
										   jsnums.toFixnum(anOuter),
										   jsnums.toFixnum(anInner),
										   aStyle.toString(),
										   aColor);
			 });


PRIMITIVES['nw:rectangle'] =
    new PrimProc('nw:rectangle',
		 4,
		 false, true,
		 function(aState, w, h, s, c) {
			check(aState, w, isNonNegativeReal, "nw:rectangle", "non-negative number", 1, arguments);
			check(aState, h, isNonNegativeReal, "nw:rectangle", "non-negative number", 2, arguments);
			check(aState, s, isMode, "nw:rectangle", "style", 3, arguments);
			check(aState, c, isColor, "nw:rectangle", "color", 4, arguments);

			if (colorDb.get(c)) {
				c = colorDb.get(c);
			}
			var aRect = world.Kernel.rectangleImage(jsnums.toFixnum(w),
								jsnums.toFixnum(h),
								s.toString(), c);
			aState.v =  aRect.updatePinhole(0, 0);
		 });


PRIMITIVES['rectangle'] =
    new PrimProc('rectangle',
		 4,
		 false, true,
		 function(aState, w, h, s, c) {
			check(aState, w, isNonNegativeReal, "rectangle", "non-negative number", 1, arguments);
			check(aState, h, isNonNegativeReal, "rectangle", "non-negative number", 2, arguments);
			check(aState, s, isMode, "rectangle", "style", 3, arguments);
			check(aState, c, isColor, "rectangle", "color", 4, arguments);

			if (colorDb.get(c)) {
				c = colorDb.get(c);
			}
			aState.v =  world.Kernel.rectangleImage(jsnums.toFixnum(w),
							   jsnums.toFixnum(h),
							   s.toString(), c);
		 });

PRIMITIVES['regular-polygon'] =
new PrimProc('regular-polygon',
			 4,
			 false, true,
			 function(aState, length, count, s, c) {
			 check(aState, length,	isNonNegativeReal,	"regular-polygon", "non-negative number", 1, arguments);
			 check(aState, count,	isSideCount,		"regular-polygon", "positive integer greater than or equal to 3", 2, arguments);
			 check(aState, s,		isMode, "regular-polygon", "style", 3, arguments);
			 check(aState, c,		isColor, "regular-polygon", "color", 4, arguments);
			 
			 if (colorDb.get(c)) {
			 c = colorDb.get(c);
			 }
			 aState.v =  world.Kernel.polygonImage(jsnums.toFixnum(length), 
											  jsnums.toFixnum(count), 
											  jsnums.toFixnum(1), 
											  s.toString(), 
											  c);
			 });

PRIMITIVES['star-polygon'] =
new PrimProc('star-polygon',
			 5,
			 false, true,
			 function(aState, length, count, step, s, c) {
			 check(aState, length,	isNonNegativeReal,	"star-polygon", "non-negative number", 1, arguments);
			 check(aState, count,	isSideCount,		"star-polygon", "positive integer greater than or equal to 3", 2, arguments);
			 check(aState, step,	isStepCount,		"star-polygon", "positive integer greater than or equal to 1", 3, arguments);
			 check(aState, s,		isMode,				"star-polygon", "style", 4, arguments);
			 check(aState, c,		isColor,			"star-polygon", "color", 5, arguments);
			 
			 if (colorDb.get(c)) {
				c = colorDb.get(c);
			 }
			 aState.v =  world.Kernel.polygonImage(jsnums.toFixnum(length), 
											  jsnums.toFixnum(count), 
											  jsnums.toFixnum(step), 
											  s.toString(), 
											  c);
			 });

PRIMITIVES['rhombus'] =
new PrimProc('rhombus',
			 4,
			 false, true,
			 function(aState, l, a, s, c) {
			 check(aState, l, isNonNegativeReal, "rhombus", "non-negative number", 1, arguments);
			 check(aState, a, isNonNegativeReal, "rhombus", "non-negative number", 2, arguments);
			 check(aState, s, isMode, "rhombus", "style", 3, arguments);
			 check(aState, c, isColor, "rhombus", "color", 4, arguments);
			 
			 if (colorDb.get(c)) {
			 c = colorDb.get(c);
			 }
			 aState.v =  world.Kernel.rhombusImage(jsnums.toFixnum(l), jsnums.toFixnum(a), s.toString(), c);
			 });

PRIMITIVES['square'] =
new PrimProc('square',
			 3,
			 false, true,
			 function(aState, l, s, c) {
			 check(aState, l, isNonNegativeReal, "square", "non-negative number", 1, arguments);
			 check(aState, s, isMode, "square", "style", 2, arguments);
			 check(aState, c, isColor, "square", "color", 3, arguments);
			 
			 if (colorDb.get(c)) {
			 c = colorDb.get(c);
			 }
			 aState.v =  world.Kernel.squareImage(jsnums.toFixnum(l), s.toString(), c);
			 });

PRIMITIVES['triangle'] =
    new PrimProc('triangle',
		 3,
		 false, true,
		 function(aState, s, m, c) {
			check(aState, s, isNonNegativeReal, "triangle", "non-negative number", 1, arguments);
			check(aState, m, isMode, "triangle", "style", 2, arguments);
			check(aState, c, isColor, "triangle", "color", 3, arguments);
			if (colorDb.get(c)) {
				c = colorDb.get(c);
			}
		     aState.v =  world.Kernel.triangleImage(jsnums.toFixnum(s), 
						       60, 
						       m.toString(),
						       c);
		 });


PRIMITIVES['right-triangle'] =
new PrimProc('right-triangle',
			 4,
			 false, true,
			 function(aState, side1, side2, s, c) {
			 check(aState, side1, isNonNegativeReal, "right-triangle", "non-negative number", 1, arguments);
			 check(aState, side2, isNonNegativeReal, "right-triangle", "non-negative number", 2, arguments);
			 check(aState, s, isMode, "right-triangle", "style", 3, arguments);
			 check(aState, c, isColor, "right-triangle", "color", 4, arguments);
			 if (colorDb.get(c)) {
			 c = colorDb.get(c);
			 }
		     aState.v =  world.Kernel.rightTriangleImage(jsnums.toFixnum(side1), jsnums.toFixnum(side2), s.toString(), c);
			 });


PRIMITIVES['isosceles-triangle'] =
new PrimProc('isosceles-triangle',
			 4,
			 false, true,
			 function(aState, side, angle, s, c) {
			 check(aState, side, isNonNegativeReal, "isosceles-triangle", "non-negative number", 1, arguments);
			 check(aState, angle, isAngle, "isosceles-triangle", "finite real number between 0 and 360", 2, arguments);
			 check(aState, s, isMode, "isosceles-triangle", "style", 3, arguments);
			 check(aState, c, isColor, "isosceles-triangle", "color", 4, arguments);
			 if (colorDb.get(c)) {
			 c = colorDb.get(c);
			 }
		     aState.v =  world.Kernel.triangleImage(jsnums.toFixnum(side), jsnums.toFixnum(angle), s.toString(), c);
			 });


PRIMITIVES['ellipse'] =
    new PrimProc('ellipse',
		 4,
		 false, true,
		 function(aState, w, h, s, c) {
			check(aState, w, isNonNegativeReal, "ellipse", "non-negative number", 1, arguments);
			check(aState, h, isNonNegativeReal, "ellipse", "non-negative number", 2, arguments);
			check(aState, s, isMode, "ellipse", "string", 3, arguments);
			check(aState, c, isColor, "ellipse", "color", 4, arguments);
			
			if (colorDb.get(c)) {
				c = colorDb.get(c);
			}
			aState.v =  world.Kernel.ellipseImage(jsnums.toFixnum(w),
							 jsnums.toFixnum(h),
							 s.toString(),
							 c);
		 });


PRIMITIVES['line'] =
    new PrimProc('line',
		 3,
		 false, true,
		 function(aState, x, y, c) {
			check(aState, x, isReal, "line", "finite real number", 1, arguments);
			check(aState, y, isReal, "line", "finite real number", 2, arguments);
			check(aState, c, isColor, "line", "color", 3, arguments);
			if (colorDb.get(c)) {
				c = colorDb.get(c);
			}
			var line = world.Kernel.lineImage(jsnums.toFixnum(x),
							  jsnums.toFixnum(y),
							  c,
							  true);
		        aState.v =  line;
		 });


PRIMITIVES['add-line'] =
new PrimProc('add-line',
			 6,
			 false, true,
			 function(aState, img, x1, y1, x2, y2, c) {
			 check(aState, img, isImage,	"add-line", "image",			  1, arguments);
			 check(aState, x1,	isReal,		"add-line", "finite real number", 2, arguments);
			 check(aState, y1,	isReal,		"add-line", "finite real number", 3, arguments);
			 check(aState, x2,	isReal,		"add-line", "finite real number", 4, arguments);
			 check(aState, y2,	isReal,		"add-line", "finite real number", 5, arguments);
			 check(aState, c,	isColor,	"add-line", "color",			  6, arguments);
			 if (colorDb.get(c)) {
				c = colorDb.get(c);
			 }
			 line = world.Kernel.lineImage(jsnums.toFixnum(x2-x1),
										   jsnums.toFixnum(y2-y1),
										   c,
										   true);
			 aState.v =  world.Kernel.overlayImage(line, img, x1, y1);
			 });


PRIMITIVES['overlay'] =
    new PrimProc('overlay',
		 2,
		 true, true,
		 function(aState, img1, img2, restImages) {
			check(aState, img1, isImage, "overlay", "image", 1, arguments);
			check(aState, img2, isImage, "overlay", "image", 2, arguments);
			arrayEach(restImages, function(x, i) { check(aState, x, isImage, "overlay", "image", i+3); }, arguments);

			var img = world.Kernel.overlayImage(img1, img2, "middle", "middle");
			for (var i = 0; i < restImages.length; i++) {
				img = world.Kernel.overlayImage(img, restImages[i], "middle", "middle");
			}
			aState.v =  img;
		 });


PRIMITIVES['overlay/xy'] =
    new PrimProc('overlay/xy',
		 4,
		 false, true,
		 function(aState, img1, deltaX, deltaY, img2) {
			check(aState, img1, isImage, "overlay/xy", "image", 1, arguments);
			check(aState, deltaX, isReal, "overlay/xy", "finite real number", 2, arguments);
			check(aState, deltaY, isReal, "overlay/xy", "finite real number", 3, arguments);
			check(aState, img2, isImage, "overlay/xy", "image", 4, arguments);

		     aState.v =  world.Kernel.overlayImage(img1.updatePinhole(0, 0),
											  img2.updatePinhole(0, 0),
											  jsnums.toFixnum(deltaX),
											  jsnums.toFixnum(deltaY));
		 });


PRIMITIVES['overlay/align'] =
new PrimProc('overlay/align',
			 4,
			 true, true,
			 function(aState, placeX, placeY, img1, img2, restImages) {
			 check(aState, placeX, isPlaceX, "overlay/align", "x-place", 1, arguments);
			 check(aState, placeY, isPlaceY, "overlay/align", "y-place", 2, arguments);
			 check(aState, img1, isImage, "overlay/align", "image", 3, arguments);
			 check(aState, img2, isImage, "overlay/align", "image", 4, arguments);
			 arrayEach(restImages, function(x, i) { check(aState, x, isImage, "overlay/align", "image", i+4); }, arguments);
			 
			 var img = world.Kernel.overlayImage(img1,
												 img2,
												 placeX.toString(),
												 placeY.toString());
			 
			 for (var i = 0; i < restImages.length; i++)
				img = world.Kernel.overlayImage(img,
												restImages[i], 
												placeX.toString(), 
												placeY.toString());

		     aState.v =  img;
			 });

PRIMITIVES['underlay'] =
    new PrimProc('underlay',
		 2,
		 true, true,
		 function(aState, img1, img2, restImages) {
			check(aState, img1, isImage, "underlay", "image", 1, arguments);
			check(aState, img2, isImage, "underlay", "image", 2, arguments);
			arrayEach(restImages, function(x, i) { check(aState, x, isImage, "underlay", "image", i+3); }, arguments);

			var img = world.Kernel.overlayImage(img2, img1, 0, 0);
			for (var i = 0; i < restImages.length; i++) {
				img = world.Kernel.overlayImage(restImages[i], img, 0, 0);
			}
			aState.v =  img;
		 });


PRIMITIVES['underlay/xy'] =
    new PrimProc('underlay/xy',
		 4,
		 false, true,
		 function(aState, img1, deltaX, deltaY, img2) {
			check(aState, img1, isImage, "underlay/xy", "image", 1, arguments);
			check(aState, deltaX, isReal, "underlay/xy", "finite real number", 2, arguments);
			check(aState, deltaY, isReal, "underlay/xy", "finite real number", 3, arguments);
			check(aState, img2, isImage, "underlay/xy", "image", 4, arguments);

		     aState.v =  world.Kernel.overlayImage(img2.updatePinhole(0, 0), 
						      img1.updatePinhole(0, 0),
						      -jsnums.toFixnum(deltaX),
						      -jsnums.toFixnum(deltaY));
		 });


PRIMITIVES['underlay/align'] =
new PrimProc('underlay/align',
			 4,
			 true, true,
			 function(placeX, placeY, img1, img2, restImages) {
			 check(aState, placeX, isPlaceX, "underlay/align", "x-place", 1, arguments);
			 check(aState, placeY, isPlaceY, "underlay/align", "y-place", 2, arguments);
			 check(aState, img1, isImage, "underlay/align", "image", 3, arguments);
			 check(aState, img2, isImage, "underlay/align", "image", 4, arguments);
			 arrayEach(restImages, function(x, i) { check(aState, x, isImage, "underlay/align", "image", i+4); }, arguments);
			 
			 var img = world.Kernel.overlayImage(img2,
												  img1,
												  placeX.toString(),
												  placeY.toString());
			 
			 for (var i = 0; i < restImages.length; i++)
			 img = world.Kernel.overlayImage(restImages[i], 
											  img,
											  placeX.toString(), 
											  placeY.toString());
			 
		     aState.v =  img;
			 });


PRIMITIVES['beside'] =
new PrimProc('beside',
			 2,
			 true, true,
			 function(aState, img1, img2, restImages) {
			 check(aState, img1, isImage, "beside", "image", 1, arguments);
			 check(aState, img2, isImage, "beside", "image", 2, arguments);
			 arrayEach(restImages, function(x, i) { check(aState, x, isImage, "beside", "image", i+4); }, arguments);
			 
			 var img = world.Kernel.overlayImage(img1,
												 img2,
												 "beside",
												 "middle");
			 
			 for (var i = 0; i < restImages.length; i++)
			 img = world.Kernel.overlayImage(img,restImages[i], "beside", "middle");
			 
		     aState.v =  img;
			 });

PRIMITIVES['beside/align'] =
new PrimProc('beside/align',
			 3,
			 true, true,
			 function(aState, placeY, img1, img2, restImages) {
			 check(aState, placeY, isPlaceY, "beside/align", "y-place", 1, arguments);
			 check(aState, img1, isImage, "beside/align", "image", 2, arguments);
			 check(aState, img2, isImage, "beside/align", "image", 3, arguments);
			 arrayEach(restImages, function(x, i) { check(aState, x, isImage, "beside", "image", i+3); }, arguments);
			 
			 var img = world.Kernel.overlayImage(img1,
												 img2,
												 "beside",
												 placeY.toString());
			 
			 for (var i = 0; i < restImages.length; i++)
			 img = world.Kernel.overlayImage(img,
											 restImages[i], 
											 "beside",
											 placeY.toString());
			 
		     aState.v =  img;
			 });

PRIMITIVES['above'] =
new PrimProc('above',
			 2,
			 true, true,
			 function(aState, img1, img2, restImages) {
			 check(aState, img1, isImage, "above", "image", 1, arguments);
			 check(aState, img2, isImage, "above", "image", 2, arguments);
			 arrayEach(restImages, function(x, i) { check(aState, x, isImage, "above", "image", i+4); }, arguments);
			 
			 var img = world.Kernel.overlayImage(img1,
												 img2,
												 "middle",
												 "above");
			 
			 for (var i = 0; i < restImages.length; i++)
			 img = world.Kernel.overlayImage(img,
											 restImages[i], 
											 "middle",
											 "above");
			 
		     aState.v =  img;
			 });

PRIMITIVES['above/align'] =
new PrimProc('above/align',
			 3,
			 true, true,
			 function(aState, placeX, img1, img2, restImages) {
			 check(aState, placeX, isPlaceX, "above/align", "x-place", 1, arguments);
			 check(aState, img1, isImage, "above/align", "image", 1, arguments);
			 check(aState, img2, isImage, "above/align", "image", 2, arguments);
			 arrayEach(restImages, function(x, i) { check(aState, x, isImage, "above/align", "image", i+4); }, arguments);
			 
			 var img = world.Kernel.overlayImage(img1,
												 img2,
												 placeX.toString(),
												 "above");
			 
			 for (var i = 0; i < restImages.length; i++)
			 img = world.Kernel.overlayImage(img,
											 restImages[i], 
											 placeX.toString(),
											 "above");
			 
		     aState.v =  img;
			 });

PRIMITIVES['rotate'] =
new PrimProc('rotate',
			 2,
			 false, true,
			 function(aState, angle, img) {
			 check(aState, angle, isAngle, "rotate", "finite real number between 0 and 360", 1, arguments);
			 check(aState, img, isImage, "rotate", "image", 2, arguments);
				 // negate the angle, to make it a counterclockwise rotation
			     aState.v =  world.Kernel.rotateImage(jsnums.toFixnum(-angle), img);
			 });

PRIMITIVES['scale/xy'] =
new PrimProc('scale/xy',
			 3,
			 false, true,
			 function(aState, xFactor, yFactor, img) {
			 check(aState, xFactor, isReal, "scale/xy", "finite real number", 1, arguments);
			 check(aState, yFactor, isReal, "scale/xy", "finite real number", 2, arguments);
			 check(aState, img, isImage, "scale/xy", "image", 3, arguments);
			 
			 aState.v =  world.Kernel.scaleImage(jsnums.toFixnum(xFactor), 
							jsnums.toFixnum(yFactor),
							img);

			 });

PRIMITIVES['scale'] =
new PrimProc('scale',
			 2,
			 false, true,
			 function(aState, factor, img) {
			 check(aState, factor, isReal, "scale", "finite real number", 1, arguments);
			 check(aState, img, isImage, "scale", "image", 2, arguments);
			 
			 aState.v =  world.Kernel.scaleImage(jsnums.toFixnum(factor),
											jsnums.toFixnum(factor),
											img);
			 });

PRIMITIVES['crop'] =
new PrimProc('crop',
			 5,
			 false, true,
			 function(aState, x, y, width, height, img) {
			 check(aState, x,	  isReal, "crop", "finite real number", 1, arguments);
			 check(aState, y,	  isReal, "crop", "finite real number", 2, arguments);
			 check(aState, width, isNonNegativeReal, "crop", "non-negative number", 3, arguments);
			 check(aState, height,isNonNegativeReal, "crop", "non-negative number", 4, arguments);
			 check(aState, img,   isImage,"crop", "image", 5, arguments);
			 aState.v =  world.Kernel.cropImage(jsnums.toFixnum(x),
										   jsnums.toFixnum(y),
										   jsnums.toFixnum(width),
										   jsnums.toFixnum(height),
										   img);
			 });

PRIMITIVES['frame'] =
new PrimProc('frame',
			 1,
			 false, true,
			 function(aState, img) {
			 check(aState, img,   isImage,"frame", "image", 1, arguments);
			 aState.v = world.Kernel.frameImage(img);
			 });

PRIMITIVES['flip-vertical'] =
new PrimProc('flip-vertical',
			 1,
			 false, true,
			 function(aState, img) {
			 check(aState, img, isImage, "flip-vertical", "image", 1, arguments);
			 aState.v = world.Kernel.flipImage(img, "vertical");
			 });


PRIMITIVES['flip-horizontal'] =
new PrimProc('flip-horizontal',
			 1,
			 false, true,
			 function(aState, img) {
			 check(aState, img, isImage, "flip-horizontal", "image", 1, arguments);
			 aState.v = world.Kernel.flipImage(img, "horizontal");
			 });


PRIMITIVES['text'] =
    new PrimProc('text',
		 3,
		 false, true,
		 function(aState, aString, aSize, aColor) {
		     check(aState, aString, isString, "text", "string", 1, arguments);
		     check(aState, aSize, function(x) { return isNatural(x) && jsnums.greaterThan(x, 0) && isByte(x); },
			   "text", "exact integer between 1 and 255", 2, arguments);
		     check(aState, aColor, isColor, "text", "color", 3, arguments);
                     
		     if (colorDb.get(aColor)) {
			 aColor = colorDb.get(aColor);
		     }
		     aState.v = world.Kernel.textImage(aString.toString(), jsnums.toFixnum(aSize), aColor,
						   "normal", "Optimer","","",false);
		 });


PRIMITIVES['text/font'] =
new PrimProc('text/font',
			 8,
			 false, true,
			 function(aState, aString, aSize, aColor, aFace, aFamily, aStyle, aWeight, aUnderline) {
			 check(aState, aString, isString,		"text/font", "string",	1, arguments);
		     check(aState, aSize,	function(x) { return isNatural(x) && jsnums.greaterThan(x, 0) && isByte(x); },
				   "text/font", "exact integer between 1 and 255",	2, arguments);
			 check(aState, aColor,	isColor,		"text/font", "color",	3, arguments);
			 check(aState, aFace,	function(x) {return isString(x) || !x;},		
											"text/font", "face",	4, arguments);
			 check(aState, aFamily,	isFontFamily,	"text/font", "family",	5, arguments);
			 check(aState, aStyle,	isFontStyle,	"text/font", "style",	6, arguments);
			 check(aState, aWeight,	isFontWeight,	"text/font", "weight",	7, arguments);
			 check(aState, aUnderline,isBoolean,	"text/font", "underline?",8, arguments);
			 
			 if (colorDb.get(aColor)) {
			 aColor = colorDb.get(aColor);
			 }
                             try {
			 aState.v = world.Kernel.textImage(aString.toString(), jsnums.toFixnum(aSize), aColor,
										   aFace.toString(), aFamily.toString(), aStyle.toString(),
										   aWeight.toString(), aUnderline);
                             } catch(e) {
                                 // Under IE 8, something breaks.  I don't know yet what it is.
		        aState.v = world.Kernel.textImage(aString.toString(), jsnums.toFixnum(aSize), aColor,
											  "normal", "Optimer","","",false);
                             }
			 });

PRIMITIVES['bitmap/url'] = 
PRIMITIVES['image-url'] =
    new PrimProc('image-url',
		 1,
		 false, true,
		 function(aState, path) {
		     check(aState, path, isString, "image-url", "string", 1);
		     var originalPath = path.toString();
		     if (state.getImageProxyHook()) {
			 path = (state.getImageProxyHook() +
				 "?url=" + encodeURIComponent(path.toString()));
		     } else {
			 path = path.toString();
		     }

		     aState.v = PAUSE(function(restarter, caller) {
			 var rawImage = new Image();
			 rawImage.onload = function() {
			     world.Kernel.fileImage(
				 path,
				 rawImage,
			         restarter);
			 };
			 rawImage.onerror = function(e) {
			     restarter(types.schemeError(types.incompleteExn(
					types.exnFail,
					" (unable to load: " + originalPath + ")",
					[])));
			 };
			 rawImage.src = path;
		     });
		 });

PRIMITIVES['open-image-url'] = PRIMITIVES['image-url'];


PRIMITIVES['video-url'] =
new PrimProc('video-url',
			 1,
			 false, true,
			 function(state, path) {
		     check(aState, path, isString, "video-url", "string", 1);
			     aState.v = PAUSE(function(restarter, caller) {
										var rawVideo = document.createElement('video');
										rawVideo.src = path.toString();
										rawVideo.addEventListener('canplay', function() {
										restarter(world.Kernel.videoImage(path.toString(), rawVideo));
										});
										rawVideo.addEventListener('error', function(e) {
										restarter(types.schemeError(types.incompleteExn(
																				   types.exnFail,
																				   " (unable to load: " + path + ")",
																				   [])));
										});
										rawVideo.src = path.toString();
										});
			 });


PRIMITIVES['image-width'] =
    new PrimProc('image-width',
		 1,
		 false, true,
		 function(aState, img) {
		     check(aState, img, isImage, 'image-width', 'image', 1);
		     aState.v = img.getWidth();
		 });


PRIMITIVES['image-height'] =
    new PrimProc('image-height',
		 1,
		 false, true,
		 function(aState, img) {
		     check(aState, img, isImage, 'image-height', 'image', 1);
		     aState.v = img.getHeight();
		 });


PRIMITIVES['image-baseline'] =
new PrimProc('image-baseline',
			 1,
			 false, true,
			 function(aState, img) {
			 check(aState, img, isImage, 'image-baseline', 'image', 1);
			 aState.v = img.getBaseline();
			 });


PRIMITIVES['image->color-list'] = 
   new PrimProc('image->color-list',
		 1,
		 false, true,
		 function(aState, img) {
		     check(aState, img, isImage, 'image->color-list', 'image', 1);
		     var width = img.getWidth(),
                         height = img.getHeight(),
		         canvas = world.Kernel.makeCanvas(width, height),
		         ctx = canvas.getContext("2d"),
                         imageData,
                         data,
                         i,
		         r, g, b, a;
		     img.render(ctx, 0, 0);
		     imageData = ctx.getImageData(0, 0, width, height);
		     data = imageData.data;
		     var colors = [];
		     for (i = 0 ; i < data.length; i += 4) {
			 r = data[i];
			 g = data[i+1];
			 b = data[i+2];
			 a = data[i+3];
			 colors.push(types.color(r, g, b, a));
		     }
		     aState.v = types.list(colors);
		 });



// Note: this has to be done asynchonously.
var colorListToImage = function(listOfColors, width, height, pinholeX, pinholeY) {
    checkListOf(listOfColors, isColor, 'color-list->image', 'image', 1);
    check(undefined, width, isNatural, 'color-list->image', 'natural', 2);
    check(undefined, height, isNatural, 'color-list->image', 'natural', 3);
    check(undefined, pinholeX, isNatural, 'color-list->image', 'natural', 4);
    check(undefined, pinholeY, isNatural, 'color-list->image', 'natural', 5);
    var canvas = world.Kernel.makeCanvas(jsnums.toFixnum(width),
					 jsnums.toFixnum(height)),
    ctx = canvas.getContext("2d"),
    imageData = ctx.createImageData(jsnums.toFixnum(width),
				    jsnums.toFixnum(height)),
    data = imageData.data,
    aColor, i = 0;
    while (listOfColors !== types.EMPTY) {
	aColor = listOfColors.first();
	data[i] = jsnums.toFixnum(types.colorRed(aColor));
	data[i+1] = jsnums.toFixnum(types.colorGreen(aColor));
	data[i+2] = jsnums.toFixnum(types.colorBlue(aColor));
	data[i+3] = jsnums.toFixnum(types.colorAlpha(aColor));

	i += 4;
	listOfColors = listOfColors.rest();
    };
    ctx.putImageData(imageData, 0, 0);
    var path = canvas.toDataURL("image/png");
    return PAUSE(function(restarter, caller) {
	var rawImage = new Image();
	rawImage.onload = function() {
	    world.Kernel.fileImage(
		path,
		rawImage,
		restarter);
	};
	rawImage.onerror = function(e) {
	    restarter(types.schemeError(types.incompleteExn(
		types.exnFail,
		" (unable to load: " + originalPath + ")",
		[])));
	};
	rawImage.src = path;
    });
};


PRIMITIVES['color-list->image'] = 
    new PrimProc('color-list->image',
		 5,
		 false, true,
                 function(aState, colorList, width, height, x, y){
                     aState.v = colorListToImage(colorList, width, height, x, y);
                 });


PRIMITIVES['color-list->bitmap'] = 
    new PrimProc('color-list->bitmap',
		 3,
		 false, true,
		 function(aState, colorList, width, height) {
                     aState.v = colorListToImage(colorList, width, height, 0, 0);
                 });




PRIMITIVES['mode?']		= new PrimProc('mode?', 1, false, false, isMode);
PRIMITIVES['image-color?']      = new PrimProc('image-color?', 1, false, false, isColor);
PRIMITIVES['name->color']       = new PrimProc('name->color?', 1, false, false,
                                               function(x) { 
                                                   return nameToColor(x) || false; 
                                               });
PRIMITIVES['x-place?']		= new PrimProc('x-place?', 1, false, false, isPlaceX);
PRIMITIVES['y-place?']		= new PrimProc('y-place?', 1, false, false, isPlaceY);
PRIMITIVES['angle?']		= new PrimProc('angle?', 1, false, false, isAngle);
PRIMITIVES['side-count?']	= new PrimProc('side-count?', 1, false, false, isSideCount);
PRIMITIVES['step-count?']	= new PrimProc('step-count?', 1, false, false, isStepCount);






// PRIMITIVES['image?'] = new PrimProc('image?', 1, false, false, isImage);

// PRIMITIVES['image=?'] =
//     new PrimProc('image=?',
// 		 2,
// 		 false, false,
// 		 function(img1, img2) {
// 		 	check(aState, img1, isImage, 'image=?', 'image', 1);
// 			check(aState, img2, isImage, 'image=?', 'image', 2);
// 			return isEqual(img1, img2);
// 		 });


// PRIMITIVES['make-color'] =
//     new PrimProc('make-color',
// 		 3,
// 		 false, false,
// 		 function(r, g, b) {
// 		 	check(aState, r, isByte, 'make-color', 'number between 0 and 255', 1, arguments);
// 		 	check(aState, g, isByte, 'make-color', 'number between 0 and 255', 2, arguments);
// 		 	check(aState, b, isByte, 'make-color', 'number between 0 and 255', 3, arguments);

// 			return types.color(jsnums.toFixnum(r),
// 					   jsnums.toFixnum(g),
// 					   jsnums.toFixnum(b));
// 		 });

// PRIMITIVES['color-red'] =
//     new PrimProc('color-red',
// 		 1,
// 		 false, false,
// 		 function(col) {
// 		 	check(aState, col, types.isColor, 'color-red', 'color', 1);
// 			return types.colorRed(col);
// 		 });

// PRIMITIVES['color-green'] =
//     new PrimProc('color-green',
// 		 1,
// 		 false, false,
// 		 function(col) {
// 		 	check(aState, col, types.isColor, 'color-green', 'color', 1);
// 			return types.colorGreen(col);
// 		 });

// PRIMITIVES['color-blue'] =
//     new PrimProc('color-blue',
// 		 1,
// 		 false, false,
// 		 function(col) {
// 		 	check(aState, col, types.isColor, 'color-blue', 'color', 1);
// 			return types.colorBlue(col);
// 		 });


// PRIMITIVES['empty-scene'] =
//     new PrimProc('empty-scene',
// 		 2,
// 		 false, false,
// 		 function(width, height) {
// 		 	check(aState, width, isNonNegativeReal, 'empty-scene', 'non-negative number', 1, arguments);
// 			check(aState, height, isNonNegativeReal, 'empty-scene', 'non-negative number', 2, arguments);
// 		     return world.Kernel.sceneImage(jsnums.toFixnum(width), jsnums.toFixnum(height), [], true);
// 		 });


// PRIMITIVES['place-image'] =
//     new PrimProc('place-image',
// 		 4,
// 		 false, false,
// 		 function(picture, x, y, background) {
// 			check(aState, picture, isImage, "place-image", "image", 1, arguments);
// 			check(aState, x, isReal, "place-image", "real", 2, arguments);
// 			check(aState, y, isReal, "place-image", "real", 3, arguments);
// 			check(aState, background, function(x) { return isScene(x) || isImage(x) },
// 			      "place-image", "image", 4, arguments);
// 			if (isScene(background)) {
// 			    return background.add(picture, jsnums.toFixnum(x), jsnums.toFixnum(y));
// 			} else {
// 			    var newScene = world.Kernel.sceneImage(background.getWidth(),
// 								   background.getHeight(),
// 								   [], 
// 								   false);
// 			    newScene = newScene.add(background.updatePinhole(0, 0), 0, 0);
// 			    newScene = newScene.add(picture, jsnums.toFixnum(x), jsnums.toFixnum(y));
// 			    return newScene;
// 			}
// 		 });


// PRIMITIVES['put-pinhole'] =
//     new PrimProc('put-pinhole',
// 		 3,
// 		 false, false,
// 		 function(img, x, y) {
// 			check(aState, img, isImage, "put-pinhole", "image", 1, arguments);
// 			check(aState, x, isReal, "put-pinhole", "real", 2, arguments);
// 			check(aState, y, isReal, "put-pinhole", "real", 3, arguments);
// 			return img.updatePinhole(jsnums.toFixnum(x), jsnums.toFixnum(y));
//     		 });


// PRIMITIVES['circle'] =
//     new PrimProc('circle',
// 		 3,
// 		 false, false,
// 		 function(aRadius, aStyle, aColor) {
// 			check(aState, aRadius, isNonNegativeReal, "circle", "non-negative number", 1, arguments);
// 			check(aState, aStyle, isStyle, "circle", "style", 2, arguments);
// 			check(aState, aColor, isColor, "circle", "color", 3, arguments);


// 			if (colorDb.get(aColor)) {
// 				aColor = colorDb.get(aColor);
// 			}
// 		     return world.Kernel.circleImage(jsnums.toFixnum(aRadius), aStyle.toString(), aColor);
// 		 });


// PRIMITIVES['star'] =
//     new PrimProc('star',
// 		 5,
// 		 false, false,
// 		 function(aPoints, anOuter, anInner, aStyle, aColor) {
// 			check(aState, aPoints, function(x) { return isNatural(x) && jsnums.greaterThanOrEqual(x, 3); },
// 			      "star", "positive integer greater than or equal to 3", 1, arguments);
// 			check(aState, anOuter, function(x) { return isReal(x) && jsnums.greaterThan(x, 0); },
// 			      "star", "positive number", 2, arguments);
// 			check(aState, anInner, function(x) { return isReal(x) && jsnums.greaterThan(x, 0); },
// 			      "star", "positive number", 2, arguments);
// 			check(aState, aStyle, isStyle, "star", "style", 4, arguments);
// 			check(aState, aColor, isColor, "star", "color", 5, arguments);

// 			if (colorDb.get(aColor)) {
// 				aColor = colorDb.get(aColor);
// 			}
// 			return world.Kernel.starImage(jsnums.toFixnum(aPoints),
// 						      jsnums.toFixnum(anOuter),
// 						      jsnums.toFixnum(anInner),
// 						      aStyle,
// 						      aColor);
// 		 });


// PRIMITIVES['nw:rectangle'] =
//     new PrimProc('nw:rectangle',
// 		 4,
// 		 false, false,
// 		 function(w, h, s, c) {
// 			check(aState, w, isNonNegativeReal, "nw:rectangle", "non-negative number", 1, arguments);
// 			check(aState, h, isNonNegativeReal, "nw:rectangle", "non-negative number", 2, arguments);
// 			check(aState, s, isStyle, "nw:rectangle", "style", 3, arguments);
// 			check(aState, c, isColor, "nw:rectangle", "color", 4, arguments);

// 			if (colorDb.get(c)) {
// 				c = colorDb.get(c);
// 			}
// 			var aRect = world.Kernel.rectangleImage(jsnums.toFixnum(w),
// 								jsnums.toFixnum(h),
// 								s, c);
// 			return aRect.updatePinhole(0, 0);
// 		 });


// PRIMITIVES['rectangle'] =
//     new PrimProc('rectangle',
// 		 4,
// 		 false, false,
// 		 function(w, h, s, c) {
// 			check(aState, w, isNonNegativeReal, "rectangle", "non-negative number", 1, arguments);
// 			check(aState, h, isNonNegativeReal, "rectangle", "non-negative number", 2, arguments);
// 			check(aState, s, isStyle, "rectangle", "style", 3, arguments);
// 			check(aState, c, isColor, "rectangle", "color", 4, arguments);

// 			if (colorDb.get(c)) {
// 				c = colorDb.get(c);
// 			}
// 			return world.Kernel.rectangleImage(jsnums.toFixnum(w),
// 							   jsnums.toFixnum(h),
// 							   s, c);
// 		 });


// PRIMITIVES['triangle'] =
//     new PrimProc('triangle',
// 		 3,
// 		 false, false,
// 		 function(r, s, c) {
// 			check(aState, r, isNonNegativeReal, "triangle", "non-negative number", 1, arguments);
// 			check(aState, s, isStyle, "triangle", "style", 2, arguments);
// 			check(aState, c, isColor, "triangle", "color", 3, arguments);
// 			if (colorDb.get(c)) {
// 				c = colorDb.get(c);
// 			}
// 			return world.Kernel.triangleImage(jsnums.toFixnum(r), s, c);
// 		 });


// PRIMITIVES['ellipse'] =
//     new PrimProc('ellipse',
// 		 4,
// 		 false, false,
// 		 function(w, h, s, c) {
// 			check(aState, w, isNonNegativeReal, "ellipse", "non-negative number", 1, arguments);
// 			check(aState, h, isNonNegativeReal, "ellipse", "non-negative number", 2, arguments);
// 			check(aState, s, isStyle, "ellipse", "string", 3, arguments);
// 			check(aState, c, isColor, "ellipse", "color", 4, arguments);
			
// 			if (colorDb.get(c)) {
// 				c = colorDb.get(c);
// 			}
// 			return world.Kernel.ellipseImage(jsnums.toFixnum(w),
// 							 jsnums.toFixnum(h),
// 							 s, c);
// 		 });


// PRIMITIVES['line'] =
//     new PrimProc('line',
// 		 3,
// 		 false, false,
// 		 function(x, y, c) {
// 			check(aState, x, isReal, "line", "finite real number", 1, arguments);
// 			check(aState, y, isReal, "line", "finite real number", 2, arguments);
// 			check(aState, c, isColor, "line", "color", 3, arguments);
// 			if (colorDb.get(c)) {
// 				c = colorDb.get(c);
// 			}
// 			var line = world.Kernel.lineImage(jsnums.toFixnum(x),
// 							  jsnums.toFixnum(y),
// 							  c);
// 		        return line;
// 		 });


// PRIMITIVES['overlay'] =
//     new PrimProc('overlay',
// 		 2,
// 		 true, false,
// 		 function(img1, img2, restImages) {
// 			check(aState, img1, isImage, "overlay", "image", 1, arguments);
// 			check(aState, img2, isImage, "overlay", "image", 2, arguments);
// 			arrayEach(restImages, function(x, i) { check(aState, x, isImage, "overlay", "image", i+3); }, arguments);

// 			var img = world.Kernel.overlayImage(img1, img2, 0, 0);
// 			for (var i = 0; i < restImages.length; i++) {
// 				img = world.Kernel.overlayImage(img, restImages[i], 0, 0);
// 			}
// 			return img;
// 		 });


// PRIMITIVES['overlay/xy'] =
//     new PrimProc('overlay/xy',
// 		 4,
// 		 false, false,
// 		 function(img1, deltaX, deltaY, img2) {
// 			check(aState, img1, isImage, "overlay/xy", "image", 1, arguments);
// 			check(aState, deltaX, isReal, "overlay/xy", "finite real number", 2, arguments);
// 			check(aState, deltaY, isReal, "overlay/xy", "finite real number", 3, arguments);
// 			check(aState, img2, isImage, "overlay/xy", "image", 4, arguments);

// 		     return world.Kernel.overlayImage(img1.updatePinhole(0, 0),
// 						      img2.updatePinhole(0, 0),
// 						      jsnums.toFixnum(deltaX),
// 						      jsnums.toFixnum(deltaY));
// 		 });


// PRIMITIVES['underlay'] =
//     new PrimProc('underlay',
// 		 2,
// 		 true, false,
// 		 function(img1, img2, restImages) {
// 			check(aState, img1, isImage, "underlay", "image", 1, arguments);
// 			check(aState, img2, isImage, "underlay", "image", 2, arguments);
// 			arrayEach(restImages, function(x, i) { check(aState, x, isImage, "underlay", "image", i+3); }, arguments);

// 			var img = world.Kernel.overlayImage(img2, img1, 0, 0);
// 			for (var i = 0; i < restImages.length; i++) {
// 				img = world.Kernel.overlayImage(restImages[i], img, 0, 0);
// 			}
// 			return img;
// 		 });


// PRIMITIVES['underlay/xy'] =
//     new PrimProc('underlay/xy',
// 		 4,
// 		 false, false,
// 		 function(img1, deltaX, deltaY, img2) {
// 			check(aState, img1, isImage, "underlay/xy", "image", 1, arguments);
// 			check(aState, deltaX, isReal, "underlay/xy", "finite real number", 2, arguments);
// 			check(aState, deltaY, isReal, "underlay/xy", "finite real number", 3, arguments);
// 			check(aState, img2, isImage, "underlay/xy", "image", 4, arguments);

// 		     return world.Kernel.overlayImage(img2.updatePinhole(0, 0), 
// 						      img1.updatePinhole(0, 0),
// 						      -jsnums.toFixnum(deltaX),
// 						      -jsnums.toFixnum(deltaY));
// 		 });





// PRIMITIVES['text'] =
//     new PrimProc('text',
// 		 3,
// 		 false, false,
// 		 function(aString, aSize, aColor) {
// 			check(aState, aString, isString, "text", "string", 1, arguments);
// 			check(aState, aSize, function(x) { return jsnums.greaterThan(x, 0) && isByte(x); },
// 			      "text", "exact integer between 1 and 255", 2, arguments);
// 			check(aState, aColor, isColor, "text", "color", 3, arguments);

// 			if (colorDb.get(aColor)) {
// 				aColor = colorDb.get(aColor);
// 			}
// 		     return world.Kernel.textImage(aString.toString(), jsnums.toFixnum(aSize), aColor);
// 		 });


// PRIMITIVES['open-image-url'] =
//     new PrimProc('open-image-url',
// 		 1,
// 		 false, true,
// 		 function(state, path) {
// 		     check(aState, path, isString, "open-image-url", "string", 1);
// 		     return PAUSE(function(restarter, caller) {
// 			 var rawImage = new Image();
// 			 rawImage.onload = function() {
// 			     restarter(world.Kernel.fileImage(
// 				 path.toString(),
// 				 rawImage));
// 			 };
// 			 rawImage.onerror = function(e) {
// 			     restarter(types.schemeError(types.incompleteExn(
// 				types.exnFail,
// 				" (unable to load: " + path + ")",
// 				[])));
// 			 };
// 			 rawImage.src = path.toString();
// 		     });
// 		 });


// PRIMITIVES['image-width'] =
//     new PrimProc('image-width',
// 		 1,
// 		 false, false,
// 		 function(img) {
// 		 	check(aState, img, isImage, 'image-width', 'image', 1);
// 			return img.getWidth();
// 		 });


// PRIMITIVES['image-height'] =
//     new PrimProc('image-height',
// 		 1,
// 		 false, false,
// 		 function(img) {
// 		 	check(aState, img, isImage, 'image-height', 'image', 1);
// 			return img.getHeight();
// 		 });



/************************
 *** World Primitives ***
 ************************/



var OnTickBang = WorldConfigOption.extend({
	init: function(handler, effectHandler, aDelay) {
	    this._super('on-tick');
	    this.handler = handler;
	    this.effectHandler = effectHandler;
	    this.aDelay = aDelay;
	},

	configure: function(config) {
	    var newVals = { 
		onTick: this.handler,
		onTickEffect: this.effectHandler,
		tickDelay: jsnums.toFixnum(jsnums.multiply(1000, this.aDelay))
	    };
	    return config.updateAll(newVals);
	}});




// The default tick delay is 28 times a second.
var DEFAULT_TICK_DELAY = types.rational(1, 28);

PRIMITIVES['on-tick'] =
	new CasePrimitive(
	    'on-tick',
	    [new PrimProc('on-tick',
			  1,
			  false, true,
			  function(aState, f) {
			      check(aState, f, isFunction, "on-tick", "procedure", 1);
			      aState.v = new OnTickBang(f,
						    new PrimProc('', 1, false, false,
								 function(w) { return types.effectDoNothing(); }),
						    DEFAULT_TICK_DELAY);
			  }),
	     new PrimProc('on-tick',
			  2,
			  false, true,
			  function(aState, f, aDelay) {
			      check(aState, f, isFunction, "on-tick", "procedure", 1, arguments);
			      check(aState, aDelay, isNonNegativeReal, "on-tick", "non-negative number", 2, arguments);
			      aState.v = new OnTickBang(f,
						    new PrimProc('', 1, false, false,
								 function(w) { return types.effectDoNothing(); }),
						    aDelay);
			  }) ]);



PRIMITIVES['on-tick!'] =
    new CasePrimitive('on-tick!',
	[new PrimProc('on-tick!',
		      2,
		      false, true,
		      function(aState, handler, effectHandler) {
			  check(aState, handler, isFunction, "on-tick!", "procedure", 1, arguments);
			  check(aState, effectHandler, isFunction, "on-tick!","procedure", 2, arguments);
			  aState.v = new OnTickBang(handler, effectHandler, DEFAULT_TICK_DELAY);
		      }),
	 new PrimProc('on-tick!',
		      3,
		      false, true,
		      function(aState, handler, effectHandler, aDelay)  {
			  check(aState, handler, isFunction, "on-tick!", "procedure", 1, arguments);
			  check(aState, effectHandler, isFunction, "on-tick!","procedure", 2, arguments);
			  check(aState, aDelay, isNonNegativeReal, "on-tick!", "non-negative number", 3, arguments);
			  aState.v = new OnTickBang(handler, effectHandler, aDelay);
		      }) ]);


PRIMITIVES['on-tap'] = new PrimProc('on-tap', 1, false, false, onEvent('on-tap', 'onTap', 3));
PRIMITIVES['on-tilt'] = new PrimProc('on-tilt', 1, false, false, onEvent('on-tilt', 'onTilt', 3));


PRIMITIVES['on-key'] = new PrimProc('on-key', 1, false, false, onEvent('on-key', 'onKey', 2));
PRIMITIVES['on-key!'] = new PrimProc('on-key!', 2, false, false, onEventBang('on-key!', 'onKey'));

// PRIMITIVES['on-announce'] = new PrimProc('on-announce', 1, false, false,
// 					 onEvent('on-announce', 'onAnnounce', 3));
// PRIMITIVES['on-announce!'] = new PrimProc('on-announce!', 2, false, false,
// 					  onEventBang('on-announce!', 'onAnnounce'));

// PRIMITIVES['on-location-change'] = new PrimProc('on-location-change', 1, false, false,
// 						onEvent('on-location-change', 'onLocationChange', 3));
// PRIMITIVES['on-location-change!'] = new PrimProc('on-location-change!', 2, false, false,
// 						 onEventBang('on-location-change!', 'onLocationChange'));


// PRIMITIVES['on-tilt!'] = new PrimProc('on-tilt!', 2, false, false, onEventBang('on-tilt!', 'onTilt'));

// PRIMITIVES['on-acceleration'] = new PrimProc('on-acceleration', 1, false, false,
// 					     onEvent('on-acceleration', 'onAcceleration', 4));
// PRIMITIVES['on-acceleration!'] = new PrimProc('on-acceleration!', 2, false, false,
// 					      onEventBang('on-acceleration!', 'onAcceleration'));

// PRIMITIVES['on-sms-receive'] = new PrimProc('on-sms-receive', 1, false, false,
// 					    onEvent('on-sms-receive', 'onSmsReceive', 3));
// PRIMITIVES['on-sms-receive!'] = new PrimProc('on-sms-receive!', 2, false, false,
// 					     onEventBang('on-sms-receive!', 'onSmsReceive'));

// PRIMITIVES['on-shake'] = new PrimProc('on-shake', 1, false, false, onEvent('on-shake', 'onShake', 1));
// PRIMITIVES['on-shake!'] = new PrimProc('on-shake!', 2, false, false, onEventBang('on-shake!', 'onShake'));


PRIMITIVES['stop-when'] = new PrimProc('stop-when', 1, false, false,
				       onEvent('stop-when', 'stopWhen', 1));
PRIMITIVES['stop-when!'] = new PrimProc('stop-when!', 2, false, false,
					onEventBang('stop-when!', 'stopWhen'));


PRIMITIVES['on-redraw'] =
    new PrimProc('on-redraw',
		 1,
		 false, true,
		 function(aState, f) {
		     check(aState, f, isFunction, 'on-redraw', 'procedure', 1);
		     aState.v = new (WorldConfigOption.extend({
				 init: function() {
				     this._super('on-redraw');
				 },

				 configure: function(config) {
				     return config.updateAll({'onRedraw': f});
				 }}))();

		 });


PRIMITIVES['to-draw'] =
    new PrimProc('to-draw',
		 1,
		 false, true,
		 function(aState, f) {
		     check(aState, f, isFunction, 'to-draw', 'procedure', 1);
		     aState.v = new (WorldConfigOption.extend({
				 init: function() {
				     this._super('on-redraw');
				 },

				 configure: function(config) {
				     return config.updateAll({'onRedraw': f});
				 }}))();

		 });




PRIMITIVES['on-draw'] =
    new CasePrimitive('on-draw',
	[new PrimProc('on-draw',
		      1,
		      false, true,
		      function(aState, domHandler) {
			  check(aState, domHandler, isFunction, 'on-draw', 'procedure', 1);
			  aState.v = new (WorldConfigOption.extend({
				    init: function() {
					this._super('on-draw');
				    },
				    configure: function(config) {
					return config.updateAll({'onDraw': domHandler});
				    }
				}))();
		      }),
	 new PrimProc('on-draw',
		      2,
		      false, true,
		      function(aState, domHandler, styleHandler) {
		 	  check(aState, domHandler, isFunction, 'on-draw', 'procedure', 1, arguments);
			  check(aState, styleHandler, isFunction, 'on-draw', 'procedure', 2, arguments);
			  aState.v = new (WorldConfigOption.extend({
				    init: function() {
					this._super('on-draw');
				    },
				    configure: function(config) {
					return config.updateAll({'onDraw': domHandler,
								 'onDrawCss': styleHandler});
				    }
				}))();
		      }) ]);


PRIMITIVES['initial-effect'] =
    new PrimProc('initial-effect',
		 1,
		 false, false,
		 function(effect) {
		     return new (WorldConfigOption.extend({
				 init: function() {
				     this._super("initial-effect");
				 },
				 configure: function(config) {
					return config.updateAll({'initialEffect': effect});
				 }
			     }))();
		 });



/**************************
 *** Jsworld Primitives ***
 **************************/


var jsp = function(attribList) {
	checkListOf(attribList, function(x) { return isList(x) && length(x) == 2; },
		    'js-p', 'list of (list of X Y)', 1);
	var attribs = assocListToHash(attribList);
	var node = jsworld.MobyJsworld.p(attribs);
	node.toWrittenString = function(cache) { return "(js-p)"; };
	node.toDisplayedString = node.toWrittenString;
	node.toDomNode = function(cache) { return node; };
	return helpers.wrapJsObject(node);
};
PRIMITIVES['js-p'] =
    new CasePrimitive('js-p',
	[new PrimProc('js-p', 0, false, false, function() { return jsp(types.EMPTY); }),
	 new PrimProc('js-p', 1, false, false, jsp)]);


var jsdiv = function(attribList) {
	checkListOf(attribList, isAssocList, 'js-div', '(listof X Y)', 1);

	var attribs = assocListToHash(attribList);
	var node = jsworld.MobyJsworld.div(attribs);
	
	node.toWrittenString = function(cache) { return "(js-div)"; };
	node.toDisplayedString = node.toWrittenString;
	node.toDomNode = function(cache) { return node; };
	return helpers.wrapJsObject(node);
};
PRIMITIVES['js-div'] =
    new CasePrimitive('js-div',
	[new PrimProc('js-div', 0, false, false, function() { return jsdiv(types.EMPTY); }),
	 new PrimProc('js-div', 1, false, false, jsdiv)]);


var jsButtonBang = function(funName) {
	return function(worldUpdateF, effectF, attribList) {
		check(undefined, worldUpdateF, isFunction, funName, 'procedure', 1);
		check(undefined, effectF, isFunction, funName, 'procedure', 2);
		checkListOf(attribList, isAssocList, funName, '(listof X Y)', 3);

		var attribs = attribList ? assocListToHash(attribList) : {};
		var node = jsworld.MobyJsworld.buttonBang(worldUpdateF, effectF, attribs);

		node.toWrittenString = function(cache) { return '(' + funName + ' ...)'; };
		node.toDisplayedString = node.toWrittenString;
		node.toDomNode = function(cache) { return node; };
		return helpers.wrapJsObject(node);
	}
};
var jsButton = function(updateWorldF, attribList) {
	var noneF = new types.PrimProc('', 1, false, false, function(w) { return types.EMPTY; });
	return jsButtonBang('js-button')(updateWorldF, noneF, attribList);
};
PRIMITIVES['js-button'] =
    new CasePrimitive('js-button',
	[new PrimProc('js-button', 1, false, false, jsButton),
	 new PrimProc('js-button', 2, false, false, jsButton)]);

PRIMITIVES['js-button!'] =
    new CasePrimitive('js-button!',
	[new PrimProc('js-button!', 2, false, false, jsButtonBang('js-button!')),
	 new PrimProc('js-button!', 3, false, false, jsButtonBang('js-button!'))]);



var jsInput = function(type, updateF, attribList) {
	check(aState, type, isString, 'js-input', 'string', 1);
	check(aState, updateF, isFunction, 'js-input', 'procedure', 2);
	checkListOf(attribList, isAssocList, 'js-input', '(listof X Y)', 3);

	var attribs = attribList ? assocListToHash(attribList) : {};
	var node = jsworld.MobyJsworld.input(type, updateF, attribs);

	node.toWrittenString = function(cache) { return "(js-input ...)"; }
	node.toDisplayedString = node.toWrittenString;
	node.toDomNode = function(cache) { return node; }
	return helpers.wrapJsObject(node);
};
PRIMITIVES['js-input'] =
	new CasePrimitive('js-input', 
	[new PrimProc('js-input', 2, false, false, jsInput),
	 new PrimProc('js-input', 3, false, false, jsInput)]);



var jsImg = function(src, attribList) {
	check(aState, src, isString, "js-img", "string", 1);
	checkListOf(attribList, isAssocList, 'js-img', '(listof X Y)', 2);

	var attribs = assocListToHash(attribList);
	var node = jsworld.MobyJsworld.img(src, attribs);

	node.toWrittenString = function(cache) { return "(js-img ...)"; }
	node.toDisplayedString = node.toWrittenString;
	node.toDomNode = function(cache) { return node; }
	return helpers.wrapJsObject(node);
};
PRIMITIVES['js-img'] =
    new CasePrimitive('js-img',
	[new PrimProc('js-img', 1, false, false, function(src) { return jsImg(src, types.EMPTY); }),
	 new PrimProc('js-img', 2, false, false, jsImg)]);



PRIMITIVES['js-text'] =
    new PrimProc('js-text',
		 1,
		 false, true,
		 function(aState, s) {
		 	check(aState, s, isString, 'js-text', 'string', 1);

			var node = jsworld.MobyJsworld.text(s, []);
			node.toWrittenString = function(cache) { return "(js-text ...)"; }
			node.toDisplayedString = node.toWrittenString;
			node.toDomNode = function(cache) { return node; }
			return helpers.wrapJsObject(node);
		 });


var jsSelect = function(optionList, updateF, attribList) {
	checkListOf(optionList, isString, 'js-select', 'listof string', 1);
	check(aState, updateF, isFunction, 'js-select', 'procedure', 2);
	checkListOf(attribList, isAssocList, 'js-select', '(listof X Y)', 3);

	var attribs = attribList ? assocListToHash(attribList) : {};
	var options = helpers.deepListToArray(optionList);
	var node = jsworld.MobyJsworld.select(options, updateF, attribs);

	node.toWrittenString = function(cache) { return '(js-select ...)'; };
	node.toDisplayedString = node.toWrittenString;
	node.toDomNode = function(cache) { return node; };
	return helpers.wrapJsObject(node);
};
PRIMITIVES['js-select'] =
    new CasePrimitive('js-select',
	[new PrimProc('js-select', 2, false, false, jsSelect),
	 new PrimProc('js-select', 3, false, false, jsSelect)]);



PRIMITIVES['big-bang'] =
PRIMITIVES['js-big-bang'] =
    new PrimProc('js-big-bang',
		 1,
		 true, true,
		 function(aState, initW, handlers) {
		 	arrayEach(handlers,
				function(x, i) {
					check(aState, x, function(y) { return isWorldConfigOption(y) || isList(y) || types.isWorldConfig(y); },
					      'js-big-bang', 'handler or attribute list', i+2);
				});
		     var unwrappedConfigs = 
			 helpers.map(function(x) {
					if ( isWorldConfigOption(x) ) {
						return function(config) { return x.configure(config); };
					}
					else {
						return x;
					}
			 	     },
				     handlers);
		     aState.v = PAUSE(function(restarter, caller) {
			 var bigBangController;
			 var onBreak = function() {
			     bigBangController.breaker();
			 }
			 state.addBreakRequestedListener(onBreak);
			 bigBangController = jsworld.MobyJsworld.bigBang(initW, 
						     state.getToplevelNodeHook()(),
						     unwrappedConfigs,
						     caller, 
						     function(v) {
							 state.removeBreakRequestedListener(onBreak);
							 restarter(v);
						     });
		     })
		 });


//////////////////////////////////////////////////////////////////////


    var emptyPage = function(attribList) {
	checkListOf(attribList, isAssocList, 'empty-page', '(listof X Y)', 1);

	var attribs = assocListToHash(attribList);
	var node = jsworld.MobyJsworld.emptyPage(attribs);
	
// 	node.toWrittenString = function(cache) { return "(js-div)"; };
// 	node.toDisplayedString = node.toWrittenString;
// 	node.toDomNode = function(cache) { return node; };
// 	return helpers.wrapJsObject(node);
	return node;
    };

    PRIMITIVES['empty-page'] =
	new CasePrimitive('empty-page',
			  [new PrimProc('empty-page', 0, false, false, 
					function() {  return emptyPage(types.EMPTY); }),
			   new PrimProc('empty-page', 1, false, false, emptyPage)]);

    
    PRIMITIVES['place-on-page'] = 
	new PrimProc('empty-page',
		     4,
		     false, false,
		     function(elt, left, top, page) {
			 // FIXME: add type checking
			 return jsworld.MobyJsworld.placeOnPage(
			     elt, left, top, page);
		     });
					    




//////////////////////////////////////////////////////////////////////





PRIMITIVES['make-world-config'] =
    new PrimProc('make-world-config',
		 2,
		 true, true,
		 function(aState, startup, shutdown, handlers) {
		 	var allArgs = [startup, shutdown].concat(handlers);
		 	check(aState, startup, isFunction, 'make-world-config', 'procedure', 1, allArgs);
			check(aState, shutdown, procArityContains(1), 'make-world-config', 'procedure (arity 1)', 2, allArgs);
			arrayEach(handlers, function(x, i) { check(aState, x, isFunction, 'make-world-config', 'handler', i+3, allArgs); });

			if ( !procArityContains(handlers.length)(startup) ) {
				raise( types.incompleteExn(
					types.exnFailContract,
					'make-world-config: 1st argument must have arity equal to '
					+ 'the number of arguments after the second',
					[]) );
			}

			aState.v = types.worldConfig(startup, shutdown, handlers);
		 });


PRIMITIVES['make-effect-type'] =
	makeOptionPrimitive(
	    'make-effect-type',
	    4,
	    [false],
	    true,
	    function(userArgs, aState, name, superType, fieldCnt, impl, guard) {
		check(aState, name, isSymbol, 'make-effect-type', 'string', 1, userArgs);
		check(aState, superType, function(x) { return x === false || types.isEffectType(x) },
		      'make-effect-type', 'effect type or #f', 2, userArgs);
		check(aState, fieldCnt, isNatural, 'make-effect-type', 'exact non-negative integer', 3, userArgs);
		check(aState, impl, isFunction, 'make-effect-type', 'procedure', 4, userArgs);
//		checkListOf(handlerIndices, isNatural, 'make-effect-type', 'exact non-negative integer', 5);
		check(aState, guard, function(x) { return x === false || isFunction(x); }, 'make-effect-type', 'procedure or #f', 6, userArgs);
		// Check the number of arguments on the guard
		var numberOfGuardArgs = fieldCnt + 1 + (superType ? superType.numberOfArgs : 0);
		if ( guard && !procArityContains(numberOfGuardArgs)(guard) ) {
			raise(types.incompleteExn(
				types.exnFailContract,
				helpers.format(
					'make-effect-type: guard procedure does not accept ~a arguments '
					+ '(one more than the number constructor arguments): ~s',
					[numberOfGuardArgs, guard]),
				[]));
		}

//		var jsImpl = schemeProcToJs(aState, impl);
		var jsGuard = (guard ? schemeProcToJs(aState, guard) : false);
//		var handlerIndices_js = helpers.map(jsnums.toFixnum, helpers.schemeListToArray(handlerIndices));

//		var caller = makeCaller(aState);
//		var wrapHandler = function(handler, changeWorld) {
//			return types.jsObject('function', function() {
//				var externalArgs = arguments;
//				changeWorld(function(w, k) {
//					var args = [w];
//					for (var i = 0; i < externalArgs.length; i++) {
//						args.push( helpers.wrapJsObject(externalArgs[i]) );
//					}
//					caller(handler, args, k);
//				});
//			});
//		}

		var anEffectType = types.makeEffectType(name.toString(),
							superType,
							fieldCnt,
							impl,
//							handlerIndices_js,
							jsGuard,
							makeCaller(aState));
		aState.v = getMakeStructTypeReturns(anEffectType);
	    });


PRIMITIVES['effect-type?'] = new PrimProc('effect-type?', 1, false, false, types.isEffectType);
PRIMITIVES['effect?'] = new PrimProc('effect?', 1, false, false, types.isEffect);

//PRIMITIVES['make-effect:do-nothing'] = new PrimProc('make-effect:do-nothing', 0, false, false, types.EffectDoNothing.constructor);
//PRIMITIVES['effect:do-nothing?'] = new PrimProc('effect:do-nothing?', 1, false, false, types.EffectDoNothing.predicate);


PRIMITIVES['make-render-effect-type'] =
	makeOptionPrimitive(
	    'make-render-effect-type',
	    4,
	    [false],
	    true,
	    function(userArgs, aState, name, superType, fieldCnt, impl, guard) {
		check(aState, name, isSymbol, 'make-render-effect-type', 'string', 1, userArgs);
		check(aState, superType, function(x) { return x === false || types.isEffectType(x) },
		      'make-render-effect-type', 'effect type or #f', 2, userArgs);
		check(aState, fieldCnt, isNatural, 'make-render-effect-type', 'exact non-negative integer', 3, userArgs);
		check(aState, impl, isFunction, 'make-render-effect-type', 'procedure', 4, userArgs);
		check(aState, guard, function(x) { return x === false || isFunction(x); }, 'make-render-effect-type', 'procedure or #f', 6, userArgs);
		// Check the number of arguments on the guard
		var numberOfGuardArgs = fieldCnt + 1 + (superType ? superType.numberOfArgs : 0);
		if ( guard && !procArityContains(numberOfGuardArgs)(guard) ) {
			raise(types.incompleteExn(
				types.exnFailContract,
				helpers.format(
					'make-effect-type: guard procedure does not accept ~a arguments '
					+ '(one more than the number constructor arguments): ~s',
					[numberOfGuardArgs, guard]),
				[]));
		}
		var jsGuard = (guard ? schemeProcToJs(aState, guard) : false);

		var aRenderEffectType = types.makeRenderEffectType(name.toString(),
								   superType,
								   fieldCnt,
								   impl,
								   jsGuard);
		aState.v = getMakeStructTypeReturns(aRenderEffectType);
	    });


PRIMITIVES['render-effect-type?'] = new PrimProc('render-effect-type?', 1, false, false, types.isRenderEffectType);
PRIMITIVES['render-effect?'] = new PrimProc('render-effect?', 1, false, false, types.isRenderEffect);


PRIMITIVES['world-with-effects'] =
    new PrimProc('world-with-effects',
		 2,
		 false, true,
		 function(aState, effects, w) {
		 	check(aState, effects, isCompoundEffect, 'world-with-effects', 'compound effect', 1, arguments);

			aState.v = jsworld.Jsworld.with_multiple_effects(w, helpers.flattenSchemeListToArray(effects));
		 });



PRIMITIVES['make-render-effect'] = new PrimProc('make-render-effect', 2, false, false, types.makeRenderEffect);

PRIMITIVES['render-effect?'] = new PrimProc('render-effect?', 1, false, false, types.isRenderEffect);

PRIMITIVES['render-effect-dom-node'] =
    new PrimProc('render-effect-dom-node',
		 1,
		 false, true,
		 function(aState, effect) {
		 	check(aState, effect, types.isRenderEffect, 'render-effect-dom-node', 'render-effect', 1);
			aState.v = types.renderEffectDomNode(effect);
		 });

PRIMITIVES['render-effect-effects'] =
    new PrimProc('render-effect-effects',
		 1,
		 false, true,
		 function(aState, effect) {
		 	check(aState, effect, types.isRenderEffect, 'render-effect-effects', 'render-effect', 1);
			aState.v = types.renderEffectEffects(effect);
		 });





/********************************
 *** Scheme -> Javascript FFI ***
 ********************************/

PRIMITIVES['scheme->prim-js'] =
    new PrimProc('scheme->prim-js',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, function(y) { return ( isReal(y) ||
							isString(y) ||
							isSymbol(y) ||
							isChar(y) ||
							isBoolean(y) ) ||
							isVector(y); },
			      'scheme->prim-js', 'real number, string, symbol, char, boolean, or vector', 1);

			var returnVal;
		 	if ( isReal(x) ) {
				if ( !( jsnums.equals(x, jsnums.nan) ||
					jsnums.equals(x, jsnums.inf) ||
					jsnums.equals(x, jsnums.negative_inf) ) &&
				     ( jsnums.greaterThan(x, 9e15) ||
				       jsnums.lessThan(x, -9e15) ) ) {
					raise(types.incompleteExn(
						types.exnFailContract,
						helpers.format('scheme->primitive-js: only numbers in [-9e15, 9e15] '
								+ 'are accurately representable in javascript; given: ~s',
							       [x]),
						[]));
				}
				returnVal = jsnums.toFixnum(x);
			}
			else if ( isString(x) ) {
				returnVal = x.toString();
			}
			else if ( isSymbol(x) || isChar(x) ) {
				returnVal = x.val;
			}
			else if ( isBoolean(x) ) {
				returnVal = x;
			}
			else if ( isVector(x) ) {
				returnVal = x.elts.slice(0);
			}
			aState.v = helpers.wrapJsObject(returnVal);
		 });


PRIMITIVES['prim-js->scheme'] =
    new PrimProc('prim-js->scheme',
		 1,
		 false, true,
		 function(aState, x) {
		 	check(aState, x, function(y) { return isJsObject(y) &&
						      ( typeof(y.obj) == 'number' ||
							typeof(y.obj) == 'string' ||
							typeof(y.obj) == 'boolean' ||
							typeof(y.obj) == 'function' ||
							y.obj instanceof Array ); },
			      'prim-js->scheme', 'javascript number, string, boolean, function, or array', 1);

		 	if ( typeof(x.obj) === 'number' ) {
				aState.v = types['float'](x.obj);
				return;
			}
			else if ( typeof(x.obj) === 'string' || typeof(x.obj) === 'boolean' ) {
				aState.v = x.obj;
				return;
			}
			else if ( typeof(x.obj) === 'function' ) {
				aState.v = new PrimProc('', 0, true, false, function(args) { return x.obj.apply(null, args); });
				return;
			}
			else if ( x.obj instanceof Array ) {
				aState.v = types.vector(x.obj.slice(0));
			}
		 });


PRIMITIVES['procedure->cps-js-fun'] =
    new PrimProc('procedure->cps-js-fun',
		 1,
		 false, true,
		 function(aState, proc) {
		 	check(aState, proc, isFunction, 'procedure->cps-js-fun', 'procedure', 1);

			var caller = makeCaller(aState);
			aState.v = types.jsObject(proc.name + ' (cps)', function() {
				var args = helpers.map(helpers.wrapJsObject, arguments);
				var k = (args.length == 0 ? function() {} : args.shift());

				caller(proc, args, k);
			});
		 });


PRIMITIVES['procedure->void-js-fun'] =
    new PrimProc('procedure->void-js-fun',
		 1,
		 false, true,
		 function(aState, proc) {
		 	check(aState, proc, isFunction, 'procedure->void-js-fun', 'procedure', 1);

			var caller = makeCaller(aState);
			aState.v = types.jsObject(proc.name + ' (void)', function() {
				var args = helpers.map(helpers.wrapJsObject, arguments);
				caller(proc, args, function() {});
			});
		 });


PRIMITIVES['js-==='] =
    new PrimProc('js-===',
		 2,
		 false, true,
		 function(aState, v1, v2) {
		 	check(aState, v1, isJsObject, 'js-===', 'javascript value', 1);
			check(aState, v2, isJsObject, 'js-===', 'javascript value', 2);

			aState.v = v1.obj === v2.obj;
		 });


PRIMITIVES['js-get-named-object'] =
    new PrimProc('js-get-named-object',
		 1,
		 false, true,
		 function(aState, name) {
		 	check(aState, name, isString, 'js-get-named-object', 'string', 1);

			var nameStr = name.toString();
			var obj = (nameStr === 'window') ? window : window[nameStr];
			aState.v = types.jsObject(nameStr, obj);
		 });



PRIMITIVES['js-get-field'] =
    new PrimProc('js-get-field',
		 2,
		 true, true,
		 function(aState, root, firstSelector, selectors) {
		 	selectors.unshift(firstSelector);
			var allArgs = [root].concat(selectors);
		 	check(aState, root, isJsObject, 'js-get-field', 'js-object', 1, allArgs);
			arrayEach(selectors, function(x, i) { check(aState, x, isString, 'js-get-field', 'string', i+2, allArgs); });

			var name = [root.name];
			var obj = root.obj;

			for (var i = 0; i < selectors.length; i++) {
				if ( obj === undefined ) {
					var joinedName = name.join('');
					raise(types.incompleteExn(
						types.exnFailContract,
						helpers.format('js-get-field: tried to access field ~a of ~a, but ~a was undefined',
							       [selectors[i], joinedName, joinedName]),
						[]));
				}
				name.push( '["' + selectors[i].toString() + '"]' );
				obj = obj[selectors[i].toString()];
			}
			aState.v = types.jsObject(name.join(''), obj);
		 });


PRIMITIVES['js-set-field!'] =
    new PrimProc('js-set-field!',
		 3,
		 false, true,
		 function(aState, obj, field, val) {
		 	check(aState, obj, function(x) { return isJsObject(x) && typeof(x.obj) == 'object'; },
			      'js-set-field!', 'javascript object', 1, arguments);
			check(aState, field, isString, 'js-set-field!', 'string', 2, arguments);

			obj.obj[field.toString()] = (isJsObject(val) ? val.obj : val);
			aState.v = types.VOID;
		 });


PRIMITIVES['js-typeof'] =
    new PrimProc('js-typeof',
		 1,
		 false, true,
		 function(aState, jsObj) {
		 	check(aState, jsObj, isJsObject, 'js-typeof', 'js-object', 1);
			aState.v = typeof(jsObj.obj);
		 });


PRIMITIVES['js-instanceof'] =
    new PrimProc('js-instanceof',
		 2,
		 false, true,
		 function(aState, obj, type) {
		 	check(aState, obj, isJsObject, 'js-instanceof', 'js-object', 1, arguments);
			check(aState, type, isJsFunction, 'js-instanceof', 'javascript function', 2, arguments);

			aState.v = (obj.obj instanceof type.obj);
		 });


PRIMITIVES['js-call'] =
    new PrimProc('js-call',
		 2,
		 true, true,
		 function(aState, fun, parent, initArgs) {
		 	var allArgs = [fun, parent].concat(initArgs);
		 	check(aState, fun, isJsFunction, 'js-call', 'javascript function', 1, allArgs);
			check(aState, parent, function(x) { return (x === false ||
							    (isJsObject(x) && typeof(x.obj) == 'object')); },
			      'js-call', 'javascript object or false', 2, allArgs);
			
			var args = helpers.map(function(x) { return (isJsObject(x) ? x.obj : x); }, initArgs);
			var thisArg = parent ? parent.obj : null;
			var jsCallReturn = fun.obj.apply(thisArg, args);
			if ( jsCallReturn === undefined ) {
				aState.v = types.VOID;
				return;
			}
			else {
				aState.v = helpers.wrapJsObject(jsCallReturn);
			}
		 });


PRIMITIVES['js-new'] =
    new PrimProc('js-new',
		 1,
		 true, true,
		 function(aState, constructor, initArgs) {
		 	check(aState, constructor, isJsFunction, 'js-new', 'javascript function', 1);

			var args = helpers.map(function(x) { return (isJsObject(x) ? x.obj : x); }, initArgs);
			var proxy = function() {
				constructor.obj.apply(this, args);
			};
			proxy.prototype = constructor.obj.prototype;

			aState.v = helpers.wrapJsObject(new proxy());
		 });


PRIMITIVES['js-make-hash'] =
    new CasePrimitive('js-make-hash',
	[new PrimProc('js-make-hash', 0, false, false, function() { return types.jsObject('hash', {}); }),
	 new PrimProc('js-make-hash',
		      1,
		      false, false,
		      function(bindings) {
			  checkListOf(bindings, function(x) { return isAssocList(x) && isString(x.first()); },
				      'js-make-hash', '(listof string X)', 1);

			  var ret = {};
			  while ( !bindings.isEmpty() ) {
			  	var key = bindings.first().first().toString();
				var val = bindings.first().rest().first();
				ret[key] = (isJsObject(val) ? val.obj : val);
				bindings = bindings.rest();
			  }
			  return types.jsObject('hash', ret);
		      }) ]);




/***************************
 *** Primitive Constants ***
 ***************************/


PRIMITIVES['eof'] = types.EOF;
PRIMITIVES['e'] = jsnums.e;
PRIMITIVES['empty'] = types.EMPTY;
PRIMITIVES['false'] = false;
PRIMITIVES['true'] = true;
PRIMITIVES['pi'] = jsnums.pi;
PRIMITIVES['null'] = types.EMPTY;

//PRIMITIVES['effect:do-nothing'] = types.EffectDoNothing;

PRIMITIVES['js-undefined'] = types.jsObject('undefined', undefined);
PRIMITIVES['js-null'] = types.jsObject('null', null);




/////////////////////////////////////////////////////////////////////////////////////////////

// getPrimitive: string (string | undefined) -> scheme-value
primitive.getPrimitive = function(name, resolvedModuleName) {
    // FIXME: add special logic here for teachpacks.

    return PRIMITIVES[name];
};

primitive.isPrimitive = function(x) {
    return x instanceof PrimProc;
};

primitive.addPrimitive = function(name, aPrim) {
    PRIMITIVES[name] = aPrim;
};

primitive.Primitive = PrimProc;
primitive.CasePrimitive = CasePrimitive;


primitive.setCALL = setCALL;
primitive.setPAUSE = setPAUSE;

}
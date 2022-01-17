function(state, primitiveValue, operandValues, n) {
    var args = [];

    if (primitiveValue.usesState) {
	args.push(state);
    }

    if (n < primitiveValue.numParams) {
//	throw new Error("arity error: expected at least "
//			+ primitiveValue.numParams + " arguments, but "
//			+ "received " + n + " arguments instead.");
    var i;
    }
    if (primitiveValue.isRest) {
	for(i = 0; i < primitiveValue.numParams; i++) {
	    args.push(operandValues.shift());
	}
	var restArgs = [];
	for(i = 0; i < n - primitiveValue.numParams; i++) {
	    restArgs.push(operandValues.shift());
	}
	args.push(restArgs);
    } else {
	if (primitiveValue.numParams !== n) {
//	    throw new Error("arity error: expected " 
//			    + primitiveValue.numParams 
//			    + " but received " + n);
	}
	for(i = 0; i < primitiveValue.numParams; i++) {
	    args.push(operandValues.shift());
	}
    }
    return args;
}
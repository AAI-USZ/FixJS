function(state, procValue, operandValues, n) {
    var argCount = 0;
    if (procValue.isRest) {
	var restArg = types.EMPTY;
	for (var i = 0; i < n - procValue.numParams ; i++) {
	    restArg = types.cons(operandValues.pop(), restArg);
	}
	state.pushValue(restArg);
	argCount++;
    }	
    for (var i = operandValues.length -1; i >= 0; i--) {
	state.pushValue(operandValues[i]);
	argCount++;
    }
    for(var i = procValue.closureVals.length-1; i >= 0; i--) {
	state.pushValue(procValue.closureVals[i]);
	argCount++;
    }
    return argCount;
}
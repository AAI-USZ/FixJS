function(aState, n, procValue, operands) {
    var getArgStr = function() {
	var argStr = '';
	if (operands.length > 0) {
		var argStrBuffer = [':'];
		for (var i = 0; i < operands.length; i++) {
			argStrBuffer.push( types.toWrittenString(operands[i]) );
		}
		argStr = argStrBuffer.join(' ');
	}
	return argStr;
    }
    
    var getArgColoredParts = function(locations) {
	var argColoredParts = [];
	var locs = locations;
	if (operands.length > 0) {
		for (var i = 0; i < operands.length; i++) {
			argColoredParts.push(new types.ColoredPart(operands[i]+" ", locs.first()));
			locs = locs.rest();
		}
	}
	return argColoredParts;
    }

    if ( !types.isFunction(procValue) ) {
	    var argStr = getArgStr('; arguments were:');
       var positionStack = 
        state.captureCurrentContinuationMarks(aState).ref(
            types.symbol('moby-application-position-key'));
        
       
        var locationList = positionStack[positionStack.length - 1];
        var argColoredParts = getArgColoredParts(locationList.rest());



	    helpers.raise(
		types.incompleteExn(types.exnFailContract,

        new types.Message(["function application: expected function, given: ",
                            new types.ColoredPart(procValue, locationList.first()),
                            ((operands.length == 0) ? ' (no arguments)' : '; arguments were '),
                            ((operands.length != 0) ? new types.GradientPart(argColoredParts) : ''),
                            ]),
                             []));

    }

    if (procValue instanceof types.CaseLambdaValue) {
	for (var j = 0; j < procValue.closures.length; j++) {
	    if (n === procValue.closures[j].numParams ||
		(n > procValue.closures[j].numParams && 
		 procValue.closures[j].isRest)) {
		return procValue.closures[j];
	    }
	}
	var acceptableParameterArity = [];
	for (var i = 0; i < procValue.closures.length; i++) {
	    acceptableParameterArity.push(procValue.closures[i].numParams + '');
	}

    var positionStack = 
        state.captureCurrentContinuationMarks(aState).ref(
            types.symbol('moby-application-position-key'));
        
       
        var locationList = positionStack[positionStack.length - 1];
        var argColoredParts = getArgColoredParts(locationList.rest());


//unable to test
	helpers.raise(types.incompleteExn(
		types.exnFailContractArity,
		new types.Message([new types.ColoredPart(procValue.name ? procValue.name : "#<case-lambda-procedure>", locationList.first()),
                           ": expects [",
                           acceptableParameterArity.join(', '),
                           "] arguments, given ",
                           n,
                           new types.GradientPart(argColoredParts)]),	
		[]));
    } else if (procValue instanceof primitive.CasePrimitive) {
	for (var j = 0; j < procValue.cases.length; j++) {
	    if (n === procValue.cases[j].numParams ||
		(n > procValue.cases[j].numParams && 
		 procValue.cases[j].isRest)) {
		return procValue.cases[j];
	    }
	}
	var acceptableParameterArity = [];
	for (var i = 0; i < procValue.cases.length; i++) {
	    acceptableParameterArity.push(procValue.cases[i].numParams + '');
	}
    var positionStack = 
        state.captureCurrentContinuationMarks(aState).ref(
            types.symbol('moby-application-position-key'));
        
       
        var locationList = positionStack[positionStack.length - 1];
        var argColoredParts = getArgColoredParts(locationList.rest());


        //textchange
	helpers.raise(types.incompleteExn(
		types.exnFailContractArity,
		new types.Message([new types.ColoredPart(procValue.name, locationList.first()),
                ": expects ",
                acceptableParameterArity.join(' or '),
                " arguments, given ",
                n,
                ": ",
                new types.GradientPart(argColoredParts)]),
		[]));
    }


    // At this point, procValue must be either a Continuation,
    // Closure, or Primitive.  We check to see that the number of
    // arguments n matches the acceptable number of arguments from the
    // procValue.
    if (procValue instanceof types.ContinuationClosureValue) {
	// The continuation can accept any number of arguments
	return procValue;
    } else {
	if ((n === procValue.numParams) ||
	    (n > procValue.numParams && procValue.isRest)) {
	    return procValue;
	} else {
	    var positionStack = 
		state.captureCurrentContinuationMarks(aState).ref(
		    types.symbol('moby-application-position-key'));
	    
	   
	    var locationList = positionStack[positionStack.length - 1];
	    var argColoredParts = getArgColoredParts(locationList.rest());
	   
	    
	    helpers.raise(types.incompleteExn(
		types.exnFailContractArityWithPosition,
		new types.Message([new types.ColoredPart((''+(procValue.name !== types.EMPTY ? procValue.name : "#<procedure>")), 
							 locationList.first()),
			": expects ", 
			''+(procValue.isRest ? 'at least' : ''),
		        " ",
			((procValue.locs != undefined) ? new types.MultiPart((procValue.numParams + " argument" + 
							  ((procValue.numParams == 1) ? '' : 's')), 
							  procValue.locs.slice(1))
							:
							(procValue.numParams + " argument" + 
							  ((procValue.numParams == 1) ? '' : 's')))
					      ,
  		         " given ",
			n ,
			": ", 
			new types.GradientPart(argColoredParts)]),
		[]));
	}
    }
}
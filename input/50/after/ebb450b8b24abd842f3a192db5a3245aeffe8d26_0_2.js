function(timedInvocationChain, executionState){
		executionState._callback = executionState._method._arguments[0];
		executionState._triggered = executionState._context;
	}
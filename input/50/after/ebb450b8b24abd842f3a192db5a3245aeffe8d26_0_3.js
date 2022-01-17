function(next){
			executionState._triggered = !(waitingElements = waitingElements.not(this)).length && executionState._context;
			timedInvocationChain();
			next();
		}
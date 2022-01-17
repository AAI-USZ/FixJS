function(next){
			if (waitingElements.length && !(waitingElements = waitingElements.not(this)).length) {
				executionState._triggered = executionState._context;
				if (canTrigger)
					timedInvocationChain();
			}
			next();
		}
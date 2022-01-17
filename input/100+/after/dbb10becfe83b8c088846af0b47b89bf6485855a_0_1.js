function(timedInvocationChain, executionState) {
		var canTrigger, queueName,
		waitingElements = jQuery(executionState._context);
		
		executionState._triggered = 0;
		
		if (typeof executionState._method._arguments[0] == "function") {
			executionState._callback = executionState._method._arguments[0];
		} else {
			queueName = executionState._method._arguments[0];
			executionState._callback = executionState._method._arguments[1];
		}
		
		// wait for each element to reach the current end of its queue
		executionState._context.queue(queueName == null ? 'fx' : queueName, function(next){
			if (waitingElements.length && !(waitingElements = waitingElements.not(this)).length) {
				executionState._triggered = executionState._context;
				if (canTrigger)
					timedInvocationChain();
			}
			next();
		});
		canTrigger = true;
	}
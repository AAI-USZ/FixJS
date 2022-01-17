function runTimedInvocationChain(timedInvocationChain, triggeredState, sourceElement) {
		if (triggeredState) {
			/*
			 * Reject triggering if none available.
			 * This can happen during .join() when the FXQ is empty.
			 */
			if (!triggeredState._trigger) {
				return;
			}
			// There was a trigger. Mark the source element as triggered.
			triggeredState._trigger._triggeredElements = !sourceElement || sourceElement === window || triggeredState._trigger._triggeredElements && triggeredState._trigger._triggeredElements.add(sourceElement) || $(sourceElement);
			/*
			 * If this is also the current execution point, then we go on.
			 * Else we have to wait.
			 */
			if (timedInvocationChain._activeExecutionPoint != triggeredState) {
				return;
			}
		}
		for (var executionState, context, method, trigger, isTriggered; executionState = timedInvocationChain._activeExecutionPoint;) {
			// use triggered context in case of triggered execution
			trigger = executionState._trigger;
			isTriggered = trigger && trigger._triggeredElements;
			context = isTriggered && trigger._triggeredElements.length ? trigger._triggeredElements : executionState._context;
			/*
			 * Super-fast copying of current elements into our placeholder object.
			 * This enables re-using our placeholder via $(...)
			 */
			timedInvocationChain._placeholder.length = 0;
			ARRAY.push.apply(timedInvocationChain._placeholder, context);
			
			if (executionState._isChainEnd) {
				if (!timedInvocationChain._ongoingLoops[0]) {
					/*
					 * We've reached the end of our TIC
					 * and there is nothing left to wait.
					 * So we can safely return the original jQuery object.
					 */
					return context; 
				}
				/*
				 * Now we have ongoing loops but reached the chain's end.
				 * If we already waited a bit then we start over right there.
				 */
				if (!timedInvocationChain._openEndLoopTimeout) {
					// start open repeat loop over again at the end of the chain
					timedInvocationChain._activeExecutionPoint = timedInvocationChain._ongoingLoops[0];
					timedInvocationChain._activeExecutionPoint._count++;
					continue;
				}
				break;
			}
			if (trigger) {
				if (isTriggered) {
					gotoNextStep(timedInvocationChain);
				} else {
					break;
				}
			}
			
			method = context[executionState._methodName];
			if (method == wait) {
				(isTriggered ? removeWaitTrigger : setupWaitTrigger)(timedInvocationChain,executionState);
			} else if (method == join) {
				(isTriggered ? removeJoinTrigger : setupJoinTrigger)(timedInvocationChain,executionState);
			} else if (method == then) {
				executionState._callback = executionState._methodArguments[0];
				gotoNextStep(timedInvocationChain);
			} else if (method == repeat) {
				(isTriggered ? resetRepeatTrigger : setupRepeatTrigger)(timedInvocationChain,executionState);
			} else if (method == until && timedInvocationChain._ongoingLoops[0]) {
				if (evaluateUntilCondition(timedInvocationChain, executionState)) {					
					gotoNextStep(timedInvocationChain);
					removeRepeatTrigger(timedInvocationChain);
				} else {
					timedInvocationChain._activeExecutionPoint = timedInvocationChain._ongoingLoops[0];
					timedInvocationChain._activeExecutionPoint._count++;
					continue;
				}
			} else {
				context = method.apply(context, executionState._methodArguments);
				gotoNextStep(timedInvocationChain);
			}			
			timedInvocationChain._activeExecutionPoint._context = context;
		}
	}
function() {
			while (!isRunning) try {
				// keep recursive calls away
				isRunning = !isRunning;
				// save current context state
				if (stepCallback) {
					stepCallback(executionState._context);
				}
				// leave the loop when waiting for a trigger
				if (executionState._triggered == 0) {
					return;
				}
				// check end of chain
				if (executionState._method._name) {
					// check if user tries to use a non-existing function call
					if (!executionState._context[executionState._method._name]) {
						throw 'no such method: '+executionState._method._name;
					}
					// check whether we came here triggered or not
					executionState = executionState._triggered ?
						/*
						 * There was some timing method that fulfilled its condition to go on to the next step.
						 * We use the triggered context as next context.
						 */
						{
							_context: executionState._triggered,
							// apply callback method before resetting _triggered
							_next: typeof executionState._callback == "function" &&
								executionState._callback.apply(executionState._triggered, jQuery(ongoingLoops).map(function(){
									return this._count;
								}).get()),
							// reset _triggered here - just for the case of repeat loop states
							_method: (executionState._triggered = 0) || executionState._method._next
						} :
						// check whether we have a timing enabled method
						executionState._context[executionState._method._name].timing ?
							/*
							 * Some timing method wants to get handled now.
							 */
							executionState._context[executionState._method._name].timing(timedInvocationChain, executionState, ongoingLoops) || executionState :
							/*
							 * Default case: no timing method.
							 * Just invoke method and use the return value as new context.
							 */
							{
								_context: executionState._context[executionState._method._name].apply(executionState._context, executionState._method._arguments),
								_method: executionState._method._next
							}
				} else {
					if (!ongoingLoops.length) {
						/*
						 * We've reached the end of our TIC
						 * and there is nothing left to wait for.
						 * So we can safely return the original jQuery object
						 * hence enabling instant invocation.
						 */
						return executionState._context; 
					}
					/*
					 * Now we have ongoing loops but reached the chain's end.
					 * If we already waited a bit then we start over right there.
					 */
					if (!openEndLoopAllowed) {
						return;
					}
					// start open repeat loop over again at the end of the chain
					executionState = ongoingLoops[0]._openEndAction();
				}
			} finally {
				isRunning = !isRunning;
			}
		}
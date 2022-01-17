function timedInvocationChain() {
			while (true) {
				if (stepCallback) {
					stepCallback(executionState._context);
				}
				
				if (executionState._triggered == 0) {
					return;
				}
				if (executionState._method._name) {
					method = executionState._context[executionState._method._name];
					if (!method) {
						throw 'no such method: '+executionState._method._name;
					}
					executionState = executionState._triggered ?
						/*
						 * There was some timing method that fulfilled its condition
						 * to go on to the next step.
						 * We use the _triggered context as next context.
						 */
						{
							_context: executionState._triggered,
							_next: typeof executionState._callback == "function" &&
								executionState._callback.apply(executionState._triggered, jQuery(ongoingLoops).map(function(){
									return this._count;
								}).get()),
							// reset _triggered here - just for the case of repeat loop states
							_method: (executionState._triggered = 0) || executionState._method._next
						} :
						method._timing ?
							method._timing(timedInvocationChain, executionState, ongoingLoops) || executionState :
							{
								_context: method.apply(executionState._context, executionState._method._arguments),
								_method: executionState._method._next
							};
				} else {
					if (!ongoingLoops[0]) {
						/*
						 * We've reached the end of our TIC
						 * and there is nothing left to wait.
						 * So we can safely return the original jQuery object.
						 */
						return executionState._context; 
					}
					/*
					 * Now we have ongoing loops but reached the chain's end.
					 * If we already waited a bit then we start over right there.
					 */
					if (openEndLoopTimeout) {
						return;
					}
					// start open repeat loop over again at the end of the chain
					executionState = until._timing(timedInvocationChain, false, ongoingLoops);
				}
			}
		}
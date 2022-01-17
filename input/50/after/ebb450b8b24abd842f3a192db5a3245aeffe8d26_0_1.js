function(isEnd){
				if (!triggerAction || isEnd) {
					executionState._context.unbind('__unrepeat__', unrepeatAction);
				} else {
					executionState._triggered = executionState._context;
				}
			}
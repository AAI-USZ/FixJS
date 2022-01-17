function(isEnd){
				if (!isEnd && triggerAction) {
					executionState._triggered = executionState._context;
				} else {
					executionState._context.unbind('__unrepeat__', unrepeatAction);
				}
			}
function(element, eventName, memo, bubble) {
			if (eventName.indexOf(':') > 0) {
				oldjQueryTrigger(eventName, memo ? [memo] : null, element, Object.isUndefined(bubble) ? false : !bubble);
			}
			oldPrototypeFire(element, eventName, memo, bubble);
		}
function(element, eventName, handler) {
		if (element.addEventListener) {
			element.addEventListener(eventName, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + eventName, handler);
		} else {
			element['on' + eventName] = handler;
		}
	}
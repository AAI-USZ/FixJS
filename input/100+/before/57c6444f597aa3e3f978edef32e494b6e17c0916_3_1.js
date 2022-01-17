function(event) {
		/* 
		 * As a click event occurs whenever there is a drag operation,
		 * in order to avoid this click event propagate to any ancestor
		 * element (bubble effect), it needs to be handled here and
		 * stopped from propagation. 
		 */
		event.stopPropagation();
		object2D.trigger(UserEvents.click, {event: event});
	}
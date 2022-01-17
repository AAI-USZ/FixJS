function(name, target, event) {
	listeners[name].each(function(element) {
		if (element === target || element.contains(target)) {
			event.targetTouches = event.changedTouches = event.touches = [{
				identifier: String.uniqueID(),
				target: target,
				pageX: event.page.x,
				pageY: event.page.y,
				clientX: event.client.x,
				clientY: event.client.y
			}];
			element.fireEvent(name, event);
		}
	});
}
function(events, elementID, eventHandler, buf) {
		eventHandlers[elementID] = {"events": events, "handler": eventHandler};
		buf.push("<!--" + eventHandler.toString() + "-->");
	}
function() {
	return this.hasEvent(goog.events.EventType.DRAGSTART) && this.hasEvent(goog.events.EventType.DROP);
}
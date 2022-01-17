function(element) {
	var self = this;
	if (!this.lastRequest) {
		return element;
	}
	if (this.lastRequest.data.length) {
		if (this.lastRequest.initial) {
			element.empty();
		}
		this._appendRootItems(this.lastRequest.data, element);
	} else {
		this.showMessage({
			"type": "empty",
			"message": this.labels.get("emptyStream")
		}, element);
	}
	if (this.lastRequest.initial && this.config.get("streamStateToggleBy") === "mouseover" && this.config.get("liveUpdates")) {
		element.hover(function() {
			self.setStreamState("paused");
		}, function() {
			self.setStreamState("live");
		});
	}
	this.events.publish({
		"topic": "onReady",
		"data": {"initial": this.lastRequest.initial}
	});
	return element;
}
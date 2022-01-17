function(element) {
	var self = this;
	element = element || this.dom.get("body");
	if (!this.lastRequest) {
		this.showMessage({
			"type": "loading",
			"message": this.labels.get(
				0 && this.isErrorWithTimer(this.error)
					? "retrying"
					: 0 && this.isWaitingForData(this.error)
						? "error_" + this.error.errorCode
						: "loading"
			)
		}, element);
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
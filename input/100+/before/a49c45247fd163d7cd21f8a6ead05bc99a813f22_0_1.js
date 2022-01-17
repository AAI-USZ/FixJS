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
		return;
	}

	if (this.lastRequest.data.length) {
		if (this.lastRequest.initial) element.empty();
		this.appendRootItems(this.lastRequest.data, element);
	} else {
		this.showMessage({
			"type": "empty",
			"message": this.labels.get("emptyStream")
		}, element);
	}
	if (this.lastRequest.initial && this.config.get("streamStateToggleBy") == "mouseover" && this.config.get("liveUpdates")) {
		element.bind({
			"mouseleave": function() {
				self.setStreamState("live");
			},
			"mouseenter": function() {
				self.setStreamState("paused");
			}
		});
	}
	this.events.publish({
		"topic": "Stream.onReady",
		"data": this.prepareBroadcastParams({"initial": this.lastRequest.initial})
	});
}
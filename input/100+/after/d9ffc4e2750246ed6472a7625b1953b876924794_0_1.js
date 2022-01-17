function(force) {
	var self = this;
	if (!this.liveUpdates) return;
	this._stopLiveUpdates();
	if (force) {
		// if live updates requests were forced after some operation, we will
		// perform 3 attempts to get live updates: immediately, in 1 second
		// and in 3 seconds after first one
		this.liveUpdates.timeouts = [0, 1, 3];
	}
	var timeout = this.liveUpdates.timeouts.length
		? this.liveUpdates.timeouts.shift()
		: this.config.get("liveUpdatesTimeout");
	if (this.requestType === "initial" && !this.error && !this.config.get("skipInitialRequest")) {
		this.request({
			"since": self.nextSince
		});
		return;
	} else if (this.requestType === "initial") {
		this.config.get("onData")({}, {
			"requestType": this.requestType
		});
		this.requestType = "secondary";
		return;
	}
	this.liveUpdates.timers.regular = setTimeout(function() {
		self.request({
			"since": self.nextSince
		});
	}, timeout * 1000);
}
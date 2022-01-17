function(response, config) {
	response = response || {};
	if (this.liveUpdates && this.liveUpdates.responseHandler) {
		this.liveUpdates.responseHandler(response);
	}
	this.constructor.parent._onData.apply(this, arguments);
	if (response.result === "error") {
		this._handleErrorResponse(response, {
			"callback": config.onError
		});
		return;
	}
	config.onData(response);
	if (!this.error && this.requestType === "initial") {
		this.requestType = "secondary";
	}
	this._cleanupErrorHandlers(true);
	if (this.requestType === "initial") {
		this.abort();
		return;
	}
	this.nextSince = response.nextSince;
	this._startLiveUpdates();
}
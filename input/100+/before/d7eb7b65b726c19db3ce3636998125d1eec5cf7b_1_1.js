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
		if (this.liveUpdates) {
			this._startLiveUpdates();
		}
		return;
	}
	config.onData(response);
	this.nextSince = response.nextSince;
	this._startLiveUpdates();
}
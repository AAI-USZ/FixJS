function(response, config) {
	response = response || {};
	if (response.result === "error") {
		this._handleErrorResponse(response, {
			"callback": config.onError
		});
		return;
	}
	config.onData(response);
	this.nextSince = response.nextSince;
	if (this.liveUpdates && this.liveUpdates.responseHandler) {
		this.liveUpdates.responseHandler(response);
		this._startLiveUpdates();
	}
}
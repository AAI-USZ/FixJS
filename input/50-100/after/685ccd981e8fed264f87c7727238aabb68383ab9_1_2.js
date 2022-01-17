function(response) {
	response = response || {};
	if (response.result === "error") {
		this._handleErrorResponse(response, {
			"callback": this.config.get("onError")
		});
		return;
	}
	this.nextSince = response.nextSince;
	if (this.liveUpdates && this.liveUpdates.responseHandler) {
		this.liveUpdates.responseHandler(response);
	}
}
function(responseError, config) {
	this.constructor.parent._onData.apply(this, arguments);
	this._handleErrorResponse(responseError, {
		"callback": config.onError
	});
	if (this.liveUpdates) {
		this._startLiveUpdates();
	}
}
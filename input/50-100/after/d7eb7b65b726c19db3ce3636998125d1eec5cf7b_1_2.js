function(responseError, config) {
	this.constructor.parent._onError.apply(this, arguments);
	this._handleErrorResponse(responseError, {
		"callback": config.onError
	});
	if (this.requestType !== "secondary" || !this._isWaitingForData(responseError)) {
		this.abort();
	}
}
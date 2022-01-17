function(response) {
	response = response || {};
	if (response.result === "error") {
		this._handleErrorResponse(response);
	}
	this.nextSince = response.nextSince;
}
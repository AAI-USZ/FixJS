function(response) {
	response = response || {};
	if (response.result === "error") {
		this.handleErrorResponse(response);
	}
	this.nextSince = response.nextSince;
}
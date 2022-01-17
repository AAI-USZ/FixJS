function(data) {
	if (this.config.get("recurring")) {
		this._initLiveUpdates();
		this._startLiveUpdates();
		return;
	}
	this.request(data);
}
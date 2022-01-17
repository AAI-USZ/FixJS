function(force) {
	if (this.config.get("recurring")) {
		if (!this.liveUpdates) {
			this._initLiveUpdates();
		}
		this._startLiveUpdates(force);
		return;
	}
	this.request();
}
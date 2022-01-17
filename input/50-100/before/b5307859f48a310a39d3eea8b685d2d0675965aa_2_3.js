function(args) {
	args = args || {};
	if (this.config.get("recurring")) {
		if (!this.liveUpdates) {
			this._initLiveUpdates();
		}
		this._startLiveUpdates(args.force);
		return;
	}
	this.request(args.data);
}
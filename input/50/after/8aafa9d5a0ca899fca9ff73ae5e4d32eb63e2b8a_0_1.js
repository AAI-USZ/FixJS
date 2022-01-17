function() {
	this.transport && this.transport.abort();
	if (this.liveUpdates) {
		this._stopLiveUpdates();
		delete this.liveUpdates;
	}
}
function(params) {
	var self = this;
	var timeout = this.config.get("timeout");
	if (this.transport) {
		this.transport.send(params);
		if (timeout) {
			this._timeoutId = setTimeout(function() {
				self.config.get("onError")({
					"result": "error",
					"errorCode": "network_timeout"
				});
				self.transport.abort();
			}, timeout * 1000);
		}
	}
}
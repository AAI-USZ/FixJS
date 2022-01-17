function() {
	var request = this.get("request");
	if (!request) {
		request = Echo.StreamServer.API.request({
			"endpoint": "count",
			"data": {
				"q": this.config.get("query"),
				"appkey": this.config.get("appkey")
			},
			"liveUpdatesTimeout": this.config.get("liveUpdatesTimeout"),
			"recurring": true,
			"onError": $.proxy(this._error, this),
			"onData": $.proxy(this._update, this)
		});
		this.set("request", request);
	}
	request.send();
}
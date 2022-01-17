function(config) {
	if (!config || !config.endpoint) return;
	this.config = new Echo.Configuration(config, {
		"apiBaseURL": "api.echoenabled.com/v1/",
		"transport": "jsonp",
		"secure": false
	});
	this.transport = this._getTransport();
}
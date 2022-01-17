function(config) {
	if (!config || !config.endpoint) return;
	this.config = new Echo.Configuration(config, {
		"apiBaseURL": "api.echoenabled.com/v1/",
		"transport": "ajax",
		"secure": false
	});
}
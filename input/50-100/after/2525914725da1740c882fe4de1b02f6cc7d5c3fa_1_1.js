function(data, callback) {
	Echo.StreamServer.API.request({
		"endpoint": "submit",
		"submissionProxyURL": this.component.config.get("submissionProxyURL"),
		"onData": callback,
		"data": data,
	}).send();
}
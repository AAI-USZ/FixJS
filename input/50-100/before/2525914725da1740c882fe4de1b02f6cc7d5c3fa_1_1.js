function(data, callback) {
	Echo.StreamServer.API.request({
		"endpoint": "submit",
		"submissionProxyURL": this.component.config.get("submissionProxyURL"),
		"appkey": this.component.config.get("appkey"),
		"onData": callback,
		"data": data,
		"target-query": this.component.config.get("query", ""),
		"sessionID": this.component.user.get("sessionID", "")
	}).send();
}
function(callback) {
	var req = Echo.StreamServer.API.request({
		"endpoint": "search",
		"data": this.params,
		"recurring": true,
		"onData": function(data) {
			QUnit.ok(data && data.entries,
				"Checking if the \"onData\" callback was executed after the live update request.");
			req.abort();
			callback();
		}
	});
	req.send();
}
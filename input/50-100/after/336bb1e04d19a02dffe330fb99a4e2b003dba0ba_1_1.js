function(callback) {
	var maxCounts = 4, currentCount = 0;
	var req = Echo.StreamServer.API.request({
		"endpoint": "search",
		"data": this.params,
		"liveUpdatesTimeout": 1,
		"recurring": true,
		"onData": function(data) {
			if (maxCounts === ++currentCount) {
				QUnit.ok(data && data.entries,
					"Checking if the \"onData\" callback was executed after the live update request.");
				req.abort();
				callback();
			}
		}
	});
	req.send();
}
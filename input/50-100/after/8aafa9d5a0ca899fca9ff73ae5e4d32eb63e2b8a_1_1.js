function(callback) {
	var req = Echo.StreamServer.API.request({
		"endpoint": "search",
		"data": $.extend({}, this.params),
		"onError": function(data) {
			QUnit.ok(data && data.result === "error" && data.errorCode === "connection_failure", 
				"Checking if the \"onError\" callback was executed when the request aborted");
			callback();
		}
	});
	req.send();
	setTimeout(function() {
		req.abort();
	}, 50);
}
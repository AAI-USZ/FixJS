function(e) {
		console.log("Exception during GCM request: " + e);
		callback("request error", null);
	}
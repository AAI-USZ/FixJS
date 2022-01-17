function(cb) {
	var o1 = this;

	// Build request options
	var options = {
		uri : o1.config.storage,
		headers : {
			'X-Account-Meta-Temp-Url-Key' : o1.options.tempURLKey
		}
	};

	o1._cloudRequest(options, function(err, res, body) {
		cb(err);
	});
}
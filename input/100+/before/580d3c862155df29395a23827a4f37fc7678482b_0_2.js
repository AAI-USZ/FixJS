function(opts, cb) {
	if(!opts) {
		throw new Error("Invalid arguments.");
	}
	if(!opts.key) {
		throw new Error("Spreadsheet key not provided.");
	}
	if(!opts.worksheet) {
		throw new Error("Worksheet not specified.");
	}

	var query = {
	};
	if(opts.range) {
		query["range"] = opts.range;
	}

	getFeed(["cells", opts.key, opts.worksheet], opts.auth, query, function(err, data) {
		if(err) {
			return cb(err);
		}
		
		cb(null, new Cells(data));
	});
}
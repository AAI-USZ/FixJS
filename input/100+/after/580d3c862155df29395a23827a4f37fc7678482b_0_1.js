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

	var query = {};
	if(opts.start) {
		query["start-index"] = opts.start;
	}
	if(opts.num) {
		query["max-results"] = opts.num;
	}
	if(opts.orderby) {
		query["orderby"] = opts.orderby;
	}
	if(opts.reverse) {
		query["reverse"] = opts.reverse;
	}

	getFeed(["list", opts.key, opts.worksheet], opts.auth, query, function(err, data) {
		if(err) {
			return cb(err);
		}

		var rows = [];
		var entries = forceArray(data.entry);
		
		entries.forEach(function(entry) {
			rows.push(new Row(entry));
		});
		
		cb(null, rows);
	});
}
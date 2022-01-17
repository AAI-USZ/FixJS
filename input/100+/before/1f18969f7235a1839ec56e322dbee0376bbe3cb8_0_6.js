function(query, index, comment, fn) {
	if (arguments.length == 2) {
		fn = arguments[1];
		index = '*';
		comment = '';
	}
	else if (arguments.length == 3) {
		fn = arguments[2];
		comment = '';
	} 
	this.AddQuery(query, index, comment)

	this.RunQueries(function(err, results) {
			this._reqs = [] // we won't re-run erroneous batch

			if (err) {
				fn(err, null)
				return
			}
			if (results.length == 0) {
				fn(err, null)
				return
			}
			this._error = results[0].error
			this._warning = results[0].warning
			if (results[0].status == SphinxClient.SEARCHD_ERROR) {
				fn(err, null)
				return
			}
			fn(err, results[0])
	})
	
}
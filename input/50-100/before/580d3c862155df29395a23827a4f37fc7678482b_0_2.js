function(opts, cb) {
	opts = opts || {};
	Spreadsheets.rows({
		key: this.spreadsheet.key,
		auth: this.spreadsheet.auth,
		worksheet: this.id,
		start: opts.start,
		num: opts.num
	}, cb);
}
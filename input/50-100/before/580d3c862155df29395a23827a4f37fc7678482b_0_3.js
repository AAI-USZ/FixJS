function(opts, cb) {
	opts = opts || {};
	Spreadsheets.cells({
		key: this.spreadsheet.key,
		auth: this.spreadsheet.auth,
		worksheet: this.id,
		range: opts.range
	}, cb);
}
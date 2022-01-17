function(opts, cb) {
	opts = opts || {};
	Spreadsheets.cells({
		key: this.spreadsheet.key,
		auth: this.spreadsheet.auth,
		worksheet: this.id,
		range: opts.range,
		maxRow: opts.maxRow,
		minRow: opts.minRow,
		maxCol: opts.maxCol,
		minCol: opts.minCol
	}, cb);
}
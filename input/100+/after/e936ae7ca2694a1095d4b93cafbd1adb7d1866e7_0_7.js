function (op, callback) {
	if (OPs[op] != op)
		return callback(Muggle("Thread not found."));
	var self = this;
	fs.readFile('client/fun.js', 'UTF-8', function (err, funJs) {
		if (err)
			return callback(err);
		cache.funThread = op;
		var m = self.connect().multi();
		self._log(m, op, common.EXECUTE_JS, [funJs]);
		m.exec(callback);
	});
}
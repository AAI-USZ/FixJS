function (cb) {
		var def;
		(cb == null) || callable(cb);
		if (!this.pending) {
			this.pending = [];
		}
		def = deferred();
		this.pending.push(name, [arguments, def.resolve]);
		return def.promise;
	}
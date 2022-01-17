function (value) {
		if (this.resolved) {
			return this.promise;
		}
		this.resolved = true;
		return this.promise._base.resolve(value);
	}
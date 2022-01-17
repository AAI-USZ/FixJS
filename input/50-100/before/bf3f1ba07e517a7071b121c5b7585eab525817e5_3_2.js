function (index, value) {
		if (this.d.promise._base.resolved) {
			return;
		}
		this.result[index] = value;
		if (!--this.waiting && this.initialized) {
			this.d.resolve(this.result);
		}
	}
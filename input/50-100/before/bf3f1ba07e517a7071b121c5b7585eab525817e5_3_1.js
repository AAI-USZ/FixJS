function (index, value) {
		this.processResult(index, value);
		if (!this.d.promise._base.resolved) {
			if (this.held.length) {
				this.held.shift()();
			}
		}
	}
function (index, value) {
		this.processResult(index, value);
		if (!this.d.promise.resolved) {
			if (this.held.length) {
				this.held.shift()();
			}
		}
	}
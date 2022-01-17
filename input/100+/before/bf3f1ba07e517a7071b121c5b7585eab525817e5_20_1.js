function (promise) {
		var previous;
		previous = promise._base;
		this.promise = promise;
		promise._base = this;
		if (previous) {
			if (!--createPromise.unresolved) {
				clearTimeout(unresolvedTimeout);
			}
			if (previous.monitor) {
				clearTimeout(previous.monitor);
			}
			previous.promises.forEach(function (promise) {
				promise._base = this;
			}, this);
			previous.pending.forEach(match.call(this.next), this);
		}
		return promise;
	}
function (promise) {
		var previous, base;
		if ((previous = promise._base)) {
			if (!--createPromise.unresolved) {
				clearTimeout(unresolvedTimeout);
			}
			if (previous.monitor) {
				clearTimeout(previous.monitor);
			}
			previous.promises.forEach(function (promise) {
				promise._base = this;
				this.promises.push(promise);
			}, this);
			push.apply(this.pending, previous.pending);
		}
		this.promises.push(promise);
		promise._base = this;
		return promise;
	}
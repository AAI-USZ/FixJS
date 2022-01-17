function (promise) {
		var previous, base;
		base = dscr('', this);
		previous = promise._base;
		this.promise = promise;
		defineProperty(promise, '_base', base);
		if (previous) {
			if (!--createPromise.unresolved) {
				clearTimeout(unresolvedTimeout);
			}
			if (previous.monitor) {
				clearTimeout(previous.monitor);
			}
			previous.promises.forEach(function (promise) {
				defineProperty(promise, '_base', base);
			}, this);
			previous.pending.forEach(match.call(this.next), this);
		}
		return promise;
	}
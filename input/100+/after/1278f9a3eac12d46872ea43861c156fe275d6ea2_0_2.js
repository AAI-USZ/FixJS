function (promise) {
		var previous, base;
		base = dscr('c', this);
		if ((previous = promise._base)) {
			if (!--createPromise.unresolved) {
				clearTimeout(unresolvedTimeout);
			}
			if (previous.monitor) {
				clearTimeout(previous.monitor);
			}
			previous.promises.forEach(function (promise) {
				defineProperty(promise, '_base', base);
				this.promises.push(promise);
			}, this);
			push.apply(this.pending, previous.pending);
		}
		this.promises.push(promise);
		defineProperty(promise, '_base', base);
		return promise;
	}
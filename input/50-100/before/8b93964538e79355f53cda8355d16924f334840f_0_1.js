function autoHandleError(fn) {
		if (fn.includeError) { return fn; }
		return function (err) {
			if (err) { return this.error(err); }
			var args = slice.call(arguments, 1);
			fn.apply(this, args);
		};
	}
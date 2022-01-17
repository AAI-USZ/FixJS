function (win, fail) {
		var value, cb = this.failed ? fail : win;
		if (cb == null) {
			return this;
		} else if (isCallable(cb)) {
			try {
				value = cb(this.value);
			} catch (e) {
				value = e;
			}
			return createPromise(value);
		} else {
			return createPromise(cb);
		}
	}
function (win, fail, resolve) {
		var value, cb = this.failed ? fail : win;
		if (cb == null) {
			resolve(this.value);
		} else if (isCallable(cb)) {
			try {
				value = cb(this.value);
			} catch (e) {
				value = e;
			}
			resolve(value);
		} else {
			resolve(cb);
		}
	}
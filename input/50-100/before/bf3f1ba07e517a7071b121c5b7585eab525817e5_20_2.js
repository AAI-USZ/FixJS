function (win, fail) {
		if (this.failed) {
			if (fail) {
				fail(this.value);
			} else if (!win || (arguments.length > 1)) {
				throw this.value;
			} else {
				win(this.value);
			}
		} else if (win) {
			if (arguments.length > 1) {
				win(this.value);
			} else {
				win(null, this.value);
			}
		}
	}
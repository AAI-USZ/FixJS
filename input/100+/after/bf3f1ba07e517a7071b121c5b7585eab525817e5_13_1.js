function (win, fail) {
	(win == null) || callable(win);
	(fail == null) || callable(fail);
	if (this.failed) {
		if (arguments.length > 1) {
			if (fail) {
				fail(this.value);
			}
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
	return this;
}
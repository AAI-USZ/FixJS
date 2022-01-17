function (win, fail) {
	(win == null) || callable(win);
	(fail == null) || callable(fail);
	if (win || fail) {
		if (!this.pending) {
			this.pending = [];
		}
		this.pending.push('cb', arguments);
	}
	return this;
}
function (win, fail) {
	(win == null) || callable(win);
	(fail == null) || callable(fail);
	if (win || fail) {
		if (this._base.resolved) {
			b.apply(this._base, arguments);
		} else {
			this._base.next('cb', arguments);
		}
	}
	return this;
}
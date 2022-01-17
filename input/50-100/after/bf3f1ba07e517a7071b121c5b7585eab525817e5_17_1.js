function (win, fail) {
	var def;
	if ((win == null) && (fail == null)) {
		return this;
	}
	if (!this.pending) {
		this.pending = [];
	}
	def = deferred();
	// console.log("ADD PEND", 'match', [win, fail, def.resolve]);
	this.pending.push('match', [win, fail, def.resolve]);
	return def.promise;
}
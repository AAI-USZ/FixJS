function (name) {
	var def;
	if (!this.pending) {
		this.pending = [];
	}
	def = deferred();
	this.pending.push('get', [arguments, def.resolve]);
	return def.promise;

}
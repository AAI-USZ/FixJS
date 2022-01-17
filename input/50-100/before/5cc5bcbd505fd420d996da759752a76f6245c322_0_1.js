function (type, listener) {
	if (!this[pname]) {
		defineProperty(this, pname, d('c', {}));
	}
	if (!this[pname][type]) {
		this[pname][type] = defineProperty([], 'copy', d('', copy));
	}
	this[pname][type].push(listener);
	return this;
}
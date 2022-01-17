function (type, listener) {
	type = String(type);
	callable(listener);

	var index, ls = this[pname] && this[pname][type];
	if (ls && ((index = ls.indexOf(listener)) !== -1)) {
		ls.splice(index, 1);
	}
	ls = this[pname + ' once'] && this[pname + ' once'][type];
	if (ls && ((index = ls[0].indexOf(listener)) !== -1)) {
		ls[0].splice(index, 1);
		off.call(this, type, ls[1][index]);
		ls[1].splice(index, 1);
	}
	return this;
}
function (type, listener) {
	var offt = off.bind(this), nlistener;
	if (!this[pname + ' once']) {
		defineProperty(this, pname + ' once', d('c', {}));
	}
	if (!this[pname + ' once'][type]) {
		this[pname + ' once'][type] = [[], []];
	}
	nlistener = function nlistener() {
		offt(type, listener);
		listener.apply(this, arguments);
	};
	this[pname + ' once'][type][0].push(nlistener[pname + ' listener'] = listener);
	this[pname + ' once'][type][1].push(nlistener);
	return on.call(this, type, nlistener);
}
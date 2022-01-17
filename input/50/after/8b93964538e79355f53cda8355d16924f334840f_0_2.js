function (fn) {
	if (!fn) { return null; }
	var wrapped = function (err) {
		err && fn.apply(this, arguments);
	};
	wrapped.includeError = true;
	return wrapped;
}
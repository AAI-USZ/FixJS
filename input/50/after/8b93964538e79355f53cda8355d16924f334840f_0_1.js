function (fn) {
	if (!fn) { return null; }
	var wrapped = function () {
		fn.apply(this, arguments);
	};
	wrapped.includeError = true;
	return wrapped;
}
function (fn, args, resolve) {
	var value;
	try {
		value = apply.call(fn, this, args);
	} catch (e) {
		value = e;
	}
	resolve(value);
}
function (fn, args, resolve) {
	resolve(silent.call(fn).apply(this, args));
}
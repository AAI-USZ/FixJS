function (fn) {
	fn.returnsPromise = true;
	return defineProperty(fn, 'returnsPromise', descriptor);
}
function (fn) {
	return defineProperty(fn, 'returnsPromise', descriptor);
}
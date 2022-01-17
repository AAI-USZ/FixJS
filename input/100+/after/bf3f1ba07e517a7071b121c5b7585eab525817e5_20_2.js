function (value) {
	var promise, isResolved = arguments.length;

	if (isResolved && isPromise(value)) {
		return value;
	}

	promise = function (win, fail) {
		return promise.then(win, fail);
	};
	if (isResolved) {
		promise.value = value;
		promise.failed = isError(value);
		promise.__proto__ = resolved;
	} else {
		if (!createPromise.unresolvedCount) {
			createPromise.unresolvedTimeout = setTimeout(noop, 1e9);
		}
		++createPromise.unresolvedCount;
		if (createPromise.monitor) {
			promise.monitor = createPromise.monitor();
		}
		promise.__proto__ = unresolved;
	}
	return promise;
}
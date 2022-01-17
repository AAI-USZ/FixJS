function (timeout) {
	var fn, result;
	fn = callable(this);
	result = function () {
		var def = deferred();
		setTimeout(delayed.bind(this, fn, arguments, def.resolve), timeout);
		return def.promise;
	};
	result.returnsPromise = true;
	return result;
}
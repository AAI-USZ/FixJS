function () {
		var d = deferred();
		setTimeout(delayed.bind(this, fn, arguments, d.resolve), timeout);
		return d.promise;
	}
function (cLimit, qLimit) {
	var fn, count, decrement, unload, queue, run;
	fn = callable(this);
	cLimit = max(toUint(cLimit), 1);
	qLimit = ((qLimit == null) || isNaN(qLimit)) ? Infinity : toUint(qLimit);
	count = 0;
	queue = [];

	run = function (thisArg, arguments, resolve) {
		var r;
		try {
			r = apply.call(fn, thisArg, arguments);
		} catch (e) {
			r = e;
		}
		if (isPromise(r)) {
			++count;
			if (resolve) {
				resolve(r);
			}
			return r.cb(decrement);
		} else if (resolve) {
			resolve(r);
			unload();
		} else {
			return promise(r);
		}
	};

	decrement = function () {
		--count;
		unload();
	};

	unload = function () {
		var data;
		if ((data = queue.shift())) {
			run.apply(null, data);
		}
	};

	return setReturnsPromise(function () {
		var r, d;
		if (count >= cLimit) {
			if (queue.length < qLimit) {
				d = deferred();
				queue.push([this, arguments, d.resolve]);
				return d.promise;
			} else {
				return reject();
			}
		} else {
			return run(this, arguments);
		}
	});
}
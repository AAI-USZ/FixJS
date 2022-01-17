function (thisArg, arguments, resolve) {
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
	}
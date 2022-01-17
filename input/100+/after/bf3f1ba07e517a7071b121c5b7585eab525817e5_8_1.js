function (thisArg, arguments, resolve) {
		var r;
		try {
			r = apply.call(fn, thisArg, arguments);
		} catch (e) {
			r = e;
		}
		if (isPromise(r)) {
			if (!r.resolved) {
				++count;
				if (resolve) {
					resolve(r);
				}
				return r.cb(decrement);
			} else {
				r = r.value;
			}
		}
		if (resolve) {
			resolve(r);
			unload();
		} else {
			return promise(r);
		}
	}
function (t, a, d) {
		var def = deferred(), promise = def.promise, x = {}, count = 0;
		promise(function (result) {
			++count;
		}, a.never).end();
		promise(function (result) {
			a(count, 1);
		}, a.never).end(d);
		def.resolve(x);
	}
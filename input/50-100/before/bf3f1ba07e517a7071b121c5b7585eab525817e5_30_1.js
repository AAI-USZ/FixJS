function (t, a, d) {
		var promise = t(), x = {}, count = 0;
		promise(function (result) {
			++count;
		}, a.never).end();
		promise(function (result) {
			a(count, 1);
		}, a.never).end(d);
		promise._base.resolve(x);
	}
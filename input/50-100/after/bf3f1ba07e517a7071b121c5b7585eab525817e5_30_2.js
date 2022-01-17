function (t, a, d) {
		var def1 = deferred(), p1 = def1.promise, x = {}
		  , def2 = deferred(), p2 = def2.promise;
		p1(function (result) {
			a(result, x);
		}, a.never).end(d);
		def1.resolve(p2);
		def2.resolve(x);
	}
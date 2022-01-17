function (t, a) {
			var def = deferred(), y = def.promise;
			a(y.valueOf(), y, "Unresolved");
			def.resolve(x);
			a(y.valueOf(), x, "Resolved");
		}
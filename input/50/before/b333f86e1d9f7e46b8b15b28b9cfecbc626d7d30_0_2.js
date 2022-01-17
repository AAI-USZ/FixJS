function (/*Function*/ fn, /*Object*/ obj) /*-> Object*/ {
		return function () {
			return fn.apply(obj, arguments);
		};
	}
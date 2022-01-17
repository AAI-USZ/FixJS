function (fn, obj) { // (Function, Object) -> Function
		var args = Array.prototype.slice.call(arguments, 2);
		return function () {
			return fn.apply(obj, args || arguments);
		};
	}
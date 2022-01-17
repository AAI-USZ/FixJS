function(x) {
		if ((x) && (typeof (x) === "object")) {
			if (x.constructor == (new Date).constructor) return "date";
			if (Object.prototype.toString.call(x) === "[object Array]") return "array";
		}
		return typeof x;
	}
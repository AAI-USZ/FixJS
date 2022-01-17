function(x) {
		if ((x) && (typeof (x) === "object")) {
			if (x.constructor == (new Date).constructor) return "date";
			if (x.constructor == (new Array).constructor) return "array";
		}
		return typeof x;
	}
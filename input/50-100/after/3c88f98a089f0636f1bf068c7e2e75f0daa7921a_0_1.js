function is(it, type) {
		// summary:
		//		Tests if "it" is a specific "type". If type is omitted, then
		//		it will return the type.
		//
		// returns:
		//		Boolean if type is passed in
		//		String of type if type is not passed in
		var t = it === void 0 ? "" : ({}).toString.call(it),
			m = t.match(isRegExp),
			v = m ? m[1] : "Undefined";
		return type ? type === v : v;
	}
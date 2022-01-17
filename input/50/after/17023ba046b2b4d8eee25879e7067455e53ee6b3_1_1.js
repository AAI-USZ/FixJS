function() {
		var a = [this].concat(sl(arguments)), t = a.pop()
		return t.chain(a);
	}
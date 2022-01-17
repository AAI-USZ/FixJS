function error(msg) {
		if (window.console) console.log(msg);
		throw Exception("MINI debug error: " + msg);
	}
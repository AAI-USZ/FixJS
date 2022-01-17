function (actual, expected, place) {
	if (actual !== expected) {
		try {
			throw new Error("Assert fail: " + actual + " !== " + expected);
		} catch (err) {
			// put stack trace message in JSON - hack to access from window.onerror
			err.message = err.stack;
			throw err;
		}
	}
}
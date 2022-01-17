function (e, root) {
		result = root.toCSS();
		if (compress)
			result = exports.compressor.cssmin(result);
		if (e instanceof Object)
			throw e;
	}
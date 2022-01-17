function normalizeSize(size) {
		return typeof(size) == "string" ? size.replace(/[^0-9%]/g, '') : size;
	}
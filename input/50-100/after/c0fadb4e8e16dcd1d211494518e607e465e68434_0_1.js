function hashCode(req) {
	if (req.url.length > 8 && req.url.length < 11) {
		var toMatch = req.url.replace("/","");
		if (toMatch.length == 8 && toMatch.match("([A-Z-a-z-0-9]){8}")) { return toMatch; }
	}return null;
}
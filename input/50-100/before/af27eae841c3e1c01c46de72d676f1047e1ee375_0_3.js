function escapeInnerText(s) {
	if (!s) {
		return "";
	}
	s = s + "";
	return s.replace(/[\&<>]/g, function(s) {
		switch(s) {
			case "&": return "&amp;";
			case "<": return "&lt;";
			case ">": return "&gt;";
			default: return s;
		}
	});
}
function() {
	for (var i = -1, len = npf.userAgent.Support.domPrefixes.length; ++i < len;) {
		if (window[npf.userAgent.Support.domPrefixes[i] + 'WebSocket']) {
			return true;
		}
	}

	return 'WebSocket' in window;
}
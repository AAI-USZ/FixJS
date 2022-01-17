function() {
		Object.defineProperty(global, "pageXOffset", {"get" : _getScrollX});
		Object.defineProperty(global, "pageYOffset", {"get" : _getScrollY});
	}
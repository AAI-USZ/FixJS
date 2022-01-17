function () {
		return window.self == window.top;
		/*
		var result;
		try { result = !!!window.frameElement; } catch (e) {} 
		return result;
		 */
	}
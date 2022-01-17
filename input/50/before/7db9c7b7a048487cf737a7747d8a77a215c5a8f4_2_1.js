function () {
		var result;
		try { result = !!!window.frameElement; } catch (e) {} 
		return result;
	}
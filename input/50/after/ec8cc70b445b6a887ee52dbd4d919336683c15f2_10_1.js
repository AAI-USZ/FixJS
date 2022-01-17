function(selector){
		if(selector === window){
			return window;
		}
		return dojo.query(selector)
	}
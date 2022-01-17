function(selector){
		if(selector === window){
			return window;
		}
		return $$(selector)
	}
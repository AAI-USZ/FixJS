function(wrapped, html){
		if(typeof html === 'string'){
			html = Can.buildFragment([html],[]).fragment
		}
		return wrapped.grab(html)
	}
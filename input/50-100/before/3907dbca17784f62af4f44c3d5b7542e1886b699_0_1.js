function(element) {
		var object = Parallax.scrollObjects[element];
		if(typeof object == "undefined") {
			object = new Parallax.ScrollObject(element);
			Parallax.scrollObjects[element] = object;
		}
		
		return object;
	}
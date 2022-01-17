function(element) {
		var object = Parallax.scrollObjects[element.getAttribute("data-ParallaxID")];
		if(typeof object == "undefined") {
			element.setAttribute("data-ParallaxID", Parallax.idCounter);
			Parallax.idCounter ++;
			object = new Parallax.ScrollObject(element);
			Parallax.scrollObjects[element.getAttribute("data-ParallaxID")] = object;
		}
		
		return object;
	}
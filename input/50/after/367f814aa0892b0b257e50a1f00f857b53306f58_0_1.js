function(map, imageHandler) {
		this.map = map;
		this.imageHandler = imageHandler;
		
		if(typeof this.map.tooltips === "undefined") {
			this.map.tooltips = new Array();
		}
		
	}
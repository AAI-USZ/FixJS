function(parameters) {
		if(typeof parameters == "undefined")
			return;
		
		if(typeof parameters["relative"] == "boolean")
			this.relative = parameters["relative"];
		
		if(typeof parameters["deapth"] == "number")
			this.deapth = parameters["deapth"];
			
		if(typeof parameters["width"] == "number")
			this.width = parameters["width"];
			
		if(typeof parameters["height"] == "number")
			this.height = parameters["height"];
			
	}
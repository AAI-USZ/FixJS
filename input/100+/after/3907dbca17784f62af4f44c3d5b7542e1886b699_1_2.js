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

		if(typeof parameters["position"] == "object")
			if(parameters["position"].length > 1)
				this.position = [parameters["position"][0], parameters["position"][1]]
		
		if(typeof parameters["alignment"] == "object")
			if(parameters["alignment"].length > 1) {
				switch (parameters["alignment"][0]) {
					case "left":
						this.alignment[0] = 0;
						break;
					case "right":
						this.alignment[0] = 1;
						break;
					default:
						this.alignment[0] = .5;
						break;
				}
				switch (parameters["alignment"][1]) {
					case "top":
						this.alignment[1] = 0;
						break;
					case "bottom":
						this.alignment[1] = 1;
						break;
					default:
						this.alignment[1] = .5;
						break;
				}
			}
	}
function(element, parameters) {
	this.target = element;
	this.scrollObject = Parallax.getScrollObject(element);
	this.relative = false;
	this.deapth = 0;
	this.width = null;
	this.height = null;
	this.position = [0, 0];
	this.alignment = [.5, .5];
	
	this.update = function() {
		if(!this.scrollObject.inView())
			return;
		
		var scrollOffset = this.scrollObject.getOffset(this.relative);
		this.target.style.backgroundPosition = 
				Math.round(this.target.clientWidth*this.alignment[0]-this.width/2 - scrollOffset.x/Math.pow(2, this.deapth) + this.position[0]) + "px " +
				Math.round(this.target.clientHeight*this.alignment[1]-this.height/2 - (scrollOffset.y-scrollOffset.y/Math.pow(2, this.deapth)) + this.position[1]) + "px";
	};
	
	this.setParameters = function(parameters) {
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
	};
	
	this.getBackgroundSize = function(obj, caller) {
		if(obj.currentStyle) {
			bac = obj.currentStyle.backgroundImage;
		} else {
			bac = getComputedStyle(obj,'').getPropertyValue('background-image');
		}

		var imageSrc = bac.replace(/"/g, '').replace(/url\(|\)$/ig, '');

		new (this.imageMeasurer)(imageSrc, caller);
	}

	this.imageMeasurer = function(src, caller){
		var image;
		var caller = caller;
		var src = src;
			
		function imageloadpost(){
			caller.setImageSize({w: image.width, h: image.height});
		}


		image=new Image();
		image.onload=function(){
			imageloadpost();
		}
		image.onerror=function(){
			imageloadpost();
		}
		image.src=src;
		if(image.width && image.height)
			imageloadpost();

	}
	
	this.setImageSize = function(size) {
		this.width = size.w;
		this.height = size.h;
		this.update();
	}
	
	this.setParameters(parameters);
	var elementParameters = Parallax.parseParametersFromElement(element);
	this.setParameters(elementParameters);
	
	if(this.width == null || this.hegith == null) {
		this.getBackgroundSize(this.target, this);
	}
}
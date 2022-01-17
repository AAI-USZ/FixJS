function(element, parameters) {
	this.target = element;
	this.scrollObject = Parallax.getScrollObject(element);
	this.relative = false;
	this.deapth = 0;
	this.width = null;
	this.height = null;
	
	this.update = function() {
		if(!this.scrollObject.inView())
			return;
		
		var scrollOffset = this.scrollObject.getOffset(this.relative);
		this.target.style.backgroundPosition = 
				Math.round((this.target.clientWidth-this.width)/2 - scrollOffset.x/Math.pow(2, this.deapth)) + "px " +
				Math.round((this.target.clientHeight-this.height)/2 - scrollOffset.y/Math.pow(2, this.deapth)) + "px";
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
		Parallax.step(true);
	}
	
	this.setParameters(parameters);
	var elementParameters = Parallax.parseParametersFromElement(element);
	this.setParameters(elementParameters);
	
	if(this.width == null || this.hegith == null) {
		this.getBackgroundSize(this.target, this);
	}
}
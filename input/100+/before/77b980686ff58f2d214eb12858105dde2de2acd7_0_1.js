function() {
		if(!this.scrollObject.inView())
			return;
		
		var scrollOffset = this.scrollObject.getOffset(this.relative);
		this.target.style.backgroundPosition = 
				Math.round((this.target.clientWidth-this.width)/2 + scrollOffset.x/Math.pow(2, this.deapth)) + "px " +
				Math.round((this.target.clientHeight-this.height)/2 + scrollOffset.y/Math.pow(2, this.deapth)) + "px";
	}
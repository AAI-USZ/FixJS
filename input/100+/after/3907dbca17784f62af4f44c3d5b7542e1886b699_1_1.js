function() {
		if(!this.scrollObject.inView())
			return;
		
		var scrollOffset = this.scrollObject.getOffset(this.relative);
		this.target.style.backgroundPosition = 
				Math.round(this.target.clientWidth*this.alignment[0]-this.width/2 - scrollOffset.x/Math.pow(2, this.deapth) + this.position[0]) + "px " +
				Math.round(this.target.clientHeight*this.alignment[1]-this.height/2 - (scrollOffset.y-scrollOffset.y/Math.pow(2, this.deapth)) + this.position[1]) + "px";
	}
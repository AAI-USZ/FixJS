function(pos) {
		var y = this.tl.height - this.tl.sliderHeight;
		return (pos.x >= this.startx && pos.x <= this.endx && pos.y >= y && pos.y <= y + this.tl.sliderHeight);
	}
function(pos) {
	var y = this.tl.height - this.tl.sliderHeight;
	return (pos.x >= this.x && pos.x <= this.x + this.width && pos.y >= y && pos.y <= y + this.height);
}
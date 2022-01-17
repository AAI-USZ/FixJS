function() {
	// First check to see if the width is still valid
	if(this.width > this.tl.view.width)
		this.width = this.tl.view.width;
	if(this.width < this.tl.sliderHandleWidth * 2)
		this.width = this.tl.sliderHandleWidth * 2;

	// Compute the new length
	this.length = this.width / this.tl.view.width;
	this.tl.view.length = Math.round(this.length * this.tl.length);
}
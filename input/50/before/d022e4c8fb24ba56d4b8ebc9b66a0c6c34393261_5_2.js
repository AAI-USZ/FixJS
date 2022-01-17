function(pixel) {
		return Math.round(pixel * this.view.zoom) + this.sliderOffset;
	}
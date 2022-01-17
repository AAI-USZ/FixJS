function() {
		var markerX = this.timeToPixel(this.timeMarkerPos),
			height = this.height - this.sliderHeight - this.kTracks * (this.segmentTrackHeight + this.segmentTrackPadding);
		this.ctx.fillStyle = this.timeMarkerColor;
		this.ctx.fillRect(markerX, 0, 2, height);
	}
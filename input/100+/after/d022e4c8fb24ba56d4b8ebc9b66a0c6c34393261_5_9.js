function(id) {
		var ctx, x = this.timeToPixel(this.timeMarkerPos)-1;
		
		this.tracks[id].render();
		
		
		//redo the peice of the timeMarker that we drew over
		if(x < 0 || x > this.view.width){ return; }
		ctx = this.ctx;
		ctx.save();
		ctx.fillStyle = this.timeMarkerColor;
		ctx.fillRect(x, this.getTrackTop(id), 2, this.segmentTrackHeight);
		ctx.restore();
	}
function(){
		var that = this,
			tl = this.tl,
			startTime = tl.view.startTime,
			top = tl.getTrackTop(this.id),
			width = tl.view.width,
			height = tl.segmentTrackHeight,
			ctx = tl.ctx,
			audio = this.audio;
			
		ctx.drawImage(tl.trackBg, 0, top, width, height);
		this.searchRange(startTime,tl.view.endTime).forEach(function(seg){ seg.render(); });
		if(audio && tl.selectedSegment && /*!tl.slider.resize &&*/ tl.tracks[tl.selectedSegment.track] === this){
			audio.shift(startTime/1000,tl.view.length/1000);
			ctx.save();
			ctx.globalAlpha = .5;
			ctx.drawImage(audio.buffer, 0, top, width, height);					
			ctx.restore();
		}
	}
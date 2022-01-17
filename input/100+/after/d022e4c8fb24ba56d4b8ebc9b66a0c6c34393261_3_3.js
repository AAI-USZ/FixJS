function(){
		var that = this,
			tl = this.tl,
			startTime = tl.view.startTime,
			top = tl.getTrackTop(this.id),
			ctx = tl.ctx,
			audio = this.audio,
			selected = null;
		
		ctx.drawImage(tl.trackBg, 0, top, tl.view.width, tl.segmentTrackHeight);
		this.visibleSegments = this.searchRange(startTime,tl.view.endTime).sort(Segment.order);
		this.visibleSegments.forEach(function(seg){
			if(seg.selected){ selected = seg; }
			else{ seg.render(); }
		});
		selected && selected.render();
		if(audio && this.active){
			audio.shift(startTime/1000,tl.view.length/1000);
			ctx.save();
			ctx.globalAlpha = .5;
			ctx.drawImage(audio.buffer, 0, top);		
			ctx.restore();
		}
	}
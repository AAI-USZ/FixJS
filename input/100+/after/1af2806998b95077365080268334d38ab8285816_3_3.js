function mouseDown(ev) {
		var canvasTop = $(this.ctx.canvas).offset().top,
			pos = {x: ev.pageX, y: ev.pageY-canvasTop},
			track,id,seg,i,j;

		if(this.slider.containsPoint(pos)) { // Check the slider
			this.slider.mouseDown(pos);
			this.sliderActive = true;
		}else if(pos.y < this.keyHeight+this.segmentTrackPadding) { // Check the key
			i = this.pixelToTime(pos.x);
			this.updateTimeMarker(i);
			this.emit('jump',i);
			this.emit('timeupdate',i);
		}else switch(this.currentTool){
			case Timeline.CREATE: // Are we creating a segment?
				id = this.getTrack(pos);
				if(id > -1) { this.createSegment(pos, id); }
				break;
			case Timeline.REPEAT: // Are we creating a repeat?
				if(this.abRepeatOn){ this.clearRepeat(); }
				else if(this.repeatA == null){ this.setA(pos); }
				else{ this.setB(pos); }
				this.updateCursor(pos);
		}
		
		// Check all the segments
		for(i=0;track=this.tracks[i];i++) {
			if(!(track instanceof segmentTrack)){ continue; }
			//search backwards 'cause later segments are on top
			for(j=track.visibleSegments.length-1;seg = track.visibleSegments[j];j--) {
				if(!seg.containsPoint(pos)) { continue; }
				this.activeElement = seg;
				seg.mouseDown(pos);
				return;
			}
		}
	}
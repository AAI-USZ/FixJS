function mouseDown(ev) {
		var canvasTop = $(this.ctx.canvas).offset().top,
			pos = {x: ev.pageX, y: ev.pageY-canvasTop},
			track,seg,i,j;
			
		// Check all the segments
		for(i=0;track=this.tracks[i];i++) {
			if(track instanceof segmentTrack){
				for(j=0;seg = track.segments[j];j++) {
					if(seg.containsPoint(pos)) {
						this.activeElement = seg;
						seg.mouseDown(pos);
						return;
					}
				}
			}
		}

		if(this.slider.containsPoint(pos)) { // Check the slider
			this.slider.mouseDown(pos);
			this.sliderActive = true;
		}else if(pos.y < this.keyHeight) { // Check the key
			i = this.pixelToTime(pos.x);
			this.updateTimeMarker(i);
			this.emit('jump',i);
		}else switch(buttonController.currentTool){
			case 3: // Are we creating a segment?
				var track = this.getTrack(pos);
				if(track > -1) { this.createSegment(pos, track); }
				break;
			case 6: // Are we creating a repeat?
				if(this.abRepeatOn)
					this.clearRepeat();
				if(this.repeatA == null)
					this.setA(pos);
				else if(!this.abRepeatOn)
					this.setB(pos);
				this.updateCursor(pos);
		}
	}
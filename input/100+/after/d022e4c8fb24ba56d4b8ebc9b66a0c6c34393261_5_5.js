function mouseUp(ev) {
		var canvasTop = $(this.ctx.canvas).offset().top,
			pos = {x: ev.pageX, y: ev.pageY-canvasTop},
			id, track;

		if(this.currentTool == Timeline.REPEAT // Are we creating a repeat?
			&& !this.abRepeatOn && this.repeatA != this.repeatB) {
			this.setB(pos);
			this.updateCursor(pos);
		}else if(this.segmentPlaceholder != null) { // Are we creating a new segment?
			this.segmentPlaceholder.mouseUp(pos);
			this.segmentPlaceholder = null;
		}else if(this.sliderActive) {
			this.slider.mouseUp(pos);
			this.sliderActive = false;
			if(this.selectedSegment){
				track = this.tracks[this.selectedSegment.track];
				if(track.audio){
					track.audio.redraw(this.renderTrack.bind(this,track.id));
				}
			}
		}else if(this.activeElement != null) {
			this.activeElement.mouseUp(pos);
			this.activeElement = null;
		}else if(this.currentTool == Timeline.SELECT){ //deactivate a track
			id = this.getTrack(pos);
			if(this.tracks[id] === this.selectedTrack && !this.selectedSegment){
				this.selectedTrack.active = false;
				this.selectedTrack = null;
				this.renderTrack(id);
				this.updateCurrentSegments();
			}
		}
	}
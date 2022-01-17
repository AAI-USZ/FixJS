function mouseUp(ev) {
		var canvasTop = $(this.ctx.canvas).offset().top,
			pos = {x: ev.pageX, y: ev.pageY-canvasTop},
			track, that=this;

		if(this.sliderActive) {
			this.slider.mouseUp(pos);
			this.sliderActive = false;
			if(this.selectedSegment){
				track = this.tracks[this.selectedSegment.track];
				if(track.audio){
					track.audio.redraw(function(){
						track.render();
						that.renderTimeMarker();
					});
				}
			}
		}else if(this.activeElement != null) {
			this.activeElement.mouseUp(pos);
			this.activeElement = null;
		}else if(this.segmentPlaceholder != null) {
			this.segmentPlaceholder.mouseUp(pos);
			this.segmentPlaceholder = null;
		}else if(buttonController.currentTool == 6 // Are we creating a repeat?
			&& !this.abRepeatOn && this.repeatA != this.repeatB) {
			this.setB(pos);
			this.updateCursor(pos);
		}
	}
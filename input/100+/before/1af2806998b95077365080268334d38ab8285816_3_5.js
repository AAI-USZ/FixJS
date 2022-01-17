function() {
		var startTime = this.view.startTime/1000,
			length = this.view.length/1000;
		this.renderBackground();
		this.tracks.forEach(function(track){ track.render(); });
		if(this.selectedTrack && this.selectedTrack.audio > -1){
			this.audio[this.selectedTrack.audio].shift(startTime, length);
		}
		this.renderKey();
		this.renderTimeMarker();
		this.renderABRepeat();
		this.slider.render();
	}
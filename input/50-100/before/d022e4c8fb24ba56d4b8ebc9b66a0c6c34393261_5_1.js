function(wave, trackId) {
		var that = this,
			i, seg, track = this.tracks[trackId];
		if(!track){ return; }
		track.audio = wave;
		if(this.selectedSegment && this.tracks[this.selectedSegment.track] === track){
			track.render();
			this.renderTimeMarker();
		}
	}
function(cues, id, language, karaoke) {
		var track;
		if(id in this.tracks){ throw new Error("Track with that id already loaded."); }
		if(cues instanceof segmentTrack){
			track = cues;
			id = track.id;
			karaoke = track.karaoke;
		}else{
			track = new segmentTrack(this, cues, id, language, karaoke);
		}
		this.tracks[id] = track;
		this.trackIndices[id] = this.tracks.length;
		this.tracks.push(track);
		if(karaoke == true) { this.kTracks++; }

		// Adjust the height
		this.height += this.segmentTrackHeight + this.segmentTrackPadding;
		this.ctx.canvas.height = this.height;				
	}
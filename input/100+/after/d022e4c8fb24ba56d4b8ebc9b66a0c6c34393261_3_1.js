function segmentTrack(tl, cues, id, language, karaoke){
		var active = false;
		this.tl = tl;
		this.id = id;
		this.language = language;
		this.karaoke = !!karaoke;
		this.segments = cues.map(function(cue){
			var seg = (cue instanceof Segment)?cue:new Segment(tl, cue);
			seg.track = id;
			return seg;
		});
		this.segments.sort(Segment.order);
		this.visibleSegments = [];
		this.active = false;
		this.audio = null;
	}
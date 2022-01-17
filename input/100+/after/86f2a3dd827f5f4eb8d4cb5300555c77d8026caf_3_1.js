function() {
		var e, s, track;
		if(this.events.length == 0)
			return;

		e = this.events.pop();
		track = this.tl.getTrack(e.attributes.track);
		s = track.getSegment(e.attributes.id);
		switch(e.type){
			case "resize":
			case "move":
				s.startTime = e.attributes.initialStart;
				s.endTime = e.attributes.initialEnd;
				break;
			case "create":
				s.deleted = true;
				break;
			case "delete":
				s.deleted = false;
				break;
			case "update":
				s.cue.text = e.attributes.initialText;
				break;
		}
		
		this.tl.renderTrack(track);
		this.tl.emit('update',s);
		this.tl.updateCurrentSegments();
		this.updateDebug();
	}
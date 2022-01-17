function(start, end, t, i){
		var tl = this.tl,
			seg = new Segment(this, (start instanceof Cue)?start:new Cue(i, start, end, t));
		
		this.segments.push(seg);
		this.segments.sort(order);
		
		// Save the action
		tl.tracker.addAction(new Timeline.Action("create",{
			id:seg.uid,
			track:this.id,
			initialStart:seg.startTime,
			initialEnd:seg.endTime
		}));
		tl.renderTrack(this);
		if(this.active && seg.startTime < this.tl.view.endTime && seg.endTime > this.tl.view.startTime){
			tl.updateCurrentSegments();
		}
		tl.emit('update',seg);
		return seg;
	}
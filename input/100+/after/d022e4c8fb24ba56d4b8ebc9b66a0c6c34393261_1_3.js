function(pos) {
	if(this.deleted || !this.selectable)
		return;
	
	var tl = this.tl;
	
	switch(tl.currentTool) {
		case Timeline.MOVE:
			this.move = false;
			
			// Save the move
			this.moveEvent.attributes.finalStart = this.startTime;
			this.moveEvent.attributes.finalEnd = this.endTime;
			tl.tracker.addEvent(this.moveEvent);
			tl.emit('update');
			tl.tracks[this.track].segments.sort(Segment.order);
			break;
		case Timeline.DELETE:
			// Delete tool
			this.deleted = true;
			
			// Save the delete
			tl.tracker.addEvent(new TimelineEvent("delete",{
				id:this.id,
				track:this.track
			}));
			tl.selectedSegment = null;
			tl.render();
			tl.emit('update');
			break;
		case Timeline.RESIZE:
			this.resizeSide = 0;
			// Save the resize
			this.moveEvent.attributes.finalStart = this.startTime;
			this.moveEvent.attributes.finalEnd = this.endTime;
			tl.tracker.addEvent(this.moveEvent);
			tl.emit('update');
			tl.tracks[this.track].segments.sort(Segment.order);
	}
}
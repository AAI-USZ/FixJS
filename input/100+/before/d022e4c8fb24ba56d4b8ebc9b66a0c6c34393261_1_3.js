function(pos) {
	if(this.deleted || !this.selectable)
		return;
	
	switch(buttonController.currentTool) {
		case 1:
			// Selector tool
			if(this.containsPoint(pos))
				this.toggleSelect();
			break;
		case 2:
			// Move Tool
			this.move = false;
			
			// Save the move
			this.moveEvent.attributes.finalStart = this.startTime;
			this.moveEvent.attributes.finalEnd = this.endTime;
			this.tl.tracker.addEvent(this.moveEvent);
			
			this.tl.emit('update');
			
			break;
		case 3:
			// Add tool
			break;
		case 4:
			// Delete tool
			this.deleted = true;
			
			// Save the delete
			var e = new TimelineEvent("delete");
			e.attributes.id = this.id;
			e.attributes.track = this.track;
			this.tl.tracker.addEvent(e);
			
			this.tl.selectedSegment = null;
			this.tl.render();
			this.tl.emit('update');
			break;
		case 5:
			// Resize tool
			this.resizeSide = 0;
			
			// Save the resize
			this.moveEvent.attributes.finalStart = this.startTime;
			this.moveEvent.attributes.finalEnd = this.endTime;
			this.tl.tracker.addEvent(this.moveEvent);
			
			this.tl.emit('update');
	}
}
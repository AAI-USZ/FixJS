function(pos) {
		if(this.deleted || !this.selectable)
			return;
		
		var tl = this.tl;
		
		switch(tl.currentTool) {
			case Timeline.MOVE:
				this.move = false;
				
				// Save the move
				this.action.attributes.finalStart = this.startTime;
				this.action.attributes.finalEnd = this.endTime;
				tl.tracker.addAction(this.action);
				tl.emit('update',this);
				this.track.segments.sort(Segment.order);
				break;
			case Timeline.DELETE:
				// Delete tool
				this.deleted = true;
				this.selected = false;
				
				// Save the delete
				tl.tracker.addAction(new Timeline.Action("delete",{
					id:this.uid,
					track:this.track.id
				}));
				tl.selectedSegment = null;
				tl.render();
				tl.updateCurrentSegments();
				tl.emit('update',this);
				break;
			case Timeline.RESIZE:
				this.resizeSide = 0;
				// Save the resize
				this.action.attributes.finalStart = this.startTime;
				this.action.attributes.finalEnd = this.endTime;
				tl.tracker.addAction(this.action);
				tl.emit('update',this);
				this.track.segments.sort(Segment.order);
		}
	}
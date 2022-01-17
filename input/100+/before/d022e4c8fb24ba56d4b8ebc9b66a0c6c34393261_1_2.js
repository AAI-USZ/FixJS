function(pos) {
	if(this.deleted || !this.selectable)
		return;
		
	this.mouseDownPos = pos;
	this.startingPos = this.tl.timeToPixel(this.startTime);
	this.startingLength = this.endTime - this.startTime;
			
	if(buttonController.currentTool == 2) { // moving
		this.move = true;    
		this.moveEvent = new TimelineEvent("move");
		this.moveEvent.attributes.initialStart = this.startTime;
		this.moveEvent.attributes.initialEnd = this.endTime;
		this.moveEvent.attributes.id = this.id;
		this.moveEvent.attributes.track = this.track;
	}
	if(buttonController.currentTool == 5) { // resizing
		this.moveEvent = new TimelineEvent("resize");
		this.moveEvent.attributes.initialStart = this.startTime;
		this.moveEvent.attributes.initialEnd = this.endTime;
		this.moveEvent.attributes.id = this.id;
		this.moveEvent.attributes.track = this.track;
		this.resizeSide = this.getMouseSide(pos);
	}
}
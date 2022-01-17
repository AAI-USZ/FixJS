function(pos) {
	if(this.deleted || !this.selectable)
		return;
	
	if(this.move) {
		var x = this.startingPos + pos.x - this.mouseDownPos.x;
		var newStartTime = this.tl.pixelToTime(x);
		if(newStartTime < 0)
			newStartTime = 0;
		if(newStartTime + this.startingLength > this.tl.length)
			newStartTime = this.tl.length - this.startingLength;
		this.startTime = newStartTime;
		this.endTime = this.startTime + this.startingLength;
		
		this.tl.render();
		this.tl.emit('update');
	}
	if(this.resizeSide == -1) {
		var x = this.startingPos + pos.x - this.mouseDownPos.x;
		var newStartTime = this.tl.pixelToTime(x);
		if(newStartTime < 0)
			newStartTime = 0;
		if(newStartTime >= this.endTime)
			newStartTime = this.endTime - 10;
		this.startTime = newStartTime;
		
		this.tl.render();
		this.tl.update();
	}
	if(this.resizeSide == 1) {
		var x = this.startingPos + pos.x - this.mouseDownPos.x;
		var newEndTime = this.tl.pixelToTime(x) + this.startingLength;
		if(newEndTime <= this.startTime)
			newEndTime = this.startTime + 10;
		if(newEndTime > this.tl.length)
			newEndTime = this.tl.length;
		this.endTime = newEndTime;
		
		this.tl.render();
		this.tl.emit('update');
	}
}
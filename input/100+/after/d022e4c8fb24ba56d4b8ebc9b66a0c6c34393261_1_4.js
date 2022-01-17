function(pos) {
	if(this.deleted || !this.selectable)
		return;
	
	var tl = this.tl,
		activeStart, newTime, maxStartTime;
	
	if(this.move){
		activeStart = this.active;
		
		newTime = tl.pixelToTime(this.startingPos + pos.x - this.mouseDownPos.x);
		maxStartTime = tl.length - this.startingLength;
		
		if(newTime < 0){ newTime = 0; }
		else if(newTime > maxStartTime){ newTime = maxStartTime; }
		
		this.startTime = newTime;
		this.endTime = newTime + this.startingLength;
				
	}else if(this.resizeSide == -1){
		activeStart = this.active;
		
		newTime = tl.pixelToTime(this.startingPos + pos.x - this.mouseDownPos.x);
		
		if(newTime < 0){ newTime = 0; }
		else if(newTime >= this.endTime){ newTime = this.endTime - 10; }
		
		this.startTime = newTime;
				
	}else if(this.resizeSide == 1){
		activeStart = this.active;
		
		newTime = this.tl.pixelToTime(this.startingPos + pos.x - this.mouseDownPos.x) + this.startingLength;
		if(newTime <= this.startTime){ newTime = this.startTime + 10; }
		else if(newTime > tl.length){ newTime = tl.length; }
		
		this.endTime = newTime;
		
	}else{ return; }
	
	tl.renderTrack(this.track);
	if(activeStart != this.active){ tl.updateCurrentSegments(); }
}
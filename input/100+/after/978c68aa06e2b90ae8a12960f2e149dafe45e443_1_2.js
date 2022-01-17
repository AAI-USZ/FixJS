function Time() {
	this.offset = (new Date()).getTime(); // ms since 1970
	this.previousFrameTime = 0; // ms from start till previous frame
	this.currentFrameTime = 0; // ms from start till current frame

	// time between current frame and previous frame
	Time.prototype.getElapsedTime = function() {
		return this.currentFrameTime - this.previousFrameTime;
	}

	Time.prototype.toString = function() {
		return "Offset: " + this.offset
			+ "<br>Current frame time: " + this.currentFrameTime
			+ "<br>Elapsed time: " + this.getElapsedTime();
	}
}
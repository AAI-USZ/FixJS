function() {
		this.time.previousFrameTime = this.time.currentFrameTime;
		this.time.currentFrameTime = (new Date()).getTime() - this.time.offset;

		for(eventHandlerName in eventHandlerList) {
			eventHandlerList[eventHandlerName](this.time);
		}
	}
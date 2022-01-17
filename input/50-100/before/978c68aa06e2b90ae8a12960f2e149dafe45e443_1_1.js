function() {
		this.PreviousFrameTime = this.CurrentFrameTime;
		this.CurrentFrameTime = (new Date()).getTime() - this.TimeOffset;

		for(EventHandlerName in this.EventHandlerList) {
			this.EventHandlerList[EventHandlerName](this);
		}
	}
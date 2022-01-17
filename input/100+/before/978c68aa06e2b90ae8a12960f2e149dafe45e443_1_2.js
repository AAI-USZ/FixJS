function Timer() {
	this.TimeOffset = 0; // ms since 1970
	this.PreviousFrameTime = 0; // ms from start till previous frame
	this.CurrentFrameTime = 0; // ms from start till current frame
	this.Interval = 0; // Time between two frames
	this.TimeEventId; 
	this.EventHandlerList = new Array();

	Timer.prototype.AddEventHandler = function(EventHandler) {
		this.EventHandlerList.push(EventHandler);
	}

	Timer.prototype.Start = function(interval) {
		this.Interval = interval;
		this.TimeOffset = (new Date()).getTime();
		this.PreviousFrameTime = 0;
		this.CurrentFrameTime = 0;
		var self = this;
		var func = function(){ self.Update.apply(self); };
		this.TimeEventId = setInterval(func ,this.Interval);
	}

	Timer.prototype.Stop = function() {
		clearTimeout(this.TimeEventId);
	}

	// time between current frame and previous frame
	Timer.prototype.getElapsedTime = function() {
		return this.CurrentFrameTime - this.PreviousFrameTime;
	}

	// Called every event, calls all eventhandlers
	Timer.prototype.Update = function() {
		this.PreviousFrameTime = this.CurrentFrameTime;
		this.CurrentFrameTime = (new Date()).getTime() - this.TimeOffset;

		for(EventHandlerName in this.EventHandlerList) {
			this.EventHandlerList[EventHandlerName](this);
		}
	}

	Timer.prototype.ToString = function() {
		return "Offset: " + this.TimeOffset
			+ "<br>Current frame time: " + this.CurrentFrameTime
			+ "<br>Elapsed time: " + this.getElapsedTime();
	}
}
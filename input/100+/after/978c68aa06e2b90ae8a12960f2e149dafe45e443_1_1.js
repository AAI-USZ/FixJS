function Timer() {
	this.time;
	this.interval = 0; // Time between two frames
	var timeEventId; 
	var eventHandlerList = new Array();

	Timer.prototype.getEventHandlerList = function() {
		return eventHandlerList;
	}

	Timer.prototype.addEventHandler = function(func, self) {
		eventHandlerList.push(function(time){ func.call(self,time); });
		//eventHandlerList.push(func);
	}

	Timer.prototype.start = function(interval) {
		this.interval = interval;
		this.time = new Time();
		var self = this;
		var func = function(){ self.update.apply(self); };
		timeEventId = setInterval(func, this.interval);
	}

	Timer.prototype.stop = function() {
		clearTimeout(timeEventId);
	}

	// Called every event, calls all eventhandlers
	Timer.prototype.update = function() {
		this.time.previousFrameTime = this.time.currentFrameTime;
		this.time.currentFrameTime = (new Date()).getTime() - this.time.offset;

		for(eventHandlerName in eventHandlerList) {
			eventHandlerList[eventHandlerName](this.time);
		}
	}
}
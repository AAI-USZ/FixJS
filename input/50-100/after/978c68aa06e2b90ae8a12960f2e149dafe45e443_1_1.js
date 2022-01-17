function(interval) {
		this.interval = interval;
		this.time = new Time();
		var self = this;
		var func = function(){ self.update.apply(self); };
		timeEventId = setInterval(func, this.interval);
	}
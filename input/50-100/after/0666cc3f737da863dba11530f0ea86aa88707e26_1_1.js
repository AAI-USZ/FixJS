function(callback) {
		this.timer = null;

		this.filters = [];
		this.callback = callback;
		this.cursor = ((new Date()).getTime() / 1000.0) - 1.0;
		
		this.running = false;
	}
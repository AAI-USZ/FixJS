function() {
		console.log("123");
		console.log(this.events);
		return this.events.fire.apply(this.events, arguments);
	}
function(){
		if (!this.connected || !this.stream) return;

		this.log("Closing connection upon request!");
		this.stream.destroy();
	}
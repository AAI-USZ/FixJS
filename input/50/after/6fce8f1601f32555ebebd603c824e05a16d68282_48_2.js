function (seconds) {
		function onTimeout() {
			self.elapsed.dispatch();
		}

		this.timeout = seconds;
		var self = this;
		setTimeout(onTimeout, this.timeout * 1000);

	
	}
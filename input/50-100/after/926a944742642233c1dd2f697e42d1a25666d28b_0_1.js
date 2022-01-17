function (message) {
		var data;

		data = this.parse_message (message);
		if (data) {
			this.emit ("message", data);
			this.emit (data.command, data);
		}
	}
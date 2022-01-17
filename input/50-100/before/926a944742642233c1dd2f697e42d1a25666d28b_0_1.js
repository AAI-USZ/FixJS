function (message) {
		var data;

		data = this.parse_message (message);
		if (data) {
			if (!/^\d{3}$/.test(data.command)) { // Hack
				this.item_manager.publish (this.get_item_name (data), data.command.toLowerCase(), data);
			}
			this.emit (data.command, data);
		}
	}
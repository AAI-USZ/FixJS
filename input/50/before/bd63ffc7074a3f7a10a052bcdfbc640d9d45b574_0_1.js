function (event) {
			this.event = event;
			this.id = this.baseId + " (" + event.data.eventName.replace(/^listener:/, '') + ")";
		}
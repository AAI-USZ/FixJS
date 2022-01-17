function() {
			for (var i = 0, len = this.events.length; i < len; i++) {
				this.events[i].detach();
			}
			this.events = [];
		}
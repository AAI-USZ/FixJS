function() {
			this._isSaved = false;
			this.id = null;
			this.data = {};
			for (var i = 0, len = this.events.length; i < len; i++) {
				this.events[i].detach();
			}
			this.events = [];
		}
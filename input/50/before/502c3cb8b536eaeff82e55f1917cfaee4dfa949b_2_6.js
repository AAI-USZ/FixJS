function(event, callback) {
			return this.eventTarget.detach.apply(this.eventTarget, arguments);
		}
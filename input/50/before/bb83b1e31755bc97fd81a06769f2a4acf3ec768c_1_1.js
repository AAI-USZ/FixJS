function (data) {
				type = data.type;
				if (type) { self.emitEvent(type, data.event); }
			}
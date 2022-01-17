function (data) {
				type = data.type;
				if (type && self.isReceiving) { self.emitEvent(type, data.event); }
			}
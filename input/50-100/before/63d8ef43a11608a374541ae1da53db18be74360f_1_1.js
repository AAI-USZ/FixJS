function() {
			data.tags = [];
			data.quote = true;
			details.set('data', data);
			details.set('eventSrc', {
				origin: event.origin,
				source: event.source
			});
		}
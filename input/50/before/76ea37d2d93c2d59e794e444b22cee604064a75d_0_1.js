function(topic, callback) {
		events.subscribe({
			"topic": topic,
			"handler": $.proxy(callback, control)
		});
	}
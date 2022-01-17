function() {
		component.events.publish({
			"topic": "onEditError",
			"data": component.prepareBroadcastParams()
		});
	}
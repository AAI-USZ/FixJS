function(topic, data) {
			if (data.target !== element.get(0)) return {"stop": ["bubble"]};
			plugin.events.publish({
				"topic": "onUnlike",
				"prefix": "internal",
				"bubble": true,
				"data": {
					"actor": data.actor,
					"item": item
				}
			});
			return {"stop": ["bubble"]};
		}
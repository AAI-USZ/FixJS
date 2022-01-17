function(child) {
		if (config && config.filter && !config.filter(child)) return;
		var initialRendering = !child.dom;
		element.append(initialRendering ? child.render() : child.dom.content);
		if (child.deleted) {
			self.events.publish({
				"topic": "internal.Item.onDelete",
				"data": {
					"item": child,
					"config": config
				}
			});
		} else if (child.added) {
			self.events.publish({
				"topic": "internal.Item.onAdd",
				"data": {"item": child}
			});
		// don't publish events while rerendering
		} else if (initialRendering) {
			self.events.publish({
				"topic": "internal.Item.onRender",
				"data": {"item": child}
			});
		}
	}
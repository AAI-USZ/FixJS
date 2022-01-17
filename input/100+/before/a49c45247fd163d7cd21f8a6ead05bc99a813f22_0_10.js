function(child) {
		if (config && config.filter && !config.filter(child)) return;
		var initialRendering = !child.dom;
		element.append(initialRendering ? child.render() : child.dom.content);
		if (child.deleted) {
			self.publish("internal.Item.onDelete", {"item": child, "config": config});
		} else if (child.added) {
			self.publish("internal.Item.onAdd", {"item": child});
		// don't publish events while rerendering or for Whirlpools
		} else if (initialRendering && child instanceof Echo.Item) {
			self.publish("internal.Item.onRender", {"item": child});
		}
	}
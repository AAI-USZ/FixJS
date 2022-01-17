function checkEvents(elem, ctx, layer) {
	var data = getCanvasData(elem),
		eventCache = data.events,
		callback = layer[eventCache.type],
		over = ctx.isPointInPath(eventCache.x[0], eventCache.y[0]),
		out = ctx.isPointInPath(eventCache.x[1], eventCache.y[1]);
	
	// Allow callback functions to retrieve the mouse coordinates
	layer.mouseX = eventCache.x[0];
	layer.mouseY = eventCache.y[0];
	
	// Detect
	if (!over && layer._hovered && !layer._fired) {
		layer._fired = TRUE;
		layer._hovered = FALSE;
		if (layer.mouseout) {
			layer.mouseout.call(elem, layer);
		}
	}
		
	// If layer intersects with cursor, add it to the list
	if (over) {
		data.intersects.push(layer);
	}
	layer.over = over;
}
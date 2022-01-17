function checkEvents(elem, ctx, layer) {
	var data = getCanvasData(elem),
		eventCache = data.event,
		over = ctx.isPointInPath(eventCache.x, eventCache.y);
		
	// Allow callback functions to retrieve the mouse coordinates
	layer.mouseX = eventCache.x;
	layer.mouseY = eventCache.y;
	
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
}
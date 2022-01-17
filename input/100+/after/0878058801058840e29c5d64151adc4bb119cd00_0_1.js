function(resetFire) {
	var $elems = this, $elem, e, ctx,
		layers, layer, l,
		data, eventCache, eventType,
		intersects, drag, callback;
			
	for (e=0; e<$elems.length; e+=1) {
		$elem = $($elems[e]);
		ctx = getContext($elems[e]);
		if (ctx) {
			
			// Clear canvas first
			ctx.clearRect(0, 0, $elems[e].width, $elems[e].height);
			
			// Get canvas layers
			data = getCanvasData($elems[e]);
			layers = data.layers;
			
			// Draw layers from first to last (bottom to top)
			for (l=0; l<layers.length; l+=1) {
				layer = layers[l];
				// Ensure layer index is correct
				layer.index = l;
	
				// Prevent any one event from firing excessively
				if (resetFire) {
					layer._fired = FALSE;
				}
				console.log(layer);
				drawLayer($elem, ctx, layer);
			}
			
			layer = data.intersects[data.intersects.length-1] || {};
			eventCache = data.event;
			eventType = eventCache.type;
			callback = layer[eventType];
			drag = data.drag;
			
			if (layer._event) {
														
				// Detect mouseover events	
				if (layer.mouseover || layer.mouseout) {
					if (!layer._hovered && !layer._fired) {
						layer._fired = TRUE;
						layer._hovered = TRUE;
						if (layer.mouseover) {
							layer.mouseover.call($elems[e], layer);
						}
					}
				}
																
				// Detect any other mouse event
				if (callback && !layer._fired) {
					layer._fired = TRUE;
					callback.call($elems[e], layer);
				}
				
				// Use the mousedown event to start drag
				if (layer.draggable && eventType === 'mousedown') {
					
					// Being layer to front when drag starts
					if (layer.bringToFront) {
						layers.splice(layer.index, 1);
						layer.index = 0;
						layers.push(layer);
					}
					
					// Keep track of drag state
					drag.layer = layer;
					console.log(drag.layer);
					drag.dragging = TRUE;
					drag.startX = layer.x;
					drag.startY = layer.y;
					drag.endX = layer.mouseX;
					drag.endY = layer.mouseY;
					if (layer.dragstart) {
						layer.dragstart.call($elems[e], layer);
					}
				}
				
			}
			
			// Dragging a layer works independently from other events
			if (drag.layer) {
				
				// Use the mouseup event to stop the drag
				if (layer.draggable && eventType === 'mouseup') {
					data.drag = {};
									
					if (drag.layer.dragstop) {
						drag.layer.dragstop.call($elems[e], drag.layer);
					}
				}
				// Regardless of whether the cursor is on the layer, drag the layer until drag stops
				if (drag.dragging && eventType === 'mousemove') {
					drag.layer.x = drag.layer.mouseX - (drag.endX - drag.startX);
					drag.layer.y = drag.layer.mouseY - (drag.endY - drag.startY);
					if (drag.layer.drag) {
						drag.layer.drag.call($elems[e], drag.layer);
					}
				}
			}
			
		}
	}
	data.intersects = [];
	return $elems;
}
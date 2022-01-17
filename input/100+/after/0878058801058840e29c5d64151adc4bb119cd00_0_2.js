function addLayer(elem, layer, method) {
	var $elem, layers, event, layerFn,
		isFn = (typeof layer === 'function'),
		data, dragHelperEvents, i;
	layer = layer || {};
	
	// Only add layer if it hasn't been added before
	if (layer.layer && !layer._layer) {
		
		$elem = $(elem);
		layers = $elem.getLayers();
		
		// If layer is a function
		if (isFn) {
			layerFn = layer;
			// Wrap function within object
			layer = {
				method: $.fn.draw,
				fn: layerFn
			};
		}
		
		// Ensure layers are unique across canvases by cloning them
		layer = merge(new Prefs(), layer);
		
		// Detect events for non-function layers
		if (!isFn) {
			
			// Associate a jCanvas method with layer
			layer.method = $.fn[layer.method] || method;
			// Retrieve canvas data
			data = getCanvasData(elem);	
				
			// Check for any associated jCanvas events and enable them
			for (event in jCanvas.events) {
				if (jCanvas.events.hasOwnProperty(event) && layer[event]) {
					// Ensure canvas event is not bound more than once
					if (!data[event]) {
						jCanvas.events[event]($elem);
					}
					layer._event = TRUE;
				}
			}
	
			// Enable drag-and-drop support	
			if (layer.draggable) {
				layer._event = TRUE;
				dragHelperEvents = ['mousedown', 'mousemove', 'mouseup'];
				for (i=0; i<dragHelperEvents.length; i+=1) {
					event = dragHelperEvents[i];
					if (!data[event]) {
						jCanvas.events[event]($elem);
					}
				}
			}
		}
		// Set layer properties and add to stack
		layer.layer = TRUE;
		layer._layer = TRUE;
		// Add layer to end of array if no index is specified
		if (layer.index === UNDEFINED) {
			layer.index = layers.length;
		}
		// Add layer to layers array at specified index
		layers.splice(layer.index, 0, layer);
	}
}
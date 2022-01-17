function($elem) {
	
		// Both mouseover/mouseout events will be managed by a single mousemove event
		var helperEventName = (eventName === 'mouseover' || eventName === 'mouseout') ? 'mousemove' : eventName,
			data = getCanvasData($elem[0]),
			// Retrieve canvas's event cache
			eventCache = data.events;
		
		// Bind one canvas event which handles all layer events of that type
		$elem.bind(helperEventName + '.jCanvas', function(event) {
			// Cache current mouse position and redraw layers
			eventCache.x[1] = eventCache.x[0];
			eventCache.y[1] = eventCache.y[0];
			eventCache.x[0] = event.offsetX;
			eventCache.y[0] = event.offsetY;
			eventCache.type = helperEventName;
			$elem.drawLayers(TRUE);
			event.preventDefault();
		});
		data[eventName] = TRUE;
		
	}
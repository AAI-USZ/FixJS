function(event) {
			// Cache current mouse position and redraw layers
			eventCache.x[1] = eventCache.x[0];
			eventCache.y[1] = eventCache.y[0];
			eventCache.x[0] = event.offsetX;
			eventCache.y[0] = event.offsetY;
			eventCache.type = helperEventName;
			$elem.drawLayers(TRUE);
			event.preventDefault();
		}
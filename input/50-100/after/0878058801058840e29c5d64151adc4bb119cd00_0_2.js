function(event) {
			// Cache current mouse position and redraw layers
			eventCache.x = event.offsetX;
			eventCache.y = event.offsetY;
			eventCache.type = helperEventName;
			$elem.drawLayers(TRUE);
			event.preventDefault();
		}
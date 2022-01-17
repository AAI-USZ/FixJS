function(payload) {
			payload.event.stopPropagation();
			/* calculate the new coordinates from the
			 * current mouse position and initial deviation
			 */ 
			var newX = payload.x + dragStartX, newY = payload.y + dragStartY;
			// move the circle
			view.setPosition(newX, newY);
		}
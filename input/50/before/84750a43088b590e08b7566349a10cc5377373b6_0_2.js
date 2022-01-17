function(payload) {
			payload.event.stopPropagation();
			/* calculate the new coordinates from the
			 * current mouse position and initial deviation
			 */ 
			var newX = payload.x + deviationX, newY = payload.y + deviationY;
			// move the circle
			view.setPosition(newX, newY);
		}
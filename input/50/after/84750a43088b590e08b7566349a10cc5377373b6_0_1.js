function(payload) {
			payload.event.stopPropagation();
			// remember the deviation from the initial position of view
			dragStartX = view.getPosition().x - payload.x;
			dragStartY = view.getPosition().y - payload.y;
		}
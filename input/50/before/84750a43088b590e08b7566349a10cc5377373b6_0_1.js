function(payload) {
			payload.event.stopPropagation();
			// remember the deviation from the initial position of view
			deviationX = view.getPosition().x - payload.x;
			deviationY = view.getPosition().y - payload.y;
		}
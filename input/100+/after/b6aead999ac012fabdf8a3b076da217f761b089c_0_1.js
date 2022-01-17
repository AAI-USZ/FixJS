function(time) {
		var dom = document.getElementById(this.id);
		var elapsedTime = time.getElapsedTime() / 1000; // elapsed time in seconds
		var distance = speed * elapsedTime;
		var dx = 0,dy = 0;

		if (hasTarget) {
			dx = targetX - X;
			dy = targetY - Y;
			var length = Math.sqrt(dx*dx + dy*dy);
			// Normalize direction vector
			if (length > distance) {
				// adept movements to have the right speed
				dx *= distance / length;
				dy *= distance / length;
			}
		}
		else {
			if ((X + dom.clientWidth/2) >= iPortraitWidth)
				dX = -Math.abs(dX);
			if ((X - dom.clientWidth/2) <= 0)
				dX = Math.abs(dX);
			if ((Y + dom.clientHeight/2) >= iLandscapeWidth) 
				dY = -Math.abs(dY);
			if ((Y - dom.clientHeight/2) <= 0)
				dY = Math.abs(dY);
			dx = dX * distance;
			dy = dY * distance;
		}

		X += dx;
		Y += dy;

		// Update the actual dom properties
		dom.style.top = (Math.round(Y) - dom.clientHeight/2) + 'px';
		dom.style.left = (Math.round(X) - dom.clientWidth/2) + 'px';
	}
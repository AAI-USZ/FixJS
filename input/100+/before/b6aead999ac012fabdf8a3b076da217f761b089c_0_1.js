function(time) {
		if (hasTarget) {
			dX = targetX - X;
			dY = targetY - Y;
		}

		// Scale (dX,dY) to have the right speed
		if (!(dX == 0 && dY == 0)) {
			// make the movements independent of the framerate
			var elapsed = time.getElapsedTime() / 1000; // elapsed time in seconds
			var scalar = (speed * elapsed) / Math.sqrt(dX*dX + dY*dY);
			if (hasTarget && scalar < 1) {
				dX *= scalar;
				dY *= scalar;
			}
		}

		if (!hasTarget) {
			if ((X + this.imageWidth) >= iPortraitWidth 
					|| (X - this.imageWidth) <= 0)
				dX = -dX;
			if ((Y + this.imageHeight) >= iLandscapeWidth 
					|| (Y - this.imageHeight) <= 0)
				dY = -dY;
		}

		X += dX;
		Y += dY;

		// Update the actual dom properties
		this.dom.style.top = (Math.round(Y) - this.dom.clientHeight/2) + 'px';
		this.dom.style.left = (Math.round(X) - this.dom.clientWidth/2) + 'px';
	}
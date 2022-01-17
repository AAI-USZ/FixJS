function() {
		if (hasTarget) {
			dX = targetX - X;
			dY = targetY - Y;
		}

		// Scale (dX,dY) to have the right speed
		if (!(dX == 0 && dY == 0)) {
			var scalar = speed / Math.sqrt(dX*dX + dY*dY);
			if (hasTarget && scalar < 1) {
				dX *= scalar;
				dY *= scalar;
			}
		}

		X += dX;
		Y += dY;

		// Update the actual dom properties
		this.dom.style.top = Math.round(Y) + 'px';
		this.dom.style.left = Math.round(X) + 'px';
	}
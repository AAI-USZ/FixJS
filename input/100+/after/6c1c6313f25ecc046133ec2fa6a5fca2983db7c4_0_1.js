function(origin, target, slowdown) {
		var steer;
		
		// TODO: Make these configurable from higher up.
		var maxSpeed = this.maxVel;
		var maxForce = 5;
		
		var desired = target.clone();
		desired.sub(origin);
		var d = desired.length();
		
		if (d > 0) {
			// Two options for desired vector magnitude (1 -- based on distance, 2 -- maxSpeed)
			if (slowdown && d < 100) {
				desired.length(maxSpeed.length() * (d / 100)); // This damping is somewhat arbitrary
			} else {
				desired.length(maxSpeed);
			}
			steer = desired.clone();
			steer.sub(this.vel);
			steer.length(Math.min(maxForce, steer.length()));
		} else {
			steer = new me.Vector2d(0, 0);
		}
		return steer;
	}
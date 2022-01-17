function() {
		var distance = this.target.clone();
		distance.sub(this.pos);
		
		// Are we there yet?  If not, move toward the target.
		if(distance.length() > 1) {
			
			// Steer!
			var steer = this._steer(this.pos, this.target, false);
			
			// Apply steering vector to velocity.
			this.vel.y = this.accel.y * steer.y
			this.vel.x = this.accel.x * steer.x;
			
			return true;
		} else {
			this.target = null;
			return false;
		}
	}
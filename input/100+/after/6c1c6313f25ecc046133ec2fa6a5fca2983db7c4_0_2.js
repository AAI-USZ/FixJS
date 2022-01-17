function() {
		var distance = this.target.clone();
		distance.sub(this.pos);
		
		// Are we there yet?  If not, move toward the target.
		if(distance.length() > 1) {
			
			// Get a heading toward the pointer.
			var steer = this._steer(this.pos, this.target, true);
			steer.normalize();
			
			// Apply steering vector to velocity.
			this.vel.x += this.accel.x * steer.x * me.timer.tick;
			this.vel.y += this.accel.y * steer.y * me.timer.tick;
			
			return true;
			
		} else {
			this.target = null;
			return false;
		}
	}
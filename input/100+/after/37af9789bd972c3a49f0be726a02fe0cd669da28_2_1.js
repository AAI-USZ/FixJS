function() {
			if ( this.control.left && this.pos.x >= 50 ) {
				this.pos = vec2( this.pos.x - (this.ship_speed ), this.pos.y );
			}
			if ( this.control.right && this.pos.x <= phoenix.resolution.x - 50 ) {
				this.pos = vec2( this.pos.x + (this.ship_speed ), this.pos.y );
			}
			if ( !this.cooldown && this.control.space ) {
				this.fire();
			}
			if( this.cooldown && this.cooldown_counter >= this.fire_rate ) {
				this.cooldown = false;
			}
			this.cooldown_counter++;
			this.checkCollision();
		}
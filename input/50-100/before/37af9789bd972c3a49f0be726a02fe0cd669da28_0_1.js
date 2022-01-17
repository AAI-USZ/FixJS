function( x, y ) {
			this.parent( 'alien.png', vec2(x,y) );
			this.update_event = events.connect( 'onUpdate', this.update.bind(this) );
			events.connect( 'alien::oob', this.outOfBounds.bind(this) );
			this.left_border = 50;
			this.right_border = phoenix.resolution.x - 50;
			this.step_down = 25;
		}
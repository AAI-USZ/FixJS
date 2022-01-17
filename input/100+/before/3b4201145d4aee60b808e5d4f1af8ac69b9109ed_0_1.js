function() {
		var action = this.id;
		c._mouse = c._face = c._dir = false;
		if( action == 'play_all' ) {
			y_max = Math.floor($newhotness.height() / 48) - 1;
			x_max = Math.floor($newhotness.width() / 48) - 1;
			for( var y = 0; y <= y_max; y++ ) {
				for( var x = 0; x <= x_max; x++ ) {
					c._queue.push( [ x, y ] );
				}
			}
		} else if( action == 'stop' ) {
			c._queue = [];
		} else if( action == 'warp' ) {
			c._queue = [].concat( _animation.warp[1] );
		}
	}
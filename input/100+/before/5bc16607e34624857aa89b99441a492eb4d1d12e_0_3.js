function() {
		var action = this.id;
		c._mouse = false;
		c._face = false;
		c._dir = false;
		if( action == 'play_all' ) {
			y_max = Math.floor($oldbusted.height() / 48) - 1;
			x_max = Math.floor($oldbusted.width() / 48) - 1;
			for( var y = 0; y <= y_max; y++ ) {
				for( var x = 0; x <= x_max; x++ ) {
					c._queue.push( [ x, y ] );
				}
			}
		} else if( action == 'stop' ) {
			c._queue = [];
		}
	}
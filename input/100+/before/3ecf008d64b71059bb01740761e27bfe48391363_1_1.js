function() {
		var action = this.id;
		c._mouse = c._face = c._dir = false;
		if( action == 'play_all' ) {
			for( var y = 0; y <= 14; y++ ) {
				for( var x = 0; x <= 8; x++ ) {
					c._queue.push( [ x, y ] );
				}
			}
		} else if( action == 'stop' ) {
			c._queue = [];
		} else if( action == 'spin' ) {
			var s = motion.other.spin;
			c._queue = [].concat(s,s,s,s,s);
		}
	}
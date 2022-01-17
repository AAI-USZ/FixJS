function update() {
	// handles all inspector movement
	if( c._mouse == false ) {
		if( c._motion !== 'stop' ) {
			var movement = _animation[ c._motion ][ c._dir ][1];
			c._queue.push( movement[ Math.floor( Math.random() * movement.length ) ] );
		} else if( c._face !== false ) {
			c._queue.push( _animation.idle[ c._face ][1][0] );
		}
	}
}
function update() {
	// handles all inspector movement
	if( c._mouse == false && _animation ) {
		// check for key presses
		if( keydown.state ) {
			// simples have to go at the bottom!
			     if( keydown.alt && keydown.up )		{ c._motion = 'gazewalk'; }
			else if( keydown.alt && keydown.down )		{ c._motion = 'crouchwalk'; }
			else if( keydown.a && keydown.space )		{ c._motion = 'attackjump'; }
			else if( keydown.a && keydown.space )		{ c._motion = 'attackjump'; }
			else if( keydown.a && keydown.left )		{ c._motion = 'attackwalk'; }
			else if( keydown.a && keydown.right )		{ c._motion = 'attackwalk'; }
			else if( keydown.shift && keydown.left )	{ c._motion = 'holdwalk'; }
			else if( keydown.shift && keydown.right )	{ c._motion = 'holdwalk'; }
			else if( keydown.up ) 						{ c._motion = 'gaze'; }
			else if( keydown.down ) 					{ c._motion = 'crouch'; }
			else if( keydown.shift ) 					{ c._motion = 'hold'; }
			else if( keydown.space ) 					{ c._motion = 'jump'; }
			else if( keydown.x ) 						{ c._motion = 'dead'; }
			else if( keydown.a ) 						{ c._motion = 'attack'; }
			else if( keydown.left )						{ c._motion = 'walk'; }
			else if( keydown.right )					{ c._motion = 'walk'; }
			else										{ c._motion = 'stop'; }

			// direction
			if( keydown.left ) { c._dir = 'left' }
			else if( keydown.right ) { c._dir = 'right' }
		} else {
			c._face = c._dir;
			c._motion = 'stop';
		}
		// now be somebody!!!
		if( c._motion !== 'stop' ) {
			if( _animation[ c._motion ] ) {
				var _m = _animation[ c._motion ][ c._dir ];
				if( _m ) {
					if( !_m._step ) _m._step = 0;
					c._queue.push( _m[1][ _m._step++ % _m[1].length ] );
				}
			}
		} else if( c._face !== false ) {
			c._queue.push( _animation.idle[ c._face ][1][0] );
		}
	}
	if( c._queue.length > 0 ) {
		var o = c._queue.shift();
		c._next_frame = o;
	} else {
		c._next_frame = c._highlighted;
	}
}
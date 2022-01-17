function(e) {
		if( c._mouse != 'lock' ) {
			c._mouse = true;
			var loc = get_square_coords(e);
			$highlighter.css( {
				left: loc.X * 48,
				top: loc.Y * 48
			} );
			c._highlighted = [ loc.X, loc.Y ];
			$artboard.attr('title','[ ' + loc.X + ', ' + loc.Y + ' ]');
		}
	}
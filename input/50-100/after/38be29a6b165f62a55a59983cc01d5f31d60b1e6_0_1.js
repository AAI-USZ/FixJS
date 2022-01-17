function( color ) {
			var i, c,
				colors = this._colors,
				len = colors.length;
			color = new Color( color );
			for ( i = 0; i < len; ++i ) {
				c = colors[i];
				if( c.equals( color, 0.02 ) ) {
					return i;
				}
			}
			return -1;
		}
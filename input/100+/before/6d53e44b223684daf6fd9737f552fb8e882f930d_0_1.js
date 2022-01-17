function( str ) {
		var match, color,
			self = this,
			hexaPattern = self.patterns.hexa,
			hexaAlphaPattern = self.patterns.hexaAlpha;

		match = str.match( hexaPattern );
		if( match ) {
			color = {
				r : parseInt( match[2], 16),
				g : parseInt( match[3], 16),
				b : parseInt( match[4], 16)
			};
		} else {
			match = str.match( hexaAlphaPattern );
			if( match ) {
				color = {
					r : parseInt( match[3], 16),
					g : parseInt( match[4], 16),
					b : parseInt( match[5], 16),
					a : parseInt( match[2], 16)
				};
			}
		}

		return color ? color : null;
	}
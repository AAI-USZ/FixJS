function( match ) {
			if ( matchExpr.CHILD.test( match[0] ) ) {
				return null;
			}

			// clean up unquoted arguments
			if ( match[2] && !match[3] ) {

				// parse as much as possible
				var unquoted = match[5],
					excess = ~unquoted.indexOf(")") && tokenize( unquoted, null, true, true );

				// advance to the next closing parenthesis
				if ( excess ) {
					excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length;
				}

				// update match properties
				if ( excess ) {
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[4] = unquoted;
			}

			return match;
		}
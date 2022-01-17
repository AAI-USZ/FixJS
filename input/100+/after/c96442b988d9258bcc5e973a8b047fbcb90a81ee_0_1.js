function( match ) {
			var unquoted, beforeClosing;

			if ( matchExpr.CHILD.test( match[0] ) ) {
				return null;
			}

			// Clean up unquoted
			if ( (unquoted = match[4]) ) {

				// Check if we've picked up trailing pseudos
				if ( (beforeClosing = rtrailingPseudo.exec( unquoted )) && !beforeClosing.index ) {
					unquoted = beforeClosing[1];
					match[0] = match[0].slice( 0, match[0].indexOf( unquoted ) + unquoted.length + 1 );
				}

				match[2] = unquoted;
			} else {
				match[2] = match[3];
			}

			// Splice out unneeded captures for passing
			// arguments to the pseudo filter method
			match = match.splice( 0, 3 );

			return match;
		}
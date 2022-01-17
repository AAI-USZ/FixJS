function( match ) {
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace( radjacent, "" );

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = rnth.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!rnonDigit.test( match[2] ) && "0n+" + match[2] || match[2] );

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = +(test[1] + (test[2] || 1));
				match[3] = +test[3];
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		}
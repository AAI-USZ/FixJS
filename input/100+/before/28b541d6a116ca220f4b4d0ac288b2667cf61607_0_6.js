function () {
	var soFar, match, tokens,
		advance = function( pattern, type, xml ) {
			if ( (match = pattern.exec( soFar )) &&
					( !type || !Expr.preFilter[ type ] || (match = Expr.preFilter[ type ]( match, xml )) ) ) {
				soFar = soFar.slice( match[0].length );
			}
			return match;
		};

	tokenize = function( selector, context, xml ) {
		soFar = selector;
		tokens = [];

		var type, matched,
			checkContext = !xml && context !== document,
			groups = [ tokens ];

		// Need to make sure we're within a narrower context if necessary
		// Adding a descendent combinator will generate what is needed automatically
		if ( checkContext ) {
			soFar = " " + soFar;
		}

		while ( soFar ) {
			matched = false;
			if ( advance(rcomma) ) {
				groups.push(tokens = []);
				if ( checkContext ) {
					soFar = " " + soFar;
				}
			}
			if ( advance(rcombinators) ) {
				tokens.push({ part: match.pop(), captures: match });
				matched = true;
			}
			for ( type in Expr.filter ) {
				if ( advance(matchExpr[ type ], type, xml) ) {
					match.shift();
					tokens.push({ part: type, captures: match });
					matched = true;
				}
			}

			if ( !matched ) {
				Sizzle.error( selector );
			}
		}

		return groups;
	};
}
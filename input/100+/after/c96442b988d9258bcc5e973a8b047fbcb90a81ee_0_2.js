function handlePOS( selector, context, results, seed, groups ) {
	var match, not, anchor, ret, elements,
		currentContexts, part, lastIndex,
		i = 0,
		len = groups.length,
		rpos = matchExpr.POS,
		// This is generated here in case matchExpr.POS is extended
		rposgroups = new RegExp( "^" + matchExpr.POS.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			for ( var i = 1, len = arguments.length - 2; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		// Reset regex index to 0
		rpos.exec("");
		selector = groups[i];
		ret = [];
		anchor = 0;
		elements = seed || null;
		while ( (match = rpos.exec( selector )) ) {
			lastIndex = match.index + match[0].length;
			if ( lastIndex > anchor ) {
				part = selector.slice( anchor, match.index );
				anchor = lastIndex;
				currentContexts = [ context ];

				if ( rcombinators.test(part) ) {
					currentContexts = elements || currentContexts;
					elements = seed;
				}

				if ( (not = rendsWithNot.test( part )) ) {
					part = part.replace( rendsWithNot, "" ).replace( rcombinators, "$&*" );
				}

				if ( match.length > 1 ) {
					match[0].replace( rposgroups, setUndefined );
				}
				elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
			}

			if ( rpos.lastIndex === match.index ) {
				rpos.lastIndex++;
			}
		}

		if ( elements ) {
			ret = ret.concat( elements );

			if ( (part = selector.slice( anchor )) && part !== ")" ) {
				multipleContexts( part, ret, results, seed );
			} else {
				push.apply( results, ret );
			}
		} else {
			Sizzle( selector, context, results, seed );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}
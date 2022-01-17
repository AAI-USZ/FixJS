function handlePOS( selector, context, results, seed, isSingle ) {
	var match, m, not,
		currentContexts, part, lastIndex,
		elements = seed || null,
		ret = [],
		anchor = 0,
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

	// Make sure the regex index is reset to 0
	rpos.exec("");

	while ( (match = rpos.exec( selector )) ) {
		lastIndex = match.index + match[0].length;
		if ( lastIndex > anchor ) {
			part = selector.slice( anchor, match.index );
			if ( match.length > 1 ) {
				match[0].replace( rposgroups, setUndefined );
			}
			anchor = lastIndex;

			currentContexts = [ context ];
			if ( (not = rendsWithNot.test( part )) ) {
				part = part.replace( rendsWithNot, "" ).replace( rcombinators, "$&*" );
			}
			if ( (m = part.match( rgroups )) && m[0] !== part ) {
				part = part.replace( rcomma, "" );
				ret = ret.concat( elements );
				elements = seed;
			}

			if ( rcombinators.test(part) ) {
				currentContexts = elements || [ context ];
				elements = seed;
			}

			elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
		}

		if ( rpos.lastIndex === match.index ) {
			rpos.lastIndex++;
		}
	}

	ret = ret.concat( elements );

	if ( (part = selector.slice( anchor )) && part !== ")" ) {
		elements = ret;
		ret = [];
		multipleContexts( part, elements, ret, seed );
	}

	// Do not sort if this is a single filter
	push.apply( results, (seed && isSingle ? ret : Sizzle.uniqueSort(ret)) );
	return results;
}
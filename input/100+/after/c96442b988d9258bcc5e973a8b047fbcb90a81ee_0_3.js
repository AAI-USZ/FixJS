function tokenize( selector, context, xml ) {
	var match, tokens, type, invalid,
		groups = [],
		soFar = selector,
		preFilters = Expr.preFilter,
		filters = Expr.filter,
		checkContext = !xml && context !== document;

	while ( soFar ) {
		invalid = true;

		// Comma or start
		if ( !tokens || (match = rcomma.exec( soFar )) ) {
			groups.push(tokens = []);
			if ( match ) {
				soFar = soFar.slice( match[0].length );
			}

			// Need to make sure we're within a narrower context if necessary
			// Adding a descendant combinator will generate what is needed
			if ( checkContext ) {
				soFar = " " + soFar;
			}
		}
		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			soFar = soFar.slice( match[0].length );

			// Cast whitespace combinators to space
			tokens.push({ part: match.pop().replace(rtrim, " "), captures: match });
			invalid = false;
		}
		// Filters
		for ( type in filters ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match, context, xml )) ) ) {

				soFar = soFar.slice( match.shift().length );
				tokens.push({ part: type, captures: match });
				invalid = false;
			}
		}

		if ( invalid ) {
			Sizzle.error( selector );
		}
	}

	return groups;
}
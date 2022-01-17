function tokenize( selector, context, xml, parseOnly ) {
	var match, tokens, type,
		groups = [],
		invalid = true,
		soFar = selector,
		preFilters = Expr.preFilter,
		filters = Expr.filter,
		checkContext = !xml && context !== document;

	while ( soFar ) {
		if ( invalid || (match = rcomma.exec( soFar )) ) {
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
		invalid = true;
		if ( (match = rcombinators.exec( soFar )) ) {
			soFar = soFar.slice( match[0].length );

			// Cast whitespace combinators to space
			tokens.push({ part: match.pop().replace(rtrim, " "), captures: match });
			invalid = false;
		}
		for ( type in filters ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match, xml )) ) ) {

				soFar = soFar.slice( match.shift().length );
				tokens.push({ part: type, captures: match });
				invalid = false;
			}
		}

		if ( invalid ) {
			break;
		}
	}

	return parseOnly ?
		soFar.length :
		invalid ?
			Sizzle.error( selector ) :
			groups;
}
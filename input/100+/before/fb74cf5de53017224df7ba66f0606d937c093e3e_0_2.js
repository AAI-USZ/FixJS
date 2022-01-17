function( selector, context, results, seed, xml ) {
	var elements, matcher, i, len, elem, token, position,
		type, match, findContext, notTokens,
		isSingle = (match = selector.match( rgroups )) && match.length === 1,
		tokens = selector.match( rtokens ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr.POS.test(selector) ) {
		return handlePOS( selector, context, results, seed, isSingle );
	}

	// Take a shortcut and set the context if the root selector is an ID
	if ( !seed && isSingle && tokens.length > 1 && contextNodeType === 9 && !xml &&
			(match = matchExpr.ID.exec( tokens[0] )) ) {

		context = Expr.find.ID( match[1], context, xml )[0];
		selector = selector.slice( tokens.shift().length );
	}

	if ( context ) {
		if ( seed ) {
			elements = slice.call( seed, 0 );

		} else {

			// Maintain document order by not limiting the set
			if ( isSingle ) {
				findContext = (tokens.length >= 1 && rsibling.test( tokens[0] ) && context.parentNode) || context;

				// Get the last token, excluding :not
				notTokens = tokens.pop().split(":not");
				token = notTokens[0];

				for ( i = 0, len = Expr.order.length; i < len; i++ ) {
					type = Expr.order[i];

					if ( (match = matchExpr[ type ].exec( token )) ) {
						elements = Expr.find[ type ]( (match[1] || "").replace( rbackslash, "" ), findContext, xml );

						if ( elements != null ) {
							break;
						}
					}
				}

				if ( elements && !notTokens[1] ) {
					position = selector.length - token.length;
					selector = selector.slice( 0, position ) +
						selector.slice( position ).replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
						return results;
					}
				}
			}

			if ( !elements ) {
				elements = Expr.find.TAG( "*", context );
			}
		}

		// Only loop over the given elements once
		// If selector is empty, we're already done
		if ( selector && (matcher = compile( selector, context, xml )) ) {
			dirruns = matcher.dirruns;
			for ( i = 0; (elem = elements[i]); i++ ) {
				cachedruns = matcher.runs++;
				if ( matcher(elem, context) ) {
					results.push( elem );
				}
			}
		}
	}

	return results;
}
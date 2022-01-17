function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var newSelector,
						oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || expando,
						parent = context.parentNode;

					if ( old ) {
						nid = nid.replace( rapostrophe, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					if ( parent && rsibling.test( selector ) ) {
						context = parent;
					}

					try {
						if ( context ) {
							nid = "[id='" + nid + "'] ";
							newSelector = nid + selector.replace( rdivision, "$&" + nid );
							push.apply( results, slice.call(context.querySelectorAll( newSelector ), 0) );
							return results;
						}
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		}
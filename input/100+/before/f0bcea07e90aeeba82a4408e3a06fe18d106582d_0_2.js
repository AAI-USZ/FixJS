function(){
		var oldSelect = select,
			div = document.createElement("div"),
			id = "__sizzle__",
			rrelativeHierarchy = /^\s*[+~]/,
			rapostrophe = /'/g;

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}

		select = function( selector, context, results, seed, contextXML ) {
			// Only use querySelectorAll on non-XML documents
			if ( !seed && !contextXML ) {
				if ( context.nodeType === 9 ) {
					try {
						return makeArray( context.querySelectorAll(selector), results );
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						parent = context.parentNode,
						relativeHierarchySelector = rrelativeHierarchy.test( selector );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( rapostrophe, "\\$&" );
					}
					if ( relativeHierarchySelector && parent ) {
						context = parent;
					}

					try {
						if ( !relativeHierarchySelector || parent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + selector ), results );
						}
					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, contextXML );
		};

		// release memory in IE
		div = null;
	}
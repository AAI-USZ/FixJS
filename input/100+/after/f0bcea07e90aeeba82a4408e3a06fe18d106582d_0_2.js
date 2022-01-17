function(){
		var oldSelect = select,
			id = "__sizzle__",
			rrelativeHierarchy = /^\s*[+~]/,
			rapostrophe = /'/g,
			rbuggyQSA = [];

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			div.innerHTML = "<select><option selected='selected'></option></select>";
			if ( !div.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push(":checked");
			}

			// assertQSAAttrEmptyValue
			// Opera 10/IE - ^= $= *= and empty values
			div.innerHTML = "<p class=''></p>";
			// Should not select anything
			if ( !!div.querySelectorAll("[class^='']").length ) {
				rbuggyQSA.push("[*^$]=[\\x20\\t\\n\\r\\f]*(?:\"\"|'')");
			}

			// assertQSAHiddenEnabled
			// IE8 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			div.innerHTML = "<input type='hidden'>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		});

		select = function( selector, context, results, seed, contextXML ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !contextXML && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
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
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, contextXML );
		};
	}
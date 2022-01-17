function (node) {
			ASSERT(isValid(node));

			var target = EMPTY_STRING;
			var names = [];

			do {
				var child = pertree.getProperty2(node, OVERLAYS, target);
				if( child ) {
					for( var name in child ) {
						if( ! isPointerName(name) ) {
							name = name.slice(0, -COLLSUFFIX.length);
							if( names.indexOf(name) < 0 ) {
								names.push(name);
							}
						}
					}
				}

				if( target === EMPTY_STRING ) {
					target = pertree.getRelid(node);
				}
				else {
					target = pertree.getRelid(node) + "/" + target;
				}

				node = pertree.getParent(node);
			} while( node );

			return names;
		}
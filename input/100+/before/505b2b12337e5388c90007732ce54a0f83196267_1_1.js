function (node, name) {
			ASSERT(isValid(node) && typeof name === "string");

			var source = EMPTY_STRING;
			var target;

			do {
				var child = pertree.getChild(node, OVERLAYS);
				ASSERT(child);

				child = pertree.getChild(child, source);
				if( child ) {
					target = pertree.getProperty(child, name);
					if( target ) {
						break;
					}
				}

				if( source === EMPTY_STRING ) {
					source = pertree.getRelid(node);
				}
				else {
					source = pertree.getRelid(node) + "/" + source;
				}

				node = pertree.getParent(node);
			} while( node );

			if( target ) {
				target = pertree.joinStringPaths(pertree.getStringPath(node), target);
			}

			return target;
		}
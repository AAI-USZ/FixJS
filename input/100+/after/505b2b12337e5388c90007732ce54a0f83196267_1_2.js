function (node, name, callback) {
			ASSERT(isValid(node) && name && typeof callback === "function");

			var source = EMPTY_STRING;
			var target;

			do {
				var child = pertree.getChild(node, OVERLAYS);
				ASSERT(child);

				child = pertree.getChild(child, source);
				if( child ) {
					target = pertree.getProperty(child, name);
					if( target !== undefined ) {
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

			if( target !== undefined ) {
				ASSERT(typeof target === "string" && node);
				pertree.loadByPath(node, target, callback);
			}
			else {
				callback(null, null);
			}
		}
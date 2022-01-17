function (node, name) {
			ASSERT(isValid(node) && name);

			name += COLLSUFFIX;

			var result = [];
			var target = EMPTY_STRING;

			do {
				var child = pertree.getChild(node, OVERLAYS);

				child = pertree.getChild(child, target);
				if( child ) {
					var sources = pertree.getProperty(child, name);
					if( sources ) {
						ASSERT(sources.constructor === Array);
						ASSERT(sources.length >= 1);

						var prefix = pertree.getStringPath(node);

						for( var i = 0; i < sources.length; ++i ) {
							result.push(pertree.joinStringPaths(prefix, sources[i]));
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

			return result;
		}
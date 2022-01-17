function (node, name, callback) {
			ASSERT(isValid(node) && name && typeof callback === "function");

			name += COLLSUFFIX;

			var result = new UTIL.AsyncArray(callback);
			var target = EMPTY_STRING;

			do {
				var child = pertree.getChild(node, OVERLAYS);

				child = pertree.getChild(child, target);
				if( child ) {
					var sources = pertree.getProperty(child, name);
					if( sources ) {
						ASSERT(sources.constructor === Array);
						ASSERT(sources.length >= 1);

						for( var i = 0; i < sources.length; ++i ) {
							pertree.loadByPath(node, sources[i], result.add());
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

			result.start();
		}
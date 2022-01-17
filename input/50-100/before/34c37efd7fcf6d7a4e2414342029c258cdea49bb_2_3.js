function (node, base) {
			ASSERT(isValid(node));
			ASSERT(base === undefined || isValid(base));

			var path = EMPTY_STRING;
			while( node.parent && node !== base ) {
				if( path === EMPTY_STRING ) {
					path = node.relid;
				}
				else {
					path = node.relid + "/" + path;
				}
				node = node.parent;
			}

			return path;
		}
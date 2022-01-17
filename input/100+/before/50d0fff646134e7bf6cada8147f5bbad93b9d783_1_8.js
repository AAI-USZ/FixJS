function (node, name) {
			ASSERT(node && name);

			var source = EMPTY_STRING;

			do {
				var overlays = pertree.getChild(node, OVERLAYS);
				ASSERT(overlays);

				var target = pertree.getProperty2(overlays, source, name);
				if( target ) {
					removeOverlay(overlays, source, name, target);
					return true;
				}

				if( source === EMPTY_STRING ) {
					source = pertree.getRelid(node);
				}
				else {
					source = pertree.getRelid(node) + "/" + source;
				}

				node = pertree.getParent(node);
			} while( node );

			return false;
		}
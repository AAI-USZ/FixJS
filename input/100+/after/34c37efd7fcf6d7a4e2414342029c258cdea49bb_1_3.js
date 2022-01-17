function (node) {
			ASSERT(isValid(node));

			var parent = pertree.getParent(node);
			var prefix = "" + pertree.getRelid(node);
			ASSERT(parent !== null);

			pertree.delParent(node);

			while( parent ) {
				var overlays = pertree.getChild(parent, OVERLAYS);

				var list = overlayQuery(overlays, prefix);
				for( var i = 0; i < list.length; ++i ) {
					var entry = list[i];
					overlayRemove(overlays, entry.s, entry.n, entry.t);
				}

				prefix = pertree.getRelid(parent) + "/" + prefix;
				parent = pertree.getParent(parent);
			}
		}
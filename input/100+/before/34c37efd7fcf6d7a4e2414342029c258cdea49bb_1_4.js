function (node, parent) {
			ASSERT(isValid(node) && (!parent || isValid(parent)));

			var newnode;

			if( parent ) {
				var ancestor = pertree.getCommonAncestor(node, parent);
				ASSERT(ancestor[0] === ancestor[1]);

				// cannot copy inside of itself
				if( ancestor[0] === node ) {
					return null;
				}

				newnode = pertree.copyNode(node);
				var relid = createRelid(parent.data);
				pertree.setParent(newnode, parent, relid);

				var ancestorOverlays = pertree.getChild(ancestor[0], OVERLAYS);
				var ancestorNewPrefix = pertree.getStringPath(node, ancestor[0]);

				var base = pertree.getParent(node);
				var basePrefix = pertree.getRelid(node);

				while( base !== ancestor[0] ) {

					var baseOverlays = pertree.getChild(base, OVERLAYS);
					var list = overlayQuery(baseOverlays, basePrefix);
					var ancestorOldPrefix = pertree.getStringPath(base, ancestor[0]);

					for( var i = 0; i < list.length; ++i ) {
						var entry = list[i];
						if( entry.p ) {
							ASSERT(entry.s.substr(0, basePrefix.length) === basePrefix);

							var newSource = ancestorNewPrefix + entry.s.substr(basePrefix.length);
							var newTarget = ancestorOldPrefix + entry.t;

							overlayInsert(ancestorOverlays, newSource, entry.n, newTarget);
						}
					}

					basePrefix = pertree.getRelid(base) + "/" + basePrefix;
					base = pertree.getParent(base);
				}
			}
			else {
				newnode = pertree.copyNode(node);
			}

			return newnode;
		}
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
				var ancestorNewNodePath = pertree.getStringPath(newnode, ancestor[0]);

				var base = pertree.getParent(node);
				var baseOldNodePath = "" + pertree.getRelid(node);
				var baseBelowAncestor = false;

				while( base ) {
					var baseOverlays = pertree.getChild(base, OVERLAYS);
					var list = overlayQuery(baseOverlays, baseOldNodePath);

					var ancestorBasePath = baseBelowAncestor ? pertree.getStringPath(ancestor[0],
					base) : pertree.getStringPath(base, ancestor[0]);

					for( var i = 0; i < list.length; ++i ) {
						var entry = list[i];
						if( entry.p ) {
							var newSource, newTarget;

							if( baseBelowAncestor ) {
								ASSERT(entry.s.substr(0, ancestorBasePath.length) === ancestorBasePath);

								newSource = ancestorBasePath + "/" + ancestorNewNodePath
								+ entry.s.substr(ancestorBasePath.length);

								overlayInsert(baseOverlays, newSource, entry.n, entry.t);
							}
							else {
								ASSERT(entry.s.substr(0, baseOldNodePath.length) === baseOldNodePath);

								newSource = ancestorNewNodePath
								+ entry.s.substr(baseOldNodePath.length);
								newTarget = ancestorBasePath + entry.t;

								overlayInsert(ancestorOverlays, newSource, entry.n, newTarget);
							}
						}
					}

					if( base === ancestor[0] ) {
						baseBelowAncestor = true;
					}

					baseOldNodePath = pertree.getRelid(base) + "/" + baseOldNodePath;
					base = pertree.getParent(base);
				}
			}
			else {
				newnode = pertree.copyNode(node);
			}

			return newnode;
		}
function (node, callback) {
			ASSERT(node && callback);

			var children = new UTIL.AsyncArray(callback);

			for( var relid in node.data ) {
				if( isValidRelid(relid) ) {
					pertree.loadChild(node, relid, children.add());
				}
			}

			children.start();
		}
function (node, callback) {
			ASSERT(isValid(node) && typeof callback === "function");

			var children = new UTIL.AsyncArray(callback);

			for( var relid in node.data ) {
				if( isValidRelid(relid) ) {
					pertree.loadChild(node, relid, children.add());
				}
			}

			children.start();
		}
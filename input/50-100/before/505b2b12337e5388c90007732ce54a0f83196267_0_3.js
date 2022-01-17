function(node) {

			var name = "";

			while( node ) {

				name = core.getAttribute(node, "name") + name;

				node = core.getParent(node);

			}

			return name;

		}
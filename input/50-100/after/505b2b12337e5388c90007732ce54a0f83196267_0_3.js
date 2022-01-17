function (node) {

			if( node === null ) {

				return "null";

			}

			else if( node === undefined ) {

				return "undefined";

			}



			var name = "";

			while( node ) {

				name = core.getAttribute(node, "name") + name;

				node = core.getParent(node);

			}

			return name;

		}
function (path) {

			if( path === undefined ) {

				return null;

			}



			for( var name in nodes ) {

				if( path === core.getStringPath(nodes[name]) ) {

					return name;

				}

			}

			return "unknown";

		}
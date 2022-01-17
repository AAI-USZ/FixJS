function (storage, root, callback) {

		core = new Core(storage);



		var findNameByPath = function (path) {

			if( path === undefined ) {

				return null;

			}



			for( var name in nodes ) {

				if( path === core.getStringPath(nodes[name]) ) {

					return name;

				}

			}

			return "unknown";

		};



		var printStats = function (what, func) {

			ASSERT(core);



			console.log("Printing " + what + ":");

			for( var name in nodes ) {

				console.log(name + ":", func(nodes[name]));

			}

			console.log();

		};

		

		printStats("attribute names", core.getAttributeNames);

		printStats("node names", function (node) {

			return core.getAttribute(node, "name");

		});

		printStats("pointer names", core.getPointerNames);

		printStats("collection names", core.getCollectionNames);

		printStats("pointer paths", function (node) {

			return core.getPointerPath(node, "ptr");

		});

		printStats("pointer targets", function (node) {

			return findNameByPath(core.getPointerPath(node, "ptr"));

		});

		printStats("collection count", function (node) {

			return core.getCollectionPaths(node, "ptr").length;

		});

		printStats("children count", function (node) {

			return core.getChildrenRelids(node).length;

		});

		printStats("lavels", core.getLevel);

		

		callback(null);

	}
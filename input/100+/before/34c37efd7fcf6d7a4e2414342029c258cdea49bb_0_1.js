function (err) {



			printStats("attribute names", core.getAttributeNames);

			printStats("pointer names", core.getPointerNames);

			printStats("collection names", core.getCollectionNames);

			printStats("pointer paths", function (node) {

				return core.getPointerPath(node, "ptr");

			});



			callback(err, core.getKey(nodes.a));

		}
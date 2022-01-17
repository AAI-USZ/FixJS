function (storage, root, callback) {

		core = new Core(storage);



		createNode("a");

		createNode("b", "a");

		createNode("c", "a");

		createNode("d", "b");

		createNode("e", "b");



		core.setPointer(nodes.d, "ptr", nodes.c);

		// core.setPointer(nodes.c, "ptr", nodes.a);

		// core.deletePointer(nodes.c, "ptr");



		// core.deleteNode(nodes.b);



//		nodes.e = core.copyNode(nodes.b, nodes.c);

//		core.setAttribute(nodes.e, "name", "e");



		core.persist(nodes.a, function (err) {

			callback(err, core.getKey(nodes.a));

		});

	}
function (storage, root, callback) {

		core = new Core(storage);



		createNode("a");

		createNode("b", "a");

		createNode("c", "a");

		createNode("d", "b");

		createNode("e", "b");



		core.setPointer(nodes.b, "ptr", nodes.e);

		core.setPointer(nodes.c, "ptr", nodes.a);

		core.setPointer(nodes.d, "ptr", nodes.c);

		// core.deletePointer(nodes.c, "ptr");



		// core.deleteNode(nodes.d);



		nodes.f = core.copyNode(nodes.b, nodes.c);

		core.setAttribute(nodes.f, "name", "f");



		core.persist(nodes.a, function (err) {

			callback(err, core.getKey(nodes.a));

		});

	}
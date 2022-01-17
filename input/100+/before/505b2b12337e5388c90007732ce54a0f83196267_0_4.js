function (storage, root, callback) {

		core = new Core(storage);



		var loadChildren = function(node, callback2) {

			core.loadChildren(node, function(err, array) {

				if( !err ) {

					ASSERT( array.constructor === Array );

					array.sort(function(nodea, nodeb) {

						var namea = core.getAttribute(nodea, "name");

						var nameb = core.getAttribute(nodeb, "name");

						ASSERT(typeof namea === "string" && typeof nameb === "string");

					

						return namea.localeCompare(nameb);

					});

				}

				callback2(err, array);

			});

		};

		

		var getNodeName = function(node) {

			var name = "";

			while( node ) {

				name = core.getAttribute(node, "name") + name;

				node = core.getParent(node);

			}

			return name;

		};

		

		console.log("Printing out tree in alphanumerical order");

		core.loadRoot(root, function(err, node) {

			UTIL.depthFirstSearch(loadChildren, node, function(child, callback2) {

				

				var line = getNodeName(child) + ":";



				var finish = new UTIL.AsyncJoin(function(err2) {

					console.log(line);

					callback2(err2);

				});

				

				var addName = function(callback3, what, err, target) {

					if( !err ) {

						line += " " + what + "=" + getNodeName(target);

					}

					

					callback3(err);

				};

				

				var pointers = core.getPointerNames(child);

				for(var i = 0; i < pointers.length; ++i) {

					core.loadPointer(child, pointers[i], addName.bind(null, finish.add(), pointers[i]));

				}

				finish.start();

			}, function(child, callback2) {

				callback2(null);

			}, function(err) {

				console.log("Printing done");

				callback(err, root);

			});

		});

	}
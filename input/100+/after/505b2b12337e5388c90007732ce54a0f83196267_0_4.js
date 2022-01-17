function (storage, root, callback) {

		core = new Core(storage);



		var loadChildren = function (node, callback2) {

			core.loadChildren(node, function (err, array) {

				if( !err ) {

					ASSERT(array.constructor === Array);

					array.sort(function (nodea, nodeb) {

						var namea = core.getAttribute(nodea, "name");

						var nameb = core.getAttribute(nodeb, "name");

						ASSERT(typeof namea === "string" && typeof nameb === "string");



						return namea.localeCompare(nameb);

					});

				}

				callback2(err, array);

			});

		};



		var getNodeName = function (node) {

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

		};



		console.log("Printing out tree in alphanumerical order");

		core.loadRoot(root, function (err, node) {

			UTIL.depthFirstSearch(loadChildren, node, function (child, callback2) {



				var line = getNodeName(child) + ":";

				// line += " path=" + core.getStringPath(child);



				var finish = new UTIL.AsyncJoin(function (err2) {

					console.log(line);

					callback2(err2);

				});



				var addPointer = function (callback3, what, err, target) {

					if( !err ) {

						line += " " + what + "=" + getNodeName(target);

					}



					callback3(err);

				};



				var addCollection = function (callback3, what, err, sources) {

					if( !err ) {

						var s = "";

						for( var j = 0; j < sources.length; ++j ) {

							if( j !== 0 ) {

								s += ",";

							}

							s += getNodeName(sources[j]);

						}

						line += " " + what + "-inv=[" + s + "]";

					}



					callback3(err);

				};



				var names = core.getPointerNames(child);

				for( var i = 0; i < names.length; ++i ) {

					core

					.loadPointer(child, names[i], addPointer.bind(null, finish.add(), names[i]));

					// line += " " + names[i] + "-path=" +

					// core.getPointerPath(child, names[i]);

				}



				names = core.getCollectionNames(child);

				for( i = 0; i < names.length; ++i ) {

					core.loadCollection(child, names[i], addCollection.bind(null, finish.add(),

					names[i]));

				}



				finish.start();

			}, function (child, callback2) {

				callback2(null);

			}, function (err) {

				console.log("Printing done");

				callback(err, root);

			});

		});

	}
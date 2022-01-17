function (err, files) {
						files = files.sort();
						var orderEntry, untilFile;

						while (orderEntry = order.shift()) {
							if (orderEntry === "*") {
								untilFile = order.length > 0 ? order[0] : undefined;

								while (files.length &&
									files[0] !== untilFile + ".js") {
									loadController(files.shift());
								}

							} else {
								for (var index = 0; index < files.length; index += 1) {
									if (orderEntry + ".js" === files[index]) {
										loadController(files[index]);
										files.splice(index, 1);
										orderEntry = undefined;
									}
								}
								if (orderEntry) { throw new Error("Unable to find registered controller '" + orderEntry + "'"); }
							}
						}

						function loadController(filename) {
							try {
								require(fs.combine(process.cwd(), path, filename)).init(app);
								console.log("Controller '" + filename + "' loaded sucessfully.")
							} catch (err) {
								console.error("Error loading controller", filename, err.stack, err);
								throw err;
							}
						}
					}
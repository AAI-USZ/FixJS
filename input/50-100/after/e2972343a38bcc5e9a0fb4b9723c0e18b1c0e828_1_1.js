function (err) {
									if (plugins.hasOwnProperty("afterSave")) {
										for (var k in plugins["afterSave"]) {
											plugins["afterSave"][k](data, Model);
										}
									}
									if (--missingInstances === 0) cb(null);
								}
function () {
					var args = argsNet;
					argsNet = undef; // reset it before we get deps

					// if our resource was not explicitly defined with an id (anonymous)
					// Note: if it did have an id, it will be resolved in the define()
					if (def.useNet !== false) {

						// if !args, nothing was added to the argsNet
						if (!args || args.ex) {
							def.reject(new Error((args.ex || 'define() missing or duplicated: url').replace('url', def.url)));
						}
						else {
							core.resolveResDef(def, args);
						}
					}

				}
function (module) {

				if (typeof module.then == 'function') {
					// promise-like module
					module.then(
						function (resource) {
							if (arguments.length == 0) resource = module;
							resolved(resource);
						},
						rejected
					);
				}
				else {
					// just a callback
					resolved(module);
				}
			}
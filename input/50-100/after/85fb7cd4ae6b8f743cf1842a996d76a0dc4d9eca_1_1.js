function (module) {

				if (typeof module.then == 'function') {
					// promise-like module
					module.then(
						function (resource) {
							if (arguments.length == 0) resource = module;
							callback(resource);
						},
						rejected
					);
				}
				else {
					// just a normal module
					callback(module);
				}
			}, callback['error'] || function (ex) { throw ex; }
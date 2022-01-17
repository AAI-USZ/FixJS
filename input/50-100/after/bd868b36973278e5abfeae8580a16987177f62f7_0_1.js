function configureResources(config, cb) {
		if (config && config.webserver.resources) {
			return resources.configure(config.webserver.resources,
				synchronizer.register("resources", function (err, resources) {
					if (err) { return callback(err); }
					cb(config, resources);
				}));
		} else {
			return cb(config, null);
		}
	}
function configureResources(config, cb) {
		if (config && config.webserver && config.webserver.resources) {
			return resources.configure(config.webserver.resources,
				synchronizer.register(function (err, resources) {
					console.log("Check");
					if (err) { return callback(err); }
					cb(config, resources);
				}));
		} else {
			return cb(null, config);
		}
	}
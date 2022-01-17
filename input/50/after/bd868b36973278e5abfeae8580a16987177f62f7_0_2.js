function (err, resources) {
					if (err) { return callback(err); }
					cb(config, resources);
				}
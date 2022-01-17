function (err, resources) {
					console.log("Check");
					if (err) { return callback(err); }
					cb(config, resources);
				}
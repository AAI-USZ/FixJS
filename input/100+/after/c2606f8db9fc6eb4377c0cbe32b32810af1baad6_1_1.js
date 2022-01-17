function (err, objects) {
				if (err) {
					utils.quicklog(err.message);
				} else {
					callback(objects);
				}
				self.serverMongo.close();
		}
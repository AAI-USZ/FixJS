function (err, files) {
			if (err) { return callback(err); }
			var synchronizer = new core.Synchronizer();

			files.forEach(function (file) {
				fs.readFile(self.combine(path, file), synchronizer.register(file));
			});

			synchronizer.onfinish(callback);
		}
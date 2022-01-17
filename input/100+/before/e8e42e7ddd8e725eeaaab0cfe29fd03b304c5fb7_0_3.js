function (path, pattern, deep, callback) {
		if (!path || typeof path !== 'string') {
			throw new Error("Path is not specified");
		}
		if (deep === true) {
			throw new Error("Deep searching is not yet implemented.");
		}
		if (deep && deep instanceof Function && callback === undefined) {
			callback = deep;
			deep = false;
		}
		if (pattern && pattern instanceof Function && callback === undefined) {
			callback = pattern;
			pattern = undefined;
		}
		if (pattern && typeof pattern === 'boolean') {
			deep = pattern;
		}

		self.getAllFiles(path, pattern, [], deep, function (err, files) {
			if (err) { return callback(err); }
			var synchronizer = new core.Synchronizer();

			files.forEach(function (file) {
				fs.readFile(self.combine(path, file), synchronizer.register(file));
			});

			synchronizer.onfinish(callback);
		});
	}
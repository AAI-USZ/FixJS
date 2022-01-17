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
		var synchronizer = new core.Synchronizer()
			, dir;

		self.getAllFiles(path, pattern, [], deep, synchronizer.register( function (err, files) {
			if (files.name === ".") {
				dir = files;
			}
		})).onfinish(function (err, result) {
				dir.files.forEach(function (file) {
					file.readContent(synchronizer.register(file.name));
				});
				synchronizer.onfinish(callback);
			});
	}
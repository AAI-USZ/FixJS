function(path) {
		var stats; 

		if (typeof path === "undefined"
			|| (typeof path === "string" && path.trim().length === 0)) {
			throw new Error("The path must be provided when instantiating the object.");
		}

		// Resolve the given require path relative to the parent module's directory.
		// This way the user can provide paths that are relative to themselves.
		path = _path.resolve(_path.dirname(module.parent.filename), path);

		try {
			stats = _fs.statSync(path);
		} catch (e) {
			throw new Error("The directory path does not exist. [" + path + "]");
		}

		if (!stats.isDirectory()){
			throw new Error("The path provided is not a directory. [" + path + "]");
		}

		return path;
	}
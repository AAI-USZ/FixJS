function(path) {
		var stats; 

		if (typeof path === "undefined"
			|| (typeof path === "string" && path.trim().length === 0)) {
			throw new Error("The path must be provided when instantiating the object.");
		}

		// Resolve the full path so that if an error occurs
		// we can show the user the absolute path, for clarity.
		path = _path.resolve(path);

		try {
			stats = _fs.statSync(path);
		} catch (e) {
			throw new Error("The directory path does not exist. [" + path + "]");
		}

		if (!stats.isDirectory()){
			throw new Error("The path provided is not a directory. [" + path + "]");
		}
	}
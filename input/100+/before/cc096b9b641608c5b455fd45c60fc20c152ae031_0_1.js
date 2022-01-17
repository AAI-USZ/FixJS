function(path) {
		var stats; 

		if (typeof path === "undefined"
			|| (typeof path === "string" && path.trim().length === 0)) {
			throw new Error("The path must be provided when instantiating the object.");
		}

		try {
			stats = _fs.statSync(path);
		} catch (e) {
			throw new Error("The directory path does not exist.");
		}

		if (!stats.isDirectory()){
			throw new Error("The path provided is not a directory.");
		}
	}
function (type, size) {
		// TODO Determine only once.
		var storage = commonPaths.getUserFolder();

		if (storage === null) {
			console.log("webinos.file.js: Error getting user folder (falling back to CWD).");

			storage = process.cwd();
		}

		var realPath = nPath.join(storage, "file", "default");

		// TODO Check success.
		nPath.mkdirSyncRecursive(realPath);

		return new exports.FileSystemSync("default", realPath);
	}
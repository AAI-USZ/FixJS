function (type, size) {
		return new exports.FileSystemSync("default", nPath.join(process.cwd(), "default"));
	}
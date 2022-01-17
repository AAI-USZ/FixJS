function (item) {
		var fileName = path.join(basePath, item);
		var stat = fs.statSync(fileName);

		if (!clientCode.shouldBeExcluded(fileName, toBeExluded)) {
			if (stat.isFile()) {
				instrumentFile(item, basePath, callback, options);
			} else if (stat.isDirectory()) {
				instrumentFolder(item, basePath, callback, options);
			} else {
				console.error("Unable to instrument, niether a file nor a folder.", item, stats);
			}
		}
	}
function (object) {
				fs.stat(self.combine(path, object), localSynchronizer.register(function (err, stat) {
					if (ignoreList.indexOf(object) > -1) { return; }

					if (deep && stat.isDirectory()) {
						return process.nextTick(localSynchronizer.register(function () {
							var dir = new Directory(currentDirectory, path, object);
							dir.level = currentDirectory.level + 1;
							currentDirectory.directories.push(dir);
							self.getAllFiles(self.combine(path, object), pattern, ignoreList, deep, callback, dir)
								.on("finished", localSynchronizer.register(function () {
							}));
						}));
					} else if (stat.isFile()) {
						if (!self.matchFilePattern(object, pattern)) { return; }
						return process.nextTick(localSynchronizer.register(function () {
							var file = new File(currentDirectory, path, object);
							currentDirectory.files.push(file);
							callback(null, file);
						}));
					}
				}));
			}
function () {
							var dir = new Directory(currentDirectory, path, object);
							dir.level = currentDirectory.level + 1;
							currentDirectory.directories.push(dir);
							self.getAllFilesAsync(self.combine(path, object), pattern, ignoreList, deep, callback, dir)
								.on("finished", localSynchronizer.register(function () {
							}));
						}
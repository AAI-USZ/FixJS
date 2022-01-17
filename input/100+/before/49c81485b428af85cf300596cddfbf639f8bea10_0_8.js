function (root, options, callback) {
	if (!callback) {
		callback = options;
		options = {}
	}
	walk(root, options, function (err, files) {
		if (err) { throw err; }
		var fileWatcher = function (f) {
			//console.log("wf", f, !files[f]);
			if (!files[f]) {
				return;
				throw new Error(f + " is not registered!!");
			}
			if (files[f].watching) { return; }
			files[f].watching = true;
			fs.watchFile(f, options, function (c, p) {
				if (c.nlink !== 0) {
					if (c.isDirectory()) {
						fs.readdir(f, function (err, nfiles) {
							if (err) return;
							nfiles.forEach(function (b) {
								var file = path.join(f, b);
								if (!files[file]) {
									fs.stat(file, function (err, stat) {
										if (err) { return; }
										if (options.ignoreDotFiles && path.basename(file)[0] === '.') return;
										if (options.filter && options.filter(file, stat)) return;
										//console.log("New file", file, options.filter);
										files[file] = stat;
										fileWatcher(file);
										callback(file, stat, null);
									})
								}
							})
						});
					} else {
						if (files[f].mtime.getTime() === c.mtime.getTime()) {
							return;
						} else {
							files[f] = c;
							//console.log("Changed file", f);
							return callback(f, c, p);
						}
					}
				} else {
					// unwatch removed files.
					//console.log("Deleted file", f);
					delete files[f]
					fs.unwatchFile(f);
					return callback(f, c, p);
				}

//				// Check if anything actually changed in stat
//				if (files[f] && c.nlink !== 0 && files[f].mtime.getTime() === c.mtime.getTime()) {
//					return;
//				}
//				files[f] = c;
//				if (!files[f].isDirectory()) {
//					console.log("-f, c, p", f, files[f].mtime.getTime(), c.mtime.getTime(), p);
//					callback(f, c, p);
//				}
//				else {
//					console.log("+f, c, p", f, files[f].mtime.getTime(), c.mtime.getTime(), p);
//					fs.readdir(f, function (err, nfiles) {
//						if (err) return;
//						nfiles.forEach(function (b) {
//							var file = path.join(f, b);
//							if (!files[file]) {
//								fs.stat(file, function (err, stat) {
//									callback(file, stat, null);
//									files[file] = stat;
//									fileWatcher(file);
//								})
//							}
//						})
//					})
			});
//				if (c.nlink === 0) {
//					// unwatch removed files.
//					delete files[f]
//					fs.unwatchFile(f);
//				}
//			})
		}
		fileWatcher(root);
		for (i in files) {
			fileWatcher(i);
		}
		callback(files, null, null);
	});
}
function (err, files) {
		if (err) { throw err; }
		var file
			, fileWatcher = function (f) {
			if (!files[f]) {
				return;
			}
			if (files[f].watching) { return; }
			files[f].watching = true;
			fs.watchFile(f, options, function (c, p) {
				if (c.nlink !== 0) {
					if (c.isDirectory()) {
						fs.readdir(f, function (err, nfiles) {
							if (err) { return; }
							nfiles.forEach(function (b) {
								var file = path.join(f, b);
								if (!files[file]) {
									fs.stat(file, function (err, stat) {
										if (err) { return; }
										if (options.ignoreDotFiles && path.basename(file)[0] === '.') {return;}
										if (options.filter && options.filter(file, stat)) {return;}
										files[file] = stat;
										fileWatcher(file);
										callback(file, stat, null);
									});
								}
							});
						});
					} else {
						if (files[f].mtime.getTime() === c.mtime.getTime()) {
							return undefined;
						} else {
							files[f] = c;
							return callback(f, c, p);
						}
					}
				} else {
					// unwatch removed files.
					delete files[f];
					fs.unwatchFile(f);
					return callback(f, c, p);
				}
			});

		};
		
		fileWatcher(root);
		
		for (file in files) {
			if (files.hasOwnProperty(file)) {
				fileWatcher(file);
			}
		}
		callback(files, null, null);
	}
function (err, files) {
				try {
					if (err) { return callback(new Error(err)); }
					files.forEach(function (f) {
						f = path.join(dir, f);
						callback.pending += 1;
						fs.stat(f, function (err, stat) {
							try {
								if (err) { return; }
								if (options.filter && options.filter(f, stat)) { return; }
								if (options.ignoreDotFiles && path.basename(f)[0] === '.') {return;}
								callback.files[f] = stat;
								if (stat.isDirectory()) { walk(f, options, callback); }
							} catch (err2) {
								// Don't do anything
							} finally {
								callback.pending -= 1;
								if (callback.pending === 0) {
									callback(null, callback.files);
								}
							}
						});
					});
				} finally {
					callback.pending -= 1;
					if (callback.pending === 0) { callback(null, callback.files); }
				}
			}
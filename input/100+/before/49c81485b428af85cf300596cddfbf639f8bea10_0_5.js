function (b) {
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
							}
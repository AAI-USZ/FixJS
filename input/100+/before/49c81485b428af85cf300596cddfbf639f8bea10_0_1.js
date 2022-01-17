function (err, stat) {
							try {
								if (err) return;
								if (options.filter && options.filter(f, stat)) return;
								if (options.ignoreDotFiles && path.basename(f)[0] === '.') return;
								callback.files[f] = stat;
								if (stat.isDirectory()) walk(f, options, callback);
							} catch (err) {
								//console.log("!!!!!!!", err);
							} finally {
								callback.pending -= 1;
								if (callback.pending === 0) callback(null, callback.files);
							}
						}
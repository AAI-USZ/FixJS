function(cb) {
					if (o1.options.tempURLKey) {
						o1._log('Setting temporary URL key for account...');
						o1._setTempURLKey(cb);
					} else {
						cb();
					}
				}
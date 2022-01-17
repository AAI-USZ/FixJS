function(key) {
							if (this[key]) {
								return this[key];
							} else {
								return key;
							}
						}
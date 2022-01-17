function() {
						deps[j] = m.def;
						if (--count === 0) {
							callback.apply(null, deps);
							count = -1; // prevent success from being called the 2nd time below
						}
					}
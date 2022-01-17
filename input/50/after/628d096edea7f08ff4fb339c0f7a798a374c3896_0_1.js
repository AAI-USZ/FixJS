function (resolved) {
				makeResolvable(name, resolved);
				itemPromise.resolve(resolved);
			}
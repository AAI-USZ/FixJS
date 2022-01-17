function (resolved) {
				components[name] = getResolvedValue(resolved);
				itemPromise.resolve(resolved);
			}
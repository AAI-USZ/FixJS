function requireDepClosure(j) {
				deps[j] && getResourceDef(deps[j], refModule).loadAndExecute(!!sync, function onLoadAndExecute(m) {
					deps[j] = m.def;
					if (--count === 0) {
						resolve.apply(promise, deps);
						count = -1; // prevent success from being called the 2nd time below
					}
				});
			}
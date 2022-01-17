function processLifecycle(proxy, steps, config) {
		return when.reduce(steps,
			function (unused, step) {
				return processFacets(step, proxy, config);
			}, proxy);
	}
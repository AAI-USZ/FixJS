function(proxy) {
			return processLifecycle(proxy, lifecycleSteps.shutdown, this._config);
		}
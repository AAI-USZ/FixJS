function Lifecycle(config) {
		this._config = config;
		this._lifecycle = {};

		this._lifecycle.startup = generateSteps(config.lifecycleSteps.startup);
		this._lifecycle.shutdown = generateSteps(config.lifecycleSteps.shutdown);
	}
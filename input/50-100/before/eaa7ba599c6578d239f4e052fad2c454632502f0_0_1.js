function getProvider(config) {
		var providerPath = __dirname + "/" + (configuration.providersPath || ".") + "/" + config.type
			, ProviderConstructor;

		try {
			ProviderConstructor = require(providerPath);
		} catch (providerError) {
			throw new Error("Cannot find provider '" + config.type + "' in the following location '" + providerPath + "'");
		}

		return new ProviderConstructor(config);
	}
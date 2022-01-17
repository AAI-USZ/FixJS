function(type, key, module)
	{
		// initialize if needed
		if(!jsBackend.locale.initialized)
		{
			jsBackend.locale.init();
		}
		var data = jsBackend.locale.data;

		// value to use when the translation was not found
		var missingTranslation = '{$' + type + key + '}';

		// validate
		if(data == null || !data.hasOwnProperty(type) || data[type] == null)
		{
			return missingTranslation;
		}

		// if the translation does not exist for the given module, try to fall back to the core
		if(!data[type].hasOwnProperty(module) || data[type][module] == null || !data[type][module].hasOwnProperty(key) || data[type][module][key] == null)
		{
			if(!data[type].hasOwnProperty('core') || data[type]['core'] == null || !data[type]['core'].hasOwnProperty(key) || data[type]['core'][key] == null)
			{
				return missingTranslation;
			}

			return data[type]['core'][key];
		}

		return data[type][module][key];
	}
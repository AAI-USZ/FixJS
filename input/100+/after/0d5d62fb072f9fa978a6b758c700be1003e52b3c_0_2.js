function(type, key, module)
	{
		// initialize if needed
		if(!jsBackend.locale.initialized) jsBackend.locale.init();

		// validate
		if( typeof jsBackend.locale.data[type] == 'undefined' || typeof jsBackend.locale.data[type][module] == 'undefined' || typeof jsBackend.locale.data[type][module][key] == 'undefined')
		{
			// not available in core?
			if(typeof jsBackend.locale.data[type]['core'][key] == 'undefined') return '{$' + type + key + '}';

			// fallback to core
			return jsBackend.locale.data[type]['core'][key];
		}

		return jsBackend.locale.data[type][module][key];
	}
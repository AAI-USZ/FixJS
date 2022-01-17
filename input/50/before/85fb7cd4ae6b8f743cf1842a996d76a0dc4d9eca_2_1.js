function (absId, require, loaded, config) {
			//var locale = config.locale || getLocale();
			require([absId], loaded);
		}
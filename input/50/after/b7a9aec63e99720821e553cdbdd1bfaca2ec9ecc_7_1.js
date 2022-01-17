function (pluginsToRegister) {

		DLog("PluginsManager: Registering [" + pluginsToRegister.length + "] plugins");



		$.each(

			pluginsToRegister,

			function (index, obj) {

				RegisterPlugin(obj);

			}

		);

	}
function PluginsManager() {

	// TODO comment

	this.Initialize = function () {

		Log("PluginsManager: Initializing...");



		this.RegisterPlugins(GlobalPluginsList);

	}





	/**************************************************************************

	 *

	 * Registers all available plugins from

	 * the list passed

	 *

	 *************************************************************************/

	this.RegisterPlugins = function (pluginsToRegister) {

		DLog("PluginsManager: Registering [" + pluginsToRegister.length + "] plugins");



		$.each(

			pluginsToRegister,

			function (index, obj) {

				RegisterPlugin(obj);

			}

		);

	};



	var RegisterPlugin = function (pluginMetadata) {

		var activeStateRequest = new Request("Background", "Data", "PluginActive" + pluginMetadata.Name, "get", null);

		var isLoaded = false;



		// Send request and handle callback

		activeStateRequest.Send(

			function (response) {

				if (response == "On" || !response) {

					Log("PluginsManager: Plugin '" + pluginMetadata.Name + "' is active...");

					Log("PluginsManager: Registering '" + pluginMetadata.Name + "'");



					var pluginObject = new pluginMetadata.Class();

					pluginObject.Register();

				}

				else Log("PluginsManager: Plugin '" + pluginMetadata.Name + "' is NOT active!");



				var isLoaded = true;

			}

		);

	};

}